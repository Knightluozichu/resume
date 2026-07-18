import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第16章 网络IPC：套接字",
  label: "进程间通信",
  color: "#b45309",
  soft: "#fef3c7",
  chain: [
    "解析地址",
    "创建套接字",
    "绑定或连接",
    "传输分帧",
    "处理半关闭",
    "关闭核对",
  ],
  concepts: [
    "第16章 网络IPC：套接字",
    "16.1 引言",
    "16.2 套接字描述符",
    "16.3 寻址",
    "16.3.1 字节序",
    "16.3.2 地址格式",
    "16.3.3 地址查询",
    "16.3.4 将套接字与地址关联",
    "16.4 建立连接",
    "16.5 数据传输",
    "16.6 套接字选项",
    "16.7 带外数据",
    "16.8 非阻塞和异步I/O",
    "16.9 小结",
  ],
} as const;

export function UapNetworkIpcSocketsMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapNetworkIpcSocketsExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapNetworkIpcSocketsEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
