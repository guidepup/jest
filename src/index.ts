import { toMatchInlineSnapshot, toMatchSnapshot } from "jest-snapshot";
import { virtual } from "@guidepup/virtual-screen-reader";

// REF: https://jestjs.io/docs/en/expect.html#expectextendmatchers
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchScreenReaderSnapshot(): R;
      toMatchScreenReaderInlineSnapshot(inlineSnapshot?: string): R;
    }
  }
}

if (expect?.extend !== undefined) {
  expect.extend({ toMatchScreenReaderInlineSnapshot });
  expect.extend({ toMatchScreenReaderSnapshot });
}

async function getScreenReaderOutput(container) {
  let spokenPhraseLog: string[] = [];

  try {
    await virtual.start({ container });
    await virtual.next();

    const singleElement = virtual.activeNode === container;

    while (virtual.activeNode !== container) {
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

export async function toMatchScreenReaderInlineSnapshot(container, ...rest) {
  this.error = new Error();

  const snapshot = await getScreenReaderOutput(container);

  return toMatchInlineSnapshot.call(this, snapshot, ...rest);
}

export async function toMatchScreenReaderSnapshot(container) {
  this.error = new Error();

  const snapshot = await getScreenReaderOutput(container);

  return toMatchSnapshot.call(this, snapshot, "toMatchScreenReaderSnapshot");
}
