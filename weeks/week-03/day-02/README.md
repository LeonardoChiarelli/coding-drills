# Week 03 — Day 02

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 3 dataStructures

---

## 1. Evaluate Reverse Polish Notation
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
Given an array of string tokens representing an arithmetic expression in
Reverse Polish (postfix) notation, evaluate it and return the integer result.
Valid operators are `+`, `-`, `*`, `/`. Each operand may be an integer or the
result of a previous operation. Division between two integers truncates toward
zero (e.g. `-7 / 2 = -3`).

### Example
```
Input:  ["2","1","+","3","*"]
Output: 9        // (2 + 1) * 3

Input:  ["4","13","5","/","+"]
Output: 6        // 4 + (13 / 5)

Input:  ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
```

### Constraints
- `1 <= tokens.length <= 10,000`; the expression is always valid.
- Operands fit in a 32-bit signed integer; intermediate results do too.
- Use an explicit stack; a single pass over the tokens; O(n) time.

---

## 2. Simplify Unix File Path
**Pillar:** logic
**Language:** Rust
**Difficulty:** Intermediate

### Problem
Given an absolute Unix-style file path, return its canonical form. Rules:
`.` refers to the current directory (skip it), `..` moves one directory up,
multiple consecutive slashes collapse into one, and the canonical path never
ends with a trailing slash (unless it is the root `/`). Any name that is not
exactly `.` or `..` (e.g. `...` or `..hidden`) is a valid directory name.

### Example
```
Input:  "/home/"
Output: "/home"

Input:  "/a/./b/../../c/"
Output: "/c"

Input:  "/../"
Output: "/"

Input:  "/.../a/../b/c/../d/./"
Output: "/.../b/d"
```

### Constraints
- `1 <= path.length <= 3000`; `path` always starts with `/`.
- Consists of letters, digits, `.`, `/` and `_`.
- Split on `/`, process segments with a stack; O(n) time and space.

---

## 3. Integer to English Words
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
Convert a non-negative integer to its English words representation. Group the
number into chunks of three digits (thousands, millions, billions), spell each
chunk, and join with the correct scale word. Mind the irregular teens
(`Eleven`, `Twelve`, ... `Nineteen`) and that empty chunks produce no output
(e.g. `1,000,010` has no "Thousand-something" gap words).

### Example
```
Input:  123
Output: "One Hundred Twenty Three"

Input:  12345
Output: "Twelve Thousand Three Hundred Forty Five"

Input:  1000010
Output: "One Million Ten"

Input:  0
Output: "Zero"
```

### Constraints
- `0 <= num <= 2^31 - 1`.
- Forbidden: any number-to-words library (`num2words` etc.). Pure lookup
  tables + recursion or iteration.
- Output uses single spaces, no hyphens, no "and".

---

## 4. Dota2 Senate
**Pillar:** logic
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
A senate consists of senators from two parties, given as a string of `'R'`
(Radiant) and `'D'` (Dire). Voting proceeds in rounds, left to right. On a
senator's turn they may permanently ban one senator of the opposing party
(any of them, acting optimally). Banned senators skip all future rounds.
Rounds repeat in the same order until only one party remains. Return the
winning party: `"Radiant"` or `"Dire"`. The key insight: each senator should
always ban the *next* opposing senator that would act after them.

### Example
```
Input:  "RD"
Output: "Radiant"   // R bans D, R wins

Input:  "RDD"
Output: "Dire"      // R bans first D, second D bans R, D wins

Input:  "DDRRR"
Output: "Dire"
```

### Constraints
- `1 <= senate.length <= 10,000`; only characters `'R'` and `'D'`.
- Simulate with two queues of indices (one per party); O(n) amortized per
  round, overall O(n) with the index + n re-queue trick.
- No brute-force re-scanning the string every round.

---

## 5. Daily Temperatures
**Pillar:** algorithms
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Given an array `temperatures` of daily temperatures, return an array `answer`
where `answer[i]` is the number of days you have to wait after day `i` to get
a warmer temperature. If no future day is warmer, `answer[i] = 0`.

### Example
```
Input:  [73, 74, 75, 71, 69, 72, 76, 73]
Output: [ 1,  1,  4,  2,  1,  1,  0,  0]

Input:  [30, 40, 50, 60]
Output: [ 1,  1,  1,  0]

Input:  [30, 60, 90]
Output: [ 1,  1,  0]
```

### Constraints
- `1 <= temperatures.length <= 100,000`; `30 <= temperatures[i] <= 100`.
- O(n) with a monotonic stack of indices. The O(n²) nested loop is rejected.
- Each index is pushed and popped at most once — argue why in a comment.

---

## 6. Find All Anagrams in a String
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
Given two strings `s` and `p`, return all start indices of `p`'s anagrams in
`s`, in ascending order. An anagram uses exactly the same character counts in
any order. Slide a window of length `p.length()` across `s`, maintaining a
frequency delta so each step is O(1) instead of recomparing full histograms.

