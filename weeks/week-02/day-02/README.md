# Week 02 — Day 02

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 2 dataStructures · 1 architecture (Friday challenge)

---

## 1. Look-and-Say Sequence
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
Generate the `n`-th term of the look-and-say sequence. The sequence starts at `"1"`,
and each subsequent term is produced by reading the previous term aloud: group
consecutive identical digits, then emit the count followed by the digit. For example,
`"1"` is read as "one 1" → `"11"`, which is read as "two 1s" → `"21"`.

### Example
```
Input:  n = 1
Output: "1"

Input:  n = 5
Output: "111221"
```

### Constraints
- `1 <= n <= 30`.
- Term 1 is `"1"`.
- Output is returned as a string of digits.

---

## 2. Excel Column Title
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
Given a positive integer, return its corresponding column title as it appears in a
spreadsheet. Column 1 is `A`, column 26 is `Z`, column 27 is `AA`, and so on. This is
a bijective base-26 numbering system (there is no digit zero).

### Example
```
Input:  1
Output: "A"

Input:  28
Output: "AB"

Input:  701
Output: "ZY"
```

### Constraints
- `1 <= n <= 2_147_483_647`.
- Output uses only uppercase letters `A`–`Z`.

---

## 3. Valid Sudoku Board
**Pillar:** logic
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Given a `9 x 9` Sudoku board, determine whether the currently filled cells are valid.
A board is valid when no row, no column, and no `3 x 3` sub-box contains a repeated
digit `1`–`9`. Empty cells are marked `.` and are ignored. You only validate the
current state; the board need not be solvable.

### Example
```
Input:  a board where the top-left 3x3 box contains two 8s
Output: false

Input:  a partially filled board with no row/col/box conflicts
Output: true
```

### Constraints
- The board is always `9 x 9`.
- Each cell is a digit `'1'`–`'9'` or `'.'`.
- Only filled cells are checked.

---

## 4. Gray Code Generator
**Pillar:** logic
**Language:** Rust
**Difficulty:** Intermediate

### Problem
Given a number of bits `n`, return the `n`-bit reflected binary Gray code as a
sequence of integers. The sequence must start at `0`, contain all `2^n` values
exactly once, and every pair of adjacent values (including the wrap from last to
first) must differ in exactly one bit.

### Example
```
Input:  n = 2
Output: [0, 1, 3, 2]

Input:  n = 1
Output: [0, 1]
```

### Constraints
- `0 <= n <= 16`.
- For `n = 0`, return `[0]`.
- Any valid Gray code ordering starting at `0` is accepted.

---

## 5. Coin Change (Minimum Coins)
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
Given a list of coin denominations and a target amount, return the minimum number of
coins needed to make exactly that amount. Each denomination may be used an unlimited
number of times. If the amount cannot be formed, return `-1`.

### Example
```
Input:  coins = [1, 2, 5], amount = 11
Output: 3            # 5 + 5 + 1

Input:  coins = [2], amount = 3
Output: -1
```

### Constraints
- `1 <= coins.length <= 12`.
- `1 <= coins[i] <= 2^31 - 1`.
- `0 <= amount <= 10_000` (amount `0` needs `0` coins).

---

## 6. Topological Sort of a DAG
**Pillar:** algorithms
**Language:** C++
**Difficulty:** Intermediate

### Problem
Given a directed acyclic graph described by `n` nodes (`0`-indexed) and a list of
directed edges `[u, v]` meaning `u` must come before `v`, return any valid
topological ordering of all nodes. If the graph contains a cycle, return an empty
list.

### Example
```
Input:  n = 4, edges = [[0,1], [1,2], [0,2], [2,3]]
Output: [0, 1, 2, 3]

Input:  n = 2, edges = [[0,1], [1,0]]
Output: []           # cycle
```

### Constraints
- `1 <= n <= 10_000`.
- `0 <= edges.length <= 50_000`.
- Any valid ordering is accepted.

---

