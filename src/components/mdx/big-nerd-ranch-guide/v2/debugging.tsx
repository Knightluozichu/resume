"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "debugging",
  title: "Android应用的调试",
  task: "从稳定失败、堆栈首个业务帧和设备状态定位 Android 缺陷",
  owner: "测试、Logcat、断点与问题工件的责任人",
  state: "失败输入、线程、异常、调用栈和修复假设",
  event: "重放最小失败用例并一次只改变一个原因",
  invariant: "同一失败输入在修复前稳定失败、修复后稳定通过且邻近用例不回归",
  fault: "捕获异常或删除日志让界面不崩，却没有修复无效状态",
  evidence: "失败测试、完整堆栈、断点快照、修复差异和回归结果",
  concepts: [
    "5. Debugging Android Apps",
    "Exceptions and Stack Traces",
    "Android-Specific Debugging",
    "Challenge: Exploring the Layout Inspector",
    "Challenge: Exploring the Profiler",
  ],
  transitions: [
    {
      action: "冻结入口：5. Debugging Android Apps",
      state:
        "记录测试、Logcat、断点与问题工件的责任人的初始失败输入、线程、异常、调用栈和修复假设",
      evidence:
        "失败测试、完整堆栈、断点快照、修复差异和回归结果中的“5. Debugging Android Apps”轨迹",
    },
    {
      action: "触发事件：Exceptions and Stack Traces",
      state:
        "以“重放最小失败用例并一次只改变一个原因”改变失败输入、线程、异常、调用栈和修复假设",
      evidence:
        "失败测试、完整堆栈、断点快照、修复差异和回归结果中的“Exceptions and Stack Traces”轨迹",
    },
    {
      action: "提交状态：Android-Specific Debugging",
      state: "只由测试、Logcat、断点与问题工件的责任人提交新状态",
      evidence:
        "失败测试、完整堆栈、断点快照、修复差异和回归结果中的“Android-Specific Debugging”轨迹",
    },
    {
      action: "重建边界：Challenge: Exploring the Layout Inspector",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "失败测试、完整堆栈、断点快照、修复差异和回归结果中的“Challenge: Exploring the Layout Inspector”轨迹",
    },
    {
      action: "核对交付：Challenge: Exploring the Profiler",
      state:
        "以“同一失败输入在修复前稳定失败、修复后稳定通过且邻近用例不回归”判断通过",
      evidence: "失败测试、完整堆栈、断点快照、修复差异和回归结果",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“重放最小失败用例并一次只改变一个原因”",
      expected:
        "由测试、Logcat、断点与问题工件的责任人提交失败输入、线程、异常、调用栈和修复假设，并持续满足“同一失败输入在修复前稳定失败、修复后稳定通过且邻近用例不回归”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“捕获异常或删除日志让界面不崩，却没有修复无效状态”",
      expected:
        "找到首个状态分岔，撤销后以失败测试、完整堆栈、断点快照、修复差异和回归结果证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function DebuggingContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function DebuggingLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function DebuggingFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
