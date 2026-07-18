"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["动画姿态","布娃娃切换","碰撞受力","触点采样","屏幕射线","角色移动"] as const;

export function U515GameRealismMapLab() { return <Unity5EvidenceLab title="第15章 提升游戏真实感" label="提升游戏真实感" nodes={nodes} mode="map" />; }
export function U515GameRealismExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="提升游戏真实感" nodes={nodes} mode="experiment" />; }
export function U515GameRealismEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="提升游戏真实感" nodes={nodes} mode="evidence" />; }
