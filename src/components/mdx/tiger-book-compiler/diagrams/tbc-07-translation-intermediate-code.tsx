import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第7章 翻译成中间代码",
  label: "第7章 翻译成中间代码",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "选择翻译形式",
    "翻译左值",
    "翻译控制流",
    "生成静态链",
    "收集过程和字符串片段",
    "解释或模拟IR",
  ],
  concepts: [
    "第7章 翻译成中间代码",
    "7.1 中间表示树",
    "7.2 翻译为树中间语言",
    "7.2.1 表达式的种类",
    "7.2.2 简单变量",
    "7.2.3 追随静态链",
    "7.2.4 数组变量",
    "7.2.5 结构化的左值",
    "7.2.6 下标和域选择",
    "7.2.7 关于安全性的劝告",
    "7.2.8 算术操作",
    "7.2.9 条件表达式",
    "7.2.10 字符串",
    "7.2.11 记录和数组的创建",
    "7.2.12 while循环",
    "7.2.13 for循环",
    "7.2.14 函数调用",
    "7.3 声明",
    "7.3.1 变量定义",
    "7.3.2 函数定义",
    "7.3.3 片段",
    "程序设计：翻译成树",
  ],
} as const;

export function Tbc07TranslationIntermediateCodeMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc07TranslationIntermediateCodeExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc07TranslationIntermediateCodeEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
