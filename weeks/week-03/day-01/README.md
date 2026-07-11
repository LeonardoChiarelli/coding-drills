# Week 03 — Day 01

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 2 dataStructures · 1 architecture (Friday challenge)

---

## 1. Decode String
**Pillar:** logic
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Given an encoded string where the pattern `k[inner]` means the string `inner`
is repeated exactly `k` times, return the fully decoded string. Patterns may be
nested to any depth (e.g. `3[a2[c]]`). `k` is always a positive integer and the
input is always well-formed: brackets are balanced and digits only appear as
repeat counts.

### Example
```
Input:  "3[a]2[bc]"
Output: "aaabcbc"

Input:  "3[a2[c]]"
Output: "accaccacc"

Input:  "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
```

### Constraints
- `1 <= s.length <= 30` and the decoded output has at most 100,000 characters.
- `1 <= k <= 300`.
- Do it in a single left-to-right pass using an explicit stack; no regex, no
  recursion required (recursion accepted if depth-safe).

---

## 2. Day of Week (Zeller's Congruence)
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
Given a Gregorian calendar date as three integers `day`, `month`, `year`,
return the day of the week as a string (`"Monday"` … `"Sunday"`). You must
compute it arithmetically — implement Zeller's congruence (or derive an
equivalent formula yourself, e.g. via known anchor days). Remember the
Gregorian leap-year rule: divisible by 4, except centuries, unless divisible
by 400.

### Example
```
Input:  day=10, month=7, year=2026
Output: "Friday"

Input:  day=29, month=2, year=2000
Output: "Tuesday"

Input:  day=1, month=1, year=1900
Output: "Monday"
```

### Constraints
- `1583 <= year <= 9999`; the date is always valid.
- Forbidden: `datetime`, `calendar`, `time` or any date library. Pure integer
  arithmetic only.
- Watch the January/February shift in Zeller's formula (they count as months
  13 and 14 of the previous year).

---

## 3. String to Integer (atoi)
**Pillar:** logic
**Language:** Rust
**Difficulty:** Intermediate

### Problem
Implement `my_atoi(s: &str) -> i32` following these rules, in order:
1. Skip leading ASCII whitespace.
2. An optional single `+` or `-` determines the sign.
3. Read digits until the first non-digit; the digits read so far are the number.
4. If no digits were read, return `0`.
5. Clamp the result to the `i32` range `[-2147483648, 2147483647]`.

Do not use `str::parse` or any built-in string-to-number conversion; detect
overflow yourself before it happens (no `i64` widening).

### Example
```
Input:  "   -42"
Output: -42

Input:  "4193 with words"
Output: 4193

Input:  "-91283472332"
Output: -2147483648   (clamped)

Input:  "words and 987"
Output: 0
```

### Constraints
- `0 <= s.len() <= 200`; arbitrary printable ASCII plus whitespace.
- Overflow must be detected with `i32` arithmetic only (checked ops or the
  classic `acc > (MAX - digit) / 10` guard).

---

## 4. Total Area Covered by Two Rectangles
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
Given two axis-aligned rectangles, each described by its bottom-left corner
`(ax1, ay1)` and top-right corner `(ax2, ay2)` (and likewise `b*` for the
second), return the total area covered by the union of the two rectangles.
Overlapping area must be counted only once. The core of the problem is
computing the intersection width/height correctly when the rectangles touch,
partially overlap, fully contain each other, or are disjoint.

### Example
```
Input:  A = (-3, 0, 3, 4),  B = (0, -1, 9, 2)
Output: 45     (24 + 27 - 6 overlap)

Input:  A = (-2, -2, 2, 2), B = (-2, -2, 2, 2)
Output: 16     (identical rectangles)

Input:  A = (0, 0, 1, 1),   B = (1, 0, 2, 1)
Output: 2      (they only share an edge: overlap area 0)
```

