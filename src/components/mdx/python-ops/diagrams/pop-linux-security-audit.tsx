import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "Linux系统安全", target: "目标1：Linux系统安全审计", action: "Linux系统安全审计收集登录、账号、进程、端口和配置变化，目标是不可抵赖的时间线而不是监控所有内容", evidence: "状态、耗时、错误与审计记录 1", invariant: "审计平台架构由主机agent、认证上报、队列、规范化服务、不可变存储和查询组成。" },
  { label: "审计平台架构", target: "目标2：审计平台架构", action: "审计平台架构由主机agent、认证上报、队列、规范化服务、不可变存储和查询组成", evidence: "状态、耗时、错误与审计记录 2", invariant: "审计数据库结构分Event、Host、Principal和Evidence。" },
  { label: "审计数据库结构", target: "目标3：审计数据库结构", action: "审计数据库结构分Event、Host、Principal和Evidence", evidence: "状态、耗时、错误与审计记录 3", invariant: "主机上报配置包括服务端证书、客户端身份、批大小、超时和采集器开关。" },
  { label: "主机上报配置", target: "目标4：主机上报配置", action: "主机上报配置包括服务端证书、客户端身份、批大小、超时和采集器开关", evidence: "状态、耗时、错误与审计记录 4", invariant: "Django服务端审计功能先验证mTLS或签名、大小和schema，再在事务内写入事件并返回已接受游标。" },
];
export function PopLinuxSecurityAuditModelLab(){return <PythonOpsOfficialLab title="打造Linux系统安全审计功能：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopLinuxSecurityAuditBoundaryLab(){return <PythonOpsOfficialLab title="打造Linux系统安全审计功能：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopLinuxSecurityAuditEvidenceLab(){return <PythonOpsOfficialLab title="打造Linux系统安全审计功能：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
