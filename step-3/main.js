const init = () => {
  const { DEFAULT_CUBE, COMMANDS } = require("./defaultData");
  const inGameCube = deepCopyCube(DEFAULT_CUBE);
  shuffleCube(inGameCube, COMMANDS);
  return { inGameCube, COMMANDS, DEFAULT_CUBE };
};

const startGame = async (init) => {
  const { inGameCube, COMMANDS, DEFAULT_CUBE } = init;
  const start = new Date();
  let inGame = true;
  let count = 0;
  explainRule();
  showCube(inGameCube);
  while (inGame) {
    const input = await inputText();
    const array = converInputToArray(input);
    const checker = checkIsCorrectInput(array);
    if (!checker) {
      continue;
    }
    array.forEach((str) => {
      count++;
      proceedByStr(inGameCube, command, str);
      showCube(inGameCube);
      if (checkIsAnswer(DEFAULT_CUBE, inGameCube)) {
        inforEndGame(start, count);
        inGame = false;
        return;
      }
    });
  }
};
const proceedByStr = (inGameCube, command, str) => {
  console.log("> ", str);
  if (str === "Q") {
    console.log("bye~");
    inGame = false;
    return;
  }
  if (str === "M") {
    shuffleCube(inGameCube, COMMANDS);
  } else {
    const command = getCommand(str, COMMANDS);
    rotateByCommand(inGameCube, command);
  }
};
const deepCopyCube = (original) => {
  return JSON.parse(JSON.stringify(original));
};
const explainRule = () => {
  console.log(`
      루빅스 큐브 게임에 오신걸 환영합니다!
          
       B B B  
       B B B
       B B B

W W W  O O O  G G G  Y Y Y 
W W W  O O O  G G G  Y Y Y 
W W W  O O O  G G G  Y Y Y 
 
       R R R 
       R R R 
       R R R 
  
      * 게임 설명 *

        U
      L F R B
        D

      > U  Up side을 시계방향으로 90도 회전
      > F  Front side을 시계방향으로 90도 회전
      > L  Left side을 시계방향으로 90도 회전 
      > R  Right side을 시계방향으로 90도 회전
      > B  Back side을 시계방향으로 90도 회전
      > D  Down side을 시계방향으로 90도 회전
      > M  다시 섞기
      > Q  프로그램을 종료한다.
      
      문자에 ' 를 붙이면 반시계으로 90도 회전, 숫자 2 를 붙이면 2번 회전(180도) 합니다! 
      (3번 돌리기보단 반시계로 돌리는게 낫겠죠?)

      한 번에 여러 명령을 입력할 수 있어요!
      EX) UU'RL2B
      `);
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
const checkIsCorrectInput = (array) => {
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
  let result = true;
  array.forEach((str) => {
    if (!checker.includes(str)) {
      console.log(`${str} 은(는) 실행 할 수 없는 명령어입니다!`);
      result = false;
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
const shuffleCube = (copyCube, COMMANDS) => {
  const randomNum = Math.ceil(Math.random() * 40);
  //섞을때는 굳이 반시계방향으로 할 필요 없다고 판단.
  for (let i = 0; i < randomNum; i++) {
    const randomStr = ["U", "L", "F", "R", "B", "D"][
      Math.floor(Math.random() * 6)
    ];
    const command = COMMANDS[randomStr];
    rotateByCommand(copyCube, command);
  }
  return copyCube;
};
const checkIsAnswer = (answer, ingame) => {
  if (JSON.stringify(answer) === JSON.stringify(ingame)) {
    return true;
  } else {
    return false;
  }
};
const inforEndGame = (start, count) => {
  measureRunTime(start);
  console.log(`조작갯수 : ${count}`);
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
  //deep clone
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
  //reset
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
