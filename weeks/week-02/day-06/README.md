# Week 02 — Day 06

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 3 dataStructures

---

## 1. Rotate Image In Place
**Pillar:** logic
**Language:** Java
**Difficulty:** Intermediate

### Problem
Given an `n x n` matrix of integers representing an image, rotate it 90 degrees
clockwise **in place** — you may not allocate a second matrix. Two accepted
strategies: (a) transpose the matrix then reverse each row, or (b) rotate the
four corresponding cells of each "ring" in a single four-way swap. Either way,
every element must land in its final position using O(1) extra memory.

### Example
```
Input:  [[1,2,3],
         [4,5,6],
         [7,8,9]]
Output: [[7,4,1],
         [8,5,2],
         [9,6,3]]

Input:  [[ 5, 1, 9,11],
         [ 2, 4, 8,10],
         [13, 3, 6, 7],
         [15,14,12,16]]
Output: [[15,13, 2, 5],
         [14, 3, 4, 1],
         [12, 6, 8, 9],
         [16, 7,10,11]]
```

### Constraints
- `1 <= n <= 200`; `-1000 <= matrix[i][j] <= 1000`.
- Mutate the input array; do not return a new matrix.
- Required: O(n²) time, O(1) extra space.

---

## 2. Asteroid Collision
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
You are given a row of asteroids as a list of nonzero integers. The absolute
value is the asteroid's size; the sign is its direction (positive → moving
right, negative → moving left). All asteroids move at the same speed. When two
asteroids meet, the smaller one explodes; if they are equal, both explode.
Asteroids moving the same direction never meet. Return the state of the
asteroids after all collisions resolve. Reason with a stack: a collision can
only happen when a left-moving asteroid meets a right-moving one already
ahead of it.

### Example
```
Input:  [5, 10, -5]
Output: [5, 10]      # 10 destroys -5

Input:  [8, -8]
Output: []           # equal sizes, both explode

Input:  [10, 2, -5]
Output: [10]         # 2 dies to -5, then -5 dies to 10

Input:  [-2, -1, 1, 2]
Output: [-2, -1, 1, 2]   # they drift apart, no collision
```

### Constraints
- `2 <= len(asteroids) <= 10^4`; `-1000 <= asteroids[i] <= 1000`, never `0`.
- Required: O(n) time — each asteroid is pushed and popped at most once.

---

## 3. Validate IP Address
**Pillar:** logic
**Language:** Rust
**Difficulty:** Intermediate

### Problem
Given a string, classify it as `"IPv4"`, `"IPv6"`, or `"Neither"`. Parse it
manually — do not call a standard-library address parser. A valid IPv4 address
is four decimal groups `0-255` separated by dots, with no leading zeros (except
the single digit `0` itself). A valid IPv6 address is eight groups of 1 to 4
hexadecimal digits (upper or lower case) separated by colons; leading zeros are
allowed, and the abbreviated `::` form does **not** need to be supported.

### Example
```
Input:  "172.16.254.1"
Output: "IPv4"

Input:  "2001:0db8:85a3:0:0:8A2E:0370:7334"
Output: "IPv6"

Input:  "256.256.256.256"
Output: "Neither"    # 256 out of range

Input:  "01.1.1.1"
Output: "Neither"    # leading zero

Input:  "2001:0db8:85a3::8A2E:0370:7334"
Output: "Neither"    # :: abbreviation not accepted here
```

### Constraints
- Input length `<= 60`; may contain any printable ASCII.
- Watch the edge cases: empty groups (`"1..1.1"`, `"1::1"` splits), trailing
  separators, non-digit characters, groups longer than 4 hex digits.
- Required: single O(n) pass over the string (plus per-group checks).

---

## 4. Text Justification
**Pillar:** logic
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
Given an array of words and a line width `maxWidth`, format the text so each
line has exactly `maxWidth` characters and is fully justified. Pack as many
words as fit per line (greedy). Distribute spaces between words as evenly as
possible; when spaces don't divide evenly, the leftmost gaps receive the extra
spaces. The **last line** and any line containing a single word are
left-justified: one space between words, then padded with spaces on the right.

### Example
```
Input:  words = ["This", "is", "an", "example", "of", "text", "justification."]
        maxWidth = 16
Output: [
  "This    is    an",
  "example  of text",
  "justification.  "
]

Input:  words = ["What","must","be","acknowledgment","shall","be"]
        maxWidth = 16
Output: [
  "What   must   be",
  "acknowledgment  ",   # single word on the line → left-justified
  "shall be        "    # last line → left-justified
]
```

### Constraints
- `1 <= words.length <= 300`; `1 <= words[i].length <= 20`.
- `words[i].length <= maxWidth <= 100`; words contain no spaces.
- Every output line must have length exactly `maxWidth`.

---

## 5. Container With Most Water
**Pillar:** algorithms
**Language:** Go
**Difficulty:** Intermediate

### Problem
Given an array `height` where `height[i]` is the height of a vertical line at
position `i`, choose two lines that, together with the x-axis, hold the most
water. Return the maximum area (`width * min(leftHeight, rightHeight)`). Use
the two-pointer technique: start at both ends and always move the pointer at
the shorter line inward — prove to yourself why discarding the shorter side
can never skip the optimal pair.

### Example
```
Input:  height = [1,8,6,2,5,4,8,3,7]
Output: 49      # lines at index 1 (h=8) and index 8 (h=7): 7 * 7 = 49

Input:  height = [1,1]
Output: 1
```

### Constraints
- `2 <= len(height) <= 10^5`; `0 <= height[i] <= 10^4`.
- Required: O(n) time, O(1) space. The O(n²) all-pairs scan is not accepted.

---

