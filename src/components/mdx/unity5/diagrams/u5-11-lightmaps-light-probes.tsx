"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["Lightmap UV","静态标记","光照设置","烘焙贴图","Light Probe","动态对象采样"] as const;

export function U511LightmapsLightProbesMapLab() { return <Unity5EvidenceLab title="第11章 光照贴图与灯光探测器" label="光照贴图与灯光探测器" nodes={nodes} mode="map" />; }
export function U511LightmapsLightProbesExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="光照贴图与灯光探测器" nodes={nodes} mode="experiment" />; }
export function U511LightmapsLightProbesEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="光照贴图与灯光探测器" nodes={nodes} mode="evidence" />; }
