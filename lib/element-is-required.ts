import {
  isHTMLElement,
  getTag,
  satisfier,
  canElementHaveAriaProperty,
} from './utils';

const FORM_TAGS = new Set(['select', 'textarea']);

const UNSUPPORTED_INPUT_TYPES = new Set([
  'color',
  'hidden',
  'range',
  'submit',
  'image',
  'reset',
]);

function elementCanBeRequired(
  element: HTMLElement,
): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
  const tag = getTag(element);
  return (
    FORM_TAGS.has(tag) ||
    (tag === 'input' &&
      !UNSUPPORTED_INPUT_TYPES.has((element as HTMLInputElement).type))
  );
}

function elementIsRequiredOnSupportedTypes(element: HTMLElement) {
  if (!elementCanBeRequired(element)) {
    return false;
  }

  return element.hasAttribute('required');
}

function elementIsAriaRequired(element: HTMLElement) {
  if (!canElementHaveAriaProperty(element, 'aria-required')) {
    return false;
  }

  return (
    element.hasAttribute('aria-required') &&
    element.getAttribute('aria-required') !== 'false'
  );
}

export const elementIsRequired = satisfier(
  'to be required',
  (element, fail) => {
    if (!isHTMLElement(element)) {
      throw new Error('Expected element to be an HTMLElement');
    }

    return (
      elementIsRequiredOnSupportedTypes(element) ||
      elementIsAriaRequired(element) ||
      fail('element not required')
    );
  },
);
