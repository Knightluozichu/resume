import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "调试方法", input: "目标与输入", rule: "调试从可复现事实开始：固定输入、版本和环境，缩小最小失败，再提出可证伪假设", evidence: "调试方法的边界测试与结果记录", invariant: "调试从可复现事实开始：固定输入、版本和环境，缩小最小失败，再提出可证伪假设；随机加日志或同时改多处会破坏因果链。" },
  { label: "编译期与运行期", input: "调试方法", rule: "类型、所有权和生命周期错误先由编译器定位，panic、死锁和外部故障需要运行期证据", evidence: "编译期与运行期的边界测试与结果记录", invariant: "类型、所有权和生命周期错误先由编译器定位，panic、死锁和外部故障需要运行期证据；不要用unsafe绕开一个尚未理解的编译错误。" },
  { label: "符号与回溯", input: "编译期与运行期", rule: "调试构建、符号、源码映射和回溯把地址还原成调用链", evidence: "符号与回溯的边界测试与结果记录", invariant: "调试构建、符号、源码映射和回溯把地址还原成调用链；优化可能内联或重排代码，复现性能问题时要保留与生产相近的制品。" },
  { label: "RR 记录重放", input: "符号与回溯", rule: "原书介绍RR通过记录一次执行后确定性重放，适合追踪难复现的并发和内存问题", evidence: "RR 记录重放的边界测试与结果记录", invariant: "原书介绍RR通过记录一次执行后确定性重放，适合追踪难复现的并发和内存问题；平台支持与系统权限需在使用前验证。" },
  { label: "证据闭环", input: "RR 记录重放", rule: "最小复现、失败测试、时间线、根因修改和回归测试共同构成闭环", evidence: "证据闭环的边界测试与结果记录", invariant: "最小复现、失败测试、时间线、根因修改和回归测试共同构成闭环；修复完成后移除临时探针并确认没有掩盖其他失败。" },
];

export function MrsDebuggingModelLab() {
  return <MasteringRustOfficialLab title="调试：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsDebuggingBoundaryLab() {
  return <MasteringRustOfficialLab title="调试：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsDebuggingEvidenceLab() {
  return <MasteringRustOfficialLab title="调试：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
