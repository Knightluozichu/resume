import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "属性描述符", input: "输入1：属性描述符", mechanism: "属性描述符是实现get、set或delete协议并作为类属性保存的对象", evidence: "检查返回、状态与失败路径 1", invariant: "基于描述符的验证把多个字段共有的正数、非空或类型规则抽出。" },
  { label: "基于描述符的验证", input: "输入2：基于描述符的验证", mechanism: "基于描述符的验证把多个字段共有的正数、非空或类型规则抽出", evidence: "检查返回、状态与失败路径 2", invariant: "自动存储属性命名可由set_name在类创建时接收owner和name，生成不冲突的私有键。" },
  { label: "自动存储属性命名", input: "输入3：自动存储属性命名", mechanism: "自动存储属性命名可由set_name在类创建时接收owner和name，生成不冲突的私有键", evidence: "检查返回、状态与失败路径 3", invariant: "覆盖型与非覆盖型描述符的差异取决于是否实现set或delete。" },
  { label: "覆盖型与非覆盖型描述", input: "输入4：覆盖型与非覆盖型描述符", mechanism: "覆盖型与非覆盖型描述符的差异取决于是否实现set或delete", evidence: "检查返回、状态与失败路径 4", invariant: "方法是描述符：函数的get在通过实例访问时返回绑定方法，自动携带self；通过类访问则返回函数。" },
];

export function FlpDescriptorsModelLab() {
  return <FluentPythonOfficialLab title="属性描述符：模型" caption="第23章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpDescriptorsBoundaryLab() {
  return <FluentPythonOfficialLab title="属性描述符：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpDescriptorsEvidenceLab() {
  return <FluentPythonOfficialLab title="属性描述符：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
