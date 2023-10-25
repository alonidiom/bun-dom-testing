import { computeAccessibleName } from 'dom-accessibility-api';
import { isHTMLElement, satisfier } from './utils';

export const elementHasAccessibleName = satisfier<[string | RegExp] | []>(
  'to have accessible name',
  (element, fail, name?) => {
    if (!isHTMLElement(element)) {
      return fail('not an HTMLElement');
    }

    const actualName = computeAccessibleName(element);

    if (!actualName) {
      return fail('no accessible name');
    }

    if (!name) {
      return true;
    }

    if (typeof name === 'string') {
      return actualName === name || fail(actualName);
    }

    if (name instanceof RegExp) {
      return name.test(actualName) || fail(actualName);
    }

    return fail('invalid name');
  },
);
