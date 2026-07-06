# Week 02 — Day 05

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 3 dataStructures

---

## 1. Robot Bounded in Circle
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
A robot starts at `(0, 0)` facing north and executes a string of instructions:
`'G'` (move forward one unit), `'L'` (turn 90° left), `'R'` (turn 90° right).
The instruction string is repeated forever. Return `True` if the robot stays
inside some bounded circle no matter how long it runs, `False` if it drifts off
to infinity. Do not simulate many repetitions — reason about the robot's position
and facing direction after exactly one pass of the instructions.

### Example
```
Input:  "GGLLGG"
Output: True     # after one pass it is back at the origin

Input:  "GG"
Output: False    # keeps walking north forever

Input:  "GL"
Output: True     # traces a square, returning every 4 passes
```

### Constraints
- `1 <= len(instructions) <= 100`.
- The string contains only `'G'`, `'L'`, `'R'`.
- Required: O(n) over a single pass of the string, O(1) extra space.

---

## 2. Next Greater Number with Same Digits
**Pillar:** logic
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
Given a positive integer `n`, return the smallest integer strictly greater than
`n` that uses exactly the same digits (same multiset). Return `-1` if no such
number exists. Work on the digit array directly (next-permutation logic): find
the rightmost digit smaller than a digit to its right, swap it with the smallest
larger digit to its right, then sort the suffix ascending.

### Example
```
Input:  n = 12
Output: 21

Input:  n = 513
Output: 531

Input:  n = 2017
Output: 2071

Input:  n = 21
Output: -1
```

### Constraints
- `1 <= n <= 10^17` — beyond `Number.MAX_SAFE_INTEGER`? No: cap is below it, but
  use `BigInt` or string digits if you prefer safety.
- Result must also fit the same digit count (no leading-zero tricks).
- Required: O(d) time with d = number of digits (excluding the suffix sort of at
  most d digits).

---

## 3. Prison Cells After N Days
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
Eight prison cells sit in a row; each is occupied (`1`) or vacant (`0`). Every
day, each of the six inner cells becomes occupied if its two neighbors are both
occupied or both vacant, otherwise it becomes vacant. The two edge cells always
become vacant (they have only one neighbor). Given the initial state and an
integer `n`, return the state after `n` days. `n` can be enormous, so brute-force
simulation of all `n` days is not acceptable — detect the cycle in the state
sequence and jump ahead with modular arithmetic.

### Example
```
Input:  cells = [0,1,0,1,1,0,0,1], n = 7
Output: [0,0,1,1,0,0,0,0]

Input:  cells = [1,0,0,1,0,0,1,0], n = 1000000000
Output: [0,0,1,1,1,1,1,0]
```

### Constraints
- `cells` has exactly 8 elements, each `0` or `1`.
- `1 <= n <= 10^9`.
- There are at most 256 distinct states, so a cycle appears within 256 steps.

---

## 4. Poker Hand Ranking
**Pillar:** logic
**Language:** C#
**Difficulty:** Intermediate

### Problem
Given two 5-card poker hands, return `1` if the first wins, `2` if the second
wins, or `0` on a tie. Each card is a two-character string: rank
`2-9, T, J, Q, K, A` plus suit `S, H, D, C`. Rank hands by the standard
categories (straight flush > four of a kind > full house > flush > straight >
three of a kind > two pair > one pair > high card), breaking ties within a
category by comparing the relevant card ranks in order. The ace plays low in
the wheel straight `A-2-3-4-5`.

### Example
```
Input:  hand1 = ["8S","8H","8D","KS","KH"]   // full house, eights over kings
        hand2 = ["AS","KS","QS","JS","9S"]   // flush, ace-high
Output: 1

Input:  hand1 = ["2S","3H","4D","5C","6S"]   // straight to the six
        hand2 = ["2H","3D","4S","5H","6C"]   // straight to the six
Output: 0
```

### Constraints
- Both hands are valid: 10 distinct cards total, correct format.
- Suits have no ordering; a flush in spades does not beat a flush in hearts.
- Encode each hand as a comparable score (category + ordered tiebreak ranks) so
  the comparison itself is a single lexicographic check.

---

## 5. Sliding Window Maximum
**Pillar:** algorithms
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Given an integer array `nums` and a window size `k`, return an array with the
maximum of each contiguous window of size `k` as it slides left to right.
The required approach is a monotonically decreasing deque of indices: evict
indices that fall out of the window at the front, and evict smaller values from
the back before pushing. Each index enters and leaves the deque at most once.

### Example
```
Input:  nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]

Input:  nums = [9,8,7], k = 1
Output: [9,8,7]
```

### Constraints
- `1 <= k <= nums.length <= 10^5`.
- `-10^4 <= nums[i] <= 10^4`.
- Required time complexity: O(n). The naive O(n·k) rescan of each window fails
  the upper bound.

---

## 6. Rotting Oranges
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
You are given an `m x n` grid where each cell is `0` (empty), `1` (fresh
orange), or `2` (rotten orange). Every minute, any fresh orange 4-directionally
adjacent to a rotten one becomes rotten. Return the number of minutes until no
fresh orange remains, or `-1` if some orange can never rot. Use multi-source
BFS: seed the queue with every initially rotten orange and expand level by
level, counting levels as minutes.

