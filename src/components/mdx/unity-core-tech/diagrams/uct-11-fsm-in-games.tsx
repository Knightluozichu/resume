"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = ["输入事件", "转移表", "守卫", "Exit/Enter", "转移日志"] as const;

export function Uct11FsmInGamesMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 11 章 FSM 有限状态机：基类、实体、技能与游戏案例 · 依赖地图"
      label="第 11 章 FSM 有限状态机在游戏中的运用"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct11FsmInGamesExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 11 章 FSM 有限状态机：基类、实体、技能与游戏案例 · 单变量实验"
      label="第 11 章 FSM 有限状态机在游戏中的运用"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct11FsmInGamesEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 11 章 FSM 有限状态机：基类、实体、技能与游戏案例 · 阶段门证据"
      label="第 11 章 FSM 有限状态机在游戏中的运用"
      nodes={nodes}
      mode="evidence"
    />
  );
}
