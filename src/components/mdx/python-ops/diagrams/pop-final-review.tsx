import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "采集到行动闭环", target: "采集到行动闭环要求指标、差异、报表、告警和执行共享目标与事件ID，任何结论都能下钻到原始证据。", action: "阶段1：建立控制与证据", evidence: "完成实现、失败注入与恢复 1", invariant: "批量执行安全由授权目标、主机指纹、有界并发、逐主机结果和可回滚发布共同保证，批量不等于同时无条件执行。" },
  { label: "批量执行安全", target: "批量执行安全由授权目标、主机指纹、有界并发、逐主机结果和可回滚发布共同保证，批量不等于同时无条件执行。", action: "阶段2：建立控制与证据", evidence: "完成实现、失败注入与恢复 2", invariant: "声明式配置收敛用Ansible或Salt把期望状态、差异和handler写成可重复计划，临时命令则保留审批和审计。" },
  { label: "声明式配置收敛", target: "声明式配置收敛用Ansible或Salt把期望状态、差异和handler写成可重复计划，临时命令则保留审批和审计。", action: "阶段3：建立控制与证据", evidence: "完成实现、失败注入与恢复 3", invariant: "分布式监控证据要区分采集位置、发生时间、接收时间、未知值和部分失败，再按一致算法计算可用率与分位数。" },
  { label: "分布式监控证据", target: "分布式监控证据要区分采集位置、发生时间、接收时间、未知值和部分失败，再按一致算法计算可用率与分位数。", action: "阶段4：建立控制与证据", evidence: "完成实现、失败注入与恢复 4", invariant: "平台权限与审计贯穿B/S、Linux审计、质量监控和C/S案例，Web或桌面客户端都不能绕过服务端身份与任务模型。" },
];
export function PopFinalReviewModelLab(){return <PythonOpsOfficialLab title="《Python自动化运维：技术与最佳实践》总复习：结构" caption="沿原书三篇定位能力。" cases={cases} tone="cyan" />;}
export function PopFinalReviewBoundaryLab(){return <PythonOpsOfficialLab title="《Python自动化运维：技术与最佳实践》总复习：边界" caption="比较执行、失败和恢复。" cases={cases} tone="amber" initial={1} />;}
export function PopFinalReviewEvidenceLab(){return <PythonOpsOfficialLab title="《Python自动化运维：技术与最佳实践》总复习：证据" caption="以审计记录验收闭环。" cases={cases} tone="emerald" initial={2} />;}
