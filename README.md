# codeSquad-mastersCourse-test step-3

## 루빅스 큐브 구현하기

- 참고 링크를 참고해서 루빅스 큐브를 구현한다.
- 큐브는 W, B, G, Y, O, R의 6가지 색깔을 가지고 있다.
- 입력: 각 조작법을 한 줄로 입력받는다.
- 출력: 큐브의 6면을 펼친 상태로 출력한다.
- Q를 입력받으면 프로그램을 종료하고, 조작 받은 명령의 갯수를 출력시킨다.

### 큐브의 초기 상태

                    B B B
                    B B B
                    B B B

     W W W     O O O     G G G     Y Y Y
     W W W     O O O     G G G     Y Y Y
     W W W     O O O     G G G     Y Y Y

                    R R R
                    R R R
                    R R R

### 예시

    (초기 상태 출력)

    CUBE> FRR'U2R

    F
    (큐브상태)

    R
    (큐브상태)

    ...

    R
    (큐브상태)

    CUBE> Q
    경과시간: 00:31 //추가 구현 항목
    조작갯수: 6
    이용해주셔서 감사합니다. 뚜뚜뚜.

### 추가 구현 기능

- 프로그램 종료 시 경과 시간 출력
- 큐브의 무작위 섞기 기능
- 모든 면을 맞추면 축하 메세지와 함께 프로그램을 자동 종료

### 3단계 요구사항

- 가능한 한 커밋을 자주 하고 구현의 의미가 명확하게 전달되도록 커밋 메시지를 작성할 것
- 함수나 메소드는 한 번에 한 가지 일을 하고 가능하면 20줄이 넘지 않도록 구현한다.
- 함수나 메소드의 들여쓰기를 가능하면 적게(3단계까지만) 할 수 있도록 노력해 본다.

        function main() {
          for() { // 들여쓰기 1단계
              if() { // 들여쓰기 2단계
                  return; // 들여쓰기 3단계
              }
          }
        }

### 예상 순서도

![flowChart](./step-3/img/before_step-3.png)

### 예상하기

step-2에서 '검사' 대신 '조정'을 해준 것을 '검사'하는 로직으로 다시 바꿀 예정이다.   
틀리면 틀렸다고 알려주고 다시 입력받도록. 다만 '왜' 틀렸는지 그 부분까지 말해주는건 어려울지도 모르겠다.   
또한 이번에는 숫자가 포함돼서 RU3R이면 R1번, U3번, R1번 으로 돌아가야해서 숫자에 관한 검사, 동작도 추가해야한다...

그 외에 회전은 step-2를 응용하면 될거같지만 회전하면서 옆에 면들을 같이 움직이게하는게 좀 복잡하다.   
각 면마다 맞닿아있는 부분이 달라서 이중배열의 인덱스가 동일하지 않다.    어떤면은 세로, 어떤면은 가로라서 ..   

물리적인 제약이 없으니 해결법으로 선택된 면 기준 상하좌우면을 가져오되, 상황에 맞게 '돌려서' 가져온다.   
그 후에 동일한 회전 함수를 적용하고, '돌린만큼' 다시 '역으로 돌려서' 하면 될거같다.    
말로 설명하기 애매하기 이미지를 첨부한다.    
