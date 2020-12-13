"use strict";

const init = () => {
  const { DEFAULT_CUBE, COMMANDS, RULE } = require("./defaultData");
  const inGameCube = deepCopyCube(DEFAULT_CUBE);
  shuffleCube(inGameCube, COMMANDS);
  const inGameState = {
    count: 0,
    inGame: true,
    start: new Date(),
  };
  return { DEFAULT_CUBE, inGameCube, COMMANDS, inGameState, RULE };
};

const startGame = async (init) => {
  const { DEFAULT_CUBE, inGameCube, COMMANDS, inGameState, RULE } = init;
  explainRule(RULE);
  showCube(inGameCube);
  while (inGameState.inGame) {
    const array = converInputToArray(await inputText());
    if (checkIsWrongInput(array)) {
      continue;
    }
    proceedByStr(inGameCube, COMMANDS, array, inGameState);
    if (checkIsAnswer(DEFAULT_CUBE, inGameCube)) {
      informGameEnd(inGameState);
      inGameState.inGame = false;
      return;
    }
  }
};
const proceedByStr = (inGameCube, COMMANDS, array, inGameState) => {
  array.forEach((str) => {
    inGameState.count++;
    console.log("> ", str);
    if (str === "Q") {
      console.log("bye~");
      inGameState.inGame = false;
    } else if (str === "M") {
      shuffleCube(inGameCube, COMMANDS);
      showCube(inGameCube);
    } else {
      const command = getCommand(str, COMMANDS);
      rotateByCommand(inGameCube, command);
      showCube(inGameCube);
    }
  });
};
const deepCopyCube = (original) => {
  return JSON.parse(JSON.stringify(original));
};
const explainRule = (RULE) => {
  console.log(RULE);
};
const inputText = () => {
  return new Promise((resolve) => {
    const prompt = require("prompt");
    prompt.start();
    prompt.get("cube", function (err, result) {
      if (err) {
        return onErr(err);
      }
      resolve(result.cube);
    });
    function onErr(err) {
      console.log(err);
      return 1;
    }
  });
};
const converInputToArray = (text) => {
  const temp_arr = text.split("");
  const result = [];
  for (let i = 0; i < temp_arr.length; i++) {
    if (temp_arr[i] !== "2" && temp_arr[i] !== "'") {
      if (temp_arr[i + 1] === "'") {
        result.push(temp_arr[i] + temp_arr[i + 1]);
      } else if (temp_arr[i + 1] === "2") {
        result.push(temp_arr[i]);
        result.push(temp_arr[i]);
      } else {
        result.push(temp_arr[i]);
      }
    }
  }
  return result;
};
const checkIsWrongInput = (array) => {
  const checker = [
    "U",
    "U'",
    "L",
    "L'",
    "F",
    "F'",
    "R",
    "R'",
    "B",
    "B'",
    "D",
    "D'",
    "Q",
    "M",
  ];
  let result = false;
  array.forEach((str) => {
    if (!checker.includes(str)) {
      console.log(`${str} 은(는) 실행 할 수 없는 명령어입니다!`);
      result = true;
    }
  });
  return result;
};
const getCommand = (str, COMMANDS) => {
  let command = {};
  if (str.length == 2) {
    command = { ...COMMANDS[str[0]] };
    command.direction = "ccw";
  } else {
    command = { ...COMMANDS[str] };
  }
  return command;
};
const shuffleCube = (inGameCube, COMMANDS) => {
  const randomNum = Math.ceil(Math.random() * 30);
  for (let i = 0; i < randomNum; i++) {
    const randomStr = ["U", "L", "F", "R", "B", "D"][
      Math.floor(Math.random() * 6)
    ];
    const command = COMMANDS[randomStr];
    rotateByCommand(inGameCube, command);
  }
  return inGameCube;
};
const checkIsAnswer = (answer, ingame) => {
  if (JSON.stringify(answer) === JSON.stringify(ingame)) {
    return true;
  } else {
    return false;
  }
};
const informGameEnd = (inGameState) => {
  console.log("축하합니다! 큐브의 모든 면을 맞추셨습니다");
  measureRunTime(inGameState.start);
  console.log(`조작갯수 : ${inGameState.count}`);
  console.log("이용해주셔서 감사합니다 BYE~");
};
const measureRunTime = (start) => {
  const minute = new Date().getMinutes() - start.getMinutes();
  const second = new Date().getSeconds() - start.getSeconds();
  console.log(
    `경과시간 : ${minute < 10 ? "0" + minute : minute}:${
      second < 10 ? "0" + second : second
    }`
  );
};
const rotateByCommand = (inGameCube, command) => {
  const { side, edges, edgeTurn, direction } = command;
  const angle = direction === "cw" ? 1 : 3;
  for (let i = 0; i < angle; i++) {
    rotate90_CW(inGameCube, side);
    rotateEdge(inGameCube, edges, edgeTurn);
  }
};
const rotate90_CW = (inGameCube, side) => {
  const temp_side = JSON.parse(JSON.stringify(inGameCube[side]));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      inGameCube[side][i][j] = temp_side[2 - j][i];
    }
  }
};
const rotateEdge = (inGameCube, edges, edgeTurn) => {
  turnEdgeSide(inGameCube, edges, edgeTurn);
  moveEdge(inGameCube, edges);
  //임시로 돌려놓은 edge들 reset
  turnEdgeSide(inGameCube, edges, edgeTurn, false);
};
const turnEdgeSide = (inGameCube, edges, edgeTurn, ccw = true) => {
  edges.forEach((edge, index) => {
    const angle = ccw ? edgeTurn[index] : 4 - edgeTurn[index];
    for (let i = 0; i < angle; i++) {
      rotate90_CW(inGameCube, edge);
    }
  });
};
const moveEdge = (inGameCube, edges) => {
  const [up, right, down, left] = edges;
  const [temp1, temp2, temp3] = [
    inGameCube[up][2][0],
    inGameCube[up][2][1],
    inGameCube[up][2][2],
  ];
  inGameCube[up][2][2] = inGameCube[left][0][2];
  inGameCube[up][2][1] = inGameCube[left][1][2];
  inGameCube[up][2][0] = inGameCube[left][2][2];
  inGameCube[left][0][2] = inGameCube[down][0][0];
  inGameCube[left][1][2] = inGameCube[down][0][1];
  inGameCube[left][2][2] = inGameCube[down][0][2];
  inGameCube[down][0][2] = inGameCube[right][0][0];
  inGameCube[down][0][1] = inGameCube[right][1][0];
  inGameCube[down][0][0] = inGameCube[right][2][0];
  inGameCube[right][0][0] = temp1;
  inGameCube[right][1][0] = temp2;
  inGameCube[right][2][0] = temp3;
};
const showCube = (cube) => {
  showTopAndBot(cube.up);
  showMiddle(cube);
  showTopAndBot(cube.down);
};
const showTopAndBot = (side) => {
  console.log(`
       ${side[0].join(" ")}
       ${side[1].join(" ")}
       ${side[2].join(" ")}
    `);
};
const showMiddle = (cube) => {
  for (let i = 0; i < 3; i++) {
    console.log(
      `${cube.left[i].join(" ")}  ${cube.front[i].join(" ")}  ${cube.right[
        i
      ].join(" ")}  ${cube.back[i].join(" ")}`
    );
  }
};

startGame(init());
