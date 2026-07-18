import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第3章 先从看得到的入手，探究Activity",
  "3.1 Activity是什么",
  "3.2 Activity的基本用法",
  "3.3 使用Intent在Activity之间穿梭",
  "3.4 Activity的生命周期",
  "3.5 Activity的启动模式",
  "3.6 Activity的最佳实践",
  "3.7 Kotlin课堂：标准函数和静态方法",
  "3.8 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第3章 先从看得到的入手，探究Activity" focus="用任务栈、Intent、生命周期、启动模式与状态保存解释页面导航，并把Kotlin标准函数放回所有权和可读性语境" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第3章 先从看得到的入手，探究Activity" focus="建立三个Activity并组合显式/隐式Intent与四种启动模式，注入旋转、后台回收和返回操作核对实例与状态" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第3章 先从看得到的入手，探究Activity" focus="Activity状态机、任务栈轨迹、Intent合同、旋转/进程重建状态恢复测试" nodes={nodes} />; }