## 7. Longest Increasing Subsequence
**Pillar:** algorithms
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
Given an array of integers, return the length of the longest strictly increasing
subsequence. A subsequence keeps the original relative order but need not be
contiguous. Aim for better than `O(n^2)` — an `O(n log n)` approach is expected.

### Example
```
Input:  [10, 9, 2, 5, 3, 7, 101, 18]
Output: 4            # [2, 3, 7, 101]

Input:  [0, 1, 0, 3, 2, 3]
Output: 4
```

### Constraints
- `1 <= nums.length <= 100_000`.
- `-10^9 <= nums[i] <= 10^9`.
- Strictly increasing (equal values do not extend the subsequence).

---

## 8. Implement a Circular Queue
**Pillar:** dataStructures
**Language:** Go
**Difficulty:** Intermediate

### Problem
Design a fixed-capacity circular queue (ring buffer) supporting `enqueue(x)`,
`dequeue()`, `front()`, `rear()`, `isEmpty()`, and `isFull()`. All operations must
run in `O(1)` and reuse freed slots without shifting elements. `enqueue` on a full
queue and `dequeue` on an empty queue both fail (return `false` / a sentinel).

### Example
```
q = CircularQueue(3)
q.enqueue(1)   -> true
q.enqueue(2)   -> true
q.enqueue(3)   -> true
q.enqueue(4)   -> false   # full
q.dequeue()    -> true    # removes 1
q.rear()       -> 3
q.front()      -> 2
```

### Constraints
- `1 <= capacity <= 10_000`.
- Stored values fit in a 32-bit signed integer.
- Up to `100_000` operations.

---

## 9. Union-Find with Path Compression
**Pillar:** dataStructures
**Language:** Python
**Difficulty:** Intermediate

### Problem
Implement a disjoint-set (union-find) structure over `n` elements supporting
`union(a, b)` and `find(a)`, plus `connected(a, b)`. Use path compression and
union by rank (or size) so operations run in near-constant amortized time. Report
the number of distinct components after a series of unions.

### Example
```
uf = UnionFind(5)        # components: {0}{1}{2}{3}{4}
uf.union(0, 1)
uf.union(2, 3)
uf.connected(0, 1)  -> true
uf.connected(0, 2)  -> false
uf.count()          -> 3   # {0,1}{2,3}{4}
```

### Constraints
- `1 <= n <= 200_000`.
- Up to `200_000` union/find operations.
- Elements are `0`-indexed integers `0`–`n-1`.

---

## 10. Design a URL Shortener (Friday Architecture Challenge)
**Pillar:** architecture
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Design the core service for a URL shortener (think bit.ly). Model the API and the
in-memory data layer for two operations:

- `shorten(longUrl)` → returns a short code (e.g. `"aZ3x9"`) and its full short URL.
- `resolve(shortCode)` → returns the original long URL, or a not-found result.

Your design should address:
1. **Code generation** — how short codes are produced (base-62 of an incrementing id,
   random with collision check, or a hash) and the trade-offs of each.
2. **Idempotency** — shortening the same long URL twice may return the same code or a
   new one; state your choice and justify it.
3. **Lookups** — both directions (`code → url` and, if deduplicating, `url → code`)
   should be average `O(1)`.
4. **Edge cases** — invalid input URLs, unknown codes, and capacity/overflow of the
   code space.

Deliver the interface (types/signatures) and a working in-memory implementation; no
persistent database or network layer is required.

### Example
```
const s = new UrlShortener("https://sho.rt/");
const { code, shortUrl } = s.shorten("https://example.com/some/very/long/path?a=1");
// code     -> "aZ3x9"  (any stable, collision-free code is fine)
// shortUrl -> "https://sho.rt/aZ3x9"

s.resolve(code)        // -> "https://example.com/some/very/long/path?a=1"
s.resolve("nope")      // -> not found (null / undefined / error — your choice)
```

### Constraints
- Short codes use the alphabet `[0-9A-Za-z]` (base 62).
- `shorten` and `resolve` are average `O(1)`.
- Must handle at least `10^7` distinct URLs without code collisions.
- State and defend your idempotency and code-generation choices in comments.
