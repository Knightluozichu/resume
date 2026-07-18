import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "第12章 新一代垃圾回收器",
  "12.1 Shenandoah",
  "12.2 ZGC"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="第12章 新一代垃圾回收器" focus="从G1的疏散停顿限制理解Shenandoah与ZGC的并发移动思路，并保持2019年技术状态边界" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="第12章 新一代垃圾回收器" focus="在原书语境还原机制，再从目标JDK一手资料复核状态、平台、参数与已变化实现，不混写结论" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="第12章 新一代垃圾回收器" focus="2019机制对照、并发移动图、屏障职责、版本状态账本、选择限制" nodes={nodes} />; }
