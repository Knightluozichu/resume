import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "导读 权威边界",
    action:
      "Packt 产品页和在线目录明确给出 10 个正文章。页面偶尔显示 11 或 12 chapters，是把 Preface 与 Index 也算进导航项；官方前言逐章说明的正文仍是 Chapter 1 到 Chapter 10。导读和总复习只承担导航与验收，不计入原书覆盖。全书不是 Unity API 百科，而是用十组案例把 C# 流畅度、诊断、对象世界、事件架构、相机、Mono 数据处理、AI、编辑器扩展、图形资源与交付串成高级脚本实践。",
    metric: "10 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "十章从语言到交付的证据链",
    action:
      "脚本资产先经 C# 编译成为可实例化组件，组件读写 GameObject 世界并通过事件降低轮询；调试和 Profiler 提供观测，相机与渲染把世界状态变成画面，Mono 集合与文本工具处理数据，AI 状态机消费感知并产生动作，编辑器扩展把重复操作产品化，最后由 Git、外部资源与存档保证交付。十章分别覆盖这条链的语言、观测、状态、调度、表现、数据、决策、工具、资源和历史记录。",
    metric: "producer -> consumer",
    evidence: "Chapter 1. Unity C# Refresher；Chapter 2. Debugging",
    boundary:
      "把现代 Input System、ScriptableObject 或物理系统列成原书正文章，会遗漏调试、相机、Mono、AI、编辑器和交付六条主线。",
  },
  {
    label: "实验",
    stage: "固定版本与目录",
    action:
      "交叉核对英文 ISBN、作者、出版日期、10 章官方目录和中文版 ISBN。逐章建立唯一页面，不把 Preface、Index、导读或总复习计作正文。",
    metric: "single variable",
    evidence:
      "identity -> 10 chapters -> source concepts -> experiment -> modern boundary -> proof",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "分离历史与现代",
    action:
      "逐项记录 UnityScript、MonoDevelop、旧 NavMesh、旧后处理、Resources 与旧 AssetBundle 的历史载体，再映射到现代 C#、Rider/Visual Studio、AI Navigation、SRP 和 Addressables。",
    metric: "normal / edge / failure",
    evidence:
      "把现代 Input System、ScriptableObject 或物理系统列成原书正文章，会遗漏调试、相机、Mono、AI、编辑器和交付六条主线。；官方页面显示 12 个导航项不等于 12 个正文；Preface 与 Index 必须从覆盖分母排除。",
    boundary:
      "原书针对 2015 年 Unity 与 MonoDevelop，仍提到 UnityScript、SendMessage、旧版 Profiler、旧 NavMesh、OnRenderImage 和 Resources/AssetBundle 工作流。现代复现应保留 C# 语义、可观测调试、对象责任、事件驱动、投影、集合、状态机、编辑器自动化和版本化交付这些不变量，再用当前 API 重做实验。无法等价的渲染管线或包行为必须明确标注。",
  },
  {
    label: "验收",
    stage: "导读 证据包",
    action:
      "导读通过标准是 10/10 正文章有唯一页面、12 页导航顺序正确、每页题目与 slug 对齐、中文版与英文版身份可追溯、现代主题没有占用原始名额。跨章样例还要能在固定输入下保存日志、截图、资源版本和失败状态。",
    metric: "replayable proof",
    evidence:
      "中文版对应 Alan Thorn 的 Mastering Unity Scripting 第一版；原书有 10 个正文章，导读和总复习不占覆盖分母；学习链从语言与调试出发，经过世界、事件、表现和数据，落到 AI、工具、资源与交付；现代迁移替换载体但不改写原始问题和章节身份",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function UscOfficialLearningMapMapLab() {
  return (
    <UnityScriptingLab
      title="Unity 脚本设计：官方学习地图"
      chapter="导读 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function UscOfficialLearningMapExperimentLab() {
  return (
    <UnityScriptingLab
      title="Unity 脚本设计：官方学习地图"
      chapter="导读 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function UscOfficialLearningMapEvidenceLab() {
  return (
    <UnityScriptingLab
      title="Unity 脚本设计：官方学习地图"
      chapter="导读 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
