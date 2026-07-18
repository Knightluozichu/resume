import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "总复习 权威边界",
    action:
      "总复习不新增原书章节。它按 Unity C# Refresher、Debugging、Singletons/Statics/GameObjects/World、Event-driven Programming、Cameras/Rendering/Scenes、Working with Mono、Artificial Intelligence、Customizing the Unity Editor、Textures/Models/2D、Source Control/Other Tips 十个检查点签发。现代 API 只进入迁移矩阵。",
    metric: "10 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "从源码提交到运行结果再回到证据",
    action:
      "Git 检出脚本和资源身份，C# 编译产生组件类型，场景实例进入世界，事件与 AI 更新状态，集合和文本提供配置，相机与图形资源生成画面，Profiler 与调试工具记录行为，编辑器工具维护资产，存档把状态带到下一次运行。失败可以沿相反方向回溯：像素到相机、状态到事件、决策到感知、资源到 GUID、存档到 schema。",
    metric: "producer -> consumer",
    evidence:
      "Chapter 1：脚本资产、类型、实例与 C# 契约；Chapter 2：错误分类、观测、根因与回归",
    boundary:
      "十个页面分数通过不代表跨章接口正确；综合场景必须验证事件、状态、资源和存档连接处。",
  },
  {
    label: "实验",
    stage: "验收身份与构建",
    action:
      "核对 10/10 原始单元和 12 页，干净检出并编译，确认脚本、.meta、场景和编辑器程序集边界。",
    metric: "single variable",
    evidence:
      "git/meta -> C# compile -> scene/world -> events -> AI/data -> camera/assets -> save/evidence",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "验收工具与恢复",
    action:
      "执行可撤销编辑器操作，加载外部资源，保存并破坏存档，再验证迁移、备份和失败报告；最后逐项运行现代迁移矩阵。",
    metric: "normal / edge / failure",
    evidence:
      "十个页面分数通过不代表跨章接口正确；综合场景必须验证事件、状态、资源和存档连接处。；一次同时替换 IDE、输入、渲染、AI 和资源系统会失去归因，现代迁移必须逐项进行。",
    boundary:
      "综合迁移按载体逐项替换：MonoDevelop 到 Rider/Visual Studio，UnityScript 到 C#，旧 NavMesh 到 AI Navigation，Built-in 后处理到 SRP，手工 Bundle 到 Addressables。每次先跑旧问题基线，再改变一个载体，复查行为、性能和失败边界；不等价项保持双轨说明。",
  },
  {
    label: "验收",
    stage: "总复习 证据包",
    action:
      "签发包包含英文与中文身份、10 单元覆盖表、12 页导航、72 道题、专属交互图、干净检出、目标场景、事件与 AI 时间线、相机和资源截图、编辑器 Undo、存档恢复及现代迁移矩阵。任一原章缺失或页面低于 90 都保持未完成。",
    metric: "replayable proof",
    evidence:
      "十章共同覆盖语言、观测、世界、事件、表现、数据、决策、工具、资源与交付；综合样例必须能从症状反向定位到明确生产者；干净检出、确定输入与失败重放让结论可由他人验证；现代替换一次只改变一个载体，并保留不等价边界",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function UscOfficialFinalReviewMapLab() {
  return (
    <UnityScriptingLab
      title="Unity 脚本设计：全书综合验收"
      chapter="总复习 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function UscOfficialFinalReviewExperimentLab() {
  return (
    <UnityScriptingLab
      title="Unity 脚本设计：全书综合验收"
      chapter="总复习 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function UscOfficialFinalReviewEvidenceLab() {
  return (
    <UnityScriptingLab
      title="Unity 脚本设计：全书综合验收"
      chapter="总复习 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
