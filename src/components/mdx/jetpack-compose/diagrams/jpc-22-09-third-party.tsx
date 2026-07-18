import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第9章 Accompanist与第三方组件库",
  "9.1 Accompanist",
  "9.1.1 SystemUiController",
  "9.1.2 Pager",
  "9.1.3 SwipeRefresh",
  "9.1.4 Flow Layouts",
  "9.1.5 Insets",
  "9.2 Lottie",
  "9.2.1 配置依赖",
  "9.2.2 Lottie动画资源",
  "9.2.3 创建Lottie动画",
  "9.3 Coil",
  "9.3.1 配置依赖",
  "9.3.2 AsyncImage",
  "9.3.3 SubcomposeAsyncImage",
  "9.3.4 AsyncImagePainter",
  "9.4 本章小结"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第9章 Accompanist与第三方组件库" focus="核对Accompanist的系统栏、Pager、刷新、流式布局与Insets，并集成Lottie动画和Coil图片" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第9章 Accompanist与第三方组件库" focus="复制过时第三方示例却不锁版本、不处理加载失败，也不记录功能迁入官方库后的替代路径" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第9章 Accompanist与第三方组件库" focus="依赖版本矩阵、资源失败态、加载生命周期、缓存命中、系统栏与Insets截图、替代API映射" nodes={nodes} />; }
