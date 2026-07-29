"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "Contract",
    owner: "Contract 明确 View 可渲染什么、Presenter 可接收什么。",
    flow: "Activity 只负责创建并连接 Presenter 与 Fragment。",
    failure: "删除一个 View 方法，观察耦合是否被编译器暴露。",
  },
  {
    label: "Presenter",
    owner: "Presenter 编排用例和页面决策，不接触 Android 控件。",
    flow: "输入经 Presenter 转成显式 View 调用与数据请求。",
    failure: "用假 View 注入空数据、错误与迟到成功。",
  },
  {
    label: "View",
    owner: "View 渲染、采集输入并报告生命周期，不保存业务事实。",
    flow: "Fragment 把点击转发给 Presenter，再执行渲染指令。",
    failure: "detach 后返回结果，确认旧 View 不再收到调用。",
  },
] as const;

export function Adp03MvpApplicationStructureLab() {
  return (
    <AndroidArchitectureLab
      title="用显式契约切开平台与业务"
      question="Presenter 可测试，是否就等于生命周期安全？"
      stages={stages}
    />
  );
}
