# Week 01 — Day 05

10 exercises · base mix 4 logic / 3 algorithms / 3 data structures · difficulty **Intermediate** (0.5)

Languages: Python, JavaScript, Go, Ruby, Rust, C++, TypeScript, Java, C#, Swift

---

## 1. Roman Numeral Round-Trip
**Pillar:** Logic · **Language:** Python · **Difficulty:** Intermediate

Convert an integer to its **Roman numeral** string using the standard subtractive notation (`IV`, `IX`, `XL`, `XC`, `CD`, `CM`).

Write a function `to_roman(n: int) -> str` that returns the canonical Roman numeral for `n`.

**Example**
```
Input:  to_roman(1994)
Output: "MCMXCIV"      # M + CM + XC + IV

Input:  to_roman(58)
Output: "LVIII"        # L + V + III
```

**Constraints**
- `1 <= n <= 3999`
- Output uses only the characters `I V X L C D M`.
- Use the canonical (shortest) representation.

---

## 2. Phone Keypad Letter Count
**Pillar:** Logic · **Language:** JavaScript · **Difficulty:** Intermediate

On a classic phone keypad, each digit `2`–`9` maps to a set of letters (`2`→`abc`, `3`→`def`, …, `7`→`pqrs`, `8`→`tuv`, `9`→`wxyz`). Given a string of digits, return **how many** distinct letter combinations it can produce — without enumerating them.

Write `function combinationCount(digits)` returning a number.

**Example**
```
Input:  combinationCount("23")
Output: 9        // 3 letters * 3 letters

Input:  combinationCount("7")
Output: 4        // pqrs

Input:  combinationCount("")
Output: 0
```

**Constraints**
- `0 <= digits.length <= 18`
- Digits are only `2`–`9`.
- Return `0` for the empty string. The result fits in a 53-bit integer.

---

## 3. Tic-Tac-Toe Winner
**Pillar:** Logic · **Language:** Go · **Difficulty:** Intermediate

Given a finished or in-progress 3×3 board, determine the result. The board is a `[3][3]` grid where each cell is `'X'`, `'O'`, or `' '` (space, empty).

Return `"X"` or `"O"` if that player has three in a row (horizontal, vertical, or diagonal), `"Draw"` if the board is full with no winner, and `"Pending"` otherwise.

Implement `func Winner(board [3][3]rune) string`.

**Example**
```
Input:  {{'X','X','X'},{'O','O',' '},{' ',' ',' '}}
Output: "X"

Input:  {{'X','O','X'},{'X','O','O'},{'O','X','X'}}
Output: "Draw"

Input:  {{'X',' ',' '},{' ','O',' '},{' ',' ',' '}}
Output: "Pending"
```

**Constraints**
- Assume the input is reachable in normal play (at most one winner).
- Each cell is one of `'X'`, `'O'`, `' '`.

---

## 4. Look-and-Say Step
**Pillar:** Logic · **Language:** Ruby · **Difficulty:** Intermediate

The look-and-say sequence reads off the digits of the previous term: `"1"` → `"11"` (one 1) → `"21"` (two 1s) → `"1211"` (one 2, one 1) → `"111221"`.

Given a digit string `s`, return the **next** term produced by reading it aloud.

Write `def look_and_say(s)` returning a string.

**Example**
```
Input:  look_and_say("1")
Output: "11"

Input:  look_and_say("1211")
Output: "111221"

Input:  look_and_say("333")
Output: "33"
```

**Constraints**
- `1 <= s.length <= 10^4`
- `s` contains only the characters `0`–`9`.
- Runs longer than 9 are still encoded as a normal decimal count (e.g. ten 7s → `"107"`).

---

## 5. Search in Rotated Sorted Array
**Pillar:** Algorithms · **Language:** Rust · **Difficulty:** Intermediate

A sorted array of **distinct** integers has been rotated at an unknown pivot (e.g. `[0,1,2,4,5,6,7]` → `[4,5,6,7,0,1,2]`). Given the rotated array and a `target`, return the index of `target`, or `-1` if absent.

Target **O(log n)** time — a linear scan does not pass.

Signature: `fn search(nums: Vec<i32>, target: i32) -> i32`

**Example**
```
Input:  nums = vec![4,5,6,7,0,1,2], target = 0
Output: 4

Input:  nums = vec![4,5,6,7,0,1,2], target = 3
Output: -1
```

**Constraints**
- `0 <= nums.len() <= 5000`
- All values are distinct and fit in a 32-bit signed integer.
- The array may be rotated zero times (already sorted).

