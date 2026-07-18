import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "C/S自动化运维平", target: "目标1：C/S自动化运维平台", action: "C/S自动化运维平台把桌面客户端、API服务、数据库和执行后端组合起来", evidence: "状态、耗时、错误与审计记录 1", invariant: "桌面平台架构与数据库延续User、Host、Job和Execution模型，并为客户端版本、设备会话和升级包建表。" },
  { label: "桌面平台架构与数据", target: "目标2：桌面平台架构与数据库", action: "桌面平台架构与数据库延续User、Host、Job和Execution模型，并为客户端版本、设备会话和升级包建表", evidence: "状态、耗时、错误与审计记录 2", invariant: "用户登录与系统配置使用短期访问令牌、可撤销刷新令牌和服务端权限。" },
  { label: "用户登录与系统配置", target: "目标3：用户登录与系统配置", action: "用户登录与系统配置使用短期访问令牌、可撤销刷新令牌和服务端权限", evidence: "状态、耗时、错误与审计记录 3", invariant: "服务器分类、升级与客户端要求资产标签来自受信源，升级包有签名、摘要、版本和兼容范围。" },
  { label: "服务器分类、升级与", target: "目标4：服务器分类、升级与客户端", action: "服务器分类、升级与客户端要求资产标签来自受信源，升级包有签名、摘要、版本和兼容范围", evidence: "状态、耗时、错误与审计记录 4", invariant: "执行模块与平台发布把任务参数化、审批、队列、逐主机结果和客户端签名打包串起来。" },
];
export function PopCsOpsPlatformModelLab(){return <PythonOpsOfficialLab title="构建桌面版C/S自动化运维平台：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopCsOpsPlatformBoundaryLab(){return <PythonOpsOfficialLab title="构建桌面版C/S自动化运维平台：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopCsOpsPlatformEvidenceLab(){return <PythonOpsOfficialLab title="构建桌面版C/S自动化运维平台：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
