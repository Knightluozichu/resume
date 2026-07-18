import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "Func统一网络控", target: "目标1：Func统一网络控制器", action: "Func统一网络控制器是原书时代的证书化远程执行框架，学习价值在控制器、minion、模块和结果聚合模型", evidence: "状态、耗时、错误与审计记录 1", invariant: "目标主机选择与模块把主机pattern映射到远程方法。" },
  { label: "目标主机选择与模块", target: "目标2：目标主机选择与模块", action: "目标主机选择与模块把主机pattern映射到远程方法", evidence: "状态、耗时、错误与审计记录 2", invariant: "自定义Func模块在minion端公开方法和版本。" },
  { label: "自定义Func模块", target: "目标3：自定义Func模块", action: "自定义Func模块在minion端公开方法和版本", evidence: "状态、耗时、错误与审计记录 3", invariant: "非Python API接口让其他语言通过XML-RPC等方式调用控制器。" },
  { label: "非Python A", target: "目标4：非Python API接口", action: "非Python API接口让其他语言通过XML-RPC等方式调用控制器", evidence: "状态、耗时、错误与审计记录 4", invariant: "Func Facts采集主机事实供查询和决策。" },
];
export function PopFuncModelLab(){return <PythonOpsOfficialLab title="统一网络控制器Func详解：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopFuncBoundaryLab(){return <PythonOpsOfficialLab title="统一网络控制器Func详解：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopFuncEvidenceLab(){return <PythonOpsOfficialLab title="统一网络控制器Func详解：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
