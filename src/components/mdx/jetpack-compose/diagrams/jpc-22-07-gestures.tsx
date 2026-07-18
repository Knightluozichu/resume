import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第7章 增进交互体验：手势处理",
  "7.1 常用的手势处理Modifier",
  "7.1.1 Clickable点击",
  "7.1.2 CombinedClickable复合点击",
  "7.1.3 Draggable拖动",
  "7.1.4 Swipeable滑动",
  "7.1.5 Transformable多点触控",
  "7.1.6 Scrollable滚动",
  "7.1.7 NestedScroll嵌套滑动",
  "7.2 定制手势处理",
  "7.2.1 使用PointerInput Modifier",
  "7.2.2 手势事件方法作用域awaitPointerEventScope",
  "7.3 手势结合动画",
  "7.4 本章小结"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第7章 增进交互体验：手势处理" focus="比较点击、复合点击、拖动、滑动、多点触控、滚动和嵌套滚动，再以PointerInput定制事件并结合动画" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第7章 增进交互体验：手势处理" focus="直接从原始坐标判断手势而忽略事件消费、触摸阈值、取消和可访问性语义" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第7章 增进交互体验：手势处理" focus="指针序列、消费标记、触摸阈值、速度、取消、父子滚动分配、语义动作与多指轨迹" nodes={nodes} />; }
