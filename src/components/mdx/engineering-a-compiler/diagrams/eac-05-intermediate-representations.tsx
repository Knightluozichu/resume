import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第5章 中间表示",
  label: "第5章 中间表示",
  color: "#5b21b6",
  soft: "#ede9fe",
  chain: [
    "选择IR层级",
    "线性化表达式",
    "划分基本块",
    "建立CFG",
    "命名SSA值",
    "验证内存模型",
  ],
  concepts: [
    "第二部分 从源码映射到IR",
    "第5章 中间表示",
    "5.1 简介",
    "5.1.1 中间表示的分类",
    "5.2 图IR",
    "5.2.1 与语法相关的树",
    "5.2.2 图",
    "5.3 线性IR",
    "5.3.1 堆栈机代码",
    "5.3.2 三地址代码",
    "5.3.3 线性代码的表示",
    "5.3.4 根据线性代码建立控制流图",
    "5.4 将值映射到名字",
    "5.4.1 临时值的命名",
    "5.4.2 静态单赋值形式",
    "5.4.3 内存模型",
    "5.5 符号表",
    "5.5.1 散列表",
    "5.5.2 建立符号表",
    "5.5.3 处理嵌套的作用域",
    "5.5.4 符号表的许多用途",
    "5.5.5 符号表技术的其他用途",
    "5.6 小结和展望",
  ],
} as const;

export function Eac05IntermediateRepresentationsMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac05IntermediateRepresentationsExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac05IntermediateRepresentationsEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
