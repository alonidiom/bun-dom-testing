import { ARIARoleDefinitionKey, roles } from 'aria-query';
import { satisfier, getTag, isHTMLElement } from './utils';

function isInput(element: HTMLElement): element is HTMLInputElement {
  return getTag(element) === 'input';
}

function isCheckableInput(
  element: HTMLElement,
): element is HTMLInputElement & { checked: boolean } {
  if (!isInput(element)) return false;
  return ['checkbox', 'radio'].includes(element.type);
}

function getAriaChecked(element: HTMLElement) {
  const elementRole = element.getAttribute('role');
  const role = roles.get(elementRole! as ARIARoleDefinitionKey);

  if (!role) return false;

  if (role.props?.['aria-checked'] === undefined)
    throw new Error('Invalid role');

  const ariaChecked = element.getAttribute('aria-checked');

  return ariaChecked;
}

export const elementIsChecked = satisfier('to be checked', (element, fail) => {
  if (!isHTMLElement(element)) {
    return fail('not an HTMLElement');
  }

  if (isCheckableInput(element)) {
    return element.checked || fail('not checked');
  }

  const ariaChecked = getAriaChecked(element);

  if (ariaChecked === 'true') return true;

  if (ariaChecked === 'false') return fail('not checked');

  return fail('not checked');
});

export const elementIsPartiallyChecked = satisfier(
  'to be checked',
  (element, fail) => {
    if (!isHTMLElement(element)) {
      return fail('not an HTMLElement');
    }

    if (isCheckableInput(element)) {
      return element.indeterminate || fail('not partially checked');
    }

    const ariaChecked = getAriaChecked(element);

    return ariaChecked === 'mixed' || fail('not partially checked');
  },
);
