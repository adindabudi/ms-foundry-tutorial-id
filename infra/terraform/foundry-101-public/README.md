# Admin setup: Foundry 101 public keyless infrastructure

Folder ini dipakai admin/trainer untuk menyiapkan resource Azure sebelum guided workshop L10x. Folder ini tidak dirender sebagai halaman web Jekyll.

Terraform membuat satu resource group baru per tutorial level supaya cleanup sederhana. Default setup bersifat public endpoint dan keyless: local auth/API key dimatikan untuk Foundry, Azure AI Search, dan Storage.

## Resource yang dibuat

- Resource group tutorial level, misalnya `rg-ms-foundry-l10x-abc123`.
- Microsoft Foundry account baru dengan `kind = AIServices`, `allowProjectManagement = true`, system-assigned managed identity, public network enabled, dan local auth disabled.
- Foundry project baru di bawah account tersebut.
- Model deployments untuk lab:
  - chat: `gpt-4.1` by default.
  - embedding: `text-embedding-3-large` by default.
- Azure AI Search service Standard dengan semantic ranker enabled, system-assigned managed identity, RBAC enabled, dan local auth disabled.
- Storage account keyless untuk corpus, plus container `corpus` dan `asset-store`.
- RBAC minimum untuk workshop keyless flow:
  - Search managed identity -> Storage Blob Data Contributor pada storage account.
  - Search managed identity -> Cognitive Services User pada Foundry account.
  - Foundry project managed identity -> Search Index Data Reader pada Search service.
  - Workshop users/groups -> Foundry, Search, Storage, dan Cognitive Services roles yang dibutuhkan lab.

## Prasyarat admin

- Terraform 1.9 atau lebih baru.
- Azure CLI login ke subscription target.
- Permission untuk membuat resource group dan resource Azure.
- Permission `Microsoft.Authorization/roleAssignments/write`, biasanya dari Owner atau User Access Administrator, karena setup ini membuat RBAC assignment.
- Quota model di region yang dipilih. Override `model_deployments` jika nama/version/SKU default tidak tersedia di region tenant kamu.

## Cara deploy

```bash
cd infra/terraform/foundry-101-public
az login
az account set --subscription "<subscription-id>"

cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan -out foundry-101.tfplan
terraform apply foundry-101.tfplan
terraform output
```

Untuk CI, set `ARM_SUBSCRIPTION_ID`, `ARM_TENANT_ID`, dan kredensial OIDC/service principal sesuai standar organisasi. Jangan commit `terraform.tfvars`, state, atau plan file.

## Variabel penting

| Variable | Kapan diubah |
| --- | --- |
| `location` | Region workshop dan model quota berbeda. |
| `tutorial_level` | Membuat resource group terpisah per level, misalnya `l10x`, `l150`, `l200`. |
| `resource_prefix` | Prefix nama resource per event/customer. |
| `workshop_principal_object_ids` | Object ID user/group peserta yang perlu akses portal. Prefer group object ID agar tidak assign satu per satu. |
| `model_deployments` | Override deployment name, model version, SKU, atau capacity sesuai availability/quota. |
| `role_names` | Override jika tenant masih menampilkan nama role Foundry lama. |

## Output yang dipakai di lab

Setelah apply, gunakan output ini untuk mengisi instruksi trainer atau slide pembuka:

```bash
terraform output resource_group_name
terraform output foundry_account_name
terraform output foundry_project_name
terraform output search_service_name
terraform output storage_account_name
terraform output model_deployments
```

Default tutorial references:

- Chat completion deployment: `gpt-4.1`.
- Embedding deployment: `text-embedding-3-large`.
- Blob container untuk corpus: `corpus`.
- Blob container untuk extracted/image assets: `asset-store`.

## Upload corpus workshop

Jalankan dari folder Terraform setelah `terraform apply` selesai. Command default mengupload PDF core dan satu scanned-form PNG. Asset generator seperti `document-header.png`, `document-footer.png`, dan SVG source tidak diupload otomatis karena file tersebut dapat menghasilkan warning indexer yang tidak relevan untuk smoke test workshop.

```bash
$(terraform output -raw corpus_upload_command)
```

Command tersebut memakai `--auth-mode login`, jadi user yang menjalankan upload harus punya `Storage Blob Data Contributor` pada storage account. Kalau `assign_current_user_rbac = true`, identity yang menjalankan Terraform sudah diberi role itu.

## Cleanup

Karena semua resource L10x ada di satu resource group yang dibuat Terraform, cleanup utama adalah:

```bash
terraform destroy
```

Jika state hilang dan admin perlu emergency cleanup, hapus resource group tutorial level dari Azure portal atau Azure CLI setelah memastikan tidak ada resource lain di dalamnya.

## Catatan operasional

- State Terraform tetap harus disimpan aman walaupun setup ini tidak memakai secret input. State berisi resource IDs, principal IDs, dan nama resource internal.
- Untuk team/CI, gunakan remote backend Azure Storage dengan access control organisasi. Backend config Terraform tidak bisa memakai variable, jadi siapkan backend via file lokal/CI parameter, bukan hardcode di repo publik.
- Role assignment Azure kadang butuh beberapa menit sebelum terlihat di portal. Jika peserta gagal create knowledge source segera setelah apply, tunggu sebentar lalu refresh sign-in.