import { beforeAll, describe, expect, it } from 'bun:test';
import {
  elementIsChecked,
  elementIsPartiallyChecked,
} from './element-is-checked';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <input type="checkbox" id="normal" />
            <input type="checkbox" id="normal-checked" checked />
            <input type="radio" name="radio" id="radio-1" />
            <input type="radio" name="radio" id="radio-2" checked />
            <div id="switch" role="checkbox" aria-checked="true"></div>
            <div id="switch-off" role="checkbox" aria-checked="false"></div>
        </div>
    `;
});

const tests = [
  ['normal', false],
  ['normal-checked', true],
  ['radio-1', false],
  ['radio-2', true],
  ['switch', true],
  ['switch-off', false],
] as const;

describe('elementIsChecked', () => {
  for (let [id, expected] of tests) {
    it(`should ${expected ? 'match' : 'not match'} ${id}`, () => {
      (expected
        ? expect(document.getElementById(id))
        : expect(document.getElementById(id)).not
      ).toSatisfy(elementIsChecked());
    });
  }
});

describe('elementIsPartiallyChecked', () => {
  it('works for the JS property', () => {
    const checkbox = Object.assign(document.createElement('input'), {
      type: 'checkbox',
    });

    expect(checkbox).not.toSatisfy(elementIsPartiallyChecked());

    checkbox.indeterminate = true;

    expect(checkbox).toSatisfy(elementIsPartiallyChecked());
  });

  it('works for the ARIA attribute', () => {
    const checkbox = Object.assign(document.createElement('div'), {
      role: 'checkbox',
    });

    expect(checkbox).not.toSatisfy(elementIsPartiallyChecked());

    checkbox.setAttribute('aria-checked', 'mixed');

    expect(checkbox).toSatisfy(elementIsPartiallyChecked());
  });
});
