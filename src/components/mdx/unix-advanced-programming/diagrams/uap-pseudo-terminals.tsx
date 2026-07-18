import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第19章 伪终端",
  label: "终端与伪终端",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "打开PTY",
    "派生会话",
    "绑定从端",
    "双向转发",
    "同步窗口",
    "回收恢复",
  ],
  concepts: [
    "第19章 伪终端",
    "19.1 引言",
    "19.2 概述",
    "19.3 打开伪终端设备",
    "19.4 函数pty_fork",
    "19.5 pty程序",
    "19.6 使用pty程序",
    "19.7 高级特性",
    "19.8 小结",
  ],
} as const;

export function UapPseudoTerminalsMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapPseudoTerminalsExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapPseudoTerminalsEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
