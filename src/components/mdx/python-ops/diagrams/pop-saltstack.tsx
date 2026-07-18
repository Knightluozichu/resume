import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "SaltStack", target: "目标1：SaltStack集中化管理", action: "SaltStack集中化管理由master、minion、事件总线和状态系统组成", evidence: "状态、耗时、错误与审计记录 1", invariant: "远程执行与模块适合即时查询和操作，命令模块不是默认选择。" },
  { label: "远程执行与模块", target: "目标2：远程执行与模块", action: "远程执行与模块适合即时查询和操作，命令模块不是默认选择", evidence: "状态、耗时、错误与审计记录 2", invariant: "grains静态事实描述操作系统、CPU和自定义标签，适合目标匹配但不存秘密。" },
  { label: "grains静态事", target: "目标3：grains静态事实", action: "grains静态事实描述操作系统、CPU和自定义标签，适合目标匹配但不存秘密", evidence: "状态、耗时、错误与审计记录 3", invariant: "pillar安全数据由master按目标编译后发送给minion，适合分层配置与秘密。" },
  { label: "pillar安全数", target: "目标4：pillar安全数据", action: "pillar安全数据由master按目标编译后发送给minion，适合分层配置与秘密", evidence: "状态、耗时、错误与审计记录 4", invariant: "state声明式配置通过SLS和requisite表达资源及依赖。" },
];
export function PopSaltstackModelLab(){return <PythonOpsOfficialLab title="集中化管理平台Saltstack详解：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopSaltstackBoundaryLab(){return <PythonOpsOfficialLab title="集中化管理平台Saltstack详解：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopSaltstackEvidenceLab(){return <PythonOpsOfficialLab title="集中化管理平台Saltstack详解：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
