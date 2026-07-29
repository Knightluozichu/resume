"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-17",
  title: "第 17 章：Graphics、Camera 与多视图行动",
  focus:
    "集中 GameObject 绘制调用，并让主相机、雷达 View 与计时文本共享世界状态但使用各自观察边界",
  invariant:
    "同一世界快照可被不同 View 绘制，绘制不反向修改游戏状态，计时文本使用游戏时钟而非渲染次数",
  fault: "为雷达绘制再次调用 update，使对象在一个显示帧内推进两次",
  evidence:
    "世界版本号、update 次数、draw call 序列、各 View 参数、viewport 和计时文本值",
  concepts: [
    "绘制调用（draw calls）",
    "相机类（camera classes）",
    "主视图（main view）",
    "雷达视图（radar view）",
    "计时文本（timer text）",
  ],
  zones: [
    {
      label: "世界快照",
      detail: "已提交的 GameObject 与游戏时间",
    },
    {
      label: "观察系统",
      detail: "主相机、雷达 View、裁剪和 viewport",
    },
    {
      label: "绘制提交",
      detail: "draw calls、层次与 timer text",
    },
  ],
  trace: ["提交世界", "设置主 View", "绘制主画面", "设置雷达 View", "绘制 HUD"],
  scenarios: [
    {
      label: "同帧主画面与雷达",
      input: "固定一个世界快照，依次使用主 View 和雷达 View 绘制",
      expected: "对象只更新一次但以两种观察范围出现",
    },
    {
      label: "暂停计时",
      input: "暂停游戏但继续重绘窗口和相机",
      expected: "timer text 保持不变，绘制次数不会推进游戏时间",
    },
  ],
} satisfies CppGameBuildModel;

export function GraphicsCamerasActionPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function GraphicsCamerasActionFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function GraphicsCamerasActionFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
