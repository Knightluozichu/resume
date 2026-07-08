import type { ReviewQuestion } from "./types";

/** 加密与模运算 复习题 */
export const pmEncryptionQuestions: ReviewQuestion[] = [
  {
    id: "pm-encryption-1",
    chapter: "pm-encryption",
    level: 1,
    question: "RSA 加密和解密的公式分别是什么？",
    answer: "加密 c = m^e mod n（公钥(e,n)），解密 m = c^d mod n（私钥(d,n)）。e 是公钥指数，d 是私钥指数，n=pq。",
    tags: ["RSA", "公式"],
  },
  {
    id: "pm-encryption-2",
    chapter: "pm-encryption",
    level: 2,
    question: "RSA 安全性依赖什么数学难题？",
    answer: "大整数分解。已知 n=pq，求 p 和 q。目前无多项式时间算法，2048 位 n 的分解需要数千年。量子计算机的 Shor 算法可能破解。",
    tags: ["RSA", "安全性"],
  },
  {
    id: "pm-encryption-3",
    chapter: "pm-encryption",
    level: 3,
    question: "欧拉定理的内容是什么？在 RSA 中的作用是什么？",
    answer: "若 gcd(a,n)=1，则 a^φ(n) ≡ 1 (mod n)。RSA 中保证 m^(ed) ≡ m (mod n)：因 ed ≡ 1 (mod φ(n))，故 m^(ed) = m^(1+kφ(n)) = m·(m^φ(n))^k ≡ m·1 = m。",
    tags: ["欧拉定理", "RSA"],
  },
  {
    id: "pm-encryption-4",
    chapter: "pm-encryption",
    level: 4,
    question: "为什么 RSA 不直接加密大数据？",
    answer: "明文 m 必须 < n。大 m 需要大 n，加密变慢。实际用混合加密：RSA 加密对称密钥（如AES密钥），对称加密加密数据。兼顾安全性和效率。",
    tags: ["RSA", "混合加密"],
  },
];
