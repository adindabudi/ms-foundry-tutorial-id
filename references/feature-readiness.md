---
title: "Feature Readiness"
permalink: /references/feature-readiness/
layout: single
---

# Feature Readiness

Foundry 101 uses Microsoft Learn and local planning research notes as its research baseline. The durable public summary is this page.

| Area | Tutorial posture |
| --- | --- |
| Prompt agent | Portal-first path for no-code/low-code internal chatbot scenarios. |
| Foundry IQ via portal | Label as Preview/Partial GA for agentic retrieval portal surfaces. Microsoft Learn says some agentic retrieval features are GA through the `2026-04-01` REST API, while Azure portal and Microsoft Foundry portal continue to provide preview-only access to all agentic retrieval features. |
| Teams/M365 publish | Label as Early Access Preview and tenant-policy dependent. |
| Teams/M365 publish limitations | Explain that file uploads/image generation do not work in Microsoft 365, Private Link is not supported for Teams/Azure Bot Service integrations, and published agents do not support streaming responses or citations. |
| Prompt agent tracing | Treat as generally available for prompt agents when Application Insights is connected and RBAC allows access. Workflow/external agents and some broader observability surfaces remain preview or partial. |
| Trace data privacy | Explain that trace data can include user prompts, model outputs, tool calls, latency, token usage, and errors, and should be protected as production telemetry. |