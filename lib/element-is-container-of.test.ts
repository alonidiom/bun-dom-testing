import { beforeAll, describe, expect, it } from 'bun:test';
import { elementIsContainerOf } from './element-is-container-of';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <div id="child"></div>
        </div>
    `;
});

describe('elementIsContainerOf', () => {
  it('should find root as container of child', () => {
    expect(document.getElementById('root')).toSatisfy(
      elementIsContainerOf(document.getElementById('child')!),
    );
  });
});
