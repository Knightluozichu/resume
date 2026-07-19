import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "Kotlin导论";
const focus =
  "明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同";
const stages = ["界定责任", "比较方案", "声明不变量", "验证替换", "记录决策"];
const nodes = [
  {
    label: "Introducing Kotlin",
    stage: "界定责任",
    mechanism:
      "Introducing Kotlin服务于明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成独立复核。",
    probe:
      "Introducing Kotlin使用版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Why Kotlin?",
    stage: "比较方案",
    mechanism:
      "Why Kotlin?服务于明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成独立复核。",
    probe:
      "Why Kotlin?使用版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Who Is This Book For?",
    stage: "声明不变量",
    mechanism:
      "Who Is This Book For?服务于明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成独立复核。",
    probe:
      "Who Is This Book For?使用版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "How to Use This Book",
    stage: "验证替换",
    mechanism:
      "How to Use This Book服务于明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成独立复核。",
    probe:
      "How to Use This Book使用版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious",
    stage: "记录决策",
    mechanism:
      "For the More Curious服务于明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成独立复核。",
    probe:
      "For the More Curious使用版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenges",
    stage: "界定责任",
    mechanism:
      "Challenges服务于明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是版本指纹、目标平台说明、最小程序、学习顺序与迁移边界，不是一次示例输出。",
    probe:
      "Challenges使用版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Typographical conventions",
    stage: "比较方案",
    mechanism:
      "Typographical conventions服务于明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成独立复核。",
    probe:
      "Typographical conventions使用版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Using an eBook",
    stage: "声明不变量",
    mechanism:
      "Using an eBook服务于明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成独立复核。",
    probe:
      "Using an eBook使用版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Looking Forward",
    stage: "验证替换",
    mechanism:
      "Looking Forward服务于明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成独立复核。",
    probe:
      "Looking Forward使用版本指纹、目标平台说明、最小程序、学习顺序与迁移边界完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把当前Kotlin或Android惯例倒灌进2018年原书",
  evidence: "版本指纹、目标平台说明、最小程序、学习顺序与迁移边界",
  boundary:
    "明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同的最小合法输入与第一个非法输入",
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
