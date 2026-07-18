import {
  UnityUiDesignLab,
  type UnityUiDesignSnapshot,
} from "./official-ui-design-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 2 的权威边界",
    action:
      "原章依次覆盖 The Rect Transforms、Rect Tool、Rect Transform component、Scaling the Rect Transform、Canvas、Canvas Renderer、Canvas Groups；随后进入 Horizontal Layout Group、Vertical Layout Group、Grid Layout Group、Layout options、Layout Element、Content Size Fitter、Aspect Ratio Fitter、Scroll Rect 与 Masks；最后比较 Constant Pixel Size、Scale with Screen Size、Constant Physical Size，并连接 UnityEvent system、Raycasting、Input modules、Input events 与 Event Triggers。",
    metric: "6 concept groups",
    evidence:
      "https://api.pageplace.de/preview/DT0400.9781783553624_A24173589/preview-9781783553624_A24173589.pdf + https://darkgenesis.zenithmoon.com/announcing-unity-3d-ui-essentials.html",
    boundary: "目录证明范围，运行场景和失败样本证明掌握。",
  },
  {
    label: "对象",
    stage: "从父矩形到最终像素的约束求解",
    action:
      "当 anchorMin 与 anchorMax 相等时，锚点定义父矩形中的参考点，anchoredPosition 再给出轴心到参考点的偏移；当两者不等时，元素进入拉伸模式，左右或上下偏移代替固定尺寸。Layout Group 会读取子元素的 min、preferred、flexible 值并写入位置尺寸，Content Size Fitter 又根据布局输入调整自身。若同一轴的尺寸既由父布局写入又由自身 fitter 反向决定，就可能形成重建循环或抖动。",
    metric: "producer -> consumer",
    evidence:
      "The Rect Transforms；Rect Tool；Rect Transform component；Scaling the Rect Transform；Canvas；Canvas Renderer；Canvas Groups",
    boundary:
      "在同一轴同时让 Content Size Fitter 和父 Layout Group 控制尺寸，容易产生循环重建或不稳定结果。",
  },
  {
    label: "实验",
    stage: "建立锚点基线",
    action:
      "在 1920x1080 参考分辨率放置四角标记与拉伸面板，分别记录 anchorMin、anchorMax、pivot、sizeDelta 和 anchoredPosition，再切换长宽比观察哪项保持。",
    metric: "one variable",
    evidence: "var rect = panel.rectTransform;",
    boundary: "同时改变布局、输入和相机，会失去故障归属。",
  },
  {
    label: "边界",
    stage: "连接事件证据",
    action:
      "为滚动区域加入 Mask、ScrollRect 与 Event Trigger，记录 GraphicRaycaster 命中顺序。分别测试透明遮挡、禁用 CanvasGroup.interactable 和移除 InputModule。",
    metric: "normal / edge / failure",
    evidence:
      "在同一轴同时让 Content Size Fitter 和父 Layout Group 控制尺寸，容易产生循环重建或不稳定结果。；Constant Physical Size 依赖设备 DPI；平台报告值不可信时，物理尺寸不会自动变得准确。",
    boundary:
      "现代 Unity 的 uGUI 布局核心仍与原章一致，但 Safe Area、设备旋转、动态字体与 TextMeshPro 的首选尺寸会增加新的输入。新 Input System 的 InputSystemUIInputModule 替代旧模块时，事件数据链保持不变，动作绑定和设备来源发生变化。迁移时不应把 ForceRebuildLayoutImmediate 当常规修复；它适合诊断或明确的同步读取点，长期方案仍是消除约束循环并减少无效重建。",
  },
  {
    label: "验收",
    stage: "Chapter 2 证据包",
    action:
      "验收至少覆盖三种分辨率、两种长宽比和一次内容数量变化。每个元素都能回答“水平尺寸谁写、垂直尺寸谁写、射线是否参与、缩放由谁决定”。Profiler 或布局调试记录应证明没有持续重建，失败样本要保留 DPI 异常、透明遮挡和嵌套 fitter 抖动。",
    metric: "replayable proof",
    evidence:
      "Rect Transform 是父矩形、锚点、轴心和偏移共同决定的约束结果；自动布局必须明确每个轴唯一的尺寸拥有者；CanvasScaler 决定参考尺寸到屏幕的映射，三种模式适用条件不同；事件命中依赖最终几何、Raycast Target、Raycaster 和 Input Module",
    boundary: "没有参数、期望和失败重放的截图不能单独签发。",
  },
] as const satisfies ReadonlyArray<UnityUiDesignSnapshot>;

export function Uid02BuildingLayoutsMapLab() {
  return (
    <UnityUiDesignLab
      title="第 2 章 Building Layouts：Canvas、Rect Transform 与自动布局"
      chapter="Chapter 2 · Unity 3D UI Essentials"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Uid02BuildingLayoutsExperimentLab() {
  return (
    <UnityUiDesignLab
      title="第 2 章 Building Layouts：Canvas、Rect Transform 与自动布局"
      chapter="Chapter 2 · Unity 3D UI Essentials"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Uid02BuildingLayoutsEvidenceLab() {
  return (
    <UnityUiDesignLab
      title="第 2 章 Building Layouts：Canvas、Rect Transform 与自动布局"
      chapter="Chapter 2 · Unity 3D UI Essentials"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
