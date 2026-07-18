import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第15章 函数式程序设计语言",
  label: "第15章 函数式程序设计语言",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "计算自由变量",
    "构造闭包环境",
    "执行闭包变换",
    "识别尾位置",
    "建立thunk",
    "验证求值次数",
  ],
  concepts: [
    "第15章 函数式程序设计语言",
    "15.1 一个简单的函数式语言",
    "15.2 闭包",
    "15.3 不变的变量",
    "15.3.1 基于延续的I/O",
    "15.3.2 语言上的变化",
    "15.3.3 纯函数式语言的优化",
    "15.4 内联扩展",
    "15.5 闭包变换",
    "15.6 高效的尾递归",
    "15.7 懒惰计算",
    "15.7.1 传名调用计算",
    "15.7.2 按需调用",
    "15.7.3 懒惰程序的计算",
    "15.7.4 懒惰函数式程序的优化",
    "15.7.5 严格性分析",
    "程序设计：编译函数式语言",
  ],
} as const;

export function Tbc15FunctionalLanguagesMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc15FunctionalLanguagesExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc15FunctionalLanguagesEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
