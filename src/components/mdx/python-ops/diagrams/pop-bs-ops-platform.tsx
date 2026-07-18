import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "B/S自动化运维平", target: "目标1：B/S自动化运维平台", action: "B/S自动化运维平台把资产、任务、执行器和浏览器界面连成闭环", evidence: "状态、耗时、错误与审计记录 1", invariant: "平台功能与系统架构包含身份认证、资产选择、任务定义、队列、执行节点、状态流和审计。" },
  { label: "平台功能与系统架构", target: "目标2：平台功能与系统架构", action: "平台功能与系统架构包含身份认证、资产选择、任务定义、队列、执行节点、状态流和审计", evidence: "状态、耗时、错误与审计记录 2", invariant: "数据库字典与模型至少区分User、Host、Job、Execution和Artifact。" },
  { label: "数据库字典与模型", target: "目标3：数据库字典与模型", action: "数据库字典与模型至少区分User、Host、Job、Execution和Artifact", evidence: "状态、耗时、错误与审计记录 3", invariant: "系统环境部署把Django、数据库、队列、静态资源和worker分别配置。" },
  { label: "系统环境部署", target: "目标4：系统环境部署", action: "系统环境部署把Django、数据库、队列、静态资源和worker分别配置", evidence: "状态、耗时、错误与审计记录 4", invariant: "前端加载、数据传输与功能扩展使用分页资产、结构化任务schema和增量状态。" },
];
export function PopBsOpsPlatformModelLab(){return <PythonOpsOfficialLab title="从零开始打造B/S自动化运维平台：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopBsOpsPlatformBoundaryLab(){return <PythonOpsOfficialLab title="从零开始打造B/S自动化运维平台：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopBsOpsPlatformEvidenceLab(){return <PythonOpsOfficialLab title="从零开始打造B/S自动化运维平台：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
