"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["烘焙NavMesh","动态障碍","链接端点","代理进入","特殊移动","重新落网"] as const;

export function U510NavigationAdvancedMapLab() { return <Unity5EvidenceLab title="第10章 导航仪高级技巧" label="导航高级技巧" nodes={nodes} mode="map" />; }
export function U510NavigationAdvancedExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="导航高级技巧" nodes={nodes} mode="experiment" />; }
export function U510NavigationAdvancedEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="导航高级技巧" nodes={nodes} mode="evidence" />; }
