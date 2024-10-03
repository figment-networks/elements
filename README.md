# Figment Elements - UI components for embeddable staking

We build Figment Elements to help you integrate staking in a matter of minutes, without the need for API integration or UI work.

[See our Developer portal for docs](https://docs.figment.io/docs/elements)

## Development

Make changes, and build with `pnpm build`. Then, link the package in your project using your chosen package manager to test the changes.

To publish, first run `pnpm build` to build the dist files, then make sure to bump the version in the `package.json` and then commit and push your changes. Once that's done, run:

```bash
npm publish --access public
```
