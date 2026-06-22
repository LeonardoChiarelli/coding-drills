# Week 01 — Day 04

10 exercises · base mix 4 logic / 3 algorithms / 3 data structures · difficulty **Intermediate** (0.5)

Languages: Python, JavaScript, Go, Ruby, Rust, C++, TypeScript, Java, C#, Kotlin

---

## 1. Balanced Ternary Counter
**Pillar:** Logic · **Language:** Python · **Difficulty:** Intermediate

Convert a signed integer into its **balanced ternary** representation. Balanced ternary uses digits `-1`, `0`, `+1` (written here as `T`, `0`, `1`, where `T` means -1) in base 3. The value of a string `d_k … d_1 d_0` is `Σ d_i · 3^i`.

Write a function `to_balanced_ternary(n: int) -> str` that returns the balanced ternary string with no leading zeros. For `n == 0` return `"0"`.

**Example**
```
Input:  to_balanced_ternary(5)
Output: "1TT"        # 1*9 + (-1)*3 + (-1)*1 = 9 - 3 - 1 = 5

Input:  to_balanced_ternary(-2)
Output: "T1"         # (-1)*3 + 1*1 = -2
```

**Constraints**
- `-10^9 <= n <= 10^9`
- Output uses only the characters `T`, `0`, `1`.
- No leading zeros (except the single `"0"` for zero).

---

## 2. Bracket Pressure
**Pillar:** Logic · **Language:** JavaScript · **Difficulty:** Intermediate

A string contains only the characters `(`, `)`, and `?`. Each `?` must be replaced by either `(` or `)`. Decide whether there exists **at least one** replacement that makes the whole string a balanced parenthesis sequence.

Write `function canBalance(s)` returning `true` or `false`.

**Example**
```
Input:  canBalance("(?)")
Output: false        // length is odd, impossible

Input:  canBalance("(??)")
Output: true         // -> "(())" or "()()"

Input:  canBalance("))((")
Output: false
```

**Constraints**
- `0 <= s.length <= 100000`
- Solve in a single pass, O(n) time, O(1) extra space.

---

## 3. Wolf, Goat, Cabbage Validator
**Pillar:** Logic · **Language:** Go · **Difficulty:** Intermediate

You are given a log of river crossings for the classic puzzle. The farmer starts on the **left** bank with the wolf, goat, and cabbage. Each step is the cargo the farmer takes across (`"wolf"`, `"goat"`, `"cabbage"`, or `"none"`); the farmer switches banks each step.

A state is **unsafe** if, on a bank without the farmer, the wolf is with the goat, or the goat is with the cabbage. Validate the log: return whether every intermediate state is safe **and** the final state has all four entities on the right bank.

Implement `func ValidateCrossing(steps []string) bool`.

**Example**
```
Input:  []string{"goat","none","wolf","goat","cabbage","none","goat"}
Output: true

Input:  []string{"wolf"}
Output: false   // goat left alone with cabbage on the left bank
```

**Constraints**
- `0 <= len(steps) <= 50`
- Each element is one of `wolf`, `goat`, `cabbage`, `none`.
- Taking an item not on the farmer's current bank makes the log invalid → return `false`.

---

## 4. Self-Describing Number
**Pillar:** Logic · **Language:** Ruby · **Difficulty:** Intermediate

A number is **self-describing** in base 10 when, for every position `i` (0-indexed from the left), the digit at position `i` equals the count of occurrences of the digit `i` in the whole number.

Write `def self_describing?(n)` returning `true`/`false` for a non-negative integer `n`.

**Example**
```
Input:  self_describing?(2020)
Output: true    # digit0 says "2 zeros", digit1 says "0 ones", digit2 says "2 twos", digit3 says "0 threes"

Input:  self_describing?(22)
Output: false
```

**Constraints**
- `0 <= n <= 10^10`
- The number of positions equals the number of digits.

---

## 5. Maximum Gap (Bucket Sort)
**Pillar:** Algorithms · **Language:** Rust · **Difficulty:** Intermediate

Given an unsorted array of non-negative integers, return the maximum difference between two **successive** elements once the array is sorted. If the array has fewer than 2 elements, return 0.

