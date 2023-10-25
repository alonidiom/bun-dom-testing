# bun-dom-testing

This library is basically a carbon copy of [@testing-library/jest-dom](https://github.com/testing-library/jest-dom), but designed for the [Bun test runner](https://bun.sh/docs/cli/test), has built-in typing and sports few minimal changes.

## Installation

```sh
bun add -d bun-dom-testing @happy-dom/global-registrator
```

Then, follow the Bun instruction for [DOM testing](https://bun.sh/docs/test/dom).

## Usage

As Bun's `expect` can't be extended yet, you need to use the exported functions as arguments to the `expect(...).toSatisfy(...)` method.

```tsx
import { test, expect } from 'bun:test';
import { render } from '@testing-library/react';
import {
    elementIsInDocument,
    elementIsVisible,
    elementHasAttribute,
} from 'bun-dom-testing';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByRole('link', { name: /learn react/i });
  expect(linkElement).toSatisfy(elementIsInDocument());
  expect(linkElement).toSatisfy(elementIsVisible());
  expect(linkElement).toSatisfy(elementHasAttribute('href', 'https://reactjs.org'));
}
```

## API

Verbose examples can be found in the test files for each function.

### elementContainsHTML(htmlText: string)

Match an element that contains the given HTML text (outer HTML).

### elementHasAccessibleDescription(text?: string | RegExp)

Match an element that has the given accessible description.

### elementHasAccessibleErrorMessage(text?: string | RegExp)

Match an element that has the given accessible error message.

### elementHasAccessibleName(text?: string | RegExp)

Match an element that has the given accessible name.

### elementHasAttribute(attribute: string, value?: string)

Match an element that has the given attribute with the given value.

### elementHasClass(...classes: string[])

Match an element that has all of the given class names.

### elementHasDisplayValue(value?: string | RegExp)

Match an element that has the given display value.

### elementHasFocus()

Match an element that has focus.

### elementHasStyling(styleSubset: Partial<CSSStyleDeclaration>)

Match an element that has the given styling.

### elementHasTextContent(text?: string | RegExp, { normalizeWhitespace = true })

Match an element that has the given text content.

### elementIsChecked()

Match an element that is checked.

### elementIsContainerOf(element: HTMLElement)

Match an element that is a container of the given element.

### elementIsDisabled({ considerAria = false }?)

Match an element that is disabled, optionally considering the `aria-disabled` attribute.

### elementIsEmpty()

Match an element that is empty (contains no other nodes).

### elementIsEnabled({ considerAria = false }?)

Match an element that is enabled, optionally considering the `aria-disabled` attribute.

### elementIsInDocument()

Match an element that is in the document.

### elementIsInvalid()

Match an element that is invalid.

### elementIsPartiallyChecked()

Match an element that is partially checked.

### elementIsRequired()

Match an element that is required.

### elementIsValid()

Match an element that is valid.

### elementIsVisible()

Match an element that is visible.
