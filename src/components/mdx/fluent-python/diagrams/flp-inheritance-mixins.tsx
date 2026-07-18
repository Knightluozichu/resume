import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "继承的利与弊", input: "输入1：继承的利与弊", mechanism: "继承的利与弊取决于关系是否稳定", evidence: "检查返回、状态与失败路径 1", invariant: "super与内置类型子类化都要求理解协作式调用。" },
  { label: "super与内置类型", input: "输入2：super与内置类型子类化", mechanism: "super与内置类型子类化都要求理解协作式调用", evidence: "检查返回、状态与失败路径 2", invariant: "多重继承与方法解析顺序采用C3线性化，保证局部顺序和单调性。" },
  { label: "多重继承与方法解析顺", input: "输入3：多重继承与方法解析顺序", mechanism: "多重继承与方法解析顺序采用C3线性化，保证局部顺序和单调性", evidence: "检查返回、状态与失败路径 3", invariant: "Mixin类应提供单一、可复用的行为，不独立实例化，也不拥有复杂状态。" },
  { label: "Mixin类", input: "输入4：Mixin类", mechanism: "Mixin类应提供单一、可复用的行为，不独立实例化，也不拥有复杂状态", evidence: "检查返回、状态与失败路径 4", invariant: "组合优于继承并非绝对口号：框架要求回调基类、稳定is-a关系可用继承；策略、服务和存储等易变化协作者更适合组合。" },
];

export function FlpInheritanceMixinsModelLab() {
  return <FluentPythonOfficialLab title="继承的利与弊：模型" caption="第14章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpInheritanceMixinsBoundaryLab() {
  return <FluentPythonOfficialLab title="继承的利与弊：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpInheritanceMixinsEvidenceLab() {
  return <FluentPythonOfficialLab title="继承的利与弊：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
