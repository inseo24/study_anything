# The Complete Guide to Regular Expressions(Regex)

## Regex

Regex : 특정 패턴의 문자열이 일치하는지 확인하는 문법

이럴 때 정규식을 사용할 수 있습니다.

- command line 출력 분석
- 사용자 입력 파싱할 때
- 서버나 프로그램 로그를 검사할 때
- CSV 같은 일관된 구문으로 텍스트 파일 처리할 때
- config 파일 읽을 때
- 코드 검색할 때나 리팩토링할 때

이 문서에서는 아래 내용에 대해서 배워봅니다. 

- regex가 어떻게 생겼나?
- 어떻게 regex를 읽고 쓸 수 있을지
    - quantifier가 무엇인지
    - pattern collection이 무엇인지
    - regex token이 무엇인지
- 어떻게 regex를 사용하는지
- regex flag가 뭔지
- regex group이 뭔지

## regex는 어떻게 생겼을까?

<이 글에서 스크린샷은 [regex101](https://regex101.com)에서 캡쳐한 것임>

<img width="717" alt="image" src="https://user-images.githubusercontent.com/84627144/167331929-d5f4aea7-6ce6-42c6-bf25-89eba97234fb.png">

위 예시에선 test라는 문자를 단순한 검색 패턴으로 만들었다. 

물론 모든 regex가 항상 이렇게 간단한 건 아니다. 

예를 들어 전화번호 같이 “000-000-0000” 를 정규식으로 만들어보자.

<img width="718" alt="image" src="https://user-images.githubusercontent.com/84627144/167331940-7ee3d41e-2cef-485d-9b72-323c36e2d441.png">

위 정규식은 좀 복잡해보인다. 

정규식은 다양하게 작성될 수 있다. 위에 작성한 정규식을 좀 더 읽을 수 있게 쓰면 아래처럼 쓸 수 있다.

```kotlin
^[0-9]{3}-[0-9]{3}-[0-9]{4}$
```

대부분의 언어에는 정규식을 사용해 문자열을 검색하거나 바꾸는 내장 메서드를 제공한다. 언어마다 다를 수 있다.

이 문서에는 자바스크립트에서 사용되고 다른 언어의 regex 구현에 공통적인 regex에 초점을 맞춘다. 

## 어떻게 regex를 읽고 쓸까

### Quantifiers

regex quantifiers는 문자를 몇 번 검색해야 하는지 체크한다.

quantifier list

- a|b - a 또는 b에 매치되는 것
- ? - 0 또는 1
- + - 1 또는 그 이상
- * - 0 또는 그 이상
- {N} - 정확히 N번
- {N,} - N번 또는 그 이상
- {N,M} - N과 M 숫자 사이
- *? - 0 또는 그 이상이나 첫번째로 매칭되는 게 나오면 멈춤

위의 quantifiers를 예를 들어 살펴 보자.

```kotlin
Hello|Goodbye
```

위 regex는 문자열 “Hello”와 “Goodbye” 에 매칭하는지 체크한다.

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--N9AkOeiE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491eaa8f12.png">


아래 정규식을 보자.

```kotlin
Hey?
```

이 경우, “y”가 0 또는 1번까지 추적해 “He”와 “Hey”는 일치할 것이다. (물음표 왼쪽 문자가 없거나 1개 있는 것까지 체크한다는 듯)

<img width="712" alt="image" src="https://user-images.githubusercontent.com/84627144/167332110-f3ee3d8a-d09c-423b-9517-f15348fd1d88.png">

```kotlin
Hello{1,3}
```

위 정규식은 “Hello”, “Helloo”, “Hellooo” 까지 되고 “Helloooo”는 매칭되지 않는다. “o”가 1번에서 3번까지인 것을 찾을 거다. 

<img width="711" alt="image" src="https://user-images.githubusercontent.com/84627144/167332121-2143ab78-c510-4a26-a0a6-c9d8164c37b7.png">

이렇게 결합될 수도 있다.

```kotlin
He?llo{2}
```

e는 0번에서 1번까지 될 거고 마지막 o는 2번이어야 한다.

“Helloo” 나 “Hlloo”가 매칭된다.

<img width="709" alt="image" src="https://user-images.githubusercontent.com/84627144/167332133-bcc5e76e-33a1-48c7-a47b-30845a21286e.png">

### Greedy matching

qualifier로 +를 사용하면 greedy matching라고도 표현하기도 하는듯.

예를 들어,

```kotlin
Hi+
```

를 쓴다면 “Hi” 부터 “Hiiiiiiiiiiii”까지 쓸 수 있다. 

<img width="693" alt="image" src="https://user-images.githubusercontent.com/84627144/167332149-cc7ca05c-d36c-4477-8c7b-eac10496653e.png">

반대로 greedy가 아닌 lazy로 바꾼다면 아래처럼 물음표를 사용한다.

```kotlin
Hi+?
```

위의 정규식에서 i는 최대한 적은 횟수로 일치하는지 확인한다. 플러스(+) 아이콘은 1개 이상을 의미하므로 1개의 i와만 일치한다.

즉, “Hiiiiiiii” 를 써도 “Hi”만 일치하게 된다.

<img width="689" alt="image" src="https://user-images.githubusercontent.com/84627144/167332167-e897d82c-5445-437f-a2f1-8012297fe8fc.png">

점(.) 아이콘은 단일로는 유용하진 않지만 다른 것과 결합해서 많이 사용된다. 점(.)을 사용하면 모든 문자를 찾는데 사용한다.

```kotlin
H.*llo
```

이렇게 쓰면 “Hillo”나 “Hello”, “Hellollollo” 모두 일치한다.

(이 정규식은 가운데 H와 llo 사이에 뭐가 들어가도 다 상관 없는데 앞에 H와 뒤에 llo만 들어오면 모두 체크가 된다.)

<img width="654" alt="image" src="https://user-images.githubusercontent.com/84627144/167332178-daf7aed5-4507-4163-affc-cdeaa4997ae2.png">

### Pattern collections

문자 컬렉션을 검색할 수 있게 해준다. 

예를 들어, 아래와 같은 정규식이 있다고 해보자.

```kotlin
My favorite vowel is [aeiou]
```

그럼 이런 문장들을 체크할 수 있다.

```kotlin
My favorite vowel is a
My favorite vowel is e
My favorite vowel is i
My favorite vowel is o
My favorite vowel is u
```

([] 안에 들어온 문자가 하나만 들어오면 모두 체크되는듯)

<img width="582" alt="image" src="https://user-images.githubusercontent.com/84627144/167332192-d979330d-7dd4-4822-b1dc-8a7f4d841445.png">

자주 사용되는 pattern collections은 아래와 같다.

- [A-Z] - 대문자 “A”부터 “Z”까지 매칭
- [a-z] - 소문자 “a”부터 “z”까지 매칭
- [0-9] - 아무 숫자나 매칭
- [asdf] - 괄호 안의 “a” “s” “d” “f” 중 하나의 문자와 매칭
- [^asdf] - 괄호 안의 “a” “s” “d” “f” 가 아닌 문자에 매칭

pattern collection을 결합해 쓸 수 있다.

- [0-9A-Z] - 숫자나 대문자 영어와 매칭
- [^a-z] - 소문자가 아니면 매칭

### General tokens

줄바꿈 같은 토큰을 알아보자.

- . - 모든 문자
- \n - 줄바꿈
- \t - tab을 체킹
- \s - 공백을 체킹(\t, \n 등을 포함함)
- \S - 공백이 아닌 문자
- \w - 문자면 체크(대문자, 소문자, 숫자 0부터 9, _ 까지)
- \W - 문자가 아닌 것 체크(\w와 반대)
- \b - word boundary(?), \w와 \W 사이(아래 예시로 보기, 한글로 뭐라 해석할지 모르겠음)
- \B - \b의 반대
- ^ - 줄의 시작(start of line)
- $ - 줄의 끝(end of line)
- \\ - “\”문자 체킹(escaping)

```kotlin
\s.
```

위 정규식을 사용하면 단어의 첫번째 글자를 모두 제거할 수 있다.

`Hello world how are you` 라는 문장은 `Helloorldowreou` 가 된다.

<img width="679" alt="image" src="https://user-images.githubusercontent.com/84627144/167332302-18fe7112-8622-4210-9dcb-de8a5621d8f6.png">

### collections과 함께 사용하기

토큰과 collections을 같이 사용해보자. 

대문자와 공백을 모두 제거하고 싶다면 아래와 같이 regex를 쓰면 된다.

```
[A-Z]|\s
```

`\s` 를 괄호 안에 넣어 합쳐 쓸 수도 있다.

```
[A-Z\s]
```

<img width="705" alt="image" src="https://user-images.githubusercontent.com/84627144/167332320-2f25cfce-e4e6-4bc0-abae-49c1ff4804a6.png">

### Word boundaries

`\b` 는 word boundaries를 매칭한다. 

문자열 “This is a string”이 있을 때, 띄워쓰기가(공백) 매칭된다고 생각할텐데, 그렇지 않다. 문자와 띄워쓰기 사이가 매칭된다.

![https://res.cloudinary.com/practicaldev/image/fetch/s--oCvxs5m1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491ed5c439.png](https://res.cloudinary.com/practicaldev/image/fetch/s--oCvxs5m1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491ed5c439.png)

단순히 이렇게만 쓰는 경우는 별로 없다. 대신, 아래와 같이 사용할 수 있다.

```
\b\w+\b
```

![https://res.cloudinary.com/practicaldev/image/fetch/s--sgoaAkqa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491edd0c2c.png](https://res.cloudinary.com/practicaldev/image/fetch/s--sgoaAkqa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491edd0c2c.png)

word boundary는 말 그대로 하나 또는 그 이상의 단어를 묶을 때 사용하는 듯 하다. 

### Start and end line

`^` 와 `$` 를 살펴보자.

첫 번째 단어를 찾고 싶다면 아래처럼 쓰면 된다.

```
^\w+
```

문장 시작점에서 하나 또는 그 이상의 문자를 매칭하려고 할 때 사용한다. 기억할 건 여기서 문자는 대문자, 소문자, 숫자, _ 를 포함한다.

![https://res.cloudinary.com/practicaldev/image/fetch/s--xwVo3-q---/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491ee79f3a.png](https://res.cloudinary.com/practicaldev/image/fetch/s--xwVo3-q---/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491ee79f3a.png)

반대로 문장 끝에서부터 한 단어를 찾을 때는 아래와 같이 쓴다. 

```
\w+$
```

![https://res.cloudinary.com/practicaldev/image/fetch/s--kMsXE1v4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491ef21dfb.png](https://res.cloudinary.com/practicaldev/image/fetch/s--kMsXE1v4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491ef21dfb.png)

문장의 끝이라고 그 뒤에 문자를 포함하지 않는 것은 아니다. 예를 들어, 줄 사이 모든 공백을 찾고 싶다면 어떻게 할까?

아래 정규식을 이용해 문장의 끝 이후의 공백 문자를 찾을 수 있다.

```
$\s+
```

![https://res.cloudinary.com/practicaldev/image/fetch/s--KT1ojPcc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491ef9f25f.png](https://res.cloudinary.com/practicaldev/image/fetch/s--KT1ojPcc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491ef9f25f.png)

### Character escaping

토큰을 사용하는 건 강력하나 토큰이 포함된 문자열을 처리할 때 복잡할 수 있다. 예를 들어, 아래와 같은 문장이 있다고 해보자.

```
"The newline character is '\n'"
```

여기서 \를 사용해서 escaping 문자를 사용할 수 있다. 

정규식은 아래와 같다.

```
\\n
```

## Regex를 어떻게 사용할까

대부분의 언어에서 비슷하지만 여기선 자바스크립트를 예로 regex 활용 예를 살펴보자.

### **Creating and searching using regex**

regex string이 어떻게 구성되는지 살펴보자. 

자바스크립트에선 / / 블록 안에 regex를 넣는다. 소문자를 찾는 regex는 아래처럼 사용한다.

```jsx
/[a-z]/
```

이 문법은  [a RegExp object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)  을 만든다. ( [built-in methods, like `exec`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) )

```jsx
/[a-z]/.exec("a"); // Returns ["a"]
/[a-z]/.exec("0"); // Returns null

```

 regex가 매칭되는지 true or false로 쓸 수 있다. ([truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)) 

또는  `RegExp` 생성자를 사용해 regex로 바꾸고 싶은 문자열을 넣어 만들 수도 있다.

```jsx
const regex = new RegExp("[a-z]"); // Same as /[a-z]/
```

### Replacing strings with regex

regex를 사용해 검색하거나 파일의 컨텐츠를 바꿀 수도 있다. 예를 들어, 인사 문구를 “goodbye”로 바꾸고 싶을 때 아래처럼 쓸 수 있다.

```jsx
function youSayHelloISayGoodbye(str) {
  str = str.replace("Hello", "Goodbye");
  str = str.replace("Hi", "Goodbye");
  str = str.replace("Hey", "Goodbye");  str = str.replace("hello", "Goodbye");
  str = str.replace("hi", "Goodbye");
  str = str.replace("hey", "Goodbye");
  return str;
}
```

이 경우 regex를 이용해 더 간단하게 쓸 수 있다.

```jsx
function youSayHelloISayGoodbye(str) {
  str = str.replace(/[Hh]ello|[Hh]i|[Hh]ey/, "Goodbye");
  return str;
}

```

하지만, `youSayHelloISayGoodbye` 를 실행하면 "Hello, Hi there" 같은 문장은 아래처럼 하나만 매칭될 수 있다.

![https://res.cloudinary.com/practicaldev/image/fetch/s--LfbYUWum--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f048067.png](https://res.cloudinary.com/practicaldev/image/fetch/s--LfbYUWum--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f048067.png)

이래서 Regex의 flag를 이용해 1개 이상을 매칭하는 데 사용한다.ㅁ

## Flags

regex flag는 기존 정규식의 modifier다. 플래그는 항상 정규식 정의의 마지막 슬래시 뒤에 추가한다.

몇몇 flag를 살펴보자.

- `g` - Global(전역), 1개 이상 매칭되는지 확인
- `m` - 각 새로운 줄에 $이랑 ^를 사용해 매칭(여러 줄 매칭)
- `i` - regex를 insensitive하게 함(?) - 영어 대소문자를 구분하지 않는듯.

flag를 사용하면 regex를 다시 쓸 수 있다.

아래 예시를 보자.

```jsx
/[Hh]ello|[Hh]i|[Hh]ey/
```

이 경우 /i를 사용하면 

```jsx
/Hello|Hi|Hey/i
```

아래 단어들이 매칭된다. (뒤에 대소문자 구분하지 않고 매칭하는 듯)

```
Hello
HEY
Hi
HeLLo
```

### Global regex flag with string replacing

위에 말했듯이 regex flag 없이 사용하면 첫 번째 결과만 대체된다.

```jsx
let str = "Hello, hi there!";
str = str.replace(/[Hh]ello|[Hh]i|[Hh]ey/, "Goodbye");
console.log(str); // Will output "Goodbye, hi there"

```

하지만 global flag를 사용하면 전역으로 regex가 적용된다.

```jsx
let str = "Hello, hi there!";
str = str.replace(/[Hh]ello|[Hh]i|[Hh]ey/g, "Goodbye");
console.log(str); // Will output "Goodbye, Goodbye there"

```

### 자바스크립트에서 global flag

자바스크립트에서 global regex를 사용할 때, exec 명령을 2번 이상 실행하면 이상한 걸 볼 수 있다.

특히, exec를 global regex와 함께 썼다면, 한 번은 null을 리턴할 거다.(두 번째는 잘 실행되고)

그 이유는 MDN이 설명해준다.([MDN explains](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec))

![https://res.cloudinary.com/practicaldev/image/fetch/s--SVrFgyRG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f141259.png](https://res.cloudinary.com/practicaldev/image/fetch/s--SVrFgyRG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f141259.png)

자바스크립트 RexExp 오브젝트는 전역 또는 sticky flag가 설정되있는 경우 상태를 저장한다. 이전에 매치되는 것에서 마지막 인덱스를 저장하고 그걸 이용해 exec() 함수는 내부적으로 여러 개의 일치를 반복하는데 사용한다.

exec 커맨드는 마지막 인덱스를 이용해 앞으로 움직이면서 매칭되는 것을 찾는다. 

마지막 인덱스는 문자열 길이의 세트이기 때문에 처음에는 regex가 빈 문자열(””)에 매칭하는지 시도한다. 설정한 regex가 다시 exec로 실행되야 리셋된다. 이 부분 때문에 혼란스러울 수 있다.

이 문제를 해결하려면 그냥 단순히 마지막 인덱스를 0으로 지정해주고 exec 커맨드를 실행하면 된다.

![https://res.cloudinary.com/practicaldev/image/fetch/s--f14xDtwL--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f274abf.png](https://res.cloudinary.com/practicaldev/image/fetch/s--f14xDtwL--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f274abf.png)

## Groups

regex에 대해 검색하다 보면, 한 번에 하나 이상을 매칭하고 싶을 때가 있는데 이때는 Groups를 쓰면 된다.

 `Testing 123` 와 `Tests 123` 에서 반복되는 “123”을 제외하고 매칭하고 싶다고 해보자.

```jsx
/(Testing|tests) 123/ig

```

![https://res.cloudinary.com/practicaldev/image/fetch/s--7GoGCP_d--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f390248.png](https://res.cloudinary.com/practicaldev/image/fetch/s--7GoGCP_d--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f390248.png)

그룹은 괄호를 쓴다. 

2가지 종류의 그룹이 있는데 하나는 capture groups, 다른 하나는 non-capture groups 다.

- `(...)` - 3글자에 매칭되는 그룹
- `(?:...)` - 3글자에 매칭되지 않는 그룹

이 둘의 차이는 아래를 통해 확인해보자. 

예를 들어, 아래와 같이 regex를 쓰고 "Testing 234" and "tests 234"를 대체한다고 해보자.

```jsx
const regex = /(Testing|tests) 123/ig;

let str = `
Testing 123
Tests 123
`;

str = str.replace(regex, '$1 234');
console.log(str); // Testing 234\nTests 234"

```

여기서 $1을 찾기 위해 capture group을 사용하고 있습니다. 1개 그룹 이상을 매칭할 수도 있습니다 이렇게 both `(Testing|tests)` and `(123)`.

```jsx
const regex = /(Testing|tests) (123)/ig;

let str = `
Testing 123
Tests 123
`;

str = str.replace(regex, '$1 #$2');
console.log(str); // Testing #123\nTests #123"

```

이건 capture group에만 해당하고 아래 정규식을

```jsx
/(Testing|tests) (123)/ig
```

이렇게 아래처럼 바꾼다면

```jsx
/(?:Testing|tests) (123)/ig;
```

그럼 1개의 capture group만 있을 거고 같은 코드여도 다른 결과가 리턴된다.

```jsx
const regex = /(?:Testing|tests) (123)/ig;

let str = `
Testing 123
Tests 123
`;

str = str.replace(regex, '$1');
console.log(str); // "123\n123"

```

### Named capture groups

capture group을 사용하는게 좋긴 하나 많아지면 오히려 혼란을 가중시킨다. 예를 들어, 3달러와 5달러의 차이가 항상 한 눈에 명백한 건 아니다. 이걸 해결하기 위해 Named capture group이 있다.

(? <name>...) - "name"과 일치하는 세 글자

이런 정규식에선 3개의 숫자와 일치하는 “num”이라는 group을 만들 수도 있다.

```jsx
/Testing (?<num>\d{3})/
```

그럼 아래처럼 사용할 수 있겠죠?

```jsx
const regex = /Testing (?<num>\d{3})/
let str = "Testing 123";
str = str.replace(regex, "Hello $<num>")
console.log(str); // "Hello 123"
```

### Named back reference

가끔은 쿼리 내부 자체에 named capture group을 사용하는게 유용하기도 하다.(뭔 소리야?)

이걸 Named back reference라고 한다.

예를 들어 확인하자. 

- `\k<name>` Reference named capture group "name" in a search query

매칭하기 원하는 것은 아래와 같다.

```
Hello there James. James, how are you doing?
```

하지만 되지 않는다. 

```
Hello there James. Frank, how are you doing?
```

James를 반복해서 작성해 regex를 쓸 수도 있다.

```jsx
/.*James. James,.*/
```

더 낫게 고치면 아래처럼 named back reference를 이용할 수 있다.

```jsx
/.*(?<name>James). \k<name>,.*/
```

### Lookahead and lookbehind groups

Lookahead와 lookbehind는 강력하나 종종 오해를 산다.

lookahead와 lookbehind에는 4개의 다른 타입이 있다.

- `(?!)` - negative lookahead
- `(?=)` - positive lookahead
- `(?<=)` - positive lookbehind
- `(?<!)` - negative lookbehind

Lookahead는 긍정적인지 부정적인지에 따라 무언가가 lookahead 그룹을 쫓거나 lookahead 그룹을 쫓지 않는다.(뭔 소리야 ㅁㄴㅇㄹ)

예를 들어서 부정적인 lookahead를 보자.

```jsx
/B(?!A)/
```

위 regex는 BC에는 매칭되나 BA에는 매칭되지 않는다.

![https://res.cloudinary.com/practicaldev/image/fetch/s--bc3cgyCK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f478fa1.png](https://res.cloudinary.com/practicaldev/image/fetch/s--bc3cgyCK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f478fa1.png)

^와 $ 토큰을 이용해서 전체 문자열을 매칭하기 위해 결합해 쓸 수도 있다. 예를 들어, 아래 regex는 “Test”로 시작하지 않는 모든 문자열과 매칭된다.

```jsx
/^(?!Test).*$/gm
```

![https://res.cloudinary.com/practicaldev/image/fetch/s--TncgWQrp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f5599e9.png](https://res.cloudinary.com/practicaldev/image/fetch/s--TncgWQrp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f5599e9.png)

비슷하게 긍정적인 lookahead의 경우 반드시 “Test”로 시작하는 모든 문자열과 매칭할 수 있다.

```jsx
/^(?=Test).*$/gm

```

![https://res.cloudinary.com/practicaldev/image/fetch/s--3g_8IFeg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f7125a2.png](https://res.cloudinary.com/practicaldev/image/fetch/s--3g_8IFeg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://d2h1bfu6zrdxog.cloudfront.net/wp-content/uploads/2022/04/img_625491f7125a2.png)

## 배운 거 다 써보자!

첫 번째 예제로 돌아가서 전화번호 매칭하는 regex를 쓰고 이해해보자.

```
^(?:\d{3}-){2}\d{4}$
```

위 regex는 아래 같은 전화번호에 매칭된다.

```
555-555-5555
```

이 regex에는 

- ^와 $를 사용해서 첫번째 문장과 마지막 문장을 정의한다.
- non-capturing group을 사용해서 3자리를 찾고 대시로 넘어가는
    - 그룹을 2번 반복하고(여기서 555-555-)
- 마지막 4자리를 찾는다.

마지막으로 [cheatsheet](https://coderpad.io/regular-expression-cheat-sheet/) 확인해보자.