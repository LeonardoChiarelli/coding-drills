# Week 02 — Day 07

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 3 dataStructures

---

## 1. Compare Version Numbers
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
Given two version strings `v1` and `v2` composed of numeric revisions separated
by dots (e.g. `"1.01"`, `"1.0.0"`), compare them. Compare revision by revision,
left to right, ignoring leading zeros within each revision. A missing revision
counts as `0` (so `"1.0"` equals `"1"`). Return `-1` if `v1 < v2`, `1` if
`v1 > v2`, and `0` if they are equal.

### Example
```
Input:  v1 = "1.01",  v2 = "1.001"
Output: 0            (01 == 001 after stripping leading zeros)

Input:  v1 = "1.0",   v2 = "1.0.0"
Output: 0            (missing revision treated as 0)

Input:  v1 = "0.1",   v2 = "1.1"
Output: -1
```

### Constraints
- `1 <= len(v1), len(v2) <= 500`; only digits and `.`.
- Each revision fits in a 32-bit signed integer.
- Do not use any built-in version-comparison library.

---

## 2. Set Matrix Zeroes
**Pillar:** logic
**Language:** Java
**Difficulty:** Intermediate

### Problem
Given an `m x n` integer matrix, if an element is `0`, set its entire row and
column to `0` — **in place**. The trap: naively zeroing as you scan destroys
the information about which zeros were original. The target solution uses the
first row and first column of the matrix itself as marker storage, achieving
O(1) extra space (two boolean flags for the first row/column themselves).

### Example
```
Input:  [[1,1,1],
         [1,0,1],
         [1,1,1]]
Output: [[1,0,1],
         [0,0,0],
         [1,0,1]]

Input:  [[0,1,2,0],
         [3,4,5,2],
         [1,3,1,5]]
Output: [[0,0,0,0],
         [0,4,5,0],
         [0,3,1,0]]
```

### Constraints
- `1 <= m, n <= 200`; `-2^31 <= matrix[i][j] <= 2^31 - 1`.
- Mutate the input; do not allocate an `m x n` copy.
- Full marks: O(1) extra space. Acceptable: O(m + n) with a note why.

---

## 3. Champagne Tower
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
A champagne tower has 1 glass in row 0, 2 in row 1, ..., `i + 1` glasses in row
`i` (rows are 0-indexed, 100 rows total). Each glass holds exactly 1 unit.
`poured` units are poured into the top glass; overflow from any glass splits
equally onto the two glasses directly below it (excess from the bottom row
spills to the floor). Given `poured`, `query_row`, and `query_glass`, return
how full that glass is (a float between 0 and 1). Simulate flow row by row
rather than tracking individual drops.

### Example
```
Input:  poured = 2, query_row = 1, query_glass = 1
Output: 0.5      (top glass keeps 1; the extra 1 splits 0.5 / 0.5)

Input:  poured = 100000009, query_row = 33, query_glass = 17
Output: 1.0
```

### Constraints
- `0 <= poured <= 10^9`; `0 <= query_glass <= query_row < 100`.
- Answers within `1e-5` of the exact value are accepted.
- Target: O(rows²) time, O(rows) space per row.

---

## 4. Push Dominoes
**Pillar:** logic
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
A row of dominoes is described by a string of `'L'` (pushed left), `'R'`
(pushed right), and `'.'` (standing). Every second, a falling domino pushes its
standing neighbor in the same direction. A standing domino pushed from both
sides simultaneously stays upright. Forces from a single push do not pass
through a fallen domino. Return the final state. Hint: process the gap between
each pair of non-`'.'` boundary characters (`R...L`, `L...L`, etc.) — or run a
two-pass force calculation.

### Example
```
Input:  ".L.R...LR..L.."
Output: "LL.RR.LLRRLL.."

Input:  "RR.L"
Output: "RR.L"    (the R force is blocked; middle domino balanced)
```

### Constraints
- `1 <= s.length <= 10^5`; only `'L'`, `'R'`, `'.'`.
- Required: O(n) time, O(n) space (the output string).

---

## 5. Longest Palindromic Substring
**Pillar:** algorithms
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Given a string `s`, return the longest contiguous substring that is a
palindrome. If several have the same maximal length, return the one that
starts earliest. Implement expand-around-center: for each of the `2n - 1`
centers (letters and gaps between letters), expand outward while the ends
match, tracking the best window. Do not use the O(n³) brute force.

### Example
```
Input:  "babad"
Output: "bab"     ("aba" is same length but starts later)

Input:  "cbbd"
Output: "bb"

Input:  "abc"
Output: "a"
```

### Constraints
- `1 <= s.length <= 2000`; printable ASCII, case-sensitive.
- Required: O(n²) worst-case time, O(1) extra space (excluding the answer).

---

## 6. Jump Game II
**Pillar:** algorithms
**Language:** Rust
**Difficulty:** Intermediate

### Problem
You start at index 0 of an array `nums` where `nums[i]` is the maximum jump
length from position `i`. Return the minimum number of jumps needed to reach
the last index. The input guarantees the last index is reachable. The target
solution is greedy BFS-by-layers: track the far edge of the current jump
window and the farthest index reachable from anywhere inside it; when you
exhaust the window, take one more jump to the recorded farthest point.

