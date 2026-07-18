import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第15章 编译表达式和语句",
  label: "第3部分 · 代码生成与优化",
  color: "#a16207",
  soft: "#fef9c3",
  chain: [
    "选择指令模式",
    "分配虚拟栈",
    "降低表达式语句",
    "修正帧偏移",
    "发射汇编DSL",
    "链接执行对照",
  ],
  concepts: [
    "第15章 编译表达式和语句",
    "15.1 确认编译结果",
    "15.2 x86汇编的对象与DSL",
    "15.3 cbc的x86汇编DSL",
    "15.4 CodeGenerator类的概要",
    "15.5 编译单纯的表达式",
    "15.6 编译二元运算",
    "15.7 引用变量和赋值",
    "15.8 编译jump语句",
  ],
} as const;

export function Crc15CompileExpressionsStatementsMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc15CompileExpressionsStatementsExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc15CompileExpressionsStatementsEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
