output "resource_group_name" {
  description = "Tutorial-level resource group created for easy cleanup."
  value       = azurerm_resource_group.this.name
}

output "foundry_account_name" {
  description = "Microsoft Foundry account name."
  value       = azapi_resource.foundry_account.name
}

output "foundry_project_name" {
  description = "Microsoft Foundry project name used in the labs."
  value       = azapi_resource.foundry_project.name
}

output "foundry_project_endpoint" {
  description = "Foundry project API endpoint."
  value       = "https://${local.foundry_custom_subdomain_name}.services.ai.azure.com/api/projects/${azapi_resource.foundry_project.name}"
}

output "foundry_account_endpoint" {
  description = "Foundry account endpoint."
  value       = "https://${local.foundry_custom_subdomain_name}.cognitiveservices.azure.com/"
}

output "search_service_name" {
  description = "Azure AI Search service name."
  value       = azurerm_search_service.search.name
}

output "search_endpoint" {
  description = "Azure AI Search endpoint."
  value       = "https://${azurerm_search_service.search.name}.search.windows.net"
}

output "storage_account_name" {
  description = "Storage account for the tutorial corpus."
  value       = azapi_resource.storage_account.name
}

output "storage_container_names" {
  description = "Blob containers created for corpus and extracted assets."
  value       = sort(tolist(var.storage_containers))
}

output "model_deployments" {
  description = "Model deployment names to reference in the tutorial."
  value = {
    for key, deployment in azurerm_cognitive_deployment.models : key => {
      deployment_name = deployment.name
      model_name      = var.model_deployments[key].model_name
      model_version   = var.model_deployments[key].model_version
      sku_name        = var.model_deployments[key].sku_name
      capacity        = var.model_deployments[key].capacity
    }
  }
}

output "corpus_upload_command" {
  description = "Azure CLI command for an admin or trainer to upload the core generated corpus with Entra ID."
  value       = "az storage blob upload-batch --auth-mode login --account-name ${azapi_resource.storage_account.name} --destination corpus --source ../../../sample-data/contoso-indonesia/pdf --overwrite && az storage blob upload --auth-mode login --account-name ${azapi_resource.storage_account.name} --container-name corpus --name FORM-reimburse-scan.png --file ../../../sample-data/contoso-indonesia/assets/FORM-reimburse-scan.png --overwrite"
}

output "cleanup_command" {
  description = "Command to destroy all resources in this tutorial-level resource group through Terraform."
  value       = "terraform destroy"
}