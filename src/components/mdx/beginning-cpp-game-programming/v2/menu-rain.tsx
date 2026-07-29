"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-19",
  title: "第 19 章：交互菜单与雨效",
  focus:
    "用明确阶段处理开始、暂停、重启、退出，并把雨滴作为可组合 GameObject 接入 update 与 graphics 合同",
  invariant:
    "菜单动作只触发一次阶段迁移；暂停时世界 update 停止但菜单绘制和事件处理继续，雨滴服从相同对象合同",
  fault: "按键保持期间每帧执行 restart，持续重建世界并泄漏旧对象",
  evidence:
    "输入边沿、阶段迁移日志、世界实例 ID、对象数量、雨滴 update/draw 次数和析构记录",
  concepts: [
    "交互菜单（interactive menu）",
    "开始 暂停 重启 退出（start pause restart quit）",
    "雨效（making it rain）",
    "graphics 与 update（graphics and update）",
  ],
  zones: [
    {
      label: "菜单协议",
      detail: "Start、Pause、Restart、Quit 的合法迁移",
    },
    {
      label: "游戏阶段",
      detail: "菜单、运行、暂停、结束与退出",
    },
    {
      label: "雨效组合",
      detail: "Rain GameObject 的状态、更新和绘制",
    },
  ],
  trace: [
    "捕获按键边沿",
    "验证迁移",
    "提交阶段",
    "更新可运行对象",
    "绘制对应界面",
  ],
  scenarios: [
    {
      label: "开始后暂停",
      input: "从 Menu 触发 Start，再用单次按键边沿触发 Pause",
      expected: "世界实例保持，update 停止，菜单与事件仍工作",
    },
    {
      label: "结束后重启",
      input: "从 GameOver 触发一次 Restart",
      expected: "旧世界完整销毁，只创建一个新世界并回到 Running",
    },
  ],
} satisfies CppGameBuildModel;

export function MenuRainPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function MenuRainFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function MenuRainFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