### Constraints
- `-10^4 <= all coordinates <= 10^4`; `x1 < x2`, `y1 < y2` for both rectangles.
- Use 64-bit arithmetic for intermediate products.
- O(1) time; no sweep line, no geometry library.

---

## 5. Koko Eating Bananas (Binary Search on the Answer)
**Pillar:** algorithms
**Language:** C#
**Difficulty:** Intermediate

### Problem
There are `n` piles of bananas, `piles[i]` bananas in the i-th pile. Koko can
eat at speed `k` bananas per hour: each hour she picks one pile and eats `k`
bananas from it (if the pile has fewer than `k`, she finishes it and stops for
that hour). Given `h` hours (`h >= n`), return the minimum integer speed `k`
such that she can finish all piles within `h` hours. The intended technique is
binary search over the answer space, not over the array.

### Example
```
Input:  piles = [3, 6, 7, 11], h = 8
Output: 4

Input:  piles = [30, 11, 23, 4, 20], h = 5
Output: 30

Input:  piles = [30, 11, 23, 4, 20], h = 6
Output: 23
```

### Constraints
- `1 <= piles.Length <= 10^4`; `1 <= piles[i] <= 10^9`; `piles.Length <= h <= 10^9`.
- Target complexity: O(n log max(piles)).
- Hours needed at speed k is `sum(ceil(pile / k))` — compute the ceiling with
  integer math, beware overflow (use `long`).

---

## 6. Longest Common Subsequence
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
Given two strings `text1` and `text2`, return the length of their longest
common subsequence — the longest sequence of characters that appears in both
strings in the same relative order (not necessarily contiguous). Return `0` if
there is none. Implement bottom-up dynamic programming; as a stretch goal,
reduce memory to two rows.

### Example
```
Input:  text1 = "abcde", text2 = "ace"
Output: 3        ("ace")

Input:  text1 = "abc", text2 = "def"
Output: 0

Input:  text1 = "abcba", text2 = "abcbcba"
Output: 5        ("abcba")
```

### Constraints
- `1 <= text1.length(), text2.length() <= 1000`; lowercase English letters.
- O(n·m) time. Full marks: O(min(n, m)) extra space.
- No memoized recursion — iterative table required.

---

## 7. Pacific Atlantic Water Flow
**Pillar:** algorithms
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
You are given an `m x n` matrix `heights` of a continent. The Pacific ocean
touches the top and left edges; the Atlantic touches the bottom and right
edges. Rain water can flow from a cell to a 4-directionally adjacent cell whose
height is **less than or equal** to the current cell's height. Return the list
of coordinates `[r, c]` from which water can reach **both** oceans. The
intended approach is to search *inward from each ocean* (multi-source BFS or
DFS from the borders, moving to cells of equal or greater height) and intersect
the two reachable sets — not to simulate flow from every cell.

### Example
```
Input:  heights = [[1,2,2,3,5],
                   [3,2,3,4,4],
                   [2,4,5,3,1],
                   [6,7,1,4,5],
                   [5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]  (any order)

Input:  heights = [[1]]
Output: [[0,0]]
```

### Constraints
- `1 <= m, n <= 200`; `0 <= heights[r][c] <= 10^5`.
- O(m·n) time. A per-cell DFS without memoization (O((m·n)^2)) does not pass.
- Output order is free; each coordinate appears once.

---

## 8. Kth Largest Element in a Stream
**Pillar:** dataStructures
**Language:** Kotlin
**Difficulty:** Intermediate

### Problem
Design a class `KthLargest` that tracks the k-th largest element in a stream:
- `KthLargest(k: Int, nums: IntArray)` — initialize with `k` and initial values.
- `add(val: Int): Int` — append `val` to the stream and return the current k-th
  largest element.

The intended structure is a min-heap capped at size `k`: the heap root is
always the answer. Implement the heap usage yourself (using the standard
library `PriorityQueue` is allowed; re-sorting a list on every `add` is not).

### Example
```
KthLargest(3, [4, 5, 8, 2])
add(3)  -> 4
add(5)  -> 5
add(10) -> 5
add(9)  -> 8
add(4)  -> 8
```

