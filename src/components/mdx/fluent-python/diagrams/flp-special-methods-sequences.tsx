import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "序列特殊方法", input: "输入1：序列特殊方法", mechanism: "序列特殊方法应把自定义类型逐步带到协议要求，而不是一开始模仿list", evidence: "检查返回、状态与失败路径 1", invariant: "自定义序列与鸭子类型说明协议来自行为：没有继承Sequence也能被迭代和切片。" },
  { label: "自定义序列与鸭子类型", input: "输入2：自定义序列与鸭子类型", mechanism: "自定义序列与鸭子类型说明协议来自行为：没有继承Sequence也能被迭代和切片", evidence: "检查返回、状态与失败路径 2", invariant: "支持切片的getitem必须识别int和slice。" },
  { label: "支持切片的getit", input: "输入3：支持切片的getitem", mechanism: "支持切片的getitem必须识别int和slice", evidence: "检查返回、状态与失败路径 3", invariant: "动态属性访问可用getattr把x、y、z、t映射到分量，但setattr也要阻止只读快捷名被意外创建。" },
  { label: "动态属性访问", input: "输入4：动态属性访问", mechanism: "动态属性访问可用getattr把x、y、z、t映射到分量，但setattr也要阻止只读快捷名被意外创建", evidence: "检查返回、状态与失败路径 4", invariant: "哈希、相等与格式化要覆盖任意维度：用zip比较会截断，必须先比长度；hash可归约各分量；超球面格式应从模长和角度推导并保持数值稳定。" },
];

export function FlpSpecialMethodsSequencesModelLab() {
  return <FluentPythonOfficialLab title="序列特殊方法：模型" caption="第12章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpSpecialMethodsSequencesBoundaryLab() {
  return <FluentPythonOfficialLab title="序列特殊方法：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpSpecialMethodsSequencesEvidenceLab() {
  return <FluentPythonOfficialLab title="序列特殊方法：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
