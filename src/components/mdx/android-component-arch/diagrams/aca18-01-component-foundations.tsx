import { OfficialAca18BookLab } from "./official-aca18-book-lab";

const nodes = [
  "第1章 组件化基础",
  "1.1 你知道组件化吗",
  "1.2 基础组件化架构介绍",
  "1.2.1 依赖",
  "1.2.2 聚合和解耦",
  "1.3 重新认识AndroidManifest",
  "1.3.1 AndroidManifest属性汇总",
  "1.3.2 AndroidManifest属性变更",
  "1.4 你所不知道的Application",
  "1.4.1 Application的基础和作用",
  "1.4.2 组件化Application",
  "1.5 小结"
];

export function Aca18BoundaryLab() { return <OfficialAca18BookLab mode="boundary" unitTitle="第1章 组件化基础" focus="从依赖、聚合与解耦出发，验证AndroidManifest合并和多组件Application初始化的真实边界" nodes={nodes} />; }
export function Aca18FailureLab() { return <OfficialAca18BookLab mode="failure" unitTitle="第1章 组件化基础" focus="只拆Gradle module便宣称完成解耦，或让每个组件直接控制全局Application初始化顺序" nodes={nodes} />; }
export function Aca18EvidenceLab() { return <OfficialAca18BookLab mode="evidence" unitTitle="第1章 组件化基础" focus="依赖图、Manifest合并报告、Application启动序列、进程记录和冲突断言" nodes={nodes} />; }
