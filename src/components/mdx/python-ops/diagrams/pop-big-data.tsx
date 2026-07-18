import { PythonOpsOfficialLab, type PythonOpsCase } from "./official-lab";
const cases: PythonOpsCase[] = [
  { label: "Python大数据", target: "目标1：Python大数据应用", action: "Python大数据应用章节用Web日志展示分布式批处理", evidence: "状态、耗时、错误与审计记录 1", invariant: "Hadoop部署包括JDK、HDFS、YARN、节点角色和配置一致性。" },
  { label: "Hadoop部署", target: "目标2：Hadoop部署", action: "Hadoop部署包括JDK、HDFS、YARN、节点角色和配置一致性", evidence: "状态、耗时、错误与审计记录 2", invariant: "原生Python MapReduce通过stdin读取、stdout输出制表符分隔键值。" },
  { label: "原生Python ", target: "目标3：原生Python MapReduce", action: "原生Python MapReduce通过stdin读取、stdout输出制表符分隔键值", evidence: "状态、耗时、错误与审计记录 3", invariant: "mrjob框架把step、协议、运行器和配置封装起来，可在本地先验证再提交Hadoop。" },
  { label: "mrjob框架", target: "目标4：mrjob框架", action: "mrjob框架把step、协议、运行器和配置封装起来，可在本地先验证再提交Hadoop", evidence: "状态、耗时、错误与审计记录 4", invariant: "Web日志多维统计包括流量、状态码、分钟请求、来源IP和文件访问。" },
];
export function PopBigDataModelLab(){return <PythonOpsOfficialLab title="Python大数据应用详解：执行链" caption="从目标和动作追到逐项结果。" cases={cases} tone="cyan" />;}
export function PopBigDataBoundaryLab(){return <PythonOpsOfficialLab title="Python大数据应用详解：边界" caption="切换目标，观察超时、权限与部分失败。" cases={cases} tone="amber" initial={1} />;}
export function PopBigDataEvidenceLab(){return <PythonOpsOfficialLab title="Python大数据应用详解：证据" caption="用状态、日志和回滚验收自动化。" cases={cases} tone="emerald" initial={2} />;}
