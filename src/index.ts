import { toMatchInlineSnapshot, toMatchSnapshot } from "jest-snapshot";
import { Virtual } from "@guidepup/virtual-screen-reader";

// REF: https://jestjs.io/docs/en/expect.html#expectextendmatchers
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      /**
       * Takes a snapshot of the Virtual Screen Reader spoken output from navigating
       * completely through the provided container.
       */
      toMatchScreenReaderSnapshot(): Promise<void>;

      /**
       * Takes an inline snapshot of the Virtual Screen Reader spoken output from navigating
       * completely through the provided container.
       *
       * @param {string} [inlineSnapshot] The inline snapshot to compare against.
       */
      toMatchScreenReaderInlineSnapshot(inlineSnapshot?: string): Promise<void>;
    }
  }
}

declare module "expect" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Matchers<R> {
    /**
     * Takes a snapshot of the Virtual Screen Reader spoken output from navigating
     * completely through the provided container.
     */
    toMatchScreenReaderSnapshot(): Promise<void>;

    /**
     * Takes an inline snapshot of the Virtual Screen Reader spoken output from navigating
     * completely through the provided container.
     *
     * @param {string} [inlineSnapshot] The inline snapshot to compare against.
     */
    toMatchScreenReaderInlineSnapshot(inlineSnapshot?: string): Promise<void>;
  }
}

if (expect?.extend !== undefined) {
  expect.extend({ toMatchScreenReaderInlineSnapshot });
  expect.extend({ toMatchScreenReaderSnapshot });
}

async function getScreenReaderOutput(container: Node): Promise<string[]> {
  const virtual = new Virtual();

  let spokenPhraseLog: string[] = [];

  try {
    await virtual.start({ container });

    await virtual.next();

    const singleElement = virtual.activeNode === container;

    while (virtual.activeNode !== container && virtual.activeNode !== null) {
      await virtual.next();
    }

    spokenPhraseLog = await virtual.spokenPhraseLog();

    if (singleElement) {
      spokenPhraseLog.pop();
    }
  } catch {
    // swallow error
  } finally {
    await virtual.stop();
  }

  return spokenPhraseLog;
}

/**
 * Takes an inline snapshot of the Virtual Screen Reader spoken output from navigating
 * completely through the provided container.
 *
 * @param {Node} container The bounding HTML element to take the Virtual Screen Reader snapshot in. To use the entire page pass `document.body`.
 * @param {string} inlineSnapshot The inline snapshot to compare against.
 */
export async function toMatchScreenReaderInlineSnapshot(
  container: Node,
  ...inlineSnapshot: [
    propertiesOrSnapshot?: object | string,
    inlineSnapshot?: string
  ]
): Promise<jest.CustomMatcherResult> {
  this.error = new Error();

  const snapshot = await getScreenReaderOutput(container);

  return toMatchInlineSnapshot.call(this, snapshot, ...inlineSnapshot);
}

/**
 * Takes a snapshot of the Virtual Screen Reader spoken output from navigating
 * completely through the provided container.
 *
 * @param {Node} container The bounding HTML element to take the Virtual Screen Reader snapshot in. To use the entire page pass `document.body`.
 */
export async function toMatchScreenReaderSnapshot(
  container: Node
): Promise<jest.CustomMatcherResult> {
  this.error = new Error();

  const snapshot = await getScreenReaderOutput(container);

  return toMatchSnapshot.call(this, snapshot, "toMatchScreenReaderSnapshot");
}
