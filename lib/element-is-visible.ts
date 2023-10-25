import {
  HasView,
  satisfier,
  hasDocument,
  isElementInDocument,
  isHTMLElement,
} from './utils';

function isStyleVisible(element: HTMLElement & HasView) {
  const { getComputedStyle } = element.ownerDocument.defaultView;

  const { display, visibility, opacity } = getComputedStyle(element);
  return (
    display !== 'none' &&
    visibility !== 'hidden' &&
    visibility !== 'collapse' &&
    opacity !== '0'
  );
}

function isAttributeVisible(
  element: HTMLElement,
  previousElement?: Node | null,
) {
  let detailsVisibility;

  if (previousElement) {
    detailsVisibility =
      element.nodeName === 'DETAILS' && previousElement.nodeName !== 'SUMMARY'
        ? element.hasAttribute('open')
        : true;
  } else {
    detailsVisibility =
      element.nodeName === 'DETAILS' ? element.hasAttribute('open') : true;
  }

  return !element.hasAttribute('hidden') && detailsVisibility;
}

function isElementVisible(
  element: HTMLElement & HasView,
  previousElement?: Node | null,
): boolean {
  return (
    isStyleVisible(element) &&
    isAttributeVisible(element, previousElement) &&
    (!element.parentElement ||
      (hasDocument(element.parentElement) &&
        isElementVisible(element.parentElement, element)))
  );
}

export const elementIsVisible = satisfier('to be visible', (element, fail) => {
  if (!isHTMLElement(element)) {
    return fail('not an HTMLElement');
  }

  const isVisible = isElementInDocument(element) && isElementVisible(element);

  return isVisible || fail('element not visible');
});
