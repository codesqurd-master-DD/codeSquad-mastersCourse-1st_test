const startGame = async () => {
  const DEFAULT_CUBE = {
    up: [
      ["B", "B", "B"],
      ["B", "B", "B"],
      ["B", "B", "B"],
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
      //side를 기준 삼았을 때 up, right, down, left edge들
      edge: ["back", "right", "front", "left"],
      temp_turn: [2, 3, 0, 1],
      reset: [2, 1, 0, 3],
      direction: "cw",
    },
    "U'": {
      side: "up",
      edge: ["back", "right", "front", "left"],
      temp_turn: [2, 3, 0, 1],
      reset: [2, 1, 0, 3],
      direction: "ccw",
    },
    L: {
      side: "left",
      edge: ["up", "front", "down", "back"],
      temp_turn: [3, 0, 1, 0],
      reset: [1, 0, 3, 0],
      direction: "cw",
    },
    "L'": {
      side: "left",
      edge: ["up", "front", "down", "back"],
      temp_turn: [3, 0, 1, 0],
      reset: [1, 0, 3, 0],
      direction: "ccw",
    },
    F: {
      side: "front",
      edge: ["up", "right", "down", "left"],
      temp_turn: [0, 0, 0, 0],
      reset: [0, 0, 0, 0],
      direction: "cw",
    },
    "F'": {
      side: "front",
      edge: ["up", "right", "down", "left"],
      temp_turn: [0, 0, 0, 0],
      reset: [0, 0, 0, 0],
      direction: "ccw",
    },
    R: {
      side: "right",
      edge: ["up", "back", "down", "fornt"],
      temp_turn: [1, 0, 3, 0],
      reset: [3, 0, 1, 0],
      direction: "cw",
    },
    "R'": {
      side: "right",
      edge: ["up", "back", "down", "fornt"],
      temp_turn: [1, 0, 3, 0],
      reset: [3, 0, 1, 0],
      direction: "ccw",
    },
    B: {
      side: "back",
      edge: ["up", "left", "down", "right"],
      temp_turn: [2, 0, 2, 0],
      reset: [1, 0, 1, 0],
      direction: "cw",
    },
    "B'": {
      side: "back",
      edge: ["up", "left", "down", "right"],
      temp_turn: [2, 0, 2, 0],
      reset: [2, 0, 2, 0],
      direction: "ccw",
    },
    D: {
      side: "down",
      edge: ["front", "right", "back", "left"],
      temp_turn: [0, 1, 2, 3],
      reset: [0, 3, 2, 1],
      direction: "cw",
    },
    "D'": {
      side: "down",
      edge: ["front", "right", "back", "left"],
      temp_turn: [0, 1, 2, 3],
      reset: [0, 3, 2, 1],
      direction: "ccw",
    },
  };
  let count = 0;

  explainRule();
  showCube(DEFAULT_CUBE);
  const answerCube = shuffleCube(Object.assign({}, DEFAULT_CUBE));
  const inGameCube = Object.assign({}, answerCube);
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
      const command = COMMANDS[str];
      rotateByCommand(inGameCube, command);
      showCube(inGameCube);
      checkIsAnswer(answerCube, inGameCube);
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
  return result;
};
const checkIsCorrectInput = (array) => {
  return true;
};
const shuffleCube = (cube) => {
  return shuffledCube;
};
const checkIsAnswer = (answer, ingame) => {
  console.log("ㅊㅋㅊㅋ, 시간, 횟수 등");
};

const rotateByCommand = (inGameCube, command) => {
  const [side, edges, direction] = [command];
  const angle = direction === "cw" ? 1 : 3;
  for (let i = 0; i < angle; i++) {
    rotate90_CW(inGameCube, side);
    rotateEdge(inGameCube, edges);
  }
};

const rotate90_CW = (inGameCube, side, direction) => {};
const rotateEdge = (inGameCube, side, edges) => {
  changeForRotate();
  resetChange();
};
const changeForRotate = (side, edges) => {};
const resetChange = (side, edges) => {};
const showCube = (cube) => {};

startGame();
