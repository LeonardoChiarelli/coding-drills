# Week 01 — Day 02

Intermediate set. 10 exercises: 4 logic, 3 algorithms, 2 data structures, 1 architecture
(Friday challenge). Write each solution in the **required language**. Solutions are not
included; this file only specifies the problems.

---

## 1. Luhn Checksum Validator

- **Pillar:** Logic
- **Language:** Python
- **Difficulty:** Medium

The Luhn algorithm validates identification numbers such as credit card numbers. Starting
from the **rightmost** digit and moving left, double every second digit; if a doubled value
exceeds 9, subtract 9. Sum all digits. The number is valid when the total is a multiple of 10.

Write `is_luhn_valid(number: str) -> bool`.

**Constraints**

- `1 <= len(number) <= 64`.
- `number` may contain spaces, which are ignored. Any other non-digit character makes it
  invalid.
- A string with only one digit is valid only if that digit is `0`.

**Example**

```
Input:  "4539 1488 0343 6467"
Output: True

Input:  "8273 1232 7352 0569"
Output: False
```

---

## 2. Balanced Brackets

- **Pillar:** Logic
- **Language:** JavaScript
- **Difficulty:** Medium

Given a string containing the bracket characters `()[]{}` (and possibly other characters,
which you ignore), decide whether all brackets are balanced and correctly nested. Every
opening bracket must close with the matching type in the right order.

Write `function isBalanced(s)`.

**Constraints**

- `0 <= s.length <= 100_000`.
- Only `()[]{}` are treated as brackets; all other characters are ignored.
- An empty string (or one with no brackets) is balanced.

**Example**

```
Input:  "a(b[c]{d}e)"
Output: true

Input:  "([)]"
Output: false       // wrong nesting order
```

---

## 3. Spreadsheet Column Codec

- **Pillar:** Logic
- **Language:** Go
- **Difficulty:** Medium

Spreadsheets label columns `A, B, ..., Z, AA, AB, ..., AZ, BA, ...` — a **bijective base-26**
system (there is no zero digit). Implement both directions of the mapping.

Write:

```go
func ColumnToNumber(title string) int  // "A" -> 1, "AA" -> 27
func NumberToColumn(n int) string       // 1 -> "A", 27 -> "AA"
```

**Constraints**

- `1 <= n <= 1_000_000`.
- `title` contains only uppercase letters `A`-`Z`, length `1`-`7`.
- The two functions must be exact inverses on the valid range.

**Example**

```
ColumnToNumber("ZY")  -> 701
NumberToColumn(702)   -> "ZZ"
NumberToColumn(703)   -> "AAA"
```

---

## 4. Battleship Board Validator

- **Pillar:** Logic
- **Language:** Ruby
- **Difficulty:** Medium

A battleship board is a grid of `'.'` (water) and `'#'` (ship). A placement is **valid** when
every ship is a straight horizontal or vertical run of cells, and no two distinct ships are
adjacent — not even diagonally. (Equivalently: no `2x2` block contains more than... use the
adjacency rule directly.) Return whether the board is a valid placement.

Write `def valid_board?(grid)` where `grid` is an array of equal-length strings.

**Constraints**

- `1 <= rows, cols <= 200`.
- Each character is `'.'` or `'#'`.
- An all-water board is valid. A single cell ship is valid.

**Example**

```
Input:
  ["#..#",
   "...#",
   "#..#",
   "#.#."]
Output: true

Input:
  ["##.#",
   "...#",
   "#..#",
   "#.#."]      # the top-left ship touches another diagonally
Output: false
```

---

## 5. Maximum Subarray Sum (Kadane)

- **Pillar:** Algorithms
- **Language:** Rust
- **Difficulty:** Medium

Given an integer array, return the largest sum obtainable from a **contiguous, non-empty**
subarray. Solve in `O(n)` time and `O(1)` extra space.

Write `fn max_subarray(nums: &[i64]) -> i64`.

**Constraints**

- `1 <= nums.len() <= 1_000_000`.
- `-10^9 <= nums[i] <= 10^9`. The running sum can exceed `i32`; use `i64`.
- The subarray must contain at least one element, so an all-negative array returns its
  largest (closest to zero) element.

**Example**

```
Input:  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6        // [4, -1, 2, 1]

Input:  [-8, -3, -6]
Output: -3
```

---

## 6. Topological Sort with Cycle Detection

- **Pillar:** Algorithms
- **Language:** Java
- **Difficulty:** Medium

Given a directed graph as `n` nodes (`0..n-1`) and a list of edges `from -> to`, return any
valid topological ordering. If the graph contains a cycle (no valid ordering exists), return
an empty array. Use Kahn's algorithm (BFS on in-degrees).

Write `int[] topoSort(int n, int[][] edges)`.

**Constraints**

