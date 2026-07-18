"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第17章 MySQL日志管理",
  part: "第3篇 MySQL数据库管理篇",
  focus: "理解错误、通用、慢查询和二进制日志各自记录什么并完成轮换恢复",
  invariant:
    "故障、慢查询和数据变更能定位到正确日志，日志增长、保留和敏感信息受控",
  artifact: "日志配置快照、事件样本、轮换策略和恢复坐标",
  nodes: [
    "17.1 日志体系概览",
    "17.2 错误日志",
    "17.3 通用查询日志",
    "17.4 慢查询日志",
    "17.5 二进制日志",
    "17.6 二进制日志事件与格式",
    "17.7 查看和解析日志",
    "17.8 日志刷新与轮换",
    "17.9 日志过期和容量",
    "17.10 基于时间点的恢复坐标",
    "17.11 日志中的敏感信息",
    "17.12 本章验证清单",
  ],
};

export function MseCh17LogsModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh17LogsExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh17LogsEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
