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
  return true;
};

const showResult = () => {
  console.log("result :");
};

const pushString = (array) => {};
const calculateVector = (num, direction) => {
  return vector;
};
