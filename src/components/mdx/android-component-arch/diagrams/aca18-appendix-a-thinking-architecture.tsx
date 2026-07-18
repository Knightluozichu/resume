import { OfficialAca18BookLab } from "./official-aca18-book-lab";

const nodes = [
  "附录A 思维与架构"
];

export function Aca18BoundaryLab() { return <OfficialAca18BookLab mode="boundary" unitTitle="附录A 思维与架构" focus="把架构决策还原为问题、约束、证据、取舍、所有者和可逆迁移，而不是工具清单" nodes={nodes} />; }
export function Aca18FailureLab() { return <OfficialAca18BookLab mode="failure" unitTitle="附录A 思维与架构" focus="先选ARouter、Gradle脚本或发布平台，再倒推问题，使工具替代边界和团队责任设计" nodes={nodes} />; }
export function Aca18EvidenceLab() { return <OfficialAca18BookLab mode="evidence" unitTitle="附录A 思维与架构" focus="问题陈述、约束表、备选方案、决策记录、反例、度量与复盘" nodes={nodes} />; }
