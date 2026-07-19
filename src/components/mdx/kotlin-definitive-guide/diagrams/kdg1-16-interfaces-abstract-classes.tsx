import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "16. Interfaces and Abstract Classes";
const focus =
  "用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为";
const stages = ["界定责任", "比较方案", "声明不变量", "验证替换", "记录决策"];
const nodes = [
  {
    label: "16. Interfaces and Abstract Classes",
    stage: "界定责任",
    mechanism:
      "16. Interfaces and Abstract Classes服务于用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查能力关系图、默认实现、抽象状态说明、替身实现与战斗测试是否支持对象不变量。",
    probe:
      "16. Interfaces and Abstract Classes使用能力关系图、默认实现、抽象状态说明、替身实现与战斗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Defining an Interface",
    stage: "比较方案",
    mechanism:
      "Defining an Interface服务于用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查能力关系图、默认实现、抽象状态说明、替身实现与战斗测试是否支持对象不变量。",
    probe:
      "Defining an Interface使用能力关系图、默认实现、抽象状态说明、替身实现与战斗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Implementing an Interface",
    stage: "声明不变量",
    mechanism:
      "Implementing an Interface服务于用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查能力关系图、默认实现、抽象状态说明、替身实现与战斗测试是否支持对象不变量。",
    probe:
      "Implementing an Interface使用能力关系图、默认实现、抽象状态说明、替身实现与战斗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Default Implementations",
    stage: "验证替换",
    mechanism:
      "Default Implementations服务于用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以能力关系图、默认实现、抽象状态说明、替身实现与战斗测试完成独立复核。",
    probe:
      "Default Implementations使用能力关系图、默认实现、抽象状态说明、替身实现与战斗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Abstract Classes",
    stage: "记录决策",
    mechanism:
      "Abstract Classes服务于用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查能力关系图、默认实现、抽象状态说明、替身实现与战斗测试是否支持对象不变量。",
    probe:
      "Abstract Classes使用能力关系图、默认实现、抽象状态说明、替身实现与战斗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Combat in NyetHack",
    stage: "界定责任",
    mechanism:
      "Combat in NyetHack服务于用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以能力关系图、默认实现、抽象状态说明、替身实现与战斗测试完成独立复核。",
    probe:
      "Combat in NyetHack使用能力关系图、默认实现、抽象状态说明、替身实现与战斗测试完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把接口当数据容器或用抽象基类强迫无关类型共享状态",
  evidence: "能力关系图、默认实现、抽象状态说明、替身实现与战斗测试",
  boundary:
    "用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为的最小合法输入与第一个非法输入",
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
