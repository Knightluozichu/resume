import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "20. Java Interoperability";
const focus =
  "控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界";
const stages = ["建立基线", "注入反例", "定位边界", "修复合同", "同输入复验"];
const nodes = [
  {
    label: "20. Java Interoperability",
    stage: "建立基线",
    mechanism:
      "20. Java Interoperability服务于控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试完成独立复核。",
    probe:
      "20. Java Interoperability使用Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Interoperating with a Java Class",
    stage: "注入反例",
    mechanism:
      "Interoperating with a Java Class服务于控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试必须能区分语法缩短与合同改变。",
    probe:
      "Interoperating with a Java Class使用Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Interoperability and Nullity",
    stage: "定位边界",
    mechanism:
      "Interoperability and Nullity服务于控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试定位最早失效处。",
    probe:
      "Interoperability and Nullity使用Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Type Mapping",
    stage: "修复合同",
    mechanism:
      "Type Mapping服务于控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试是否支持对象不变量。",
    probe:
      "Type Mapping使用Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Getters, Setters, and Interoperability",
    stage: "同输入复验",
    mechanism:
      "Getters, Setters, and Interoperability服务于控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Getters, Setters, and Interoperability使用Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Beyond Classes",
    stage: "建立基线",
    mechanism:
      "Beyond Classes服务于控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试是否支持对象不变量。",
    probe:
      "Beyond Classes使用Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Exceptions and Interoperability",
    stage: "注入反例",
    mechanism:
      "Exceptions and Interoperability服务于控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试定位最早失效处。",
    probe:
      "Exceptions and Interoperability使用Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function Types in Java",
    stage: "定位边界",
    mechanism:
      "Function Types in Java服务于控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试必须能区分语法缩短与合同改变。",
    probe:
      "Function Types in Java使用Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "让平台类型扩散到业务层，令空值风险失去编译期保护",
  evidence:
    "Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试",
  boundary:
    "控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界的最小合法输入与第一个非法输入",
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
