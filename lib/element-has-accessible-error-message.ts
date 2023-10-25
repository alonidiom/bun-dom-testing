import { elementIsVisible } from './element-is-visible';
import { isElementHavingAriaInvalid } from './element-is-invalid';
import {
  normalize,
  isHTMLElement,
  canElementHaveAriaProperty,
  satisfier,
  getImplicitAriaRoles,
} from './utils';

/**
 * See `aria-errormessage` spec at https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage
 *
 * This will only match if elements are marked with `aria-invalid` and if the error element is visible.
 */
export const elementHasAccessibleErrorMessage = satisfier<
  [] | [string | RegExp]
>('to have error message', (element, fail, expectedErrorMessage?) => {
  if (!isHTMLElement(element)) {
    return fail('not an HTMLElement');
  }

  if (!canElementHaveAriaProperty(element, 'aria-errormessage')) {
    return fail(
      'element cannot have aria-errormessage' +
        JSON.stringify(getImplicitAriaRoles(element)),
    );
  }

  if (!isElementHavingAriaInvalid(element)) {
    return fail('element is not invalid');
  }

  const actualErrorMessageId = element.getAttribute('aria-errormessage');
  if (!actualErrorMessageId) {
    return fail('element does not have aria-errormessage');
  }

  const errorElement = document.getElementById(actualErrorMessageId);
  if (!errorElement) {
    return fail('error element does not exists');
  }

  if (!elementIsVisible()(errorElement)) {
    return fail('error element is not visible');
  }

  const actualErrorMessage = normalize(errorElement.textContent ?? '');

  if (!actualErrorMessage) {
    return fail('error element does not have text content');
  }

  if (!expectedErrorMessage) {
    return true;
  }

  if (typeof expectedErrorMessage === 'string') {
    return (
      actualErrorMessage === normalize(expectedErrorMessage) ||
      fail(actualErrorMessage)
    );
  }

  if (expectedErrorMessage instanceof RegExp) {
    return (
      expectedErrorMessage.test(actualErrorMessage) || fail(actualErrorMessage)
    );
  }

  return fail('invalid error message');
});
