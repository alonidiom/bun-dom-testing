import { beforeAll, describe, expect, it } from 'bun:test';
import { elementIsVisible } from './element-is-visible';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <div id="normal">Hello World</div>
            <div id="transparent" style="opacity: 0">Hello World</div>
            <div id="hidden" style="display: none">Hello World</div>
            <div id="invisible" style="visibility: hidden">Hello World</div>
            <div id="collapse" style="visibility: collapse">Hello World</div>
            <details id="details">
                <summary>Details</summary>
                <div>Hello World</div>
            </details>
            <details id="details-open" open>
                <summary>Details</summary>
                <div>Hello World</div>
            </details>
            <div id="parent" hidden>
                <div id="child-of-hidden">Hello World</div>
            </div>
        </div>
    `;
});

const tests = [
  ['normal', true],
  ['transparent', false],
  ['hidden', false],
  ['invisible', false],
  ['collapse', false],
  ['details', false],
  ['details-open', true],
  ['child-of-hidden', false],
] as const;

describe('elementIsVisible', () => {
  for (let [id, expected] of tests) {
    it(`should ${expected ? 'match' : 'not match'} ${id}`, () => {
      (expected
        ? expect(document.getElementById(id))
        : expect(document.getElementById(id)).not
      ).toSatisfy(elementIsVisible());
    });
  }
});
