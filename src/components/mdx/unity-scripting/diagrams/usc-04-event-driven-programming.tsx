import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 4 权威边界",
    action:
      "官方目录只有三个主小节：Events、Event management、Code folding in MonoDevelop with #region and #endregion。范围虽短，核心却是把高频 Update 工作迁移成事件，并集中管理事件关系。#region 是可读性工具，不应被误写成模块系统或性能优化。",
    metric: "3 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "发布者到订阅者的生命周期契约",
    action:
      "发布者拥有状态并在真实变化时发出不可变载荷，事件管理层决定通道和可见范围，订阅者在启用期间注册并在禁用时注销。事件只说明“发生了什么”，不应让发布者知道每个消费者。调用是同步还是排队、顺序是否有语义、异常是否阻断后续监听者，都要成为显式契约。#region 只能折叠文件视觉，不能替代组件和程序集边界。",
    metric: "producer -> consumer",
    evidence: "Events；Event management",
    boundary:
      "匿名 lambda 若没有保存引用，注销时可能创建了另一个委托，导致监听器持续残留。",
  },
  {
    label: "实验",
    stage: "测量轮询基线",
    action:
      "让多个消费者在 Update 读取同一状态，统计十秒检查次数、真正变化次数和 CPU 时间，固定对象数量与场景。",
    metric: "single variable",
    evidence: "public event Action<DoorOpened> Opened;",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "破坏生命周期与顺序",
    action:
      "重复注册、禁用监听器、让回调抛异常或重入，记录后续消费者、状态一致性与修复策略。",
    metric: "normal / edge / failure",
    evidence:
      "匿名 lambda 若没有保存引用，注销时可能创建了另一个委托，导致监听器持续残留。；事件减少轮询不代表免费；高频事件、重载荷和同步长回调仍会阻塞主线程。",
    boundary:
      "现代 C# event、UnityEvent、ScriptableObject event channel 与消息总线都可实现事件驱动，但应按类型安全、序列化、性能和生命周期选择。#region 仍可用，却不应掩盖过大的类；真正边界应由组件、命名空间、程序集和测试体现。现代迁移保留“只在状态变化时通知”的原章不变量。",
  },
  {
    label: "验收",
    stage: "Chapter 4 证据包",
    action:
      "验收对比轮询与事件版的检查次数、实际通知次数、Profiler 时间和行为一致性。必须包含重复订阅、消费者禁用、异常监听器和重入样本，并证明场景卸载后监听器归零。",
    metric: "replayable proof",
    evidence:
      "事件把高频询问改成状态变化通知；发布者、载荷、订阅者和生命周期必须有明确契约；同步事件仍可能产生阻塞、顺序和重入问题；#region 是代码阅读工具，不是运行时架构",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function Usc04EventDrivenProgrammingMapLab() {
  return (
    <UnityScriptingLab
      title="第 4 章 Event-driven Programming：从轮询到事件架构"
      chapter="Chapter 4 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Usc04EventDrivenProgrammingExperimentLab() {
  return (
    <UnityScriptingLab
      title="第 4 章 Event-driven Programming：从轮询到事件架构"
      chapter="Chapter 4 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Usc04EventDrivenProgrammingEvidenceLab() {
  return (
    <UnityScriptingLab
      title="第 4 章 Event-driven Programming：从轮询到事件架构"
      chapter="Chapter 4 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
