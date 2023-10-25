import { isHTMLElement, satisfier } from './utils';

export const elementHasStyling = satisfier<
  [Partial<ReturnType<typeof window.getComputedStyle>>]
>('to have styling', (element, fail, style) => {
  if (!isHTMLElement(element)) {
    return fail('not an HTMLElement');
  }
  const { getComputedStyle } = element.ownerDocument.defaultView;

  const computedStyle = getComputedStyle(element);

  const styleKeys = Object.keys(style) as Array<keyof typeof style>;

  const styleMisses = styleKeys.filter((key) => {
    const expectedValue = style[key];
    const actualValue = computedStyle[key];

    return expectedValue !== actualValue;
  });

  return (
    styleMisses.length === 0 ||
    fail(
      `element does not have proper styling: (${styleMisses.map((key) => {
        const expectedValue = style[key];
        const actualValue = computedStyle[key];

        return `"${key}" expected to be ${expectedValue}, was ${actualValue}`;
      })})`,
    )
  );
});
