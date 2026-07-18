import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第14章 面向对象的语言",
  label: "第14章 面向对象的语言",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "定义类描述",
    "布局字段",
    "构造方法表",
    "生成动态调用",
    "检查成员关系",
    "优化并差分执行",
  ],
  concepts: [
    "第14章 面向对象的语言",
    "14.1 类",
    "14.2 数据域的单继承性",
    "14.3 多继承",
    "14.4 测试类成员关系",
    "14.5 私有域和私有方法",
    "14.6 无类语言",
    "14.7 面向对象程序的优化",
    "程序设计：OBJECT-Tiger",
  ],
} as const;

export function Tbc14ObjectOrientedLanguagesMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc14ObjectOrientedLanguagesExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc14ObjectOrientedLanguagesEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
