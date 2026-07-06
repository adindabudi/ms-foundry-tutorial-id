locals {
  workshop_role_assignment_maps = [
    for principal_id in local.workshop_principal_object_ids : {
      "${principal_id}-foundry-user" = {
        principal_id         = principal_id
        scope                = azapi_resource.foundry_account.id
        role_definition_name = var.role_names.foundry_user
      }
      "${principal_id}-foundry-project-manager" = {
        principal_id         = principal_id
        scope                = azapi_resource.foundry_account.id
        role_definition_name = var.role_names.foundry_project_manager
      }
      "${principal_id}-cognitive-services-user" = {
        principal_id         = principal_id
        scope                = azapi_resource.foundry_account.id
        role_definition_name = var.role_names.cognitive_services_user
      }
      "${principal_id}-search-service-contributor" = {
        principal_id         = principal_id
        scope                = azurerm_search_service.search.id
        role_definition_name = var.role_names.search_service_contributor
      }
      "${principal_id}-search-index-data-contributor" = {
        principal_id         = principal_id
        scope                = azurerm_search_service.search.id
        role_definition_name = var.role_names.search_index_data_contributor
      }
      "${principal_id}-search-index-data-reader" = {
        principal_id         = principal_id
        scope                = azurerm_search_service.search.id
        role_definition_name = var.role_names.search_index_data_reader
      }
      "${principal_id}-storage-blob-data-contributor" = {
        principal_id         = principal_id
        scope                = azapi_resource.storage_account.id
        role_definition_name = var.role_names.storage_blob_data_contributor
      }
      "${principal_id}-resource-group-reader" = {
        principal_id         = principal_id
        scope                = azurerm_resource_group.this.id
        role_definition_name = "Reader"
      }
    }
  ]

  workshop_role_assignments = length(local.workshop_role_assignment_maps) > 0 ? merge(local.workshop_role_assignment_maps...) : {}
}

resource "azurerm_role_assignment" "search_to_storage" {
  scope                            = azapi_resource.storage_account.id
  role_definition_name             = var.role_names.storage_blob_data_contributor
  principal_id                     = azurerm_search_service.search.identity[0].principal_id
  principal_type                   = "ServicePrincipal"
  skip_service_principal_aad_check = true
}

resource "azurerm_role_assignment" "search_to_foundry" {
  scope                            = azapi_resource.foundry_account.id
  role_definition_name             = var.role_names.cognitive_services_user
  principal_id                     = azurerm_search_service.search.identity[0].principal_id
  principal_type                   = "ServicePrincipal"
  skip_service_principal_aad_check = true
}

resource "azurerm_role_assignment" "project_to_search_reader" {
  scope                            = azurerm_search_service.search.id
  role_definition_name             = var.role_names.search_index_data_reader
  principal_id                     = azapi_resource.foundry_project.identity[0].principal_id
  principal_type                   = "ServicePrincipal"
  skip_service_principal_aad_check = true
}

resource "azurerm_role_assignment" "workshop_principals" {
  for_each = local.workshop_role_assignments

  scope                = each.value.scope
  role_definition_name = each.value.role_definition_name
  principal_id         = each.value.principal_id
}

# The new Foundry portal "Create agent" quick flow auto-deploys a default model
# (e.g., o3 / grok) which requires Microsoft.CognitiveServices/accounts/deployments/write
# on the account. Workshop participants otherwise hold only resource-scoped USE roles.
# Grant a least-privilege custom role limited to model deployments so agent creation
# succeeds, without the broad Cognitive Services Contributor role.
resource "azurerm_role_definition" "workshop_model_deployer" {
  name        = "Foundry Workshop Model Deployer ${random_string.suffix.result}"
  scope       = azapi_resource.foundry_account.id
  description = "Least-privilege: read and create model deployments on the Foundry account for workshop agent creation."

  permissions {
    actions = [
      "Microsoft.CognitiveServices/accounts/deployments/read",
      "Microsoft.CognitiveServices/accounts/deployments/write",
    ]
  }

  assignable_scopes = [azapi_resource.foundry_account.id]
}

resource "azurerm_role_assignment" "workshop_model_deployer" {
  for_each = local.workshop_principal_object_ids

  scope              = azapi_resource.foundry_account.id
  role_definition_id = azurerm_role_definition.workshop_model_deployer.role_definition_resource_id
  principal_id       = each.value
}