---

## 6. Coin Change (Minimum Coins)
**Pillar:** Algorithms · **Language:** C++ · **Difficulty:** Intermediate

Given a list of distinct coin denominations and a target `amount`, return the **fewest** number of coins that sum to `amount`. Each denomination may be used unlimited times. Return `-1` if the amount cannot be formed.

Aim for `O(amount * coins.size())` dynamic programming.

Signature: `int coinChange(vector<int>& coins, int amount);`

**Example**
```
Input:  coins = [1,2,5], amount = 11
Output: 3        // 5 + 5 + 1

Input:  coins = [2], amount = 3
Output: -1

Input:  coins = [1], amount = 0
Output: 0
```

**Constraints**
- `1 <= coins.size() <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

---

## 7. Merge K Sorted Lists
**Pillar:** Algorithms · **Language:** TypeScript · **Difficulty:** Intermediate

Given `k` arrays, each sorted in ascending order, merge them into a single sorted array. Aim for `O(N log k)` time where `N` is the total number of elements (use a min-heap or pairwise merging).

Signature: `function mergeKSorted(lists: number[][]): number[]`

**Example**
```
Input:  mergeKSorted([[1,4,5],[1,3,4],[2,6]])
Output: [1,1,2,3,4,4,5,6]

Input:  mergeKSorted([])
Output: []

Input:  mergeKSorted([[]])
Output: []
```

**Constraints**
- `0 <= k <= 10^4`
- Total elements `0 <= N <= 10^5`.
- Each element fits in a 32-bit signed integer; lists may be empty.

---

## 8. Trie (Prefix Tree)
**Pillar:** Data Structures · **Language:** Java · **Difficulty:** Intermediate

Implement a trie supporting insertion and two kinds of lookup: exact word match and prefix match.

Implement the class:
```java
class Trie {
    public Trie();
    public void insert(String word);
    public boolean search(String word);     // true only if the exact word was inserted
    public boolean startsWith(String prefix);
}
```

**Example**
```
insert("apple");
search("apple");     -> true
search("app");       -> false
startsWith("app");   -> true
insert("app");
search("app");       -> true
```

**Constraints**
- Words and prefixes consist of lowercase English letters only.
- `1 <= word.length, prefix.length <= 2000`.
- Up to `3 * 10^4` calls combined across `insert`, `search`, and `startsWith`.

---

## 9. Circular Ring Buffer
**Pillar:** Data Structures · **Language:** C# · **Difficulty:** Intermediate

Design a fixed-capacity circular queue (ring buffer). All operations must run in **O(1)** time and the structure must reuse storage without shifting elements.

Implement:
```csharp
public class RingBuffer {
    public RingBuffer(int capacity);
    public bool Enqueue(int value);   // false if full
    public bool Dequeue();            // false if empty
    public int Front();               // -1 if empty
    public int Rear();                // -1 if empty
    public bool IsEmpty();
    public bool IsFull();
}
```

**Example**
```
RingBuffer(3)
Enqueue(1);  -> true
Enqueue(2);  -> true
Enqueue(3);  -> true
Enqueue(4);  -> false   // full
Rear();      -> 3
Dequeue();   -> true
Enqueue(4);  -> true
Front();     -> 2
```

**Constraints**
- `1 <= capacity <= 10^4`
- Values fit in a 32-bit signed integer.
- No dynamic resizing — capacity is fixed at construction.

---

## 10. Binary Search Tree Iterator
**Pillar:** Data Structures · **Language:** Swift · **Difficulty:** Intermediate

Given the root of a binary search tree, implement an in-order iterator that returns the next smallest element on demand. `next()` and `hasNext()` should run in **amortized O(1)** time using **O(h)** extra space, where `h` is the tree height (do not flatten the whole tree up front).

Implement:
```swift
class BSTIterator {
    init(_ root: TreeNode?)
    func next() -> Int       // next smallest value
    func hasNext() -> Bool
}
```
where `TreeNode` has `val: Int`, `left: TreeNode?`, `right: TreeNode?`.

**Example**
```
Tree:        7
            / \
           3   15
              /  \
             9    20

hasNext() -> true
next()    -> 3
next()    -> 7
hasNext() -> true
next()    -> 9
next()    -> 15
next()    -> 20
hasNext() -> false
```

**Constraints**
- `0 <= number of nodes <= 10^5`
- Node values fit in a 32-bit signed integer.
- `next()` is only called when `hasNext()` is `true`.
