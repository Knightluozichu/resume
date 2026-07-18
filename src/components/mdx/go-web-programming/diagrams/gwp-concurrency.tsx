import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "Overlap", input: "多个独立Web任务", boundary: "goroutine调度", output: "重叠推进", invariant: "并发不承诺同一时刻并行。" },
  { label: "Channel", input: "任务或结果值", boundary: "发送、接收与关闭", output: "同步通信", invariant: "关闭者和退出条件唯一明确。" },
  { label: "Fan-out", input: "可并行子任务", boundary: "有限goroutine集合", output: "结果汇聚", invariant: "并发上限与下游容量一致。" },
  { label: "Cancel", input: "请求取消或超时", boundary: "请求生命周期信号", output: "所有子任务停止", invariant: "响应返回前不遗留后台工作。" },
];
export function GwpConcurrencyModelLab(){return <GoWebOfficialLab title="并发与并行" caption="Web任务先被结构化为独立工作，再由运行时调度。" cases={cases}/>;}
export function GwpChannelFlowLab(){return <GoWebOfficialLab title="Channel所有权" caption="通信协议必须覆盖发送、关闭、取消和等待。" cases={cases} tone="amber" initial={1}/>;}
export function GwpLatencyLab(){return <GoWebOfficialLab title="Web并发延迟" caption="有限并发只在独立慢任务上缩短关键路径。" cases={cases} tone="emerald" initial={2}/>;}