### Example
```
Input:  grid = [[2,1,1],
                [1,1,0],
                [0,1,1]]
Output: 4

Input:  grid = [[2,1,1],
                [0,1,1],
                [1,0,1]]
Output: -1   // bottom-left orange is unreachable

Input:  grid = [[0,2]]
Output: 0    // nothing fresh to rot
```

### Constraints
- `1 <= m, n <= 300`.
- A grid with no fresh oranges answers `0`, even with no rotten ones.
- Required: single BFS pass, O(m·n) time and space.

---

## 7. Partition Equal Subset Sum
**Pillar:** algorithms
**Language:** Rust
**Difficulty:** Intermediate

### Problem
Given a list of positive integers `nums`, return `true` if it can be split into
two subsets with equal sums. Reduce the problem to: does any subset sum to
`total / 2`? Solve with a 1-D dynamic programming bitset or boolean vector of
reachable sums, iterating sums downward for each number so each element is used
at most once. An odd total is an immediate `false`.

### Example
```
Input:  nums = [1, 5, 11, 5]
Output: true     // [1, 5, 5] and [11]

Input:  nums = [1, 2, 3, 5]
Output: false
```

### Constraints
- `1 <= nums.len() <= 200`.
- `1 <= nums[i] <= 100`.
- Required: O(n · S) time, O(S) space, with S = total/2. No 2-D DP table and no
  exponential recursion without memoization.

---

## 8. Design Browser History
**Pillar:** dataStructures
**Language:** Go
**Difficulty:** Intermediate

### Problem
Implement a browser history for a single tab. `NewBrowserHistory(homepage)`
starts at the homepage. `Visit(url)` navigates to `url`, destroying all forward
history. `Back(steps)` moves up to `steps` back and returns the current URL;
`Forward(steps)` moves up to `steps` forward and returns the current URL (both
clamp at the ends rather than failing). Use either a doubly linked list with a
current pointer or a slice plus current index — but `Visit` after several `Back`
calls must truncate the forward entries so they can be garbage collected.

### Example
```
h := NewBrowserHistory("leetcode.com")
h.Visit("google.com")
h.Visit("facebook.com")
h.Visit("youtube.com")
h.Back(1)      // "facebook.com"
h.Back(1)      // "google.com"
h.Forward(1)   // "facebook.com"
h.Visit("linkedin.com")
h.Forward(2)   // "linkedin.com" — forward history was destroyed
h.Back(2)      // "google.com"
h.Back(7)      // "leetcode.com" — clamped at the homepage
```

### Constraints
- `1 <= len(url) <= 20`; up to `5000` calls in total.
- `1 <= steps <= 100`.
- All three operations must run in O(min(steps, historyLength)) or better;
  `Visit` in amortized O(1).

---

## 9. Time-Based Key-Value Store
**Pillar:** dataStructures
**Language:** Python
**Difficulty:** Intermediate

### Problem
Design a key-value store where each key holds multiple values stamped with
strictly increasing timestamps. `set(key, value, timestamp)` stores the pair.
`get(key, timestamp)` returns the value whose stored timestamp is the largest
one `<= timestamp`, or `""` if none exists. Because timestamps arrive in
increasing order per key, keep an append-only list per key and answer `get`
with binary search (rightmost entry not exceeding the query timestamp).

### Example
```
tm = TimeMap()
tm.set("foo", "bar", 1)
tm.get("foo", 1)   # "bar"
tm.get("foo", 3)   # "bar"  (latest timestamp <= 3 is 1)
tm.set("foo", "bar2", 4)
tm.get("foo", 4)   # "bar2"
tm.get("foo", 5)   # "bar2"
tm.get("bar", 5)   # ""     (unknown key)
```

### Constraints
- `1 <= len(key), len(value) <= 100`; lowercase letters and digits.
- `1 <= timestamp <= 10^7`; timestamps passed to `set` for one key strictly increase.
- Up to `2 * 10^5` total calls. Required: `set` O(1) amortized, `get` O(log n)
  per call — a linear scan per `get` is too slow.

---

## 10. Design Hit Counter
**Pillar:** dataStructures
**Language:** C++
**Difficulty:** Intermediate

### Problem
Implement a hit counter that reports how many hits occurred in the past 300
seconds. `hit(timestamp)` records a hit; `getHits(timestamp)` returns the count
of hits in `[timestamp - 299, timestamp]`. Timestamps are monotonically
non-decreasing across calls, and several hits may share one timestamp. Memory
must stay bounded by the window, not by total hits: use a circular pair of
fixed-size arrays (`times[300]`, `counts[300]`) where each bucket is reset when
its slot is reused by a newer timestamp.

### Example
```
HitCounter counter;
counter.hit(1);
counter.hit(2);
counter.hit(3);
counter.getHits(4);    // 3
counter.hit(300);
counter.getHits(300);  // 4
counter.getHits(301);  // 3   (the hit at t=1 fell out of the window)
```

### Constraints
- `1 <= timestamp <= 2 * 10^9`, non-decreasing across all calls.
- Up to `10^5` calls in total.
- Required: O(1) time per `hit`, O(300) worst case per `getHits`, O(300) space
  regardless of hit volume. An unbounded queue of every hit is not acceptable.
