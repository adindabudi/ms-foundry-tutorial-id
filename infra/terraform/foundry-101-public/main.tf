data "azurerm_client_config" "current" {}

resource "random_string" "suffix" {
  length  = 6
  lower   = true
  numeric = true
  special = false
  upper   = false
}

locals {
  prefix_token = replace(lower(var.resource_prefix), "/[^a-z0-9]/", "")
  level_token  = replace(lower(var.tutorial_level), "/[^a-z0-9]/", "")
  name_token   = substr("${local.prefix_token}${local.level_token}${random_string.suffix.result}", 0, 18)

  resource_group_name           = coalesce(var.resource_group_name, "rg-${var.resource_prefix}-${var.tutorial_level}-${random_string.suffix.result}")
  foundry_account_name          = coalesce(var.foundry_account_name, "${var.resource_prefix}-${var.tutorial_level}-${random_string.suffix.result}-ai")
  foundry_custom_subdomain_name = coalesce(var.foundry_custom_subdomain_name, local.foundry_account_name)
  search_service_name           = substr("${var.resource_prefix}-${var.tutorial_level}-${random_string.suffix.result}-srch", 0, 60)
  storage_account_name          = substr("st${local.name_token}", 0, 24)

  common_tags = merge(var.tags, {
    workload       = "ms-foundry-tutorial-id"
    tutorial_level = var.tutorial_level
    managed_by     = "terraform"
  })

  workshop_principal_object_ids = var.assign_current_user_rbac ? toset(concat(tolist(var.workshop_principal_object_ids), [data.azurerm_client_config.current.object_id])) : var.workshop_principal_object_ids
}

resource "azurerm_resource_group" "this" {
  name     = local.resource_group_name
  location = var.location
  tags     = local.common_tags
}

resource "azapi_resource" "foundry_account" {
  type      = "Microsoft.CognitiveServices/accounts@2025-06-01"
  name      = local.foundry_account_name
  parent_id = azurerm_resource_group.this.id
  location  = azurerm_resource_group.this.location
  tags      = local.common_tags

  identity {
    type = "SystemAssigned"
  }

  body = {
    kind = "AIServices"
    sku = {
      name = var.foundry_sku_name
    }
    properties = {
      allowProjectManagement = true
      customSubDomainName    = local.foundry_custom_subdomain_name
      disableLocalAuth       = true
      publicNetworkAccess    = "Enabled"
    }
  }
}

resource "azurerm_cognitive_deployment" "models" {
  for_each = var.model_deployments

  name                 = each.value.deployment_name
  cognitive_account_id = azapi_resource.foundry_account.id

  model {
    format  = "OpenAI"
    name    = each.value.model_name
    version = each.value.model_version
  }

  sku {
    name     = each.value.sku_name
    capacity = each.value.capacity
  }
}

resource "azapi_resource" "foundry_project" {
  type      = "Microsoft.CognitiveServices/accounts/projects@2025-06-01"
  name      = var.foundry_project_name
  parent_id = azapi_resource.foundry_account.id
  location  = azurerm_resource_group.this.location
  tags      = local.common_tags

  identity {
    type = "SystemAssigned"
  }

  body = {
    kind       = "AIServices"
    properties = {}
  }

  schema_validation_enabled = false

  depends_on = [azurerm_cognitive_deployment.models]
}

resource "azurerm_search_service" "search" {
  name                          = local.search_service_name
  resource_group_name           = azurerm_resource_group.this.name
  location                      = azurerm_resource_group.this.location
  sku                           = var.search_sku
  replica_count                 = var.search_replica_count
  partition_count               = var.search_partition_count
  public_network_access_enabled = true
  local_authentication_enabled  = false
  tags                          = local.common_tags

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_storage_account" "corpus" {
  name                             = local.storage_account_name
  resource_group_name              = azurerm_resource_group.this.name
  location                         = azurerm_resource_group.this.location
  account_tier                     = "Standard"
  account_replication_type         = "LRS"
  account_kind                     = "StorageV2"
  min_tls_version                  = "TLS1_2"
  public_network_access_enabled    = true
  allow_nested_items_to_be_public  = false
  shared_access_key_enabled        = false
  default_to_oauth_authentication  = true
  cross_tenant_replication_enabled = false
  tags                             = local.common_tags

  blob_properties {
    delete_retention_policy {
      days = 7
    }

    container_delete_retention_policy {
      days = 7
    }
  }
}

resource "azapi_resource" "storage_containers" {
  for_each = var.storage_containers

  type      = "Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01"
  name      = each.value
  parent_id = "${azurerm_storage_account.corpus.id}/blobServices/default"

  body = {
    properties = {
      publicAccess = "None"
    }
  }
}