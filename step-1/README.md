### 예시

홀수 줄은 입력, 짝수 줄은 출력이다.

    > apple 3 L
    leapp

    > banana 6 R
    banana

    > carrot -1 r
    arrotc

    > cat -4 R
    atc

### 1단계 요구사항

- 컴파일 및 실행되지 않을 경우 불합격
- 자신만의 기준으로 최대한 간결하게 코드 작성

### 예상 순서도

![flowChartBefore](./step-1/img/flowChart_step1_before.png)

### 예상하기

split(' ')으로 배열화하면 [단어, 숫자, 방향]으로 길이가 3인 array가 나와야한다.  
길이가 3이 아니거나, 길이가 3이더라도 0 1 2인덱스의 요소가 단어, 숫자, 방향이 아니라면 오류를 내야함.

check(array)

- array[0]이 함수에서 제대로된 단어 입력시(숫자가 섞였는가? 한글이 섞여있는가? => 혹은 상관없음?) return false
- array[1]이 숫자가 정해진 범위를 넘어서면 return false
- array[2]이 R(r), L(l)외에 다른 것이 return false
- 세 조건을 모두 만족하면 return true

startGame(array)  
check()가 true를 return하면 실행  
비구조화 할당으로 array의 요소를 string, num, direction으로 나눔  
이때 num이 0이라면 종료하고 return string  
direction \* num으로 vector 값을 얻어낸다.(최종으로 음수면 왼쪽, 양수면 오른쪽으로)

pushString호출  
?? num만큼 pushString을 호출하는것과 pushString에 num을 인자로 넘겨 그 안에서 반복문을 실행하는 것이 큰 차이가 있을까??  
혹은 재귀로하는게 더 직관적일까?(근데 재귀로 하면 느림)

pushString(string, direction)  
string을 direction 방향으로 한 칸씩 민다.
최종 결과 return

### 결과 순서도

![flowChartAfter](./step-1/img/flowChart_step1_after.png)

### 결과

구조는 예상과 크게 다르게 나오진 않았다.  
'함수나 메소드는 한 번에 한 가지 일만'하려다 보니 한줄짜리 함수도 만들었는데 이게 옳은 방향인지는 모르겠다.  
함수명으로 어떤 행동인지 명시할 수는 있어서 좋은거 같긴하다.

checkIsCorrectInput()에서 isString() 메소드의 경우 사실 맨 마지막 혼합 문자열을 검사하는 부분만  
실행해도 위에 모두를 포함하지만, 좀 더 일반적으로 false가 나올 수 있는 상황에서 먼저 걸러내는게  
성능적으로 나을거라고 생각했다.  
그리고 사실 정규표현식을 사용하면 훨씬 쉽고 간단하게 해결할 수 있다는걸 알게 되었는데 뭔가 내가 생각해낸 방법이라기보다  
답을 훔쳐오는거 같아서 사용하진 않았다..

    !/[^a-zA-Z]/.test(word)

나중에 사용하게 될지 모르니 여기에 메모해두기로..

pushString()의 경우 처음엔 한칸씩 이동시키는 함수를 num만큼 실행 or 함수내에서 for문으로 num만큼 실행을 생각했다.  
그러다 num이 음수일 수 있기 때문에 방향을 정하는 L, R과 곱하는 vector라는 변수를 만들면서 구조를 생각하던 중  
굳이 반복문을 사용할 필요 없이 최종 방향이 왼쪽이냐 오른쪽이냐에 따라 이동량만큼 잘라내서 좌우를 바꿔주면 되는거였다.

몇 가지 디버깅도 끝냈고 일단 여기까지 하고 step-2로 넘어간다

### 함수 설명

#### - startGame()

게임을 시작하기 위해 필요한 함수들을 호출한다.

#### - getText()

확인 버튼이 눌리면 해당 input 태그의 내용을 가져온다

#### - removeInputValue()

input 태그의 내용을 지운다.

#### - converTextToArray(text)

가져온 input 내용을 배열화해서 반환

#### - checkIsCorrectInput(array)

단어, 숫자, 방향이 올바르게 입력됐는지 확인해서 boolean값 반환

#### - isString(string)

숫자, 특수문자가 포함되지 않은 알파벳으로 구성된 단어인지 확인 후 boolean값 반환

#### - isDirection(derection)

방향을 지시하는 문자가 맞는지 확인 후 boolean값 반환

#### - showResult(result)

결과값을 resultSapn에 넣어 보여주는 함수

#### - pushString(array)

입력된 문자열을 숫자, 방향에 맞춰 밀어내고 반환

#### - setValueOfDirection(derection)

방향을 나타내는 문자를 수치화해서 반환

### 요구사항 자체점검

- 컴파일 및 실행되지 않을 경우 불합격 :star::star::star::star::star:  
  실행에 문제가 없는 것으로 확인했다.

- 자신만의 기준으로 최대한 간결하게 코드 작성 :star::star::star:  
  최대한 함수를 나누고, 잘못 입력된 내용을 최소한으로 검사하는 등 간결하게 한거 같지만 if문이 좀 많은게 아닌가 싶다.  
  최대한 갈결하게란 무엇일까.. 자신이 없기에 3점
