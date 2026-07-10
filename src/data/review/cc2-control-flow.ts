import type { ReviewQuestion } from "./types";

export const cc2ControlFlowQuestions: ReviewQuestion[] = [
  {
    id: "cc2-control-flow-01",
    chapter: "cc2-control-flow",
    level: 1,
    question: "简化布尔表达式有哪些方法？",
    answer: "简化布尔表达式的方法：① 拆分复杂条件——将复杂布尔表达式拆为命名布尔函数或中间布尔变量，提高可读性；② 利用德摩根律——not(A and B) = not A or not B，转换为更易读的形式；③ 用括号明确优先级——不依赖运算符优先级记忆，用括号显式分组消除歧义；④ 肯定式表达——用 isFound 而非 isNotFound，正向更易理解，减少双重否定。目标是让布尔表达式自解释，读者无需逐步求值即可理解含义。",
    tags: ["布尔表达式", "德摩根律", "简化", "可读性"],
  },
  {
    id: "cc2-control-flow-02",
    chapter: "cc2-control-flow",
    level: 2,
    question: "如何选择合适的控制结构？if-else、switch、循环和表驱动法各自适用什么场景？",
    answer: "选择指南：① if-else——正常情况放 if 分支，异常放 else，最常见情况在前，先处理后返回；② case/switch——多分支等值判断时使用，按频率排序（高频放前面），必须有 default 分支处理意外情况；③ 循环——计数循环用 for（已知迭代次数），条件循环用 while（未知结束条件），至少执行一次用 do-while；④ 表驱动法——用查表替代复杂条件分支，数据驱动逻辑，是最优雅的选择，将逻辑变化改为数据变化。核心原则：选择语义最匹配场景的结构，让代码意图自然表达。",
    tags: ["控制结构", "if-else", "switch", "循环", "表驱动法"],
  },
  {
    id: "cc2-control-flow-03",
    chapter: "cc2-control-flow",
    level: 2,
    question: "深层嵌套的控制结构有什么问题？如何用卫语句重构？",
    answer: "深层嵌套问题：认知负担高——读者需同时记住多层条件状态；圈复杂度高——路径数指数增长，难以测试覆盖；修改风险大——改变内层条件可能影响外层逻辑。卫语句重构：将深层嵌套的 if-if-if 结构改为先检查异常条件并提前返回（if not A: return; if not B: return; if not C: return; do something），将正常逻辑扁平化到最外层。重构策略：① 用 if-then-else 替代嵌套；② 用 break/return 提前退出；③ 用多态替代类型判断分支。效果：扁平结构清晰易懂，正常路径一目了然，异常处理集中在前。",
    tags: ["深层嵌套", "卫语句", "重构", "圈复杂度"],
  },
  {
    id: "cc2-control-flow-04",
    chapter: "cc2-control-flow",
    level: 3,
    question: "控制流复杂度如何度量？应如何管理以保持代码可维护性？",
    answer: "复杂度度量：① 圈复杂度（Cyclomatic Complexity）——衡量独立路径数，每函数建议不超过 10，超过需拆分；② 嵌套深度——建议不超过 3-4 层，越深越难理解；③ 路径覆盖——测试需覆盖所有分支，复杂度越高测试成本越大。管理策略：① 保持每函数短小——单一职责，超长函数拆分；② 用卫语句扁平化——提前返回减少嵌套；③ 用表驱动法替代 switch——减少分支数；④ 避免 goto——用结构化控制替代跳转；⑤ 定期测量——用工具自动检测圈复杂度，超标即重构。核心目标：控制流复杂度直接决定可维护性和可测试性，保持低复杂度是代码质量的基石。",
    tags: ["圈复杂度", "嵌套深度", "路径覆盖", "可维护性"],
  },
];
