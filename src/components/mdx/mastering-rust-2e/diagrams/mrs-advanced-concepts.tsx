import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "字符串与全局值", input: "目标与输入", rule: "String拥有UTF-8字节而str是借用视图，索引必须尊重字符边界", evidence: "字符串与全局值的边界测试与结果记录", invariant: "String拥有UTF-8字节而str是借用视图，索引必须尊重字符边界；全局状态需要明确初始化、同步和测试隔离，不能用static mut逃避设计。" },
  { label: "迭代器与闭包", input: "字符串与全局值", rule: "迭代器把遍历与变换组合成惰性管线，闭包捕获方式由使用决定", evidence: "迭代器与闭包的边界测试与结果记录", invariant: "迭代器把遍历与变换组合成惰性管线，闭包捕获方式由使用决定；move改变捕获所有权，不等于自动满足线程安全。" },
  { label: "高级类型与 Trait", input: "迭代器与闭包", rule: "关联类型、完全限定语法、新类型和高阶生命周期约束解决复杂抽象问题", evidence: "高级类型与 Trait的边界测试与结果记录", invariant: "关联类型、完全限定语法、新类型和高阶生命周期约束解决复杂抽象问题；只有在公共契约需要时才引入，避免类型体操掩盖数据流。" },
  { label: "模式、转换与强制转换", input: "高级类型与 Trait", rule: "match guard、解构和范围模式表达控制流，as转换可能截断或改变符号", evidence: "模式、转换与强制转换的边界测试与结果记录", invariant: "match guard、解构和范围模式表达控制流，as转换可能截断或改变符号；优先使用TryFrom等可失败转换保存错误信息。" },
  { label: "Serde 序列化", input: "模式、转换与强制转换", rule: "Serde把数据模型与格式实现分离，derive减少样板", evidence: "Serde 序列化的边界测试与结果记录", invariant: "Serde把数据模型与格式实现分离，derive减少样板；反序列化仍是不可信输入边界，需要大小限制、字段策略、版本迁移和语义校验。" },
];

export function MrsAdvancedConceptsModelLab() {
  return <MasteringRustOfficialLab title="高级概念：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsAdvancedConceptsBoundaryLab() {
  return <MasteringRustOfficialLab title="高级概念：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsAdvancedConceptsEvidenceLab() {
  return <MasteringRustOfficialLab title="高级概念：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
