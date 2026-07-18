import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 3 权威边界",
    action:
      "官方小节为 The GameObject、Component interactions、GameObjects and the world、The world, time, and updates、Immortal objects、Understanding singleton objects and statics。原章不是泛泛介绍组件，而是分析脚本怎样查找、组织、更新世界对象，以及怎样管理跨场景和全局状态。",
    metric: "5 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "访问范围、所有权和生命周期三角",
    action:
      "GameObject 是组件容器，场景决定对象集合，Transform 把对象放进统一坐标空间，Update 与 deltaTime 推进世界。直接引用最明确，搜索把依赖推迟到运行时，static 把状态绑定到类型，singleton 提供唯一入口，DontDestroyOnLoad 延长实例生命周期。每种方案都要回答谁创建、何时可用、谁销毁、场景切换后是否重置、测试之间是否泄漏。",
    metric: "producer -> consumer",
    evidence:
      "The GameObject；Component interactions；GameObjects and the world",
    boundary:
      "DontDestroyOnLoad 只延长实例生命，不会阻止新场景再创建同类对象。",
  },
  {
    label: "实验",
    stage: "追踪对象身份",
    action:
      "为组件、GameObject 和 Scene 记录 instance ID 与生命周期，比较直接引用、GetComponent、Find 和静态入口的发现时机。",
    metric: "single variable",
    evidence: "public sealed class Session : MonoBehaviour {",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "破坏跨场景唯一性",
    action:
      "让两个场景都携带管理器，重放 A-B-A，检查重复实例、静态字段、事件监听和销毁顺序，再实现明确的所有权规则。",
    metric: "normal / edge / failure",
    evidence:
      "DontDestroyOnLoad 只延长实例生命，不会阻止新场景再创建同类对象。；关闭 Domain Reload 的现代 Editor 设置可能保留 static 状态，测试不能假设每次 Play 都自动清零。",
    boundary:
      "现代 Unity 可用 FindFirstObjectByType、SceneManager、依赖注入或 SubsystemRegistration 改善对象发现和静态重置，但原章的所有权问题不变。旧 FindObjectOfType 名称与性能特征应映射到当前 API；进入 Play Mode 选项会改变静态与场景重载，必须加入现代边界测试。",
  },
  {
    label: "验收",
    stage: "Chapter 3 证据包",
    action:
      "验收包含三种帧率下相同位移、A-B-A 场景切换、重复管理器销毁、静态重置和监听器数量。每个全局对象都要有创建者、唯一键、销毁点与测试清理；若只能靠 Hierarchy 肉眼确认唯一性，不算闭环。",
    metric: "replayable proof",
    evidence:
      "GameObject 世界同时受场景、坐标、时间和组件关系约束；访问方便与状态所有权是不同问题；单例、static 和跨场景对象必须明确创建、重置与销毁；帧率和 Play Mode 配置都属于世界状态的测试输入",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function Usc03SingletonsStaticsGameobjectsWorldMapLab() {
  return (
    <UnityScriptingLab
      title="第 3 章 Singletons, Statics, GameObjects, and the World"
      chapter="Chapter 3 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Usc03SingletonsStaticsGameobjectsWorldExperimentLab() {
  return (
    <UnityScriptingLab
      title="第 3 章 Singletons, Statics, GameObjects, and the World"
      chapter="Chapter 3 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Usc03SingletonsStaticsGameobjectsWorldEvidenceLab() {
  return (
    <UnityScriptingLab
      title="第 3 章 Singletons, Statics, GameObjects, and the World"
      chapter="Chapter 3 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
