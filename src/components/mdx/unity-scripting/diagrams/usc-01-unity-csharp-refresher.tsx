import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 1 权威边界",
    action:
      "官方目录从 Why C#?、Creating script files、Instantiating scripts 开始，依次覆盖 Variables、Conditional statements、Arrays、Loops、Functions、Events；随后进入 Classes and object-oriented programming、inheritance、polymorphism、C# properties、Commenting、Variable visibility、The ? operator，以及 SendMessage and BroadcastMessage。它是复习章，不是完整 C# 教科书。",
    metric: "5 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "从脚本资产到组件实例",
    action:
      "C# 文件是 Project 中的源码资产，主类名需要与文件名匹配；编译成功只产生类型，拖到 GameObject 或 AddComponent 才产生实例。实例字段保存对象状态，方法表达行为，事件向外发布变化，继承与多态允许消费者面向契约工作。属性可约束赋值，却不会自动显示在旧版 Inspector；可见性与序列化是两套规则，public 不是唯一暴露数据的方法。",
    metric: "producer -> consumer",
    evidence:
      "Why C#?；Creating script files；Instantiating scripts；Variables；Conditional statements；Arrays；Loops；Functions；Events",
    boundary:
      "public 同时改变 API 可见性与旧版 Inspector 暴露；应区分封装、序列化和编辑器展示需求。",
  },
  {
    label: "实验",
    stage: "验证类型与实例",
    action:
      "创建同名类与文件，挂到两个对象，分别修改序列化字段并记录 instance ID。再故意让文件名与 MonoBehaviour 类名不匹配，保存挂载失败证据。",
    metric: "single variable",
    evidence: "public sealed class Health : MonoBehaviour {",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "比较耦合方式",
    action:
      "对同一伤害行为分别使用直接引用、接口多态、C# event 和 SendMessage，记录编译期检查、重命名影响、缺失消费者和调用范围。",
    metric: "normal / edge / failure",
    evidence:
      "public 同时改变 API 可见性与旧版 Inspector 暴露；应区分封装、序列化和编辑器展示需求。；SendMessage 的字符串方法名缺少编译期检查，拼写错误与重构漂移只能在运行时暴露。",
    boundary:
      "UnityScript 与 Boo 已退出现代 Unity，C# 成为统一脚本语言；MonoDevelop 通常被 Visual Studio 或 Rider 替代。语言不变量仍是类型、实例、状态、控制流、函数、事件与对象模型。现代项目优先接口、直接引用、UnityEvent 或 C# event，SendMessage 只作为历史机制与特殊动态边界保留。",
  },
  {
    label: "验收",
    stage: "Chapter 1 证据包",
    action:
      "验收包含两个组件实例状态隔离、一次多态调用、一次属性验证、一次事件通知和一次故意失败的字符串消息。日志要能指出文件、类型、实例与消费者，证明读者知道编译成功、挂载成功和行为成功是三道不同门。",
    metric: "replayable proof",
    evidence:
      "脚本文件定义类型，挂载后才形成拥有独立状态的组件实例；基础语言结构必须落到可观察的游戏状态转换；继承、多态、属性和可见性解决不同边界，不能混用；SendMessage 是历史动态派发工具，现代代码应优先可检查契约",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function Usc01UnityCsharpRefresherMapLab() {
  return (
    <UnityScriptingLab
      title="第 1 章 Unity C# Refresher：Unity 语境下的 C# 复习"
      chapter="Chapter 1 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Usc01UnityCsharpRefresherExperimentLab() {
  return (
    <UnityScriptingLab
      title="第 1 章 Unity C# Refresher：Unity 语境下的 C# 复习"
      chapter="Chapter 1 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Usc01UnityCsharpRefresherEvidenceLab() {
  return (
    <UnityScriptingLab
      title="第 1 章 Unity C# Refresher：Unity 语境下的 C# 复习"
      chapter="Chapter 1 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
