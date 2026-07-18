import {
  UnityUiDesignLab,
  type UnityUiDesignSnapshot,
} from "./official-ui-design-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "总复习 的权威边界",
    action:
      "总复习不新增原书主题，也不把现代性能、UI Toolkit 或第三方动画库扩成新章。它按 Chapter 1 到 6 和 Appendix 的顺序建立七个检查点：旧新模型对照、布局约束、控件与导航、响应式锚点、空间 Canvas、事件源码、自包含 3D 场景。每项都要求正常、边界和失败样本，才能从目录覆盖提升为掌握证据。",
    metric: "7 concept groups",
    evidence:
      "https://api.pageplace.de/preview/DT0400.9781783553624_A24173589/preview-9781783553624_A24173589.pdf + https://darkgenesis.zenithmoon.com/announcing-unity-3d-ui-essentials.html",
    boundary: "目录证明范围，运行场景和失败样本证明掌握。",
  },
  {
    label: "对象",
    stage: "综合样例的七道验收门",
    action:
      "综合项目从一个 3D 目标开始：UIAnchor 产生世界位置，Render Camera 投影，屏幕或世界 Canvas 消费；设置菜单由 Rect Transform、Layout Group 和 CanvasScaler 计算，Selectable 与显式导航管理多设备焦点，EventSystem 汇总射线并派发内置或自定义事件。每次状态变化都要能回答输入是谁、目标怎样选、几何由谁写、在哪个空间绘制、正确性怎样证明。",
    metric: "producer -> consumer",
    evidence:
      "Chapter 1：旧 GUI 与新 retained-mode UI 的状态和架构差异；Chapter 2：Canvas、Rect Transform、自动布局、缩放与输入路径",
    boundary:
      "只统计页面数和题目数不能证明掌握；没有运行场景、失败样本和因果链的覆盖仍是形式完成。",
  },
  {
    label: "实验",
    stage: "先验收范围与几何",
    action:
      "核对七个原始单元及唯一归属，打开综合场景，遍历分辨率与长宽比，记录最终矩形、边距、字号和 Canvas scale。",
    metric: "one variable",
    evidence:
      "identity -> layout -> controls -> anchors -> canvas/camera -> event source -> 3D replay",
    boundary: "同时改变布局、输入和相机，会失去故障归属。",
  },
  {
    label: "边界",
    stage: "最后验收扩展与迁移",
    action:
      "派发一个自定义 EventSystem 事件，记录 RaycastAll 和处理器；再切换现代输入或文本载体，确认原书不变量保持，并归档不等价点。",
    metric: "normal / edge / failure",
    evidence:
      "只统计页面数和题目数不能证明掌握；没有运行场景、失败样本和因果链的覆盖仍是形式完成。；现代 API 运行成功也不能证明原书忠实；必须保留原问题、历史载体和差异说明。",
    boundary:
      "综合迁移遵循替换载体而不替换问题：旧 Text 可映射到 TextMeshPro，新 Input System 可映射旧输入模块，Package 源码可映射旧开放仓库，Safe Area 可扩展分辨率矩阵。UI Toolkit 则是另一套对象和事件模型，只能做对照实验。每次迁移都要先跑原始基线，再改变一个载体，复查布局、事件、空间和可访问性证据。",
  },
  {
    label: "验收",
    stage: "总复习 证据包",
    action:
      "最终证据包包含权威身份、七单元覆盖表、九页导航、每页题目、综合场景、设备矩阵、Canvas 三模式、事件时间线、源码扩展决策和现代迁移表。任一原章缺页、某章低于 90 分、事件链不可重放或现代内容冒充原章，都不能签发本书通过。",
    metric: "replayable proof",
    evidence:
      "六章加附录形成从历史、布局、控件到空间与源码的完整系统；综合场景必须同时证明几何、输入、焦点、投影和事件正确；现代迁移按单变量替换载体，并保留原始问题与不等价边界；通过标准是可重放证据与逐章分数，不是页面数量或主观观感",
    boundary: "没有参数、期望和失败重放的截图不能单独签发。",
  },
] as const satisfies ReadonlyArray<UnityUiDesignSnapshot>;

export function UidOfficialFinalReviewMapLab() {
  return (
    <UnityUiDesignLab
      title="Unity UI 设计：全书综合验收"
      chapter="总复习 · Unity 3D UI Essentials"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function UidOfficialFinalReviewExperimentLab() {
  return (
    <UnityUiDesignLab
      title="Unity UI 设计：全书综合验收"
      chapter="总复习 · Unity 3D UI Essentials"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function UidOfficialFinalReviewEvidenceLab() {
  return (
    <UnityUiDesignLab
      title="Unity UI 设计：全书综合验收"
      chapter="总复习 · Unity 3D UI Essentials"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
