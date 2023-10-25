import { beforeAll, expect, test } from 'bun:test';
import { elementHasFocus } from './element-has-focus';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root" class="foo bar">
            <input />
        </div>
    `;
});

test('elementHasFocus', () => {
  expect(document.getElementById('root')).not.toSatisfy(elementHasFocus());
  const input = document.querySelector('input');
  input?.focus();
  expect(input).toSatisfy(elementHasFocus());
});
