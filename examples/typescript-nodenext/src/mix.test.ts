import { virtual } from "@guidepup/virtual-screen-reader";

function setupBasicPage() {
  document.body.innerHTML = `
  <nav>Nav Text</nav>
  <section>
    <h1>First Section Heading</h1>
    <p>First Section Text</p>
    <article>
      <header>
        <h1>Article Header Heading</h1>
        <p>Article Header Text</p>
      </header>
      <p>Article Text</p>
    </article> 
  </section>
  <section>
    <h1>Second Section Heading</h1>
    <p>Second Section Text</p>
  </section>
  <section aria-hidden="true">
    <h1>Hidden Section Heading</h1>
    <p>Hidden Section Text</p>
  </section>
  <footer>Footer</footer>
  `;
}

describe("matchers", () => {
  beforeEach(() => {
    setupBasicPage();
  });

  afterEach(() => {
    document.body.innerHTML = ``;
  });

  describe("snapshot tests", () => {
    test("toMatchScreenReaderSnapshot on the whole body", async () => {
      await expect(document.body).toMatchScreenReaderSnapshot();
    });

    test("toMatchScreenReaderInlineSnapshot on the whole body", async () => {
      await expect(document.body).toMatchScreenReaderInlineSnapshot(`
[
  "document",
  "navigation",
  "Nav Text",
  "end of navigation",
  "region",
  "heading, First Section Heading, level 1",
  "paragraph",
  "First Section Text",
  "end of paragraph",
  "article",
  "banner",
  "heading, Article Header Heading, level 1",
  "paragraph",
  "Article Header Text",
  "end of paragraph",
  "end of banner",
  "paragraph",
  "Article Text",
  "end of paragraph",
  "end of article",
  "end of region",
  "region",
  "heading, Second Section Heading, level 1",
  "paragraph",
  "Second Section Text",
  "end of paragraph",
  "end of region",
  "contentinfo",
  "Footer",
  "end of contentinfo",
  "end of document",
]
`);
    });
  });

  describe("virtual screen reader tests", () => {
    test("navigating headings", async () => {
      await virtual.start({ container: document.body });

      await virtual.perform(virtual.commands.moveToNextHeading);
      const firstHeadingPhrase = await virtual.lastSpokenPhrase();

      do {
        await virtual.perform(virtual.commands.moveToNextHeading);
      } while ((await virtual.lastSpokenPhrase()) !== firstHeadingPhrase);

      expect(await virtual.spokenPhraseLog()).toMatchSnapshot();

      await virtual.stop();
    });
  });
});
