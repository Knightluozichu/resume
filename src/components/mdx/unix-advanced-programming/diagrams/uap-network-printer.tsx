import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第21章 与网络打印机通信",
  label: "综合应用",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "接收打印作业",
    "持久化队列",
    "编码HTTP请求",
    "发送到打印机",
    "处理重试",
    "确认并清理",
  ],
  concepts: [
    "第21章 与网络打印机通信",
    "21.1 引言",
    "21.2 网络打印协议",
    "21.3 超文本传输协议HTTP",
    "21.4 打印假脱机技术",
    "21.5 源代码",
    "21.6 小结",
  ],
} as const;

export function UapNetworkPrinterMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapNetworkPrinterExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapNetworkPrinterEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
