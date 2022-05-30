### Sliding Window 패턴

배열이나 문자열과 같은 일련의 데이터를 입력하거나 특정 방식으로 연속적인 해당 데이터의 하위 집합을 찾는 경우에 유용하다.

example: maxSubarraySum

```jsx
maxSubarraySum([1,2,5,2,8,1,5], 2) // 10
maxSubarraySum([1,2,5,2,8,1,5], 4) // 17
maxSubarraySum([], 4) // null
```

```jsx
function maxSubarraySum(arr, num) {
	let maxSum = 0;
	let tempSum = 0;
	if (arr.length < num) return null;
	
	for (let i = 0; i < num; i++) {
		maxSum += arr[i];
	}
	tempSum = maxSum;
	
	for (let i = num; i < arr.length; i++) {
		tempSum = tempSum - arr[i - num] + arr[i];
		maxSum = Math.max(maxSum, tempSum);
	}

	return maxSum;
}
```

### 분할 정복 패턴

주로 배열이나 문자열, 연결리스트, 트리 같은 데이터셋을 처리한다. 

큰 데이터를 작게 쪼개서 문제를 해결한다.

```jsx
function search(array, val) {
		let min = 0;
		let max = array.length - 1;

		while (min <= max) {
			let middle = Math.floor((min + max) / 2);
			let currentElement = array[middle];
			
			if (array[middle] < val) { 
					min = middle + 1;
			}
			else if (array[middle] > val) {
					max = middle - 1;
			}
			else {
					return middle;
			}
		}

		return -1;
}
```