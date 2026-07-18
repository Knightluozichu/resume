"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["服务器初始化","客户端连接","玩家生成","状态同步","RPC事件","断线清理"] as const;

export function U513BuiltInNetworkingMapLab() { return <Unity5EvidenceLab title="第13章 Unity 内置网络游戏" label="Unity 内置网络游戏" nodes={nodes} mode="map" />; }
export function U513BuiltInNetworkingExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="Unity 内置网络游戏" nodes={nodes} mode="experiment" />; }
export function U513BuiltInNetworkingEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="Unity 内置网络游戏" nodes={nodes} mode="evidence" />; }
