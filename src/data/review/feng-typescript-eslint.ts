import type { ReviewQuestion } from "./types";

export const fengTypescriptEslintQuestions: ReviewQuestion[] = [
  {
    id: "feng-typescript-eslint-1",
    chapter: "feng-typescript-eslint",
    level: 2,
    question: `TypeScript 和 ESLint 分别在什么层面保障代码质量？两者关系是什么？`,
    answer:
      `TypeScript 在「类型层」保障：编译期（tsc）通过类型系统检查参数类型、返回值结构、null/undefined 安全、泛型约束等，拦截「类型不匹配」的错误。ESLint 在「规范层」保障：通过 AST 扫描代码模式，检查未使用变量、调试残留（console）、导入顺序、潜在 bug 模式等，拦截「风格不一致」和「坏味道」。两者关系：互补不替代——TS 管类型安全，ESLint 管代码规范。typescript-eslint 插件让 ESLint 能理解 TS 语法并增加类型相关的 lint 规则（如 no-floating-promises），桥接两层。生产实践：tsc --noEmit 做类型检查 + eslint 做规范扫描，两者串联在 CI 中。`,
    tags: ["TypeScript", "ESLint", "质量"],
  },
  {
    id: "feng-typescript-eslint-2",
    chapter: "feng-typescript-eslint",
    level: 3,
    question: `TypeScript 的 strict 模式包含哪些关键检查？为什么推荐开启？`,
    answer:
      `strict: true 是一组严格类型检查的聚合开关，主要包括：①noImplicitAny——禁止隐式 any，函数参数和变量必须有明确类型或可推断；②strictNullChecks——null 和 undefined 不再是所有类型的子类型，必须显式处理（空值检查）；③strictFunctionTypes——函数参数类型检查改为逆变（更安全）；④strictBindCallApply——bind/call/apply 的参数类型严格检查；⑤strictPropertyInitialization——类属性必须在构造函数中初始化；⑥noImplicitThis——禁止 this 为隐式 any。推荐开启是因为这些检查在编译期拦截了大量运行时才会暴露的空指针和类型错误，虽然初期会增加类型标注成本，但换来的是「编译通过即类型安全」的信心，大幅减少线上 bug。`,
    tags: ["TypeScript", "strict", "类型安全"],
  },
  {
    id: "feng-typescript-eslint-3",
    chapter: "feng-typescript-eslint",
    level: 3,
    question: `typescript-eslint 中的 no-floating-promises 规则解决什么问题？`,
    answer:
      `no-floating-promises 检查「未 await/then/catch 的 Promise」——即一个返回 Promise 的函数调用被「悬浮」着没有处理。这解决的问题是：Promise 如果未被 await 或 catch，其 rejection 会被静默吞掉，错误不会向上传播也不会被捕获，导致 bug 难以定位。典型场景：调用 async 函数忘了 await，函数内部的异常不会触发外层 try/catch，程序继续执行但状态可能已不一致。该规则要求每个 Promise 表达式要么被 await、要么接 .then()/.catch()、要么显式 void 标记忽略。它是 typescript-eslint 推荐规则集的核心之一，体现了「类型信息让 lint 更智能」——纯 ESLint 无法知道一个调用返回 Promise，需要 TS 类型信息支撑。`,
    tags: ["typescript-eslint", "Promise", "lint"],
  },
  {
    id: "feng-typescript-eslint-4",
    chapter: "feng-typescript-eslint",
    level: 4,
    question: `项目中 ESLint 和 Prettier 的职责如何划分？为什么不用 ESLint 替代 Prettier？`,
    answer:
      `Prettier 专注「格式化」：缩进、引号、换行、尾逗号等纯排版规则，它不考虑语义，只按固定规则重排版面，目标是消除格式争论。ESLint 专注「代码质量与规范」：未使用变量、类型安全、潜在 bug、最佳实践，它理解 AST 语义。不用 ESLint 替代 Prettier 的原因：①ESLint 的格式化规则不够全面且配置繁琐，Prettier 开箱即用且覆盖几乎所有格式场景；②ESLint 格式化规则与质量规则混在一起，关掉格式规则需要大量配置；③Prettier 对各种语言（CSS/MD/JSON）统一格式化，ESLint 只管 JS/TS。实践：eslint-config-prettier 关掉 ESLint 中与 Prettier 冲突的格式规则，两者各司其职——Prettier 管格式，ESLint 管质量，在 CI/编辑器中串联运行。`,
    tags: ["ESLint", "Prettier", "格式化", "职责划分"],
  },
];
