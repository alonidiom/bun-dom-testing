import { beforeAll, describe, expect, it } from 'bun:test';
import { elementIsEmpty } from './element-is-empty';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <input id="t0" disabled />
            <div id="t1">foo</div>
            <div id="t2"></div>
            <fieldset id="t3" disabled>
                <input id="t4" />
            </fieldset>
        </div>
    `;
});

const tests = [true, false, true, false, true] as const;

describe('elementIsEmpty', () => {
  tests.forEach((expected, idx) => {
    const id = `t${idx}`;
    it(`should ${expected ? 'match' : 'not match'} ${id}`, () => {
      (expected
        ? expect(document.getElementById(id))
        : expect(document.getElementById(id)).not
      ).toSatisfy(elementIsEmpty());
    });
  });
});
