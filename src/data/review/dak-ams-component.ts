import type { ReviewQuestion } from "./types";

export const dakAmsComponentQuestions: ReviewQuestion[] = [
  {
    id: "dak-ams-1",
    chapter: "dak-ams-component",
    level: 1,
    question: "AMS如何统一调度四大组件？各组件的调度机制分别是什么？",
    answer: "AMS运行在system_server中，是四大组件统一调度中心。①Activity——AMS用Task（回退栈）管理，startActivity时创建ActivityRecord，通过IApplicationThread.scheduleLaunchActivity通知App创建并回调生命周期。launchMode控制实例创建（standard/singleTop/singleTask/singleInstance）。②Service——两种模式：startService启动式（onCreate→onStartCommand，无直接通信，stopService停止）和bindService绑定式（onCreate→onBind返回IBinder，调用方通过Binder调用Service方法，所有unbind后销毁）。③Broadcast——AMS维护BroadcastQueue，普通广播异步分发所有Receiver，有序广播按priority依次分发可中断。静态注册在PMS解析时注册，动态注册运行时registerReceiver。④ContentProvider——PMS解析APK发现provider声明注册到AMS，Client访问时AMS查找发布进程，未启动则fork新进程，publish超时10s触发ANR。",
    tags: ["AMS", "四大组件", "Activity栈", "Service", "Broadcast", "ContentProvider"],
  },
  {
    id: "dak-ams-2",
    chapter: "dak-ams-component",
    level: 2,
    question: "OOM Adj进程优先级机制是什么？LowMemoryKiller如何工作？",
    answer: "OOM Adj是Android进程优先级数值，决定LowMemoryKiller回收顺序，adj值越小优先级越高越不容易被杀。五级：①前台进程（adj约0）——运行与用户交互的Activity（onResume）、运行BroadcastReceiver.onReceive()、执行Service.onStartCommand()、绑定前台Activity的Service；②可见进程（adj约100）——可见但非前台的Activity；③服务进程（adj约500）——运行startService启动的Service；④缓存进程（adj约900）——不可见的Activity按LRU缓存；⑤空进程（adj约1000）——无组件运行的空进程。AMS动态调整：Activity进入前台adj降为0、进入后台升为缓存、Service启动升为服务进程。LowMemoryKiller是Linux内核机制：监听内存水位，内存不足时从adj最大进程开始杀释放内存，保护adj最小的前台进程。这是主动内存管理策略，比等OOM被动回收更高效。",
    tags: ["OOM Adj", "LowMemoryKiller", "进程优先级", "内存回收"],
  },
  {
    id: "dak-ams-3",
    chapter: "dak-ams-component",
    level: 2,
    question: "Service的startService和bindService两种模式有什么区别？",
    answer: "区别：①startService（启动式）——调用context.startService(intent)触发onCreate→onStartCommand。调用方与Service无直接通信通道，Service独立运行。需stopService或Service内部stopSelf停止，所有startService对应的stopService调用后Service才销毁。适合后台独立运行的任务如音乐播放/下载。②bindService（绑定式）——调用context.bindService(intent, conn, BIND_AUTO_CREATE)触发onCreate→onBind返回IBinder。调用方通过ServiceConnection.onServiceConnected获得IBinder，可直接调用Service方法（跨进程通过AIDL）。多个客户端可同时绑定，所有绑定方unbindService后Service销毁（onUnbind→onDestroy）。适合组件间通信。③混合模式——Service可同时被start和bind，需stopService+所有unbindService同时满足才销毁。AMS调度时：未启动则通过Zygote fork新进程，bindService时AMS传递Binder给调用方。",
    tags: ["Service", "startService", "bindService", "AIDL"],
  },
  {
    id: "dak-ams-4",
    chapter: "dak-ams-component",
    level: 3,
    question: "AMS维护哪些核心数据结构？startActivity的调度流程是什么？",
    answer: "核心数据结构：①ProcessRecord——每个App进程对应一个，含pid/uid/processName、adj（OOM Adj值）、activities（所有Activity）、services、receivers、thread（IApplicationThread Binder代理）；②ActivityRecord——每个Activity实例对应一个，含intent、state（RESUMED/PAUSED/STOPPED等）、task（所属TaskRecord）、app（所属ProcessRecord）；③TaskRecord——一个Task（回退栈），含stack（所属ActivityStack）、mActivities（Activity列表，栈结构）；④ActivityStack——管理所有Task，含mTaskHistory、mLastPausedActivity。startActivity调度流程：①App调用startActivity→通过Binder调用AMS.startActivity；②AMS创建/查找ActivityRecord，检查launchMode决定是否新建实例；③AMS检查目标进程是否存在——不存在则通过Socket通知Zygote fork新进程，新进程attachApplication注册到AMS（创建ProcessRecord）；④AMS通过ProcessRecord.thread调用scheduleLaunchActivity，通过Binder传递Activity信息给App；⑤App进程ActivityThread通过Handler在主线程处理，创建Activity实例，回调onCreate→onStart→onResume；⑥AMS更新ActivityStack将新Activity压入栈顶。",
    tags: ["ProcessRecord", "ActivityRecord", "TaskRecord", "startActivity", "调度流程"],
  },
];
