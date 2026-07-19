import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "《Kotlin编程权威指南》权威学习地图";
const focus =
  "沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门";
const stages = ["界定责任", "比较方案", "声明不变量", "验证替换", "记录决策"];
const nodes = [
  {
    label: "Introducing Kotlin",
    stage: "界定责任",
    mechanism:
      "Introducing Kotlin服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成独立复核。",
    probe:
      "Introducing Kotlin使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "1. Your First Kotlin Application",
    stage: "比较方案",
    mechanism:
      "1. Your First Kotlin Application服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成独立复核。",
    probe:
      "1. Your First Kotlin Application使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "2. Variables, Constants, and Types",
    stage: "声明不变量",
    mechanism:
      "2. Variables, Constants, and Types服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表是否支持对象不变量。",
    probe:
      "2. Variables, Constants, and Types使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "3. Conditionals",
    stage: "验证替换",
    mechanism:
      "3. Conditionals服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成独立复核。",
    probe:
      "3. Conditionals使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "4. Functions",
    stage: "记录决策",
    mechanism:
      "4. Functions服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表必须能区分语法缩短与合同改变。",
    probe:
      "4. Functions使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "5. Anonymous Functions and the Function Type",
    stage: "界定责任",
    mechanism:
      "5. Anonymous Functions and the Function Type服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表必须能区分语法缩短与合同改变。",
    probe:
      "5. Anonymous Functions and the Function Type使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "6. Null Safety and Exceptions",
    stage: "比较方案",
    mechanism:
      "6. Null Safety and Exceptions服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表定位最早失效处。",
    probe:
      "6. Null Safety and Exceptions使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "7. Strings",
    stage: "声明不变量",
    mechanism:
      "7. Strings服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "7. Strings使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "8. Numbers",
    stage: "验证替换",
    mechanism:
      "8. Numbers服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "8. Numbers使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "9. Standard Functions",
    stage: "记录决策",
    mechanism:
      "9. Standard Functions服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表必须能区分语法缩短与合同改变。",
    probe:
      "9. Standard Functions使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "10. Lists and Sets",
    stage: "界定责任",
    mechanism:
      "10. Lists and Sets服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "10. Lists and Sets使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "11. Maps",
    stage: "比较方案",
    mechanism:
      "11. Maps服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "11. Maps使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "12. Defining Classes",
    stage: "声明不变量",
    mechanism:
      "12. Defining Classes服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表是否支持对象不变量。",
    probe:
      "12. Defining Classes使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "13. Initialization",
    stage: "验证替换",
    mechanism:
      "13. Initialization服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成独立复核。",
    probe:
      "13. Initialization使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "14. Inheritance",
    stage: "记录决策",
    mechanism:
      "14. Inheritance服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表是否支持对象不变量。",
    probe:
      "14. Inheritance使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "15. Objects",
    stage: "界定责任",
    mechanism:
      "15. Objects服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表是否支持对象不变量。",
    probe:
      "15. Objects使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "16. Interfaces and Abstract Classes",
    stage: "比较方案",
    mechanism:
      "16. Interfaces and Abstract Classes服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表是否支持对象不变量。",
    probe:
      "16. Interfaces and Abstract Classes使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "17. Generics",
    stage: "声明不变量",
    mechanism:
      "17. Generics服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表是否支持对象不变量。",
    probe:
      "17. Generics使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "18. Extensions",
    stage: "验证替换",
    mechanism:
      "18. Extensions服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成独立复核。",
    probe:
      "18. Extensions使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "19. Functional Programming Basics",
    stage: "记录决策",
    mechanism:
      "19. Functional Programming Basics服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表必须能区分语法缩短与合同改变。",
    probe:
      "19. Functional Programming Basics使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "20. Java Interoperability",
    stage: "界定责任",
    mechanism:
      "20. Java Interoperability服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成独立复核。",
    probe:
      "20. Java Interoperability使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "21. Building Your First Android Application with Kotlin",
    stage: "比较方案",
    mechanism:
      "21. Building Your First Android Application with Kotlin服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表必须能区分语法缩短与合同改变。",
    probe:
      "21. Building Your First Android Application with Kotlin使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "22. Introduction to Coroutines",
    stage: "声明不变量",
    mechanism:
      "22. Introduction to Coroutines服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表验证状态恢复和失败隔离。",
    probe:
      "22. Introduction to Coroutines使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "23. Afterword",
    stage: "验证替换",
    mechanism:
      "23. Afterword服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成独立复核。",
    probe:
      "23. Afterword使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "A. More Challenges",
    stage: "记录决策",
    mechanism:
      "A. More Challenges服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表，不是一次示例输出。",
    probe:
      "A. More Challenges使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Glossary",
    stage: "界定责任",
    mechanism:
      "Glossary服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成独立复核。",
    probe:
      "Glossary使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Index",
    stage: "比较方案",
    mechanism:
      "Index服务于沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成独立复核。",
    probe:
      "Index使用27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把23章压成几个主题页，或混入第二版与现代Android内容",
  evidence: "27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表",
  boundary:
    "沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门的最小合法输入与第一个非法输入",
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
