# Week 03 — Day 06

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 3 dataStructures

---

## 1. Text Justification
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
Given a list of words and a line width `maxWidth`, format the text so that each
line has exactly `maxWidth` characters and is fully justified. Pack as many
words as fit per line (greedy). Distribute extra spaces as evenly as possible
between words; when spaces don't divide evenly, the leftmost gaps get more.
The last line, and any line containing a single word, is left-justified with
trailing spaces.

### Example
```
Input:  words = ["This", "is", "an", "example", "of", "text", "justification."]
        maxWidth = 16
Output: ["This    is    an",
         "example  of text",
         "justification.  "]
```

### Constraints
- `1 <= len(words) <= 300`, `1 <= len(words[i]) <= maxWidth <= 100`.
- No word exceeds `maxWidth`; words contain no spaces.
- Every output line must have length exactly `maxWidth` — verify with an
  assertion before returning.
- The exercise is the gap math: `gaps = words_in_line - 1`, base spaces
  `total // gaps`, and the first `total % gaps` gaps get one extra.

---

## 2. Dota2 Senate
**Pillar:** logic
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
A senate has two parties, Radiant (`R`) and Dire (`D`), given as a string in
voting order. Each round, every surviving senator in order may ban one opposing
senator's rights permanently. Senators act optimally: each bans the *next*
opposing senator who would otherwise act. Rounds repeat with survivors keeping
their original relative order until only one party remains. Return
`"Radiant"` or `"Dire"`.

### Example
```
Input:  senate = "RD"
Output: "Radiant"      // R bans D immediately

Input:  senate = "RDD"
Output: "Dire"         // R bans first D, second D bans R
```

### Constraints
- `1 <= senate.length <= 10^4`.
- Target `O(n)` using two queues of indices: pop the front of each, the
  smaller index survives and re-enqueues at `index + n` for the next round.
- Simulating round-by-round with array splices is `O(n^2)` — acceptable only
  as a first draft; the queue version is the goal.

---

## 3. Robot Bounded in Circle
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
A robot starts at `(0, 0)` facing north and executes a command string forever
in a loop: `G` moves one unit forward, `L` turns 90° left, `R` turns 90°
right. Return `true` if there exists a circle such that the robot never leaves
it, `false` otherwise.

### Example
```
Input:  instructions = "GGLLGG"
Output: true           // ends at (0,0) facing south — loops in place

Input:  instructions = "GG"
Output: false          // walks north forever

Input:  instructions = "GL"
Output: true           // traces a 4-cycle square
```

### Constraints
- `1 <= len(instructions) <= 100`.
- Key insight to prove in a comment: after one pass, the robot is bounded iff
  it returned to the origin OR its facing direction changed. Run at most one
  pass — no simulation of 4 loops.
- Represent direction as an `(dx, dy)` vector and rotate with integer swaps,
  not floating-point trig.

---

## 4. Push Dominoes
**Pillar:** logic
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
A row of dominoes is given as a string: `L` pushed left, `R` pushed right,
`.` standing. Each second, falling dominoes push their standing neighbor in
the same direction. A standing domino pushed from both sides simultaneously
stays standing. Forces from a single push don't pass through a fallen domino.
Return the final state.

### Example
```
Input:  dominoes = ".L.R...LR..L.."
Output: "LL.RR.LLRRLL.."

Input:  dominoes = "RR.L"
Output: "RR.L"        // the middle domino is balanced
```

### Constraints
- `1 <= dominoes.length <= 10^5` — per-second simulation will pass but the
  target is a single `O(n)` sweep.
- Approach to aim for: for each run of `.` between force characters, decide by
  the pair `(left force, right force)`: `R...L` splits toward the middle (odd
  length leaves the center standing), `L...R` stays, `R...R` / `L...L` all
  fall one way. Treat the virtual boundaries as `L` on the left and `R` on
  the right so edge runs of `.` stay standing; test `"..R.."` and `"..L.."`
  to confirm your sentinel handling.

---

## 5. Koko Eating Bananas
**Pillar:** algorithms
**Language:** Rust
**Difficulty:** Intermediate

### Problem
Koko has `piles[i]` bananas in pile `i` and `h` hours. Each hour she picks one
pile and eats up to `k` bananas from it (a pile with fewer than `k` takes the
whole hour anyway). Return the minimum integer `k` such that she finishes all
piles within `h` hours.

### Example
```
Input:  piles = [3, 6, 7, 11], h = 8
Output: 4

Input:  piles = [30, 11, 23, 4, 20], h = 5
Output: 30
```

### Constraints
- `1 <= piles.len() <= 10^4`, `piles.len() <= h <= 10^9`,
  `1 <= piles[i] <= 10^9`.
- This is binary search on the answer space `[1, max(piles)]`, not on the
  array. Hours for a given `k` is `sum(ceil(pile / k))` — use integer
  ceiling `(pile + k - 1) / k` and watch for `u64` overflow in the sum.
