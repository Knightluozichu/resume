import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第2部分 拥抱Kotlin"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第2部分 拥抱Kotlin" focus="从使用现有API转向设计自己的API，以约定、高阶函数、泛型、反射和DSL组织可复用抽象" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第2部分 拥抱Kotlin" focus="为了追求Kotlin风格堆叠运算符、内联、反射和DSL，使调用点含义与运行代价不可见" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第2部分 拥抱Kotlin" focus="五章依赖图、抽象成本表、调用点样例、运行时边界和API验收清单" nodes={nodes} />; }
