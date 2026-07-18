import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "Ansible集中", target: "目标1：Ansible集中化管理", action: "Ansible集中化管理以无代理SSH连接和模块返回为基础", evidence: "状态、耗时、错误与审计记录 1", invariant: "YAML与Inventory分别描述任务数据和资产分组。" },
  { label: "YAML与Inve", target: "目标2：YAML与Inventory", action: "YAML与Inventory分别描述任务数据和资产分组", evidence: "状态、耗时、错误与审计记录 2", invariant: "模块与目标匹配决定影响范围。" },
  { label: "模块与目标匹配", target: "目标3：模块与目标匹配", action: "模块与目标匹配决定影响范围", evidence: "状态、耗时、错误与审计记录 3", invariant: "playbook、角色与包含把任务、handler、模板和默认变量组织成可复用单元。" },
  { label: "playbook、", target: "目标4：playbook、角色与包含", action: "playbook、角色与包含把任务、handler、模板和默认变量组织成可复用单元", evidence: "状态、耗时、错误与审计记录 4", invariant: "Facts、变量、条件与循环驱动跨系统差异。" },
];
export function PopAnsibleModelLab(){return <PythonOpsOfficialLab title="集中化管理平台Ansible详解：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopAnsibleBoundaryLab(){return <PythonOpsOfficialLab title="集中化管理平台Ansible详解：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopAnsibleEvidenceLab(){return <PythonOpsOfficialLab title="集中化管理平台Ansible详解：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
