import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第17章 高级进程间通信",
  label: "进程间通信",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "命名本地域",
    "验证对端",
    "建立唯一连接",
    "传递描述符",
    "切换服务版本",
    "关闭双方引用",
  ],
  concepts: [
    "第17章 高级进程间通信",
    "17.1 引言",
    "17.2 UNIX域套接字",
    "17.3 唯一连接",
    "17.4 传送文件描述符",
    "17.5 open服务器进程第1版",
    "17.6 open服务器进程第2版",
    "17.7 小结",
  ],
} as const;

export function UapAdvancedIpcMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapAdvancedIpcExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapAdvancedIpcEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
