import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第12章 整合为一体",
  label: "第12章 整合为一体",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "解析Tiger",
    "翻译并规范化IR",
    "选择和分配指令",
    "生成序言尾声",
    "汇编链接运行时",
    "差分验证输出",
  ],
  concepts: [
    "第12章 整合为一体",
    "程序设计：过程入口/出口",
    "程序设计：创建一个可运行的编译器",
  ],
} as const;

export function Tbc12PuttingItAllTogetherMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc12PuttingItAllTogetherExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc12PuttingItAllTogetherEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
