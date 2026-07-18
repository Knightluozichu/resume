import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "轻量级WebSer", target: "目标1：轻量级WebServer", action: "轻量级WebServer章节通过Yorserver串联套接字、请求解析和功能分派", evidence: "状态、耗时、错误与审计记录 1", invariant: "Yorserver配置与架构把监听、静态文件、缓存、压缩、TLS、目录和CGI拆成模块。" },
  { label: "Yorserver", target: "目标2：Yorserver配置与架构", action: "Yorserver配置与架构把监听、静态文件、缓存、压缩、TLS、目录和CGI拆成模块", evidence: "状态、耗时、错误与审计记录 2", invariant: "HTTP缓存与压缩依据Cache-Control、ETag、If-None-Match和Accept-Encoding协商。" },
  { label: "HTTP缓存与压缩", target: "目标3：HTTP缓存与压缩", action: "HTTP缓存与压缩依据Cache-Control、ETag、If-None-Match和Accept-Encoding协商", evidence: "状态、耗时、错误与审计记录 3", invariant: "HTTP SSL与目录列表的安全边界包括现代TLS配置、证书轮换和路径规范化。" },
  { label: "HTTP SSL与", target: "目标4：HTTP SSL与目录列表", action: "HTTP SSL与目录列表的安全边界包括现代TLS配置、证书轮换和路径规范化", evidence: "状态、耗时、错误与审计记录 4", invariant: "动态CGI功能用子进程环境与标准输入输出连接脚本，风险包括命令注入、资源耗尽和权限扩大。" },
];
export function PopWebserverModelLab(){return <PythonOpsOfficialLab title="从零开发一个轻量级WebServer：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopWebserverBoundaryLab(){return <PythonOpsOfficialLab title="从零开发一个轻量级WebServer：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopWebserverEvidenceLab(){return <PythonOpsOfficialLab title="从零开发一个轻量级WebServer：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
