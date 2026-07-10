import type { ReviewQuestion } from "./types";

/** Easy C++（第5版）· 控制流复习题 */
export const ecpControlFlowQuestions: ReviewQuestion[] = [
  {
    id: "ecp-control-flow-1",
    chapter: "ecp-control-flow",
    level: 1,
    question: `C++ 中 \`if-else\` 和 \`for\` 循环的基本语法是什么？各举一个简单例子。`,
    answer:
      `\`if-else\` 语法：\n\`\`\`cpp\nif (条件) {\n    // 条件为真时执行\n} else {\n    // 条件为假时执行\n}\n\`\`\`\n例子：\n\`\`\`cpp\nint score = 85;\nif (score >= 60) {\n    cout << \"及格\";\n} else {\n    cout << \"不及格\";\n}\n\`\`\`\n\n\`for\` 循环语法：\n\`\`\`cpp\nfor (初始化; 条件; 更新) {\n    // 循环体\n}\n\`\`\`\n例子：\n\`\`\`cpp\nfor (int i = 1; i <= 5; i++) {\n    cout << i << \" \";\n}\n// 输出 1 2 3 4 5\n\`\`\``,
    tags: ["if-else", "for", "语法"],
  },
  {
    id: "ecp-control-flow-2",
    chapter: "ecp-control-flow",
    level: 2,
    question: `\`while\` 和 \`do-while\` 有什么区别？什么场景下应该用 \`do-while\` 而不是 \`while\`？`,
    answer:
      `区别在于检查条件的时机：\n\n- \`while\`：先判断条件，为真才执行循环体。循环体可能一次都不执行。\n  \`\`\`cpp\n  while (条件) { 循环体; }\n  \`\`\`\n- \`do-while\`：先执行一次循环体，再判断条件。循环体至少执行一次。\n  \`\`\`cpp\n  do { 循环体; } while (条件);\n  \`\`\`\n\n用 \`do-while\` 的场景：当循环体至少要执行一次，且第一次执行后才能拿到判断条件时。\n\n典型例子是「菜单驱动程序」：先显示菜单让用户选，根据选择决定是否继续。菜单必须先显示一次，所以用 \`do-while\`：\n\`\`\`cpp\nint choice;\ndo {\n    cout << \"1.开始 2.退出\";\n    cin >> choice;\n} while (choice != 2);\n\`\`\`\n如果用 \`while\`，第一次显示菜单前就得有 \`choice\` 的值，逻辑不够自然。`,
    tags: ["while", "do-while", "循环区别"],
  },
  {
    id: "ecp-control-flow-3",
    chapter: "ecp-control-flow",
    level: 3,
    question: `写一个程序，用循环计算 1 到 100 中所有偶数的和。然后用 \`break\` 和 \`continue\` 改写：遇到 50 停止，跳过 10 的倍数。`,
    answer:
      `基础版——1 到 100 偶数和：\n\`\`\`cpp\nint sum = 0;\nfor (int i = 1; i <= 100; i++) {\n    if (i % 2 == 0) sum += i;\n}\ncout << sum;  // 2550\n\`\`\`\n\n用 \`break\` 和 \`continue\` 改写——遇 50 停止，跳过 10 的倍数：\n\`\`\`cpp\nint sum = 0;\nfor (int i = 1; i <= 100; i++) {\n    if (i == 50) break;       // 到 50 就退出循环\n    if (i % 10 == 0) continue; // 跳过 10 的倍数\n    if (i % 2 == 0) sum += i;\n}\ncout << sum;\n\`\`\`\n\n说明：\n- \`break\` 立即终止整个循环，不再执行后续迭代。\n- \`continue\` 跳过本次循环剩余语句，直接进入下一次迭代。\n- 改写后循环在 \`i == 50\` 时停止，且 10、20、30、40 这些偶数被跳过不累加。`,
    tags: ["break", "continue", "循环控制", "应用"],
  },
  {
    id: "ecp-control-flow-4",
    chapter: "ecp-control-flow",
    level: 4,
    question: `综合分析：\`switch\` 和 \`if-else if\` 都能实现多分支，它们各有什么优劣？什么情况该用哪个？`,
    answer:
      `\`switch\` 的优势：\n1. 只能对整型/字符/枚举做等值判断，语义明确。\n2. 编译器可能用跳转表优化，分支多时比 \`if-else if\` 快（O(1) vs O(n)）。\n3. 代码结构清晰，case 标签一目了然。\n\n\`switch\` 的劣势：\n1. 只能等值判断，不能做范围判断（如 \`x > 0 && x < 100\`）。\n2. 容易忘 \`break\` 导致 fall-through（贯穿到下一个 case）。\n3. 不能判断浮点和字符串。\n\n\`if-else if\` 的优势：\n1. 任意条件表达式都能写，范围判断、复合条件都行。\n2. 不存在 fall-through 问题。\n3. 适用于所有类型。\n\n\`if-else if\` 的劣势：\n1. 分支多时嵌套深，可读性下降。\n2. 每个条件都要计算求值，分支多时效率不如跳转表。\n\n选择建议：\n- 对整型/枚举做等值分发（如菜单选项、状态码）→ 用 \`switch\`。\n- 需要范围判断、复合条件、浮点/字符串比较 → 用 \`if-else if\`。\n- 分支少于 3 个 → \`if-else\` 即可，\`switch\` 反而啰嗦。`,
    tags: ["switch", "if-else", "多分支", "综合"],
  },
];
