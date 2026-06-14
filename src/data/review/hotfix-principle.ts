import type { ReviewQuestion } from "./types";
export const hotfixPrincipleQuestions: ReviewQuestion[] = [
  { id: "hf-1", chapter: "hotfix-principle", level: 1, question: "热修复的三种方案各是什么？代表框架？", answer: "① ClassLoader 替换(Tinker)：补丁dex插最前面→需重启。② 底层Native替换(AndFix)：直接换ArtMethod指针→即时生效但兼容差。③ 插桩替换(Robust)：编译期插桩→即时生效兼容好但全量插桩。", tags: ["三方案"] },
  { id: "hf-2", chapter: "hotfix-principle", level: 1, question: "ClassLoader 方案为什么需要重启 App？", answer: "已加载的类缓存在 ClassLoader 里——补丁 dex 插在前面只影响后续新加载的类。已缓存的旧类不会重新加载→必须重启。", tags: ["重启"] },
  { id: "hf-3", chapter: "hotfix-principle", level: 2, question: "底层替换方案为什么在 Android N+ 容易崩？", answer: "ART 内部 ArtMethod 结构在不同版本会变。N 以后引入 JIT→ArtMethod 结构变大变复杂→直接内存覆写容易写错→崩溃。", tags: ["ArtMethod"] },
  { id: "hf-4", chapter: "hotfix-principle", level: 2, question: "Sophix 的三合一方案是怎么组合的？", answer: "① 资源/新增类→ClassLoader方案(稳)。② 即时方法修复(Android N以下)→底层替换(快)。③ Android N+方法修复→插桩替换(兼容)。三者各取所长。", tags: ["Sophix"] },
];
