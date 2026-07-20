import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-04-lexical-analysis",
  title: "第4章 词法分析",
  concepts: [
    "第4章 词法分析",
    "4.1 基于JavaCC的扫描器的描述",
    "4.2 扫描没有结构的单词",
    "4.3 扫描不生成token的单词",
    "4.4 扫描具有结构的单词",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "JavaCC词法状态台",
    boundary: "characters → lexical state → token/SKIP/MORE → source span",
    axisA: {
      label: "词法规则",
      levels: ["TOKEN", "SKIP", "MORE"],
    },
    axisB: {
      label: "输入类别",
      levels: ["标识符", "字面量", "非法/截断"],
    },
    fault: "最长匹配吞掉后续字符或丢失源位置",
    invariant: "字符只被消费一次，token种类、文本和起止位置可重放",
    probe:
      "javacc Parser.jj\njavac generated/*.java\njava TokenDump samples/lexical.cb",
    signal: "token序列、跨度与词法状态",
    artifact: "词法差分与非法输入集",
    trap: "忽略空白不等于可以丢失诊断位置",
    practiceMode: "code",
    task: "第4章 词法分析固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变词法规则或输入类别。",
  },
} as const;

export function Crc04LexicalAnalysisMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc04LexicalAnalysisExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc04LexicalAnalysisEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
