import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第7章 事件总线",
  "7.1 解析EventBus",
  "7.1.1 使用EventBus",
  "7.1.2 源码解析EventBus",
  "7.2 解析otto",
  "7.2.1 使用otto",
  "7.2.2 源码解析otto"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第7章 事件总线" focus="比较EventBus与otto的注册、发布、线程交付和源码索引机制，判断事件总线何时值得使用" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第7章 事件总线" focus="用全局事件替代明确接口和状态所有者，造成来源不可追踪、订阅泄漏与顺序依赖" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第7章 事件总线" focus="订阅表、注册注销配对、线程模式、粘性事件、继承分发、异常与页面销毁后的投递测试" nodes={nodes} />; }
