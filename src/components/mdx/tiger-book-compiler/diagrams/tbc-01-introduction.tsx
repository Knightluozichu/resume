import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第1章 绪论",
  label: "第1章 绪论",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "定义模块",
    "建立抽象数据类型",
    "构造语法树",
    "维护环境",
    "执行语句",
    "核对输出",
  ],
  concepts: [
    "第一部分 编译基本原理",
    "第1章 绪论",
    "1.1 模块与接口",
    "1.2 工具和软件",
    "1.3 树语言的数据结构",
    "程序设计：直线式程序解释器",
  ],
} as const;

export function Tbc01IntroductionMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc01IntroductionExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc01IntroductionEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
