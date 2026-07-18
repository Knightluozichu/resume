import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "第5章 语法制导翻译",
  label: "第5章 语法制导翻译",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "定义属性",
    "绘制依赖边",
    "拓扑排序",
    "选择S或L约束",
    "嵌入语义动作",
    "比较翻译结果",
  ],
  concepts: [
    "第5章 语法制导翻译",
    "5.1 语法制导定义",
    "5.1.1 继承属性和综合属性",
    "5.1.2 在语法分析树的结点上计算SDD",
    "5.2 SDD的求值顺序",
    "5.2.1 依赖图",
    "5.2.2 属性计算的顺序",
    "5.2.3 S属性定义",
    "5.2.4 L属性定义",
    "5.2.5 具有受控副作用的语义规则",
    "5.3 语法制导翻译的应用",
    "5.3.1 语法树的构造",
    "5.3.2 类型的结构",
    "5.4 语法制导的翻译方案",
    "5.4.1 后缀翻译方案",
    "5.4.2 后缀SDT的语法分析栈实现",
    "5.4.3 产生式内部带有动作的SDT",
    "5.4.4 从SDT中消除左递归",
    "5.4.5 L属性定义的SDT",
    "5.5 L属性SDD的实现",
    "5.5.1 在递归下降语法分析过程中进行翻译",
    "5.5.2 边扫描边生成代码",
    "5.5.3 L属性SDD和LL语法分析",
    "5.5.4 L属性SDD的自底向上语法分析",
  ],
} as const;

export function Dbc05SyntaxDirectedTranslationMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function Dbc05SyntaxDirectedTranslationExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function Dbc05SyntaxDirectedTranslationEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
