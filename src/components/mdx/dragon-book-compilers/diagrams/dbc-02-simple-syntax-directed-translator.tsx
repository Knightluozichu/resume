import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "第2章 一个简单的语法制导翻译器",
  label: "第2章 一个简单的语法制导翻译器",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "定义文法",
    "消除左递归",
    "扫描词法单元",
    "执行语义动作",
    "构造抽象语法",
    "发射三地址代码",
  ],
  concepts: [
    "第2章 一个简单的语法制导翻译器",
    "2.1 引言",
    "2.2 语法定义",
    "2.2.1 文法定义",
    "2.2.2 推导",
    "2.2.3 语法分析树",
    "2.2.4 二义性",
    "2.2.5 运算符的结合性",
    "2.2.6 运算符的优先级",
    "2.3 语法制导翻译",
    "2.3.1 后缀表示",
    "2.3.2 综合属性",
    "2.3.3 简单的语法制导定义",
    "2.3.4 树遍历",
    "2.3.5 翻译方案",
    "2.4 语法分析",
    "2.4.1 自顶向下分析方法",
    "2.4.2 预测分析法",
    "2.4.3 何时使用空产生式",
    "2.4.4 设计一个预测语法分析器",
    "2.4.5 左递归",
    "2.5 简单表达式的翻译器",
    "2.5.1 抽象语法和具体语法",
    "2.5.2 调整翻译方案",
    "2.5.3 非终结符号的过程",
    "2.5.4 简化翻译器",
    "2.5.5 完整程序",
    "2.6 词法分析",
    "2.6.1 删除空白和注释",
    "2.6.2 预读",
    "2.6.3 常量",
    "2.6.4 识别关键字和标识符",
    "2.6.5 词法分析器",
    "2.7 符号表",
    "2.7.1 每个作用域一个符号表",
    "2.7.2 符号表的使用",
    "2.8 中间代码生成",
    "2.8.1 两种中间表示",
    "2.8.2 语法树的构造",
    "2.8.3 静态检查",
    "2.8.4 三地址代码",
  ],
} as const;

export function Dbc02SimpleSyntaxDirectedTranslatorMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function Dbc02SimpleSyntaxDirectedTranslatorExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function Dbc02SimpleSyntaxDirectedTranslatorEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
