import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第1章 全新的Android UI框架",
  "1.1 Jetpack Compose是什么",
  "1.1.1 谷歌为什么要推出Compose",
  "1.1.2 命令式UI与声明式UI",
  "1.1.3 Compose API设计原则",
  "1.1.4 Compose与View的关系",
  "1.1.5 不只是Android UI框架",
  "1.2 搭建开发环境",
  "1.2.1 准备所需要的开发工具",
  "1.2.2 部署开发环境",
  "1.3 创建第一个Compose应用",
  "1.3.1 创建新的Compose项目",
  "1.3.2 保持Compose版本更新",
  "1.3.3 在模拟器中运行Compose应用",
  "1.3.4 分析第一个Compose应用",
  "1.3.5 对Compose应用进行预览",
  "1.3.6 已有项目引入Compose",
  "1.4 本章小结"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第1章 全新的Android UI框架" focus="从声明式UI、Compose API原则与View关系，走到环境部署、首个应用、预览和已有项目接入" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第1章 全新的Android UI框架" focus="把声明式UI理解成少写XML，仍在组合期间执行I/O或手动命令式修改组件" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第1章 全新的Android UI框架" focus="状态到UI映射、编译配置、预览与设备结果、版本目录、View与Compose双向边界" nodes={nodes} />; }
