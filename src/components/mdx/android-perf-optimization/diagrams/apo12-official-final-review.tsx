import { OfficialApo12BookLab } from "./official-apo12-book-lab";

const nodes = [
  "第1章 Java代码优化",
  "第2章 NDK入门",
  "第3章 NDK进阶",
  "第4章 高效使用内存",
  "第5章 多线程和同步",
  "第6章 性能评测和剖析",
  "第7章 延长电池续航时间",
  "第8章 图形",
  "第9章 RenderScript"
];

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="《Android应用性能优化》全书总复习" focus="从等价性、时间、内存、线程、能耗和图形六类证据闭环SDK、NDK与RenderScript全部节点" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="《Android应用性能优化》全书总复习" focus="只有优化后数字，没有相同输入、正确性、预热、重复样本、设备状态、资源释放与回滚基线" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="《Android应用性能优化》全书总复习" focus="全书节点表、Java/NDK对照基准、内存与线程故障、电量记录、图形实验和版本迁移报告" nodes={nodes} />; }
