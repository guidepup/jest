import "./";

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
  "First Section Text",
  "article",
  "banner",
  "heading, Article Header Heading, level 1",
  "Article Header Text",
  "end of banner",
  "Article Text",
  "end of article",
  "end of region",
  "region",
  "heading, Second Section Heading, level 1",
  "Second Section Text",
  "end of region",
  "contentinfo",
  "Footer",
  "end of contentinfo",
  "end of document",
]
`);
  });

  test("toMatchScreenReaderSnapshot on an element", async () => {
    await expect(
      document.getElementsByTagName("section")[1]
    ).toMatchScreenReaderSnapshot();
  });

  test("toMatchScreenReaderInlineSnapshot on an element", async () => {
    await expect(document.getElementsByTagName("section")[1])
      .toMatchScreenReaderInlineSnapshot(`
[
  "region",
  "heading, Second Section Heading, level 1",
  "Second Section Text",
  "end of region",
]
`);
  });

  test("toMatchScreenReaderSnapshot on a text node", async () => {
    await expect(
      document.getElementsByTagName("nav")[0].firstChild
    ).toMatchScreenReaderSnapshot();
  });

  test("toMatchScreenReaderInlineSnapshot on a text node", async () => {
    await expect(document.getElementsByTagName("nav")[0].firstChild)
      .toMatchScreenReaderInlineSnapshot(`
[
  "Nav Text",
]
`);
  });

  test("toMatchScreenReaderSnapshot on a hidden node", async () => {
    await expect(
      document.querySelector('[aria-hidden="true"]')
    ).toMatchScreenReaderSnapshot();
  });

  test("toMatchScreenReaderInlineSnapshot on a hidden node", async () => {
    await expect(
      document.querySelector('[aria-hidden="true"]')
    ).toMatchScreenReaderInlineSnapshot(`[]`);
  });

  test("toMatchScreenReaderSnapshot on a null node", async () => {
    await expect(null).toMatchScreenReaderSnapshot();
  });

  test("toMatchScreenReaderInlineSnapshot on a null node", async () => {
    await expect(null).toMatchScreenReaderInlineSnapshot(`[]`);
  });

  test("snapshot matchers handles parallel assertions", async () => {
    await Promise.all([
      expect(
        document.getElementsByTagName("section")[1]
      ).toMatchScreenReaderSnapshot(),
      expect(document.getElementsByTagName("section")[1])
        .toMatchScreenReaderInlineSnapshot(`
[
  "region",
  "heading, Second Section Heading, level 1",
  "Second Section Text",
  "end of region",
]
`),
    ]);
  });
});
