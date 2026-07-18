import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "定制业务质量报表", target: "目标1：定制业务质量报表", action: "定制业务质量报表把原始监控转换为可审计结论", evidence: "状态、耗时、错误与审计记录 1", invariant: "XlsxWriter流量周报可生成工作表、公式和图表，但公式引用、单位和日期格式要由测试验证。" },
  { label: "XlsxWrite", target: "目标2：XlsxWriter流量周报", action: "XlsxWriter流量周报可生成工作表、公式和图表，但公式引用、单位和日期格式要由测试验证", evidence: "状态、耗时、错误与审计记录 2", invariant: "rrdtool网卡流量图体现固定步长、数据源类型、heartbeat和归档策略。" },
  { label: "rrdtool网卡", target: "目标3：rrdtool网卡流量图", action: "rrdtool网卡流量图体现固定步长、数据源类型、heartbeat和归档策略", evidence: "状态、耗时、错误与审计记录 3", invariant: "动态路由轨迹图把每跳地址、自治域或位置映射为路径。" },
  { label: "动态路由轨迹图", target: "目标4：动态路由轨迹图", action: "动态路由轨迹图把每跳地址、自治域或位置映射为路径", evidence: "状态、耗时、错误与审计记录 4", invariant: "TCP探测与可视化证据应关联连接时延、端口、失败阶段与路由变化。" },
];
export function PopQualityReportsModelLab(){return <PythonOpsOfficialLab title="定制业务质量报表详解：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopQualityReportsBoundaryLab(){return <PythonOpsOfficialLab title="定制业务质量报表详解：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopQualityReportsEvidenceLab(){return <PythonOpsOfficialLab title="定制业务质量报表详解：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
