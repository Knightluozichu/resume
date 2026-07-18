import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "分布式质量监控平台", target: "目标1：分布式质量监控平台", action: "分布式质量监控平台把各地区探针、调度、时间序列存储和报表组合起来", evidence: "状态、耗时、错误与审计记录 1", invariant: "监控平台架构包含任务定义、采集器租约、结果上报、聚合、告警和查询。" },
  { label: "监控平台架构", target: "目标2：监控平台架构", action: "监控平台架构包含任务定义、采集器租约、结果上报、聚合、告警和查询", evidence: "状态、耗时、错误与审计记录 2", invariant: "监控数据库模型区分Target、Probe、Check、Sample和Incident。" },
  { label: "监控数据库模型", target: "目标3：监控数据库模型", action: "监控数据库模型区分Target、Probe、Check、Sample和Incident", evidence: "状态、耗时、错误与审计记录 3", invariant: "数据采集角色与rrdtool作业把探针结果按固定step更新并生成归档。" },
  { label: "数据采集角色与rr", target: "目标4：数据采集角色与rrdtool作业", action: "数据采集角色与rrdtool作业把探针结果按固定step更新并生成归档", evidence: "状态、耗时、错误与审计记录 4", invariant: "Django业务报表按服务、地区和窗口展示可用率、分位延迟和错误分布。" },
];
export function PopDistributedQualityMonitoringModelLab(){return <PythonOpsOfficialLab title="构建分布式质量监控平台：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopDistributedQualityMonitoringBoundaryLab(){return <PythonOpsOfficialLab title="构建分布式质量监控平台：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopDistributedQualityMonitoringEvidenceLab(){return <PythonOpsOfficialLab title="构建分布式质量监控平台：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
