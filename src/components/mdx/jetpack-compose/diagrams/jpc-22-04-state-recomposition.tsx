import { OfficialJpc22BookLab } from "./official-jpc22-book-lab";

const nodes = [
  "第4章 状态管理与重组",
  "4.1 状态管理",
  "4.1.1 什么是状态",
  "4.1.2 单向数据流",
  "4.1.3 Stateless与Stateful",
  "4.1.4 状态的定义",
  "4.1.5 状态上提",
  "4.1.6 状态的持久化与恢复",
  "4.1.7 使用ViewModel管理状态",
  "4.1.8 LiveData、RxJava、Flow转State",
  "4.1.9 状态的分层管理",
  "4.2 重组与自动刷新",
  "4.2.1 智能的重组",
  "4.2.2 避免重组的陷阱",
  "4.2.3 如何确定重组范围",
  "4.2.4 优化重组的性能",
  "4.3 生命周期与副作用",
  "4.3.1 Composable的生命周期",
  "4.3.2 Composable的副作用",
  "4.3.3 副作用API",
  "4.3.4 异步处理的副作用API",
  "4.3.5 状态创建的副作用API",
  "4.3.6 副作用API的观察参数",
  "4.4 本章小结"
];

export function Jpc22PipelineLab() { return <OfficialJpc22BookLab mode="pipeline" unitTitle="第4章 状态管理与重组" focus="贯通单向数据流、无状态与有状态组件、状态上提、恢复、ViewModel、流转换、重组范围、生命周期和副作用" nodes={nodes} />; }
export function Jpc22ExperimentLab() { return <OfficialJpc22BookLab mode="experiment" unitTitle="第4章 状态管理与重组" focus="在组合期间直接写状态或启动异步任务，造成重组循环、重复请求和越过生命周期的回调" nodes={nodes} />; }
export function Jpc22EvidenceLab() { return <OfficialJpc22BookLab mode="evidence" unitTitle="第4章 状态管理与重组" focus="事件到状态轨迹、进程恢复测试、重组计数、稳定性判据、Effect键变化与取消日志" nodes={nodes} />; }
