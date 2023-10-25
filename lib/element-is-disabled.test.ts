import { beforeAll, describe, expect, it } from 'bun:test';
import { elementIsDisabled, elementIsEnabled } from './element-is-disabled';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <input id="t0" disabled />
            <input id="t1" aria-disabled="true" />
            <div id="t2" disabled role="textbox" aria-disabled="true" />
            <fieldset id="t3" disabled>
                <input id="t4" />
            </fieldset>
        </div>
    `;
});

const tests = [true, false, false, true, true] as const;

describe('elementIsDisabled', () => {
  tests.forEach((expected, idx) => {
    const id = `t${idx}`;
    it(`should ${expected ? 'match' : 'not match'} ${id}`, () => {
      (expected
        ? expect(document.getElementById(id))
        : expect(document.getElementById(id)).not
      ).toSatisfy(elementIsDisabled());
    });
  });
});

describe('elementIsDisabled (aria)', () => {
  tests.forEach((_expected, idx) => {
    const id = `t${idx}`;
    it(`should match ${id}`, () => {
      expect(document.getElementById(id)).toSatisfy(
        elementIsDisabled({ considerAria: true }),
      );
    });
  });
});

describe('elementIsEnabled', () => {
  tests.forEach((expected, idx) => {
    const id = `t${idx}`;
    it(`should ${!expected ? 'match' : 'not match'} ${id}`, () => {
      (!expected
        ? expect(document.getElementById(id))
        : expect(document.getElementById(id)).not
      ).toSatisfy(elementIsEnabled());
    });
  });
});
