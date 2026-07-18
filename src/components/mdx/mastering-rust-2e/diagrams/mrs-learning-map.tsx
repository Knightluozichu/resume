import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "工程基础", input: "目标与输入", rule: "第1至3章从工具链、Cargo项目模型进入测试、文档和基准，目标是形成可复现的开发反馈环。", evidence: "工程基础的边界测试与结果记录", invariant: "第1至3章从工具链、Cargo项目模型进入测试、文档和基准，目标是形成可复现的开发反馈环。" },
  { label: "类型与安全", input: "工程基础", rule: "第4至7章把类型、泛型、trait、内存、错误与高级语言机制连成静态契约，是后续并发和FFI的前置基础。", evidence: "类型与安全的边界测试与结果记录", invariant: "第4至7章把类型、泛型、trait、内存、错误与高级语言机制连成静态契约，是后续并发和FFI的前置基础。" },
  { label: "并发与底层", input: "类型与安全", rule: "第8至10章讨论线程、消息、宏、unsafe与跨语言边界，核心是把额外能力限制在可说明、可测试的不变量内。", evidence: "并发与底层的边界测试与结果记录", invariant: "第8至10章讨论线程、消息、宏、unsafe与跨语言边界，核心是把额外能力限制在可说明、可测试的不变量内。" },
  { label: "服务端工程", input: "并发与底层", rule: "第11至14章覆盖日志、网络、Web和数据库，要求从单个API上升到超时、背压、事务与可观察的完整请求链。", evidence: "服务端工程的边界测试与结果记录", invariant: "第11至14章覆盖日志、网络、Web和数据库，要求从单个API上升到超时、背压、事务与可观察的完整请求链。" },
  { label: "跨平台与调试", input: "服务端工程", rule: "第15至17章落地WebAssembly、桌面GUI和RR调试，把构建目标、宿主边界、事件循环与证据闭环串联。", evidence: "跨平台与调试的边界测试与结果记录", invariant: "第15至17章落地WebAssembly、桌面GUI和RR调试，把构建目标、宿主边界、事件循环与证据闭环串联。" },
];

export function MrsLearningMapModelLab() {
  return <MasteringRustOfficialLab title="全书导览：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsLearningMapBoundaryLab() {
  return <MasteringRustOfficialLab title="全书导览：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsLearningMapEvidenceLab() {
  return <MasteringRustOfficialLab title="全书导览：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
