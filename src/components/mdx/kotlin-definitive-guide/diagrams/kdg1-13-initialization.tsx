import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "13. Initialization";
const focus =
  "比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效";
const stages = ["建立基线", "注入反例", "定位边界", "修复合同", "同输入复验"];
const nodes = [
  {
    label: "13. Initialization",
    stage: "建立基线",
    mechanism:
      "13. Initialization服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成独立复核。",
    probe:
      "13. Initialization使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Constructors",
    stage: "注入反例",
    mechanism:
      "Constructors服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战是否支持对象不变量。",
    probe:
      "Constructors使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Primary constructors",
    stage: "定位边界",
    mechanism:
      "Primary constructors服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战是否支持对象不变量。",
    probe:
      "Primary constructors使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Defining properties in a primary constructor",
    stage: "修复合同",
    mechanism:
      "Defining properties in a primary constructor服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战是否支持对象不变量。",
    probe:
      "Defining properties in a primary constructor使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Secondary constructors",
    stage: "同输入复验",
    mechanism:
      "Secondary constructors服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战是否支持对象不变量。",
    probe:
      "Secondary constructors使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Default arguments",
    stage: "建立基线",
    mechanism:
      "Default arguments服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成独立复核。",
    probe:
      "Default arguments使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Named arguments",
    stage: "注入反例",
    mechanism:
      "Named arguments服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成独立复核。",
    probe:
      "Named arguments使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Initializer Blocks",
    stage: "定位边界",
    mechanism:
      "Initializer Blocks服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成独立复核。",
    probe:
      "Initializer Blocks使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Property Initialization",
    stage: "修复合同",
    mechanism:
      "Property Initialization服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战是否支持对象不变量。",
    probe:
      "Property Initialization使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Initialization Order",
    stage: "同输入复验",
    mechanism:
      "Initialization Order服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成独立复核。",
    probe:
      "Initialization Order使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Delaying Initialization",
    stage: "建立基线",
    mechanism:
      "Delaying Initialization服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成独立复核。",
    probe:
      "Delaying Initialization使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Late initialization",
    stage: "注入反例",
    mechanism:
      "Late initialization服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成独立复核。",
    probe:
      "Late initialization使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Lazy initialization",
    stage: "定位边界",
    mechanism:
      "Lazy initialization服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成独立复核。",
    probe:
      "Lazy initialization使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Initialization Gotchas",
    stage: "修复合同",
    mechanism:
      "For the More Curious: Initialization Gotchas服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成独立复核。",
    probe:
      "For the More Curious: Initialization Gotchas使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: The Riddle of Excalibur",
    stage: "同输入复验",
    mechanism:
      "Challenge: The Riddle of Excalibur服务于比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战，不是一次示例输出。",
    probe:
      "Challenge: The Riddle of Excalibur使用初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "在初始化顺序中读取尚未建立的属性，或滥用lateinit推迟必填依赖",
  evidence: "初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战",
  boundary:
    "比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效的最小合法输入与第一个非法输入",
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
