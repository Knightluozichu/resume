import {
  UnityUiDesignLab,
  type UnityUiDesignSnapshot,
} from "./official-ui-design-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 5 的权威边界",
    action:
      "原章覆盖 The Canvas and Cameras、Screen Space and World Space、Render cameras、Event Cameras、Getting some perspective；随后用 big game 场景、Sprite 2D 工作、Screen Space Camera health bar、Canvas 内部结构、生命状态与坐标访问建立案例；最后进入平面与深度、任意悬挂 World Canvas、showcase、场景内 UI、scale 问题、better way 和 Event Cameras 收束。",
    metric: "6 concept groups",
    evidence:
      "https://api.pageplace.de/preview/DT0400.9781783553624_A24173589/preview-9781783553624_A24173589.pdf + https://darkgenesis.zenithmoon.com/announcing-unity-3d-ui-essentials.html",
    boundary: "目录证明范围，运行场景和失败样本证明掌握。",
  },
  {
    label: "对象",
    stage: "三种 Render Mode 的坐标与事件契约",
    action:
      "Screen Space Overlay 直接覆盖最终屏幕，不依赖渲染相机；Screen Space Camera 把 Canvas 平面放在指定相机前方，受 planeDistance、相机 viewport 和排序影响；World Space 把 Canvas 当成场景几何，使用世界 Transform、透视和遮挡。GraphicRaycaster 在需要相机的模式下还必须使用正确的 eventCamera，否则视觉位置与射线坐标可能不一致。空间 UI 的难点不是把位置设为目标头顶，而是明确世界点、屏幕点、Canvas 局部点之间的每次变换。",
    metric: "producer -> consumer",
    evidence:
      "The Canvas and Cameras；Screen Space and World Space；Render cameras；Event Cameras；Getting some perspective",
    boundary:
      "WorldToScreenPoint 返回的 z 为负时目标位于相机后方；若只使用 x、y，标记会错误翻转到屏幕上。",
  },
  {
    label: "实验",
    stage: "比较三种画布",
    action:
      "复制同一面板到 Overlay、Screen Space Camera、World Space Canvas，记录相机字段、planeDistance、Transform scale、排序和视觉像素尺寸。",
    metric: "one variable",
    evidence: "var screen = worldCamera.WorldToScreenPoint(target.position);",
    boundary: "同时改变布局、输入和相机，会失去故障归属。",
  },
  {
    label: "边界",
    stage: "验证事件相机",
    action:
      "在 Screen Space Camera 和 World Space 模式点击同一控件，分别设置正确、错误和空 eventCamera，保存射线结果与命中偏移，说明视觉相机和事件相机的关系。",
    metric: "normal / edge / failure",
    evidence:
      "WorldToScreenPoint 返回的 z 为负时目标位于相机后方；若只使用 x、y，标记会错误翻转到屏幕上。；World Space Canvas 使用默认巨大尺寸和 scale=1 时会远超场景尺度；应先定义世界单位对应的 UI 尺寸。",
    boundary:
      "现代 SRP、Camera Stack、XR 和多显示器让相机组合更复杂，但三种 Canvas 模式的契约仍成立。迁移时应额外记录 render camera、event camera、display、viewport、render scale 和 XR 眼睛；不能用“在主相机上可见”证明所有目标平台正确。原章的 3D showcase 仍适合作为最小证据场，附录页面会复原其资产与场景搭建边界。",
  },
  {
    label: "验收",
    stage: "Chapter 5 证据包",
    action:
      "验收包含三模式并排截图、相机绕行视频或轨迹、指针射线命中日志、屏外与相机背后状态，以及世界尺度说明。Screen Space Camera 还要测试不同 viewport 和 planeDistance；World Space 要验证遮挡、近远距离可读性和朝向；任何模式都要保存缺失相机的失败结果。",
    metric: "replayable proof",
    evidence:
      "Render Mode 决定投影、排序、尺度和相机依赖，不能只按外观选择；视觉投影与事件射线是两条相关链，Render Camera 与 Event Camera 都要验证；屏幕血条和世界血条各有坐标、遮挡与批量管理成本；附录 3D Scene Sample 是本章空间 UI 结论的可复现依赖",
    boundary: "没有参数、期望和失败重放的截图不能单独签发。",
  },
] as const satisfies ReadonlyArray<UnityUiDesignSnapshot>;

export function Uid05ScreenWorldCameraMapLab() {
  return (
    <UnityUiDesignLab
      title="第 5 章 Screen Space, World Space, and the Camera：空间 UI"
      chapter="Chapter 5 · Unity 3D UI Essentials"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Uid05ScreenWorldCameraExperimentLab() {
  return (
    <UnityUiDesignLab
      title="第 5 章 Screen Space, World Space, and the Camera：空间 UI"
      chapter="Chapter 5 · Unity 3D UI Essentials"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Uid05ScreenWorldCameraEvidenceLab() {
  return (
    <UnityUiDesignLab
      title="第 5 章 Screen Space, World Space, and the Camera：空间 UI"
      chapter="Chapter 5 · Unity 3D UI Essentials"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
