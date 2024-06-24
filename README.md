# Virtual Screen Reader Jest Matchers

<a href="https://www.npmjs.com/package/@guidepup/jest"><img alt="Virtual Screen Reader Jest Matchers available on NPM" src="https://img.shields.io/npm/v/@guidepup/jest" /></a>
<a href="https://github.com/guidepup/jest/actions/workflows/test.yml"><img alt="Virtual Screen Reader Jest Matchers test workflows" src="https://github.com/guidepup/jest/workflows/Test/badge.svg" /></a>
<a href="https://github.com/guidepup/jest/blob/main/LICENSE"><img alt="Virtual Screen Reader Jest Matchers uses the MIT license" src="https://img.shields.io/github/license/guidepup/jest" /></a>

## Intro

This package aims to supplement your unit testing by enabling you to snapshot the output of a [Virtual Screen Reader](https://github.com/guidepup/virtual-screen-reader/) on your pages or components in your [Jest](https://jestjs.io) unit test workflows.

Through two custom Jest snapshot matchers you can get fast feedback on what you might expect screen readers would output if a user was to traverse the page or component from top to bottom.

> Note: This package should not replace your manual screen reader testing, there is no substitute for testing with real screen readers and with real users.

For testing more complex scenarios, check out the [`@guidepup/virtual-screen-reader`](https://github.com/guidepup/virtual-screen-reader/) package.

If you are looking to automate real screen readers, check out the [`@guidepup/guidepup`](https://github.com/guidepup/guidepup) package.

## Capabilities

- **Mirrors Screen Reader Functionality** - assert on what users might expect to hear when using screen readers to traverse a page or component.
- **UI Framework Agnostic** - want to use React, Vue, Solid, Svelte, etc.? All good here! Works with any UI framework, and plays nicely with the [Testing Library](https://testing-library.com/) suite.
- **Fast Feedback** - avoid the cumbersome overhead of running an e2e test with a running screen reader by running virtually over the provided DOM.

## Getting Started

Install the Guidepup Jest matchers package and Virtual Screen Reader to your project:

```bash
# With NPM
npm install -D @guidepup/jest @guidepup/virtual-screen-reader

# With Yarn
yarn add -D @guidepup/jest @guidepup/virtual-screen-reader
```

If you are using TypeScript, make sure to setup Jest correctly by following the [Using TypeScript](https://jestjs.io/docs/getting-started#using-typescript) guide.

Add a [Jest setup file](https://jestjs.io/docs/configuration#setupfilesafterenv-array) (e.g. `setup-jest.js`) and add the following code to register the screen reader snapshot matchers:

```ts
import "@guidepup/jest";
```

And get cracking with your first screen reader unit test automation code!

## Usage

```ts
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

## Powerful Tooling

Check out some of the other Guidepup modules:

- [`@guidepup/virtual-screen-reader`](https://github.com/guidepup/virtual-screen-reader/) - reliable unit testing for your screen reader a11y workflows through JavaScript.
- [`@guidepup/guidepup`](https://github.com/guidepup/guidepup/) - reliable automation for your screen reader a11y workflows through JavaScript supporting VoiceOver and NVDA.
- [`@guidepup/playwright`](https://github.com/guidepup/guidepup-playwright/) - seamless integration of Guidepup with Playwright.

## Resources

- [Contributing](.github/CONTRIBUTING.md)
- [Changelog](https://github.com/guidepup/jest/releases)
- [MIT License](https://github.com/guidepup/jest/blob/main/LICENSE)
