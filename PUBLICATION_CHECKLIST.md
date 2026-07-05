# Public Repository Publication Checklist

Use this checklist before pushing `ms-foundry-tutorial-id` to a public GitHub repository.

## Repository Settings

- [ ] Repository name is `ms-foundry-tutorial-id`.
- [ ] Visibility is public only after the privacy scan passes.
- [ ] Default branch is `main`.
- [ ] GitHub Pages source is GitHub Actions.
- [ ] Private vulnerability reporting is enabled.
- [ ] Dependabot alerts are enabled.
- [ ] Branch protection requires build, lab sync, accessibility, and Lighthouse checks after first successful CI run.

## Required Files

- [ ] `LICENSE`
- [ ] `README.md`
- [ ] `CONTRIBUTING.md`
- [ ] `CODE_OF_CONDUCT.md`
- [ ] `SECURITY.md`
- [ ] `SUPPORT.md`
- [ ] `NOTICE.md`
- [ ] `THIRD_PARTY_NOTICES.md`

## Privacy And Content Safety

- [ ] No secrets in repository history.
- [ ] No tenant IDs, subscription IDs, resource IDs, user emails, or private screenshots.
- [ ] Sample data is clearly fictional.
- [ ] Microsoft Learn screenshots are linked or attributed according to reuse rights.

## Local Validation

- [ ] `bundle exec jekyll build`
- [ ] `npm test`
- [ ] `npm run a11y`
- [ ] `npm run lighthouse`

## First Push

```bash
git branch -M main
git remote add origin https://github.com/adindaputra/ms-foundry-tutorial-id.git
git push -u origin main
```