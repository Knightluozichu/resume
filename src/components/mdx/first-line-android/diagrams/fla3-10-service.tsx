import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第10章 后台默默的劳动者，探究Service",
  "10.1 Service是什么",
  "10.2 Android多线程编程",
  "10.3 Service的基本用法",
  "10.4 Service的生命周期",
  "10.5 Service的更多技巧",
  "10.6 Kotlin课堂：泛型的高级特性",
  "10.7 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第10章 后台默默的劳动者，探究Service" focus="区分线程与Service、启动与绑定生命周期、前台服务、IntentService历史方案和Kotlin泛型边界" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第10章 后台默默的劳动者，探究Service" focus="实现启动式和绑定式任务，加入前台通知、重连、进程终止和重复启动，观察回调线程与资源所有权" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第10章 后台默默的劳动者，探究Service" focus="Service生命周期图、主线程/工作线程证据、绑定所有权、前台通知与停止测试" nodes={nodes} />; }
