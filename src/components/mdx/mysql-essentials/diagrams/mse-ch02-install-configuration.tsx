"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第2章 MySQL的安装与配置",
  part: "第1篇 MySQL数据库基础篇",
  focus: "完成服务安装、实例初始化、连接验证和配置文件定位",
  invariant: "客户端连接到预期实例，字符集、端口、数据目录和身份与记录一致",
  artifact: "安装清单、实例参数快照、服务日志和连接测试记录",
  nodes: [
    "2.1 MySQL版本与发行包选择",
    "2.2 Windows环境安装",
    "2.3 Linux环境安装",
    "2.4 初始化数据目录",
    "2.5 启动、停止与重启服务",
    "2.6 配置文件及加载顺序",
    "2.7 端口、套接字与网络监听",
    "2.8 字符集与排序规则",
    "2.9 命令行客户端连接",
    "2.10 初始账户与口令",
    "2.11 安装故障定位",
    "2.12 本章验证清单",
  ],
};

export function MseCh02InstallConfigurationModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh02InstallConfigurationExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh02InstallConfigurationEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
