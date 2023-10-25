import { beforeAll, describe, expect, it } from 'bun:test';
import { elementHasDisplayValue } from './element-has-display-value';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root" class="foo bar" data-fail>
            <input type="text" value="hello" data-pass>
            <textarea data-pass>hello</textarea>
            <select data-pass>
                <option selected>hello</option>
                <option>world</option>
            </select>
            <input type="checkbox" checked data-fail>
        </div>
    `;
});

describe('elementHasDisplayValue', () => {
  it('should work without param', () => {
    document.querySelectorAll('[data-pass]').forEach((element) => {
      expect(element).toSatisfy(elementHasDisplayValue());
    });
    document.querySelectorAll('[data-fail]').forEach((element) => {
      expect(element).not.toSatisfy(elementHasDisplayValue());
    });
  });

  it('should work with string param', () => {
    document.querySelectorAll('[data-pass]').forEach((element) => {
      expect(element).toSatisfy(elementHasDisplayValue('hello'));
    });

    document.querySelectorAll('[data-pass]').forEach((element) => {
      expect(element).not.toSatisfy(elementHasDisplayValue('fs'));
    });
  });

  it('should work with regex', () => {
    document.querySelectorAll('[data-pass]').forEach((element) => {
      expect(element).toSatisfy(elementHasDisplayValue(/hell/));
    });

    document.querySelectorAll('[data-pass]').forEach((element) => {
      expect(element).not.toSatisfy(elementHasDisplayValue(/foo/));
    });
  });
});
