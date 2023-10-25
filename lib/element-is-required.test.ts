import { beforeAll, describe, expect, it } from 'bun:test';
import { elementIsRequired } from './element-is-required';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <input type="text" data-assert="unrequired" />
            <input type="text" data-assert="required" required />

            <div role="textbox" data-assert="unrequired" aria-required="false"></div>

            <div role="textbox" data-assert="required" aria-required="true"></div>
        </div>
    `;
});

describe('elementIsRequired', () => {
  it('works as expected without changes', () => {
    document.querySelectorAll('[data-assert="required"]').forEach((element) => {
      expect(element).toSatisfy(elementIsRequired());
    });

    document
      .querySelectorAll('[data-assert="unrequired"]')
      .forEach((element) => {
        expect(element).not.toSatisfy(elementIsRequired());
      });
  });
});
