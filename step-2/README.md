# codeSquad-mastersCourse-test step-2
## 평면 큐브 구현하기

1. 3 X 3의 2차원 배열 
    R R W
    G C W
    G B B

2. 사용자의 입력을 받아서 아래의 동작을 하는 프로그램을 구현하시오.
    &lg; U  가장 윗줄을 왼쪽으로 한 칸 밀기 RRW -&lg; RWR
    &lg; U' 가장 윗줄을 오른쪽으로 한 칸 밀기 RRW -&lg; WRR
    &lg; R  가장 오른쪽 줄을 위로 한 칸 밀기 WWB -&lg; WBW
    &lg; R' 가장 오른쪽 줄을 아래로 한 칸 밀기 WWB -&lg; BWW
    &lg; L  가장 왼쪽 줄을 아래로 한 칸 밀기 RGG -&lg; GRG (L의 경우 R과 방향이 반대임을 주의한다.)
    &lg; L' 가장 왼쪽 줄을 위로 한 칸 밀기 RGG -&lg; GGR
    &lg; B  가장 아랫줄을 오른쪽으로 한 칸 밀기 GBB -&lg; BGB (B의 경우도 U와 방향이 반대임을 주의한다.)
    &lg; B' 가장 아랫줄을 왼쪽으로 한 칸 밀기 GBB -&lg; BBG
    &lg; Q  Bye~를 출력하고 프로그램을 종료한다.


### 요구사항
- 처음 시작화면 초기 상태를 출력한다.
- 간단한 프롬프트 (CLI에서 키보드 입력받기 전에 표시해주는 간단한 글자들 -예:CUBE&lg;)를 표시해준다.
- 한 번에 여러 문자를 입력받은 경우 순서대로 처리해서 매 과정을 화면에 출력한다.

### 예시

    R R W
    G C W
    G B B

    CUBE&lg; UUR

    U
    R W R 
    G C W
    G B B

    U
    W R R  
    G C W
    G B B

    R
    W R W 
    G C B
    G B R

    CUBE> Q
    Bye~

### 2단계 요구사항

- 너무 크지 않은 함수 단위로 구현하려고 노력할 것
- 전역변수의 사용을 자제할 것
- 객체와 배열을 적절히 활용할 것

### 예상 순서도 


### 예상하기

