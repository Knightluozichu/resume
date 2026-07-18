"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["Canvas","RectTransform","视觉组件","交互组件","游戏数据","响应式显示"] as const;

export function U507UnityUiMapLab() { return <Unity5EvidenceLab title="第7章 Unity UI" label="Unity UI" nodes={nodes} mode="map" />; }
export function U507UnityUiExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="Unity UI" nodes={nodes} mode="experiment" />; }
export function U507UnityUiEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="Unity UI" nodes={nodes} mode="evidence" />; }
