"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["角色模型","组件缓存","输入向量","移动旋转","相机跟随","动画阴影"] as const;

export function U504PlayerCharacterMapLab() { return <Unity5EvidenceLab title="第4章 制作主人公角色" label="制作主人公角色" nodes={nodes} mode="map" />; }
export function U504PlayerCharacterExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="制作主人公角色" nodes={nodes} mode="experiment" />; }
export function U504PlayerCharacterEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="制作主人公角色" nodes={nodes} mode="evidence" />; }
