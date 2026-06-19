# Week 01 — Day 01

Intermediate set. 10 exercises: 4 logic, 3 algorithms, 2 data structures, 1 architecture
(Friday challenge). Write each solution in the **required language**. Solutions are not
included; this file only specifies the problems.

---

## 1. Traffic Light Controller Validator

- **Pillar:** Logic
- **Language:** Python
- **Difficulty:** Medium

A single traffic light cycles through states in strict order: `GREEN -> YELLOW -> RED -> GREEN`.
Given a sequence of observed states, decide whether the sequence is a **legal run** of the
light. A legal run never skips a state and never goes backwards. The sequence may start on
any state and may stop at any state, but every adjacent pair must be a valid transition.

Write `is_legal(states: list[str]) -> bool`.

**Constraints**

- `1 <= len(states) <= 10_000`
- Each item is one of `"GREEN"`, `"YELLOW"`, `"RED"`.
- A single-element sequence is always legal.

**Example**

```
Input:  ["GREEN", "YELLOW", "RED", "GREEN"]
Output: True

Input:  ["GREEN", "RED"]
Output: False        # GREEN must go to YELLOW first
```

---

## 2. ISO Leap-Week Parity

- **Pillar:** Logic
- **Language:** JavaScript
- **Difficulty:** Medium

A year is a **long year** in the ISO-8601 week calendar (it has 53 weeks instead of 52)
when `January 1` falls on a Thursday, OR the year is a leap year and `January 1` falls on a
Wednesday. Given a year, return `true` if it is a long year.

Write `function isLongYear(year)`.

**Constraints**

- `1 <= year <= 9999`
- Use the proleptic Gregorian calendar.
- Do not use `Date` parsing tricks that depend on locale or timezone; compute the weekday
  from the year using Zeller-style arithmetic or `Date.UTC`.

**Example**

```
Input:  2026
Output: false

Input:  2020
Output: true     // 2020 is a leap year starting on a Wednesday
```

---

## 3. Tic-Tac-Toe Winner

- **Pillar:** Logic
- **Language:** Go
- **Difficulty:** Medium

Given a `3x3` board, return the winner. The board uses `'X'`, `'O'`, and `' '` (space) for
empty. Exactly one of the following must be returned: `"X"`, `"O"`, `"Draw"`, or `"Pending"`.
`"Draw"` means the board is full with no winner; `"Pending"` means no winner yet and at least
one empty cell. Assume the input board is reachable in a real game (you do not need to detect
two simultaneous winners).

Write `func Winner(board [3][3]rune) string`.

**Constraints**

- Board is always exactly `3x3`.
- Cells are only `'X'`, `'O'`, or `' '`.

**Example**

```
Input:
  X | O | X
  O | X | O
  X |   |
Output: "X"          // top-left to bottom-right diagonal

Input:
  X | O | X
  X | O | O
  O | X | X
Output: "Draw"
```

---

## 4. Roman Numeral Validator

- **Pillar:** Logic
- **Language:** Ruby
- **Difficulty:** Medium

Given a string, decide whether it is a **well-formed** Roman numeral in standard form
(1..3999). This is validation, not conversion. Standard form means: symbols appear highest
to lowest except for the allowed subtractive pairs (`IV`, `IX`, `XL`, `XC`, `CD`, `CM`);
`I`, `X`, `C`, `M` repeat at most 3 times in a row; `V`, `L`, `D` never repeat.

Write `def valid_roman?(s)`.

**Constraints**

- `1 <= s.length <= 15`
- Input contains only uppercase letters `I V X L C D M` (other characters make it invalid,
  but you may assume the alphabet is restricted to these).
- The empty-after-trim case is invalid.

**Example**

```
Input:  "MCMXCIV"
Output: true        # 1994

Input:  "IIII"
Output: false       # four I in a row
```

---

## 5. Merge Overlapping Intervals

- **Pillar:** Algorithms
- **Language:** Rust
- **Difficulty:** Medium

Given a list of closed intervals `[start, end]`, merge all overlapping or touching intervals
and return the result sorted by start. Intervals `[1, 3]` and `[3, 5]` touch and merge into
`[1, 5]`.

Write `fn merge(intervals: Vec<(i64, i64)>) -> Vec<(i64, i64)>`.

**Constraints**

- `0 <= intervals.len() <= 100_000`
- For each interval `start <= end`.
- Values fit in `i64`. Aim for `O(n log n)`.

**Example**

```
Input:  [(1, 3), (2, 6), (8, 10), (15, 18)]
Output: [(1, 6), (8, 10), (15, 18)]

Input:  [(1, 4), (4, 5)]
Output: [(1, 5)]
```

---

## 6. Search in Rotated Sorted Array

- **Pillar:** Algorithms
- **Language:** Java
- **Difficulty:** Medium