### Example
```
Input:  [2,3,1,1,4]
Output: 2        (0 -> 1 -> 4)

Input:  [2,3,0,1,4]
Output: 2
```

### Constraints
- `1 <= nums.len() <= 10^4`; `0 <= nums[i] <= 1000`.
- Required: O(n) time, O(1) space. A dynamic-programming O(n²) solution
  does not earn full marks.

---

## 7. Cheapest Flights Within K Stops
**Pillar:** algorithms
**Language:** Python
**Difficulty:** Intermediate

### Problem
There are `n` cities and a list of directed flights `[from, to, price]`. Given
`src`, `dst`, and `k`, return the cheapest price to travel from `src` to `dst`
using **at most `k` intermediate stops**, or `-1` if impossible. Note that
plain Dijkstra fails here because a more expensive path with fewer stops can
still be the right prefix. Use Bellman-Ford limited to `k + 1` edge-relaxation
rounds (relax from a snapshot of the previous round), or BFS by layers.

### Example
```
Input:  n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],
        src = 0, dst = 3, k = 1
Output: 700      (0->1->3; the cheaper 0->1->2->3 = 400 needs 2 stops)

Input:  n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]],
        src = 0, dst = 2, k = 0
Output: 500
```

### Constraints
- `1 <= n <= 100`; `0 <= flights.length <= n * (n - 1) / 2`; `0 <= k < n`.
- `1 <= price <= 10^4`; no self-loops or duplicate edges.
- Target: O(k * E) time.

---

## 8. Design Underground System
**Pillar:** dataStructures
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Implement a class `UndergroundSystem` that tracks customer journeys and
average travel times between station pairs:

- `checkIn(id: number, stationName: string, t: number)` — customer `id` enters
  `stationName` at time `t`. A customer can only be checked into one station
  at a time.
- `checkOut(id: number, stationName: string, t: number)` — customer `id` exits
  at `stationName` at time `t`, completing the journey started at check-in.
- `getAverageTime(startStation: string, endStation: string): number` — average
  travel time over **all** journeys completed from `startStation` directly to
  `endStation`.

Choose your hash-map key scheme so each operation is O(1); store running
`(totalTime, tripCount)` per station pair rather than a list of every trip.

### Example
```
checkIn(45, "Leyton", 3); checkIn(32, "Paradise", 8)
checkOut(45, "Waterloo", 15)      // trip Leyton->Waterloo took 12
checkOut(32, "Cambridge", 22)     // trip Paradise->Cambridge took 14
getAverageTime("Leyton", "Waterloo")    -> 12.0
checkIn(10, "Leyton", 24); checkOut(10, "Waterloo", 38)   // 14
getAverageTime("Leyton", "Waterloo")    -> 13.0
```

### Constraints
- Up to `2 * 10^4` total calls; `1 <= t <= 10^6`; station names 1–10 chars.
- `getAverageTime` is only called on pairs with at least one completed trip.
- All three operations must be O(1) average time.

---

## 9. Range Sum Query — Mutable (Fenwick Tree)
**Pillar:** dataStructures
**Language:** Go
**Difficulty:** Intermediate

### Problem
Implement a structure over an integer array supporting both point updates and
prefix-range sums, each in O(log n):

- `NewNumArray(nums []int)` — build from the initial array.
- `Update(index, val int)` — set `nums[index] = val`.
- `SumRange(left, right int) int` — sum of `nums[left..right]` inclusive.

Implement a **Fenwick tree (binary indexed tree)**: 1-based internal array,
`i & (-i)` to step between nodes, and `SumRange(l, r) = prefix(r) - prefix(l-1)`.
A segment tree is also accepted, but no rebuilding of prefix sums on update.

### Example
```
NewNumArray([1, 3, 5])
SumRange(0, 2)  -> 9
Update(1, 2)            // array becomes [1, 2, 5]
SumRange(0, 2)  -> 8
SumRange(1, 2)  -> 7
```

### Constraints
- `1 <= len(nums) <= 3 * 10^4`; `-100 <= nums[i], val <= 100`.
- Up to `3 * 10^4` mixed calls to `Update` / `SumRange`.
- Required: O(n) or O(n log n) build; O(log n) per operation. Recomputing a
  prefix array on each update (O(n) update) does not earn full marks.

---

## 10. Serialize and Deserialize Binary Tree
**Pillar:** dataStructures
**Language:** C#
**Difficulty:** Intermediate

### Problem
Design two functions for a binary tree of integers:

- `string Serialize(TreeNode root)` — encode the tree to a single string.
- `TreeNode Deserialize(string data)` — rebuild the exact same tree.

The format is yours to design (preorder with null markers and a delimiter is
the classic choice), but `Deserialize(Serialize(root))` must reproduce the
original structure and values exactly, including `null` (empty) trees and
negative values. Do not rely on any built-in object serializer.

### Example
```
Tree:        1
            / \
           2   3
              / \
             4   5

Serialize   -> e.g. "1,2,#,#,3,4,#,#,5,#,#"   (format is up to you)
Deserialize -> the same tree, node for node
```

### Constraints
- `0 <= number of nodes <= 10^4`; `-1000 <= Node.val <= 1000`.
- Values may be multi-digit and negative — a delimiter is mandatory.
- Required: O(n) time for both directions; recursion depth may reach the
  tree height (an iterative variant is welcome but not required).
