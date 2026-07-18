import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第6章 全局大喇叭，详解广播机制",
  "6.1 广播机制简介",
  "6.2 接收系统广播",
  "6.3 发送自定义广播",
  "6.4 广播的最佳实践：实现强制下线功能",
  "6.5 Kotlin课堂：高阶函数详解",
  "6.6 Git时间：初识版本控制工具",
  "6.7 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第6章 全局大喇叭，详解广播机制" focus="掌握系统与自定义广播、动态注册、作用域、安全输入和强制下线实践，并用高阶函数和Git形成可测试边界" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第6章 全局大喇叭，详解广播机制" focus="动态监听网络变化并发送应用内登出事件，注入伪造Intent、重复注册和后台限制验证安全与生命周期" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第6章 全局大喇叭，详解广播机制" focus="广播发送接收图、注册生命周期、权限与导出矩阵、强制下线状态机" nodes={nodes} />; }
