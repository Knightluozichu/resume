import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "读取 Unicode 源文本",
  "剔除注释并识别字面量",
  "解析标识符与保留字",
  "处理转义与规范化",
  "判定语句边界",
  "输出稳定 token 流"
] as const;

export function Jdg02LexicalStructureMapLab() {
  return <Jdg7MechanismLab title="第 2 章 词法结构 · 机制地图" label="Lexical Structure" nodes={nodes} mode="map" />;
}

export function Jdg02LexicalStructureExperimentLab() {
  return <Jdg7MechanismLab title="第 2 章 词法结构 · 运行时实验" label="Lexical Structure" nodes={nodes} mode="experiment" />;
}

export function Jdg02LexicalStructureEvidenceLab() {
  return <Jdg7MechanismLab title="第 2 章 词法结构 · 恢复证据" label="Lexical Structure" nodes={nodes} mode="evidence" />;
}
