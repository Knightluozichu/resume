import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第5章 标准I/O库",
  label: "文件与I/O",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: ["打开流", "选择缓冲", "读写记录", "检查状态", "刷新定位", "关闭验证"],
  concepts: [
    "第5章 标准I/O库",
    "5.1 引言",
    "5.2 流和FILE对象",
    "5.3 标准输入、标准输出和标准错误",
    "5.4 缓冲",
    "5.5 打开流",
    "5.6 读和写流",
    "5.7 每次一行I/O",
    "5.8 标准I/O的效率",
    "5.9 二进制I/O",
    "5.10 定位流",
    "5.11 格式化I/O",
    "5.12 实现细节",
    "5.13 临时文件",
    "5.14 内存流",
    "5.15 标准I/O的替代软件",
    "5.16 小结",
  ],
} as const;

export function UapStandardIoMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapStandardIoExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapStandardIoEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
