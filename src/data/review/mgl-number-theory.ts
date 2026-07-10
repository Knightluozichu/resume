import type { ReviewQuestion } from "./types";

/** 数论 复习题 */
export const mglNumberTheoryQuestions: ReviewQuestion[] = [
  {
    id: "mgl-number-theory-1",
    chapter: "mgl-number-theory",
    level: 1,
    question: `欧几里得算法求 gcd(48, 18) 的结果是？`,
    answer: `6。gcd(48,18)→gcd(18,12)→gcd(12,6)→gcd(6,0)=6。辗转相除：48=2×18+12, 18=1×12+6, 12=2×6+0。`,
    tags: ["欧几里得算法", "GCD"],
  },
  {
    id: "mgl-number-theory-2",
    chapter: "mgl-number-theory",
    level: 2,
    question: `RSA 密码学的安全性基于什么数学难题？`,
    answer: `大数分解的困难性。RSA 安全性基于大数分解困难：已知 n=pq 求 p,q 很难。攻击者需分解 n 才能求 φ(n) 和私钥 d。`,
    tags: ["RSA", "大数分解"],
  },
  {
    id: "mgl-number-theory-3",
    chapter: "mgl-number-theory",
    level: 3,
    question: `欧拉定理 a^φ(n)≡1 (mod n) 的前提条件是？`,
    answer: `gcd(a,n)=1。欧拉定理要求 a 与 n 互质（gcd(a,n)=1）。此时 a^φ(n)≡1 (mod n)，这是 RSA 解密正确的数学保证。`,
    tags: ["欧拉定理", "模运算"],
  },
  {
    id: "mgl-number-theory-4",
    chapter: "mgl-number-theory",
    level: 4,
    question: `模逆元 a^(-1) mod m 存在的条件是？`,
    answer: `gcd(a,m)=1。模逆元存在当且仅当 gcd(a,m)=1（a 与 m 互质）。用扩展欧几里得算法求 ax+my=1 的解 x。`,
    tags: ["模逆元", "扩展欧几里得"],
  },
];
