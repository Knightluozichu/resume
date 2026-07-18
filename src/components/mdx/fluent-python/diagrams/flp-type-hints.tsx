import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "函数中的类型提示", input: "输入1：函数中的类型提示", mechanism: "函数中的类型提示是给静态检查器、IDE和读者的契约，CPython通常不会在调用时强制它", evidence: "检查返回、状态与失败路径 1", invariant: "渐进式类型与mypy允许模块逐步采用检查：未标注区域保留动态能力，严格边界逐渐扩大。" },
  { label: "渐进式类型与mypy", input: "输入2：渐进式类型与mypy", mechanism: "渐进式类型与mypy允许模块逐步采用检查：未标注区域保留动态能力，严格边界逐渐扩大", evidence: "检查返回、状态与失败路径 2", invariant: "Optional、Union与泛型集合描述空值、候选类型和容器元素。" },
  { label: "Optional、U", input: "输入3：Optional、Union与泛型集合", mechanism: "Optional、Union与泛型集合描述空值、候选类型和容器元素", evidence: "检查返回、状态与失败路径 3", invariant: "TypeVar、静态协议与Callable分别表达输入输出相关性、结构能力和回调签名。" },
  { label: "TypeVar、静态", input: "输入4：TypeVar、静态协议与Callable", mechanism: "TypeVar、静态协议与Callable分别表达输入输出相关性、结构能力和回调签名", evidence: "检查返回、状态与失败路径 4", invariant: "不完美类型与强测试提醒我们：注解不能表达全部数据约束，也不替代运行时验证和测试。" },
];

export function FlpTypeHintsModelLab() {
  return <FluentPythonOfficialLab title="函数中的类型提示：模型" caption="第8章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpTypeHintsBoundaryLab() {
  return <FluentPythonOfficialLab title="函数中的类型提示：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpTypeHintsEvidenceLab() {
  return <FluentPythonOfficialLab title="函数中的类型提示：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