### Example
```
Input:  s = "cbaebabacd", p = "abc"
Output: [0, 6]      // "cba" at 0, "bac" at 6

Input:  s = "abab", p = "ab"
Output: [0, 1, 2]
```

### Constraints
- `1 <= s.length, p.length <= 30,000`; lowercase English letters only.
- O(|s|) time, O(1) extra space (26-slot count arrays).
- No sorting inside the loop, no per-window histogram rebuild.

---

## 7. Decode Ways
**Pillar:** algorithms
**Language:** C++
**Difficulty:** Intermediate

### Problem
A message of letters `A-Z` was encoded with `A=1, B=2, ... Z=26` and you
receive only the digit string. Return how many ways it can be decoded.
A `'0'` is never a valid single letter — it must pair with a preceding `1`
or `2` (`10`, `20`); otherwise the whole string decodes 0 ways. Classic DP:
ways(i) depends on whether `s[i-1]` and `s[i-2..i-1]` form valid letters.

### Example
```
Input:  "12"
Output: 2        // "AB" (1,2) or "L" (12)

Input:  "226"
Output: 3        // (2,2,6), (22,6), (2,26)

Input:  "06"
Output: 0

Input:  "1123"
Output: 5
```

### Constraints
- `1 <= s.length <= 100`; digits only (may contain `'0'`).
- O(n) time; O(1) space (two rolling variables, not a full DP array).
- Answer fits in a 32-bit signed integer.

---

## 8. Design Twitter
**Pillar:** dataStructures
**Language:** C#
**Difficulty:** Intermediate

### Problem
Design a simplified Twitter supporting these operations:
- `PostTweet(userId, tweetId)` — user posts a tweet (a global logical
  timestamp orders all tweets).
- `GetNewsFeed(userId)` — return the 10 most recent tweet ids in the feed of
  this user (their own tweets plus tweets by users they follow), most recent
  first.
- `Follow(followerId, followeeId)` / `Unfollow(followerId, followeeId)`.

Merge the followees' tweet lists with a max-heap (priority queue) seeded with
each followee's latest tweet — do not concatenate and sort everything.

### Example
```
PostTweet(1, 5)
GetNewsFeed(1)      -> [5]
Follow(1, 2)
PostTweet(2, 6)
GetNewsFeed(1)      -> [6, 5]
Unfollow(1, 2)
GetNewsFeed(1)      -> [5]
```

### Constraints
- `1 <= userId, tweetId <= 10,000`; up to 30,000 total operations.
- Users may follow themselves or unfollow someone they never followed —
  both are no-ops that must not throw.
- `GetNewsFeed` must be O(F log F + 10 log F) where F = number of followees,
  not O(total tweets).

---

## 9. Add and Search Words (Trie + Wildcards)
**Pillar:** dataStructures
**Language:** Go
**Difficulty:** Intermediate

### Problem
Design a data structure supporting:
- `AddWord(word)` — store a word.
- `Search(word)` — return true if any stored word matches. The query may
  contain the wildcard `'.'`, which matches exactly one arbitrary letter.

Build a trie; on a `'.'` branch into all children (DFS/backtracking). A plain
map of words is rejected — wildcard search must prune by prefix.

### Example
```
AddWord("bad"); AddWord("dad"); AddWord("mad")
Search("pad")  -> false
Search("bad")  -> true
Search(".ad")  -> true
Search("b..")  -> true
Search("b...") -> false
```

### Constraints
- `1 <= word.length <= 25`; lowercase letters; queries have at most 2 dots.
- Up to 10,000 calls total to `AddWord` + `Search`.
- `AddWord` O(L); `Search` worst case O(26^dots · L).

---

## 10. Snapshot Array
**Pillar:** dataStructures
**Language:** Python
**Difficulty:** Intermediate

### Problem
Implement a `SnapshotArray`:
- `__init__(length)` — array of given length, all elements initially 0.
- `set(index, val)` — set element at `index` to `val`.
- `snap()` — take a snapshot, return the snapshot id (number of prior `snap`
  calls, starting at 0).
- `get(index, snap_id)` — return the value at `index` as of snapshot
  `snap_id`.

Copying the whole array on each snap is rejected: store, per index, a list of
`(snap_id, value)` changes and binary-search it in `get`.

### Example
```
arr = SnapshotArray(3)
arr.set(0, 5)
arr.snap()          -> 0
arr.set(0, 6)
arr.get(0, 0)       -> 5
arr.snap()          -> 1
arr.get(0, 1)       -> 6
arr.get(1, 0)       -> 0
```

### Constraints
- `1 <= length <= 50,000`; up to 50,000 total calls; `0 <= val <= 10^9`.
- `set` amortized O(1); `snap` O(1); `get` O(log S) where S = number of
  changes recorded for that index (use `bisect`).
- Memory proportional to number of `set` calls, not `length × snapshots`.
