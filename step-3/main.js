const startGame = async () => {
  const DEFAULT_CUBE = {
    up: [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ],
    left: [
      ["W", "W", "W"],
      ["W", "W", "W"],
      ["W", "W", "W"],
    ],
    front: [
      ["O", "O", "O"],
      ["O", "O", "O"],
      ["O", "O", "O"],
    ],
    right: [
      ["G", "G", "G"],
      ["G", "G", "G"],
      ["G", "G", "G"],
    ],
    back: [
      ["Y", "Y", "Y"],
      ["Y", "Y", "Y"],
      ["Y", "Y", "Y"],
    ],
    down: [
      ["R", "R", "R"],
      ["R", "R", "R"],
      ["R", "R", "R"],
    ],
  };
  const COMMANDS = {
    U: {
      side: "up",
      //side를 기준 삼았을 때 up, right, down, left edges들
      edges: ["back", "right", "front", "left"],
      edgeTurn: [2, 3, 0, 1],
      direction: "cw",
    },
    L: {
      side: "left",
      edges: ["up", "front", "down", "back"],
      edgeTurn: [3, 0, 1, 0],
      direction: "cw",
    },
    F: {
      side: "front",
      edges: ["up", "right", "down", "left"],
      edgeTurn: [0, 0, 0, 0],
      direction: "cw",
    },
    R: {
      side: "right",
      edges: ["up", "back", "down", "fornt"],
      edgeTurn: [1, 0, 3, 0],
      direction: "cw",
    },
    B: {
      side: "back",
      edges: ["up", "left", "down", "right"],
      edgeTurn: [2, 0, 2, 0],
      direction: "cw",
    },
    D: {
      side: "down",
      edges: ["front", "right", "back", "left"],
      edgeTurn: [0, 1, 2, 3],
      direction: "cw",
    },
  };
  let count = 0;

  explainRule();
  // rotate 기능이 구현될때까지 잠시 가림
  //   const inGameCube = shuffleCube(Object.assign({}, DEFAULT_CUBE));
  const inGameCube = DEFAULT_CUBE;
  showCube(inGameCube);
  let inGame = true;
  while (inGame) {
    const input = await inputText();
    const array = converInputToArray(input);
    const checker = checkIsCorrectInput(array);
    if (!checker) {
      continue;
    }
    array.forEach((str) => {
      console.log("> ", str);
      if (str === "Q") {
        console.log("bye~");
        inGame = false;
        return;
      }
      if (str === "M") {
        shuffleCube(inGameCube);
      }
      const command = getCommand(str, COMMANDS);
      rotateByCommand(inGameCube, command);
      showCube(inGameCube);
      checkIsAnswer(DEFAULT_CUBE, inGameCube);
    });
  }
};

const explainRule = () => {
  console.log(`
      루빅스 큐브 게임에 오신걸 환영합니다!
          
         B B B  
         B B B
         B B B

W W W    O O O     G G G     Y Y Y 
W W W    O O O     G G G     Y Y Y 
W W W    O O O     G G G     Y Y Y 
 
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
    "M'",
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
const shuffleCube = (cube) => {
  return shuffledCube;
};
const checkIsAnswer = (answer, ingame) => {
  console.log("ㅊㅋㅊㅋ, 시간, 횟수 등");
};

const rotateByCommand = (inGameCube, command) => {
  const { side, edges, edgeTurn, direction } = command;
  //   console.log(side, edges, edgeTurn, direction);
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
  edges.forEach((edge, index) => {
    const angle = edgeTurn[index];
    for (let i = 0; i < angle; i++) {
      rotate90_CW(inGameCube, edge);
    }
    moveEdge(inGameCube, edges);
    //reset
    for (let j = 0; j < 4 - angle; j++) {
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

const showCube = (cube) => {};

startGame();
