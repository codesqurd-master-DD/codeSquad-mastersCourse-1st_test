"use strict";

const startGame = () => {
  const text = getText();
  const array = convertTextToArray(text);
  if (checkIsCorrectInput(array)) {
    const result = pushString(array);
    showResult(result);
  } else {
    showResult("다시 입력하세요");
  }
};

const getText = () => {
  return document.getElementById("inputedText").value;
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

const showResult = (result) => {
  const resultSpan = document.getElementById("result");
  resultSpan.innerText = result;
};

const pushString = (array) => {
  const [string, num, direction] = array;
  if (num === 0) {
    showResult(string);
    return;
  }
  const valueOfDirection = setValueOfDirection(direction);
  const len = string.length;
  const abs_num = Math.abs(num) % len;
  const vector = num * valueOfDirection;

  // vector가 음수면 앞에서 그만큼 잘라서 뒤에 붙임
  // vector갸 양수면 뒤에서 그만큼 잘라서 앞에 붙임
  const left = vector < 0 ? string.slice(abs_num) : string.slice(len - abs_num);
  const right =
    vector < 0 ? string.slice(0, abs_num) : string.slice(0, len - abs_num);
  return left + right;
};

const setValueOfDirection = (direction) => {
  if (direction === "L" || direction === "l") {
    return -1;
  } else if (direction === "R" || direction === "r") {
    return 1;
  }
};

const btn_submit = document.getElementById("submit");
btn_submit.addEventListener("click", startGame);
