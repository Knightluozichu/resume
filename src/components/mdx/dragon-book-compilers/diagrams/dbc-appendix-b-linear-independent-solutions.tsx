import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "附录B 寻找线性无关解",
  label: "附录B 寻找线性无关解",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "写出约束矩阵",
    "执行消元",
    "识别自由变量",
    "构造零空间基",
    "检查线性无关",
    "代回原约束",
  ],
  concepts: ["附录B 寻找线性无关解"],
} as const;

export function DbcAppendixBLinearIndependentSolutionsMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function DbcAppendixBLinearIndependentSolutionsExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function DbcAppendixBLinearIndependentSolutionsEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
