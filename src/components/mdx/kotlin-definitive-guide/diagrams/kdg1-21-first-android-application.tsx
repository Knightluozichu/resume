import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "21. Building Your First Android Application with Kotlin";
const focus =
  "按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用";
const stages = ["固定初态", "施加动作", "推进状态", "观察差异", "复位重放"];
const nodes = [
  {
    label: "21. Building Your First Android Application with Kotlin",
    stage: "固定初态",
    mechanism:
      "21. Building Your First Android Application with Kotlin服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表必须能区分语法缩短与合同改变。",
    probe:
      "21. Building Your First Android Application with Kotlin使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Android Studio",
    stage: "施加动作",
    mechanism:
      "Android Studio服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表验证状态恢复和失败隔离。",
    probe:
      "Android Studio使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Gradle configuration",
    stage: "推进状态",
    mechanism:
      "Gradle configuration服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表验证状态恢复和失败隔离。",
    probe:
      "Gradle configuration使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Project organization",
    stage: "观察差异",
    mechanism:
      "Project organization服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。保存工具链版本、源码、编译命令、产物和退出状态，使IDE按钮之外仍能解释源码如何进入JVM；Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表承担复现责任。",
    probe:
      "Project organization使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Defining a UI",
    stage: "复位重放",
    mechanism:
      "Defining a UI服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成独立复核。",
    probe:
      "Defining a UI使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Running the App on an Emulator",
    stage: "固定初态",
    mechanism:
      "Running the App on an Emulator服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表必须能区分语法缩短与合同改变。",
    probe:
      "Running the App on an Emulator使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Generating a Character",
    stage: "施加动作",
    mechanism:
      "Generating a Character服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成独立复核。",
    probe:
      "Generating a Character使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "The Activity Class",
    stage: "推进状态",
    mechanism:
      "The Activity Class服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表是否支持对象不变量。",
    probe:
      "The Activity Class使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Wiring Up Views",
    stage: "观察差异",
    mechanism:
      "Wiring Up Views服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表验证状态恢复和失败隔离。",
    probe:
      "Wiring Up Views使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Kotlin Android Extensions Synthetic Properties",
    stage: "复位重放",
    mechanism:
      "Kotlin Android Extensions Synthetic Properties服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表是否支持对象不变量。",
    probe:
      "Kotlin Android Extensions Synthetic Properties使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Setting a Click Listener",
    stage: "固定初态",
    mechanism:
      "Setting a Click Listener服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Setting a Click Listener使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Saved Instance State",
    stage: "施加动作",
    mechanism:
      "Saved Instance State服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成独立复核。",
    probe:
      "Saved Instance State使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Reading from the saved instance state",
    stage: "推进状态",
    mechanism:
      "Reading from the saved instance state服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成独立复核。",
    probe:
      "Reading from the saved instance state使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Refactoring to an Extension",
    stage: "观察差异",
    mechanism:
      "Refactoring to an Extension服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成独立复核。",
    probe:
      "Refactoring to an Extension使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Android KTX and Anko Libraries",
    stage: "复位重放",
    mechanism:
      "For the More Curious: Android KTX and Anko Libraries服务于按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表验证状态恢复和失败隔离。",
    probe:
      "For the More Curious: Android KTX and Anko Libraries使用Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把已废弃的Kotlin Android Extensions写成今天仍推荐的方案",
  evidence:
    "Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表",
  boundary:
    "按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用的最小合法输入与第一个非法输入",
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
