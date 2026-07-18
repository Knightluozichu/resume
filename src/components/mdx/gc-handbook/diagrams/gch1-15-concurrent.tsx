import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第15章 并发垃圾回收",
  "15.1 并发回收的正确性",
  "重访三色抽象",
  "丢失对象问题",
  "强弱三色不变式",
  "精度",
  "变异器颜色",
  "分配颜色",
  "增量更新方案",
  "开始时快照方案",
  "15.2 并发回收的屏障技术",
  "灰色变异器技术",
  "黑色变异器技术",
  "屏障技术的完整性",
  "并发写屏障机制",
  "一级卡表",
  "二级卡表",
  "减少工作",
  "15.3 需要考虑的问题"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第15章 并发垃圾回收" focus="用丢失对象问题、强弱三色不变式、增量更新与SATB解释并发正确性及屏障完整性" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第15章 并发垃圾回收" focus="在标记期间执行删边、加边与分配，分别启用增量更新和SATB屏障，验证漏标与浮动垃圾" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第15章 并发垃圾回收" focus="并发交错反例、三色不变式证明、屏障覆盖矩阵、阶段切换协议" nodes={nodes} />; }
