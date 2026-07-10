import type { ReviewQuestion } from "./types";

export const aalAmsPmsQuestions: ReviewQuestion[] = [
  {
    id: "aal-ap-1",
    chapter: "aal-ams-pms",
    level: 1,
    question: `AMS（Activity Manager Service）的核心职责有哪些？它在Android系统中扮演什么角色？`,
    answer: `AMS是Android系统的核心调度服务，运行在system_server进程中，核心职责：①统一调度四大组件——管理Activity、Service、BroadcastReceiver、ContentProvider的生命周期和调度；②Activity栈管理——维护Task和Back Stack，管理Activity的启动、切换、销毁，处理启动模式（standard/singleTop/singleTask/singleInstance）；③进程管理——根据组件状态计算进程优先级（OOM Adj），决定进程在内存不足时被回收的顺序，配合LowMemoryKiller杀进程；④内存管理——响应系统内存压力，通过onTrimMemory通知应用释放资源，清理空进程和缓存进程；⑤Intent路由——解析Intent，匹配目标Activity/Service/Receiver，处理隐式Intent的组件查找。AMS扮演「大管家」角色，是App进程与系统之间的桥梁，所有组件的创建、调度、销毁都由AMS控制。`,
    tags: ["AMS", "四大组件", "Activity栈", "进程管理"]
  },
  {
    id: "aal-ap-2",
    chapter: "aal-ams-pms",
    level: 2,
    question: `Activity的启动流程是怎样的？从startActivity到Activity显示的完整链路是什么？`,
    answer: `Activity启动流程：①App调用startActivity() → Instrumentation.execStartActivity()；②通过Binder向AMS发送startActivity请求（跨进程）；③AMS收到请求，进行权限检查和Intent匹配，找到目标Activity；④AMS检查目标进程是否存在——如果不存在，通过Socket通知Zygote fork新进程；⑤新进程创建后，在ActivityThread.main()中初始化Looper和Application，通过attachApplication()告知AMS；⑥AMS发送scheduleLaunchActivity()给目标进程的ApplicationThread（Binder回调）；⑦目标进程的ActivityThread收到消息，通过Handler切换到主线程；⑧创建Activity实例，调用attach()→onCreate()→onStart()→onResume()；⑨通过WindowManager添加窗口（DecorView），ViewRootImpl开始measure/layout/draw，SurfaceFlinger合成显示。整个过程涉及App进程、AMS（system_server）、Zygote三个进程的协作。`,
    tags: ["Activity启动", "startActivity", "AMS", "Zygote", "生命周期"]
  },
  {
    id: "aal-ap-3",
    chapter: "aal-ams-pms",
    level: 2,
    question: `PMS（Package Manager Service）的核心职责有哪些？APK安装的完整流程是什么？`,
    answer: `PMS核心职责：①APK包解析——解析AndroidManifest.xml提取包名、组件信息、权限声明；②权限管理——检查权限声明、动态权限请求、权限授予状态维护；③组件信息维护——维护全局的Activity/Service/Receiver/Provider注册表，供AMS查询；④签名校验——验证APK签名完整性（v1/v2/v3签名方案）；⑤包安装/卸载/更新——通过PackageInstaller管理安装流程。APK安装完整流程：①复制APK到/data/app/目录；②PMS调用PackageParser解析APK——解析AndroidManifest.xml、提取dex和资源；③签名校验——验证APK签名完整性；④dex2oat编译——将classes.dex编译为OAT/VDEX（AOT预编译）；⑤更新PMS内部数据结构——将PackageInfo存入内存缓存，注册组件信息；⑥创建数据目录——/data/data/<packageName>/；⑦通知安装完成——发送ACTION_PACKAGE_ADDED广播。安装完成后PackageManager API可以查询到新安装的应用。`,
    tags: ["PMS", "APK安装", "包解析", "权限管理", "签名校验"]
  },
  {
    id: "aal-ap-4",
    chapter: "aal-ams-pms",
    level: 3,
    question: `Android的进程优先级（OOM Adj）是如何划分的？AMS如何利用它进行内存回收？`,
    answer: `Android进程优先级（OOM Adj）从高到低：①前台进程（foreground，adj≈0）——包含正在交互的Activity、正在执行onReceive的BroadcastReceiver、前台Service；②可见进程（visible，adj≈100）——Activity可见但非前台（如弹窗遮挡）；③服务进程（service，adj≈500）——运行startService启动的后台Service；④缓存进程（cached，adj≈900）——没有可见组件的进程，持有Activity但不可见。AMS内存回收机制：①系统内存不足时，LowMemoryKiller根据OOM Adj值从高到低杀进程，先杀cached进程，再杀service，最后才杀visible/foreground；②AMS通过updateOomAdjLocked()动态调整进程的OOM Adj——组件状态变化时（如Activity从可见变为不可见）立即更新；③onTrimMemory回调——AMS在内存压力时通过IApplicationThread回调onTrimMemory(level)，level从TRIM_MEMORY_RUNNING_LOW到TRIM_MEMORY_COMPLETE逐级递增，应用可主动释放资源避免被杀；④空进程清理——完全没有任何组件运行的进程（空进程）会被优先清理，但保留以提高下次启动速度。`,
    tags: ["OOM Adj", "进程优先级", "LowMemoryKiller", "内存回收"]
  }
];
