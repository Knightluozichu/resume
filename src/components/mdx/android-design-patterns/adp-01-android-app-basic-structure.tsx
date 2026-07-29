"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "Fat Activity",
    owner: "Activity 同时拥有状态、业务判断与异步任务时边界已经失效。",
    flow: "用户事件直接触发网络与数据库，再回写具体控件。",
    failure: "旋转或后台后送达回调，检查旧实例是否仍被写入。",
  },
  {
    label: "MVP",
    owner: "Presenter 处理意图，View 只实现窄渲染契约。",
    flow: "View → Presenter → 数据边界 → Presenter → View。",
    failure: "分离 View 后返回结果，确认 Presenter 不再调用旧界面。",
  },
  {
    label: "MVVM",
    owner: "ViewModel 拥有页面状态，但不持有具体 View。",
    flow: "用户意图更新状态，绑定层或观察者把状态投影到界面。",
    failure: "重建观察者并重复订阅，检查事件是否重复消费。",
  },
  {
    label: "平台约束",
    owner: "组合根管理依赖作用域，生命周期边界负责订阅与释放。",
    flow: "版本、线程、权限与网络错误必须保留各自语义。",
    failure: "切换系统版本并拒绝权限，核对恢复与降级路径。",
  },
] as const;

export function Adp01AndroidAppBasicStructureLab() {
  return (
    <AndroidArchitectureLab
      title="同一 TODO 规格下比较职责"
      question="只改类名，为什么不能消除生命周期耦合？"
      stages={stages}
    />
  );
}