Target **O(n)** time and **O(n)** space — a comparison sort (O(n log n)) does not pass.

Signature: `fn maximum_gap(nums: Vec<i32>) -> i32`

**Example**
```
Input:  vec![3, 6, 9, 1]
Output: 3        // sorted: [1,3,6,9], gaps 2,3,3 -> max 3

Input:  vec![10]
Output: 0
```

**Constraints**
- `0 <= nums.len() <= 10^5`
- `0 <= nums[i] <= 10^9`

---

## 6. Kth Smallest in Sorted Matrix
**Pillar:** Algorithms · **Language:** C++ · **Difficulty:** Intermediate

Given an `n x n` matrix where each row and each column is sorted in ascending order, return the `k`-th smallest element (1-indexed) in the matrix.

Aim for better than sorting all `n²` elements — binary search on the value range (`O(n log(max-min))`) is the intended approach.

Signature: `int kthSmallest(vector<vector<int>>& matrix, int k);`

**Example**
```
Input:  matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13

Input:  matrix = [[-5]], k = 1
Output: -5
```

**Constraints**
- `1 <= n <= 300`
- `1 <= k <= n*n`
- Matrix values fit in a 32-bit signed integer.

---

## 7. Longest Run-Length Compressible Window
**Pillar:** Algorithms · **Language:** TypeScript · **Difficulty:** Intermediate

Given a string `s` and an integer `k`, find the length of the **longest substring** that contains at most `k` distinct characters.

Use the sliding-window technique; target O(n) time.

Signature: `function longestKDistinct(s: string, k: number): number`

**Example**
```
Input:  longestKDistinct("eceba", 2)
Output: 3        // "ece"

Input:  longestKDistinct("aa", 1)
Output: 2
```

**Constraints**
- `0 <= s.length <= 10^5`
- `0 <= k <= 26`, lowercase English letters only.
- If `k == 0`, the answer is 0.

---

## 8. Min-Stack
**Pillar:** Data Structures · **Language:** Java · **Difficulty:** Intermediate

Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element — all in **O(1)** time.

Implement the class:
```java
class MinStack {
    public MinStack();
    public void push(int val);
    public void pop();
    public int top();
    public int getMin();
}
```

**Example**
```
push(-2); push(0); push(-3);
getMin();  -> -3
pop();
top();     -> 0
getMin();  -> -2
```

**Constraints**
- `pop`, `top`, `getMin` are only called on a non-empty stack.
- Up to `3 * 10^4` operations.
- `-2^31 <= val <= 2^31 - 1`.

---

## 9. LRU Cache
**Pillar:** Data Structures · **Language:** C# · **Difficulty:** Intermediate

Design a Least-Recently-Used cache with a fixed `capacity`. Both `Get` and `Put` must run in **O(1)** average time. When inserting a new key would exceed capacity, evict the least recently used key.

Implement:
```csharp
public class LRUCache {
    public LRUCache(int capacity);
    public int Get(int key);      // returns value, or -1 if absent
    public void Put(int key, int value);
}
```

**Example**
```
LRUCache(2)
Put(1,1); Put(2,2);
Get(1);    -> 1
Put(3,3);  // evicts key 2
Get(2);    -> -1
```

**Constraints**
- `1 <= capacity <= 3000`
- `0 <= key, value <= 10^4`
- Up to `2 * 10^5` calls to `Get` and `Put` combined.
- A `Get` or `Put` on an existing key marks it most-recently-used.

---

## 10. Union-Find with Path Compression
**Pillar:** Data Structures · **Language:** Kotlin · **Difficulty:** Intermediate

Implement a Disjoint Set Union (Union-Find) over `n` elements `0..n-1`, then answer connectivity. Given `n` and a list of `union` operations as `[a, b]` pairs, return the **number of connected components** remaining.

Use union by rank/size **and** path compression.

Signature: `fun countComponents(n: Int, edges: Array<IntArray>): Int`

**Example**
```
Input:  n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2        // {0,1,2} and {3,4}

Input:  n = 4, edges = []
Output: 4
```

**Constraints**
- `1 <= n <= 10^5`
- `0 <= edges.length <= 2 * 10^5`
- `0 <= a, b < n`; duplicate edges may appear.
