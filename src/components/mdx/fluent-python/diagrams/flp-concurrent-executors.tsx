import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "并发执行器", input: "输入1：并发执行器", mechanism: "并发执行器把任务提交、worker池和结果收集统一到Executor接口", evidence: "检查返回、状态与失败路径 1", invariant: "并发Web下载适合线程池，因为任务主要等待网络。" },
  { label: "并发Web下载", input: "输入2：并发Web下载", mechanism: "并发Web下载适合线程池，因为任务主要等待网络", evidence: "检查返回、状态与失败路径 2", invariant: "Future表示尚未完成的计算，持有状态、结果或异常。" },
  { label: "Future", input: "输入3：Future", mechanism: "Future表示尚未完成的计算，持有状态、结果或异常", evidence: "检查返回、状态与失败路径 3", invariant: "线程池执行器与进程池执行器共享接口但成本不同。" },
  { label: "线程池执行器与进程池", input: "输入4：线程池执行器与进程池执行器", mechanism: "线程池执行器与进程池执行器共享接口但成本不同", evidence: "检查返回、状态与失败路径 4", invariant: "as_completed、进度与错误处理让结果按实际完成顺序消费。" },
];

export function FlpConcurrentExecutorsModelLab() {
  return <FluentPythonOfficialLab title="并发执行器：模型" caption="第20章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpConcurrentExecutorsBoundaryLab() {
  return <FluentPythonOfficialLab title="并发执行器：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpConcurrentExecutorsEvidenceLab() {
  return <FluentPythonOfficialLab title="并发执行器：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
