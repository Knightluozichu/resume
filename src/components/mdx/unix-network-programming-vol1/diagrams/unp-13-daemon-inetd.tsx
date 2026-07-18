import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第13章 守护进程和inetd超级服务器",
  label: "高级套接字 · 内核接口",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: ["冻结服务配置","启动监听端点","记录日志状态","注入客户故障","验证重启幂等","优雅停机"],
  concepts: ["第13章 守护进程和inetd超级服务器","13.1 概述","13.2 syslogd守护进程","13.3 syslog函数","13.4 daemon_init函数","13.5 inetd守护进程","13.6 daemon_inetd函数","13.7 小结"],
} as const;

export function Unp13DaemonInetdMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp13DaemonInetdExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp13DaemonInetdEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
