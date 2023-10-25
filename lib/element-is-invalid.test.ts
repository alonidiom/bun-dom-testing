import { beforeAll, describe, expect, it } from 'bun:test';
import { elementIsInvalid, elementIsValid } from './element-is-invalid';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <input type="text" data-assert="valid" />
            <input type="text" data-assert="invalid" required />

            <div role="textbox" data-assert="valid" aria-invalid="false"></div>

            <div role="textbox" data-assert="invalid" aria-invalid="true"></div>

            <form data-assert="invalid">
                <input type="text" required />
            </form>
        </div>
    `;
});

describe('elementIsInvalid', () => {
  it('works as expected without changes', () => {
    document.querySelectorAll('[data-assert="invalid"]').forEach((element) => {
      expect(element).toSatisfy(elementIsInvalid());
    });
  });

  it('works as expected with changes', () => {
    const input = Object.assign(document.createElement('input'), {
      type: 'text',
      required: true,
    });
    document.body.appendChild(input);

    expect(input).toSatisfy(elementIsInvalid());

    input.value = 'foo';

    expect(input).not.toSatisfy(elementIsInvalid());
  });
});

describe('elementIsValid', () => {
  it('works as expected without changes', () => {
    document.querySelectorAll('[data-assert="valid"]').forEach((element) => {
      expect(element).toSatisfy(elementIsValid());
    });
  });
});
