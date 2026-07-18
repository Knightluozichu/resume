import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 5 权威边界",
    action:
      "官方小节是 Camera gizmos、Being seen、Orthographic cameras、Camera rendering and postprocessing、Camera shake、Cameras and animation、Cameras and curves。原章使用当时内置渲染与脚本回调；现代 SRP 做法可替换载体，但不能删除视锥、投影、层、渲染目标和时间曲线这些问题。",
    metric: "5 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "世界点到最终像素的相机链",
    action:
      "对象的 Renderer、Layer 和 bounds 进入相机的 view/projection 变换，视锥和 Culling Mask 决定候选，深度与渲染顺序决定合成，目标纹理或屏幕接收输出，后处理再读取并写回图像。透视投影随深度缩小，正交投影保持尺寸。抖动和曲线改变相机 Transform 或投影参数，必须以基线姿态为中心，避免累计漂移。",
    metric: "producer -> consumer",
    evidence: "Camera gizmos；Being seen；Orthographic cameras",
    boundary:
      "Renderer.isVisible 可能受任意相机和编辑器 Scene 视图影响，不能直接等同于目标游戏相机可见。",
  },
  {
    label: "实验",
    stage: "验证可见性条件",
    action:
      "显示相机 Gizmo 与 bounds，移动对象穿过六个视锥面，切换 Layer、near/far 和 cullingMask，记录每项首个变化信号。",
    metric: "single variable",
    evidence: "var planes = GeometryUtility.CalculateFrustumPlanes(camera);",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "重放相机运动",
    action:
      "用 AnimationCurve 驱动 FOV 和 shake，固定随机种子，检查开始、峰值、结束和中断后都能恢复基线 pose。",
    metric: "normal / edge / failure",
    evidence:
      "Renderer.isVisible 可能受任意相机和编辑器 Scene 视图影响，不能直接等同于目标游戏相机可见。；每帧在当前相机位置上累加抖动会产生随机游走，结束后无法准确回到原位。",
    boundary:
      "Built-in 管线的 OnRenderImage 与现代 URP/HDRP Renderer Feature 或 Volume 不一一等价。迁移时保留输入纹理、效果参数、执行时机和输出正确性，再按管线实现。Cinemachine 可以替代部分相机曲线与 shake 载体，但视锥、投影、Layer 和基线恢复仍要独立验证。",
  },
  {
    label: "验收",
    stage: "Chapter 5 证据包",
    action:
      "验收包含视锥六面边界、Layer 排除、near/far、透视/正交尺寸、RenderTexture 输出、后处理开关与确定性抖动。截图同时保存相机矩阵、投影模式、对象 bounds 和管线版本，防止只凭最终画面猜因果。",
    metric: "replayable proof",
    evidence:
      "对象存在、Renderer 启用与目标相机可见是不同条件；投影、视锥、层、深度和输出目标共同决定相机结果；相机动画必须以基线姿态和确定时间曲线为约束；SRP 替换后处理载体时仍要保持输入、时机和输出证据",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function Usc05CamerasRenderingScenesMapLab() {
  return (
    <UnityScriptingLab
      title="第 5 章 Cameras, Rendering, and Scenes：相机与可见性"
      chapter="Chapter 5 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Usc05CamerasRenderingScenesExperimentLab() {
  return (
    <UnityScriptingLab
      title="第 5 章 Cameras, Rendering, and Scenes：相机与可见性"
      chapter="Chapter 5 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Usc05CamerasRenderingScenesEvidenceLab() {
  return (
    <UnityScriptingLab
      title="第 5 章 Cameras, Rendering, and Scenes：相机与可见性"
      chapter="Chapter 5 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