A sorted ascending array of **distinct** integers was rotated at an unknown pivot (e.g.
`[0,1,2,4,5,6,7]` became `[4,5,6,7,0,1,2]`). Given the rotated array and a target, return the
index of the target, or `-1` if absent. Must run in `O(log n)`.

Write `int search(int[] nums, int target)`.

**Constraints**

- `0 <= nums.length <= 5_000`
- All values are distinct.
- `-10^9 <= nums[i], target <= 10^9`.

**Example**

```
Input:  nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Input:  nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

---

## 7. Shortest Path (Dijkstra)

- **Pillar:** Algorithms
- **Language:** C++
- **Difficulty:** Medium

Given a weighted directed graph with non-negative edge weights, return the shortest distance
from a source node `s` to every node. Unreachable nodes report `-1`. Use a priority-queue
based Dijkstra.

Write `std::vector<long long> shortestPaths(int n, const std::vector<std::array<long long,3>>& edges, int s)`
where each edge is `{from, to, weight}` and nodes are `0..n-1`.

**Constraints**

- `1 <= n <= 100_000`
- `0 <= edges.size() <= 300_000`
- `0 <= weight <= 10^9`. There may be parallel edges and self-loops.
- Distance to `s` itself is `0`.

**Example**

```
Input:  n = 4
        edges = {{0,1,1}, {1,2,2}, {0,2,5}, {2,3,1}}
        s = 0
Output: [0, 1, 3, 4]
```

---

## 8. LRU Cache

- **Pillar:** Data Structures
- **Language:** TypeScript
- **Difficulty:** Medium

Implement a fixed-capacity Least-Recently-Used cache with `O(1)` `get` and `put`. `get`
returns the value or `-1` if absent and marks the key most-recently-used. `put` inserts or
updates and, if over capacity, evicts the least-recently-used key.

Write a class:

```ts
class LRUCache {
  constructor(capacity: number) {}
  get(key: number): number {}
  put(key: number, value: number): void {}
}
```

**Constraints**

- `1 <= capacity <= 100_000`
- Keys and values are integers.
- Both operations must be amortized `O(1)` (hash map + doubly linked list).

**Example**

```
new LRUCache(2)
put(1, 1); put(2, 2)
get(1)        -> 1
put(3, 3)     // evicts key 2
get(2)        -> -1
```

---

## 9. Ring Buffer

- **Pillar:** Data Structures
- **Language:** C
- **Difficulty:** Medium

Implement a fixed-size circular buffer (FIFO) of `int`. Pushing onto a full buffer fails;
popping from an empty buffer fails. Capacity is fixed at construction.

Provide:

```c
typedef struct RingBuffer RingBuffer;
RingBuffer* rb_create(size_t capacity);
int  rb_push(RingBuffer* rb, int value);   // returns 1 on success, 0 if full
int  rb_pop(RingBuffer* rb, int* out);     // returns 1 on success, 0 if empty
size_t rb_size(const RingBuffer* rb);
void rb_free(RingBuffer* rb);
```

**Constraints**

- `1 <= capacity <= 1_000_000`
- All operations are `O(1)`.
- No memory leaks; `rb_free` releases everything.

**Example**

```
rb = rb_create(2)
rb_push(rb, 10)   -> 1
rb_push(rb, 20)   -> 1
rb_push(rb, 30)   -> 0     // full
rb_pop(rb, &x)    -> 1, x == 10
rb_push(rb, 30)   -> 1     // space freed
```

---

## 10. Architecture Challenge: Distributed Rate Limiter

- **Pillar:** Architecture
- **Language:** Markdown (design document) + pseudocode
- **Difficulty:** Medium (weekly architecture challenge)

Design a **rate limiter** for a public HTTP API served by many stateless app instances
behind a load balancer. The limit is per API key: `N` requests per rolling 60-second window.
Deliver a design document, not running code, covering:

1. **Algorithm choice.** Compare fixed window, sliding-window log, and sliding-window counter.
   Pick one and justify the accuracy-vs-cost tradeoff.
2. **Shared state.** Where the counters live so all instances agree (e.g. Redis). Show the
   key schema and the read-modify-write, and explain how you avoid race conditions
   (atomic increment / Lua script / token bucket script).
3. **Failure mode.** What happens when the shared store is unreachable: fail-open or
   fail-closed? Justify per threat model.
4. **Response contract.** Status code and headers returned when throttled
   (`429`, `Retry-After`, `X-RateLimit-Remaining`).
5. **Pseudocode** for the hot path: given an API key, decide allow/deny and update state.

**Constraints**

- Assume up to 50 app instances and 10^5 distinct API keys.
- Target decision latency < 5 ms at p99.
- The window is rolling, not calendar-aligned.

**Deliverable**

A `SOLUTION.md` (or similar) with the five sections above plus one diagram (ASCII is fine)
showing request flow through limiter and shared store.
