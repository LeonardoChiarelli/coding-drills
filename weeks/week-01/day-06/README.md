# Week 01 — Day 06

10 exercises · base mix 4 logic / 3 algorithms / 3 data structures · difficulty **Intermediate** (0.5)

Languages: Python, JavaScript, Go, Ruby, Rust, C++, TypeScript, Java, C#, Kotlin

---

## 1. Excel Column Title
**Pillar:** Logic · **Language:** Python · **Difficulty:** Intermediate

Spreadsheet columns are labelled `A, B, ..., Z, AA, AB, ...` — a bijective base-26 numbering. Given a positive integer column number, return its column title.

Write a function `to_column_title(n: int) -> str`.

**Example**
```
Input:  to_column_title(1)
Output: "A"

Input:  to_column_title(28)
Output: "AB"

Input:  to_column_title(701)
Output: "ZY"
```

**Constraints**
- `1 <= n <= 2^31 - 1`
- Output uses only uppercase letters `A`–`Z`.
- Note this is bijective base-26: there is no digit `0`.

---

## 2. Valid Sudoku Board
**Pillar:** Logic · **Language:** JavaScript · **Difficulty:** Intermediate

Given a partially filled `9x9` Sudoku board, decide whether the current placement is **valid** — no digit repeats within any row, any column, or any of the nine `3x3` sub-boxes. Empty cells are `'.'` and must be ignored. You do **not** need to check solvability.

Write `function isValidSudoku(board)` where `board` is a 9×9 array of single-character strings, returning a boolean.

**Example**
```
Input:  a board whose top row is ["5","3",".",".","7",".",".",".","."] (valid layout)
Output: true

Input:  the same board but with a second "8" added inside one 3x3 box
Output: false
```

**Constraints**
- `board.length === 9` and each `board[i].length === 9`.
- Each cell is a digit `'1'`–`'9'` or `'.'`.
- Only the filled cells are validated.

---

## 3. Bitwise Single Number
**Pillar:** Logic · **Language:** Go · **Difficulty:** Intermediate

Every element in a non-empty integer slice appears exactly **twice**, except for one element that appears once. Return that single element. Solve it in `O(n)` time and `O(1)` extra space (hint: XOR).

Implement `func SingleNumber(nums []int) int`.

**Example**
```
Input:  []int{2, 2, 1}
Output: 1

Input:  []int{4, 1, 2, 1, 2}
Output: 4

Input:  []int{7}
Output: 7
```

**Constraints**
- `1 <= len(nums) <= 3 * 10^4`
- Exactly one element appears once; every other element appears exactly twice.
- Values fit in a 32-bit signed integer.

---

## 4. Balanced Bracket Matcher
**Pillar:** Logic · **Language:** Ruby · **Difficulty:** Intermediate

Given a string containing only the bracket characters `()[]{}`, decide whether it is **well-formed**: every opener is closed by the matching type, and brackets are correctly nested.

Write `def balanced?(s)` returning `true` or `false`.

**Example**
```
Input:  balanced?("()[]{}")
Output: true

Input:  balanced?("([{}])")
Output: true

Input:  balanced?("(]")
Output: false

Input:  balanced?("([)]")
Output: false
```

**Constraints**
- `0 <= s.length <= 10^4`
- `s` contains only the six characters `()[]{}`.
- The empty string is considered balanced (`true`).

---

## 5. Longest Increasing Subsequence
**Pillar:** Algorithms · **Language:** Rust · **Difficulty:** Intermediate

Given an integer array, return the length of the longest **strictly increasing** subsequence (elements need not be contiguous). Aim for `O(n log n)` using patience sorting / binary search; an `O(n^2)` DP also exists but the larger inputs reward the faster approach.

Signature: `fn length_of_lis(nums: Vec<i32>) -> i32`

**Example**
```
Input:  vec![10, 9, 2, 5, 3, 7, 101, 18]
Output: 4        // [2, 3, 7, 101]

Input:  vec![0, 1, 0, 3, 2, 3]
Output: 4        // [0, 1, 2, 3]

Input:  vec![7, 7, 7, 7]
Output: 1
```

**Constraints**
- `1 <= nums.len() <= 2500`
- Values fit in a 32-bit signed integer.
- The subsequence must be strictly increasing (equal values do not extend it).

