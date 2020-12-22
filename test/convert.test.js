const converInputToArray = require("./converInputToArray");
const textForTest = "R2U";

function testConvertFunction(testFunction) {
  const isPass = testFunction(textForTest).equals(["R", "R", "U"]);
  if (isPass) {
    console.log("pass");
  } else {
    console.log("non-pass");
  }
}
testConvertFunction(converInputToArray(textForTest));

// * 이하 코드는 stackoverflow에서 가져온 배열 내부 값을 비교하는 코드입니다.
if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  );
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });
