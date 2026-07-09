import type { ReviewQuestion } from "./types";

export const apoCpuPowerQuestions: ReviewQuestion[] = [
  {
    id: "apo-cp-1",
    chapter: "apo-cpu-power",
    level: 2,
    question: "为什么 CPU 密集型任务的线程数不应超过 CPU 核心数？而 IO 密集型可以更多？",
    answer:
      "CPU密集型任务（排序、编解码、加密）持续占用CPU计算，如果线程数超过核心数，多个线程争抢CPU时间片导致频繁上下文切换。每次切换需保存/恢复寄存器、刷新TLB（约1-10微秒），累积开销显著。线程数=核心数时每个线程独占一个核心无切换开销，线程数=核心数+1是因为偶发页面中断或短时阻塞需要备用线程。IO密集型任务（网络请求、文件读写）大部分时间在等待IO完成CPU空闲，此时切换到其他线程执行可提高CPU利用率。线程数=核心数*2（或更多上限64）是因为IO等待期间CPU可服务其他线程，等待不产生上下文切换开销（线程主动让出CPU）。总结：CPU密集型线程数受限于核心数（争抢CPU），IO密集型线程数受限于IO等待（利用空闲CPU）。协程中Dispatchers.Default=CPU密集型，Dispatchers.IO=IO密集型。",
    tags: ["线程池", "CPU密集型", "IO密集型", "上下文切换"],
  },
  {
    id: "apo-cp-2",
    chapter: "apo-cpu-power",
    level: 3,
    question: "Doze 模式对后台任务有什么限制？如何正确适配？",
    answer:
      "Doze模式限制：①息屏+静止+不充电时进入Doze ②标准Alarm被延迟到「维护窗口」执行（间隔逐渐拉长从几分钟到几小时）③网络访问被暂停只有维护窗口期间允许 ④SyncAdapter被延迟 ⑤GPS/传感器暂停 ⑥前台Service不受影响。正确适配：①高优先级消息用FCM high priority消息（可穿透Doze）②定时任务用AlarmManager.setAndAllowWhileIdle()（每个Doze周期允许触发一次约9分钟一次）或setExactAndAllowWhileIdle() ③后台任务用WorkManager底层用JobScheduler自动适配Doze支持设置网络/充电约束 ④批量化网络请求在维护窗口内一次性完成 ⑤避免频繁Alarm唤醒 ⑥用FCM data message替代轮询 ⑦测试：adb shell dumpsys deviceidle force-idle强制进入Doze。WorkManager是Jetpack推荐的后台任务方案自动适配Doze。",
    tags: ["Doze模式", "JobScheduler", "WorkManager", "后台任务"],
  },
  {
    id: "apo-cp-3",
    chapter: "apo-cpu-power",
    level: 3,
    question: "WakeLock 泄漏会导致什么问题？如何避免？给出一个安全使用模式。",
    answer:
      "WakeLock泄漏导致设备CPU持续唤醒无法进入休眠严重耗电（可能一天耗尽电量）。常见泄漏原因：①acquire后因异常未执行release ②acquire未设超时 ③多次acquire只release一次 ④Activity/Service销毁时未release。安全使用模式：①始终使用带超时的acquire(timeout)即使忘记release也会自动释放wakeLock.acquire(60_000L) ②在try-finally中确保release：try { doWork() } finally { if (wakeLock.isHeld) wakeLock.release() } ③检查isHeld再release（重复release抛异常）④优先用WorkManager替代手动WakeLock，WorkManager内部管理WakeLock ⑤在Service.onDestroy中release ⑥用计数引用管理多次acquire。最佳实践：现代Android开发尽量不用手动WakeLock改用WorkManager或ForegroundService。",
    tags: ["WakeLock", "泄漏", "功耗", "release"],
  },
  {
    id: "apo-cp-4",
    chapter: "apo-cpu-power",
    level: 4,
    question: "如何用 Battery Historian 分析 App 耗电问题？描述完整流程。",
    answer:
      "完整流程：①重置电池统计adb shell dumpsys batterystats --reset ②断开USB（充电状态影响统计），操作App复现耗电场景（如后台运行30分钟）③重新连接USB导出bugreport：adb bugreport bugreport.zip ④上传到Battery Historian（https://bathist.ef.lc/或本地Docker）⑤分析报告：a)查看电池电量曲线下降速率 b)查看wake_lock行确认WakeLock持有时间是否过长 c)查看mobile_radio_active行确认网络模块唤醒频率 d)查看CPU频率分布确认异常高频 e)查看GPS/传感器使用时间 f)查看App前后台切换 ⑥定位问题：如wake_lock持续30分钟说明WakeLock泄漏；mobile_radio_active每分钟唤醒一次说明网络请求过于频繁 ⑦优化后重新测试对比。关键指标：耗电速率（%/h）、唤醒次数/小时、网络激活时长。主要耗电源排序：CPU（唤醒频率）>网络（无线模块）>屏幕>GPS>传感器。",
    tags: ["Battery Historian", "耗电分析", "wake_lock", "bugreport"],
  },
];
