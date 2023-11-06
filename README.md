<h1 align="center">Screen Reader Jest Matchers</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/@guidepup/jest"><img alt="Screen Reader Jest Matchers available on NPM" src="https://img.shields.io/npm/v/@guidepup/jest" /></a>
  <a href="https://www.npmjs.com/package/@guidepup/jest"><img alt="Screen Reader Jest Matchers available on NPM" src="https://img.shields.io/npm/dt/@guidepup/jest"></a>
  <a href="https://github.com/guidepup/jest/actions/workflows/test.yml"><img alt="Screen Reader Jest Matchers test workflows" src="https://github.com/guidepup/jest/workflows/Test/badge.svg" /></a>
  <a href="https://github.com/guidepup/jest/blob/main/LICENSE"><img alt="Screen Reader Jest Matchers uses the MIT license" src="https://img.shields.io/github/license/guidepup/jest" /></a>
</p>
<p align="center">
  [Jest](https://jestjs.io) matchers for reliable unit testing of your screen reader a11y workflows through JavaScript.
</p>

## Intro

This package aims to supplement your testing by enabling you to snapshot the output of a [virtual screen reader](https://github.com/guidepup/virtual-screen-reader/) on your page or components in your [Jest](https://jestjs.io) unit test workflows.

> Note: This package should not replace your manual screen reader testing, there is no substitute for testing with real screen readers and with real users.

Through two custom Jest snapshot matchers you can get fast feedback on what you might expect screen readers would output if a user was to traverse the page or component from top to bottom. For testing more complex scenarios, check out the [@guidepup/virtual-screen-reader](https://github.com/guidepup/virtual-screen-reader/) package.

## Features

- **Mirrors Screen Reader Experience** - assert on what might expect users would hear when using a screen reader to traverse the page.
- **UI Framework Agnostic** - want to use React, Vue, Solid, Svelte, etc.? All good here! Works with any UI framework, and plays nicely with the [Testing Library](https://testing-library.com/) suite.
- **Fast Feedback** - avoid the cumbersome overhead of running an e2e test with a running screen reader by running virtually over the provided DOM.

## Getting Started

Install Virtual Screen Reader to your project:

```bash
# With NPM
npm install -D @guidepup/jest

# With Yarn
yarn add -D @guidepup/jest
```

Add a [Jest setup file](https://jestjs.io/docs/configuration#setupfilesafterenv-array) (e.g. `setup-jest.js`) and add the following code to register the screen reader snapshot matchers:

```ts
import "@guidepup/jest";
```

And get cracking with your first screen reader unit test automation code!

```ts
import from "@guidepup/virtual-screen-reader";

function setupBasicPage() {
  document.body.innerHTML = `
  <nav>Nav Text</nav>
  <section>
    <h1>Section Heading</h1>
    <p>Section Text</p>
    <article>
      <header>
        <h1>Article Header Heading</h1>
        <p>Article Header Text</p>
      </header>
      <p>Article Text</p>
    </article>
  </section>
  <footer>Footer</footer>
  `;
}

describe("Screen Reader Tests", () => {
  beforeEach(() => {
    setupBasicPage();
  });

  afterEach(() => {
    document.body.innerHTML = ``;
  });

  test("should match the snapshot of expected screen reader spoken phrases", async () => {
    await expect(document.body).toMatchScreenReaderSnapshot();
  });

  test("should match the inline snapshot of expected screen reader spoken phrases", async () => {
    await expect(document.body).toMatchScreenReaderInlineSnapshot(`
[
  "document",
  "navigation",
  "Nav Text",
  "end of navigation",
  "region",
  "heading, Section Heading, level 1",
  "Section Text",
  "article",
  "banner",
  "heading, Article Header Heading, level 1",
  "Article Header Text",
  "end of banner",
  "Article Text",
  "end of article",
  "end of region",
  "contentinfo",
  "Footer",
  "end of contentinfo",
  "end of document",
]
`);
  });
});
```

## See Also

Check out some of the other Guidepup modules:

- [`@guidepup/virtual-screen-reader`](https://github.com/guidepup/virtual-screen-reader/) - reliable unit testing for your screen reader a11y workflows through JavaScript.
- [`@guidepup/guidepup`](https://github.com/guidepup/guidepup/) - reliable automation for your screen reader a11y workflows through JavaScript supporting VoiceOver and NVDA.
- [`@guidepup/playwright`](https://github.com/guidepup/guidepup-playwright/) - seamless integration of Guidepup with Playwright.

## License

[MIT](https://github.com/guidepup/jest/blob/main/LICENSE)
