import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "《UNIX网络编程 卷1：套接字联网API（第3版）》权威学习地图",
  label: "导读 · 31章与5附录路线",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: ["核对版本目录","建立测试网络","画端点状态机","追踪API与分组","注入单变量故障","清理恢复重放"],
  concepts: ["第1章 简介","第2章 传输层：TCP、UDP和SCTP","第3章 套接字编程简介","第4章 基本TCP套接字编程","第5章 TCP客户/服务器程序示例","第6章 I/O复用：select和poll函数","第7章 套接字选项","第8章 基本UDP套接字编程","第9章 基本SCTP套接字编程","第10章 SCTP客户/服务器程序例子","第11章 名字与地址转换","第12章 IPv4与IPv6的互操作性","第13章 守护进程和inetd超级服务器","第14章 高级I/O函数","第15章 UNIX域协议","第16章 非阻塞式I/O","第17章 ioctl操作","第18章 路由套接字","第19章 密钥管理套接字","第20章 广播","第21章 多播","第22章 高级UDP套接字编程","第23章 高级SCTP套接字编程","第24章 带外数据","第25章 信号驱动式I/O","第26章 线程","第27章 IP选项","第28章 原始套接字","第29章 数据链路访问","第30章 客户/服务器程序设计范式","第31章 流","附录A IPv4、IPv6、ICMPv4和ICMPv6","附录B 虚拟网络","附录C 调试技术","附录D 杂凑的源代码","附录E 精选习题答案"],
} as const;

export function UnpOfficialLearningMapMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function UnpOfficialLearningMapExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function UnpOfficialLearningMapEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
