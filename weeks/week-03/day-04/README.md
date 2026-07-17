# Week 03 — Day 04

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 3 dataStructures

---

## 1. Fraction to Recurring Decimal
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
Given two integers `numerator` and `denominator`, return the fraction as a
string in decimal form. If the fractional part is repeating, enclose the
repeating portion in parentheses. The result must be exact — no rounding, no
floating point.

### Example
```
Input:  numerator = 1, denominator = 2
Output: "0.5"

Input:  numerator = 2, denominator = 3
Output: "0.(6)"

Input:  numerator = 4, denominator = 333
Output: "0.(012)"

Input:  numerator = -50, denominator = 8
Output: "-6.25"
```

### Constraints
- `-2^31 <= numerator, denominator <= 2^31 - 1`; `denominator != 0`.
- Detect the repeating cycle by remembering the position at which each
  remainder first appeared (a `map[int]int` from remainder to output index).
  When a remainder repeats, the digits between the two positions are the cycle.
- Watch the sign once, up front; then work with magnitudes. The classic trap is
  `numerator = -2^31`: negating it overflows `int32`, so widen to `int64`
  before taking the absolute value.
- No `strconv`/`fmt` float formatting — build the digits by long division.

---

## 2. Gray Code
**Pillar:** logic
**Language:** Rust
**Difficulty:** Intermediate

### Problem
An n-bit Gray code sequence is a permutation of the integers `0 .. 2^n - 1`
such that it starts at 0, every adjacent pair differs in exactly one bit, and
the first and last values also differ in exactly one bit. Given `n`, return any
valid n-bit Gray code sequence.

### Example
```
Input:  n = 2
Output: [0, 1, 3, 2]      // 00, 01, 11, 10

Input:  n = 1
Output: [0, 1]

Input:  n = 3
Output: [0, 1, 3, 2, 6, 7, 5, 4]   // any valid sequence accepted
```

### Constraints
- `1 <= n <= 16`; the output has exactly `2^n` entries.
- The closed-form `i ^ (i >> 1)` for `i` in `0 .. 2^n` produces the reflected
  binary Gray code directly — no backtracking, no visited set needed.
- Return `Vec<u32>`. Do not build the sequence by string manipulation of binary
  digits.
- State in a comment why `i ^ (i >> 1)` guarantees the single-bit-change
  property between consecutive `i`.

---

## 3. Bulls and Cows
**Pillar:** logic
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
You are playing Bulls and Cows. Given a `secret` number and a `guess` of the
same length (both strings of digits), return a hint in the form `"xAyB"`, where
`x` (bulls) is the count of digits that are correct and in the right position,
and `y` (cows) is the count of digits that are in the secret but in the wrong
position. Each digit in the secret can pair with at most one digit in the guess.

### Example
```
Input:  secret = "1807", guess = "7810"
Output: "1A3B"          // bull: '8'; cows: '1','0','7'

Input:  secret = "1123", guess = "0111"
Output: "1A1B"          // one '1' is a bull; one '1' is a cow, the third is unmatched

Input:  secret = "1234", guess = "1234"
Output: "4A0B"
```

### Constraints
- `1 <= secret.length == guess.length <= 1000`; both contain only digits `0-9`.
- Single pass for bulls; then use two length-10 frequency tables over the
  non-bull positions and sum `min(secretCount[d], guessCount[d])` for cows.
- The duplicate-digit accounting in the second example is the whole point — a
  naive "count shared digits" over-counts cows.
- No nested O(n²) scan matching guess digits against secret digits.

---

## 4. Multiply Strings
**Pillar:** logic
**Language:** C
**Difficulty:** Intermediate

### Problem
Given two non-negative integers `num1` and `num2` represented as strings,
return their product, also as a string. You must not convert the inputs to a
built-in integer type, and you must not use big-integer libraries.

### Example
```
Input:  num1 = "2", num2 = "3"
Output: "6"

Input:  num1 = "123", num2 = "456"
Output: "56088"

Input:  num1 = "0", num2 = "99999"
Output: "0"
```

### Constraints
- `1 <= strlen(num1), strlen(num2) <= 200`; digits only; no leading zeros
  except the literal `"0"`.
- Use the schoolbook algorithm into an `int` array of size `len1 + len2`: the
  product of digits at positions `i` and `j` lands in cells `i + j` and
  `i + j + 1`. Do the carry pass afterward.
- Strip leading zeros from the result, but never return an empty string —
  `"0" * "0"` must yield `"0"`.
- Caller owns the returned buffer; `malloc` it and document that in a comment.

---

## 5. Course Schedule II
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
There are `numCourses` courses labeled `0 .. numCourses - 1`. Some have
prerequisites given as pairs `[a, b]` meaning course `b` must be taken before
course `a`. Return any ordering of courses that lets you finish all of them. If
no valid ordering exists (there is a cycle), return an empty array.

### Example
```
Input:  numCourses = 2, prerequisites = [[1, 0]]
Output: [0, 1]

Input:  numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0, 1, 2, 3]     // [0,2,1,3] is also accepted

Input:  numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: []               // cycle
```

### Constraints
- `1 <= numCourses <= 2000`; `0 <= prerequisites.length <= numCourses * (numCourses - 1)`;
  no duplicate pairs.
- Kahn's algorithm: build an adjacency list and in-degree array, seed a queue
  with the zero-in-degree nodes, and emit nodes as their in-degree hits zero.
  If you emit fewer than `numCourses`, there is a cycle — return `new int[0]`.
- O(V + E). Do not run a fresh DFS per node.
- A DFS post-order with a three-color visited state is an accepted alternative,
  but it must still detect the cycle explicitly.

---

