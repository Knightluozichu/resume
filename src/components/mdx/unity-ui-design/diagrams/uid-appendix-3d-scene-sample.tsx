import {
  UnityUiDesignLab,
  type UnityUiDesignSnapshot,
} from "./official-ui-design-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Appendix 的权威边界",
    action:
      "出版社目录把 Appendix: The 3D Scene Sample 放在六章之后，包含 Setting up for the big game 和 The initial 3D scene。前言说明它是第五章展示场景的可选搭建指南，因为 3D 场景本身不是 UI 主体，所以移到附录。复刻时应保持这个身份：讲场景准备、对象关系与 UI 测试点，不把通用建模、动画或渲染教程塞进来。",
    metric: "6 concept groups",
    evidence:
      "https://api.pageplace.de/preview/DT0400.9781783553624_A24173589/preview-9781783553624_A24173589.pdf + https://darkgenesis.zenithmoon.com/announcing-unity-3d-ui-essentials.html",
    boundary: "目录证明范围，运行场景和失败样本证明掌握。",
  },
  {
    label: "对象",
    stage: "场景夹具而不是美术样片",
    action:
      "教学场景的价值在可控变量：目标有稳定锚点，相机有可重复轨迹，遮挡物能切换，地面与网格提供尺度，输入路径能触达世界 Canvas。高质量模型和后处理不是验收重点，反而可能遮盖问题。场景应把“相机位置、目标位置、Canvas 模式、世界缩放、遮挡状态、eventCamera”暴露成可记录参数，并能一键回到基线。",
    metric: "producer -> consumer",
    evidence:
      "Appendix: The 3D Scene Sample 的可选但可复现身份；Setting up for the big game：项目、资产、层级与测试目标准备",
    boundary:
      "用复杂美术场景替代最小夹具会引入材质、光照和动画变量，难以判断 UI 失败的真正原因。",
  },
  {
    label: "实验",
    stage: "建立最小层级",
    action:
      "创建 Ground、Target、UIAnchor、OrbitCamera、Light 和 TestController，使用 1 Unity unit 对应 1 米的尺度参照；保存无 UI 的场景基线。",
    metric: "one variable",
    evidence: "public sealed class UiAnchor : MonoBehaviour {",
    boundary: "同时改变布局、输入和相机，会失去故障归属。",
  },
  {
    label: "边界",
    stage: "加入边界重放",
    action:
      "启用遮挡物，让相机沿固定轨迹绕行并模拟点击；测试目标在背后、近裁面、远距离、错误 Layer 和空 eventCamera，保存结果。",
    metric: "normal / edge / failure",
    evidence:
      "用复杂美术场景替代最小夹具会引入材质、光照和动画变量，难以判断 UI 失败的真正原因。；只保存最终场景而不记录资产版本、相机参数和运行路径，其他读者无法重放同一证据。",
    boundary:
      "现代项目可用 Cinemachine 生成相机轨迹、用测试框架或截图工具自动重放，但原附录的目标仍是搭建第五章所需的初始 3D 场景。URP、HDRP、XR 或 Camera Stack 都应作为独立变量加入，不应改变附录只有两节的来源边界。若资源包失效，可以用 Primitive 复刻几何关系，只要尺度、相机和 UI 锚点契约保持。",
  },
  {
    label: "验收",
    stage: "Appendix 证据包",
    action:
      "通过标准是一份可重放场景和测试表：层级、单位、相机轨迹、Canvas 参数、eventCamera、遮挡层和预期结果齐全。至少保存正面、中距离、背后、遮挡、极近、极远与错误事件相机七个状态。场景美观不是分数来源，因果可控和第五章结论可验证才是。",
    metric: "replayable proof",
    evidence:
      "附录是第五章的场景依赖，属于原书覆盖但不是第七个正文章；最小 3D 场景要暴露相机、目标、尺度、遮挡和事件参数；确定性轨迹与失败状态让空间 UI 结论可回归；现代工具可以增强重放，不能扩张附录的原始理论范围",
    boundary: "没有参数、期望和失败重放的截图不能单独签发。",
  },
] as const satisfies ReadonlyArray<UnityUiDesignSnapshot>;

export function UidAppendix3dSceneSampleMapLab() {
  return (
    <UnityUiDesignLab
      title="附录 The 3D Scene Sample：搭建空间 UI 验证场"
      chapter="Appendix · Unity 3D UI Essentials"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function UidAppendix3dSceneSampleExperimentLab() {
  return (
    <UnityUiDesignLab
      title="附录 The 3D Scene Sample：搭建空间 UI 验证场"
      chapter="Appendix · Unity 3D UI Essentials"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function UidAppendix3dSceneSampleEvidenceLab() {
  return (
    <UnityUiDesignLab
      title="附录 The 3D Scene Sample：搭建空间 UI 验证场"
      chapter="Appendix · Unity 3D UI Essentials"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
