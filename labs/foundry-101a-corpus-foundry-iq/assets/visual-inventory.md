# Visual Inventory: Foundry 101A

This file tracks visual provenance for Lab 101A.

| Visual | Source | Status | Notes |
| --- | --- | --- | --- |
| Hero illustration | Azure `gpt-image-2` deployment, text-free prompt | Available | Stored at `assets/images/labs/foundry-101/hero-foundry-iq-agent.png`. Reviewed manually for no readable fake data or real logos. |
| Knowledge source configuration screenshot | Microsoft Learn | Available locally | Stored at `labs/foundry-101a-corpus-foundry-iq/assets/mslearn-knowledge-source.png`. Source URL returned `image/png` during validation. |
| Knowledge base configuration screenshot | Microsoft Learn | Available locally | Stored at `labs/foundry-101a-corpus-foundry-iq/assets/mslearn-knowledge-base.png`. Discovered from the Microsoft Learn page with Playwright and downloaded locally. |
| Blob container upload screenshot | Azure portal (manual capture) | Available locally | Stored at `portal-storage-containers.png`. Sanitized: account/RG/subscription hidden. |
| Add knowledge source menu screenshot | Azure portal (manual capture) | Available locally | Stored at `portal-add-knowledge-source-menu.png`. Sanitized: service/RG/subscription hidden. |
| Create knowledge source form screenshot | Azure portal (manual capture) | Available locally | Stored at `portal-create-knowledge-source-form.png`. Sanitized: service/RG/subscription hidden. |
| Knowledge bases list screenshot | Azure portal (manual capture) | Gap | Placeholder di doc. Screenshot manual lalu simpan sebagai `portal-knowledge-bases-list.jpg`. |
| Add knowledge base menu screenshot | Azure portal (manual capture) | Gap | Placeholder di doc. Screenshot manual lalu simpan sebagai `portal-add-knowledge-base-menu.jpg`. |
| Create knowledge base form screenshot | Azure portal (manual capture) | Gap | Placeholder di doc. Screenshot manual lalu simpan sebagai `portal-create-knowledge-base-form.jpg`. |
| Knowledge base test/debug activity screenshot | Portal capture needed | Gap | Capture after corpus is indexed. Sanitize resource names and tenant info. |
| Reimbursement form scan | Deterministic local generator | Available | Stored at `sample-data/contoso-indonesia/assets/FORM-reimburse-scan.png`. Generated with Pillow for readable text. |
| Reimbursement approval diagram | Mermaid source + SVG fallback | Available | Source: `sample-data/contoso-indonesia/diagrams/reimburse-approval.mmd`; fallback SVG: `sample-data/contoso-indonesia/assets/DIAGRAM-proses-persetujuan.svg`. Mermaid CLI rendering failed locally due a Puppeteer Chrome binary mismatch, so fallback SVG is committed. |

## Portal Screenshot Rules

- Hide tenant names, subscription IDs, resource group names, storage account names, endpoint URLs, user emails, costs, quotas, and private corpus values.
- Prefer Microsoft Learn screenshots when they are stable and licensing allows linking.
- Use Playwright screenshots only after the user signs in manually.