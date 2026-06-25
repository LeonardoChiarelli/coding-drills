# Week 01 — Day 07

10 exercises · base mix 4 logic / 3 algorithms / 3 data structures · difficulty **Intermediate** (0.5)

Languages: Python, JavaScript, Go, Ruby, Rust, C++, TypeScript, Java, C#, Kotlin

---

## 1. Roman to Integer
**Pillar:** Logic · **Language:** Python · **Difficulty:** Intermediate

Roman numerals use the symbols `I, V, X, L, C, D, M` (values `1, 5, 10, 50, 100, 500, 1000`). A smaller symbol placed before a larger one is **subtracted** (e.g. `IV = 4`, `IX = 9`, `CM = 900`); otherwise symbols are added left to right. Given a valid Roman numeral string, return its integer value.

Write a function `roman_to_int(s: str) -> int`.

**Example**
```
Input:  roman_to_int("III")
Output: 3

Input:  roman_to_int("LVIII")
Output: 58

Input:  roman_to_int("MCMXCIV")
Output: 1994
```

**Constraints**
- `1 <= len(s) <= 15`
- `s` is a well-formed Roman numeral in the range `[1, 3999]`.
- Only the six subtractive pairs (`IV, IX, XL, XC, CD, CM`) occur.

---

## 2. Happy Number
**Pillar:** Logic · **Language:** JavaScript · **Difficulty:** Intermediate

A number is **happy** if repeatedly replacing it with the sum of the squares of its digits eventually reaches `1`. If the process loops endlessly without reaching `1`, the number is not happy. Given a positive integer, return whether it is happy.

Write `function isHappy(n)` returning a boolean.

**Example**
```
Input:  isHappy(19)
Output: true        // 1+81=82 -> 64+4=68 -> 36+64=100 -> 1

Input:  isHappy(2)
Output: false       // enters a cycle that never reaches 1
```

