import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "15. Objects";
const focus =
  "比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载";
const stages = ["界定责任", "比较方案", "声明不变量", "验证替换", "记录决策"];
const nodes = [
  {
    label: "15. Objects",
    stage: "界定责任",
    mechanism:
      "15. Objects服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图是否支持对象不变量。",
    probe:
      "15. Objects使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "The object Keyword",
    stage: "比较方案",
    mechanism:
      "The object Keyword服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图是否支持对象不变量。",
    probe:
      "The object Keyword使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Object declarations",
    stage: "声明不变量",
    mechanism:
      "Object declarations服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图是否支持对象不变量。",
    probe:
      "Object declarations使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Object expressions",
    stage: "验证替换",
    mechanism:
      "Object expressions服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图是否支持对象不变量。",
    probe:
      "Object expressions使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Companion objects",
    stage: "记录决策",
    mechanism:
      "Companion objects服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图是否支持对象不变量。",
    probe:
      "Companion objects使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Nested Classes",
    stage: "界定责任",
    mechanism:
      "Nested Classes服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图是否支持对象不变量。",
    probe:
      "Nested Classes使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Data Classes",
    stage: "比较方案",
    mechanism:
      "Data Classes服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图是否支持对象不变量。",
    probe:
      "Data Classes使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "toString",
    stage: "声明不变量",
    mechanism:
      "toString服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "toString使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "equals",
    stage: "验证替换",
    mechanism:
      "equals服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成独立复核。",
    probe:
      "equals使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "copy",
    stage: "记录决策",
    mechanism:
      "copy服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成独立复核。",
    probe:
      "copy使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Destructuring declarations",
    stage: "界定责任",
    mechanism:
      "Destructuring declarations服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成独立复核。",
    probe:
      "Destructuring declarations使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Enumerated Classes",
    stage: "比较方案",
    mechanism:
      "Enumerated Classes服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图是否支持对象不变量。",
    probe:
      "Enumerated Classes使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Operator Overloading",
    stage: "声明不变量",
    mechanism:
      "Operator Overloading服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成独立复核。",
    probe:
      "Operator Overloading使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Exploring the World of NyetHack",
    stage: "验证替换",
    mechanism:
      "Exploring the World of NyetHack服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成独立复核。",
    probe:
      "Exploring the World of NyetHack使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Defining Structural Comparison",
    stage: "记录决策",
    mechanism:
      "For the More Curious: Defining Structural Comparison服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成独立复核。",
    probe:
      "For the More Curious: Defining Structural Comparison使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Algebraic Data Types",
    stage: "界定责任",
    mechanism:
      "For the More Curious: Algebraic Data Types服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图是否支持对象不变量。",
    probe:
      "For the More Curious: Algebraic Data Types使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: “Quit” Command",
    stage: "比较方案",
    mechanism:
      "Challenge: “Quit” Command服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图，不是一次示例输出。",
    probe:
      "Challenge: “Quit” Command使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Implementing a World Map",
    stage: "声明不变量",
    mechanism:
      "Challenge: Implementing a World Map服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图，不是一次示例输出。",
    probe:
      "Challenge: Implementing a World Map使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Ring the Bell",
    stage: "验证替换",
    mechanism:
      "Challenge: Ring the Bell服务于比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图，不是一次示例输出。",
    probe:
      "Challenge: Ring the Bell使用实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把全局对象变成隐式可变状态，或重载运算符却违背读者直觉",
  evidence:
    "实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图",
  boundary:
    "比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载的最小合法输入与第一个非法输入",
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
