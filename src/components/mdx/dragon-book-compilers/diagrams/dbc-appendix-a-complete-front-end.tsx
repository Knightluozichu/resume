import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "附录A 一个完整的前端",
  label: "附录A 一个完整的前端",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "冻结源语言",
    "实现扫描器",
    "维护类型环境",
    "翻译表达式",
    "翻译语句",
    "联调完整前端",
  ],
  concepts: [
    "附录A 一个完整的前端",
    "A.1 源语言",
    "A.2 主程序",
    "A.3 词法分析器",
    "A.4 符号表和类型",
    "A.5 表达式的中间代码",
    "A.6 布尔表达式的跳转代码",
    "A.7 语句的中间代码",
    "A.8 语法分析器",
    "A.9 创建前端",
  ],
} as const;

export function DbcAppendixACompleteFrontEndMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function DbcAppendixACompleteFrontEndExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function DbcAppendixACompleteFrontEndEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