- `1 <= n <= 100_000`.
- `0 <= edges.length <= 300_000`. Edges may be duplicated; treat each as a dependency.
- No self-loops in valid input, but a self-loop (if present) means a cycle.

**Example**

```
Input:  n = 4, edges = [[0,1],[0,2],[1,3],[2,3]]
Output: [0,1,2,3]     // also [0,2,1,3] is acceptable

Input:  n = 2, edges = [[0,1],[1,0]]
Output: []            // cycle
```

---

## 7. Edit Distance (Levenshtein)

- **Pillar:** Algorithms
- **Language:** C++
- **Difficulty:** Medium

Compute the minimum number of single-character **insertions, deletions, or substitutions**
needed to transform string `a` into string `b`. Use dynamic programming.

Write `int editDistance(const std::string& a, const std::string& b)`.

**Constraints**

- `0 <= a.size(), b.size() <= 2_000`.
- Strings are ASCII.
- Aim for `O(|a| * |b|)` time; `O(min(|a|, |b|))` space is possible with a rolling row.

**Example**

```
Input:  a = "kitten", b = "sitting"
Output: 3        // k->s, e->i, append g

Input:  a = "flaw", b = "lawn"
Output: 2
```

---

## 8. Union-Find (Disjoint Set Union)

- **Pillar:** Data Structures
- **Language:** TypeScript
- **Difficulty:** Medium

Implement a disjoint-set structure over elements `0..n-1` with **path compression** and
**union by rank/size**, so that `find` and `union` are near-constant amortized time.

Write a class:

```ts
class DSU {
  constructor(n: number) {}
  find(x: number): number {}        // representative of x's set
  union(a: number, b: number): boolean {}  // true if merged, false if already together
  connected(a: number, b: number): boolean {}
  count(): number {}                 // number of disjoint sets
}
```

**Constraints**

- `1 <= n <= 1_000_000`.
- All element arguments are in `0..n-1`.
- A fresh `DSU(n)` has `count() === n`.

**Example**

```
const d = new DSU(5)
d.union(0, 1)        -> true
d.union(1, 2)        -> true
d.union(0, 2)        -> false   // already connected
d.connected(0, 2)    -> true
d.count()            -> 3       // {0,1,2}, {3}, {4}
```

---

## 9. Trie (Prefix Tree)

- **Pillar:** Data Structures
- **Language:** C
- **Difficulty:** Medium

Implement a trie over lowercase words supporting insert, exact membership, and prefix query.
Memory must be released cleanly with no leaks.

Provide:

```c
typedef struct Trie Trie;
Trie* trie_create(void);
void  trie_insert(Trie* t, const char* word);
int   trie_contains(const Trie* t, const char* word);    // exact word present
int   trie_starts_with(const Trie* t, const char* prefix); // any word has this prefix
void  trie_free(Trie* t);
```

**Constraints**

- Words contain only `'a'`-`'z'`, length `1`-`100`.
- Up to `100_000` inserted words.
- `trie_free` must release every node.

**Example**

```
t = trie_create()
trie_insert(t, "apple")
trie_contains(t, "apple")     -> 1
trie_contains(t, "app")       -> 0
trie_starts_with(t, "app")    -> 1
trie_starts_with(t, "apx")    -> 0
```

---

## 10. Architecture Challenge: URL Shortener Service

- **Pillar:** Architecture
- **Language:** Markdown (design document) + pseudocode
- **Difficulty:** Medium (weekly architecture challenge)

Design a **URL shortener** (think bit.ly): users submit a long URL and receive a short code;
visiting `https://sho.rt/<code>` redirects to the original. The service is read-heavy
(redirects vastly outnumber creations). Deliver a design document, not running code, covering:

1. **Code generation.** How short codes are minted. Compare a counter + base-62 encoding
   against random codes with collision retry. Pick one and justify length vs. namespace size.
2. **Storage.** The schema mapping `code -> long URL` (+ metadata: owner, created-at, hit
   count). Which database and why, given the read/write ratio.
3. **Read path & caching.** How a redirect is served in single-digit milliseconds at scale;
   where a cache sits and its invalidation/TTL story.
4. **Redirect contract.** Status code for the redirect (`301` vs `302`) and the tradeoff for
   analytics and caching. Behavior for an unknown or expired code.
5. **Pseudocode** for both hot paths: `create(longUrl) -> code` and `resolve(code) -> longUrl`.

**Constraints**

- Target `10^4` creations/day and `10^7` redirects/day; plan for 5 years of codes.
- Redirect p99 latency < 10 ms.
- Codes are short (aim `<= 7` characters) and must not be guessable in sequence if that is a
  stated requirement — state your assumption.

**Deliverable**

A `SOLUTION.md` (or similar) with the five sections above plus one diagram (ASCII is fine)
showing the create and resolve flows through cache and database.
