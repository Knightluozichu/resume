import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "paramiko批", target: "目标1：paramiko批量运维", action: "paramiko批量运维直接实现SSH协议，适合命令与文件传输", evidence: "状态、耗时、错误与审计记录 1", invariant: "SSHClient与SFTPClient分别管理命令会话和文件操作，底层共享Transport。" },
  { label: "SSHClient", target: "目标2：SSHClient与SFTPClient", action: "SSHClient与SFTPClient分别管理命令会话和文件操作，底层共享Transport", evidence: "状态、耗时、错误与审计记录 2", invariant: "密钥认证与主机指纹是信任边界。" },
  { label: "密钥认证与主机指纹", target: "目标3：密钥认证与主机指纹", action: "密钥认证与主机指纹是信任边界", evidence: "状态、耗时、错误与审计记录 3", invariant: "堡垒机远程命令通过direct-tcpip channel把第二段SSH隧道建立在第一段Transport上。" },
  { label: "堡垒机远程命令", target: "目标4：堡垒机远程命令", action: "堡垒机远程命令通过direct-tcpip channel把第二段SSH隧道建立在第一段Transport上", evidence: "状态、耗时、错误与审计记录 4", invariant: "堡垒机远程文件上传先传到临时名，校验大小与摘要后再远端原子替换。" },
];
export function PopSshParamikoModelLab(){return <PythonOpsOfficialLab title="系统批量运维管理器paramiko详解：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopSshParamikoBoundaryLab(){return <PythonOpsOfficialLab title="系统批量运维管理器paramiko详解：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopSshParamikoEvidenceLab(){return <PythonOpsOfficialLab title="系统批量运维管理器paramiko详解：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
