import {
  UnityUiDesignLab,
  type UnityUiDesignSnapshot,
} from "./official-ui-design-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 1 的权威边界",
    action:
      "原章先盘点 State of play 与 GUI controls，逐项走过 Label、Texture drawing、Button、Text、Box、Toggle/checkbox、Toolbar panels、Slider/Scrollbar、ScrollView、Rich Text Formatting、分组、命名、焦点、Tooltips、Window、GUI styles and skins、GUI events and properties、BeginArea 与横纵布局。随后才进入 New layouts、Rect Transform、Canvas、Groups、Masking、New controls、New UnityEvent system、Control extensibility 和 Animation，并用当时的 Asset Store 生态结束比较。",
    metric: "6 concept groups",
    evidence:
      "https://api.pageplace.de/preview/DT0400.9781783553624_A24173589/preview-9781783553624_A24173589.pdf + https://darkgenesis.zenithmoon.com/announcing-unity-3d-ui-essentials.html",
    boundary: "目录证明范围，运行场景和失败样本证明掌握。",
  },
  {
    label: "对象",
    stage: "即时声明与保留对象的差异",
    action:
      "旧 IMGUI 每帧执行 OnGUI，代码同时声明控件、读取事件并决定绘制；新 UI 则把 GameObject、RectTransform、Graphic、CanvasRenderer 与事件组件保存在场景中。前者便于快速调试面板，后者让层级、序列化引用、动画轨道、导航和美术协作变得可见。核心变化不是“函数变组件”这么简单，而是状态拥有者从瞬时调用转成持久对象，布局从调用顺序转成父子约束，事件从 Event.current 分支转成可路由的 UnityEvent 与接口。",
    metric: "producer -> consumer",
    evidence:
      "State of play；GUI controls；Label、Texture drawing、Button、Text、Box 与 Toggle/checkbox；Toolbar panels；Slider/Scrollbar；ScrollView；Rich Text Formatting 与 common control features",
    boundary:
      "旧 IMGUI 仍适合小型调试工具；把它描述为完全不可用，会掩盖两种模型各自的成本。",
  },
  {
    label: "实验",
    stage: "复现旧控件表面",
    action:
      "用 OnGUI 放置 Label、Button、Toggle、Slider 和 ScrollView，记录事件读取、样式与布局代码如何集中在一个回调里。不要省略旧系统的能力，否则比较会变成稻草人。",
    metric: "one variable",
    evidence: "void OnGUI() {",
    boundary: "同时改变布局、输入和相机，会失去故障归属。",
  },
  {
    label: "边界",
    stage: "追踪一次状态变化",
    action:
      "点击 Add，沿 Input Module、EventSystem、Button、UnityEvent 到 score 状态，再观察文本更新和 Canvas 重建。保存正常、无 EventSystem 与遮挡射线三种结果。",
    metric: "normal / edge / failure",
    evidence:
      "旧 IMGUI 仍适合小型调试工具；把它描述为完全不可用，会掩盖两种模型各自的成本。；TextMeshPro 与 UI Toolkit 不是 2015 年第一章的新控件，现代迁移必须与原始目录分栏记录。",
    boundary:
      "今天复现时可以用 TextMeshPro 替代旧 Text，用新输入系统模块替代 StandaloneInputModule，但应保留“持久层级、矩形约束、可路由事件”这三个不变量。当时列举的 TextMeshPro 还是付费 Asset Store 扩展，今天已成为常用包；这是一项版本变化，不能倒写成原书发布时的默认事实。旧 OnGUI 仍可用于少量运行时调试，而生产界面通常选择 uGUI 或 UI Toolkit。",
  },
  {
    label: "验收",
    stage: "Chapter 1 证据包",
    action:
      "验收证据应包含同一界面的旧、新实现，至少一次焦点切换、一次遮挡命中、一次动画或样式变化，并能说明状态由谁持有。关闭 EventSystem 后按钮不响应、启用 Raycast Target 的透明图像拦截输入，都应作为失败样本保存。",
    metric: "replayable proof",
    evidence:
      "第一章完整回顾旧 GUI，目的是建立公平的架构对照；新 UI 的关键改变是持久对象、矩形约束、Canvas 渲染和可扩展事件；旧控件与新控件可以实现相似外观，但状态、布局和协作成本不同；现代包变化只能写进迁移边界，不能篡改 2015 年原始事实",
    boundary: "没有参数、期望和失败重放的截图不能单独签发。",
  },
] as const satisfies ReadonlyArray<UnityUiDesignSnapshot>;

export function Uid01LookingBackLookingForwardMapLab() {
  return (
    <UnityUiDesignLab
      title="第 1 章 Looking Back, Looking Forward：从旧 GUI 到新 UI"
      chapter="Chapter 1 · Unity 3D UI Essentials"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Uid01LookingBackLookingForwardExperimentLab() {
  return (
    <UnityUiDesignLab
      title="第 1 章 Looking Back, Looking Forward：从旧 GUI 到新 UI"
      chapter="Chapter 1 · Unity 3D UI Essentials"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Uid01LookingBackLookingForwardEvidenceLab() {
  return (
    <UnityUiDesignLab
      title="第 1 章 Looking Back, Looking Forward：从旧 GUI 到新 UI"
      chapter="Chapter 1 · Unity 3D UI Essentials"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
