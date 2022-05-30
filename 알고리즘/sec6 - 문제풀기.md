## Coding Exercise

### #3 frequency counter - sameFrequency

```jsx
function sameFrequency(a, b) {
    let aStr = a.toString();
    let bStr = b.toString();

    if (aStr.length !== bStr.length) return false

    let frequencyCounter1 = {}
    let frequencyCounter2 = {}

    for (let i = 0; i < aStr.length; i++) {
        frequencyCounter1[aStr[i]] = (frequencyCounter1[aStr[i]] || 0) + 1
    }

    for (let i = 0; i < bStr.length; i++) {
        frequencyCounter2[bStr[i]] = (frequencyCounter2[bStr[i]] || 0) + 1
    }

    for (let key in frequencyCounter1) {
        if (!(key in frequencyCounter2)) return false;
        if (frequencyCounter2[key] !== frequencyCounter1[key]) return false
    }

    return true
}
```

### #4 Frequency Counter / Multiple Pointers

areThereDuplicates

```jsx
function areThereDuplicates(...args) {
  args.sort((a,b) => a > b);
  let start = 0;
  let next = 1;
  while(next < args.length){
    if(args[start] === args[next]){
        return true
    }
    start++
    next++
  }
  return false
}
```

```jsx
function areThereDuplicates() {
  return new Set(arguments).size !== arguments.length;
}
```