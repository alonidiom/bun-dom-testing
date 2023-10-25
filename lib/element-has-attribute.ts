import { satisfier, isHTMLElement } from './utils';

export const elementHasAttribute = satisfier<[string] | [string, string]>(
  'to have attribute',
  (element, fail, attribute, value?) => {
    if (!isHTMLElement(element)) {
      return fail('not an HTMLElement');
    }

    if (!element.hasAttribute(attribute)) {
      return fail('no such attribute');
    }

    if (!value) {
      return true;
    }

    const actualValue = element.getAttribute(attribute);
    return actualValue === value || fail(actualValue);
  },
);