### Constraints
- `1 <= k <= 10^4`; `0 <= nums.size <= 10^4`; up to `10^4` calls to `add`.
- `-10^4 <= values <= 10^4`; it is guaranteed there are at least `k` elements
  in the stream whenever `add` is called.
- `add` must run in O(log k); heap never grows beyond `k` elements.

---

## 9. Design a Leaderboard
**Pillar:** dataStructures
**Language:** C++
**Difficulty:** Intermediate

### Problem
Design a `Leaderboard` class with three operations:
- `addScore(playerId, score)` — add `score` to the player's total (create the
  player with that score if absent).
- `top(K)` — return the sum of the top `K` players' total scores.
- `reset(playerId)` — reset that player's score to 0 (player is guaranteed to
  exist).

Choose data structures deliberately and state the complexity of each operation
in a comment: a hash map alone makes `top(K)` O(n log n); pairing it with an
ordered multiset (`std::multiset`) or a heap changes the trade-offs. Any
solution is accepted if you can justify its complexities.

### Example
```
addScore(1, 73); addScore(2, 56); addScore(3, 39); addScore(4, 51); addScore(5, 4)
top(1)      -> 73
reset(1); reset(2)
addScore(2, 51); addScore(3, 86)
top(3)      -> 227    (totals now {1:0, 2:51, 3:125, 4:51, 5:4}; 125 + 51 + 51)
```

### Constraints
- `1 <= playerId, K <= 10^4`; `1 <= score <= 100`; up to `1000` total calls.
- `K` never exceeds the current number of players.
- Document time complexity of all three methods; `top(K)` better than
  O(n log n) earns full marks.

---

## 10. Architecture Challenge: In-Process Job Scheduler with Retries and Backoff
**Pillar:** architecture
**Language:** Go
**Difficulty:** Intermediate

### Problem
Design and implement an in-process job scheduler library. Requirements:

1. **Submission** — `Submit(job)` accepts a job with: an id, a priority
   (`high | normal | low`), a function to execute, a max attempt count, and an
   optional not-before timestamp (delayed jobs).
2. **Ordering** — ready jobs run highest-priority first; within the same
   priority, FIFO by submission time.
3. **Concurrency** — the scheduler runs jobs on a fixed-size worker pool
   (configurable `N`); no job is ever executed by two workers at once.
4. **Retries** — a job that returns an error is retried up to its max attempts,
   with exponential backoff (`base * 2^attempt`, capped) between attempts.
   Exhausted jobs move to a dead-letter list, queryable via `DeadLetters()`.
5. **Shutdown** — `Shutdown(ctx)` stops accepting new jobs, lets in-flight
   jobs finish (or aborts them when `ctx` is done), and returns.
6. **Introspection** — `Stats()` returns counts: pending, running, succeeded,
   failed, dead.

Deliverables in the README of your solution folder (or file header comment):
a short description of the data structures chosen for the ready queue and the
delayed set, the locking model (what a single mutex protects vs. what channels
handle), and how you tested the backoff logic without real sleeps (hint:
injectable clock).

### Example
```
s := New(Config{Workers: 4, BackoffBase: 100 * time.Millisecond})
s.Submit(Job{ID: "a", Priority: High,   Fn: flaky, MaxAttempts: 3})
s.Submit(Job{ID: "b", Priority: Normal, Fn: ok,    MaxAttempts: 1})
// "a" fails twice then succeeds on attempt 3 → succeeded
// "b" runs once → succeeded
s.Stats() // {Pending: 0, Running: 0, Succeeded: 2, Failed: 0, Dead: 0}
```

### Constraints
- Standard library only (`container/heap`, `sync`, `time`, `context`).
- No busy-waiting: delayed/backoff jobs must wake via timer, not polling loops.
- Race-free under `go test -race`; assume job functions may panic — a panic
  counts as a failed attempt, not a scheduler crash.
