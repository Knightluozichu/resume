import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "《UNIX环境高级编程（第3版）》权威学习地图",
  label: "导读 · 21章与3附录路线",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "核对版本目录",
    "建立平台基线",
    "画对象生存期",
    "追踪系统调用",
    "注入单变量故障",
    "清理恢复重放",
  ],
  concepts: [
    "第1章 UNIX基础知识",
    "第2章 UNIX标准及实现",
    "第3章 文件I/O",
    "第4章 文件和目录",
    "第5章 标准I/O库",
    "第6章 系统数据文件和信息",
    "第7章 进程环境",
    "第8章 进程控制",
    "第9章 进程关系",
    "第10章 信号",
    "第11章 线程",
    "第12章 线程控制",
    "第13章 守护进程",
    "第14章 高级I/O",
    "第15章 进程间通信",
    "第16章 网络IPC：套接字",
    "第17章 高级进程间通信",
    "第18章 终端I/O",
    "第19章 伪终端",
    "第20章 数据库函数库",
    "第21章 与网络打印机通信",
    "附录A 函数原型",
    "附录B 其他源代码",
    "附录C 部分习题答案",
  ],
} as const;

export function UapOfficialLearningMapMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapOfficialLearningMapExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapOfficialLearningMapEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
