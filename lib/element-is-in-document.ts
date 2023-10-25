import { satisfier, isElementInDocument, isHTMLElement } from './utils';

export const elementIsInDocument = satisfier(
  'to be in document',
  (element, fail) => {
    if (!isHTMLElement(element)) {
      return fail('not an HTMLElement');
    }

    return isElementInDocument(element) || fail('not in document');
  },
);
