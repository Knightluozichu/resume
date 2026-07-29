"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "页面状态",
    owner: "ViewModel 持有可恢复页面状态，View 只读取并转发意图。",
    flow: "Repository → ViewModel → Data Binding → Fragment。",
    failure: "旋转两次，确认加载结果没有丢失或重复请求。",
  },
  {
    label: "导航动作",
    owner: "Navigator 承担界面跳转，ViewModel 不引用 Activity。",
    flow: "用户动作进入 ViewModel，再通过窄事件边界请求导航。",
    failure: "界面不在前台时触发导航，检查动作是否过期。",
  },
  {
    label: "短暂消息",
    owner: "Snackbar 是一次性效果，不应伪装成长期页面状态。",
    flow: "命令包含唯一标识，界面确认消费后不再重放。",
    failure: "重建观察者，验证同一消息不会显示两次。",
  },
] as const;

export function Adp02MvvmApplicationStructureLab() {
  return (
    <AndroidArchitectureLab
      title="区分持久状态与一次性效果"
      question="ViewModel 活得更久时，哪些消息反而更容易重复？"
      stages={stages}
    />
  );
}
