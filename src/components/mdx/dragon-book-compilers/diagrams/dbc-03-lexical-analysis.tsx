import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "第3章 词法分析",
  label: "第3章 词法分析",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "规定词法模式",
    "构造Thompson NFA",
    "执行子集构造",
    "最小化DFA",
    "接入双缓冲",
    "验证最长匹配",
  ],
  concepts: [
    "第3章 词法分析",
    "3.1 词法分析器的作用",
    "3.1.1 词法分析与语法分析",
    "3.1.2 词法单元、模式和词素",
    "3.1.3 词法单元的属性",
    "3.1.4 词法错误",
    "3.2 输入缓冲",
    "3.2.1 缓冲区对",
    "3.2.2 哨兵标记",
    "3.3 词法单元的规约",
    "3.3.1 串和语言",
    "3.3.2 语言上的运算",
    "3.3.3 正则表达式",
    "3.3.4 正则定义",
    "3.3.5 正则表达式的扩展",
    "3.4 词法单元的识别",
    "3.4.1 状态转换图",
    "3.4.2 保留字和标识符的识别",
    "3.4.3 完成运行示例",
    "3.4.4 基于状态转换图的词法分析器体系结构",
    "3.5 词法分析器生成工具Lex",
    "3.5.1 Lex的使用",
    "3.5.2 Lex程序的结构",
    "3.5.3 Lex中的冲突解决",
    "3.5.4 向前看运算符",
    "3.6 有穷自动机",
    "3.6.1 不确定有穷自动机",
    "3.6.2 转换表",
    "3.6.3 自动机对输入串的接受",
    "3.6.4 确定有穷自动机",
    "3.7 从正则表达式到自动机",
    "3.7.1 从NFA到DFA的转换",
    "3.7.2 NFA的模拟",
    "3.7.3 NFA模拟的效率",
    "3.7.4 从正则表达式构造NFA",
    "3.7.5 字符串处理算法的效率",
    "3.8 词法分析器生成工具的设计",
    "3.8.1 生成的词法分析器的结构",
    "3.8.2 基于NFA的模式匹配",
    "3.8.3 词法分析器使用的DFA",
    "3.8.4 实现向前看运算符",
    "3.9 基于DFA的模式匹配器的优化",
    "3.9.1 NFA的重要状态",
    "3.9.2 从语法树计算得到的函数",
    "3.9.3 计算nullable、firstpos和lastpos",
    "3.9.4 计算followpos",
    "3.9.5 从正则表达式直接构造DFA",
    "3.9.6 最小化DFA的状态数",
    "3.9.7 词法分析器中的状态最小化",
    "3.9.8 DFA模拟中的时间和空间权衡",
  ],
} as const;

export function Dbc03LexicalAnalysisMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function Dbc03LexicalAnalysisExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function Dbc03LexicalAnalysisEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
