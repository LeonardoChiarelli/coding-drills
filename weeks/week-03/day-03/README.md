# Week 03 — Day 03

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 3 dataStructures

---

## 1. Basic Calculator II
**Pillar:** logic
**Language:** C
**Difficulty:** Intermediate

### Problem
Given a string `s` representing an arithmetic expression, evaluate it and
return the integer result. The expression contains non-negative integers and
the operators `+`, `-`, `*`, `/`, separated by optional spaces. There are no
parentheses. Multiplication and division bind tighter than addition and
subtraction, and are applied left to right. Integer division truncates toward
zero.

### Example
```
Input:  "3+2*2"
Output: 7

Input:  " 3/2 "
Output: 1

Input:  " 3+5 / 2 "
Output: 5        // 3 + (5/2) = 3 + 2

Input:  "14-3/2"
Output: 13
```

### Constraints
- `1 <= strlen(s) <= 3 * 10^5`; only digits, `+`, `-`, `*`, `/` and spaces.
- The expression is always valid; every intermediate result and the final
  answer fit in a 32-bit signed integer.
- Single pass, O(1) extra space beyond a running `prev` operand — do not
  tokenize into an array first, and do not build an expression tree.
- No `eval`-style shortcuts and no recursion on sub-expressions.

---

## 2. Minimum Time Difference
**Pillar:** logic
**Language:** Kotlin
**Difficulty:** Intermediate

### Problem
Given a list of 24-hour clock time points in `"HH:MM"` format, return the
smallest number of minutes between any two time points in the list. The clock
is circular: `"23:59"` and `"00:00"` are 1 minute apart, not 1439. Duplicate
time points mean the answer is 0.

### Example
```
Input:  ["23:59", "00:00"]
Output: 1

Input:  ["00:00", "23:59", "00:00"]
Output: 0

Input:  ["01:01", "02:01", "03:00"]
Output: 59
```

### Constraints
- `2 <= timePoints.size <= 20,000`; each entry is a valid `"HH:MM"` string.
- Convert to minutes-since-midnight, sort, then compare adjacent pairs plus
  the wrap-around pair (`first + 1440 - last`).
- There are only 1440 distinct times — if the list is longer than 1440 the
  answer is 0 by pigeonhole. Handle that as an early exit.
- No date/time library parsing; slice the string yourself.

---

## 3. Reorganize String
**Pillar:** logic
**Language:** Rust
**Difficulty:** Intermediate

### Problem
Given a string `s`, rearrange its characters so that no two adjacent
characters are the same. Return any valid rearrangement, or an empty string
if none exists. A rearrangement is impossible exactly when some character
occurs more than `(n + 1) / 2` times. The greedy insight: place the most
frequent characters first, always alternating away from the last one placed.

### Example
```
Input:  "aab"
Output: "aba"

Input:  "aaab"
Output: ""          // 'a' occurs 3 times, (4+1)/2 = 2

Input:  "vvvlo"
Output: "vlvov"     // any valid answer accepted
```

### Constraints
- `1 <= s.len() <= 500`; lowercase English letters only.
- O(n log 26) with a max-heap on counts, or O(n) with the even/odd index
  fill trick (place the most frequent char at indices 0, 2, 4, ... first).
- Return the empty string for the impossible case; do not panic.
- No shuffling-and-retrying.

---

## 4. Score of Parentheses
**Pillar:** logic
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
Given a balanced parentheses string `s`, compute its score by these rules:
- `"()"` has score 1.
- `AB` has score `A + B`, where `A` and `B` are balanced strings.
- `(A)` has score `2 * A`, where `A` is a balanced string.

### Example
```
Input:  "()"
Output: 1

Input:  "(())"
Output: 2

Input:  "()()"
Output: 2

Input:  "(()(()))"
Output: 6        // 2*(1 + 2*1)
```

