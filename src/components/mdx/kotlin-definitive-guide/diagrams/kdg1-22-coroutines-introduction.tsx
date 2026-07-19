import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "22. Introduction to Coroutines";
const focus =
  "在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败";
const stages = ["固定初态", "施加动作", "推进状态", "观察差异", "复位重放"];
const nodes = [
  {
    label: "22. Introduction to Coroutines",
    stage: "固定初态",
    mechanism:
      "22. Introduction to Coroutines服务于在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明验证状态恢复和失败隔离。",
    probe:
      "22. Introduction to Coroutines使用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Parsing Character Data",
    stage: "施加动作",
    mechanism:
      "Parsing Character Data服务于在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成独立复核。",
    probe:
      "Parsing Character Data使用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Fetching Live Data",
    stage: "推进状态",
    mechanism:
      "Fetching Live Data服务于在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明验证状态恢复和失败隔离。",
    probe:
      "Fetching Live Data使用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "The Android Main Thread",
    stage: "观察差异",
    mechanism:
      "The Android Main Thread服务于在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明验证状态恢复和失败隔离。",
    probe:
      "The Android Main Thread使用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Enabling Coroutines",
    stage: "复位重放",
    mechanism:
      "Enabling Coroutines服务于在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明验证状态恢复和失败隔离。",
    probe:
      "Enabling Coroutines使用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Specifying a Coroutine with async",
    stage: "固定初态",
    mechanism:
      "Specifying a Coroutine with async服务于在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明必须能区分语法缩短与合同改变。",
    probe:
      "Specifying a Coroutine with async使用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "launch vs async/await",
    stage: "施加动作",
    mechanism:
      "launch vs async/await服务于在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败。将生命周期、线程或任务所有者和取消出口放在同一时间线上，区分2018年的接口身份与当前迁移方案；用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明验证状态恢复和失败隔离。",
    probe:
      "launch vs async/await使用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Suspending Functions",
    stage: "推进状态",
    mechanism:
      "Suspending Functions服务于在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明必须能区分语法缩短与合同改变。",
    probe:
      "Suspending Functions使用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Live Data",
    stage: "观察差异",
    mechanism:
      "Challenge: Live Data服务于在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明，不是一次示例输出。",
    probe:
      "Challenge: Live Data使用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Minimum Strength",
    stage: "复位重放",
    mechanism:
      "Challenge: Minimum Strength服务于在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明，不是一次示例输出。",
    probe:
      "Challenge: Minimum Strength使用调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把协程等同后台线程，或启动无所有者的任务后更新已销毁界面",
  evidence:
    "调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明",
  boundary:
    "在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败的最小合法输入与第一个非法输入",
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
