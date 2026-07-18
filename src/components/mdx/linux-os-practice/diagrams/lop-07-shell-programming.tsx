import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "第7章 Shell 编程",
  label: "自动化 · Shell与正则",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "声明解释器",
    "读取校验输入",
    "展开变量",
    "执行分支循环",
    "调用函数脚本",
    "检查状态并清理",
  ],
  concepts: [
    "第7章 Shell 编程",
    "7.1 Shell 脚本介绍",
    "7.2 Shell 脚本的基本语法",
    "7.2.1 脚本的开头",
    "7.2.2 脚本的执行",
    "7.2.3 变量",
    "7.2.4 语句",
    "7.2.5 函数",
    "7.2.6 脚本调用",
    "7.3 Shell 编程应用",
    "7.3.1 猜数字游戏",
    "7.3.2 石头、剪刀、布游戏",
    "7.4 本章小结",
  ],
} as const;

export function Lop07ShellProgrammingMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function Lop07ShellProgrammingExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function Lop07ShellProgrammingEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
