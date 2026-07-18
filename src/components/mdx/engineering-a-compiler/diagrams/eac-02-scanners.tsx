import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第2章 词法分析器",
  label: "第2章 词法分析器",
  color: "#b45309",
  soft: "#fef3c7",
  chain: [
    "定义词素",
    "构造Thompson NFA",
    "执行子集构造",
    "运行Hopcroft最小化",
    "编码扫描器",
    "验证最长匹配",
  ],
  concepts: [
    "第2章 词法分析器",
    "2.1 简介",
    "2.2 识别单词",
    "2.2.1 识别器的形式化",
    "2.2.2 识别更复杂的单词",
    "2.3 正则表达式",
    "2.3.1 符号表示法的形式化",
    "2.3.2 示例",
    "2.3.3 RE的闭包性质",
    "2.4 从正则表达式到词法分析器",
    "2.4.1 非确定性有限自动机",
    "2.4.2 从正则表达式到NFA：Thompson构造法",
    "2.4.3 从NFA到DFA：子集构造法",
    "2.4.4 从DFA到最小DFA：Hopcroft算法",
    "2.4.5 将DFA用做识别器",
    "2.5 实现词法分析器",
    "2.5.1 表驱动词法分析器",
    "2.5.2 直接编码的词法分析器",
    "2.5.3 手工编码的词法分析器",
    "2.5.4 处理关键字",
    "2.6 高级主题",
    "2.6.1 从DFA到正则表达式",
    "2.6.2 DFA最小化的另一种方法：Brzozowski算法",
    "2.6.3 无闭包的正则表达式",
    "2.7 小结和展望",
  ],
} as const;

export function Eac02ScannersMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac02ScannersExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac02ScannersEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
