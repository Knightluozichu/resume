import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "装饰器与闭包", input: "输入1：装饰器与闭包", mechanism: "装饰器与闭包都建立在函数一等性上", evidence: "检查返回、状态与失败路径 1", invariant: "装饰器执行与注册要区分导入阶段和调用阶段。" },
  { label: "装饰器执行与注册", input: "输入2：装饰器执行与注册", mechanism: "装饰器执行与注册要区分导入阶段和调用阶段", evidence: "检查返回、状态与失败路径 2", invariant: "变量作用域、闭包与nonlocal解释了为什么读取自由变量可行，而重新绑定需要声明nonlocal。" },
  { label: "变量作用域、闭包与n", input: "输入3：变量作用域、闭包与nonlocal", mechanism: "变量作用域、闭包与nonlocal解释了为什么读取自由变量可行，而重新绑定需要声明nonlocal", evidence: "检查返回、状态与失败路径 3", invariant: "cache、lru_cache与singledispatch分别处理无界记忆、有界淘汰和按第一个参数类型分派。" },
  { label: "cache、lru_", input: "输入4：cache、lru_cache与singledispatch", mechanism: "cache、lru_cache与singledispatch分别处理无界记忆、有界淘汰和按第一个参数类型分派", evidence: "检查返回、状态与失败路径 4", invariant: "参数化装饰器多一层函数来接收配置，类装饰器能保存状态。" },
];

export function FlpClosuresDecoratorsModelLab() {
  return <FluentPythonOfficialLab title="装饰器与闭包：模型" caption="第9章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpClosuresDecoratorsBoundaryLab() {
  return <FluentPythonOfficialLab title="装饰器与闭包：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpClosuresDecoratorsEvidenceLab() {
  return <FluentPythonOfficialLab title="装饰器与闭包：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
