import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "《编译原理（第2版）》全书总复习",
  label: "《编译原理（第2版）》全书总复习",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "扫描固定样本",
    "保存AST与IR",
    "运行分析优化",
    "调度分配指令",
    "比较机器行为",
    "归档回归证据",
  ],
  concepts: [
    "第1章 引论",
    "第2章 一个简单的语法制导翻译器",
    "第3章 词法分析",
    "第4章 语法分析",
    "第5章 语法制导翻译",
    "第6章 中间代码生成",
    "第7章 运行时刻环境",
    "第8章 代码生成",
    "第9章 机器无关优化",
    "第10章 指令级并行性",
    "第11章 并行性和局部性的优化",
    "第12章 过程间分析",
    "附录A 一个完整的前端",
    "附录B 寻找线性无关解",
  ],
} as const;

export function DbcOfficialFinalReviewMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function DbcOfficialFinalReviewExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function DbcOfficialFinalReviewEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
