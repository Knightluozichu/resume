import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "类元编程", input: "输入1：类元编程", mechanism: "类元编程在类创建阶段检查或改写类", evidence: "检查返回、状态与失败路径 1", invariant: "类作为对象与类工厂说明type可以在运行时接收名称、基类和命名空间生成类。" },
  { label: "类作为对象与类工厂", input: "输入2：类作为对象与类工厂", mechanism: "类作为对象与类工厂说明type可以在运行时接收名称、基类和命名空间生成类", evidence: "检查返回、状态与失败路径 2", invariant: "init_subclass与类装饰器覆盖多数注册和后处理需求。" },
  { label: "init_subcl", input: "输入3：init_subclass与类装饰器", mechanism: "init_subclass与类装饰器覆盖多数注册和后处理需求", evidence: "检查返回、状态与失败路径 3", invariant: "导入时与运行时求值要区分：类体、装饰器和注册代码通常在模块首次导入时执行，实例方法在调用时执行。" },
  { label: "导入时与运行时求值", input: "输入4：导入时与运行时求值", mechanism: "导入时与运行时求值要区分：类体、装饰器和注册代码通常在模块首次导入时执行，实例方法在调用时执行", evidence: "检查返回、状态与失败路径 4", invariant: "元类与现代替代方案应按最小工具选择。" },
];

export function FlpClassMetaprogrammingModelLab() {
  return <FluentPythonOfficialLab title="类元编程：模型" caption="第24章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpClassMetaprogrammingBoundaryLab() {
  return <FluentPythonOfficialLab title="类元编程：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpClassMetaprogrammingEvidenceLab() {
  return <FluentPythonOfficialLab title="类元编程：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
