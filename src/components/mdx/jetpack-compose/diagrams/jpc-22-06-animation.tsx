import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第6章 让页面动起来：动画",
  "6.1 动画分类",
  "6.2 高级别动画API",
  "6.2.1 AnimatedVisibility",
  "6.2.2 AnimatedContent",
  "6.2.3 Crossfade",
  "6.2.4 Modifier.animateContentSize",
  "6.3 低级别动画API",
  "6.3.1 animate*AsState",
  "6.3.2 Animatable",
  "6.4 Transition过渡动画",
  "6.4.1 updateTransition",
  "6.4.2 rememberInfiniteTransition",
  "6.5 AnimationSpec动画规格",
  "6.5.1 spring弹跳动画",
  "6.5.2 tween补间动画",
  "6.5.3 keyframes关键帧动画",
  "6.5.4 repeatable循环动画",
  "6.5.5 infiniteRepeatable无限循环动画",
  "6.5.6 snap快闪动画",
  "6.5.7 使用Easing控制动画节奏",
  "6.6 AnimationVector动画矢量值",
  "6.6.1 TwoWayConverter",
  "6.6.2 自定义实现TwoWayConverter",
  "6.7 实战：Compose实现骨架屏的动画效果",
  "6.7.1 定义背景色",
  "6.7.2 为Brush添加动画",
  "6.7.3 实现骨架屏布局",
  "6.8 实战：Compose实现收藏按钮动画效果",
  "6.8.1 实现方式1：高级别API（AnimatedContent）",
  "6.8.2 实现方式2：低级别API（updateTransition）",
  "6.9 本章小结"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第6章 让页面动起来：动画" focus="从高级与低级动画API进入Transition、AnimationSpec、AnimationVector，并完成骨架屏和收藏按钮两项实战" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第6章 让页面动起来：动画" focus="为装饰同时启动无限动画，忽略生命周期、可访问性、帧预算和业务状态的唯一来源" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第6章 让页面动起来：动画" focus="起止状态、时钟采样、速度连续性、取消规则、转换器往返误差、低动画偏好与截图序列" nodes={nodes} />; }
