/// <reference lib="dom" />

import {
  elementRoles,
  ARIARoleDefinitionKey,
  roles,
  ARIAPropertyMap,
} from 'aria-query';
import { inspect } from 'node:util';

export const getImplicitAriaRoles = (() => {
  const topLevelRoleMap = new Map<
    string,
    (element: Element) => ARIARoleDefinitionKey[]
  >();

  // https://github.com/testing-library/dom-testing-library/issues/814
  topLevelRoleMap.set('input', (element: Element) => {
    const input = element as HTMLInputElement;
    if (input.type === 'text' || !input.type) {
      return ['textbox' as ARIARoleDefinitionKey];
    }
    return [];
  });

  for (const [requirements, roles] of elementRoles.entries()) {
    const { name, attributes } = requirements;
    if (!topLevelRoleMap.has(name)) {
      topLevelRoleMap.set(name, () => []);
    }
    const getRoles = topLevelRoleMap.get(name)!;
    topLevelRoleMap.set(name, (element) => {
      const currentRoles = getRoles(element);
      return [
        ...currentRoles,
        ...(attributes
          ? attributes.every((attr) => {
              const { name, value } = attr;
              if (!element.hasAttribute(name)) return false;
              if (value === undefined) return true;
              const attrValue = element.getAttribute(name);
              return attrValue === value;
            })
            ? roles
            : []
          : roles),
      ];
    });
  }

  return (element: Element) => {
    const getRoles = topLevelRoleMap.get(getTag(element));
    return getRoles ? getRoles(element) : [];
  };
})();

export function canElementHaveAriaProperty(
  element: Element,
  ariaProp: keyof ARIAPropertyMap,
) {
  const explicitRole = element.getAttribute('role');
  if (explicitRole) {
    return (
      roles.get(explicitRole as ARIARoleDefinitionKey)?.props[ariaProp] !==
      undefined
    );
  }
  const implicitRoles = getImplicitAriaRoles(element);
  return implicitRoles.some(
    (role) => roles.get(role)?.props[ariaProp] !== undefined,
  );
}

export type HasView = object & {
  ownerDocument: object & {
    defaultView: Window;
  };
};

export function hasDocument(element: unknown): element is HasView {
  // @ts-expect-error
  return !!element?.ownerDocument?.defaultView;
}

export function isNode(element: unknown): element is Node & HasView {
  return hasDocument(element) && element instanceof window.Node;
}

export function isElement(element: unknown): element is Element & HasView {
  return hasDocument(element) && element instanceof window.Element;
}

export function isHTMLElement(
  element: unknown,
): element is HTMLElement & HasView {
  return (
    hasDocument(element) &&
    (element instanceof window.HTMLElement || element instanceof SVGElement)
  );
}

export function isElementInDocument(element: HTMLElement) {
  return element.getRootNode({ composed: true }) === element.ownerDocument;
}

export function getTag(element: Element) {
  return element.tagName.toLowerCase();
}

export function normalize(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

export function matches(textToMatch: string, matcher: string | RegExp) {
  if (matcher instanceof RegExp) {
    return matcher.test(textToMatch);
  } else {
    return textToMatch.includes(String(matcher));
  }
}

export type Satisfier<Args extends any[] = []> = (
  ...args: Args
) => (element: unknown) => boolean;

export function satisfier<Args extends any[] = []>(
  message: string,
  fn: (
    element: unknown,
    fail: (value: unknown) => false,
    ...args: Args
  ) => boolean,
) {
  return (...args: Args) =>
    Object.assign(
      (element: unknown) => {
        const fail = (value: unknown): false => {
          // @ts-expect-error
          Object.assign(element, { [inspect.custom]: () => inspect(value) });

          return false;
        };
        return fn(element, fail, ...args);
      },
      {
        [inspect.custom]: () =>
          args.length
            ? `${message} (${args.map((arg) => inspect(arg)).join(', ')})`
            : message,
      },
    ) as (element: unknown) => boolean;
}
