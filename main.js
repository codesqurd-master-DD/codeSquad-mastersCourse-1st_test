const startGame = async () => {
  const CUBE = [
    ["R", "R", "W"],
    ["G", "C", "W"],
    ["G", "B", "B"],
  ];
  const commands = {
    //[행or열, index, 방향]
    U: ["horizen", 0, -1],
    "U'": ["horizen", 0, 1],
    R: ["vertical", 2, -1],
    "R'": ["vertical", 2, 1],
    L: ["vertical", 0, 1],
    "L'": ["vertical", 0, -1],
    B: ["horizen", 2, 1],
    "B'": ["horizen", 2, -1],
    Q: "done",
  };
  explainRule();
  let inGame = true;
  while (inGame) {
    const text = await inputText();
    const array = convertTextToFilterdArray(text);
    if (true) {
      array.forEach((str) => {
        const command = commands[str];
        pushByCommand(CUBE, command);
      });
      inGame = false;
    }
  }
};

const explainRule = () => {
  console.log(`
    평면 큐브 게임에 오신걸 환영합니다!
        
    R R W
    G C W
    G B B

    * 게임 설명 *

    > U  가장 윗줄을 왼쪽으로 한 칸 밀기 RRW -> RWR
    > U' 가장 윗줄을 오른쪽으로 한 칸 밀기 RRW -> WRR
    > R  가장 오른쪽 줄을 위로 한 칸 밀기 WWB -> WBW
    > R' 가장 오른쪽 줄을 아래로 한 칸 밀기 WWB -> BWW
    > L  가장 왼쪽 줄을 아래로 한 칸 밀기 RGG -> GRG 
    > L' 가장 왼쪽 줄을 위로 한 칸 밀기 RGG -> GGR
    > B  가장 아랫줄을 오른쪽으로 한 칸 밀기 GBB -> BGB
    > B' 가장 아랫줄을 왼쪽으로 한 칸 밀기 GBB -> BBG
    > Q  프로그램을 종료한다.

    한 번에 여러 명령을 입력할 수 있어요!
    EX) UU'RLLB'Q
    `);
};

const inputText = () => {
  return new Promise((resolve) => {
    const prompt = require("prompt");
    prompt.start();
    prompt.get("line", function (err, result) {
      if (err) {
        return onErr(err);
      }
      resolve(result.line);
    });
    function onErr(err) {
      console.log(err);
      return 1;
    }
  });
};

const convertTextToFilterdArray = (text) => {
  const filter = ["U", "R", "L", "B", "Q", "'"];
  const filteredArray = text.split("").filter((str) => {
    return filter.includes(str);
  });
  const result = [];
  for (let i = 0; i < filteredArray.length; i++) {
    if (filteredArray[i] !== "'") {
      if (filteredArray[i + 1] === "'") {
        result.push(filteredArray[i] + filteredArray[i + 1]);
      } else {
        result.push(filteredArray[i]);
      }
    }
  }
  return result;
};

const pushByCommand = (CUBE, command) => {
  const [level, index, direction] = [command];
  if (level === "horizen") {
    pushHorizontally(CUBE, index, direction);
  } else if (level === "vertical") {
    pushVertically(CUBE, index, direction);
  }
};
const pushHorizontally = () => {};

const pushVertically = () => {};

startGame();
