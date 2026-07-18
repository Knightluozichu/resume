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

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="《Android应用性能优化》权威学习地图" focus="沿Java、两层NDK、内存、线程、评测、电池、图形和RenderScript重建Android 4.0时代性能因果链" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="《Android应用性能优化》权威学习地图" focus="用Perfetto、WorkManager、DataStore等现代专题替换原书，遗漏NDK、NEON、OpenGL ES与RenderScript主线" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="《Android应用性能优化》权威学习地图" focus="9章152节点矩阵、设备版本卡、测量协议、跨层实验路线和现代迁移账本" nodes={nodes} />; }
