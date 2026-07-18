import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "Fabric批量运", target: "目标1：Fabric批量运维", action: "Fabric批量运维把SSH命令封装成可组合任务", evidence: "状态、耗时、错误与审计记录 1", invariant: "fab参数与fabfile定义任务入口、主机和参数。" },
  { label: "fab参数与fab", target: "目标2：fab参数与fabfile", action: "fab参数与fabfile定义任务入口、主机和参数", evidence: "状态、耗时、错误与审计记录 2", invariant: "环境、角色与网关把目标分组及跳板拓扑显式化。" },
  { label: "环境、角色与网关", target: "目标3：环境、角色与网关", action: "环境、角色与网关把目标分组及跳板拓扑显式化", evidence: "状态、耗时、错误与审计记录 3", invariant: "文件打包上传与校验应生成版本化归档和SHA-256摘要，上传到临时目录，校验后解压到新版本目录。" },
  { label: "文件打包上传与校验", target: "目标4：文件打包上传与校验", action: "文件打包上传与校验应生成版本化归档和SHA-256摘要，上传到临时目录，校验后解压到新版本目录", evidence: "状态、耗时、错误与审计记录 4", invariant: "LNMP部署与代码发布要分开基础设施和应用发布。" },
];
export function PopFabricModelLab(){return <PythonOpsOfficialLab title="系统批量运维管理器Fabric详解：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopFabricBoundaryLab(){return <PythonOpsOfficialLab title="系统批量运维管理器Fabric详解：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopFabricEvidenceLab(){return <PythonOpsOfficialLab title="系统批量运维管理器Fabric详解：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
