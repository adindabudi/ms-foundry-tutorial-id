# MS Foundry Tutorial ID

Indonesian hands-on tutorials for Microsoft Foundry, focused on portal-first agent building, Foundry IQ, validation, observability, and pilot readiness.

## Status

Early repository foundation. The first learning path is Foundry 101: a guided workshop for building an internal chatbot with Microsoft Foundry prompt agents and Foundry IQ.

## What This Repository Contains

- A GitHub Pages site built with Jekyll and Minimal Mistakes.
- Foundry 101 lab pages for self-paced and guided workshop use.
- Fictional Contoso Indonesia sample corpus for retrieval and grounded answer exercises.
- Validation prompts, readiness guidance, and feature-readiness notes embedded in the labs.

## Local Development

Prerequisites:

- Ruby 3.3
- Bundler
- Node.js 20

Install dependencies:

```bash
bundle install
npm ci
```

Build the site:

```bash
bundle exec jekyll build
```

Serve locally:

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Run validation:

```bash
npm test
npm run a11y
npm run lighthouse
```

Regenerate the fictional Contoso Indonesia corpus artifacts:

```bash
npm run generate:corpus
```

## Feature Readiness

The tutorial content distinguishes generally available, preview, partial GA, and Early Access Preview surfaces. Feature readiness notes are included with each lab.

## Sample Data

The Contoso Indonesia corpus is fictional and intended only for training. It includes realistic document patterns such as long tables, repeated table headers, flow charts, and scanned-form images.

## Contributing

See `CONTRIBUTING.md`.

## Code of Conduct

This project follows the Microsoft Open Source Code of Conduct. See `CODE_OF_CONDUCT.md`.

## Security

Do not report security issues in public GitHub issues. See `SECURITY.md`.

## License

MIT. See `LICENSE`.