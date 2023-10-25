import { beforeAll, describe, expect, it } from 'bun:test';
import { elementHasTextContent } from './element-has-text-content';

beforeAll(() => {
  document.body.innerHTML = `
        <div id="root">
            <div id="normal">Hello World</div>
            <div id="break">
                Text
                is
                text
            </div>
            <div id="empty"></div>
        </div>
    `;
});

describe('elementHasTextContent', () => {
  it('should match text content', () => {
    expect(document.getElementById('normal')).toSatisfy(
      elementHasTextContent('Hello World'),
    );
  });

  it('should not match text content', () => {
    expect(document.getElementById('normal')).not.toSatisfy(
      elementHasTextContent('Meow'),
    );
  });

  it('should match text content with whitespace', () => {
    expect(document.getElementById('break')).toSatisfy(
      elementHasTextContent('Text is text'),
    );
  });

  it('should not match text content with whitespace without normalizing', () => {
    expect(document.getElementById('break')).not.toSatisfy(
      elementHasTextContent('Text is text', { normalizeWhitespace: false }),
    );
  });

  it('should match empty text content with a negative', () => {
    expect(document.getElementById('empty')).not.toSatisfy(
      elementHasTextContent(),
    );
  });

  it('should throw an error when checking with an empty string', () => {
    expect(() =>
      expect(document.getElementById('normal')).toSatisfy(
        elementHasTextContent(''),
      ),
    ).toThrow();
  });

  it('should always match a non-empty string when checking without a parameter', () => {
    expect(document.getElementById('normal')).toSatisfy(
      elementHasTextContent(),
    );
  });

  it('should throw an error when checking a non-element', () => {
    expect(() =>
      expect('Hello World').toSatisfy(elementHasTextContent()),
    ).toThrow();
  });
});
