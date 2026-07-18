import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 8 权威边界",
    action:
      "官方小节为 Batch renaming、C# attributes and reflection、Color blending、Property exposing、Localization。原章通过这些案例展示自定义编辑器；不应把整个现代 UI Toolkit Editor API 扩成额外原始章节。",
    metric: "5 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "选择、验证、变更、撤销与持久化",
    action:
      "编辑器工具先读取 Selection 或资产输入，预览即将发生的变更，验证命名冲突和目标类型；执行时通过 Undo 记录对象，用 SerializedProperty 改序列化数据，处理 Prefab override 与 dirty 标记，最后保存资产并输出报告。Attribute 描述元数据，Reflection 发现目标，CustomEditor 或 PropertyDrawer 呈现和编辑。运行时代码与 Editor 程序集必须隔离。",
    metric: "producer -> consumer",
    evidence: "Batch renaming；C# attributes and reflection",
    boundary:
      "直接给字段赋值可能绕过 Undo、多对象编辑和 Prefab override，界面看似变化却无法可靠保存。",
  },
  {
    label: "实验",
    stage: "实现安全批量操作",
    action:
      "读取 Selection，先生成旧名、新名和冲突预览；确认后在一个 Undo group 中执行，并验证撤销、重做和场景保存。",
    metric: "single variable",
    evidence: "Undo.IncrementCurrentGroup();",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "交付本地化工具",
    action:
      "建立稳定 key、语言表、缺失翻译报告和运行时查询，验证键重命名、重复键、字体和构建不含 Editor 程序集。",
    metric: "normal / edge / failure",
    evidence:
      "直接给字段赋值可能绕过 Undo、多对象编辑和 Prefab override，界面看似变化却无法可靠保存。；反射扫描全部程序集和对象若每次 OnGUI 都执行，会让编辑器卡顿；应缓存元数据并明确失效条件。",
    boundary:
      "现代 Unity 可用 UI Toolkit 构建 EditorWindow，也有新的 Localization package，但原章的批量操作、Attribute/Reflection、属性暴露和本地化问题仍成立。IMGUI 与 UI Toolkit 只是呈现载体；Undo、SerializedObject、AssetDatabase、程序集隔离和可重放变更才是稳定契约。",
  },
  {
    label: "验收",
    stage: "Chapter 8 证据包",
    action:
      "验收包含 100 个对象批量重命名、冲突预览、一次撤销/重做、Prefab 实例、多对象属性编辑、颜色边界和三语言缺失键报告。关闭重开项目后结果保持，Player 构建依赖图中不出现 UnityEditor。",
    metric: "replayable proof",
    evidence:
      "编辑器自动化必须先预览验证，再可撤销地提交；SerializedProperty 是持久化、多对象和 Prefab 语义的重要入口；Attribute 描述意图，Reflection 发现目标，UI 只是呈现层；现代 UI Toolkit 不改变 Undo、资产和程序集边界",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function Usc08CustomizingUnityEditorMapLab() {
  return (
    <UnityScriptingLab
      title="第 8 章 Customizing the Unity Editor：把重复操作变成工具"
      chapter="Chapter 8 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Usc08CustomizingUnityEditorExperimentLab() {
  return (
    <UnityScriptingLab
      title="第 8 章 Customizing the Unity Editor：把重复操作变成工具"
      chapter="Chapter 8 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Usc08CustomizingUnityEditorEvidenceLab() {
  return (
    <UnityScriptingLab
      title="第 8 章 Customizing the Unity Editor：把重复操作变成工具"
      chapter="Chapter 8 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
