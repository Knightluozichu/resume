import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const calls: RustWayCase[] = [
  { label: "函数项", input: "命名fn", mechanism: "零大小函数项可coerce为fn pointer", result: "不捕获环境的调用", invariant: "ABI和参数返回类型必须匹配。" },
  { label: "闭包", input: "代码体与环境", mechanism: "编译器生成匿名结构体和call实现", result: "携带捕获状态的值", invariant: "捕获方式决定Fn、FnMut或FnOnce。" },
  { label: "高阶函数", input: "函数或闭包参数", mechanism: "泛型静态分派或dyn动态分派", result: "可替换行为", invariant: "选择分派方式时同时考虑代码体积、借用和存储。" },
];
const captures: RustWayCase[] = [
  { label: "Fn", input: "只读捕获", mechanism: "通过共享引用调用环境", result: "可重复并发友好调用", invariant: "调用不消费或独占修改捕获值。" },
  { label: "FnMut", input: "可变捕获", mechanism: "通过独占引用调用环境", result: "可重复但不可并发重入", invariant: "调用者必须持有闭包的可变访问权。" },
  { label: "FnOnce", input: "move出捕获值", mechanism: "消费闭包self", result: "最多调用一次", invariant: "调用后环境不能再次使用。" },
];
const iteration: RustWayCase[] = [
  { label: "IntoIterator", input: "集合、&集合或&mut集合", mechanism: "产生不同Item所有权的iterator", result: "owned、&T或&mut T", invariant: "选择遍历形式等于选择所有权动作。" },
  { label: "Adapter", input: "惰性iterator", mechanism: "map、filter、take组合状态机", result: "新的惰性iterator", invariant: "没有consumer就不会执行链。" },
  { label: "Consumer", input: "iterator", mechanism: "collect、fold、sum驱动next", result: "最终值或集合", invariant: "副作用、短路和错误传播必须可预测。" },
];
export function RswCallableModelLab() { return <RustWayOfficialLab title="函数、闭包与高阶调用" caption="调用语法相似，环境捕获、分派与存储成本不同。" cases={calls} tone="cyan" />; }
export function RswClosureCaptureLab() { return <RustWayOfficialLab title="闭包捕获与Fn族" caption="从闭包体对环境做了什么，反推它实现哪个调用trait。" cases={captures} tone="violet" />; }
export function RswIteratorPipelineLab() { return <RustWayOfficialLab title="Iterator执行管线" caption="IntoIterator决定所有权，adapter保持惰性，consumer真正驱动计算。" cases={iteration} tone="emerald" />; }
