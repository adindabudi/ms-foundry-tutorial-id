# Contributing

Thanks for improving MS Foundry Tutorial ID.

## Contribution Types

- Fix Indonesian tutorial wording.
- Correct Microsoft Foundry feature status or source links.
- Improve accessibility, layout, or build reliability.
- Add screenshots with sanitized tenant and subscription details.
- Propose new L100, L150, L200, or L300 labs.

## Quality Bar

- Keep learner-facing content in Bahasa Indonesia.
- Preserve Microsoft portal UI labels in English when the portal shows English labels.
- Add an expected result after each major learner action.
- Add a local troubleshooting note near failure-prone steps.
- Label preview, partial GA, and Early Access Preview surfaces before learners depend on them.
- Do not include secrets, tenant names, subscription IDs, user emails, or private customer data.

## Local Checks

Run these before opening a pull request:

```bash
bundle exec jekyll build
npm test
npm run a11y
npm run lighthouse
```

If a check cannot run locally because browser or system dependencies are missing, state that in the pull request.

## Lab Authoring

Lab source lives in `labs/<slug>/README.md` and the Jekyll collection page lives in `_labs/<slug>.md`. Update both together so the GitHub README and the rendered site stay in sync.