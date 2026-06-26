# Week 02 — Day 01

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 3 dataStructures

---

## 1. Bracket Balance Checker
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
Given a string containing only the characters `()[]{}`, decide whether every
opening bracket is closed by the matching closing bracket in the correct order.
A string is balanced when each closer matches the most recently opened, still-open
bracket of the same type.

### Example
```
Input:  "([]{})"
Output: true

Input:  "([)]"
Output: false
```

### Constraints
- `0 <= len(s) <= 10_000`
- The string contains only the six bracket characters listed above.
- An empty string is balanced.

---

## 2. Run-Length Encoder
**Pillar:** logic
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
Compress a string by replacing each run of the same character with the character
followed by the run length. Runs of length 1 keep their count (`a` → `a1`) so the
encoding is unambiguous and reversible.

### Example
```
Input:  "aaabbc"
Output: "a3b2c1"

Input:  "x"
Output: "x1"
```

### Constraints
- Input contains only lowercase ASCII letters `a`–`z`.
- `0 <= input.length <= 50_000`.
- Empty input returns an empty string.

---

## 3. Roman Numeral to Integer
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
Convert a valid Roman numeral string into its integer value. Apply the subtractive
rule: when a smaller-value symbol precedes a larger one (e.g. `IV`, `IX`, `XL`),
it is subtracted instead of added.

### Example
```
Input:  "MCMXCIV"
Output: 1994

Input:  "LVIII"
Output: 58
```

### Constraints
- `1 <= value <= 3999`.
- Input is a well-formed Roman numeral using `I V X L C D M`.

---

## 4. Spiral Matrix Traversal
**Pillar:** logic
**Language:** Rust
**Difficulty:** Intermediate

### Problem
Given an `m x n` matrix of integers, return all elements in clockwise spiral order
starting from the top-left corner.

### Example
```
Input:  [[1, 2, 3],
         [4, 5, 6],
         [7, 8, 9]]
Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
```

### Constraints
- `1 <= m, n <= 100`.
- Matrix is rectangular (all rows have equal length).
- Element values fit in a 32-bit signed integer.

---

## 5. Kth Largest Element
**Pillar:** algorithms
**Language:** C++
**Difficulty:** Intermediate

### Problem
Given an unsorted array of integers and an integer `k`, return the `k`-th largest
element in sorted order (not the k-th distinct element). Aim for better than full
sort — a partial selection (heap or quickselect) is expected.

### Example
```
Input:  nums = [3, 2, 1, 5, 6, 4], k = 2
Output: 5

Input:  nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4
Output: 4
```

### Constraints
- `1 <= k <= nums.length <= 100_000`.
- `-10^9 <= nums[i] <= 10^9`.

---

## 6. Merge Intervals
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
Given a list of closed intervals `[start, end]`, merge all overlapping intervals
and return the resulting non-overlapping intervals sorted by start. Intervals that
only touch at an endpoint (e.g. `[1,4]` and `[4,5]`) are considered overlapping.

### Example
```
Input:  [[1,3], [2,6], [8,10], [15,18]]
Output: [[1,6], [8,10], [15,18]]

Input:  [[1,4], [4,5]]
Output: [[1,5]]
```

### Constraints
- `1 <= intervals.length <= 10_000`.
- `0 <= start <= end <= 10^9`.

---

## 7. Binary Search on Rotated Array
**Pillar:** algorithms
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
A sorted array of distinct integers has been rotated at an unknown pivot. Given a
target value, return its index, or `-1` if absent. Must run in `O(log n)` time.

### Example
```
Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4

Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1
```

### Constraints
- `1 <= nums.length <= 100_000`.
- All values are distinct.
- The array is a rotation of an ascending-sorted array.

---

## 8. LRU Cache
**Pillar:** dataStructures
**Language:** Python
**Difficulty:** Intermediate

### Problem
Implement a Least-Recently-Used cache with a fixed capacity supporting `get(key)`
and `put(key, value)`, both in average `O(1)`. When a `put` exceeds capacity, evict
the least recently used entry. A `get` or `put` counts as a use.

### Example
```
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
cache.get(1)      -> 1
cache.put(3, 3)   # evicts key 2
cache.get(2)      -> -1
```

### Constraints
- `1 <= capacity <= 10_000`.
- `get` returns `-1` for a missing key.
- Up to `200_000` total operations.

---

## 9. Min Stack
**Pillar:** dataStructures
**Language:** Go
**Difficulty:** Intermediate

### Problem
Design a stack supporting `push`, `pop`, `top`, and `getMin`, where `getMin`
returns the minimum element currently in the stack. All four operations must run
in `O(1)` time.

### Example
```
push(-2); push(0); push(-3)
getMin()  -> -3
pop()
top()     -> 0
getMin()  -> -2
```

### Constraints
- `pop`, `top`, `getMin` are only called on a non-empty stack.
- Values fit in a 32-bit signed integer.
- Up to `50_000` operations.

---

## 10. Trie with Prefix Search
**Pillar:** dataStructures
**Language:** Java
**Difficulty:** Intermediate

### Problem
Implement a prefix tree (trie) supporting `insert(word)`, `search(word)` (exact
match), and `startsWith(prefix)` (any inserted word begins with the prefix). Words
and prefixes consist of lowercase letters `a`–`z`.

### Example
```
insert("apple")
search("apple")     -> true
search("app")       -> false
startsWith("app")   -> true
insert("app")
search("app")       -> true
```

### Constraints
- `1 <= word.length, prefix.length <= 2_000`.
- Up to `30_000` calls across all three methods.
- Only lowercase ASCII letters.
