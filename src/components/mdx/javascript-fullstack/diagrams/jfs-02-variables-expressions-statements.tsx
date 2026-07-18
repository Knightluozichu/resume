import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "创建脚本入口",
  "标注意图和约束",
  "建立变量绑定",
  "计算表达式",
  "选择或重复语句",
  "用练习验证边界",
] as const;

export function Jfs02VariablesExpressionsStatementsMapLab() {
  return (
    <JfsBookLab
      title="第 2 章 变量、表达式与语句 · 机制地图"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs02VariablesExpressionsStatementsExperimentLab() {
  return (
    <JfsBookLab
      title="第 2 章 变量、表达式与语句 · 边界实验"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs02VariablesExpressionsStatementsEvidenceLab() {
  return (
    <JfsBookLab
      title="第 2 章 变量、表达式与语句 · 恢复证据"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="evidence"
    />
  );
}
