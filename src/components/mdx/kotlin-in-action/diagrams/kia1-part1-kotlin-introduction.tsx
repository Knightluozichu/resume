import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第1部分 Kotlin简介"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第1部分 Kotlin简介" focus="先建立Kotlin 1.0的语言目标、基本语法、类、lambda与类型系统，再判断它如何复用既有Java平台" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第1部分 Kotlin简介" focus="把第1部分读成语法速查表，跳过空安全、静态类型和Java互操作背后的设计约束" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第1部分 Kotlin简介" focus="版本卡、六章依赖图、Java互操作边界、最小工程和概念回收表" nodes={nodes} />; }
