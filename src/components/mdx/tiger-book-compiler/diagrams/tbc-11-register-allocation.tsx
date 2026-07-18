import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第11章 寄存器分配",
  label: "第11章 寄存器分配",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "分类工作表",
    "简化低度结点",
    "安全合并MOVE",
    "选择溢出",
    "回栈着色",
    "重写并重新分析",
  ],
  concepts: [
    "第11章 寄存器分配",
    "11.1 通过简化进行着色",
    "11.2 合并",
    "11.3 预着色的结点",
    "11.3.1 机器寄存器的临时副本",
    "11.3.2 调用者保护的寄存器和被调用者保护的寄存器",
    "11.3.3 含预着色结点的例子",
    "11.4 图着色的实现",
    "11.4.1 传送指令工作表的管理",
    "11.4.2 数据结构",
    "11.4.3 程序代码",
    "11.5 针对树的寄存器分配",
    "程序设计：图着色",
  ],
} as const;

export function Tbc11RegisterAllocationMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc11RegisterAllocationExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc11RegisterAllocationEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
