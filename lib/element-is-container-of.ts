import { satisfier, isHTMLElement } from './utils';

export const elementIsContainerOf = satisfier<[Element]>(
  'to be container of',
  (element, fail, contained) => {
    if (!isHTMLElement(element)) {
      return fail('not an HTMLElement');
    }

    return element.contains(contained) || fail('not contained by container');
  },
);
