import {
  UnityUiDesignLab,
  type UnityUiDesignSnapshot,
} from "./official-ui-design-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 4 的权威边界",
    action:
      "原章的目录很集中：Dropping Anchor；Put a nail in it, and trim the sails；Stretch it, bend it；Scaling and resolution；Working with the constant default；Scaling to my view；Getting physical；Which to choose。它要求读者先掌握锚点的定位与拉伸语义，再在 Constant Pixel Size、Scale with Screen Size、Constant Physical Size 之间做工程选择。",
    metric: "6 concept groups",
    evidence:
      "https://api.pageplace.de/preview/DT0400.9781783553624_A24173589/preview-9781783553624_A24173589.pdf + https://darkgenesis.zenithmoon.com/announcing-unity-3d-ui-essentials.html",
    boundary: "目录证明范围，运行场景和失败样本证明掌握。",
  },
  {
    label: "对象",
    stage: "局部锚点与全局缩放的两级系统",
    action:
      "锚点先在父矩形中确定参考点或参考区间，偏移再决定子矩形；CanvasScaler 随后把参考 Canvas 单位映射到屏幕。Scale with Screen Size 的 Match Width Or Height 在宽、高缩放因子之间插值，Match 为 0 偏向宽度，为 1 偏向高度。Expand 保证参考区域完整容纳，可能露出更多；Shrink 保证填满目标，可能裁掉参考范围。响应式设计必须同时选择全局映射和每个模块的局部约束。",
    metric: "producer -> consumer",
    evidence:
      "Dropping Anchor：锚点概念与父矩形参考；Put a nail in it, and trim the sails：固定锚点、轴心与边距",
    boundary:
      "所有元素锚在屏幕中心再靠固定坐标摆放，只在参考分辨率看起来正确，不是响应式布局。",
  },
  {
    label: "实验",
    stage: "观察固定锚点",
    action:
      "把四个按钮分别固定到父矩形四角，改变父级宽高和 pivot，记录边距是否保持。随后只改 pivot，区分元素自身参考点与父级锚点。",
    metric: "one variable",
    evidence: "var scaler = canvas.GetComponent<CanvasScaler>();",
    boundary: "同时改变布局、输入和相机，会失去故障归属。",
  },
  {
    label: "边界",
    stage: "构建设备验收矩阵",
    action:
      "用多分辨率 Game View 或自动截图遍历横竖屏和极端比例，加入长文本、动态字体与刘海安全区作为现代补充，保存裁剪、重叠和触控面积失败样本。",
    metric: "normal / edge / failure",
    evidence:
      "所有元素锚在屏幕中心再靠固定坐标摆放，只在参考分辨率看起来正确，不是响应式布局。；Constant Physical Size 不能修复错误 DPI；没有真机测量时，毫米级承诺只是未经验证的假设。",
    boundary:
      "原章发布时尚未面对今天常见的刘海、折叠屏和系统动态字号，但其两级模型仍成立。现代补充应在 CanvasScaler 之后加入 Screen.safeArea、方向与窗口尺寸变化，并区分布局刷新和内容重排。不要把 Safe Area 写成原始章节小节；应明确它是对“选择缩放策略并验证”的当代扩展。UI Toolkit 的 Flex 布局也不能替代对 uGUI 锚点的原章复现。",
  },
  {
    label: "验收",
    stage: "Chapter 4 证据包",
    action:
      "验收矩阵至少含五种长宽比、横竖屏、最短与最长本地化文本、DPI 正常和异常样本。每张截图要带实际分辨率、scaleFactor、参考分辨率与 Match。通过标准是无重叠、关键内容可见、边距语义保持、交互面积达标，而不是“整体还能看到”。",
    metric: "replayable proof",
    evidence:
      "锚点决定父矩形参考，轴心决定自身参考，偏移表达边距或位置；拉伸锚点让尺寸随父级变化，固定锚点保持自身尺寸；CanvasScaler 只解决全局映射，局部布局仍需正确约束；响应式结论必须由设备矩阵和失败样本证明",
    boundary: "没有参数、期望和失败重放的截图不能单独签发。",
  },
] as const satisfies ReadonlyArray<UnityUiDesignSnapshot>;

export function Uid04AnchorsAwayMapLab() {
  return (
    <UnityUiDesignLab
      title="第 4 章 Anchors Away：锚点、拉伸与分辨率策略"
      chapter="Chapter 4 · Unity 3D UI Essentials"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Uid04AnchorsAwayExperimentLab() {
  return (
    <UnityUiDesignLab
      title="第 4 章 Anchors Away：锚点、拉伸与分辨率策略"
      chapter="Chapter 4 · Unity 3D UI Essentials"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Uid04AnchorsAwayEvidenceLab() {
  return (
    <UnityUiDesignLab
      title="第 4 章 Anchors Away：锚点、拉伸与分辨率策略"
      chapter="Chapter 4 · Unity 3D UI Essentials"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
