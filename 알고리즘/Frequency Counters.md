### 빈도수 세기 패턴(Frequency Counters)

객체를 사용해 다양한 값과 빈도를 체크하는 문제를 해결해보자.

예시 문제

2개의 배열을 허용하는 same이라는 함수를 작성하세요.

배열의 모든 값이 두 번째 배열에 해당하는 값을 가지면 true를 반환합니다. 


첫 번째 배열에는 여러 값이 있는데 두 번째 배열의 값이 정확히 동일하지만 제곱되어 있는지 알아보려 한다. 

순서는 상관 없고 제곱만 하면 된다. 

섞일 수 있지만 값의 빈도는 동일해야 한다.

```jsx
same([1,2,3]. [4.1.9]) // true
same([1,2,3], [1,9]) // false
same([1,2,1], [4,4,1]) // false (must be same frequency)
```

O(n^2) - indexOf가 중첩 루프가 됨 → 이 코드를 개선해보자.

```jsx
function same(arr1, arr2) {
	if (arr1.length !== arr2.length) return false

	for (let i = 0; i < arr1.length; i++) {
		let correctIndex = arr2.indexOf(arr1[i] ** 2)
		if (correctIndex === -1) return false
		arr2.splice(correctIndex, 1)
	}
	
	return true;
}
```

리팩터링한 코드 - 중첩된 루프보다 그냥 2개의 중첩되지 않은 loop가 더 낫다.

```jsx
function same(arr1, arr2){
	if (arr1.length !== arr2.length) return false

	let frequencyCounter1 = {}
	let frequencyCounter2 = {}
	
	for (let val of arr1) {
			frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
	}
	for (let val of arr2) {
			frequencyCounter2[val] = (frequencyCounter12[val] || 0) + 1
	}
	for (let key in frequencyCounter1) {
			if(!(key ** 2 in frequencyCounter2)) return false
			if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]) return false
	}
	return true
}
```

### 에너그램

위에 Frequency Counters 방식으로 O(N)으로 풀어보자!

1. 일단 length를 비교하고 다르면 return false 해주자
2. 같을 경우 counter를 두는데
    1. 첫 번째 문자열을 for문을 돌면서 없으면 1개 있으면 그 값에 +1을 해서 a : 2 ← 이런 식으로 구함
    2. 두 번째 문자열도 위와 같이 count 함
3. 그리고 첫 번째 문자열 카운터에서 for문을 돌면서
    1. 두 번째 문자열 카운터에 같은 key가 있고 그 value가 같은지 비교한다.

내 풀이

```jsx
function validAnagram(str1, str2){
  if (str1.length !== str2.length) return false
	if (str1.length === 0 && str2.length === 0) return true
  
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  
  for (let val of str1) {
      frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
  }
  
  for (let val of str2) {
      frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1
  }
  
  for (let key in frequencyCounter1) {
      if (!(key in frequencyCounter2)) return false
      if (frequencyCounter1[key] !== frequencyCounter2[key]) return false
  }

	return true
}
```

선생님 풀이

```jsx
function validAnagram(first, second) {
	if (first.length !== second.length) return false

	const lookup = {};
	for (let i = 0; i < first.length; i++) {
		let letter = first[i];
		// 문자가 있
		lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
	}

	for (let i = 0; i < second.length; i++) {
		let letter = second[i];
		// 문자가 없거나 체크할 당시 값이 0이면 아나그램이 아니다. 
		// 0이면 false이므로 !lookup[letter] 가 true가 되어 false가 리턴
		if (!lookup[letter]) return false
		else lookup[letter] -= 1
	}
	return true;
}
```

내 풀이와 다른 점은 객체를 두 개 활용하지 않았다는 점이다. 

둘 다 O(N)이긴 한데 선생님 풀이가 더 효율적이고 빠르게 결과가 도출될 거다.

lookup으로 frequency를 체크하는데 첫 번째 문자열만 일단 넣는다. 

그리고 두 번째 문자열을 for 문을 돌면서 lookup과 바로 비교한다. 

lookup 객체에 없으면 바로 false를 리턴한다. 

문자를 한 번 체크한 경우 해당하는 문자는 -1을 해서 줄여준다. 


### kotlin

나는 코틀린으로도 한 번 풀어보고 싶어서 해보다가 코틀린은 역시 내장함수가 잘되어 있어서 좀 더 손쉽게 아나그램을 판단할 수 있었다.

```kotlin
fun isAnagram(str1: String, str2: String) =
    str1.groupingBy { it }.eachCount() == str2.groupingBy { it }.eachCount()
```