const DEFAULT_CUBE = {
  up: Array.from(Array(3), () => new Array(3).fill("B")),
  left: Array.from(Array(3), () => new Array(3).fill("W")),
  front: Array.from(Array(3), () => new Array(3).fill("O")),
  right: Array.from(Array(3), () => new Array(3).fill("G")),
  back: Array.from(Array(3), () => new Array(3).fill("Y")),
  down: Array.from(Array(3), () => new Array(3).fill("R")),
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
    edges: ["up", "back", "down", "front"],
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

module.exports = { DEFAULT_CUBE, COMMANDS };
