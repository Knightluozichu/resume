"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-18",
  title: "第 18 章：平台、Player 控制与 Animator",
  focus:
    "把平台几何、玩家控制、Animator 帧选择与物理状态分离，使动画表现跟随已提交动作",
  invariant:
    "控制输入先形成意图，物理决定实际运动，Animator 根据已提交状态选帧；动画不能反向决定碰撞位置",
  fault:
    "按渲染帧数推进动画并用 sprite 帧宽修改碰撞体，造成帧率相关速度和碰撞抖动",
  evidence: "输入意图、物理速度、接地标志、动画状态、累计时间、帧索引和碰撞体",
  concepts: [
    "平台地形（platforms）",
    "玩家控制（player controls）",
    "animator 类（animator class）",
    "玩家动画（player animations）",
  ],
  zones: [
    {
      label: "平台物理",
      detail: "地形边界、接触和玩家 Transform",
    },
    {
      label: "控制状态",
      detail: "左右、跳跃、速度和接地条件",
    },
    {
      label: "动画表现",
      detail: "Animator、状态切换、帧时间与 sprite sheet",
    },
  ],
  trace: ["采样控制", "计算物理", "提交接触", "选择动画", "绘制当前帧"],
  scenarios: [
    {
      label: "地面奔跑",
      input: "玩家接地并持续输入向右，提供固定 delta time",
      expected: "物理位置稳定推进，Animator 循环 run 帧且碰撞体不变",
    },
    {
      label: "空中释放方向",
      input: "玩家跳起后释放水平输入",
      expected: "控制与物理按规则减速，动画切到 airborne 而不篡改位置",
    },
  ],
} satisfies CppGameBuildModel;

export function PlatformsPlayerAnimationControlsPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function PlatformsPlayerAnimationControlsFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function PlatformsPlayerAnimationControlsFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
