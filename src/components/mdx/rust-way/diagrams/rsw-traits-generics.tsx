import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const polymorphism: RustWayCase[] = [
  { label: "参数多态", input: "fn f<T: Trait>(x: T)", mechanism: "单态化", result: "具体类型专用代码", invariant: "每个实例满足同一Trait约束。" },
  { label: "特设多态", input: "同名trait method", mechanism: "impl选择", result: "按类型解析行为", invariant: "实现不能违反trait公开语义。" },
  { label: "子类型式", input: "&dyn Trait", mechanism: "fat pointer与vtable", result: "运行时动态分派", invariant: "对象安全规则决定能否形成trait object。" },
];
const bounds: RustWayCase[] = [
  { label: "普通约束", input: "T: Read + Send", mechanism: "静态能力证明", result: "可调用受限方法", invariant: "调用点不依赖未声明能力。" },
  { label: "关联类型", input: "Iterator<Item = T>", mechanism: "实现为trait选择唯一Item", result: "减少类型参数歧义", invariant: "同一impl中的关联类型一致。" },
  { label: "标记Trait", input: "Send与Sync", mechanism: "无方法的类型属性", result: "并发API可用性", invariant: "unsafe impl必须独立证明所有字段和别名规则。" },
];
const conversions: RustWayCase[] = [
  { label: "From/Into", input: "源值", mechanism: "消费式语义转换", result: "目标值", invariant: "转换应可靠且含义明确；可能失败时用TryFrom。" },
  { label: "Deref", input: "智能指针引用", mechanism: "受控deref coercion", result: "目标引用", invariant: "不要用Deref伪装任意业务转换。" },
  { label: "as", input: "数值或指针", mechanism: "显式底层转换", result: "可能截断的新表示", invariant: "边界和信息损失必须由调用者检查。" },
];
export function RswPolymorphismLab() { return <RustWayOfficialLab title="三类多态" caption="静态分派、实现选择与动态分派的成本和约束不同。" cases={polymorphism} tone="violet" />; }
export function RswTraitBoundLab() { return <RustWayOfficialLab title="Trait深层契约" caption="Trait bound、关联类型和标记Trait把能力变成编译期证据。" cases={bounds} tone="emerald" />; }
export function RswConversionLab() { return <RustWayOfficialLab title="类型转换边界" caption="优先用表达语义的转换trait，把可能失败和可能截断写出来。" cases={conversions} tone="amber" />; }
