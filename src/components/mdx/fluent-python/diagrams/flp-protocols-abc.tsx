import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "接口、协议与ABC", input: "输入1：接口、协议与ABC", mechanism: "接口、协议与ABC覆盖从非正式行为约定到显式运行时抽象的连续谱", evidence: "检查返回、状态与失败路径 1", invariant: "鸭子类型与猴子补丁强调先尝试行为，也提醒补丁作用域和版本风险。" },
  { label: "鸭子类型与猴子补丁", input: "输入2：鸭子类型与猴子补丁", mechanism: "鸭子类型与猴子补丁强调先尝试行为，也提醒补丁作用域和版本风险", evidence: "检查返回、状态与失败路径 2", invariant: "鹅类型与虚拟子类使用ABC的注册和subclasshook声明结构关系。" },
  { label: "鹅类型与虚拟子类", input: "输入3：鹅类型与虚拟子类", mechanism: "鹅类型与虚拟子类使用ABC的注册和subclasshook声明结构关系", evidence: "检查返回、状态与失败路径 3", invariant: "静态协议与运行时可检查协议由typing.Protocol表达结构子类型。" },
  { label: "静态协议与运行时可检", input: "输入4：静态协议与运行时可检查协议", mechanism: "静态协议与运行时可检查协议由typing.Protocol表达结构子类型", evidence: "检查返回、状态与失败路径 4", invariant: "协议设计与数值协议应保持精简、可组合并有明确语义。" },
];

export function FlpProtocolsAbcModelLab() {
  return <FluentPythonOfficialLab title="接口、协议与ABC：模型" caption="第13章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpProtocolsAbcBoundaryLab() {
  return <FluentPythonOfficialLab title="接口、协议与ABC：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpProtocolsAbcEvidenceLab() {
  return <FluentPythonOfficialLab title="接口、协议与ABC：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
