import type { ReviewQuestion } from "./types";

export const cc2VariablesNamesQuestions: ReviewQuestion[] = [
  {
    id: "cc2-variables-names-01",
    chapter: "cc2-variables-names",
    level: 1,
    question: "变量初始化的三个原则是什么？",
    answer: "变量初始化三原则：① 就近初始化——在声明处或首次使用前立即初始化，避免使用未定义值；② 使用前确认——在使用变量前检查是否已正确初始化，做防御式检查；③ 重置注意——在循环或函数重入时需重新初始化变量，避免残留状态影响。这三个原则共同确保变量始终处于已知的有效状态，是从源头预防未初始化缺陷的关键实践。",
    tags: ["变量初始化", "就近初始化", "防御式检查"],
  },
  {
    id: "cc2-variables-names-02",
    chapter: "cc2-variables-names",
    level: 2,
    question: "变量作用域和持续性如何影响代码质量？应如何优化？",
    answer: "作用域指变量的可见范围，持续性指变量存活的时间跨度。影响：作用域越大、持续性越长，代码越难理解（需跟踪更多状态）、越容易出错（变量可能被意外修改）、越难维护（修改影响范围大）。优化策略：① 缩小作用域到最小可见范围；② 缩短持续性，赋值与最后使用间越近越好；③ 变量声明与使用越近越好；④ 循环变量在循环内初始化；⑤ 避免全局变量。核心原则：作用域越小 → 错误越少；持续性越短 → 可维护性越高。",
    tags: ["作用域", "持续性", "变量生命周期", "可维护性"],
  },
  {
    id: "cc2-variables-names-03",
    chapter: "cc2-variables-names",
    level: 2,
    question: "好的变量命名有哪些规则？常见命名问题有哪些？",
    answer: "好命名规则：① 完全准确描述变量代表什么；② 作用域越大名字越长越详细；③ 计算限定词放在末尾（如 totalRevenue 而非 revenueTotal）；④ 布尔变量用肯定式（isFound 而非 isNotFound）；⑤ 循环变量简单循环用 i/j/k，嵌套循环用更有意义的名字；⑥ 团队统一命名约定（驼峰/下划线一致）。常见问题：① 误导性名字（data 处理不只数据）；② 无意义名字（x1/temp/foo 无信息量）；③ 近似名字（user/users/userInfo 混淆）；④ 魔法数字（用命名常量 MAX_RETRIES 替代硬编码 3）。",
    tags: ["变量命名", "命名规范", "命名反模式", "魔法数字"],
  },
  {
    id: "cc2-variables-names-04",
    chapter: "cc2-variables-names",
    level: 3,
    question: "在实际项目中如何平衡命名长度与代码简洁性？考虑作用域、上下文和团队约定。",
    answer: "平衡命名长度与简洁性的策略：① 按作用域调整——局部变量（小作用域）可用短名（如 i、cnt），因为上下文明确；全局变量/类成员（大作用域）必须用完整描述性名字，因为使用处远离定义处；② 利用上下文——在类方法中，成员变量名可省略类名前缀（this.customerName 而非 this.orderCustomerName），因为类上下文已限定含义；③ 遵循团队约定——统一缩写表（如 num 代表 number、cfg 代表 config），避免个人风格差异；④ 避免过度缩写——employeeCount 比 empCnt 更清晰，可读性比简洁性更重要；⑤ 重构而非忍受——发现名字不好就立即改名，现代 IDE 重命名安全且快速。核心原则：名字长度应与理解难度成正比，不是越短越好也不是越长越好，而是恰到好处地传达意图。",
    tags: ["命名长度", "作用域", "团队约定", "代码简洁性"],
  },
];
