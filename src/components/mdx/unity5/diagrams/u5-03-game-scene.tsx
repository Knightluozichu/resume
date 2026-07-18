"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["3D模型","纹理导入","材质","PBR通道","光照","天空盒"] as const;

export function U503GameSceneMapLab() { return <Unity5EvidenceLab title="第3章 制作游戏场景" label="制作游戏场景" nodes={nodes} mode="map" />; }
export function U503GameSceneExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="制作游戏场景" nodes={nodes} mode="experiment" />; }
export function U503GameSceneEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="制作游戏场景" nodes={nodes} mode="evidence" />; }
