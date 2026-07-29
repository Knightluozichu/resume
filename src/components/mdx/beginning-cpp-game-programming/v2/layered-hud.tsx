"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-13",
  title: "第 13 章：分层 View 与 HUD",
  focus:
    "在同一 RenderWindow 中显式切换 worldView 与 HUD view，更新 HUD、首页和升级界面而不混淆坐标空间",
  invariant:
    "世界对象只在 worldView 下绘制，HUD 只在固定界面 View 下绘制，每个 draw 调用前 View 状态可追踪",
  fault: "绘制 HUD 前忘记切回默认 View，导致文字随相机移动或缩放",
  evidence: "当前 View 标识、draw 调用序列、世界坐标、HUD 像素位置和窗口截图",
  concepts: [
    "分层视图（layering views）",
    "hud 对象（hud objects）",
    "更新 hud（updating the hud）",
    "首页与升级界面（home and level-up screens）",
  ],
  zones: [
    {
      label: "世界层",
      detail: "Arena、玩家、僵尸与 worldView",
    },
    {
      label: "界面层",
      detail: "Text、血条、弹药与默认 View",
    },
    {
      label: "阶段层",
      detail: "首页、游戏中、升级与重启画面",
    },
  ],
  trace: [
    "设置 worldView",
    "绘制世界",
    "切换 HUD view",
    "更新 HUD",
    "绘制界面",
  ],
  scenarios: [
    {
      label: "相机跟随战斗",
      input: "worldView 中心移动而 HUD 数值不变",
      expected: "世界滚动，血条和文字保持固定窗口位置",
    },
    {
      label: "进入升级界面",
      input: "从战斗阶段切换到 level-up 阶段",
      expected: "世界更新按设计暂停，升级选项在 HUD View 中清晰显示",
    },
  ],
} satisfies CppGameBuildModel;

export function LayeredHudPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function LayeredHudFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function LayeredHudFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
