# Week 03 — Day 05

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 3 dataStructures

---

## 1. Diagonal Traverse
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
Given an `m x n` matrix, return all of its elements in diagonal zigzag order:
start at the top-left, move up-right along a diagonal until you hit an edge,
then switch to the next diagonal moving down-left, alternating direction for
every diagonal until every element has been visited.

### Example
```
Input:  mat = [[1, 2, 3],
               [4, 5, 6],
               [7, 8, 9]]
Output: [1, 2, 4, 7, 5, 3, 6, 8, 9]

Input:  mat = [[1, 2],
               [3, 4]]
Output: [1, 2, 3, 4]
```

### Constraints
- `1 <= m, n <= 10^4` and `1 <= m * n <= 10^4`; values fit in `int`.
- All cells on the same diagonal share the same `row + col` sum — you can
  either group by that key or walk with explicit direction flips. Either way,
  the edge handling is the exercise: hitting the top edge, right edge, bottom
  edge, and left edge each redirect differently, and corners combine two rules.
- Aim for `O(m * n)` time and `O(1)` extra space beyond the output list
  (grouping by diagonal key costs `O(m * n)` extra — acceptable, but state the
  trade-off in a comment).

---

## 2. Candy Crush — One Pass
**Pillar:** logic
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Given a 2D board of integers where `board[i][j]` is a candy type and `0` is an
empty cell, repeatedly do the following until the board is stable: mark every
cell that is part of a horizontal or vertical run of three or more candies of
the same type, crush all marked cells simultaneously (set them to 0), then let
gravity pull the remaining candies in each column straight down. Return the
stable board.

### Example
```
Input:  board = [[110, 5, 112, 113, 114],
                 [210, 211, 5, 213, 214],
                 [310, 311, 3, 313, 314],
                 [410, 411, 412, 5, 414],
                 [5, 1, 512, 3, 3],
                 [610, 4, 1, 613, 614],
                 [710, 1, 2, 713, 714],
                 [810, 1, 2, 1, 1],
                 [1, 1, 2, 2, 2],
                 [4, 1, 4, 4, 1014]]
Output: [[0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
         [110, 0, 0, 0, 114],
         [210, 0, 0, 0, 214],
         [310, 0, 0, 113, 314],
         [410, 0, 0, 213, 414],
         [610, 211, 112, 313, 614],
         [710, 311, 412, 613, 714],
         [810, 411, 512, 713, 1014]]
```

### Constraints
- `3 <= rows, cols <= 50`; candy types are positive integers.
- Marking must be simultaneous: use the sign bit (negate matched cells) or a
  separate boolean grid so that a cell counted in a horizontal run can still
  anchor a vertical run in the same sweep.
- Gravity is per column: write a two-pointer compaction from the bottom of
  each column, then zero-fill the top. No sorting.
- Loop sweep → crush → gravity until a sweep marks nothing.

---

## 3. Valid Parenthesis String
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
A string contains only `(`, `)` and `*`, where `*` can stand for a single `(`,
a single `)`, or the empty string. Decide whether the string can be interpreted
as a valid balanced parenthesis sequence.

### Example
```
Input:  s = "()"
Output: true

Input:  s = "(*))"
Output: true      // interpret * as "(" giving "(())", which is balanced

Input:  s = "))("
Output: false
```

### Constraints
- `1 <= len(s) <= 3000`.
- The intended solution is `O(n)` time, `O(1)` space: track the *range*
  `[lo, hi]` of possible open-bracket counts while scanning (`*` widens the
  range in both directions; clamp `lo` at 0; fail early when `hi < 0`).
- A backtracking solution is rejected by the constraints — state in a comment
  why the greedy range argument is sound (why clamping `lo` at 0 never loses a
  valid interpretation).

---

## 4. Verifying an Alien Dictionary
**Pillar:** logic
**Language:** Rust
**Difficulty:** Intermediate

### Problem
An alien language uses the lowercase English alphabet but in a different
letter order, given as a 26-character string `order`. Given a list of `words`,
return `true` if the words are sorted lexicographically according to that
alien order, `false` otherwise.