## 6. Subarray Sum Equals K
**Pillar:** algorithms
**Language:** Kotlin
**Difficulty:** Intermediate

### Problem
Given an integer array `nums` (positive and negative values) and an integer
`k`, return the number of contiguous subarrays whose elements sum to exactly
`k`. Because values can be negative, sliding windows do not work. Use prefix
sums with a hash map: while scanning, keep `count[prefixSum]`; at each index
the number of subarrays ending there equals `count[currentSum - k]`.

### Example
```
Input:  nums = [1, 1, 1], k = 2
Output: 2         # [1,1] at indices 0-1 and 1-2

Input:  nums = [1, 2, 3], k = 3
Output: 2         # [1,2] and [3]

Input:  nums = [1, -1, 0], k = 0
Output: 3         # [1,-1], [-1,0]... careful: [1,-1], [0], [1,-1,0]
```

### Constraints
- `1 <= nums.size <= 2 * 10^4`; `-1000 <= nums[i] <= 1000`; `-10^7 <= k <= 10^7`.
- Don't forget to seed the map with `{0: 1}` for subarrays starting at index 0.
- Required: O(n) time, O(n) space. The O(n²) prefix rescan fails the bound.

---

## 7. Gas Station Circuit
**Pillar:** algorithms
**Language:** C
**Difficulty:** Intermediate

### Problem
There are `n` gas stations on a circular route. `gas[i]` is the fuel available
at station `i`; `cost[i]` is the fuel needed to drive from station `i` to
station `i+1`. Starting with an empty tank, return the index of the unique
station from which you can complete one full clockwise loop, or `-1` if it is
impossible. Solve greedily in one pass: if the total gas is at least the total
cost, an answer exists; whenever the running tank goes negative, no station in
the failed stretch can be the start — restart the candidate at the next station.

### Example
```
Input:  gas  = [1,2,3,4,5]
        cost = [3,4,5,1,2]
Output: 3     # start at station 3: tank 4→3→4→5→... completes the loop

Input:  gas  = [2,3,4]
        cost = [3,4,3]
Output: -1    # total gas 9 < total cost 10
```

### Constraints
- `1 <= n <= 10^5`; `0 <= gas[i], cost[i] <= 10^4`.
- The answer is guaranteed unique when it exists.
- Required: O(n) time, O(1) space. Trying every start in O(n²) is not accepted.

---

## 8. Insert Delete GetRandom O(1)
**Pillar:** dataStructures
**Language:** C++
**Difficulty:** Intermediate

### Problem
Design a set supporting three operations, each in average O(1):
`insert(val)` adds `val` and returns `true` if absent; `remove(val)` deletes
`val` and returns `true` if present; `getRandom()` returns a uniformly random
element among those currently stored. The classic layout is a dynamic array of
values plus a hash map `value → index`. Removal is the trick: swap the target
with the **last** element of the array, fix the moved element's index in the
map, then pop the back.

### Example
```
RandomizedSet rs;
rs.insert(1);     // true
rs.remove(2);     // false — not present
rs.insert(2);     // true, set = {1, 2}
rs.getRandom();   // 1 or 2, each with probability 0.5
rs.remove(1);     // true, set = {2}
rs.insert(2);     // false — already present
rs.getRandom();   // always 2
```

### Constraints
- `-2^31 <= val <= 2^31 - 1`; up to `2 * 10^5` total calls.
- `getRandom` is only called when the set is non-empty.
- Required: average O(1) per operation. A structure with O(n) removal (plain
  array) or O(n) sampling (iterating a hash set) is not accepted.

---

## 9. Online Stock Span
**Pillar:** dataStructures
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Implement `StockSpanner`, which receives daily stock prices one at a time.
`next(price)` returns the span of today's price: the number of consecutive
days ending today with price less than or equal to today's. Use a monotonic
stack of `[price, span]` pairs: pop every entry with price `<=` today's,
accumulating their spans, then push the merged pair. Each price is pushed and
popped at most once, so the amortized cost per call is O(1).

### Example
```
const s = new StockSpanner();
s.next(100); // 1
s.next(80);  // 1
s.next(60);  // 1
s.next(70);  // 2   (70 covers 60, 70)
s.next(60);  // 1
s.next(75);  // 4   (75 covers 60, 70, 60, 75)
s.next(85);  // 6
```

### Constraints
- `1 <= price <= 10^5`; up to `10^4` calls to `next`.
- Required: amortized O(1) per call, O(n) worst-case total. Re-scanning the
  full history on each call (O(n) per call) is not accepted.

---

## 10. Flatten Nested List Iterator
**Pillar:** dataStructures
**Language:** C#
**Difficulty:** Intermediate

### Problem
You are given a nested list of integers: each element is either an integer or
another nested list of the same type (arbitrary depth). Implement an iterator
that flattens it, exposing `HasNext()` and `Next()`. Model the element type as
an interface with `IsInteger()`, `GetInteger()`, and `GetList()`. The required
approach is **lazy**: use a stack of elements (or of list enumerators) and
unwind only enough to expose the next integer inside `HasNext()` — do not
pre-flatten the entire structure in the constructor.

### Example
```
Input:  [[1,1], 2, [1,1]]
Output: 1, 1, 2, 1, 1     // order of full iteration

Input:  [1, [4, [6]]]
Output: 1, 4, 6

Input:  [[], [[]]]
Output: (nothing)         // HasNext() is immediately false
```

### Constraints
- Total integers across all nesting `<= 10^5`; depth `<= 50`.
- `HasNext()` must be idempotent: calling it repeatedly without `Next()`
  returns the same answer and consumes nothing.
- Required: amortized O(1) per operation over the whole iteration; memory
  proportional to nesting depth plus unvisited elements, not to a fully
  materialized flat copy made up front.
