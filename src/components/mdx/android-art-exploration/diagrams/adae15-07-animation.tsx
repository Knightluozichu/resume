import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第7章 Android动画深入分析",
  "7.1 View动画",
  "7.1.1 View动画的种类",
  "7.1.2 自定义View动画",
  "7.1.3 帧动画",
  "7.2 View动画的特殊使用场景",
  "7.2.1 LayoutAnimation",
  "7.2.2 Activity的切换效果",
  "7.3 属性动画",
  "7.3.1 使用属性动画",
  "7.3.2 理解插值器和估值器",
  "7.3.3 属性动画的监听器",
  "7.3.4 对任意属性做动画",
  "7.3.5 属性动画的工作原理",
  "7.4 使用动画的注意事项"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第7章 Android动画深入分析" focus="区分View动画、帧动画与属性动画，理解插值器、估值器、监听器、任意属性适配和底层更新" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第7章 Android动画深入分析" focus="只改变视觉矩阵却假设真实属性和点击区域已经改变，或让无限动画泄漏页面" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第7章 Android动画深入分析" focus="动画类型表、时间曲线、属性快照、监听顺序、触摸命中测试和性能轨迹" nodes={nodes} />; }