### Example
```
Input:  words = ["hello", "leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true

Input:  words = ["word", "world", "row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false     // "word" > "world" is fine, but "world" > "row" violates order

Input:  words = ["apple", "app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false     // "apple" is longer than its prefix "app" but comes first
```

### Constraints
- `1 <= words.len() <= 100`, `1 <= word.len() <= 20`.
- Build a `[usize; 26]` rank table from `order` once, then compare adjacent
  pairs only — comparing every pair is `O(n^2)` and unnecessary.
- The prefix case is the trap: if word A is a strict prefix of word B, A must
  come first; if B's prefix equals all of A but A comes second, it is invalid
  even though no character comparison ever differs.
- No allocation per comparison: compare byte slices directly.

---

## 5. Meeting Rooms II
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
Given an array of meeting time intervals `[start, end)` (half-open), return
the minimum number of conference rooms required so that no two meetings in the
same room overlap.

### Example
```
Input:  intervals = [[0, 30], [5, 10], [15, 20]]
Output: 2

Input:  intervals = [[7, 10], [2, 4]]
Output: 1

Input:  intervals = [[1, 5], [5, 9], [9, 12]]
Output: 1         // half-open: a meeting may start exactly when another ends
```

### Constraints
- `1 <= intervals.length <= 10^5`; `0 <= start < end <= 10^6`.
- Two accepted approaches — implement one and name the other in a comment:
  (a) sort by start, keep a min-heap of active meeting end times, reuse a room
  when the earliest end is `<=` the next start; (b) sweep line: sort start
  events and end events separately, walk both with two pointers counting
  concurrent meetings.
- `O(n log n)` time required. Mind the tie rule: `end == start` frees the room
  first (half-open intervals).

---

## 6. Minimum Path Sum
**Pillar:** algorithms
**Language:** C++
**Difficulty:** Intermediate

### Problem
Given an `m x n` grid of non-negative integers, find a path from the top-left
cell to the bottom-right cell that minimizes the sum of the values along the
path. You may only move right or down. Return the minimum sum.

### Example
```
Input:  grid = [[1, 3, 1],
                [1, 5, 1],
                [4, 2, 1]]
Output: 7         // path 1 → 3 → 1 → 1 → 1

Input:  grid = [[1, 2, 3],
                [4, 5, 6]]
Output: 12        // path 1 → 2 → 3 → 6
```

### Constraints
- `1 <= m, n <= 200`; `0 <= grid[i][j] <= 200`.
- Dynamic programming: `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`,
  with first row/column as running prefix sums.
- Required space optimization: keep a single row (`O(n)` extra space), not the
  full `m x n` table. In-place mutation of the input grid also accepted — if
  you choose it, say so in a comment (mutating inputs is a real API smell).
- No recursion without memoization; the plain recursive tree is exponential.

---

## 7. Longest Consecutive Sequence
**Pillar:** algorithms
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
Given an unsorted array of integers, return the length of the longest run of
consecutive integer values (values that can be arranged as `k, k+1, ..., k+m`).
The elements' positions in the array do not matter, and duplicates do not
extend a run.

### Example
```
Input:  nums = [100, 4, 200, 1, 3, 2]
Output: 4         // the run 1, 2, 3, 4

Input:  nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9         // 0 through 8

Input:  nums = []
Output: 0
```

### Constraints
- `0 <= nums.length <= 10^5`; values span the full 32-bit range.
- Required complexity is `O(n)` average time — sorting (`O(n log n)`) is the
  obvious fallback and is not accepted.
- The trick: put everything in a `Set`; only start counting from values `v`
  where `v - 1` is absent (run starts), then walk forward. Explain in a
  comment why this is `O(n)` overall even though there is a nested loop.

---

## 8. Design File System
**Pillar:** dataStructures
**Language:** C#
**Difficulty:** Intermediate

### Problem
Implement a `FileSystem` class that manages string paths with integer values:
- `bool CreatePath(string path, int value)` — creates the path and associates
  the value. Returns `false` (without creating) if the path already exists or
  if its parent path does not exist.
- `int Get(string path)` — returns the value associated with the path, or `-1`
  if the path does not exist.

