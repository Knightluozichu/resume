import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "业务服务监控", target: "目标1：业务服务监控", action: "业务服务监控必须从可观察信号回到用户体验：配置是否漂移、目录是否完整、通知是否送达、HTTP是否在预算内返回正确内容", evidence: "状态、耗时、错误与审计记录 1", invariant: "difflib文件内容差异适合生成统一diff和HTML报告。" },
  { label: "difflib文件", target: "目标2：difflib文件内容差异", action: "difflib文件内容差异适合生成统一diff和HTML报告", evidence: "状态、耗时、错误与审计记录 2", invariant: "filecmp文件与目录差异可快速找出只存在一侧、不同和异常文件。" },
  { label: "filecmp文件", target: "目标3：filecmp文件与目录差异", action: "filecmp文件与目录差异可快速找出只存在一侧、不同和异常文件", evidence: "状态、耗时、错误与审计记录 3", invariant: "smtplib邮件通知由消息构造、TLS、认证、收件人和发送结果组成。" },
  { label: "smtplib邮件", target: "目标4：smtplib邮件通知", action: "smtplib邮件通知由消息构造、TLS、认证、收件人和发送结果组成", evidence: "状态、耗时、错误与审计记录 4", invariant: "Web服务质量探测同时检查DNS、连接、TLS、状态码、时延和业务断言。" },
];
export function PopServiceMonitoringModelLab(){return <PythonOpsOfficialLab title="业务服务监控详解：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopServiceMonitoringBoundaryLab(){return <PythonOpsOfficialLab title="业务服务监控详解：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopServiceMonitoringEvidenceLab(){return <PythonOpsOfficialLab title="业务服务监控详解：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
