import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第18章 终端I/O",
  label: "终端与伪终端",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "确认终端",
    "保存属性",
    "修改行规程",
    "读取边界",
    "响应窗口变化",
    "恢复属性",
  ],
  concepts: [
    "第18章 终端I/O",
    "18.1 引言",
    "18.2 综述",
    "18.3 特殊输入字符",
    "18.4 获得和设置终端属性",
    "18.5 终端选项标志",
    "18.6 stty命令",
    "18.7 波特率函数",
    "18.8 行控制函数",
    "18.9 终端标识",
    "18.10 规范模式",
    "18.11 非规范模式",
    "18.12 终端窗口大小",
    "18.13 termcap、terminfo和curses",
    "18.14 小结",
  ],
} as const;

export function UapTerminalIoMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapTerminalIoExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapTerminalIoEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
