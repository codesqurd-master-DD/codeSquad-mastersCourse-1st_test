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
const RULE = `

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
      `;

module.exports = { DEFAULT_CUBE, COMMANDS, RULE };
