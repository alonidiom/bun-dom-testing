import { satisfier, isHTMLElement } from './utils';

export const elementHasClass = satisfier<string[]>(
  'to have class/es',
  (element, fail, ...classes) => {
    if (!isHTMLElement(element)) {
      return fail('not an HTMLElement');
    }

    if (!classes.length) {
      return element.hasAttribute('class') || fail('no class attribute');
    }

    const missingClasses = classes.filter(
      (className) => !element.classList.contains(className),
    );

    return (
      missingClasses.length === 0 ||
      fail(`missing classes: ${missingClasses.join(', ')}`)
    );
  },
);
