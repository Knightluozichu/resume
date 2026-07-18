import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第16章 并发标记-清扫",
  "16.1 初始化",
  "16.2 终止",
  "16.3 分配",
  "16.4 并发标记与清扫",
  "16.5 On-the-fly标记",
  "On-the-fly回收的写屏障",
  "Doligez-Leroy-Gonthier",
  "面向Java的Doligez-Leroy-Gonthier",
  "滑动视图",
  "16.6 抽象并发回收",
  "回收器波前",
  "添加起点",
  "变异器屏障",
  "精度",
  "实例化回收器",
  "16.7 需要考虑的问题"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第16章 并发标记-清扫" focus="覆盖初始化、终止、并发分配与清扫、on-the-fly标记和抽象并发回收器的实例化" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第16章 并发标记-清扫" focus="在并发标记和清扫中持续分配并改变引用，验证终止、浮动垃圾、自由链竞争和回收失败" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第16章 并发标记-清扫" focus="CMS阶段时间线、结束检测、分配颜色合同、wavefront与origin模型" nodes={nodes} />; }
