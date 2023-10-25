import { isElementInDocument, isHTMLElement, satisfier } from './utils';

export const elementHasFocus = satisfier('to have focus', (element, fail) => {
  if (!isHTMLElement(element)) {
    return fail('not an HTMLElement');
  }
  return (
    (isElementInDocument(element) &&
      element === element.ownerDocument.activeElement) ||
    fail('element does not have focus')
  );
});
