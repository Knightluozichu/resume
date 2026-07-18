import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 2 权威边界",
    action:
      "官方目录包含 Compilation errors and the console、Debug.Log custom messages、Overriding the ToString method、Visual debugging、Error logging、Editor debugging、Using the profiler；随后逐项使用 MonoDevelop 的 Watch window、continue and stepping、call stack、Immediate window、conditional breakpoints 和 tracepoints。现代 IDE 可替换界面，但这些调试动作仍是原章边界。",
    metric: "5 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "观察、复现、隔离、修复与回归",
    action:
      "可靠调试先把故障变成确定输入，再建立从症状到状态的观测点。日志需要对象、场景、帧号和关键参数，ToString 让领域状态可读，Gizmo 把向量和范围画进场景，断点与 Watch 观察单次控制流，Call Stack 还原调用来源，Profiler 证明耗时归属。修复后必须用同一输入复测，并保留至少一个失败样本防止回归。",
    metric: "producer -> consumer",
    evidence:
      "Compilation errors and the console；Debug.Log custom messages；Overriding the ToString method；Visual debugging；Error logging；Editor debugging；Using the profiler",
    boundary:
      "大量无上下文 Debug.Log 会改变时序、淹没关键信号并增加分配，日志数量不等于可观测性。",
  },
  {
    label: "实验",
    stage: "固定失败输入",
    action:
      "记录场景、随机种子、对象 ID、帧号和操作序列，先确认错误可以重复出现。按编译、异常、逻辑、视觉或性能分类，不急于改代码。",
    metric: "single variable",
    evidence:
      'Debug.Log($"frame={Time.frameCount} actor={name} state={state} target={target?.name}", this);',
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "验证修复与回归",
    action:
      "只修一个根因，用同一输入重放，再增加空引用、边界距离、重复事件和高负载样本。保存修复前后日志和失败用例。",
    metric: "normal / edge / failure",
    evidence:
      "大量无上下文 Debug.Log 会改变时序、淹没关键信号并增加分配，日志数量不等于可观测性。；只在 Editor 里调试会遗漏构建差异、平台权限、优化级别和目标设备性能。",
    boundary:
      "MonoDevelop 已被 Visual Studio、Rider 等 IDE 取代，但断点、Watch、Step、Call Stack、Immediate 与条件断点的诊断语义不变。现代 Unity 还可使用 Profile Analyzer、Memory Profiler、ProfilerMarker 和平台工具。迁移时要记录工具对运行时的扰动，Development Build 与 Release 不能混作同一基线。",
  },
  {
    label: "验收",
    stage: "Chapter 2 证据包",
    action:
      "验收选择一个编译错误、一个空引用、一个错误状态、一个空间命中错误和一个性能热点。每项都要有复现输入、匹配工具、中间观测、根因、单变量修复与回归样本；关闭日志或 Gizmo 后，测试仍能自动判定结果。",
    metric: "replayable proof",
    evidence:
      "没有异常不代表没有逻辑、视觉或性能错误；工具要匹配故障类型，并提供足够上下文定位生产者；固定复现与单变量修复是调试因果成立的前提；现代 IDE 替换 MonoDevelop 界面，但核心调试动作保持",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function Usc02DebuggingMapLab() {
  return (
    <UnityScriptingLab
      title="第 2 章 Debugging：从错误分类到可重放诊断"
      chapter="Chapter 2 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Usc02DebuggingExperimentLab() {
  return (
    <UnityScriptingLab
      title="第 2 章 Debugging：从错误分类到可重放诊断"
      chapter="Chapter 2 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Usc02DebuggingEvidenceLab() {
  return (
    <UnityScriptingLab
      title="第 2 章 Debugging：从错误分类到可重放诊断"
      chapter="Chapter 2 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
