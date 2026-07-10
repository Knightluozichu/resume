import type { ReviewQuestion } from "./types";

/** 字符串算法：KMP、字典树与 AC 自动机 复习题 */
export const caStringAlgosQuestions: ReviewQuestion[] = [
  {
    id: "ca-string-algos-1",
    chapter: "ca-string-algos",
    level: 1,
    question: `KMP 算法的总时间复杂度是多少？`,
    answer: `O(n+m)。预处理 next 数组 O(m)，匹配 O(n)。n 是主串长度，m 是模式串长度。`,
    tags: ["KMP", "复杂度"],
  },
  {
    id: "ca-string-algos-2",
    chapter: "ca-string-algos",
    level: 2,
    question: `next 数组的含义是什么？`,
    answer: `next[i] 表示模式串 [0..i] 的最长相等前后缀长度。即模式串前缀和后缀相同的最大长度。用于失配时确定跳转位置。`,
    tags: ["next数组"],
  },
  {
    id: "ca-string-algos-3",
    chapter: "ca-string-algos",
    level: 3,
    question: `字典树（Trie）的插入和查找复杂度？`,
    answer: `O(L)，L 为字符串长度。插入逐字符走树，不存在则创建。查找逐字符走树，走到末尾则存在。与字符串数量无关。`,
    tags: ["字典树", "复杂度"],
  },
  {
    id: "ca-string-algos-4",
    chapter: "ca-string-algos",
    level: 4,
    question: `AC 自动机和 KMP 的关系是什么？`,
    answer: `KMP 是单模式匹配，用 next 数组处理失配。AC 自动机是多模式匹配，在字典树上为每个节点构建 fail 指针（类似 next），本质是把 KMP 失配机制从链扩展到树。`,
    tags: ["AC自动机", "对比"],
  },
];
