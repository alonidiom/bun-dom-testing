import { beforeAll, describe, expect, it } from 'bun:test';
import { elementHasAttribute } from './element-has-attribute';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <div id="child" aria-label="hello world"></div>
        </div>
    `;
});

describe('elementHasAttribute', () => {
  it('should work without param', () => {
    expect(document.getElementById('child')).toSatisfy(
      elementHasAttribute('aria-label'),
    );
    expect(document.getElementById('root')).not.toSatisfy(
      elementHasAttribute('aria-label'),
    );
  });

  it('should work with string param', () => {
    expect(document.getElementById('child')).toSatisfy(
      elementHasAttribute('aria-label', 'hello world'),
    );

    expect(document.getElementById('child')).not.toSatisfy(
      elementHasAttribute('aria-label', 'meow world'),
    );
  });
});
