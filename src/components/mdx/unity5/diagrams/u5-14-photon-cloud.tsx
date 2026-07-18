"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["连接Photon","匹配与房间","生成坦克","状态事件同步","大厅HUD","排名持久化"] as const;

export function U514PhotonCloudMapLab() { return <Unity5EvidenceLab title="第14章 使用 Photon Cloud 制作网络游戏" label="Photon Cloud 网络游戏" nodes={nodes} mode="map" />; }
export function U514PhotonCloudExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="Photon Cloud 网络游戏" nodes={nodes} mode="experiment" />; }
export function U514PhotonCloudEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="Photon Cloud 网络游戏" nodes={nodes} mode="evidence" />; }
