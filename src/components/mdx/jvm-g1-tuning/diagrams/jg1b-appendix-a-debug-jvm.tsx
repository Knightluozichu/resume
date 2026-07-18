import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "附录A 编译调试JVM"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="附录A 编译调试JVM" focus="建立jdk8u60 HotSpot源码目录、调试构建、GDB启动和关键G1断点的可重复环境" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="附录A 编译调试JVM" focus="在分配慢路径和Young GC入口设置断点，核对线程、参数与调用栈，并保存无调试器对照" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="附录A 编译调试JVM" focus="源码提交、依赖清单、debug构建日志、符号验证、断点与清理步骤" nodes={nodes} />; }
