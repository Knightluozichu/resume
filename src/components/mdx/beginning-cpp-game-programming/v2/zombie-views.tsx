"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-08",
  title: "第 8 章：Zombie Arena 与 SFML View",
  focus:
    "用 Player、主游戏循环和 sf::View 把大于窗口的 Zombie Arena 世界映射到相机视口",
  invariant:
    "世界对象使用世界坐标更新，View 只改变观察映射；窗口事件和 HUD 不应被相机位置污染",
  fault: "移动相机时同时改写所有僵尸的世界坐标，导致逻辑碰撞与渲染位置分叉",
  evidence:
    "Player 世界位置、View center/size/viewport、对象边界、窗口像素和映射结果",
  concepts: [
    "僵尸竞技场（zombie arena）",
    "player 类（player class）",
    "相机视图（sfml view）",
    "僵尸游戏引擎（zombie arena game engine）",
    "主游戏循环（main game loop）",
  ],
  zones: [
    {
      label: "世界模型",
      detail: "Player、僵尸和 Arena 的世界坐标",
    },
    {
      label: "观察映射",
      detail: "sf::View 的 center、size 与 viewport",
    },
    {
      label: "窗口输出",
      detail: "世界画面、事件和固定界面",
    },
  ],
  trace: ["更新玩家", "设置 View", "裁剪世界", "绘制对象", "呈现窗口"],
  scenarios: [
    {
      label: "玩家向右移动",
      input: "Player 世界 x 增加，相机跟随但 Arena 对象坐标不变",
      expected: "玩家保持在预期屏幕位置，世界对象相对滚动",
    },
    {
      label: "窗口尺寸变化",
      input: "改变窗口像素尺寸并保持同一 View 世界尺寸",
      expected: "可见世界范围按策略保持，逻辑坐标不被缩放写回",
    },
  ],
} satisfies CppGameBuildModel;

export function ZombieViewsPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function ZombieViewsFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function ZombieViewsFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
