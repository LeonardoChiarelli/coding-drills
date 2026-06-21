# Week 01 — Day 03

Intermediate set. 10 exercises: 4 logic, 3 algorithms, 3 data structures. Write each
solution in the **required language**. Solutions are not included; this file only specifies
the problems.

---

## 1. Roman Numeral Codec

- **Pillar:** Logic
- **Language:** Python
- **Difficulty:** Medium

Convert between integers and Roman numerals in both directions. Roman numerals use the
subtractive forms (`IV`=4, `IX`=9, `XL`=40, `XC`=90, `CD`=400, `CM`=900) and are always
written in the canonical, minimal form.

Write:

```python
def to_roman(n: int) -> str        # 1994 -> "MCMXCIV"
def from_roman(s: str) -> int      # "MCMXCIV" -> 1994
```

**Constraints**

- `1 <= n <= 3999`.
- `from_roman` only receives canonical uppercase numerals; the two functions must be exact
  inverses on the valid range.
- No numeral character repeats more than three times in a row.

**Example**

```
to_roman(58)        -> "LVIII"
to_roman(3888)      -> "MMMDCCCLXXXVIII"
from_roman("XLII")  -> 42
```

---

## 2. Run-Length Encoding

- **Pillar:** Logic
- **Language:** JavaScript
- **Difficulty:** Medium

Implement run-length encoding and its exact inverse. A run of a character is written as the
count followed by the character (`"aaab"` -> `"3a1b"`). Single characters still get a count
of `1` so decoding is unambiguous.

Write:

```js
function encode(s)   // "aaabbc" -> "3a2b1c"
function decode(s)   // "3a2b1c" -> "aaabbc"
```

**Constraints**

- `0 <= s.length <= 100_000`.
- Input to `encode` contains only characters that are **not** digits, so the encoded form is
  unambiguous.
- `encode("")` is `""`; `decode("")` is `""`. The functions must round-trip.

**Example**

```
encode("wwwwaaadexxxxxx")  -> "4w3a1d1e6x"
decode("4w3a1d1e6x")        -> "wwwwaaadexxxxxx"
```

---

## 3. ISBN-13 Checksum Validator

- **Pillar:** Logic
- **Language:** Go
- **Difficulty:** Medium

An ISBN-13 is 13 digits. The check digit (the 13th) is valid when the weighted sum of all
digits is a multiple of 10, where digits in odd positions (1st, 3rd, ...) have weight `1`
and digits in even positions have weight `3`.

Write `func IsValidISBN13(code string) bool`.

**Constraints**

- `code` may contain hyphens or spaces as separators, which are ignored.
- After stripping separators it must be exactly 13 digits; anything else is invalid.
- Any non-digit, non-separator character makes it invalid.

**Example**

```
IsValidISBN13("978-0-306-40615-7")  -> true
IsValidISBN13("9780306406157")       -> true
IsValidISBN13("978-0-306-40615-8")   -> false
```

---

## 4. Conway's Game of Life — One Step

- **Pillar:** Logic
- **Language:** Kotlin
- **Difficulty:** Medium

Given a rectangular grid of live (`1`) and dead (`0`) cells, compute the **next** generation.
Each cell has up to 8 neighbours. A live cell survives with 2 or 3 live neighbours; a dead
cell becomes live with exactly 3 live neighbours; all other cells die or stay dead. The grid
edges do not wrap.

Write `fun step(grid: Array<IntArray>): Array<IntArray>` returning a new grid.

**Constraints**

- `1 <= rows, cols <= 500`.
- Each cell is `0` or `1`. Do not mutate the input grid.
- All transitions are computed from the original generation simultaneously.

**Example**

```
Input:               Output:
  0 1 0                0 0 0
  0 1 0                1 1 1
  0 1 0                0 0 0
(a vertical blinker becomes horizontal)
```

---

## 5. Lower Bound (Binary Search Insertion Point)

- **Pillar:** Algorithms
- **Language:** Rust
- **Difficulty:** Medium

Given a sorted (non-decreasing) slice, return the index of the **first** element that is
greater than or equal to `target` — i.e. the leftmost position where `target` could be
inserted to keep the slice sorted. Solve in `O(log n)`.

Write `fn lower_bound(xs: &[i64], target: i64) -> usize`.

**Constraints**

- `0 <= xs.len() <= 1_000_000`, sorted non-decreasing (duplicates allowed).
- If every element is less than `target`, return `xs.len()`.
- Must not scan linearly; binary search only.

**Example**

```
lower_bound(&[1, 2, 4, 4, 5], 4)  -> 2
lower_bound(&[1, 2, 4, 4, 5], 3)  -> 2
lower_bound(&[1, 2, 4, 4, 5], 9)  -> 5
```

---

## 6. Dijkstra Shortest Path

- **Pillar:** Algorithms
- **Language:** Java
- **Difficulty:** Medium

