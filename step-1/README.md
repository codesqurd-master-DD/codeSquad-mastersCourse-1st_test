# codeSquad-mastersCourse-1st_test

## Step-1 단어 밀어내기 구현하기

1. 사용자로부터 단어 하나, 정수 숫자 하나 (-100 &lt; N &lt; 100), L 또는 R을 입력 받는다 (대소문자 둘 다 가능)
2. 주어진 단어를 정수 숫자만큼, L 또는 R 방향으로 밀어낸다
3. 밀려난 단어는 사라지지 않고 반대쪽으로 채워진다.

### 1단계 코딩 요구사항
- 컴파일 및 실행되지 않을 경우 불합격
- 자신만의 기준으로 최대한 간결하게 코드 작성

### 예시

&gt; apple 3 L 
leapp

&gt; banana 6 R
banana

&gt; carrot -1 r
arrotc

&gt; cat -4 R
atc

### 예상 순서도 
![flowChart](./img/flowChart_step1.png)
대략적으로 예상해본 순서도 

### 예상하기

split(' ')으로 배열화하면 [단어, 숫자, 방향]으로 길이가 3인 array가 나와야한다.
길이가 3이 아니거나, 길이가 3이더라도 0 1 2인덱스의 요소가 단어, 숫자, 방향이 아니라면 오류를 내야함.

check(array) 
- 함수에서 제대로된 문자가 입력됐는지(숫자가 섞였는가? 띄어쓰기를 했는가?),
- 숫자가 정해진 범위내에 속하는지 체크
- R(r), L(l)외에 다른 것이 들어왔는지 체크 

startGame(array)
비구조화 할당으로 array의 요소를 string, num, direction으로 나눔

pushString호출
?? num만큼 pushString을 호출하는것과 pushString에 num을 인자로 넘겨 그 안에서 반복문을 실행하는 것이 큰 차이가 있을까??
혹은 재귀로하는게 더 직관적일까?(근데 재귀로 하면 느림)

pushString(string, direction)
string을 direction 방향으로 한 칸씩 민다.