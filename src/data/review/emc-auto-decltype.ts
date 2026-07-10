import type { ReviewQuestion } from "./types";

/** 条款 2-6 auto 与 decltype 复习题 */
export const emcAutoDecltypeQuestions: ReviewQuestion[] = [
  {
    id: "emc-auto-decltype-1",
    chapter: "emc-auto-decltype",
    level: 1,
    question: `auto 类型推导与模板类型推导的唯一差别是什么？`,
    answer:
      `唯一差别在于对花括号初始化（braced initializer）的处理：\n\n- auto 推导会把花括号初始化列表推导为 \`std::initializer_list<T>\`。例如 \`auto x = {1, 2, 3};\` 推导出 \`std::initializer_list<int>\`。\n- 模板类型推导则不会自动推导出 initializer_list，传 \`f({1, 2, 3})\` 给普通模板会因无法推导 T 而报错。\n\n除此之外，auto 与模板推导的三种情形、cv 处理、退化规则完全相同。所以条款 2 的核心就一句话：auto 推导 = 模板推导 + 花括号初始化推导为 initializer_list 的特例。`,
    tags: ["条款 2", "auto 推导", "花括号初始化", "initializer_list"],
  },
  {
    id: "emc-auto-decltype-2",
    chapter: "emc-auto-decltype",
    level: 2,
    question: `条款 5 为什么建议优先用 auto？给出至少两个具体理由。`,
    answer:
      `条款 5 建议优先用 auto，主要理由：\n\n1. 避免冗长且易错的类型拼写：\`std::map<std::string, int>::const_iterator it = m.cbegin();\` 写起来长，用 \`auto it = m.cbegin();\` 更简洁。\n2. 避免类型截断与隐式转换陷阱：\`unsigned n = v.size();\` 实际 size 返回 size_t，写成 unsigned 是隐式转换，改用 \`auto n = v.size();\` 类型就正确。\n3. 捕获 Lambda 闭包类型：\`auto f = [](int x){ return x*2; };\` 闭包类型无法拼写，只能用 auto。\n4. 重构友好：函数返回类型变了，用 auto 的变量自动跟着变，不用逐处改。\n\n总之 auto 既减少冗余、又减少「手写类型写错」的风险。`,
    tags: ["条款 5", "优先 auto", "类型截断", "Lambda"],
  },
  {
    id: "emc-auto-decltype-3",
    chapter: "emc-auto-decltype",
    level: 3,
    question:
      `条款 6 的「显式类型初始化惯用法」是什么？它解决什么问题？请用 vector<bool> 的例子说明。`,
    answer:
      `显式类型初始化惯用法（explicitly typed initializer idiom）是：用 auto 声明变量，但用一个「显式类型的临时对象」来初始化它，从而强制 auto 推导出你想要的类型。形式如：\`auto var = TargetType(expr);\`。\n\n它解决「auto 推导出代理类型（proxy type）」的问题。代理类型如 \`std::vector<bool>::reference\`、\`Matrix::reference\` 等，它们隐式转换为目标类型，但作为 auto 变量直接持有会出问题。\n\nvector<bool> 的例子：\n\`\`\`cpp\nstd::vector<bool> features = ...;\nbool highPriority = features[5];   // OK：reference 隐式转 bool\nauto highPriority = features[5];   // 危险！highPriority 是 vector<bool>::reference\n\`\`\`\n\n危险在于：\`features[5]\` 返回的是 \`vector<bool>::reference\`，它内部持有一个指向底层字节的指针和位偏移。如果 features 在 highPriority 使用前被析构或修改，highPriority 就成了悬空引用，\`if (highPriority)\` 读的是已释放内存。\n\n用显式类型初始化惯用法修正：\n\`\`\`cpp\nauto highPriority = static_cast<bool>(features[5]);\n\`\`\`\n这样 auto 推导出 bool，reference 立即转换为一个独立的 bool 值，不再持有指向 vector 内部的句柄。`,
    tags: ["条款 6", "代理类型", "显式类型初始化", "vector<bool>", "悬空"],
  },
  {
    id: "emc-auto-decltype-4",
    chapter: "emc-auto-decltype",
    level: 4,
    question:
      `decltype 与 auto 的推导行为有何不同？decltype(auto) 又解决了什么问题？请结合返回值转发场景说明。`,
    answer:
      `decltype 与 auto 的不同：\n- auto 默认会忽略引用性和顶层 const（除非用 auto& 或 const auto&），且对花括号初始化推导 initializer_list。\n- decltype 精确返回表达式或变量的类型，保留引用与 cv 限定，不忽略任何东西。\n\ndecltype(auto) 解决的问题：用 auto 的语法形式（如 \`decltype(auto) x = expr;\` 或函数返回 \`decltype(auto)\`），但走 decltype 的推导规则，从而「透传」引用性与 cv。\n\n返回值转发场景：\n\`\`\`cpp\ntemplate<typename Container, typename Index>\nauto access(Container& c, Index i) { return c[i]; }  // 错！c[i] 返回 T&，auto 去引用成 T\n\`\`\`\n这里 \`c[i]\` 可能返回 \`T&\`，但 auto 把它推导成 T，于是返回的是拷贝，无法修改容器元素。\n\n改成 \`decltype(auto)\`：\n\`\`\`cpp\ntemplate<typename Container, typename Index>\ndecltype(auto) access(Container& c, Index i) { return c[i]; }  // 透传 T&\n\`\`\`\n\n这样 c[i] 是 T& 时返回 T&，是 T（如 vector<bool>::reference）时返回该代理类型。decltype(auto) 让「转发返回类型」也能精确保留实参的引用性，是用 auto 语法享受 decltype 精确性的关键工具。`,
    tags: ["条款 3", "decltype", "decltype(auto)", "返回值转发", "引用透传"],
  },
];
