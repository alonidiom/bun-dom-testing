import { beforeAll, describe, expect, it } from 'bun:test';
import { elementHasAccessibleName } from './element-has-accessible-name';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <div id="child" aria-label="hello world"></div>
        </div>
    `;
});

describe('elementHasAccessibleName', () => {
  it('should work without param', () => {
    expect(document.getElementById('child')).toSatisfy(
      elementHasAccessibleName(),
    );
    expect(document.getElementById('root')).not.toSatisfy(
      elementHasAccessibleName(),
    );
  });

  it('should work with string param', () => {
    expect(document.getElementById('child')).toSatisfy(
      elementHasAccessibleName('hello world'),
    );

    expect(document.getElementById('child')).not.toSatisfy(
      elementHasAccessibleName('meow world'),
    );
  });

  it('should work with regex param', () => {
    expect(document.getElementById('child')).toSatisfy(
      elementHasAccessibleName(/hello/),
    );
  });
});
