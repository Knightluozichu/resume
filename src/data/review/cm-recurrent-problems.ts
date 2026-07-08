import type { ReviewQuestion } from "./types";

/** 递归问题：汉诺塔、Josephus 与成套方法 复习题 */
export const cmRecurrentProblemsQuestions: ReviewQuestion[] = [
  {
    id: "cm-recurrent-problems-1",
    chapter: "cm-recurrent-problems",
    level: 1,
    question: "汉诺塔的递归和闭式分别是什么？",
    answer: "递归 T(n)=2T(n-1)+1，闭式 T(n)=2^n-1。",
    tags: ["汉诺塔"],
  },
  {
    id: "cm-recurrent-problems-2",
    chapter: "cm-recurrent-problems",
    level: 2,
    question: "Josephus 问题的闭式怎么求？",
    answer: "设 n=2^m+l（0≤l<2^m），则 J(n)=2l+1。关键是用 2 的幂做自然分解。",
    tags: ["Josephus"],
  },
  {
    id: "cm-recurrent-problems-3",
    chapter: "cm-recurrent-problems",
    level: 3,
    question: "成套方法的三个步骤是什么？",
    answer: "1. 把通解设为参数线性组合 f(n)=Aα+Bβ+Cγ；2. 用已知特例（如 f(1), f(2), f(3)）列出方程解 A,B,C；3. 猜测 A,B,C 关于 n=2^m+l 的表达式并归纳验证。",
    tags: ["成套方法"],
  },
  {
    id: "cm-recurrent-problems-4",
    chapter: "cm-recurrent-problems",
    level: 4,
    question: "Josephus 问题 J(2n)=2J(n)-1, J(2n+1)=2J(n)+1 的递推是怎么来的？",
    answer: "偶数 2n 人：第一轮淘汰所有奇数位（2,4,...被淘汰？不，看具体规则），剩余 n 人重新编号为 1..n，幸存者在原圈的位置为 2J(n)-1。奇数 2n+1 人：先淘汰奇数位剩 n 人，然后 1 号也被淘汰，偏移导致 +1，得 2J(n)+1。",
    tags: ["推导", "Josephus"],
  },
];
