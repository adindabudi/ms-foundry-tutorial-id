variable "subscription_id" {
  description = "Azure subscription ID. Set ARM_SUBSCRIPTION_ID instead if you prefer provider environment variables."
  type        = string
  default     = null
  nullable    = true
}

variable "location" {
  description = "Azure region for the workshop resources. Pick a region where the requested model deployments are available."
  type        = string
  default     = "swedencentral"
}

variable "tutorial_level" {
  description = "Tutorial level token used in names and tags. Keep one resource group per tutorial level for easy cleanup."
  type        = string
  default     = "l10x"

  validation {
    condition     = can(regex("^[a-zA-Z0-9-]{2,16}$", var.tutorial_level))
    error_message = "tutorial_level must be 2-16 alphanumeric or hyphen characters."
  }
}

variable "resource_prefix" {
  description = "Short prefix for all generated resource names. Use only letters, numbers, and hyphens."
  type        = string
  default     = "ms-foundry"

  validation {
    condition     = can(regex("^[a-zA-Z0-9-]{2,24}$", var.resource_prefix))
    error_message = "resource_prefix must be 2-24 alphanumeric or hyphen characters."
  }
}

variable "resource_group_name" {
  description = "Optional resource group name. When null, a tutorial-level resource group name is generated."
  type        = string
  default     = null
  nullable    = true
}

variable "foundry_account_name" {
  description = "Optional Microsoft Foundry account resource name. Must be globally unique with its custom subdomain."
  type        = string
  default     = null
  nullable    = true
}

variable "foundry_custom_subdomain_name" {
  description = "Optional Foundry account custom subdomain. When null, it follows foundry_account_name."
  type        = string
  default     = null
  nullable    = true
}

variable "foundry_project_name" {
  description = "Foundry project name shown to workshop participants."
  type        = string
  default     = "foundry-101"
}

variable "foundry_sku_name" {
  description = "SKU for the Microsoft Foundry account. S0 is the standard public workshop setup."
  type        = string
  default     = "S0"
}

variable "search_sku" {
  description = "Azure AI Search SKU. Agentic retrieval requires Basic or higher; Standard is recommended for workshops and semantic ranker is enabled separately."
  type        = string
  default     = "standard"
}

variable "search_replica_count" {
  description = "Azure AI Search replica count. Increase only for larger workshops."
  type        = number
  default     = 1
}

variable "search_partition_count" {
  description = "Azure AI Search partition count. Increase only for larger corpora."
  type        = number
  default     = 1
}

variable "storage_containers" {
  description = "Blob containers created for the tutorial corpus and optional extracted assets."
  type        = set(string)
  default     = ["corpus", "asset-store"]
}

variable "model_deployments" {
  description = "Model deployments created on the Foundry account. Override names, versions, SKU, and capacity per region/quota."
  type = map(object({
    deployment_name = string
    model_name      = string
    model_version   = string
    sku_name        = string
    capacity        = number
  }))

  default = {
    chat = {
      deployment_name = "gpt-4o-mini"
      model_name      = "gpt-4o-mini"
      model_version   = "2024-07-18"
      sku_name        = "GlobalStandard"
      capacity        = 10
    }

    embedding = {
      deployment_name = "text-embedding-3-large"
      model_name      = "text-embedding-3-large"
      model_version   = "1"
      sku_name        = "Standard"
      capacity        = 10
    }
  }
}

variable "assign_current_user_rbac" {
  description = "Assign workshop data-plane roles to the identity running Terraform. Disable for CI/service principal only runs."
  type        = bool
  default     = true
}

variable "workshop_principal_object_ids" {
  description = "Microsoft Entra object IDs for workshop users or groups that need portal access to the provisioned resources."
  type        = set(string)
  default     = []
}

variable "role_names" {
  description = "Built-in role names used for keyless workshop access. Override if your tenant still exposes older Foundry role names."
  type = object({
    cognitive_services_user       = string
    foundry_user                  = string
    foundry_project_manager       = string
    search_service_contributor    = string
    search_index_data_reader      = string
    search_index_data_contributor = string
    storage_blob_data_contributor = string
  })

  default = {
    cognitive_services_user       = "Cognitive Services User"
    foundry_user                  = "Foundry User"
    foundry_project_manager       = "Foundry Project Manager"
    search_service_contributor    = "Search Service Contributor"
    search_index_data_reader      = "Search Index Data Reader"
    search_index_data_contributor = "Search Index Data Contributor"
    storage_blob_data_contributor = "Storage Blob Data Contributor"
  }
}

variable "tags" {
  description = "Tags applied to all supported resources."
  type        = map(string)
  default     = {}
}