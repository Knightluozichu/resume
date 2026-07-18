import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "Python与系统", target: "目标1：Python与系统安全", action: "Python与系统安全首先是权限与证据工程", evidence: "状态、耗时、错误与审计记录 1", invariant: "集中式病毒扫描让客户端把文件流或路径送给ClamAV服务，结果要区分干净、命中、引擎失败和超时。" },
  { label: "集中式病毒扫描", target: "目标2：集中式病毒扫描", action: "集中式病毒扫描让客户端把文件流或路径送给ClamAV服务，结果要区分干净、命中、引擎失败和超时", evidence: "状态、耗时、错误与审计记录 2", invariant: "pyClamd与ClamAV通过Unix socket或TCP连接clamd。" },
  { label: "pyClamd与C", target: "目标3：pyClamd与ClamAV", action: "pyClamd与ClamAV通过Unix socket或TCP连接clamd", evidence: "状态、耗时、错误与审计记录 3", invariant: "高效端口扫描器可用有界线程或异步连接并发探测，但并发、超时和目标范围必须受预算控制。" },
  { label: "高效端口扫描器", target: "目标4：高效端口扫描器", action: "高效端口扫描器可用有界线程或异步连接并发探测，但并发、超时和目标范围必须受预算控制", evidence: "状态、耗时、错误与审计记录 4", invariant: "安全扫描授权与边界包括书面许可、允许网段、端口、速率、时间窗和数据留存。" },
];
export function PopSystemSecurityModelLab(){return <PythonOpsOfficialLab title="Python与系统安全：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopSystemSecurityBoundaryLab(){return <PythonOpsOfficialLab title="Python与系统安全：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopSystemSecurityEvidenceLab(){return <PythonOpsOfficialLab title="Python与系统安全：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
