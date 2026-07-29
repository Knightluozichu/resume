"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-03",
  title: "第 3 章：字符串、输入与 HUD 时间条",
  focus:
    "把字符串、玩家输入、暂停状态、得分文本与 SFML Time 统一到同一个 HUD 和时间条状态机",
  invariant:
    "暂停时游戏时间、得分和时间条不推进；重启会原子地恢复初始时间、消息与输入状态",
  fault: "暂停后仍按墙钟时间缩短时间条，恢复时立即触发结束条件",
  evidence:
    "事件与实时输入日志、paused 标志、游戏时钟、剩余时间、得分字符串和 HUD 绘制顺序",
  concepts: [
    "暂停与重启（pausing and restarting）",
    "c++ 字符串（c++ strings）",
    "玩家输入（player input）",
    "分数与消息（score and a message）",
    "时间条（time-bar）",
  ],
  zones: [
    {
      label: "输入与阶段",
      detail: "开始、暂停、恢复和按键边沿",
    },
    {
      label: "游戏状态",
      detail: "得分、消息、游戏时间和剩余时间",
    },
    {
      label: "HUD 表现",
      detail: "Text、字体与 time bar 几何",
    },
  ],
  trace: ["读取输入", "切换阶段", "推进游戏钟", "格式化文本", "绘制 HUD"],
  scenarios: [
    {
      label: "开始并计时",
      input: "按 Enter 从等待阶段开始，再提供一秒游戏时间",
      expected: "消息切换、时间条缩短且得分文本与状态一致",
    },
    {
      label: "暂停后恢复",
      input: "运行半秒、暂停两秒墙钟时间，再恢复半秒",
      expected: "游戏只消耗一秒，暂停期间状态保持不变",
    },
  ],
} satisfies CppGameBuildModel;

export function GraphicsSfmlPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function GraphicsSfmlFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function GraphicsSfmlFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
