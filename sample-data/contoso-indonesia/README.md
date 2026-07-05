# Contoso Indonesia Employee Assistant Corpus

This folder contains fictional training material for MS Foundry Tutorial ID.

The corpus is designed to simulate real enterprise document challenges:

- Long policy tables.
- Tables that split across PDF pages with repeated headers.
- Flow charts rendered from Mermaid.
- Scanned form images.
- Similar policy terms that require careful grounding.

The generated PDF and image assets are maintainer-produced artifacts. Learners upload the committed artifacts during Foundry 101; they do not generate PDFs or images as part of the lab.

All company names, policies, forms, people, and numbers are fictional.

## Generated Artifacts

Use the PDF files for Foundry IQ / Azure AI Search indexing in the L100 portal labs.

| Artifact | Purpose |
| --- | --- |
| `pdf/HR-001-kebijakan-cuti-2026.pdf` | HR leave policy with entitlement table. |
| `pdf/HR-002-benefit-karyawan-2026.pdf` | Benefit eligibility matrix with similar allowance names. |
| `pdf/FIN-001-reimburse-dan-perjalanan-dinas.pdf` | Reimbursement and travel policy with a long table split across two PDF pages. |
| `docx/*.docx` | Editable Word source versions for trainers and maintainers. |
| `source/*.md` | Markdown source snapshots generated from the structured corpus data. |
| `diagrams/reimburse-approval.mmd` | Mermaid source for the reimbursement approval flow. |
| `assets/DIAGRAM-proses-persetujuan.svg` | SVG fallback for the reimbursement approval flow. |
| `assets/FORM-reimburse-scan.png` | Fictional scanned reimbursement form generated deterministically with Pillow so text and fields remain readable. |
| `assets/document-header.png` | Image-based document header embedded into generated PDFs to simulate exported/scanned document chrome. |
| `assets/document-footer.png` | Image-based document footer embedded into generated PDFs to introduce realistic repeated footer noise. |

## Maintainer Regeneration

Regenerate DOCX, PDF, Markdown source, and diagram fallback assets with:

```bash
npm run generate:corpus
```

The generated PDF table renderer redraws table headers after page breaks. This is intentional because the finance policy is used to test whether retrieval can handle long tables that span pages. The document header is image-based and appears on opening/appendix pages; table continuation pages keep only repeated table headers. The footer is image-based and repeated across pages to simulate common export/scan noise.

The conceptual hero illustration in the site was generated with the existing Azure `gpt-image-2` deployment through Microsoft Entra authentication because API-key local auth is disabled on the Azure AI Services resource used in this workspace. The reimbursement form image in this corpus is deterministic rather than model-generated because generated form text must not be treated as source-of-truth. Do not commit keys, tokens, tenant-specific values, or real business data.