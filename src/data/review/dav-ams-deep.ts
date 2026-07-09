import type { ReviewQuestion } from "./types";

export const davAmsDeepQuestions: ReviewQuestion[] = [
  {
    id: "dav-ams-1",
    chapter: "dav-ams-deep",
    level: 1,
    question: "AMS的核心数据结构是什么？ActivityRecord/TaskRecord/ActivityStack的关系？",
    answer: "AMS管理四大组件：Activity（ActivityStackSupervisor→ActivityStack→TaskRecord→ActivityRecord）、Service（ActiveServices→ServiceRecord）、Broadcast（BroadcastQueue→BroadcastRecord）、Provider（mProviderMap）、进程（mProcessList→ProcessRecord）。三者关系：ActivityStack管理多个TaskRecord（任务/回退栈），每个TaskRecord包含一组ActivityRecord（单个Activity实例记录，含Intent/token/state/所在ProcessRecord）。层级：ActivityStack→TaskRecord[]→ActivityRecord[]→ProcessRecord。",
    tags: ["AMS", "ActivityRecord", "TaskRecord", "ActivityStack", "数据结构"],
  },
  {
    id: "dav-ams-2",
    chapter: "dav-ams-deep",
    level: 2,
    question: "详细描述Activity启动的完整流程（跨三个进程）。",
    answer: "①App进程：startActivityForResult→Instrumentation.execStartActivity→AMS.startActivity（Binder）。②system_server：AMS.startActivity→startActivityAsUser→ActivityStarter.execute→startActivityUnchecked检查启动模式→startSpecificActivityLocked检查目标进程。进程存在：realStartActivityLocked→ApplicationThread.scheduleTransaction。进程不存在：startProcess→Socket请求Zygote fork→新进程attachApplication→realStartActivityLocked。③App进程：scheduleTransaction→handleLaunchActivity→Instrumentation.newActivity→activity.onCreate。",
    tags: ["Activity启动", "AMS", "Zygote", "Binder", "三进程"],
  },
  {
    id: "dav-ams-3",
    chapter: "dav-ams-deep",
    level: 3,
    question: "OOM Adj机制是什么？AMS如何动态调整进程优先级？LowMemoryKiller如何工作？",
    answer: "OOM Adj是进程优先级数值，越小越不易被杀：前台Activity=0、可见=100、可感知=200、缓存=906-999。updateOomAdjLocked()遍历ProcessRecord，根据组件状态计算adj（前台Activity→0，无活跃组件→缓存），写入/proc/pid/oom_score_adj。LMK内核线程定时检查内存水位，内存不足时从adj最大进程开始杀，前台进程adj=0几乎不被杀。保证前台用户体验同时回收不活跃进程内存。",
    tags: ["OOM Adj", "LowMemoryKiller", "进程优先级", "updateOomAdjLocked"],
  },
  {
    id: "dav-ams-4",
    chapter: "dav-ams-deep",
    level: 2,
    question: "ANR是什么？AMS如何监控和触发ANR？",
    answer: "ANR（Application Not Responding）是主线程消息处理超时。AMS通过Handler定时器监控：Activity input事件5秒未处理→Input ANR；BroadcastReceiver前台10秒/后台60秒未完成→Broadcast ANR；Service前台20秒/后台200秒未完成→Service ANR。触发后弹ANR对话框（前台）或直接杀进程（后台）。本质是主线程被阻塞（耗时I/O/死循环/锁竞争）导致无法处理消息。",
    tags: ["ANR", "主线程阻塞", "Handler定时器", "超时监控"],
  },
];
