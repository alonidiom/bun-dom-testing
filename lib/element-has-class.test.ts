import { beforeAll, describe, expect, it } from 'bun:test';
import { elementHasClass } from './element-has-class';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root" class="foo bar">
            <div id="child" aria-label="hello world"></div>
        </div>
    `;
});

describe('elementHasClass', () => {
  it('should work without param', () => {
    expect(document.getElementById('child')).not.toSatisfy(elementHasClass());
    expect(document.getElementById('root')).toSatisfy(elementHasClass());
  });

  it('should work with partial classes', () => {
    expect(document.getElementById('root')).toSatisfy(elementHasClass('foo'));

    expect(document.getElementById('root')).toSatisfy(elementHasClass('bar'));
  });

  it('should work with full application', () => {
    expect(document.getElementById('root')).toSatisfy(
      elementHasClass('foo', 'bar'),
    );

    expect(document.getElementById('root')).not.toSatisfy(
      elementHasClass('foo', 'baz'),
    );
  });
});
