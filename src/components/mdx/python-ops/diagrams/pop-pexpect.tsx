import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "pexpect批量", target: "目标1：pexpect批量运维", action: "pexpect批量运维适合只能通过交互终端驱动的遗留程序", evidence: "状态、耗时、错误与审计记录 1", invariant: "spawn、run与pxssh覆盖长会话、一次命令和SSH封装。" },
  { label: "spawn、run", target: "目标2：spawn、run与pxssh", action: "spawn、run与pxssh覆盖长会话、一次命令和SSH封装", evidence: "状态、耗时、错误与审计记录 2", invariant: "expect交互状态机一次匹配多个候选提示并根据返回索引转移。" },
  { label: "expect交互状", target: "目标3：expect交互状态机", action: "expect交互状态机一次匹配多个候选提示并根据返回索引转移", evidence: "状态、耗时、错误与审计记录 3", invariant: "自动化FTP操作在原书中展示用户名、密码和命令交互；现代生产应改用SFTP或HTTPS，凭据通过安全输入注入。" },
  { label: "自动化FTP操作", target: "目标4：自动化FTP操作", action: "自动化FTP操作在原书中展示用户名、密码和命令交互；现代生产应改用SFTP或HTTPS，凭据通过安全输入注入", evidence: "状态、耗时、错误与审计记录 4", invariant: "远程打包下载需要在远端检查命令退出、归档大小和摘要，再下载到临时文件并原子改名。" },
];
export function PopPexpectModelLab(){return <PythonOpsOfficialLab title="系统批量运维管理器pexpect详解：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopPexpectBoundaryLab(){return <PythonOpsOfficialLab title="系统批量运维管理器pexpect详解：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopPexpectEvidenceLab(){return <PythonOpsOfficialLab title="系统批量运维管理器pexpect详解：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
