import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第16章 多态类型",
  label: "第16章 多态类型",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "生成类型变量",
    "收集约束",
    "执行合一",
    "泛化类型方案",
    "实例化使用点",
    "选择运行时表示",
  ],
  concepts: [
    "第16章 多态类型",
    "16.1 参数多态性",
    "16.1.1 显式带类型的多态语言",
    "16.1.2 多态类型的检查",
    "16.2 类型推论",
    "16.2.1 一个隐式类型的多态语言",
    "16.2.2 类型推论算法",
    "16.2.3 递归的数据类型",
    "16.2.4 Hindley-Milner类型的能力",
    "16.3 多态变量的表示",
    "16.3.1 多态函数的扩展",
    "16.3.2 完全的装箱转换",
    "16.3.3 基于强制的表示分析",
    "16.3.4 将类型作为运行时参数传递",
    "16.4 静态重载的解决方法",
  ],
} as const;

export function Tbc16PolymorphicTypesMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc16PolymorphicTypesExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc16PolymorphicTypesEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