### Constraints
- `2 <= s.length <= 50`; `s` contains only `(` and `)` and is always balanced.
- O(n) time. Either a stack of partial scores, or the O(1)-space depth trick:
  every `"()"` at depth `d` contributes `2^d`.
- No string rewriting / regex-replace loops.
- If you use the depth trick, state in a comment why only the innermost
  `"()"` pairs contribute.

---

## 5. Word Break
**Pillar:** algorithms
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Given a string `s` and a dictionary `wordDict`, return `true` if `s` can be
segmented into a space-separated sequence of one or more dictionary words.
Words may be reused any number of times. You do not need to return the
segmentation itself — only whether one exists.

### Example
```
Input:  s = "leetcode", wordDict = ["leet", "code"]
Output: true

Input:  s = "applepenapple", wordDict = ["apple", "pen"]
Output: true      // "apple" reused

Input:  s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
```

### Constraints
- `1 <= s.length <= 300`; `1 <= wordDict.length <= 1000`; each word has
  length `<= 20`; lowercase English letters only.
- DP over prefixes: `dp[i]` = "the first `i` characters are segmentable".
  O(n² · L) worst case with a `Set` for O(1) dictionary lookups.
- Plain recursion without memoization is rejected — it blows up on inputs
  like `"aaaaaaaaaaaaaaaaaaaab"` with `["a","aa","aaa","aaaa"]`.

---

## 6. Accounts Merge
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
Each account is a list `[name, email1, email2, ...]`. Two accounts belong to
the same person if they share at least one email — even if the names differ,
and even if the link is indirect (A shares an email with B, B shares a
different email with C, so A, B and C are one person). Two accounts with the
same name but no shared email are different people. Return the merged
accounts: each as `[name, ...sorted unique emails]`, in any order.

### Example
```
Input:
  [["John", "a@m.co", "b@m.co"],
   ["John", "b@m.co", "c@m.co"],
   ["Mary", "mary@m.co"],
   ["John", "z@m.co"]]

Output (order of accounts irrelevant):
  [["John", "a@m.co", "b@m.co", "c@m.co"],
   ["Mary", "mary@m.co"],
   ["John", "z@m.co"]]
```

### Constraints
- `1 <= accounts.length <= 1000`; each account has at most 10 emails.
- Union-Find over emails (or DFS over an email graph). Transitive merging is
  the whole point — a single pass of pairwise comparison is wrong.
- Emails within each output account must be sorted lexicographically; the
  name is not part of the sort.
- Use path compression + union by rank/size if you go the DSU route.

---

## 7. Minimum Window Substring
**Pillar:** algorithms
**Language:** C++
**Difficulty:** Intermediate

### Problem
Given strings `s` and `t`, return the shortest contiguous substring of `s`
that contains every character of `t` including duplicates. If no such window
exists, return `""`. The window may contain extra characters, and the
characters of `t` need not appear in order.

### Example
```
Input:  s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Input:  s = "a", t = "a"
Output: "a"

Input:  s = "a", t = "aa"
Output: ""        // only one 'a' available
```

### Constraints
- `1 <= s.length, t.length <= 10^5`; upper and lowercase English letters.
- O(|s| + |t|) with a sliding window plus a `have`/`need` counter — expand
  right until the window is valid, then shrink left while it stays valid.
- Duplicates in `t` must be respected: `t = "aa"` needs two `'a'`s.
- The answer is guaranteed unique when it exists.
- No O(|s|²) substring enumeration.

---

## 8. LFU Cache
**Pillar:** dataStructures
**Language:** Go
**Difficulty:** Intermediate

### Problem
Implement a Least-Frequently-Used cache with a fixed `capacity`:
- `Get(key)` — return the value, or -1 if absent. Counts as a use.
- `Put(key, value)` — insert or update. Updating counts as a use. When at
  capacity and inserting a new key, evict the key with the smallest use
  count; break ties by evicting the least recently used among them.

