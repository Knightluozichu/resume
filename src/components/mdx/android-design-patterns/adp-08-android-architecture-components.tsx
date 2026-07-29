"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "Lifecycle",
    owner: "生命周期所有者发布状态，观察者按有效阶段工作。",
    flow: "组件状态变化控制订阅的激活与停止。",
    failure: "界面停止后推送数据，确认不执行无效渲染。",
  },
  {
    label: "ViewModel",
    owner: "ViewModel 跨配置变更保存页面级状态与任务引用。",
    flow: "重建后的 Activity 取得同一状态所有者并重新观察。",
    failure: "最终销毁后检查资源是否真正释放。",
  },
  {
    label: "LiveData",
    owner: "LiveData 保存最近值并只通知活跃观察者。",
    flow: "数据源更新值，生命周期感知观察者再渲染。",
    failure: "快速切换前后台，检查重复与遗漏通知。",
  },
  {
    label: "组合模式",
    owner: "MVVM 或 Flux 仍负责业务状态方向，组件只解决平台协作。",
    flow: "把生命周期能力放进既有边界，不重画业务事实。",
    failure: "删除组件封装后，验证架构规则是否仍说得清。",
  },
] as const;

export function Adp08AndroidArchitectureComponentsLab() {
  return (
    <AndroidArchitectureLab
      title="把平台生命周期能力接入既有模式"
      question="使用 ViewModel 与 LiveData，为什么不等于自动采用 MVVM？"
      stages={stages}
    />
  );
}
