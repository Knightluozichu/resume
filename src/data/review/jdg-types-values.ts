import type { ReviewQuestion } from "./types";

export const jdgTypesValuesQuestions: ReviewQuestion[] = [
  {
    id: "jdg-types-values-1",
    chapter: "jdg-types-values",
    level: 2,
    question: `原始类型和引用类型在赋值与传参时有什么本质区别？`,
    answer:
      `原始类型（number/string/boolean/null/undefined/symbol/bigint）按值访问，赋值与传参复制值的副本，互不影响——改副本不改原值。引用类型（对象/数组/函数）按引用访问，赋值与传参复制引用地址，指向堆中同一对象——改一个另一个也变。这是所有「为什么改了那个也变了」问题的根源。函数参数是对象时，函数内修改它会影响外部——传的是引用的副本，但指向同一对象。原始类型存栈上复制代价低，引用类型存堆上由 GC 管理。`,
    tags: ["原始类型", "引用类型", "值传递"],
  },
  {
    id: "jdg-types-values-2",
    chapter: "jdg-types-values",
    level: 3,
    question: `为什么 \`0.1 + 0.2 !== 0.3\`？\`NaN === NaN\` 为什么是 false？如何正确处理？`,
    answer:
      `0.1+0.2!==0.3 是 IEEE 754 双精度浮点的固有特性：0.1 和 0.2 在二进制中是无限循环小数无法精确表示，存储时被截断，相加得 0.30000000000000004。非 JS 独有，所有 IEEE 754 语言都如此。处理：①容差比较 Math.abs(a-b) < Number.EPSILON；②金额用整数分计算后除 100；③用 bigint/decimal 库。NaN===NaN 为 false 是规范设计：NaN 表示「不是一个数字」，两个非数字没有相等概念（可能来自不同运算），故规范规定 NaN 与任何值（含自身）都不等。判断用 Number.isNaN(x)（不隐式转换），而非全局 isNaN（会先隐式转数字，isNaN('abc') 误判 true）。`,
    tags: ["浮点精度", "NaN", "IEEE 754"],
  },
  {
    id: "jdg-types-values-3",
    chapter: "jdg-types-values",
    level: 3,
    question: `字符串的不可变性意味着什么？\`s[0] = 'H'\` 有效吗？`,
    answer:
      `字符串是不可变的 UTF-16 字符序列——一旦创建其内容不能改变。s[0] = 'H' 无效，s 仍是原值不报错也不改变。所有字符串方法（toUpperCase/slice/replace/trim）都返回新串而不改原串，必须赋值才生效：s = s.toUpperCase()。字符串拼接也创建新串，大量拼接用数组 join 或模板字符串更高效（避免反复创建中间串）。不可变性的好处：字符串可安全共享不用怕被改；坏处：每次「修改」都创建新对象。另外 length 返回码元数，码点大于 U+FFFF 的字符（如 emoji）占两个码元，length 返回 2 而非 1。`,
    tags: ["字符串", "不可变性", "UTF-16"],
  },
  {
    id: "jdg-types-values-4",
    chapter: "jdg-types-values",
    level: 4,
    question: `显式类型转换与隐式类型转换的区别是什么？工程上应如何对待？ToBoolean 有哪些 falsy 值？`,
    answer:
      `显式转换用 Number(x)/String(x)/Boolean(x) 明确表达转换意图，写在明处让读代码者一眼看懂；隐式转换由运算符触发：+x 转数字、x+'' 转字符串、!!x 转布尔、== 抽象相等比较。工程原则：显式优于隐式，默认用 === 杜绝隐式相等比较；需要转换时用显式函数。ToBoolean 只有 6 个 falsy 值：false/0/\"\"/null/undefined/NaN（外加 0n），其余全 truthy——注意 \"0\"/[]/{} 都是 truthy，if([]) 为真。隐式转换的真正风险在 == 和 + 运算符：[] == ![] 为 true、0 == \"\" 为 true 这类反直觉结果。原则：转换可以发生，但要发生在明处、可预测。`,
    tags: ["类型转换", "显式转换", "falsy", "ToBoolean"],
  },
];
