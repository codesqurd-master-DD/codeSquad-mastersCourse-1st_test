"use strict";

const init = () => {
  const { DEFAULT_CUBE, COMMANDS, RULE } = require("./defualtData");
  const inGameState = {
    count: 0,
    inGame: true,
    start: new Date(),
  };
  return { DEFAULT_CUBE, COMMANDS, RULE, inGameState };
};
const startGame = async (init) => {
  const { DEFAULT_CUBE, COMMANDS, RULE, inGameState } = init;
  explainRule(RULE);
  showCube(DEFAULT_CUBE);
  const inGameCube = deepCopyCube(DEFAULT_CUBE);

  while (inGameState.inGame) {
    const array = convertTextToFilterdArray(await inputText());
    array.forEach((str) => {
      proceedByStr(inGameCube, COMMANDS, str, inGameState);
      showCube(inGameCube);
    });
  }
};
const proceedByStr = (inGameCube, COMMANDS, str, inGameState) => {
  console.log("> ", str);
  if (str === "Q") {
    console.log("bye~");
    inGameState.inGame = false;
  } else {
    const command = COMMANDS[str];
    pushByCommand(inGameCube, command);
  }
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

const convertTextToFilterdArray = (text) => {
  const filter = ["U", "R", "L", "B", "Q", "'"];
  const filteredArray = text.split("").filter((str) => {
    return filter.includes(str);
  });
  const result = [];
  for (let i = 0; i < filteredArray.length; i++) {
    if (filteredArray[i] !== "'") {
      if (filteredArray[i + 1] === "'") {
        if (filteredArray[i] !== "Q") {
          result.push(filteredArray[i] + filteredArray[i + 1]);
        }
      } else {
        result.push(filteredArray[i]);
      }
    }
  }
  return result;
};

const pushByCommand = (cube, command) => {
  const [level, index, direction] = command;
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
  } else if (direction === "right") {
    const pop = cube[index].pop();
    cube[index].unshift(pop);
  }
};

const pushVertically = (cube, index, direction) => {
  const temp_arr = pushArrayByDirection(
    makeArrayByTakeoutOfCube(cube, index),
    direction
  );
  insertArrayToCube(cube, index, temp_arr);
};
const makeArrayByTakeoutOfCube = (cube, index) => {
  const temp_arr = cube.reduce((acc, curr) => {
    if (index === "first") {
      acc.push(curr.shift());
    } else if (index === "last") {
      acc.push(curr.pop());
    }
    return acc;
  }, []);
  return temp_arr;
};
const pushArrayByDirection = (array, direction) => {
  if (direction === "up") {
    const shift = array.shift();
    array.push(shift);
  } else if (direction === "down") {
    const pop = array.pop();
    array.unshift(pop);
  }
  return array;
};
const insertArrayToCube = (cube, index, array) => {
  if (index === "first") {
    array.forEach((str, index) => {
      cube[index].unshift(str);
    });
  } else if (index === "last") {
    array.forEach((str, index) => {
      cube[index].push(str);
    });
  }
};

const showCube = (cube) => {
  cube.forEach((row) => {
    console.log(row.join(" "));
  });
};
startGame(init());
