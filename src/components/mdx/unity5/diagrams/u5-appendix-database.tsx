"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["游戏事件","服务端校验","参数化写入","数据表","排序查询","排名响应"] as const;

export function U5AppendixDatabaseMapLab() { return <Unity5EvidenceLab title="附录 数据库" label="数据库附录" nodes={nodes} mode="map" />; }
export function U5AppendixDatabaseExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="数据库附录" nodes={nodes} mode="experiment" />; }
export function U5AppendixDatabaseEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="数据库附录" nodes={nodes} mode="evidence" />; }
