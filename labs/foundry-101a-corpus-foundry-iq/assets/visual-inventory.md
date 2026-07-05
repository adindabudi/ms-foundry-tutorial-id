# Visual Inventory: Foundry 101A

This file tracks visual provenance for Lab 101A.

| Visual | Source | Status | Notes |
| --- | --- | --- | --- |
| Hero illustration | Azure `gpt-image-2` deployment, text-free prompt | Available | Stored at `assets/images/labs/foundry-101/hero-foundry-iq-agent.png`. Reviewed manually for no readable fake data or real logos. |
| Knowledge source configuration screenshot | Microsoft Learn | Available as linked official image | `https://learn.microsoft.com/azure/search/media/get-started-portal-agentic-retrieval/create-knowledge-source.png` returned `image/png` during validation. |
| Knowledge base configuration screenshot | Microsoft Learn | Gap | The documented image path did not return stable PNG during validation. Capture from portal with Playwright after tenant login. |
| Blob container upload screenshot | Portal capture needed | Gap | Capture after user signs in to Azure portal. Sanitize storage account and subscription. |
| Knowledge base test/debug activity screenshot | Portal capture needed | Gap | Capture after corpus is indexed. Sanitize resource names and tenant info. |
| Reimbursement form scan | Deterministic local generator | Available | Stored at `sample-data/contoso-indonesia/assets/FORM-reimburse-scan.png`. Generated with Pillow for readable text. |
| Reimbursement approval diagram | Mermaid source + SVG fallback | Available | Source: `sample-data/contoso-indonesia/diagrams/reimburse-approval.mmd`; fallback SVG: `sample-data/contoso-indonesia/assets/DIAGRAM-proses-persetujuan.svg`. Mermaid CLI rendering failed locally due a Puppeteer Chrome binary mismatch, so fallback SVG is committed. |

## Portal Screenshot Rules

- Hide tenant names, subscription IDs, resource group names, storage account names, endpoint URLs, user emails, costs, quotas, and private corpus values.
- Prefer Microsoft Learn screenshots when they are stable and licensing allows linking.
- Use Playwright screenshots only after the user signs in manually.