### Example
```
c := Constructor(2)
c.Put(1, 1)          // counts: {1:1}
c.Put(2, 2)          // counts: {1:1, 2:1}
c.Get(1)      -> 1   // counts: {1:2, 2:1}
c.Put(3, 3)          // evicts key 2 (count 1, lowest)
c.Get(2)      -> -1
c.Get(3)      -> 3   // counts: {1:2, 3:2}
c.Put(4, 4)          // tie at count 2: evict 1, the LRU of the two
c.Get(1)      -> -1
c.Get(3)      -> 3
c.Get(4)      -> 4
```

### Constraints
- `0 <= capacity <= 10,000`; up to 200,000 total calls; capacity 0 means
  every `Put` is a no-op and every `Get` returns -1.
- Both `Get` and `Put` must be **O(1) average**. A heap (O(log n)) or a scan
  over all entries is rejected.
- Suggested structure: `map[key]*node`, `map[freq]*list` of nodes ordered by
  recency, and a `minFreq` counter maintained incrementally.

---

## 9. Range Minimum Query with Segment Tree
**Pillar:** dataStructures
**Language:** C#
**Difficulty:** Intermediate

### Problem
Build a segment tree over an integer array supporting:
- `SegmentTree(int[] nums)` — build from the initial array.
- `Update(int index, int val)` — set `nums[index] = val`.
- `QueryMin(int left, int right)` — return the minimum over the inclusive
  range `[left, right]`.

### Example
```
var st = new SegmentTree(new[] { 5, 2, 7, 1, 9, 3 });
st.QueryMin(0, 5)   -> 1
st.QueryMin(0, 2)   -> 2
st.Update(3, 8)            // array is now { 5, 2, 7, 8, 9, 3 }
st.QueryMin(0, 5)   -> 2
st.QueryMin(3, 4)   -> 8
```

### Constraints
- `1 <= nums.Length <= 100,000`; `-10^9 <= nums[i], val <= 10^9`; up to
  100,000 calls to `Update` + `QueryMin` combined.
- Build O(n); `Update` O(log n); `QueryMin` O(log n). Recomputing a range
  minimum by scanning is rejected.
- An iterative bottom-up tree in a flat array is fine; so is the recursive
  form. Either way, no `List<>` of children objects per node.
- A Fenwick/BIT does not directly support min with updates — do not reach for
  one here; explain in a comment why prefix-min breaks under `Update`.

---

## 10. Design a Text Editor
**Pillar:** dataStructures
**Language:** Python
**Difficulty:** Intermediate

### Problem
Implement a text editor with a cursor, supporting:
- `add_text(text)` — insert `text` at the cursor; the cursor ends up right
  after the inserted text.
- `delete_text(k)` — delete up to `k` characters to the left of the cursor;
  return how many were actually deleted.
- `cursor_left(k)` — move the cursor left up to `k` times; return the last
  min(10, len) characters to the left of the cursor.
- `cursor_right(k)` — move the cursor right up to `k` times; return the last
  min(10, len) characters to the left of the cursor.

Moving past either end clamps at that end.

### Example
```
ed = TextEditor()
ed.add_text("leetcode")        # "leetcode|"
ed.delete_text(4)       -> 4   # "leet|"
ed.add_text("practice")        # "leetpractice|"
ed.cursor_right(3)      -> "etpractice"    # already at the end, clamps
ed.cursor_left(8)       -> "leet"          # "leet|practice"
ed.delete_text(10)      -> 4   # "|practice", only 4 chars were left
ed.cursor_left(2)       -> ""  # already at the start
ed.cursor_right(6)      -> "practi"
```

### Constraints
- `1 <= len(text) <= 40` per `add_text`; `1 <= k <= 40`; up to 20,000 total
  calls; lowercase English letters only.
- Two stacks (left of cursor, right of cursor) give O(len(text)) per
  `add_text` and O(k) per move/delete. A single Python string with slicing is
  O(n) per edit and is rejected at this call volume.
- All four methods return exactly what is specified — note that
  `delete_text` returns a count while the cursor moves return a string.
