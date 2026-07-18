import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第3章 语法分析",
  label: "第3章 语法分析",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "冻结文法",
    "计算预测集合",
    "构造LR项目集",
    "生成分析表",
    "执行移进归约",
    "验证错误恢复",
  ],
  concepts: [
    "第3章 语法分析",
    "3.1 上下文无关文法",
    "3.1.1 推导",
    "3.1.2 语法分析树",
    "3.1.3 二义性文法",
    "3.1.4 文件结束符",
    "3.2 预测分析",
    "3.2.1 FIRST集合和FOLLOW集合",
    "3.2.2 构造一个预测分析器",
    "3.2.3 消除左递归",
    "3.2.4 提取左因子",
    "3.2.5 错误恢复",
    "3.3 LR分析",
    "3.3.1 LR分析引擎",
    "3.3.2 LR(0)分析器生成器",
    "3.3.3 SLR分析器的生成",
    "3.3.4 LR(1)项和LR(1)分析表",
    "3.3.5 LALR(1)分析表",
    "3.3.6 各类文法的层次",
    "3.3.7 二义性文法的LR分析",
    "3.4 使用分析器的生成器",
    "3.4.1 冲突",
    "3.4.2 优先级指导",
    "3.4.3 语法和语义",
    "3.5 错误恢复",
    "3.5.1 用error符号恢复",
    "3.5.2 全局错误修复",
    "程序设计：语法分析",
  ],
} as const;

export function Tbc03ParsingMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc03ParsingExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc03ParsingEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
