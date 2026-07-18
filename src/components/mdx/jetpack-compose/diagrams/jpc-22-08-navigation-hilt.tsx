import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第8章 为Compose添加页面导航",
  "8.1 在Compose中使用Navigation",
  "8.1.1 认识Jetpack Navigation",
  "8.1.2 Navigation for Compose",
  "8.1.3 导航时携带参数",
  "8.1.4 Navigation搭配底部导航栏",
  "8.1.5 嵌套导航图Nested Navigation Graph",
  "8.1.6 导航DeepLinks",
  "8.1.7 Navigation对ViewModel的支持",
  "8.2 在Compose中使用Hilt",
  "8.2.1 认识Dagger Hilt",
  "8.2.2 在Compose中使用Hilt",
  "8.3 本章小结"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第8章 为Compose添加页面导航" focus="建立Navigation图、参数、底部导航、嵌套图、深链和ViewModel作用域，并用Hilt提供依赖" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第8章 为Compose添加页面导航" focus="把完整对象塞进路由、在组合重组时重复导航，或让ViewModel与依赖作用域脱离返回栈所有者" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第8章 为Compose添加页面导航" focus="路由表、返回栈轨迹、参数编码、深链测试、进程恢复、导航图级ViewModel与依赖作用域" nodes={nodes} />; }
