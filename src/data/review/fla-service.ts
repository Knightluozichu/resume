import type { ReviewQuestion } from "./types";

export const flaServiceQuestions: ReviewQuestion[] = [
  {
    id: "fla-sv-1",
    chapter: "fla-service",
    level: 2,
    question: "启动式Service和绑定式Service的生命周期有何不同？混合模式下何时销毁？",
    answer:
      "两种Service模式的生命周期：①启动式Service（startService）——onCreate()首次创建（只调一次）→onStartCommand()每次startService都调用（可多次）→运行中→stopService()或stopSelf()后→onDestroy()销毁。特点：独立于调用者运行，调用者销毁后Service继续运行，必须手动调用stopService/stopSelf才销毁。适合后台音乐播放/下载等独立后台任务。②绑定式Service（bindService）——onCreate()→onBind()返回IBinder给客户端→客户端通过Binder调用Service方法→所有客户端unbind后→onUnbind()→onDestroy()。特点：与调用者绑定，调用者可通过IBinder与Service双向通信；所有客户端都unbind后Service自动销毁。适合Activity需要与Service交互的场景。③混合模式（start+bind并存）——同一个Service既被startService启动又被bindService绑定。销毁条件：必须同时满足①调用了stopService/stopSelf（启动条件解除）且②所有客户端都unbind（绑定条件解除），两个条件都满足才调onDestroy。只满足一个不销毁。onStartCommand返回值控制重启行为：START_STICKY（杀后重建但intent为null）、START_NOT_STICKY（杀后不重建）、START_REDELIVER_INTENT（杀后重建并重传最后一个intent）。最佳实践：独立后台任务用startService，需要交互用bindService，需要两者用混合模式。",
    tags: ["Service", "启动式", "绑定式", "生命周期", "混合模式"],
  },
  {
    id: "fla-sv-2",
    chapter: "fla-service",
    level: 2,
    question: "前台Service是什么？为什么Android 8.0+推荐使用前台Service替代后台Service？",
    answer:
      "前台Service（Foreground Service）：通过startForeground(int id, Notification notification)将Service提升为前台优先级，同时必须显示一个持续性通知（用户可见）。前台Service拥有更高的系统优先级，系统在内存不足时不会轻易杀掉它（相比普通后台Service）。使用场景：音乐播放（通知栏显示播放控制）、文件下载（通知栏显示进度）、导航（通知栏显示导航信息）等用户可感知的后台任务。为什么Android 8.0+推荐前台Service：Android 8.0引入后台执行限制——①后台应用启动后台Service受限：后台App调用startService()抛IllegalStateException。②替代方案：后台App需用startForegroundService()启动Service，并在5秒内调用startForeground()显示通知（否则系统抛ANR并杀掉）。③后台Service被系统频繁杀死：为省电，系统会积极回收后台Service。前台Service通过显示通知「告知用户」正在运行后台任务，获得更高存活优先级。通知渠道（Android 8.0+）：创建前台Service通知必须先创建NotificationChannel（通知渠道），设置重要性等级，否则通知不显示。前台Service类型（Android 10+）：需在manifest声明foregroundServiceType（如mediaPlayback/dataSync/location），并在startForeground时指定类型。最佳实践：用户可感知的后台任务用前台Service+通知；不可感知的后台任务用WorkManager调度（系统统一管理，更省电）。",
    tags: ["前台Service", "startForeground", "Android 8.0", "后台限制", "通知"],
  },
  {
    id: "fla-sv-3",
    chapter: "fla-service",
    level: 3,
    question: "如何实现Activity与Service的双向通信？Binder机制如何工作？",
    answer:
      "Activity与Service通信的实现方式：①Binder对象方式（同进程）——Service中创建Binder内部类继承Binder或实现接口，onBind()返回该Binder实例。Activity在onServiceConnected(ComponentName, IBinder)回调中获取Binder引用，通过Binder调用Service的公开方法。步骤：Service中写public class LocalBinder extends Binder { MyService getService() { return MyService.this; } }，onBind返回new LocalBinder()。Activity中bindService(intent, connection, BIND_AUTO_CREATE)，ServiceConnection的onServiceConnected中强转IBinder为LocalBinder，调binder.getService()获取Service实例直接调方法。②Messenger方式（跨进程）——Service中创建Messenger(Handler)，onBind返回messenger.getBinder()。客户端通过Messenger发送Message到Service的Handler处理。单向通信（客户端→Service），如需双向则客户端也需创建Messenger并通过replyTo传递。③AIDL（跨进程复杂接口）——定义.aidl接口文件，编译器生成Stub和Proxy，支持复杂数据类型和方法调用。适合需要跨进程调用复杂接口的场景。Binder机制原理：Binder是Android的IPC（进程间通信）机制，基于内核的binder驱动。Service的Binder对象在内核中注册，客户端通过ServiceManager获取Binder代理（Proxy），方法调用通过binder驱动跨进程传递到Service进程执行。同进程时Binder调用直接走本地方法（无IPC开销），跨进程时走binder驱动序列化传输。",
    tags: ["Service通信", "Binder", "Messenger", "AIDL", "IPC"],
  },
  {
    id: "fla-sv-4",
    chapter: "fla-service",
    level: 1,
    question: "Android的通知机制是怎样的？NotificationChannel的作用是什么？",
    answer:
      "Android通知机制：①创建通知——用NotificationCompat.Builder(context, channelId)构建通知：setContentTitle(标题)、setContentText(内容)、setSmallIcon(必须设置，状态栏小图标)、setLargeIcon(大图标)、setContentIntent(点击跳转的PendingIntent)、setAutoCancel(点击后自动消失)。②发送通知——通过NotificationManager.notify(notificationId, notification)发送，notificationId用于更新或取消通知（相同ID覆盖）。③取消通知——NotificationManager.cancel(notificationId)或cancelAll()。NotificationChannel（Android 8.0+必须）：通知渠道是Android 8.0引入的通知分类管理机制。①必须创建——Android 8.0+不创建Channel则通知不显示（静默失败）。②创建方式——NotificationChannel channel = new NotificationChannel(id, name, importance)，配置描述/灯光/震动/声音，NotificationManager.createNotificationChannel(channel)。③重要性等级——IMPORTANCE_HIGH（横幅+声音+震动）、IMPORTANCE_DEFAULT（声音）、IMPORTANCE_LOW（状态栏无声音）、IMPORTANCE_MIN（最小化）。④用户控制——用户可在系统设置中按渠道单独开关通知、修改重要性，开发者无法覆盖用户设置。⑤渠道ID——Builder构造函数传入channelId，通知归属对应渠道。设计理念：让用户按功能分类管理通知（如「消息通知」「更新通知」分开控制），而非全开或全关。前台Service的通知也必须通过已创建的Channel发送。",
    tags: ["通知", "Notification", "NotificationChannel", "通知渠道", "PendingIntent"],
  },
];
