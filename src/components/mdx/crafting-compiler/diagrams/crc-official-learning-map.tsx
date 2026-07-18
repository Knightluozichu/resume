import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "《自制编译器》权威学习地图",
  label: "导读 · 4部分22章路线",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "核对4部分",
    "完成代码分析",
    "生成AST与IR",
    "生成x86汇编",
    "链接加载ELF",
    "回归C♭程序",
  ],
  concepts: [
    "第1章 开始制作编译器",
    "第2章 C♭和cbc",
    "第1部分 代码分析",
    "第3章 语法分析的概要",
    "第4章 词法分析",
    "第5章 基于JavaCC的解析器描述",
    "第6章 语法分析",
    "第2部分 抽象语法树和中间代码",
    "第7章 JavaCC的action和抽象语法树",
    "第8章 抽象语法树的生成",
    "第9章 语义分析（1）引用的消解",
    "第10章 语义分析（2）静态类型检查",
    "第11章 中间代码的转换",
    "第3部分 汇编代码",
    "第12章 x86架构的概要",
    "第13章 x86汇编器编程",
    "第14章 函数和变量",
    "第15章 编译表达式和语句",
    "第16章 分配栈帧",
    "第17章 优化的方法",
    "第4部分 链接和加载",
    "第18章 生成目标文件",
    "第19章 链接和库",
    "第20章 加载程序",
    "第21章 生成地址无关代码",
    "第22章 扩展阅读",
    "附录",
  ],
} as const;

export function CrcOfficialLearningMapMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function CrcOfficialLearningMapExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function CrcOfficialLearningMapEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
