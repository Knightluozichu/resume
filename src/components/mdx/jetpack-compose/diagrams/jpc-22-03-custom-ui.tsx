import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第3章 定制UI视图",
  "3.1 构建UI页面",
  "3.1.1 配置颜色、字体与形状",
  "3.1.2 Welcome欢迎页",
  "3.1.3 LoginIn登录页",
  "3.1.4 Home主页",
  "3.1.5 布局预览",
  "3.2 主题",
  "3.2.1 MaterialTheme介绍",
  "3.2.2 理解MaterialTheme与CompositionLocal",
  "3.2.3 定制主题方案",
  "3.3 本章小结"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第3章 定制UI视图" focus="用颜色、字体、形状和页面槽构建Welcome、LoginIn、Home，再以MaterialTheme和CompositionLocal形成主题方案" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第3章 定制UI视图" focus="在每个组件中硬编码颜色尺寸，或把频繁变化的业务状态塞进CompositionLocal形成隐式依赖" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第3章 定制UI视图" focus="设计令牌表、三类页面状态、浅色深色预览矩阵、CompositionLocal提供与读取边界" nodes={nodes} />; }
