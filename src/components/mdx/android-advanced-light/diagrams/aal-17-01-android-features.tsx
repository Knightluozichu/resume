import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第1章 Android新特性",
  "1.1 Android 5.0新特性",
  "1.1.1 Android 5.0主要新特性概述",
  "1.1.2 替换ListView和GridView的RecyclerView",
  "1.1.3 卡片CardView",
  "1.1.4 3种Notification",
  "1.1.5 Toolbar与Palette",
  "1.2 Android 6.0新特性",
  "1.2.1 Android 6.0主要新特性概述",
  "1.2.2 运行时权限机制",
  "1.3 Android 7.0新特性",
  "1.3.1 Android 7.0主要新特性概述",
  "1.3.2 多窗口模式",
  "1.4 本章小结"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第1章 Android新特性" focus="从Android 5.0的RecyclerView、CardView、通知、Toolbar和Palette，走到Android 6.0运行时权限与Android 7.0多窗口" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第1章 Android新特性" focus="只按最新系统测试，把运行时权限、多窗口和旧API回退当成不会发生的边缘情况" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第1章 Android新特性" focus="API级别分支、权限状态机、通知样例、滚动复用、窗口尺寸变化与进程恢复" nodes={nodes} />; }
