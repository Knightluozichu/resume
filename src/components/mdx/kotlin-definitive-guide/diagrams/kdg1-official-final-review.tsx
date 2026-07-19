import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "《Kotlin编程权威指南》全书总复习";
const focus =
  "跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收";
const stages = ["建立基线", "注入反例", "定位边界", "修复合同", "同输入复验"];
const nodes = [
  {
    label: "Introducing Kotlin",
    stage: "建立基线",
    mechanism:
      "Introducing Kotlin服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以全书概念图、综合项目、失败注入、迁移账本和独立交接包完成独立复核。",
    probe:
      "Introducing Kotlin使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "1. Your First Kotlin Application",
    stage: "注入反例",
    mechanism:
      "1. Your First Kotlin Application服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以全书概念图、综合项目、失败注入、迁移账本和独立交接包完成独立复核。",
    probe:
      "1. Your First Kotlin Application使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "2. Variables, Constants, and Types",
    stage: "定位边界",
    mechanism:
      "2. Variables, Constants, and Types服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查全书概念图、综合项目、失败注入、迁移账本和独立交接包是否支持对象不变量。",
    probe:
      "2. Variables, Constants, and Types使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "3. Conditionals",
    stage: "修复合同",
    mechanism:
      "3. Conditionals服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以全书概念图、综合项目、失败注入、迁移账本和独立交接包完成独立复核。",
    probe:
      "3. Conditionals使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "4. Functions",
    stage: "同输入复验",
    mechanism:
      "4. Functions服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；全书概念图、综合项目、失败注入、迁移账本和独立交接包必须能区分语法缩短与合同改变。",
    probe:
      "4. Functions使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "5. Anonymous Functions and the Function Type",
    stage: "建立基线",
    mechanism:
      "5. Anonymous Functions and the Function Type服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；全书概念图、综合项目、失败注入、迁移账本和独立交接包必须能区分语法缩短与合同改变。",
    probe:
      "5. Anonymous Functions and the Function Type使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "6. Null Safety and Exceptions",
    stage: "注入反例",
    mechanism:
      "6. Null Safety and Exceptions服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用全书概念图、综合项目、失败注入、迁移账本和独立交接包定位最早失效处。",
    probe:
      "6. Null Safety and Exceptions使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "7. Strings",
    stage: "定位边界",
    mechanism:
      "7. Strings服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由全书概念图、综合项目、失败注入、迁移账本和独立交接包判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "7. Strings使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "8. Numbers",
    stage: "修复合同",
    mechanism:
      "8. Numbers服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由全书概念图、综合项目、失败注入、迁移账本和独立交接包判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "8. Numbers使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "9. Standard Functions",
    stage: "同输入复验",
    mechanism:
      "9. Standard Functions服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；全书概念图、综合项目、失败注入、迁移账本和独立交接包必须能区分语法缩短与合同改变。",
    probe:
      "9. Standard Functions使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "10. Lists and Sets",
    stage: "建立基线",
    mechanism:
      "10. Lists and Sets服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由全书概念图、综合项目、失败注入、迁移账本和独立交接包判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "10. Lists and Sets使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "11. Maps",
    stage: "注入反例",
    mechanism:
      "11. Maps服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由全书概念图、综合项目、失败注入、迁移账本和独立交接包判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "11. Maps使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "12. Defining Classes",
    stage: "定位边界",
    mechanism:
      "12. Defining Classes服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查全书概念图、综合项目、失败注入、迁移账本和独立交接包是否支持对象不变量。",
    probe:
      "12. Defining Classes使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "13. Initialization",
    stage: "修复合同",
    mechanism:
      "13. Initialization服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以全书概念图、综合项目、失败注入、迁移账本和独立交接包完成独立复核。",
    probe:
      "13. Initialization使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "14. Inheritance",
    stage: "同输入复验",
    mechanism:
      "14. Inheritance服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查全书概念图、综合项目、失败注入、迁移账本和独立交接包是否支持对象不变量。",
    probe:
      "14. Inheritance使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "15. Objects",
    stage: "建立基线",
    mechanism:
      "15. Objects服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查全书概念图、综合项目、失败注入、迁移账本和独立交接包是否支持对象不变量。",
    probe:
      "15. Objects使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "16. Interfaces and Abstract Classes",
    stage: "注入反例",
    mechanism:
      "16. Interfaces and Abstract Classes服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查全书概念图、综合项目、失败注入、迁移账本和独立交接包是否支持对象不变量。",
    probe:
      "16. Interfaces and Abstract Classes使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "17. Generics",
    stage: "定位边界",
    mechanism:
      "17. Generics服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查全书概念图、综合项目、失败注入、迁移账本和独立交接包是否支持对象不变量。",
    probe:
      "17. Generics使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "18. Extensions",
    stage: "修复合同",
    mechanism:
      "18. Extensions服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以全书概念图、综合项目、失败注入、迁移账本和独立交接包完成独立复核。",
    probe:
      "18. Extensions使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "19. Functional Programming Basics",
    stage: "同输入复验",
    mechanism:
      "19. Functional Programming Basics服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；全书概念图、综合项目、失败注入、迁移账本和独立交接包必须能区分语法缩短与合同改变。",
    probe:
      "19. Functional Programming Basics使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "20. Java Interoperability",
    stage: "建立基线",
    mechanism:
      "20. Java Interoperability服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以全书概念图、综合项目、失败注入、迁移账本和独立交接包完成独立复核。",
    probe:
      "20. Java Interoperability使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "21. Building Your First Android Application with Kotlin",
    stage: "注入反例",
    mechanism:
      "21. Building Your First Android Application with Kotlin服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；全书概念图、综合项目、失败注入、迁移账本和独立交接包必须能区分语法缩短与合同改变。",
    probe:
      "21. Building Your First Android Application with Kotlin使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "22. Introduction to Coroutines",
    stage: "定位边界",
    mechanism:
      "22. Introduction to Coroutines服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用全书概念图、综合项目、失败注入、迁移账本和独立交接包验证状态恢复和失败隔离。",
    probe:
      "22. Introduction to Coroutines使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "23. Afterword",
    stage: "修复合同",
    mechanism:
      "23. Afterword服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以全书概念图、综合项目、失败注入、迁移账本和独立交接包完成独立复核。",
    probe:
      "23. Afterword使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "A. More Challenges",
    stage: "同输入复验",
    mechanism:
      "A. More Challenges服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是全书概念图、综合项目、失败注入、迁移账本和独立交接包，不是一次示例输出。",
    probe:
      "A. More Challenges使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Glossary",
    stage: "建立基线",
    mechanism:
      "Glossary服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以全书概念图、综合项目、失败注入、迁移账本和独立交接包完成独立复核。",
    probe:
      "Glossary使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Index",
    stage: "注入反例",
    mechanism:
      "Index服务于跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以全书概念图、综合项目、失败注入、迁移账本和独立交接包完成独立复核。",
    probe:
      "Index使用全书概念图、综合项目、失败注入、迁移账本和独立交接包完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "只按章节回忆术语，无法解释跨章节的数据与控制流",
  evidence: "全书概念图、综合项目、失败注入、迁移账本和独立交接包",
  boundary:
    "跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收的最小合法输入与第一个非法输入",
} satisfies KdgCausalModel;
const props = { title, focus, stages, nodes, model };

export function KdgModelLab() {
  return <KdgCoverageLab {...props} />;
}

export function KdgFailureLab() {
  return <KdgContractLab {...props} />;
}

export function KdgEvidenceLab() {
  return <KdgRecoveryLab {...props} />;
}
