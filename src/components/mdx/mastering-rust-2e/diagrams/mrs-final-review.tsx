import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "静态契约", input: "目标与输入", rule: "所有权、trait bound、Result和Send或Sync把资源、能力、失败与线程边界编码进类型，先让非法组合无法通过编译。", evidence: "静态契约的边界测试与结果记录", invariant: "所有权、trait bound、Result和Send或Sync把资源、能力、失败与线程边界编码进类型，先让非法组合无法通过编译。" },
  { label: "运行期协议", input: "静态契约", rule: "超时、背压、锁顺序、事务、日志字段和优雅关闭无法只靠类型完成，必须用状态机、测试和运行证据验证。", evidence: "运行期协议的边界测试与结果记录", invariant: "超时、背压、锁顺序、事务、日志字段和优雅关闭无法只靠类型完成，必须用状态机、测试和运行证据验证。" },
  { label: "边界最小化", input: "运行期协议", rule: "宏、unsafe、FFI、Web请求、数据库和宿主集成都应缩小不可信边界，在安全核心前完成解析与验证。", evidence: "边界最小化的边界测试与结果记录", invariant: "宏、unsafe、FFI、Web请求、数据库和宿主集成都应缩小不可信边界，在安全核心前完成解析与验证。" },
  { label: "可复现工程", input: "边界最小化", rule: "Cargo清单、锁定策略、测试、文档、基准、调试符号和最小复现共同让同一结论能在干净环境重复。", evidence: "可复现工程的边界测试与结果记录", invariant: "Cargo清单、锁定策略、测试、文档、基准、调试符号和最小复现共同让同一结论能在干净环境重复。" },
  { label: "迁移原则", input: "可复现工程", rule: "原书基于Rust 2018时代生态，复习时保留项目模型和安全不变量，具体crate API按当前维护版本与官方迁移文档更新。", evidence: "迁移原则的边界测试与结果记录", invariant: "原书基于Rust 2018时代生态，复习时保留项目模型和安全不变量，具体crate API按当前维护版本与官方迁移文档更新。" },
];

export function MrsFinalReviewModelLab() {
  return <MasteringRustOfficialLab title="全书总复习：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsFinalReviewBoundaryLab() {
  return <MasteringRustOfficialLab title="全书总复习：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsFinalReviewEvidenceLab() {
  return <MasteringRustOfficialLab title="全书总复习：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
