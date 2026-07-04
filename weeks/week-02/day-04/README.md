# Week 02 — Day 04

Difficulty baseline: **Intermediate** (0.50)

10 exercises: 4 logic · 3 algorithms · 2 dataStructures · 1 architecture (Friday challenge)

---

## 1. Josephus Survivor
**Pillar:** logic
**Language:** Python
**Difficulty:** Intermediate

### Problem
`n` people stand in a circle, numbered `1` to `n`. Starting the count at person `1`,
every `k`-th person is eliminated and the circle closes. Counting resumes from the
next person still in the circle. Return the number of the last person remaining.
Aim for an O(n) solution rather than simulating with repeated list deletions.

### Example
```
Input:  n = 7, k = 3
Output: 4

Input:  n = 1, k = 5
Output: 1
```

### Constraints
- `1 <= n <= 10^6`.
- `1 <= k <= 10^6`.
- The answer is always a number between `1` and `n`.

---

## 2. Water Jug Measuring
**Pillar:** logic
**Language:** JavaScript
**Difficulty:** Intermediate

### Problem
You have two jugs with capacities `a` and `b` liters and an unlimited water supply.
The allowed operations are: fill a jug completely, empty a jug completely, or pour
one jug into the other until the source is empty or the destination is full. Return
`true` if it is possible to end up with exactly `target` liters measured across the
two jugs combined, `false` otherwise. Think about what invariant the operations
preserve before reaching for a search.

### Example
```
Input:  a = 3, b = 5, target = 4
Output: true

Input:  a = 2, b = 6, target = 5
Output: false
```

### Constraints
- `1 <= a, b <= 10^6`.
- `0 <= target <= 2 * 10^6`.
- The solution must run in O(log(min(a, b))) time (no state-space search).

---

## 3. Minesweeper Number Fill
**Pillar:** logic
**Language:** Go
**Difficulty:** Intermediate

### Problem
Given a rectangular grid where each cell is either `'*'` (a mine) or `'.'` (empty),
return the same grid with every empty cell replaced by the count of mines in its
up-to-8 neighboring cells (as a character `'0'`–`'8'`). Mine cells stay `'*'`.

### Example
```
Input:
* . .
. . *
. . .

Output:
* 2 1
1 2 *
0 1 1
```

### Constraints
- `1 <= rows, cols <= 500`.
- The grid contains only `'*'` and `'.'`.
- Corner and edge cells have fewer than 8 neighbors; do not read out of bounds.

---

## 4. Fraction to Recurring Decimal
**Pillar:** logic
**Language:** C#
**Difficulty:** Intermediate

### Problem
Given two integers `numerator` and `denominator`, return the fraction as a decimal
string. If the fractional part repeats, enclose the repeating block in parentheses.
Handle signs correctly and avoid floating-point arithmetic entirely — perform long
division tracking remainders you have already seen.

### Example
```
Input:  numerator = 4, denominator = 333
Output: "0.(012)"

Input:  numerator = -50, denominator = 8
Output: "-6.25"
```

### Constraints
- `-2^31 <= numerator, denominator <= 2^31 - 1`, `denominator != 0`.
- Watch for `int` overflow when negating `-2^31`; use 64-bit intermediates.
- The output must have no unnecessary leading zeros or empty parentheses.

---

## 5. Longest Substring Without Repeating Characters
**Pillar:** algorithms
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Given a string `s`, return the length of the longest contiguous substring that
contains no repeated characters. Use a sliding window with a map of last-seen
indices so each character is processed at most twice.

### Example
```
Input:  s = "abcabcbb"
Output: 3        // "abc"

Input:  s = "bbbbb"
Output: 1        // "b"
```

### Constraints
- `0 <= s.length <= 5 * 10^4`.
- `s` may contain any printable ASCII characters.
- Required time complexity: O(n); an O(n^2) double loop does not count.

---

## 6. Word Ladder
**Pillar:** algorithms
**Language:** Java
**Difficulty:** Intermediate

### Problem
Given `beginWord`, `endWord`, and a dictionary `wordList`, return the length of the
shortest transformation sequence from `beginWord` to `endWord` such that each step
changes exactly one letter and every intermediate word exists in `wordList`. Return
`0` if no such sequence exists. `beginWord` does not need to be in the list;
`endWord` does. Model the words as an implicit graph and use BFS.

### Example
```
Input:  beginWord = "hit", endWord = "cog",
        wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5        // hit -> hot -> dot -> dog -> cog

Input:  beginWord = "hit", endWord = "cog",
        wordList = ["hot","dot","dog","lot","log"]
Output: 0
```

