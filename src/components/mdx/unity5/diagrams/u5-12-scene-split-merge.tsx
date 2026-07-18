"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["世界边界","场景分离","共享依赖","Additive加载","初始化","反向卸载"] as const;

export function U512SceneSplitMergeMapLab() { return <Unity5EvidenceLab title="第12章 场景分离与合并" label="场景分离与合并" nodes={nodes} mode="map" />; }
export function U512SceneSplitMergeExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="场景分离与合并" nodes={nodes} mode="experiment" />; }
export function U512SceneSplitMergeEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="场景分离与合并" nodes={nodes} mode="evidence" />; }
