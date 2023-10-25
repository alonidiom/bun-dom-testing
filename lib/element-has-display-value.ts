import { inspect } from 'node:util';
import { getTag, isHTMLElement, satisfier } from './utils';

function isInputElement(element: HTMLElement): element is HTMLInputElement {
  return getTag(element) === 'input';
}

function isSelectElement(element: HTMLElement): element is HTMLSelectElement {
  return getTag(element) === 'select';
}

function isElementWithValue(
  element: HTMLElement,
): element is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement {
  return (
    isInputElement(element) ||
    getTag(element) === 'textarea' ||
    isSelectElement(element)
  );
}

export const elementHasDisplayValue = satisfier<[] | [string | RegExp]>(
  'to have display value',
  (element, fail, value?) => {
    if (!isHTMLElement(element)) {
      return fail('not an HTMLElement');
    }

    if (!isElementWithValue(element)) {
      return fail('not an input, textarea or select element');
    }

    if (
      isInputElement(element) &&
      ['checkbox', 'radio'].includes(element.type)
    ) {
      return fail('not an input element with a display value');
    }

    const values = (
      isSelectElement(element)
        ? Array.from(element.options)
            .filter((option) => option.selected)
            .map((option) => option.textContent ?? option.value)
        : [element.value]
    ).filter(Boolean);

    if (values.length === 0) {
      return fail('no display value: ' + element.outerHTML);
    }

    if (!value) {
      return true;
    }

    const expectedValues = Array.isArray(value)
      ? (value as (string | RegExp)[])
      : [value];
    const missingValues = expectedValues.filter(
      (expectedValue) =>
        !values.some((value) => {
          if (expectedValue instanceof RegExp) {
            return expectedValue.test(value);
          }
          return value === expectedValue;
        }),
    );

    if (missingValues.length === 0) {
      return true;
    }

    return fail(
      `expected to have display value ${missingValues
        .map((value) => inspect(value))
        .join(', ')}`,
    );
  },
);
