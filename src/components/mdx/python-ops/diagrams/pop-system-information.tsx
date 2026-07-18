import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "系统基础信息模块", target: "目标1：系统基础信息模块", action: "系统基础信息模块把主机状态转换为结构化数据", evidence: "状态、耗时、错误与审计记录 1", invariant: "psutil系统性能与进程管理覆盖CPU、内存、磁盘、网络和进程。" },
  { label: "psutil系统性", target: "目标2：psutil系统性能与进程管理", action: "psutil系统性能与进程管理覆盖CPU、内存、磁盘、网络和进程", evidence: "状态、耗时、错误与审计记录 2", invariant: "IPy地址与网段处理用于计算网络、广播、前缀和包含关系。" },
  { label: "IPy地址与网段处", target: "目标3：IPy地址与网段处理", action: "IPy地址与网段处理用于计算网络、广播、前缀和包含关系", evidence: "状态、耗时、错误与审计记录 3", invariant: "dnspython域名解析返回A、AAAA、MX、CNAME等记录及TTL。" },
  { label: "dnspython", target: "目标4：dnspython域名解析", action: "dnspython域名解析返回A、AAAA、MX、CNAME等记录及TTL", evidence: "状态、耗时、错误与审计记录 4", invariant: "DNS域名轮循业务监控要同时验证每个答案是否出现、是否可连接以及服务内容是否正确。" },
];
export function PopSystemInformationModelLab(){return <PythonOpsOfficialLab title="系统基础信息模块详解：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopSystemInformationBoundaryLab(){return <PythonOpsOfficialLab title="系统基础信息模块详解：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopSystemInformationEvidenceLab(){return <PythonOpsOfficialLab title="系统基础信息模块详解：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
