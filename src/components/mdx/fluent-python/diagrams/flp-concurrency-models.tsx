import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "Python并发模型", input: "输入1：Python并发模型", mechanism: "Python并发模型要先区分并发与并行、I/O密集与CPU密集", evidence: "检查返回、状态与失败路径 1", invariant: "进程、线程与GIL的关系不能简化为线程无用。" },
  { label: "进程、线程与GIL", input: "输入2：进程、线程与GIL", mechanism: "进程、线程与GIL的关系不能简化为线程无用", evidence: "检查返回、状态与失败路径 2", invariant: "线程、进程与协程Spinner用同一动画任务比较启动、通信和停止。" },
  { label: "线程、进程与协程Sp", input: "输入3：线程、进程与协程Spinner", mechanism: "线程、进程与协程Spinner用同一动画任务比较启动、通信和停止", evidence: "检查返回、状态与失败路径 3", invariant: "进程池与多核素数检查把独立CPU任务分发到worker，序列化参数和结果。" },
  { label: "进程池与多核素数检查", input: "输入4：进程池与多核素数检查", mechanism: "进程池与多核素数检查把独立CPU任务分发到worker，序列化参数和结果", evidence: "检查返回、状态与失败路径 4", invariant: "Python并发与可扩展性涉及排队、背压、故障隔离和可观察性，不只是吞吐。" },
];

export function FlpConcurrencyModelsModelLab() {
  return <FluentPythonOfficialLab title="Python并发模型：模型" caption="第19章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpConcurrencyModelsBoundaryLab() {
  return <FluentPythonOfficialLab title="Python并发模型：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpConcurrencyModelsEvidenceLab() {
  return <FluentPythonOfficialLab title="Python并发模型：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