---

## 6. Quickselect: Kth Largest
**Pillar:** Algorithms · **Language:** C++ · **Difficulty:** Intermediate

Return the `k`-th **largest** element in an unsorted vector (1-indexed, so `k = 1` is the maximum). Target an average `O(n)` solution using the quickselect partition scheme rather than fully sorting.

Signature: `int findKthLargest(vector<int>& nums, int k);`

**Example**
```
Input:  nums = [3,2,1,5,6,4], k = 2
Output: 5

Input:  nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

**Constraints**
- `1 <= k <= nums.size() <= 10^5`
- Values fit in a 32-bit signed integer; duplicates are allowed.
- The `k`-th largest is by value rank including duplicates (not the `k`-th distinct value).

---

## 7. Course Schedule (Cycle Detection)
**Pillar:** Algorithms · **Language:** TypeScript · **Difficulty:** Intermediate

There are `numCourses` courses labelled `0` to `numCourses - 1`. Each pair `[a, b]` in `prerequisites` means you must take course `b` before course `a`. Return `true` if you can finish all courses — i.e. the dependency graph has no cycle.

Signature: `function canFinish(numCourses: number, prerequisites: number[][]): boolean`

**Example**
```
Input:  numCourses = 2, prerequisites = [[1, 0]]
Output: true        // take 0, then 1

Input:  numCourses = 2, prerequisites = [[1, 0], [0, 1]]
Output: false       // cyclic dependency

Input:  numCourses = 3, prerequisites = []
Output: true
```

**Constraints**
- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- Each `prerequisites[i] = [a, b]` with `0 <= a, b < numCourses`; pairs may repeat.

---

## 8. Min Stack
**Pillar:** Data Structures · **Language:** Java · **Difficulty:** Intermediate

Design a stack that supports push, pop, top, and retrieving the minimum element — all in **O(1)** time.

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
push(-2);
push(0);
push(-3);
getMin();   -> -3
pop();
top();      -> 0
getMin();   -> -2
```

**Constraints**
- Values fit in a 32-bit signed integer.
- `pop`, `top`, and `getMin` are only called on a non-empty stack.
- Up to `3 * 10^4` calls combined across all methods.

---

## 9. LRU Cache
**Pillar:** Data Structures · **Language:** C# · **Difficulty:** Intermediate

Design a Least-Recently-Used cache with a fixed positive capacity. Both `Get` and `Put` must run in **O(1)** average time. When `Put` exceeds capacity, evict the least recently used key. Reading or writing a key counts as a use.

Implement:
```csharp
public class LRUCache {
    public LRUCache(int capacity);
    public int Get(int key);            // value, or -1 if absent
    public void Put(int key, int value);
}
```

**Example**
```
LRUCache(2)
Put(1, 1);
Put(2, 2);
Get(1);      -> 1
Put(3, 3);   // evicts key 2 (least recently used)
Get(2);      -> -1
Put(4, 4);   // evicts key 1
Get(1);      -> -1
Get(3);      -> 3
Get(4);      -> 4
```

**Constraints**
- `1 <= capacity <= 3000`
- Keys and values fit in a 32-bit signed integer.
- Up to `2 * 10^5` calls combined across `Get` and `Put`.

---

## 10. Union-Find (Disjoint Set)
**Pillar:** Data Structures · **Language:** Kotlin · **Difficulty:** Intermediate

Implement a disjoint-set (union-find) structure over elements `0..n-1` with **path compression** and **union by rank/size**, then expose a count of the current number of disjoint components.

Implement:
```kotlin
class UnionFind(n: Int) {
    fun find(x: Int): Int      // representative root of x
    fun union(a: Int, b: Int)  // merge the sets containing a and b
    fun connected(a: Int, b: Int): Boolean
    fun count(): Int           // number of disjoint components
}
```

**Example**
```
UnionFind(5)        // 5 singletons -> count() == 5
union(0, 1)
union(1, 2)
connected(0, 2)     -> true
connected(0, 3)     -> false
count()             -> 3       // {0,1,2}, {3}, {4}
```

**Constraints**
- `1 <= n <= 10^5`
- `0 <= a, b < n` for every `union`/`connected`/`find` call.
- Operations must be near-constant time (inverse-Ackermann) amortised.
