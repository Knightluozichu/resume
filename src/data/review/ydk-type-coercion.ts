import type { ReviewQuestion } from "./types";

export const ydkTypeCoercionQuestions: ReviewQuestion[] = [
  {
    id: "ydk-type-coercion-1",
    chapter: "ydk-type-coercion",
    level: 2,
    question: `\`==\` 和 \`===\` 的本质区别是什么？为什么工程上默认用 \`===\`？`,
    answer:
      `=== 类型不同直接返回 false，不做任何转换；== 在类型不同时按抽象相等比较流程强制转换后再比。=== 的行为可预测——类型不同就是 false，不会因隐式转换产生意外。== 的行为依赖一整套转换规则，类型不确定时结果难预判（如 0 == \"\" 为 true、null == 0 为 false），易引入 bug。工程默认 === 是为了「不让转换发生在暗处」；唯一保留 == 的场景是判断 x == null 同时覆盖 null 和 undefined 的存在性检查，因规范特判这对互相相等且不与其他值相等，安全且语义清晰。`,
    tags: ["==", "===", "类型转换"],
  },
  {
    id: "ydk-type-coercion-2",
    chapter: "ydk-type-coercion",
    level: 3,
    question: `完整推演 \`[] == ![]\` 为何等于 \`true\`。`,
    answer:
      `分两步。第一步右侧 ![]：[] 是对象，ToBoolean 后是 truthy，取反得 false。第二步进入 [] == false：两侧类型不同，右侧是布尔，按规则布尔先 ToNumber，false → 0，变成 [] == 0；左侧是对象，按规则先 ToPrimitive，[] 的 valueOf 返回自身（非原始值），再调 toString 得 \"\"，变成 \"\" == 0；左侧是字符串，按规则字符串先 ToNumber，\"\" → 0，变成 0 == 0，类型相同走 ===，结果 true。关键点：[] 转原始值是空字符串、空字符串转数字是 0、布尔 false 转数字也是 0，三者殊途同归到 0。`,
    tags: ["==", "ToPrimitive", "ToNumber", "隐式转换"],
  },
  {
    id: "ydk-type-coercion-3",
    chapter: "ydk-type-coercion",
    level: 3,
    question: `四个抽象操作（ToPrimitive/ToNumber/ToString/ToBoolean）各自的作用和易错点是什么？`,
    answer:
      `ToPrimitive 把对象转原始值，先 valueOf 后 toString（都返回非原始值则 TypeError）。ToNumber 转数字：\"\"/[] → 0，\"9\" → 9，[\"9\"] 先 ToString 成 \"9\" 再转 9，[1,2] ToString 成 \"1,2\" 再转 NaN。ToString 转字符串：数组逗号拼接（[1,2,3] → \"1,2,3\"），对象 → \"[object Object]\"。ToBoolean 只有 6 个 falsy（false/0/\"\"/null/undefined/NaN，外加 0n），其余全 truthy——注意 \"0\"、[]、{} 都是 truthy。易错点：空数组 ToNumber 是 0 不是 NaN；单元素数组经 ToString 转数字可能成功，多元素数组转数字是 NaN；对象比较和 if 判断都依赖这些规则。`,
    tags: ["抽象操作", "ToPrimitive", "ToNumber", "falsy"],
  },
  {
    id: "ydk-type-coercion-4",
    chapter: "ydk-type-coercion",
    level: 4,
    question: `隐式转换都是坏东西吗？工程上应如何对待显式与隐式转换？`,
    answer:
      `不是。隐式转换确有反直觉处（如 [] == ![]），但也有合理用法：if (x) 依赖 ToBoolean 做存在性判断、x + \"\" 显式转字符串都合法。真正该杜绝的是 == 在类型不确定时的隐式比较，而非所有转换。工程上更稳妥的做法：默认 === 杜绝隐式相等比较；需要类型转换时用 String(x)/Number(x)/Boolean(x) 显式表达意图——显式转换不是「不会转换」，而是「把转换写在明处，让读代码的人一眼看懂」。原则：转换可以发生，但要发生在明处、可预测，避免依赖一长串抽象操作链的隐式推演。`,
    tags: ["显式转换", "工程实践", "隐式转换"],
  },
];