## 6. Kth Largest Element in an Array
**Pillar:** algorithms
**Language:** C++
**Difficulty:** Intermediate

### Problem
Given an integer array `nums` and an integer `k`, return the `k`-th largest
element. This is the `k`-th largest in sorted order, not the `k`-th distinct
element — duplicates count.

### Example
```
Input:  nums = [3, 2, 1, 5, 6, 4], k = 2
Output: 5

Input:  nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4
Output: 4

Input:  nums = [1], k = 1
Output: 1
```

### Constraints
- `1 <= k <= nums.size() <= 10^5`; `-10^4 <= nums[i] <= 10^4`.
- Target average O(n): Quickselect (Hoare partition around a pivot, recurse
  into only the side that contains the k-th position). A full `std::sort` is
  O(n log n) and is rejected here.
- If you use a heap instead, it must be a size-`k` min-heap for O(n log k), not
  a heap of all n elements.
- Pick the pivot to avoid the sorted-input worst case (e.g. median-of-three or
  a fixed shuffle); note your choice in a comment.

---

## 7. Coin Change
**Pillar:** algorithms
**Language:** Kotlin
**Difficulty:** Intermediate

### Problem
Given an array of `coins` of distinct denominations and an integer `amount`,
return the fewest number of coins needed to make up that amount. Each coin may
be used unlimited times. If the amount cannot be made from any combination,
return `-1`.

### Example
```
Input:  coins = [1, 2, 5], amount = 11
Output: 3        // 5 + 5 + 1

Input:  coins = [2], amount = 3
Output: -1

Input:  coins = [1], amount = 0
Output: 0
```

### Constraints
- `1 <= coins.size <= 12`; `1 <= coins[i] <= 2^31 - 1`; `0 <= amount <= 10^4`.
- Bottom-up DP over amounts: `dp[x]` = fewest coins for value `x`, initialized
  to a sentinel (`amount + 1` works as "infinity"). Answer is `dp[amount]` or
  `-1` if it is still the sentinel. O(amount · coins.size).
- A greedy "take the largest coin that fits" is wrong — show it fails on
  `coins = [1, 3, 4], amount = 6` (greedy gives 3, optimum is 2).
- `amount = 0` must return `0`, not `-1`.

---

## 8. Implement Trie (Prefix Tree)
**Pillar:** dataStructures
**Language:** C#
**Difficulty:** Intermediate

### Problem
Implement a trie supporting:
- `Insert(string word)` — add a word.
- `Search(string word)` — return `true` if the exact word was inserted.
- `StartsWith(string prefix)` — return `true` if any inserted word begins with
  `prefix`.

### Example
```
var t = new Trie();
t.Insert("apple");
t.Search("apple")     -> true
t.Search("app")       -> false    // inserted "apple", not "app"
t.StartsWith("app")   -> true
t.Insert("app");
t.Search("app")       -> true
```

### Constraints
- `1 <= word.Length, prefix.Length <= 2000`; lowercase English letters only; up
  to 30,000 total calls across all three methods.
- Each node holds up to 26 children plus an `isEnd` flag. `Search` differs from
  `StartsWith` only by whether it requires `isEnd` at the final node.
- Insert/Search/StartsWith are each O(length of the argument). A `HashSet` of
  whole words cannot answer `StartsWith` efficiently and is rejected.
- Fixed `Trie[26]` child arrays are fine; a `Dictionary` per node is also
  acceptable.

---

## 9. Min Stack
**Pillar:** dataStructures
**Language:** Python
**Difficulty:** Intermediate

### Problem
Design a stack that supports push, pop, top, and retrieving the minimum
element, all in constant time:
- `push(val)` — push onto the stack.
- `pop()` — remove the top element.
- `top()` — return the top element.
- `get_min()` — return the smallest element currently in the stack.

### Example
```
s = MinStack()
s.push(-2)
s.push(0)
s.push(-3)
s.get_min()   -> -3
s.pop()
s.top()       -> 0
s.get_min()   -> -2
```

### Constraints
- `-2^31 <= val <= 2^31 - 1`; up to 30,000 total calls; `pop`, `top`, and
  `get_min` are only called on a non-empty stack.
- All four operations must be **O(1)**. Scanning the stack for the minimum on
  each `get_min` is rejected.
- Track the running minimum alongside each value — either a parallel "min so
  far" stack, or push `(val, current_min)` pairs. Handle duplicate minima so
  that popping one copy does not lose the min prematurely.
- Do not use `heapq` — a heap gives O(log n) pop, not O(1).

---

## 10. Insert Delete GetRandom O(1)
**Pillar:** dataStructures
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
Implement a set-like structure `RandomizedSet` with average O(1) for all three:
- `insert(val)` — add `val`; return `true` if it was not already present.
- `remove(val)` — remove `val`; return `true` if it was present.
- `getRandom()` — return a random element currently in the set, each present
  element equally likely.

### Example
```
const rs = new RandomizedSet();
rs.insert(1)      // true
rs.remove(2)      // false, 2 not present
rs.insert(2)      // true
rs.getRandom()    // 1 or 2, uniformly at random
rs.remove(1)      // true
rs.insert(2)      // false, already present
rs.getRandom()    // always 2 now
```

### Constraints
- `-2^31 <= val <= 2^31 - 1`; up to 200,000 total calls; `getRandom` is only
  called when the set is non-empty.
- The standard design: an array of values plus a `Map` from value to its index
  in the array. `remove` swaps the target with the last array element, pops the
  tail, and fixes the moved element's index — that swap-with-last trick is what
  keeps `remove` O(1).
- `getRandom` must be uniform: index by `Math.floor(Math.random() * array.length)`.
- A plain `Set` cannot do uniform O(1) `getRandom` (no index access) and is
  rejected.
