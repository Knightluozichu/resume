import { OfficialAca18BookLab } from "./official-aca18-book-lab";

const nodes = [
  "第1章 组件化基础",
  "第2章 组件化编程",
  "第3章 组件化优化",
  "第4章 组件化编译",
  "第5章 组件化分发",
  "第6章 组件化流通",
  "第7章 架构模板",
  "第8章 架构演化",
  "附录A 思维与架构"
];

export function Aca18BoundaryLab() { return <OfficialAca18BookLab mode="boundary" unitTitle="《Android组件化架构》全书总复习" focus="从源码依赖、构建任务、运行分发、制品流通和团队治理五条链闭环全部正式节点" nodes={nodes} />; }
export function Aca18FailureLab() { return <OfficialAca18BookLab mode="failure" unitTitle="《Android组件化架构》全书总复习" focus="只有集成成功截图，没有依赖违规、Manifest冲突、增量失效、生命周期错位和制品回滚证据" nodes={nodes} />; }
export function Aca18EvidenceLab() { return <OfficialAca18BookLab mode="evidence" unitTitle="《Android组件化架构》全书总复习" focus="全书节点表、垂直组件样例、构建基线、故障注入、发布回滚和架构决策记录" nodes={nodes} />; }
