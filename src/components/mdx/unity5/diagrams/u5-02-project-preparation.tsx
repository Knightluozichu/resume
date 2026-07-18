"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["游戏范围","开发顺序","新建项目","IDE配置","资源组织","角色导入"] as const;

export function U502ProjectPreparationMapLab() { return <Unity5EvidenceLab title="第2章 准备游戏开发" label="准备游戏开发" nodes={nodes} mode="map" />; }
export function U502ProjectPreparationExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="准备游戏开发" nodes={nodes} mode="experiment" />; }
export function U502ProjectPreparationEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="准备游戏开发" nodes={nodes} mode="evidence" />; }
