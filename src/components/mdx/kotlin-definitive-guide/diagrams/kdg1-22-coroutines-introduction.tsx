import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "22. Introduction to Coroutines",
  "Parsing Character Data",
  "Fetching Live Data",
  "The Android Main Thread",
  "Enabling Coroutines",
  "Specifying a Coroutine with async",
  "launch vs async/await",
  "Suspending Functions",
  "Challenge: Live Data",
  "Challenge: Minimum Strength"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="22. Introduction to Coroutines" focus="在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="22. Introduction to Coroutines" focus="把协程等同后台线程，或启动无所有者的任务后更新已销毁界面" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="22. Introduction to Coroutines" focus="调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明" nodes={nodes} />; }
