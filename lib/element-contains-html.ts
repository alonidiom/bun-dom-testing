import { isHTMLElement, satisfier } from './utils';

function getNormalizedHtml(container: HTMLElement, htmlText: string) {
  const div = container.ownerDocument.createElement('div');
  div.innerHTML = htmlText;
  return div.innerHTML;
}

export const elementContainsHTML = satisfier<[string]>(
  'to contain HTML',
  (element, fail, html) => {
    if (!isHTMLElement(element)) {
      return fail('not an HTMLElement');
    }

    const actualHTML = getNormalizedHtml(element, html);
    return element.outerHTML.includes(actualHTML) || fail(actualHTML);
  },
);
