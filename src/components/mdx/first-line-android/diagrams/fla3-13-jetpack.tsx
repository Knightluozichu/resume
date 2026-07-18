import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第13章 高级程序开发组件，探究Jetpack",
  "13.1 Jetpack简介",
  "13.2 ViewModel",
  "13.3 Lifecycles",
  "13.4 LiveData",
  "13.5 Room",
  "13.6 WorkManager",
  "13.7 Kotlin课堂：使用DSL构建专有的语法结构",
  "13.8 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第13章 高级程序开发组件，探究Jetpack" focus="用ViewModel、Lifecycle、LiveData、Room、WorkManager与Kotlin DSL建立生命周期感知、单一数据源和可靠后台任务" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第13章 高级程序开发组件，探究Jetpack" focus="实现Room单一数据源、ViewModel状态和受约束后台同步，注入旋转、进程重建、断网和数据库升级" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第13章 高级程序开发组件，探究Jetpack" focus="UI状态流、ViewModel所有权、Room模式迁移、WorkManager约束与重试测试" nodes={nodes} />; }
