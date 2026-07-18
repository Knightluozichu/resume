import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "日志目的", input: "目标与输入", rule: "日志记录系统在何时、以什么上下文做了什么决定，用于诊断与审计", evidence: "日志目的的边界测试与结果记录", invariant: "日志记录系统在何时、以什么上下文做了什么决定，用于诊断与审计；它不是任意字符串堆积，也不能替代指标和分布式追踪。" },
  { label: "日志框架需求", input: "日志目的", rule: "框架需要级别过滤、目标分类、格式化、输出后端和并发安全", evidence: "日志框架需求的边界测试与结果记录", invariant: "框架需要级别过滤、目标分类、格式化、输出后端和并发安全；库只发事件，最终应用负责初始化全局订阅者与策略。" },
  { label: "结构化事件", input: "日志框架需求", rule: "稳定字段比拼接文本更容易查询，至少包含事件名、请求或任务标识、结果与耗时", evidence: "结构化事件的边界测试与结果记录", invariant: "稳定字段比拼接文本更容易查询，至少包含事件名、请求或任务标识、结果与耗时；秘密、令牌和个人数据必须在产生前移除。" },
  { label: "级别与采样", input: "结构化事件", rule: "error、warn、info和debug表达不同操作意义，不能按个人情绪选择", evidence: "级别与采样的边界测试与结果记录", invariant: "error、warn、info和debug表达不同操作意义，不能按个人情绪选择；高频路径用采样或聚合控制成本，同时保留异常全量证据。" },
  { label: "Rust 日志门面", input: "级别与采样", rule: "原书讲解Rust日志生态与门面思想，具体crate和初始化API会演进", evidence: "Rust 日志门面的边界测试与结果记录", invariant: "原书讲解Rust日志生态与门面思想，具体crate和初始化API会演进；迁移时保留库与应用解耦、字段契约和可测试输出。" },
];

export function MrsLoggingModelLab() {
  return <MasteringRustOfficialLab title="日志：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsLoggingBoundaryLab() {
  return <MasteringRustOfficialLab title="日志：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsLoggingEvidenceLab() {
  return <MasteringRustOfficialLab title="日志：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
