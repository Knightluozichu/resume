import type { ReviewQuestion } from "./types";

export const flaBroadcastQuestions: ReviewQuestion[] = [
  {
    id: "fla-bc-1",
    chapter: "fla-broadcast",
    level: 2,
    question: "标准广播和有序广播的区别是什么？各自的发送方式和接收流程是怎样的？",
    answer:
      "标准广播（Normal Broadcast）vs有序广播（Ordered Broadcast）：①标准广播——sendBroadcast(intent)发送。特点：完全异步，所有匹配的接收者几乎同时收到广播，无法被截断，无法控制顺序，效率高。接收者之间互不影响。②有序广播——sendOrderedBroadcast(intent, permission)发送。特点：按优先级（priority）从高到低依次传递给接收者，高优先级接收者可以先处理并可修改广播数据（setResultData）传给下一个，也可调用abortBroadcast()截断广播使低优先级接收者收不到。priority在intent-filter中设置android:priority=\"100\"，数值越大优先级越高（-1000到1000）。接收流程：①系统根据Intent的action匹配所有注册的BroadcastReceiver。②标准广播：所有匹配的接收者的onReceive()几乎同时被调用（在各自线程或主线程）。③有序广播：按priority排序，最高优先级的接收者先收到onReceive()，处理完后传递给下一个。最终接收者（sendOrderedBroadcast的finalReceiver参数）无论是否被截断都会收到。选型：需要所有接收者同时收到且不在乎顺序→标准广播；需要按优先级处理或可能截断→有序广播。安全建议：发送广播时指定权限（sendBroadcast(intent, permission)）限制接收者，或用LocalBroadcastManager只在应用内传递（更安全高效，不跨进程）。",
    tags: ["广播", "标准广播", "有序广播", "sendBroadcast", "优先级"],
  },
  {
    id: "fla-bc-2",
    chapter: "fla-broadcast",
    level: 2,
    question: "广播的动态注册和静态注册有什么区别？Android 8.0后对静态注册有什么限制？",
    answer:
      "动态注册 vs静态注册：①动态注册——在代码中用registerReceiver(receiver, intentFilter)注册，在onDestroy或onStop中用unregisterReceiver(receiver)注销。特点：跟随注册组件的生命周期，组件销毁必须注销否则内存泄漏；可以随时注册和注销，灵活控制监听时机；能收到大部分广播（包括大多数隐式广播）。②静态注册——在AndroidManifest.xml中用<receiver android:name=\".MyReceiver\"><intent-filter><action android:name=\"...\"/></intent-filter></receiver>声明。特点：App安装后即生效，无需运行即可接收广播（甚至App未启动时系统会启动App接收）；但Android 8.0（API 26）起，大部分隐式广播不再允许静态注册——系统为省电限制后台唤醒，只有少数豁免广播（如BOOT_COMPLETED开机完成、LOCALE_CHANGED语言变更、USB设备连接等）仍可静态注册。Android 8.0后的影响：原来用静态注册监听网络变化（CONNECTIVITY_CHANGE）、拍照（NEW_PICTURE）等隐式广播的方式不再生效，需改为动态注册或用WorkManager/JobScheduler轮询。最佳实践：①需要App运行时才监听的广播→动态注册（注意注销）。②必须App未启动也接收的少数豁免广播→静态注册（如开机自启动）。③只在应用内通信→LocalBroadcastManager（不跨进程，安全高效）。④动态注册的receiver在Activity/Service的onDestroy中务必unregisterReceiver，否则内存泄漏。",
    tags: ["广播注册", "动态注册", "静态注册", "Android 8.0限制"],
  },
  {
    id: "fla-bc-3",
    chapter: "fla-broadcast",
    level: 3,
    question: "BroadcastReceiver的onReceive()有什么执行限制？如何在广播接收者中执行耗时操作？",
    answer:
      "onReceive()的执行限制：系统给每个广播接收者的onReceive()分配的执行时间约为10秒（实际更短，ANR阈值），超过则系统认为无响应（ANR）并可能杀掉进程。因此onReceive()中不能执行耗时操作（网络请求/文件IO/数据库大量操作/休眠等）。onReceive()运行在主线程（注册时的组件线程，通常是主线程），不能直接做网络请求（NetworkOnMainThreadException）。耗时操作的正确处理方式：①启动Service——在onReceive()中启动一个Service（startService或startForegroundService），把耗时操作放到Service中执行。但注意Android 8.0+后台启动Service受限，需用startForegroundService并在5秒内调startForeground显示通知。②goAsync()——调用PendingResult goAsync = goAsync()获取异步处理权限，在子线程中执行操作，完成后调goAsync.finish()。这给了最多10秒的异步处理时间（从onReceive返回开始计时），适合短耗时操作（如数据库查询）。③scheduleJob——用JobScheduler或WorkManager调度后台任务，不阻塞onReceive。④注意事项——onReceive返回后BroadcastReceiver对象可能被销毁，不能在异步线程中持有receiver引用；静态内部类或弱引用避免泄漏。最佳实践：onReceive()只做轻量操作（解析Intent数据/启动Service/更新UI通知），耗时逻辑全部委托给Service或WorkManager。",
    tags: ["BroadcastReceiver", "onReceive", "ANR", "goAsync", "耗时操作"],
  },
  {
    id: "fla-bc-4",
    chapter: "fla-broadcast",
    level: 1,
    question: "常见的系统广播有哪些？如何实现开机自启动功能？",
    answer:
      "常见系统广播（action常量）：①BOOT_COMPLETED——开机完成后发送（android.intent.action.BOOT_COMPLETED），需RECEIVE_BOOT_COMPLETED权限，是最常用的开机自启动广播。②CONNECTIVITY_CHANGE——网络连接变化（android.net.conn.CONNECTIVITY_CHANGE），Android 7.0+需动态注册。③BATTERY_LOW/BATTERY_OKAY——电量低/电量恢复。④SCREEN_ON/SCREEN_OFF——屏幕亮起/关闭。⑤PACKAGE_ADDED/REMOVED——应用安装/卸载（需监听包变化）。⑥android.intent.action.TIME_TICK——每分钟发送一次（只能动态注册）。开机自启动实现步骤：①声明权限——在AndroidManifest中<uses-permission android:name=\"android.permission.RECEIVE_BOOT_COMPLETED\"/>。②静态注册接收者——<receiver android:name=\".BootReceiver\"><intent-filter><action android:name=\"android.intent.action.BOOT_COMPLETED\"/></intent-filter></receiver>。③实现BroadcastReceiver——public class BootReceiver extends BroadcastReceiver { onReceive(Context, Intent) { if (Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction()) { startActivity启动主Activity或startService启动后台服务 } } }。④Android 8.0+限制——BOOT_COMPLETED属于豁免广播，仍可静态注册。但启动后若要运行后台Service需用startForegroundService并显示通知。注意：开机自启动从Android 10开始受限——App需安装后至少手动启动一次（或用户在设置中允许），否则开机广播可能收不到。这是Google的安全策略，防止恶意App安装后偷偷自启。",
    tags: ["系统广播", "BOOT_COMPLETED", "开机自启动", "权限"],
  },
];
