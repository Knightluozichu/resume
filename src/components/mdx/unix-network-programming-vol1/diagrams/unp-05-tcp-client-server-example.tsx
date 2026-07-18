import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第5章 TCP客户/服务器程序示例",
  label: "基本套接字编程",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: ["解析监听地址","创建绑定监听","接受连接","传输字节流","处理半关闭","回收连接"],
  concepts: ["第5章 TCP客户/服务器程序示例","5.1 概述","5.2 TCP回射服务器程序：main函数","5.3 TCP回射服务器程序：str_echo函数","5.4 TCP回射客户程序：main函数","5.5 TCP回射客户程序：str_cli函数","5.6 正常启动","5.7 正常终止","5.8 POSIX信号处理","5.9 处理SIGCHLD信号","5.10 wait和waitpid函数","5.11 accept返回前连接中止","5.12 服务器进程终止","5.13 SIGPIPE信号","5.14 服务器主机崩溃","5.15 服务器主机崩溃后重启","5.16 服务器主机关机","5.17 TCP程序例子小结","5.18 数据格式","5.19 小结"],
} as const;

export function Unp05TcpClientServerExampleMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp05TcpClientServerExampleExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp05TcpClientServerExampleEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
