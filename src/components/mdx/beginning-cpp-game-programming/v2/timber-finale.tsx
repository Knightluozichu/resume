"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-05",
  title: "第 5 章：碰撞、音效与 Timber 终局",
  focus:
    "把玩家输入、木头飞行、精灵碰撞、声音与死亡条件提交成 Timber 的可玩回合",
  invariant:
    "一次砍击只提交一次分数、一次树枝移动和一次音效；死亡后更新规则停止但结束画面仍可绘制",
  fault:
    "在事件和实时输入两处同时处理同一次按键，造成一次砍击加两分并播放两次音效",
  evidence:
    "输入边沿、回合状态、碰撞矩形、分数增量、音效触发次数和结束条件日志",
  concepts: [
    "玩家输入（player input）",
    "死亡处理（handling death）",
    "简单音效（simple sound effects）",
    "飞行木头（flying log）",
    "改进游戏和代码（improving the game and code）",
  ],
  zones: [
    {
      label: "玩家意图",
      detail: "左/右砍击与回合阶段",
    },
    {
      label: "规则提交",
      detail: "碰撞、树枝移动、分数和死亡",
    },
    {
      label: "反馈表现",
      detail: "飞行木头、声音与结束消息",
    },
  ],
  trace: ["捕获砍击", "计算碰撞", "提交回合", "触发反馈", "判断结束"],
  scenarios: [
    {
      label: "安全砍击",
      input: "玩家在无树枝的一侧触发单次按键边沿",
      expected: "分数增加一次，木头与声音各触发一次，游戏继续",
    },
    {
      label: "树枝致死",
      input: "玩家所在一侧在树枝移动后被占据",
      expected: "死亡状态只提交一次，后续输入不会继续加分",
    },
  ],
} satisfies CppGameBuildModel;

export function TimberFinalePipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function TimberFinaleFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function TimberFinaleFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
