import type { ReviewQuestion } from "./types";

/** 字符串算法 复习题 */
export const al4StringsQuestions: ReviewQuestion[] = [
  {
    id: "al4-strings-1",
    chapter: "al4-strings",
    level: 1,
    question: `KMP算法的时间复杂度？为什么？`,
    answer: `O(n+m)。预处理模式串O(m)，搜索文本O(n)。匹配失败时用next数组跳过不可能位置，文本指针不回退。`,
    tags: ["KMP"],
  },
  {
    id: "al4-strings-2",
    chapter: "al4-strings",
    level: 2,
    question: `Trie树的查找复杂度？与什么有关？`,
    answer: `O(L)，L为键长度，与集合大小无关。每个字符沿树走一步。适合前缀匹配和自动补全。`,
    tags: ["Trie"],
  },
  {
    id: "al4-strings-3",
    chapter: "al4-strings",
    level: 3,
    question: `LSD和MSD基数排序各适合什么场景？`,
    answer: `LSD适合等长字符串（从右到左稳定排序）。MSD适合不等长字符串（从左到右递归分桶）。都是O(n*L)非比较排序。`,
    tags: ["LSD", "MSD"],
  },
  {
    id: "al4-strings-4",
    chapter: "al4-strings",
    level: 4,
    question: `对比KMP、Boyer-Moore、Rabin-Karp三种字符串查找算法。`,
    answer: `KMP：O(n+m)最坏保证，DFA避免回退。Boyer-Moore：从右向左+跳跃表，实际最快但最坏O(n*m)。Rabin-Karp：哈希滚动，适合多模式匹配。选择：需最坏保证用KMP，追求实际速度用BM，多模式匹配用RK。`,
    tags: ["综合", "字符串查找", "对比"],
  },
];
