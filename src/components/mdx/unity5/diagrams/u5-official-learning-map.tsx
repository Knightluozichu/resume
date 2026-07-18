"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["TPS场景","角色战斗","UI架构","世界系统","多人网络","真实感与数据"] as const;

export function U5OfficialLearningMapMapLab() { return <Unity5EvidenceLab title="《Unity 5权威讲解》权威学习地图" label="全书导览" nodes={nodes} mode="map" />; }
export function U5OfficialLearningMapExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="全书导览" nodes={nodes} mode="experiment" />; }
export function U5OfficialLearningMapEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="全书导览" nodes={nodes} mode="evidence" />; }
