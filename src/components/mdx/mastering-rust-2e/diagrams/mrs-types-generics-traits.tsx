import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "类型系统", input: "目标与输入", rule: "类型系统把可执行操作限制在满足契约的值上", evidence: "类型系统的边界测试与结果记录", invariant: "类型系统把可执行操作限制在满足契约的值上；Rust同时利用静态类型、推导和代数数据类型，让非法状态更难被构造。" },
  { label: "泛型", input: "类型系统", rule: "泛型在不复制算法的前提下抽象类型参数，单态化通常生成专用机器码", evidence: "泛型的边界测试与结果记录", invariant: "泛型在不复制算法的前提下抽象类型参数，单态化通常生成专用机器码；抽象成本需要从代码体积、编译时间与运行性能三方面判断。" },
  { label: "Trait 抽象行为", input: "泛型", rule: "trait描述共享行为，impl把行为绑定到具体类型", evidence: "Trait 抽象行为的边界测试与结果记录", invariant: "trait描述共享行为，impl把行为绑定到具体类型；接口设计应保持最小，并通过关联类型或泛型参数表达调用者真正需要选择的自由度。" },
  { label: "Trait bound", input: "Trait 抽象行为", rule: "trait bound是泛型算法的能力证明，where子句让多个约束更清晰", evidence: "Trait bound的边界测试与结果记录", invariant: "trait bound是泛型算法的能力证明，where子句让多个约束更清晰；过宽约束会拒绝本可接受的类型，过窄约束会把错误推迟到实现内部。" },
  { label: "标准 Trait 与 Trait 对象", input: "Trait bound", rule: "标准trait支撑转换、比较、迭代和格式化", evidence: "标准 Trait 与 Trait 对象的边界测试与结果记录", invariant: "标准trait支撑转换、比较、迭代和格式化；trait对象以动态分发换取异构集合，只有对象安全的接口才能形成dyn边界。" },
];

export function MrsTypesGenericsTraitsModelLab() {
  return <MasteringRustOfficialLab title="类型、泛型与 Trait：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsTypesGenericsTraitsBoundaryLab() {
  return <MasteringRustOfficialLab title="类型、泛型与 Trait：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsTypesGenericsTraitsEvidenceLab() {
  return <MasteringRustOfficialLab title="类型、泛型与 Trait：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
