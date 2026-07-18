import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "程序执行模型", input: "目标与输入", rule: "进程、线程、事件循环和actor对隔离、调度与通信做出不同取舍", evidence: "程序执行模型的边界测试与结果记录", invariant: "进程、线程、事件循环和actor对隔离、调度与通信做出不同取舍；先识别任务是CPU密集还是等待密集，再选择模型。" },
  { label: "线程与消息传递", input: "程序执行模型", rule: "线程共享地址空间，channel把所有权随消息转移", evidence: "线程与消息传递的边界测试与结果记录", invariant: "线程共享地址空间，channel把所有权随消息转移；消息协议仍要定义关闭、超时、背压和失败确认。" },
  { label: "共享状态", input: "线程与消息传递", rule: "Arc表达跨线程共享所有权，Mutex或RwLock保护可变状态", evidence: "共享状态的边界测试与结果记录", invariant: "Arc表达跨线程共享所有权，Mutex或RwLock保护可变状态；锁的范围、顺序和中毒处理是运行时协议，类型系统不会替你设计业务不变量。" },
  { label: "Send 与 Sync", input: "共享状态", rule: "Send表示值可跨线程转移，Sync表示共享引用可跨线程访问", evidence: "Send 与 Sync的边界测试与结果记录", invariant: "Send表示值可跨线程转移，Sync表示共享引用可跨线程访问；它们把大量线程安全约束编码进类型，但unsafe实现必须由作者证明。" },
  { label: "Actor 与并发生态", input: "Send 与 Sync", rule: "actor用邮箱隔离状态并按消息驱动，减少共享内存但引入队列、监督和消息时序问题", evidence: "Actor 与并发生态的边界测试与结果记录", invariant: "actor用邮箱隔离状态并按消息驱动，减少共享内存但引入队列、监督和消息时序问题；选择库前先验证取消、背压与关闭语义。" },
];

export function MrsConcurrencyModelLab() {
  return <MasteringRustOfficialLab title="并发：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsConcurrencyBoundaryLab() {
  return <MasteringRustOfficialLab title="并发：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsConcurrencyEvidenceLab() {
  return <MasteringRustOfficialLab title="并发：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
