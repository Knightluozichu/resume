import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-06-syntax-analysis",
  title: "第6章 语法分析",
  concepts: [
    "第6章 语法分析",
    "6.1 定义的分析",
    "6.2 语句的分析",
    "6.3 表达式的分析",
    "6.4 项的分析",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "C♭语法树入口台",
    boundary: "definitions/statements/expressions/terms → parse result",
    axisA: {
      label: "语法入口",
      levels: ["定义", "语句", "表达式"],
    },
    axisB: {
      label: "嵌套深度",
      levels: ["单层", "组合", "截断"],
    },
    fault: "表达式优先级或悬挂else生成错误树",
    invariant: "树形状保持结合性、优先级、声明边界和完整源跨度",
    probe:
      "java AstDump samples/syntax.cb\njava AstDump samples/syntax-invalid.cb",
    signal: "括号化AST与第一诊断",
    artifact: "语法样本金集",
    trap: "能解析不代表AST形状符合语言语义",
    practiceMode: "code",
    task: "第6章 语法分析固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变语法入口或嵌套深度。",
  },
} as const;

export function Crc06SyntaxAnalysisMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc06SyntaxAnalysisExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc06SyntaxAnalysisEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