Paths look like `"/a"`, `"/a/b"`, `"/a/b/c"`: one or more components of
lowercase letters separated by `/`, always starting with `/`.

### Example
```
FileSystem fs = new FileSystem();
fs.CreatePath("/a", 1);      // true
fs.Get("/a");                // 1
fs.CreatePath("/a/b", 2);    // true
fs.CreatePath("/c/d", 3);    // false — parent "/c" doesn't exist
fs.Get("/c");                // -1
fs.CreatePath("/a", 5);      // false — already exists
```

### Constraints
- Up to `10^4` operations; path length `<= 100`.
- Two valid designs — pick one and justify in a comment: (a) a trie keyed by
  path component, where `CreatePath` walks to the parent node; (b) a flat
  `Dictionary<string, int>` where the parent check is a substring lookup of
  the path up to the last `/`.
- `CreatePath("/", v)` and empty paths are invalid inputs — reject them.
- No filesystem APIs; this is purely an in-memory structure.

---

## 9. Stock Price Fluctuation
**Pillar:** dataStructures
**Language:** Kotlin
**Difficulty:** Intermediate

### Problem
A stream delivers `(timestamp, price)` records for a single stock, possibly
out of order, and a record with an already-seen timestamp *corrects* the
earlier price. Implement `StockPrice` with:
- `update(timestamp, price)` — record or correct the price at a timestamp.
- `current()` — price at the latest timestamp seen so far.
- `maximum()` — highest price currently on record (after corrections).
- `minimum()` — lowest price currently on record (after corrections).

### Example
```
val sp = StockPrice()
sp.update(1, 10); sp.update(2, 5)
sp.current()      // 5   (latest timestamp is 2)
sp.maximum()      // 10
sp.update(1, 3)   // correction: timestamp 1 is now 3, price 10 no longer exists
sp.maximum()      // 5
sp.update(4, 2)
sp.minimum()      // 2
```

### Constraints
- Up to `10^5` calls; timestamps and prices are positive ints.
- The correction is the crux: a plain heap holds stale prices after `update`
  overwrites a timestamp. Either use a sorted multiset (`TreeMap<Int, Int>`
  price → count) for exact removal, or use lazy deletion — heaps of
  `(price, timestamp)` pairs, popping entries whose price no longer matches
  the authoritative `HashMap<Int, Int>` timestamp → price.
- All four operations amortized `O(log n)` or better. State in a comment which
  strategy you chose and its worst-case cost.

---

## 10. Design Snake Game
**Pillar:** dataStructures
**Language:** Ruby
**Difficulty:** Intermediate

### Problem
Implement the classic snake game on a `width x height` grid. The snake starts
at cell `(0, 0)` with length 1. A list of food positions is eaten in order —
the next food appears only after the previous one is eaten. Implement:
- `SnakeGame.new(width, height, food)` — initialize.
- `move(direction)` — direction is `"U"`, `"D"`, `"L"`, or `"R"`. Returns the
  score (number of foods eaten) after the move, or `-1` if the snake dies by
  hitting a wall or its own body. Eating food grows the snake by 1.

### Example
```
game = SnakeGame.new(3, 2, [[1, 2], [0, 1]])
game.move("R")   # 0
game.move("D")   # 0
game.move("R")   # 1   — eats food at (1, 2), snake grows
game.move("U")   # 1
game.move("L")   # 2   — eats food at (0, 1)
game.move("U")   # -1  — hits the wall
```

### Constraints
- `1 <= width, height <= 10^4`; up to `10^4` moves; food positions are given
  as `[row, col]` and never spawn on the snake.
- Required per-move cost: `O(1)`. Use a deque (Ruby `Array` with
  `push`/`shift` is acceptable; note its real cost) for the body order plus a
  `Set` of occupied cells for the self-collision test.
- The classic trap: the tail vacates its cell in the same tick the head moves,
  so moving into the current tail cell is legal *unless* the snake just ate
  and the tail stays. Remove the tail from the occupied set *before* checking
  the head collision, and re-add it when food is eaten.
- Death is sticky: after returning `-1` once, every later `move` returns `-1`.
