const DEFAULT_CUBE = [
  ["R", "R", "W"],
  ["G", "C", "W"],
  ["G", "B", "B"],
];
const COMMANDS = {
  //[행or열, index, 방향]
  U: ["horizen", 0, "left"],
  "U'": ["horizen", 0, "right"],
  R: ["vertical", "last", "up"],
  "R'": ["vertical", "last", "down"],
  L: ["vertical", "first", "down"],
  "L'": ["vertical", "first", "up"],
  B: ["horizen", 2, "right"],
  "B'": ["horizen", 2, "left"],
};
const RULE = `
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
    `;

module.exports = { DEFAULT_CUBE, COMMANDS, RULE };
