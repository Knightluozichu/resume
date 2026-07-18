import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "附录B 本地内存跟踪"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="附录B 本地内存跟踪" focus="使用Native Memory Tracking区分堆外类别、基线与差异，并记录NMT自身开销和覆盖边界" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="附录B 本地内存跟踪" focus="固定工作量分别增加线程、类加载和直接缓冲区，核对NMT类别变化及与进程RSS的差额" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="附录B 本地内存跟踪" focus="NMT启动参数、baseline与diff、类别解释、RSS对照、未覆盖项与采集开销" nodes={nodes} />; }