- Target `O(n log max(piles))`.

---

## 6. Course Schedule II
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
There are `numCourses` courses labeled `0..numCourses-1` and a list of
prerequisite pairs `[a, b]` meaning course `b` must be taken before course
`a`. Return any valid order in which all courses can be taken, or an empty
array if none exists (the prerequisites contain a cycle).

### Example
```
Input:  numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0, 1, 2, 3]   // or [0, 2, 1, 3] — any valid topological order

Input:  numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: []
```

### Constraints
- `1 <= numCourses <= 2000`, `0 <= prerequisites.length <= numCourses * (numCourses - 1)`.
- Implement Kahn's algorithm (BFS with in-degree counts). Cycle detection
  falls out for free: if the output has fewer than `numCourses` entries,
  return an empty array.
- Build the adjacency list once; target `O(V + E)` time and space.

---

## 7. House Robber II
**Pillar:** algorithms
**Language:** C#
**Difficulty:** Intermediate

### Problem
Houses are arranged in a circle; `nums[i]` is the money in house `i`. You
cannot rob two adjacent houses, and because the street is circular, the first
and last houses are also adjacent. Return the maximum amount you can rob.

### Example
```
Input:  nums = [2, 3, 2]
Output: 3              // houses 0 and 2 are adjacent — can't take both 2s

Input:  nums = [1, 2, 3, 1]
Output: 4              // rob houses 0 and 2
```

### Constraints
- `1 <= nums.Length <= 100`, `0 <= nums[i] <= 1000`.
- Reduce to the linear House Robber problem twice: rob `nums[0..n-2]` or
  `nums[1..n-1]`, take the max. Handle `n == 1` explicitly.
- The linear pass must be `O(n)` time, `O(1)` space (two rolling variables,
  no DP array).

---

## 8. Time-Based Key-Value Store
**Pillar:** dataStructures
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Design a class `TimeMap` with:
- `set(key, value, timestamp)` — stores the value for the key at the given
  timestamp.
- `get(key, timestamp)` — returns the value whose timestamp is the largest
  `<= timestamp`; returns `""` if none exists.

All timestamps passed to `set` for a given key are strictly increasing.

### Example
```
set("foo", "bar", 1)
get("foo", 1)   -> "bar"
get("foo", 3)   -> "bar"   // latest set at or before t=3 was t=1
set("foo", "baz", 4)
get("foo", 4)   -> "baz"
get("foo", 2)   -> "bar"
get("bar", 1)   -> ""
```

### Constraints
- Up to `2 * 10^5` total calls; `1 <= timestamp <= 10^7`.
- Store per-key arrays of `[timestamp, value]` (already sorted because sets
  are increasing) and binary-search in `get` for the rightmost timestamp
  `<= t`. Target `O(1)` amortized `set`, `O(log n)` `get`.
- Write the binary search by hand — no linear scan, no library `findLast`.

---

## 9. Kth Largest Element in a Stream
**Pillar:** dataStructures
**Language:** Python
**Difficulty:** Intermediate

### Problem
Design a class `KthLargest` initialized with an integer `k` and an initial
array `nums`. The method `add(val)` appends `val` to the stream and returns
the k-th largest element seen so far.

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
- `1 <= k <= 10^4`, `0 <= len(nums) <= 10^4`, up to `10^4` calls to `add`;
  it is guaranteed at least `k` elements exist whenever `add` is called.
- Keep a min-heap of size exactly `k` (`heapq`): the root is the answer.
  Push, then pop if the heap exceeds `k`. Target `O(log k)` per `add`.
- Explain in one comment why a min-heap (not max-heap) of size `k` is the
  right structure.

---

## 10. Flatten Nested List Iterator
**Pillar:** dataStructures
**Language:** C++
**Difficulty:** Intermediate

### Problem
You are given a nested list of integers: each element is either an integer or
a list whose elements may themselves be integers or lists. Implement an
iterator with `next()` returning the next integer in depth-first order and
`hasNext()` returning whether any integers remain. Define your own
`NestedInteger` interface (`isInteger()`, `getInteger()`, `getList()`).

### Example
```
Input:  [[1, 1], 2, [1, 1]]
Output: next/hasNext sequence yields 1, 1, 2, 1, 1

Input:  [1, [4, [6]]]
Output: yields 1, 4, 6
```

### Constraints
- Total integers `<= 10^5`, nesting depth `<= 50`.
- Do NOT pre-flatten in the constructor — the point is lazy iteration. Keep a
  stack of `(list pointer, index)` frames (or reversed elements) and unwind
  lists in `hasNext()` until an integer sits on top.
- `hasNext()` must be idempotent: calling it twice in a row without `next()`
  cannot skip or consume elements. Empty inner lists like `[[], 1]` must be
  skipped correctly — test that case.
