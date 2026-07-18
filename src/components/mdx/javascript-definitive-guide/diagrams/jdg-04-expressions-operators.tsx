import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "解析主表达式",
  "解析访问、调用与创建",
  "按优先级建求值树",
  "执行算术、关系与逻辑运算",
  "传播短路与副作用",
  "产生最终值或异常"
] as const;

export function Jdg04ExpressionsOperatorsMapLab() {
  return <Jdg7MechanismLab title="第 4 章 表达式与操作符 · 机制地图" label="Expressions and Operators" nodes={nodes} mode="map" />;
}

export function Jdg04ExpressionsOperatorsExperimentLab() {
  return <Jdg7MechanismLab title="第 4 章 表达式与操作符 · 运行时实验" label="Expressions and Operators" nodes={nodes} mode="experiment" />;
}

export function Jdg04ExpressionsOperatorsEvidenceLab() {
  return <Jdg7MechanismLab title="第 4 章 表达式与操作符 · 恢复证据" label="Expressions and Operators" nodes={nodes} mode="evidence" />;
}
