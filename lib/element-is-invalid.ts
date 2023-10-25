import {
  isHTMLElement,
  getTag,
  satisfier,
  canElementHaveAriaProperty,
} from './utils';

const FORM_TAGS = new Set(['form', 'input', 'select', 'textarea']);

export function isElementHavingAriaInvalid(element: HTMLElement) {
  if (!canElementHaveAriaProperty(element, 'aria-invalid')) {
    return false;
  }
  return (
    element.hasAttribute('aria-invalid') &&
    element.getAttribute('aria-invalid') !== 'false'
  );
}

function isSupportsValidityMethod(
  element: HTMLElement,
): element is
  | HTMLInputElement
  | HTMLFormElement
  | HTMLSelectElement
  | HTMLTextAreaElement {
  return FORM_TAGS.has(getTag(element));
}

function isElementInvalid(element: HTMLElement) {
  const isHaveAriaInvalid = isElementHavingAriaInvalid(element);
  if (isSupportsValidityMethod(element)) {
    return isHaveAriaInvalid || !element.checkValidity();
  } else {
    return isHaveAriaInvalid;
  }
}

export const elementIsInvalid = satisfier('to be invalid', (element, fail) => {
  if (!isHTMLElement(element)) {
    return fail('not an HTMLElement');
  }

  return isElementInvalid(element) || fail('element not invalid');
});

export const elementIsValid = satisfier('to be valid', (element, fail) => {
  if (!isHTMLElement(element)) {
    return fail('not an HTMLElement');
  }

  return !isElementInvalid(element) || fail('element is invalid');
});
