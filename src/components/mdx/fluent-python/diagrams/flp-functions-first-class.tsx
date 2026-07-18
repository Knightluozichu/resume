import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "函数作为一等对象", input: "输入1：函数作为一等对象", mechanism: "函数作为一等对象意味着可以赋给变量、放进集合、作为参数传入并作为结果返回", evidence: "检查返回、状态与失败路径 1", invariant: "高阶函数接收函数或返回函数，sorted的key、map和reduce都是典型入口。" },
  { label: "高阶函数", input: "输入2：高阶函数", mechanism: "高阶函数接收函数或返回函数，sorted的key、map和reduce都是典型入口", evidence: "检查返回、状态与失败路径 2", invariant: "可调用对象不局限于函数：实现call的实例、类、绑定方法和生成器函数都可调用。" },
  { label: "可调用对象", input: "输入3：可调用对象", mechanism: "可调用对象不局限于函数：实现call的实例、类、绑定方法和生成器函数都可调用", evidence: "检查返回、状态与失败路径 3", invariant: "仅关键字参数与仅位置参数用星号和斜杠表达API调用约束。" },
  { label: "仅关键字参数与仅位置", input: "输入4：仅关键字参数与仅位置参数", mechanism: "仅关键字参数与仅位置参数用星号和斜杠表达API调用约束", evidence: "检查返回、状态与失败路径 4", invariant: "operator模块与functools.partial减少微小lambda，把itemgetter、attrgetter和methodcaller用于结构化提取，把partial用于冻结部分参数。" },
];

export function FlpFunctionsFirstClassModelLab() {
  return <FluentPythonOfficialLab title="函数作为一等对象：模型" caption="第7章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpFunctionsFirstClassBoundaryLab() {
  return <FluentPythonOfficialLab title="函数作为一等对象：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpFunctionsFirstClassEvidenceLab() {
  return <FluentPythonOfficialLab title="函数作为一等对象：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
