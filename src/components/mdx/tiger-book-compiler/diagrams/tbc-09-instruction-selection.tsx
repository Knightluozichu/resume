import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第9章 指令选择",
  label: "第9章 指令选择",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "冻结指令模板",
    "覆盖IR树",
    "计算覆盖成本",
    "发射抽象汇编",
    "标注def/use",
    "模拟目标行为",
  ],
  concepts: [
    "第9章 指令选择",
    "9.1 指令选择算法",
    "9.1.1 Maximal Munch算法",
    "9.1.2 动态规划",
    "9.1.3 树文法",
    "9.1.4 快速匹配",
    "9.1.5 覆盖算法的效率",
    "9.2 CISC机器",
    "9.3 Tiger编译器的指令选择",
    "9.3.1 抽象的汇编语言指令",
    "9.3.2 生成汇编指令",
    "9.3.3 过程调用",
    "9.3.4 无帧指针的情形",
    "程序设计：指令选择",
  ],
} as const;

export function Tbc09InstructionSelectionMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc09InstructionSelectionExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc09InstructionSelectionEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
