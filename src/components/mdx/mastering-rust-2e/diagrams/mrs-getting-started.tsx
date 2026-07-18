import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "Rust 的定位与价值", input: "目标与输入", rule: "Rust把内存安全、并发安全和接近底层的性能放在同一套静态规则中", evidence: "Rust 的定位与价值的边界测试与结果记录", invariant: "Rust把内存安全、并发安全和接近底层的性能放在同一套静态规则中；价值不在语法新颖，而在让资源生命周期与可变性成为可检查契约。" },
  { label: "编译器与工具链安装", input: "Rust 的定位与价值", rule: "rustup负责安装和切换工具链，rustc负责编译，cargo负责编排项目", evidence: "编译器与工具链安装的边界测试与结果记录", invariant: "rustup负责安装和切换工具链，rustc负责编译，cargo负责编排项目；验收安装不能只看版本号，还要编译、运行并删除一个最小程序。" },
  { label: "语言全景", input: "编译器与工具链安装", rule: "变量默认不可变，match要求穷尽，Result显式承载失败，所有权决定值何时移动或借用", evidence: "语言全景的边界测试与结果记录", invariant: "变量默认不可变，match要求穷尽，Result显式承载失败，所有权决定值何时移动或借用；这些规则共同把运行期隐患提前到编译期。" },
  { label: "单词计数器", input: "语言全景", rule: "原书用修复单词计数器串起输入、字符串处理、映射聚合与错误反馈", evidence: "单词计数器的边界测试与结果记录", invariant: "原书用修复单词计数器串起输入、字符串处理、映射聚合与错误反馈；正确性边界包括Unicode分词、大小写规则、空输入和稳定输出。" },
  { label: "编译器反馈闭环", input: "单词计数器", rule: "Rust学习的关键闭环是先预测所有权和类型，再编译读取诊断，最后做最小修改并用测试证明语义，而不是逐条压制错误信息。", evidence: "编译器反馈闭环的边界测试与结果记录", invariant: "Rust学习的关键闭环是先预测所有权和类型，再编译读取诊断，最后做最小修改并用测试证明语义，而不是逐条压制错误信息。" },
];

export function MrsGettingStartedModelLab() {
  return <MasteringRustOfficialLab title="开始使用 Rust：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsGettingStartedBoundaryLab() {
  return <MasteringRustOfficialLab title="开始使用 Rust：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsGettingStartedEvidenceLab() {
  return <MasteringRustOfficialLab title="开始使用 Rust：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
