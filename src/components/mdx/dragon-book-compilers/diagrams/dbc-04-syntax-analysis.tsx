import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "第4章 语法分析",
  label: "第4章 语法分析",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "冻结文法",
    "消除左递归",
    "计算预测集合",
    "构造LR项目集",
    "生成分析表",
    "重放错误恢复",
  ],
  concepts: [
    "第4章 语法分析",
    "4.1 引论",
    "4.1.1 语法分析器的作用",
    "4.1.2 代表性的文法",
    "4.1.3 语法错误的处理",
    "4.1.4 错误恢复策略",
    "4.2 上下文无关文法",
    "4.2.1 上下文无关文法的形式定义",
    "4.2.2 符号表示的约定",
    "4.2.3 推导",
    "4.2.4 语法分析树和推导",
    "4.2.5 二义性",
    "4.2.6 验证文法生成的语言",
    "4.2.7 上下文无关文法与正则表达式",
    "4.3 文法的书写",
    "4.3.1 词法分析和语法分析",
    "4.3.2 消除二义性",
    "4.3.3 消除左递归",
    "4.3.4 提取左公因子",
    "4.3.5 非上下文无关语言构造",
    "4.4 自顶向下的语法分析",
    "4.4.1 递归下降的语法分析",
    "4.4.2 FIRST和FOLLOW",
    "4.4.3 LL(1)文法",
    "4.4.4 非递归的预测分析",
    "4.4.5 预测分析中的错误恢复",
    "4.5 自底向上的语法分析",
    "4.5.1 归约",
    "4.5.2 句柄剪枝",
    "4.5.3 移进-归约语法分析",
    "4.5.4 移进-归约语法分析中的冲突",
    "4.6 LR语法分析技术介绍：简单LR",
    "4.6.1 为什么使用LR语法分析器",
    "4.6.2 项和LR(0)自动机",
    "4.6.3 LR语法分析算法",
    "4.6.4 构造SLR语法分析表",
    "4.6.5 可行前缀",
    "4.7 更强大的LR语法分析器",
    "4.7.1 规范LR(1)项",
    "4.7.2 构造LR(1)项集",
    "4.7.3 规范LR(1)分析表",
    "4.7.4 构造LALR分析表",
    "4.7.5 LALR分析表的高效构造",
    "4.7.6 LR分析表的压缩",
    "4.8 使用二义性文法",
    "4.8.1 用优先级和结合性解决冲突",
    "4.8.2 悬空else二义性",
    "4.8.3 LR语法分析中的错误恢复",
    "4.9 语法分析器生成工具",
    "4.9.1 语法分析器生成工具Yacc",
    "4.9.2 使用Yacc处理二义性文法",
    "4.9.3 用Lex创建Yacc词法分析器",
    "4.9.4 Yacc中的错误恢复",
  ],
} as const;

export function Dbc04SyntaxAnalysisMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function Dbc04SyntaxAnalysisExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function Dbc04SyntaxAnalysisEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
