import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "Ch1-2", input: "HTTP消息与论坛需求", boundary: "Web模型与ChitChat全景", output: "可运行应用骨架", invariant: "先看端到端，再拆解局部机制。" },
  { label: "Ch3-5", input: "请求、表单与展示", boundary: "handler、ResponseWriter与template", output: "安全HTML响应", invariant: "接收、处理和展示边界不混写。" },
  { label: "Ch6-8", input: "持久化与服务契约", boundary: "storage、codec与test double", output: "可验证Web服务", invariant: "外部依赖都能被替换和注入故障。" },
  { label: "Ch9-10", input: "并发负载与发布目标", boundary: "goroutine、channel与部署平台", output: "可收敛发布证据", invariant: "性能和部署结论来自同一构建。" },
];
export function GwpOfficialRouteLab(){return <GoWebOfficialLab title="官方十章路线" caption="按原书从HTTP模型走到部署，而不是按框架功能拼主题。" cases={cases}/>;}
export function GwpLayerMapLab(){return <GoWebOfficialLab title="请求生命周期" caption="每个阶段都标出输入、边界与可观察输出。" cases={cases} tone="amber" initial={1}/>;}
export function GwpEvidenceLab(){return <GoWebOfficialLab title="全书验收门禁" caption="测试、并发、I/O与部署证据逐层收敛。" cases={cases} tone="emerald" initial={2}/>;}
