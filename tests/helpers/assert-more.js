export class AssertMore {
  constructor(assert, context) {
    this.assert = assert;
    this.context = context
  }

  textEqual(selector, expected) {
    this.assert.equal(this.context.$(selector).text().trim(), expected);
  }
  multilineTextEqual(multilineElement, expectedArray, removeBlankLines=true) {
    let textArray = this.context.$(multilineElement).text().trim().split('\n');
    textArray = textArray.map(item => item.trim());
    if (removeBlankLines) {
      textArray = textArray.reject(item => item.length === 0);
    }
    this.assert.deepEqual(textArray, expectedArray);
  }
}
