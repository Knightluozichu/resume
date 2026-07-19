import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "14. Inheritance";
const focus =
  "理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换";
const stages = ["界定责任", "比较方案", "声明不变量", "验证替换", "记录决策"];
const nodes = [
  {
    label: "14. Inheritance",
    stage: "界定责任",
    mechanism:
      "14. Inheritance服务于理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型层次图、替换测试、转换失败样例、Any边界和Room子类实验是否支持对象不变量。",
    probe:
      "14. Inheritance使用类型层次图、替换测试、转换失败样例、Any边界和Room子类实验完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Defining the Room Class",
    stage: "比较方案",
    mechanism:
      "Defining the Room Class服务于理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型层次图、替换测试、转换失败样例、Any边界和Room子类实验是否支持对象不变量。",
    probe:
      "Defining the Room Class使用类型层次图、替换测试、转换失败样例、Any边界和Room子类实验完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Creating a Subclass",
    stage: "声明不变量",
    mechanism:
      "Creating a Subclass服务于理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型层次图、替换测试、转换失败样例、Any边界和Room子类实验是否支持对象不变量。",
    probe:
      "Creating a Subclass使用类型层次图、替换测试、转换失败样例、Any边界和Room子类实验完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Type Checking",
    stage: "验证替换",
    mechanism:
      "Type Checking服务于理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型层次图、替换测试、转换失败样例、Any边界和Room子类实验是否支持对象不变量。",
    probe:
      "Type Checking使用类型层次图、替换测试、转换失败样例、Any边界和Room子类实验完成出现、解释、实验和练习四级核对",
  },
  {
    label: "The Kotlin Type Hierarchy",
    stage: "记录决策",
    mechanism:
      "The Kotlin Type Hierarchy服务于理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型层次图、替换测试、转换失败样例、Any边界和Room子类实验是否支持对象不变量。",
    probe:
      "The Kotlin Type Hierarchy使用类型层次图、替换测试、转换失败样例、Any边界和Room子类实验完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Type casting",
    stage: "界定责任",
    mechanism:
      "Type casting服务于理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型层次图、替换测试、转换失败样例、Any边界和Room子类实验是否支持对象不变量。",
    probe:
      "Type casting使用类型层次图、替换测试、转换失败样例、Any边界和Room子类实验完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Smart casting",
    stage: "比较方案",
    mechanism:
      "Smart casting服务于理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以类型层次图、替换测试、转换失败样例、Any边界和Room子类实验完成独立复核。",
    probe:
      "Smart casting使用类型层次图、替换测试、转换失败样例、Any边界和Room子类实验完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Any",
    stage: "声明不变量",
    mechanism:
      "For the More Curious: Any服务于理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以类型层次图、替换测试、转换失败样例、Any边界和Room子类实验完成独立复核。",
    probe:
      "For the More Curious: Any使用类型层次图、替换测试、转换失败样例、Any边界和Room子类实验完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "仅为复用代码建立继承，导致子类破坏父类合同",
  evidence: "类型层次图、替换测试、转换失败样例、Any边界和Room子类实验",
  boundary:
    "理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换的最小合法输入与第一个非法输入",
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
