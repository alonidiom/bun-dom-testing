import { isHTMLElement, getTag, satisfier } from './utils';
import { ARIARoleDefinitionKey, roles } from 'aria-query';

// form elements that support 'disabled'
const FORM_TAGS = new Set([
  'fieldset',
  'input',
  'select',
  'optgroup',
  'option',
  'button',
  'textarea',
]);

/*
 * According to specification:
 * If <fieldset> is disabled, the form controls that are its descendants,
 * except descendants of its first optional <legend> element, are disabled
 *
 * https://html.spec.whatwg.org/multipage/form-elements.html#concept-fieldset-disabled
 *
 * This method tests whether element is first legend child of fieldset parent
 */
function isFirstLegendChildOfFieldset(
  element: HTMLElement,
  parent: HTMLElement,
) {
  return (
    getTag(element) === 'legend' &&
    getTag(parent) === 'fieldset' &&
    element.isSameNode(
      Array.from(parent.children).find((child) => getTag(child) === 'legend') ??
        null,
    )
  );
}

function isElementDisabledByParent(
  element: HTMLElement,
  parent: HTMLElement,
  considerAria: boolean,
) {
  return (
    isElementDisabled(parent, considerAria) &&
    !isFirstLegendChildOfFieldset(element, parent)
  );
}

function isCustomElement(tag: string) {
  return tag.includes('-');
}

/*
 * Only certain form elements and custom elements can actually be disabled:
 * https://html.spec.whatwg.org/multipage/semantics-other.html#disabled-elements
 */
function canElementBeDisabled(element: HTMLElement) {
  const tag = getTag(element);
  return FORM_TAGS.has(tag) || isCustomElement(tag);
}

function canElementBeAriaDisabled(element: HTMLElement) {
  if (canElementBeDisabled(element)) return true;
  const role = element.getAttribute('role');
  if (!role) return false;
  const roleDefinition = roles.get(role as ARIARoleDefinitionKey);
  if (!roleDefinition) return false;
  return roleDefinition.props?.['aria-disabled'] !== undefined;
}

function isElementDisabled(element: HTMLElement, considerAria: boolean) {
  if (considerAria && canElementBeAriaDisabled(element)) {
    const ariaDisabled = element.getAttribute('aria-disabled');
    if (ariaDisabled === 'true') return true;
    if (ariaDisabled === 'false') return false;
  }
  return canElementBeDisabled(element) && element.hasAttribute('disabled');
}

function isAncestorDisabled(
  element: HTMLElement,
  considerAria: boolean,
): boolean {
  const parent = element.parentElement;
  if (!parent) return false;

  return (
    isElementDisabledByParent(element, parent, considerAria) ||
    isAncestorDisabled(parent, considerAria)
  );
}

function isElementOrAncestorDisabled(
  element: HTMLElement,
  considerAria: boolean,
) {
  if (!considerAria && !canElementBeDisabled(element)) return false;
  return (
    isElementDisabled(element, considerAria) ||
    isAncestorDisabled(element, considerAria)
  );
}

export const elementIsDisabled = satisfier<[] | [{ considerAria?: boolean }]>(
  'to be disabled',
  (element, fail, { considerAria = false } = {}) => {
    if (!isHTMLElement(element)) {
      return fail('not an HTMLElement');
    }
    return (
      isElementOrAncestorDisabled(element, considerAria) || fail('not disabled')
    );
  },
);

export const elementIsEnabled = satisfier<[] | [{ considerAria?: boolean }]>(
  'to be enabled',
  (element, fail, { considerAria = false } = {}) => {
    if (!isHTMLElement(element)) {
      return fail('not an HTMLElement');
    }
    return (
      !isElementOrAncestorDisabled(element, considerAria) || fail('not enabled')
    );
  },
);
