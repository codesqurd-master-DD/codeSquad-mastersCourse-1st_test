"use strict";

const btn_submit = document.getElementById("submit");
btn_submit.addEventListener("click", startGame);

const startGame = () => {
  const text = getText();
  const array = convertTextToArray(text);
  if (checkIsCorrectInput(array)) {
    pushString(array);
  } else {
    showResult();
  }
};

const getText = () => {
  return docuemnt.getElementById("inputedText").value;
};

const convertTextToArray = (text) => {
  return text.split(" ");
};

const checkIsCorrectInput = (array) => {
  if (array.length !== 3) return false;
  const [string, num, direction] = array;

  if (!isString(string)) return false;

  const number = Number(num);
  if (!Number.isInteger(number)) return false;

  if (!isDirection(direction)) return false;

  return true;
};

const isString = (string) => {
  //string이 문자열인지
  if (typeof string !== "string") return false;
  // '123'과 같은 숫자형 문자열인지
  if (!isNaN(string)) return false;
  // '123+ABC'와 같은 문자 외에 숫자, 특수문자가 혼합된 문자열인지
  const temp_arr = string.split("");
  for (let i = 0; i < temp_arr.length; i++) {
    const char = temp_arr[0].charCodeAt(0);
    if (!((char >= 65 && char < 91) || (char >= 97 && char < 123))) {
      return false;
    }
  }
  return true;
};

const isDirection = (direction) => {
  const directions = ["L", "l", "R", "r"];
  return directions.includes(direction);
};

const showResult = () => {
  console.log("result :");
};

const pushString = (array) => {};
const calculateVector = (num, direction) => {
  return vector;
};
