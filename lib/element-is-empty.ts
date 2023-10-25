import { satisfier, isHTMLElement } from './utils';

export const elementIsEmpty = satisfier('to be empty', (element, fail) => {
  if (!isHTMLElement(element)) {
    return fail('Expected element to be an HTMLElement');
  }

  return isEmptyElement(element) || fail('not empty');
});

/**
 * Identifies if an element doesn't contain child nodes (excluding comments)
 * ℹ Node.COMMENT_NODE can't be used because of the following issue
 * https://github.com/jsdom/jsdom/issues/2220
 */
function isEmptyElement(element: HTMLElement | SVGAElement) {
  const nonCommentChildNodes = Array.from(element.childNodes).filter(
    (node) => node.nodeType !== 8,
  );
  return nonCommentChildNodes.length === 0;
}
