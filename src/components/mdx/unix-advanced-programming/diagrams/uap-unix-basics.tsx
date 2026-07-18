import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第1章 UNIX基础知识",
  label: "基础与标准",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "登录取样",
    "遍历文件",
    "追踪进程",
    "触发错误",
    "观察信号",
    "清理重放",
  ],
  concepts: [
    "第1章 UNIX基础知识",
    "1.1 引言",
    "1.2 UNIX体系结构",
    "1.3 登录",
    "1.4 文件和目录",
    "1.5 输入和输出",
    "1.6 程序和进程",
    "1.7 出错处理",
    "1.8 用户标识",
    "1.9 信号",
    "1.10 时间值",
    "1.11 系统调用和库函数",
    "1.12 小结",
  ],
} as const;

export function UapUnixBasicsMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapUnixBasicsExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapUnixBasicsEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
