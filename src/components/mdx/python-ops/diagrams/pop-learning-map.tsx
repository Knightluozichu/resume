import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "三篇十六章地图", target: "三篇十六章地图按作者源码目录还原：基础篇4章、高级篇8章、案例篇4章，每章都用当前Python重做可复现实验。", action: "阶段1：建立控制与证据", evidence: "完成实现、失败注入与恢复 1", invariant: "基础信息与服务监控主线从psutil、IP、DNS走到差异、邮件、Web探测、报表与系统安全，建立单机证据。" },
  { label: "基础信息与服务监控", target: "基础信息与服务监控主线从psutil、IP、DNS走到差异、邮件、Web探测、报表与系统安全，建立单机证据。", action: "阶段2：建立控制与证据", evidence: "完成实现、失败注入与恢复 2", invariant: "批量运维与集中管理主线比较pexpect、Paramiko、Fabric、Ansible、SaltStack和Func的控制面、目标选择与失败聚合。" },
  { label: "批量运维与集中管理", target: "批量运维与集中管理主线比较pexpect、Paramiko、Fabric、Ansible、SaltStack和Func的控制面、目标选择与失败聚合。", action: "阶段3：建立控制与证据", evidence: "完成实现、失败注入与恢复 3", invariant: "大数据应用主线用Hadoop与MapReduce处理Web日志，连接采集、聚合、报表和容量边界。" },
  { label: "大数据应用", target: "大数据应用主线用Hadoop与MapReduce处理Web日志，连接采集、聚合、报表和容量边界。", action: "阶段4：建立控制与证据", evidence: "完成实现、失败注入与恢复 4", invariant: "B/S与C/S平台案例把数据库、Django、执行器、审计、分布式采集和桌面客户端组织成完整运维产品。" },
];
export function PopLearningMapModelLab(){return <PythonOpsOfficialLab title="《Python自动化运维：技术与最佳实践》全书导览：结构" caption="沿原书三篇定位能力。" cases={cases} tone="cyan" />;}
export function PopLearningMapBoundaryLab(){return <PythonOpsOfficialLab title="《Python自动化运维：技术与最佳实践》全书导览：边界" caption="比较执行、失败和恢复。" cases={cases} tone="amber" initial={1} />;}
export function PopLearningMapEvidenceLab(){return <PythonOpsOfficialLab title="《Python自动化运维：技术与最佳实践》全书导览：证据" caption="以审计记录验收闭环。" cases={cases} tone="emerald" initial={2} />;}
