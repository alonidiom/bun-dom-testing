import { beforeAll, describe, expect, it } from 'bun:test';
import { elementContainsHTML } from './element-contains-html';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <div id="child"></div>
        </div>
    `;
});

describe('elementContainsHTML', () => {
  it('should find root as container of child', () => {
    expect(document.getElementById('root')).toSatisfy(
      elementContainsHTML(`<div id="child"></div>`),
    );
  });
});
