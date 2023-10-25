import { computeAccessibleDescription } from 'dom-accessibility-api';
import { isHTMLElement, satisfier } from './utils';

export const elementHasAccessibleDescription = satisfier<
  [string | RegExp] | []
>('to have accessible description', (element, fail, description?) => {
  if (!isHTMLElement(element)) {
    return fail('not an HTMLElement');
  }

  const actualDescription = computeAccessibleDescription(element);

  if (!actualDescription) {
    return fail('no accessible description');
  }

  if (!description) {
    return true;
  }

  if (typeof description === 'string') {
    return actualDescription === description || fail(actualDescription);
  }

  if (description instanceof RegExp) {
    return description.test(actualDescription) || fail(actualDescription);
  }

  return fail('invalid description');
});
