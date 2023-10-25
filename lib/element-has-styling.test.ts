import { beforeAll, test, expect } from 'bun:test';
import { elementHasStyling } from './element-has-styling';

beforeAll(() => {
  document.body.innerHTML = `
        <style>
            #root:has(input:not([value])) {
                font-weight: 700;
            }
            #root input[value] + p {
                color: blue !important;
            }
        </style>
        <div id="root" class="foo bar">
            <input type="text" placeholder="foo" value="hello" />
            <p id="target" style="color: red; font-size: 12px;">hello</p>
        </div>
    `;
});

test('elementHasStyling', () => {
  const target = document.getElementById('target')!;
  const input = document.querySelector('input')! as HTMLInputElement;

  expect(target).toSatisfy(
    elementHasStyling({
      fontSize: '12px',
      color: 'blue',
    }),
  );
  expect(target).toSatisfy(
    elementHasStyling({
      fontWeight: '700',
    }),
  );

  input.value = '';
  input.removeAttribute('value');
  expect(target).toSatisfy(
    elementHasStyling({
      fontWeight: '700',
      color: 'red',
    }),
  );
});