Given a weighted directed graph with non-negative edge weights, return the shortest distance
from a source node to every node. Unreachable nodes have distance `-1`. Use a priority-queue
based Dijkstra.

Write `long[] shortestPaths(int n, int[][] edges, int source)` where each edge is
`[from, to, weight]`.

**Constraints**

- `1 <= n <= 100_000`, `0 <= edges.length <= 500_000`.
- `0 <= weight <= 10^9`; total path length can exceed `int`, so use `long`.
- Parallel edges may exist; keep the smallest. `dist[source] == 0`.

**Example**

```
Input:  n = 5,
        edges = [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]],
        source = 0
Output: [0, 3, 1, 4, -1]   // node 4 unreachable
```

---

## 7. Longest Increasing Subsequence

- **Pillar:** Algorithms
- **Language:** C++
- **Difficulty:** Medium

Return the **length** of the longest strictly increasing subsequence of an integer array.
The subsequence need not be contiguous. Aim for `O(n log n)` using patience-sorting / a
tails array with binary search.

Write `int lengthOfLIS(const std::vector<int>& nums)`.

**Constraints**

- `0 <= nums.size() <= 1_000_000`.
- `-10^9 <= nums[i] <= 10^9`.
- Strictly increasing: equal adjacent values do not extend a run. Empty array returns `0`.

**Example**

```
Input:  [10, 9, 2, 5, 3, 7, 101, 18]
Output: 4        // [2, 3, 7, 101] (or [2, 3, 7, 18])

Input:  [7, 7, 7, 7]
Output: 1
```

---

## 8. LRU Cache

- **Pillar:** Data Structures
- **Language:** TypeScript
- **Difficulty:** Medium

Implement a fixed-capacity **least-recently-used** cache. `get` and `put` must both run in
`O(1)` average time. Accessing a key (via `get` or overwriting `put`) makes it most recently
used; inserting into a full cache evicts the least recently used key.

Write a class:

```ts
class LRUCache {
  constructor(capacity: number) {}
  get(key: number): number {}        // value, or -1 if absent
  put(key: number, value: number): void {}
}
```

**Constraints**

- `1 <= capacity <= 100_000`.
- Keys and values are integers; `get` on a missing key returns `-1`.
- Overwriting an existing key updates its value and marks it most recently used.

**Example**

```
const c = new LRUCache(2)
c.put(1, 1)
c.put(2, 2)
c.get(1)      -> 1
c.put(3, 3)   // evicts key 2 (least recently used)
c.get(2)      -> -1
c.get(3)      -> 3
```

---

## 9. Binary Min-Heap

- **Pillar:** Data Structures
- **Language:** C
- **Difficulty:** Medium

Implement an array-backed binary min-heap of `int` supporting push and pop-min, growing its
backing array as needed. Memory must be released cleanly with no leaks.

Provide:

```c
typedef struct Heap Heap;
Heap* heap_create(void);
void  heap_push(Heap* h, int value);
int   heap_pop(Heap* h);     // remove and return the minimum (precondition: not empty)
int   heap_peek(const Heap* h);  // minimum without removing (precondition: not empty)
int   heap_size(const Heap* h);
void  heap_free(Heap* h);
```

**Constraints**

- Up to `1_000_000` elements; resize by doubling.
- Duplicates allowed. `heap_pop`/`heap_peek` are only called when `heap_size > 0`.
- `heap_free` must release all allocated memory.

**Example**

```
h = heap_create()
heap_push(h, 5); heap_push(h, 1); heap_push(h, 3)
heap_peek(h)  -> 1
heap_pop(h)   -> 1
heap_pop(h)   -> 3
heap_size(h)  -> 1
```

---

## 10. Fixed-Size Circular Ring Buffer

- **Pillar:** Data Structures
- **Language:** C#
- **Difficulty:** Medium

Implement a fixed-capacity ring buffer (circular queue) of `int`. Enqueue and dequeue are
`O(1)`. When full, enqueue fails (returns `false`) rather than overwriting. The buffer wraps
around its backing array using head/tail indices — no element shifting.

Write a class:

```csharp
public class RingBuffer {
    public RingBuffer(int capacity) {}
    public bool Enqueue(int value) {}   // false if full
    public bool TryDequeue(out int value) {}  // false if empty
    public int Count { get; }
    public bool IsFull { get; }
}
```

**Constraints**

- `1 <= capacity <= 1_000_000`.
- `Enqueue` on a full buffer returns `false` and leaves the buffer unchanged.
- `TryDequeue` on an empty buffer returns `false` and sets `value` to `0`.

**Example**

```
var rb = new RingBuffer(3)
rb.Enqueue(10)   -> true
rb.Enqueue(20)   -> true
rb.Enqueue(30)   -> true
rb.Enqueue(40)   -> false   // full
rb.TryDequeue(out v)  -> true, v == 10
rb.Enqueue(40)   -> true    // space freed, wraps around
rb.Count         -> 3
```
