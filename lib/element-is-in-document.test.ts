import { beforeAll, describe, expect, it } from 'bun:test';
import { elementIsInDocument } from './element-is-in-document';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
        </div>
    `;
});

describe('elementIsInDocument', () => {
  it('should find root as in document', () => {
    expect(document.getElementById('root')).toSatisfy(elementIsInDocument());
  });

  it('should not find missing as in document', () => {
    const missing = document.createElement('div');
    expect(missing).not.toSatisfy(elementIsInDocument());
  });

  it('should not find detached as in document', () => {
    const detached = document.createElement('div');
    document.body.appendChild(detached);
    document.body.removeChild(detached);
    expect(detached).not.toSatisfy(elementIsInDocument());
  });

  it('should find attached as in document', () => {
    const attached = document.createElement('div');
    document.body.appendChild(attached);
    expect(attached).toSatisfy(elementIsInDocument());
  });
});
