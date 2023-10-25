import { isNode, matches, normalize, satisfier } from './utils';

export const elementHasTextContent = satisfier<
  [] | [string] | [string, { normalizeWhitespace?: boolean }]
>(
  'to have text content',
  (
    node,
    fail,
    checkWith?,
    options: { normalizeWhitespace?: boolean } = { normalizeWhitespace: true },
  ) => {
    if (!isNode(node)) return fail('not a Node');
    if (node.textContent === null)
      return fail('node does not have text content');
    const textContent = options.normalizeWhitespace
      ? normalize(node.textContent)
      : node.textContent.replace(/\u00a0/g, ' '); // Replace &nbsp; with normal spaces

    const checkingWithEmptyString = textContent !== '' && checkWith === '';

    if (checkingWithEmptyString) {
      return fail(
        'Checking with empty string will always satisfy, use `elementIsEmpty` instead',
      );
    }

    if (!textContent) return fail('node does not have text content');

    if (checkWith === undefined) return true;

    return matches(textContent, checkWith) || fail(textContent);
  },
);
