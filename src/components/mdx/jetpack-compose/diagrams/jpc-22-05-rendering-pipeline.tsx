import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第5章 Compose组件渲染流程",
  "5.1 组合",
  "5.2 布局",
  "5.2.1 Layout Modifier",
  "5.2.2 Layout Composable",
  "5.2.3 固有特性测量Intrinsic",
  "5.2.4 SubcomposeLayout",
  "5.3 绘制",
  "5.3.1 Canvas Composable",
  "5.3.2 DrawModifier",
  "5.3.3 使用平台原生Canvas",
  "5.3.4 实战：Canvas绘制波浪加载",
  "5.4 本章小结"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第5章 Compose组件渲染流程" focus="从组合进入测量、布局与绘制，比较Layout Modifier、Layout、Intrinsic、SubcomposeLayout、Canvas和DrawModifier" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第5章 Compose组件渲染流程" focus="违反单次测量约束，或为读取尺寸滥用Intrinsic和SubcomposeLayout导致额外组合与布局成本" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第5章 Compose组件渲染流程" focus="组合树、约束传递、测量次数、放置坐标、绘制层次、固有测量与子组合触发记录" nodes={nodes} />; }
