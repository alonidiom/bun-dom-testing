import { beforeAll, describe, expect, it } from 'bun:test';
import { elementHasAccessibleErrorMessage } from './element-has-accessible-error-message';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <input type="text" id="child" aria-invalid aria-errormessage="error">
            <div id="error">hello world</div>
        </div>
    `;
});

describe('elementHasAccessibleErrorMessage', () => {
  describe('best case scenario', () => {
    it('should work without param', () => {
      expect(document.getElementById('child')).toSatisfy(
        elementHasAccessibleErrorMessage(),
      );
    });

    it('should work with string param', () => {
      expect(document.getElementById('child')).toSatisfy(
        elementHasAccessibleErrorMessage('hello world'),
      );

      expect(document.getElementById('child')).not.toSatisfy(
        elementHasAccessibleErrorMessage('meow world'),
      );
    });

    it('should work with regex param', () => {
      expect(document.getElementById('child')).toSatisfy(
        elementHasAccessibleErrorMessage(/hello/),
      );
    });
  });
});
