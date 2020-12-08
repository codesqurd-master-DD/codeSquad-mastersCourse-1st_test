const startGame = async () => {
  const DEFAULT_CUBE = [
    ["R", "R", "W"],
    ["G", "C", "W"],
    ["G", "B", "B"],
  ];
  const commands = {
    //[행or열, index, 방향]
    U: ["horizen", 0, "left"],
    "U'": ["horizen", 0, "right"],
    R: ["vertical", 2, "up"],
    "R'": ["vertical", 2, "down"],
    L: ["vertical", 0, "down"],
    "L'": ["vertical", 0, "up"],
    B: ["horizen", 2, "right"],
    "B'": ["horizen", 2, "left"],
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
        const cube = DEFAULT_CUBE.slice();
        pushByCommand(cube, command);
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

const pushByCommand = (cube, command) => {
  const [level, index, direction] = [command];
  if (level === "horizen") {
    pushHorizontally(cube, index, direction);
  } else if (level === "vertical") {
    pushVertically(cube, index, direction);
  }
};
const pushHorizontally = (cube, index, direction) => {
  if (direction === "left") {
    const shift = cube[index].shift();
    cube[index].push(shift);
  } else if (direction === "left") {
    const pop = cube[index].pop();
    cube[index].unshift(pop);
  }
};

const pushVertically = (cube, index, direction) => {};

startGame();
