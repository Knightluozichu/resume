import { ReviewQuestion } from "../types";

export const twsLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "tws-learning-map-1",
    chapter: "tws-learning-map",
    level: 1,
    question: "《两周自制脚本语言》构建的语言叫什么？用什么语言实现？整体目标是什么？",
    answer:
      "构建的语言叫 Stone，用 Java 实现。整体目标是两周内从零开始自制一个脚本语言解释器，涵盖词法分析、语法分析、抽象语法树、求值执行、函数闭包、类继承、数组哈希等完整功能，理解编译原理的核心概念。",
    tags: ["Stone", "学习地图", "知识体系"],
  },
  {
    id: "tws-learning-map-2",
    chapter: "tws-learning-map",
    level: 2,
    question: "Stone 解释器的四层流水线是什么？各层之间如何衔接？",
    answer:
      "四层流水线：①前端词法分析（Lexer，源码 → Token 序列）②前端语法分析（Parser，Token → AST）③中端抽象语法树（AST 节点 + 访问者模式）④后端求值执行（树遍历解释器 + 环境）。衔接方式：Lexer 输出 Token 流给 Parser，Parser 输出 AST 给 Evaluator，Evaluator 遍历 AST 执行计算。AST 是前端与后端之间的数据桥梁。",
    tags: ["解释器流水线", "Lexer", "Parser", "Evaluator"],
  },
  {
    id: "tws-learning-map-3",
    chapter: "tws-learning-map",
    level: 1,
    question: "全书 10 章的学习路径是什么？各章之间的依赖关系是什么？",
    answer:
      "路径：ch0 学习地图 → ch1 词法分析器 → ch2 语法分析器 → ch3 抽象语法树 → ch4 求值器 → ch5 函数与闭包 → ch6 类型与错误处理 → ch7 类与继承 → ch8 数组与哈希表 → ch9 全书复习。依赖：ch1 是全部基础，ch2 依赖 ch1（Token），ch3 依赖 ch2（Parser 输出），ch4 依赖 ch3（遍历 AST），ch5-ch8 是在 ch4 基础上的语言特性扩展。",
    tags: ["学习路径", "章节依赖"],
  },
  {
    id: "tws-learning-map-4",
    chapter: "tws-learning-map",
    level: 2,
    question: "为什么选择树遍历解释器（tree-walking interpreter）而非字节码虚拟机？",
    answer:
      "树遍历解释器直接在 AST 上递归求值，无需中间字节码编译步骤，实现简单、结构清晰，适合教学。Stone 作为入门级脚本语言，重点在于理解编译原理核心概念（词法、语法、AST、求值），而非性能优化。树遍历方式让初学者能直观看到源码到执行结果的完整流程，降低理解门槛。字节码虚拟机引入额外复杂性，不适合两周入门目标。",
    tags: ["树遍历", "解释器", "设计决策"],
  },
];
