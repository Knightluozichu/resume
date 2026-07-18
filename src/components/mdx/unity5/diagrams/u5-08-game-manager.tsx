"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["场景启动","管理器实例","怪兽生成","对象借出","共享服务","对象归还"] as const;

export function U508GameManagerMapLab() { return <Unity5EvidenceLab title="第8章 游戏管理器" label="游戏管理器" nodes={nodes} mode="map" />; }
export function U508GameManagerExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="游戏管理器" nodes={nodes} mode="experiment" />; }
export function U508GameManagerEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="游戏管理器" nodes={nodes} mode="evidence" />; }