### Constraints
- `1 <= beginWord.length <= 10`; all words have the same length.
- `1 <= wordList.length <= 5000`; lowercase English letters only.
- Comparing every pair of words is O(n^2 * L) and will be too slow for the upper
  bound; generalize with wildcard buckets (`h*t`, `*it`, `hi*`).

---

## 7. House Robber
**Pillar:** algorithms
**Language:** Rust
**Difficulty:** Intermediate

### Problem
Given a list of non-negative integers `nums` representing the amount of money in
each house along a street, return the maximum amount you can rob without ever
robbing two adjacent houses. Solve it with dynamic programming in O(n) time and
O(1) extra space (two rolling variables, no full DP table).

### Example
```
Input:  nums = [2, 7, 9, 3, 1]
Output: 12       // 2 + 9 + 1

Input:  nums = [5]
Output: 5
```

### Constraints
- `0 <= nums.len() <= 10^5`.
- `0 <= nums[i] <= 10^4`.
- An empty street yields `0`.

---

## 8. Design HashMap
**Pillar:** dataStructures
**Language:** Go
**Difficulty:** Intermediate

### Problem
Implement a hash map for integer keys and values from scratch — do not use the
built-in `map`. Support `Put(key, value)`, `Get(key)` (return `-1` if absent), and
`Remove(key)`. Use an array of buckets with separate chaining, and resize (double
the bucket count and rehash) when the load factor exceeds `0.75`.

### Example
```
m := NewMyHashMap()
m.Put(1, 10)
m.Put(2, 20)
m.Get(1)     // 10
m.Get(3)     // -1
m.Put(2, 30) // update existing key
m.Get(2)     // 30
m.Remove(2)
m.Get(2)     // -1
```

### Constraints
- `0 <= key, value <= 10^6`.
- Up to `10^5` operations will be performed.
- `Put` on an existing key overwrites its value; average O(1) per operation.

---

## 9. Median Finder (Two Heaps)
**Pillar:** dataStructures
**Language:** Python
**Difficulty:** Intermediate

### Problem
Design a data structure that supports adding numbers from a stream and returning
the median of all numbers added so far. Implement `add_num(num)` in O(log n) and
`find_median()` in O(1) by maintaining a max-heap for the lower half and a
min-heap for the upper half, kept balanced within one element.

### Example
```
mf = MedianFinder()
mf.add_num(1)
mf.add_num(2)
mf.find_median()  # 1.5
mf.add_num(3)
mf.find_median()  # 2.0
```

### Constraints
- `-10^5 <= num <= 10^5`; up to `5 * 10^4` calls in total.
- `find_median` may be called at any point after at least one `add_num`.
- Return a float; the median of an even count is the mean of the two middle values.

---

## 10. Architecture Challenge: In-Memory Pub/Sub Message Broker
**Pillar:** architecture
**Language:** TypeScript
**Difficulty:** Intermediate

### Problem
Design and implement a single-process publish/subscribe message broker library.
Producers publish messages to named topics; consumers subscribe to topics through
named **consumer groups**. Requirements:

1. `publish(topic, payload)` appends the message to the topic's ordered log and
   returns a monotonically increasing offset per topic.
2. `subscribe(topic, group, handler)` registers a consumer. Messages on a topic are
   delivered to **every group**, but within one group each message is delivered to
   **exactly one** consumer (round-robin or similar).
3. Each group tracks its own committed offset per topic: a consumer must call
   `ack(topic, group, offset)`; unacked messages are redelivered after a
   configurable `visibilityTimeoutMs`.
4. A new group subscribing to an existing topic can choose to start `"earliest"`
   (replay the whole log) or `"latest"` (only new messages).
5. Bound memory: a topic's log is compacted by dropping messages already acked by
   **all** known groups, once the log exceeds `maxLogSize`.

Before coding, write a short design section in comments or a companion note: data
model per topic/group, how redelivery timers work, and what trade-offs you made
versus a real broker (persistence, partitions, backpressure).

### Example
```
const broker = new Broker({ visibilityTimeoutMs: 5000, maxLogSize: 1000 });
broker.subscribe("orders", "billing",  (m) => { /* charge */  broker.ack("orders", "billing",  m.offset); });
broker.subscribe("orders", "shipping", (m) => { /* ship   */  broker.ack("orders", "shipping", m.offset); });
const offset = broker.publish("orders", { id: 42 }); // delivered to BOTH groups
```

### Constraints
- Single process, in-memory only; no external dependencies beyond the standard library.
- Delivery within a group must preserve per-topic publish order for a single consumer.
- An unacked message must be redelivered to the same group (any consumer) after the
  visibility timeout, and must never be delivered twice concurrently within a group.
- Include at least a brief usage example or test demonstrating two groups consuming
  the same topic independently.
