# Week 02 — Day 03

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 3 dataStructures

---

## 1. Bulls and Cows
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
You are running a guessing game. Given a `secret` string and a `guess` string of the
same length (digits only), return a hint in the format `"xAyB"`, where `x` is the
number of **bulls** (digits that match in both value and position) and `y` is the
number of **cows** (digits present in the secret but placed in the wrong position).
Each digit occurrence can be counted at most once, and bulls are counted before cows.

### Example
```
Input:  secret = "1807", guess = "7810"
Output: "1A3B"

Input:  secret = "1123", guess = "0111"
Output: "1A1B"
```

### Constraints
- `1 <= len(secret) == len(guess) <= 1000`.
- `secret` and `guess` contain only digits `0`–`9`.
- Duplicated digits must not be double-counted across bulls and cows.

---

## 2. Zigzag Conversion
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
Write the characters of a string in a zigzag pattern across `numRows` rows: go down
the rows, then diagonally up to the top, and repeat. Then read the pattern row by row
and return the resulting string. For `"PAYPALISHIRING"` with 3 rows the pattern is:

```
P   A   H   N
A P L S I I G
Y   I   R
```

### Example
```
Input:  s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"

Input:  s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
```

### Constraints
- `1 <= len(s) <= 1000`.
- `1 <= numRows <= 1000`.
- When `numRows == 1`, the output equals the input.

---

## 3. Angle Between Clock Hands
**Pillar:** logic
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
Given a time as `hour` (1–12) and `minutes` (0–59) on an analog clock, return the
smaller angle in degrees between the hour hand and the minute hand. The hour hand
moves continuously: at `3:30` it sits halfway between 3 and 4. Answers within `1e-5`
of the exact value are accepted.

### Example
```
Input:  hour = 12, minutes = 30
Output: 165

Input:  hour = 3, minutes = 15
Output: 7.5
```

### Constraints
- `1 <= hour <= 12`, `0 <= minutes <= 59`.
- Return the smaller of the two possible angles (result is `<= 180`).

---

## 4. Word Pattern Bijection
**Pillar:** logic
**Language:** Rust
**Difficulty:** Intermediate

### Problem
Given a `pattern` string of lowercase letters and a sentence `s` of words separated by
single spaces, determine whether `s` follows the pattern: there must be a bijection
between letters in `pattern` and words in `s`. Two different letters cannot map to the
same word, and one letter cannot map to two different words.

### Example
```
Input:  pattern = "abba", s = "dog cat cat dog"
Output: true

Input:  pattern = "abba", s = "dog dog dog dog"
Output: false
```

### Constraints
- `1 <= len(pattern) <= 300`; `s` contains only lowercase words and single spaces.
- If the number of words differs from the pattern length, return `false`.

---

## 5. Search in Rotated Sorted Array
**Pillar:** algorithms
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
An ascending array of **distinct** integers was rotated at an unknown pivot (e.g.
`[0,1,2,4,5,6,7]` may become `[4,5,6,7,0,1,2]`). Given the rotated array `nums` and a
`target`, return the index of `target`, or `-1` if absent. Your algorithm must run in
`O(log n)` time.

### Example
```
Input:  nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Input:  nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

### Constraints
- `1 <= nums.length <= 5000`; all values distinct.
- `-10^4 <= nums[i], target <= 10^4`.
- Linear scan does not meet the complexity requirement.

---

## 6. Coin Change (Fewest Coins)
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
Given an array of coin denominations `coins` and a total `amount`, return the fewest
number of coins needed to make up that amount, or `-1` if it cannot be formed. You
have an unlimited supply of each denomination.

### Example
```
Input:  coins = [1, 2, 5], amount = 11
Output: 3   (5 + 5 + 1)

Input:  coins = [2], amount = 3
Output: -1
```

### Constraints
- `1 <= coins.length <= 12`; `1 <= coins[i] <= 2^31 - 1`.
- `0 <= amount <= 10^4`; for `amount = 0` the answer is `0`.
- Greedy by largest coin is incorrect for some inputs; aim for dynamic programming.

---

## 7. Merge Overlapping Intervals
**Pillar:** algorithms
**Language:** C#
**Difficulty:** Intermediate

### Problem
Given a list of intervals `[start, end]`, merge all overlapping intervals and return a
list of non-overlapping intervals that covers exactly the same ranges. Intervals that
touch at a point (e.g. `[1,4]` and `[4,5]`) count as overlapping.

### Example
```
Input:  [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]

Input:  [[1,4],[4,5]]
Output: [[1,5]]
```

### Constraints
- `1 <= intervals.length <= 10^4`; `0 <= start <= end <= 10^4`.
- Input is not necessarily sorted.
- Target `O(n log n)` overall.

---

## 8. Min Stack
**Pillar:** dataStructures
**Language:** Go
**Difficulty:** Intermediate

### Problem
Design a stack that supports `push(x)`, `pop()`, `top()`, and `getMin()` — retrieving
the minimum element currently in the stack — all in `O(1)` time. Implement it as a
type with those four methods.

### Example
```
push(-2); push(0); push(-3)
getMin() -> -3
pop()
top()    -> 0
getMin() -> -2
```

### Constraints
- `-2^31 <= x <= 2^31 - 1`.
- `pop`, `top`, `getMin` are only called on a non-empty stack.
- Up to `3 * 10^4` operations; every operation must be `O(1)`.

---

## 9. LRU Cache
**Pillar:** dataStructures
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Design a Least Recently Used (LRU) cache with a fixed `capacity`. `get(key)` returns
the value if present (and marks the key as most recently used) or `-1` otherwise.
`put(key, value)` inserts or updates the key (marking it most recently used); if the
cache exceeds capacity, evict the least recently used key. Both operations must run
in `O(1)` average time.

### Example
```
LRUCache(2)
put(1, 1); put(2, 2)
get(1)    -> 1
put(3, 3)            // evicts key 2
get(2)    -> -1
```

### Constraints
- `1 <= capacity <= 3000`; `0 <= key, value <= 10^4`.
- Up to `10^5` calls to `get`/`put`.
- Built-in insertion-ordered `Map` may be used, but explain the eviction invariant.

---

## 10. Top K Frequent Elements
**Pillar:** dataStructures
**Language:** Python
**Difficulty:** Intermediate

### Problem
Given an integer array `nums` and an integer `k`, return the `k` most frequent
elements, in any order. Use a frequency map combined with a heap (or bucket sort) so
the solution runs better than `O(n log n)` in the number of elements.

### Example
```
Input:  nums = [1,1,1,2,2,3], k = 2
Output: [1, 2]

Input:  nums = [1], k = 1
Output: [1]
```

### Constraints
- `1 <= nums.length <= 10^5`; `-10^4 <= nums[i] <= 10^4`.
- `k` is between 1 and the number of distinct elements; the answer is unique.
- Full sort of all elements does not meet the complexity target.