**Constraints**
- `1 <= n <= 2^31 - 1`
- Detect the cycle (e.g. a seen-set or Floyd's two pointers) — do not loop forever.
- The only terminating value is `1`.

---

## 3. Reverse Bits
**Pillar:** Logic · **Language:** Go · **Difficulty:** Intermediate

Reverse the bits of a given 32-bit unsigned integer. Bit `i` of the input becomes bit `31 - i` of the output.

Implement `func ReverseBits(n uint32) uint32`.

**Example**
```
Input:  ReverseBits(43261596)        // 00000010100101000001111010011100
Output: 964176192                     // 00111001011110000010100101000000

Input:  ReverseBits(4294967293)       // 11111111111111111111111111111101
Output: 3221225471                     // 10111111111111111111111111111111
```

**Constraints**
- Input and output are exactly 32 bits wide.
- Solve with bit shifts/masks; do not convert to a decimal string.
- `O(1)` extra space.

---

## 4. Pascal's Triangle Row
**Pillar:** Logic · **Language:** Ruby · **Difficulty:** Intermediate

Given a 0-indexed row number `k`, return the `k`-th row of Pascal's triangle as an array. Row `0` is `[1]`; every interior entry is the sum of the two entries directly above it.

Write `def pascal_row(k)` returning an array of integers.

**Example**
```
Input:  pascal_row(0)
Output: [1]

Input:  pascal_row(3)
Output: [1, 3, 3, 1]

Input:  pascal_row(5)
Output: [1, 5, 10, 10, 5, 1]
```

**Constraints**
- `0 <= k <= 33`
- The row has exactly `k + 1` entries.
- Aim for `O(k)` extra space (build in place rather than the full triangle).

---

## 5. Search in Rotated Sorted Array
**Pillar:** Algorithms · **Language:** Rust · **Difficulty:** Intermediate

An ascending array of distinct integers is rotated at an unknown pivot (e.g. `[0,1,2,4,5,6,7]` becomes `[4,5,6,7,0,1,2]`). Given the rotated array and a `target`, return its index, or `-1` if absent. Run in `O(log n)` using a modified binary search.

Signature: `fn search(nums: Vec<i32>, target: i32) -> i32`

**Example**
```
Input:  nums = vec![4,5,6,7,0,1,2], target = 0
Output: 4

Input:  nums = vec![4,5,6,7,0,1,2], target = 3
Output: -1

Input:  nums = vec![1], target = 1
Output: 0
```

**Constraints**
- `1 <= nums.len() <= 5000`
- All values are distinct and fit in a 32-bit signed integer.
- Required time complexity is `O(log n)`.

---

## 6. Merge Intervals
**Pillar:** Algorithms · **Language:** C++ · **Difficulty:** Intermediate

Given a collection of intervals `[start, end]`, merge all overlapping intervals and return the non-overlapping set that covers the same ranges. Touching intervals (e.g. `[1,4]` and `[4,5]`) count as overlapping.

Signature: `vector<vector<int>> merge(vector<vector<int>>& intervals);`

**Example**
```
Input:  [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]

Input:  [[1,4],[4,5]]
Output: [[1,5]]
```

**Constraints**
- `1 <= intervals.size() <= 10^4`
- `start <= end` for every interval; both fit in a 32-bit signed integer.
- Output intervals must be sorted by `start`.

---

## 7. Number of Islands
**Pillar:** Algorithms · **Language:** TypeScript · **Difficulty:** Intermediate

Given an `m x n` grid of `'1'` (land) and `'0'` (water), count the number of **islands**. An island is a maximal group of land cells connected 4-directionally (up/down/left/right). Diagonal contact does not connect.

Signature: `function numIslands(grid: string[][]): number`

**Example**
```
Input:  [["1","1","0","0"],
         ["1","0","0","1"],
         ["0","0","1","1"]]
Output: 2

Input:  [["1","1","1"],
         ["0","1","0"],
         ["1","1","1"]]
Output: 1
```

**Constraints**
- `1 <= m, n <= 300`
- Each cell is the string `'0'` or `'1'`.
- Use BFS, DFS, or union-find; visiting each cell once gives `O(m * n)`.

---

## 8. Queue from Two Stacks
**Pillar:** Data Structures · **Language:** Java · **Difficulty:** Intermediate

Implement a FIFO queue using only two LIFO stacks. The amortised cost of each operation must be **O(1)**.

Implement the class:
```java
class MyQueue {
    public MyQueue();
    public void push(int x);   // add to back
    public int pop();          // remove from front and return it
    public int peek();         // return the front without removing
    public boolean empty();
}
```

**Example**
```
push(1);
push(2);
peek();    -> 1
pop();     -> 1
empty();   -> false
pop();     -> 2
empty();   -> true
```

**Constraints**
- Values fit in a 32-bit signed integer.
- `pop` and `peek` are only called on a non-empty queue.
- Up to `100` calls combined; amortised `O(1)` per operation.

---

## 9. Trie (Prefix Tree)
**Pillar:** Data Structures · **Language:** C# · **Difficulty:** Intermediate

Design a trie supporting insertion and lookup of lowercase-letter words, plus a prefix query. Each operation runs in `O(L)` where `L` is the word/prefix length.

Implement:
```csharp
public class Trie {
    public Trie();
    public void Insert(string word);
    public bool Search(string word);          // exact word was inserted
    public bool StartsWith(string prefix);    // some inserted word has this prefix
}
```

**Example**
```
Trie()
Insert("apple");
Search("apple");     -> true
Search("app");       -> false
StartsWith("app");   -> true
Insert("app");
Search("app");       -> true
```

**Constraints**
- Words and prefixes consist of lowercase English letters `a`–`z`.
- `1 <= word.Length, prefix.Length <= 2000`
- Up to `3 * 10^4` calls combined across the methods.

---

## 10. Binary Min-Heap
**Pillar:** Data Structures · **Language:** Kotlin · **Difficulty:** Intermediate

Implement a binary **min-heap** of integers backed by an array. `push` and `pop` run in `O(log n)` via sift-up/sift-down; `peek` is `O(1)`.

Implement:
```kotlin
class MinHeap {
    fun push(value: Int)        // insert
    fun pop(): Int              // remove and return the minimum
    fun peek(): Int             // return the minimum without removing
    fun size(): Int
}
```

**Example**
```
MinHeap()
push(5)
push(3)
push(8)
push(1)
peek()   -> 1
pop()    -> 1
pop()    -> 3
size()   -> 2
```

**Constraints**
- Values fit in a 32-bit signed integer; duplicates are allowed.
- `pop` and `peek` are only called when `size() > 0`.
- Up to `10^5` operations; each `push`/`pop` is `O(log n)`.
