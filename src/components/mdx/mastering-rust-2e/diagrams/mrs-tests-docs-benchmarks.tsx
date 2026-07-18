import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "测试动机", input: "目标与输入", rule: "测试不是证明程序绝对正确，而是把需求、边界与回归风险编码成可重复证据", evidence: "测试动机的边界测试与结果记录", invariant: "测试不是证明程序绝对正确，而是把需求、边界与回归风险编码成可重复证据；优先验证公共行为和不变量，不锁死无关实现细节。" },
  { label: "单元测试与集成测试", input: "测试动机", rule: "单元测试贴近私有实现并快速定位，集成测试从crate外部验证公共契约", evidence: "单元测试与集成测试的边界测试与结果记录", invariant: "单元测试贴近私有实现并快速定位，集成测试从crate外部验证公共契约；二者覆盖不同边界，不能用大量单元测试代替真实调用路径。" },
  { label: "文档测试", input: "单元测试与集成测试", rule: "Rust文档中的可运行代码同时承担说明和回归测试", evidence: "文档测试的边界测试与结果记录", invariant: "Rust文档中的可运行代码同时承担说明和回归测试；示例应最小、完整、可复制，并明确错误路径而不只展示成功输出。" },
  { label: "基准测量", input: "文档测试", rule: "基准必须区分预热、采样、方差和环境噪声，比较前固定输入与编译配置", evidence: "基准测量的边界测试与结果记录", invariant: "基准必须区分预热、采样、方差和环境噪声，比较前固定输入与编译配置；单次计时和debug构建不能支持性能结论。" },
  { label: "逻辑门模拟器与持续集成", input: "基准测量", rule: "原书用逻辑门crate串联测试、文档、基准和Travis CI", evidence: "逻辑门模拟器与持续集成的边界测试与结果记录", invariant: "原书用逻辑门crate串联测试、文档、基准和Travis CI；现代流水线实现可以变化，但干净环境、固定工具链、失败阻断与制品证据必须保留。" },
];

export function MrsTestsDocsBenchmarksModelLab() {
  return <MasteringRustOfficialLab title="测试、文档与基准：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsTestsDocsBenchmarksBoundaryLab() {
  return <MasteringRustOfficialLab title="测试、文档与基准：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsTestsDocsBenchmarksEvidenceLab() {
  return <MasteringRustOfficialLab title="测试、文档与基准：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
