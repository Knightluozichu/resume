import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-05-javacc-parser",
  title: "第5章 基于JavaCC的解析器描述",
  concepts: [
    "第5章 基于JavaCC的解析器描述",
    "5.1 基于EBNF语法的描述",
    "5.2 语法的二义性和token的超前扫描",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "EBNF与前看决策台",
    boundary: "production → expansion choice → LOOKAHEAD → action",
    axisA: {
      label: "前看深度",
      levels: ["1", "局部2", "语义前看"],
    },
    axisB: {
      label: "产生式族",
      levels: ["声明", "语句", "表达式"],
    },
    fault: "JAVACODE黑盒出现在选择点导致不可预测分支",
    invariant: "每个选择点有可解释前缀，合法串唯一选择且非法串在最早位置失败",
    probe: "javacc -DEBUG_LOOKAHEAD=true Parser.jj\njava ParserProbe cases.txt",
    signal: "LOOKAHEAD轨迹与ParseException",
    artifact: "文法选择点清单",
    trap: "生成成功不等于生成的Java可编译或文法正确",
    practiceMode: "code",
    task: "第5章 基于JavaCC的解析器描述固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变前看深度或产生式族。",
  },
} as const;

export function Crc05JavaccParserMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc05JavaccParserExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc05JavaccParserEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
