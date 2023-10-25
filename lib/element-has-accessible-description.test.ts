import { beforeAll, describe, expect, it } from 'bun:test';
import { elementHasAccessibleDescription } from './element-has-accessible-description';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <div id="child" aria-description="hello world"></div>
        </div>
    `;
});

describe('elementHasAccessibleDescription', () => {
  it('should work without param', () => {
    expect(document.getElementById('child')).toSatisfy(
      elementHasAccessibleDescription(),
    );
    expect(document.getElementById('root')).not.toSatisfy(
      elementHasAccessibleDescription(),
    );
  });

  it('should work with string param', () => {
    expect(document.getElementById('child')).toSatisfy(
      elementHasAccessibleDescription('hello world'),
    );

    expect(document.getElementById('child')).not.toSatisfy(
      elementHasAccessibleDescription('meow world'),
    );
  });

  it('should work with regex param', () => {
    expect(document.getElementById('child')).toSatisfy(
      elementHasAccessibleDescription(/hello/),
    );
  });
});
