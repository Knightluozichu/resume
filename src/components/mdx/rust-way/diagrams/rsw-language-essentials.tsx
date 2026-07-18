import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const expressions: RustWayCase[] = [
  { label: "语句", input: "let x = 3;", mechanism: "执行动作并以分号结束", result: "unit值或绑定", invariant: "不要把声明误当成可直接返回业务值的表达式。" },
  { label: "块表达式", input: "{ let x = 3; x + 1 }", mechanism: "最后无分号表达式成为块值", result: "4", invariant: "尾表达式类型必须满足外层上下文。" },
  { label: "if表达式", input: "if ok { a } else { b }", mechanism: "分支类型统一", result: "一个确定类型的值", invariant: "所有可达分支必须产生兼容类型。" },
];
const patterns: RustWayCase[] = [
  { label: "枚举", input: "Option<T>", mechanism: "match穷尽Some与None", result: "无遗漏控制流", invariant: "新增variant后编译器应暴露未处理分支。" },
  { label: "解构", input: "Point { x, y }", mechanism: "pattern绑定字段", result: "局部名字与所有权动作", invariant: "区分move、ref和copy字段。" },
  { label: "守卫", input: "value与条件", mechanism: "pattern + if guard", result: "更精确分支", invariant: "guard不替代穷尽性，fallback仍需明确。" },
];
const types: RustWayCase[] = [
  { label: "值类型", input: "整数、tuple、array", mechanism: "固定布局与Copy规则", result: "栈上或内联表示", invariant: "类型和范围决定运算语义。" },
  { label: "集合", input: "Vec、String、HashMap", mechanism: "栈上handle指向堆缓冲", result: "动态容量数据", invariant: "len不大于capacity，扩容会使旧引用失效。" },
  { label: "智能指针", input: "Box、Rc、Arc", mechanism: "独占、单线程共享、跨线程共享", result: "不同owner模型", invariant: "共享所有权不等于共享可变性。" },
];
export function RswExpressionLab() { return <RustWayOfficialLab title="语句与表达式" caption="分号会改变块的值；分支必须汇合到统一类型。" cases={expressions} tone="cyan" />; }
export function RswPatternLab() { return <RustWayOfficialLab title="流程控制与模式匹配" caption="模式同时决定控制流、绑定和所有权动作。" cases={patterns} tone="amber" />; }
export function RswTypePointerLab() { return <RustWayOfficialLab title="基础、复合、集合与智能指针" caption="从表示、owner与可变性三条线比较核心类型。" cases={types} tone="emerald" />; }
