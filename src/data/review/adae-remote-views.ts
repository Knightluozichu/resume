import type { ReviewQuestion } from "./types";

export const adaeRemoteViewsQuestions: ReviewQuestion[] = [
  {
    id: "adae-rv-1",
    chapter: "adae-remote-views",
    level: 2,
    question: "RemoteViews的工作原理是什么？为什么它不支持自定义View？",
    answer:
      "RemoteViews的本质是「View操作的序列化」，用于跨进程更新UI（通知栏、桌面Widget运行在SystemServer进程而非App进程）：①构造——RemoteViews(packageName, layoutId)并不真正加载布局，而是记录布局id和一系列setXxx操作（如setTextViewText），每个操作封装成一个Action对象。②跨进程传递——通过NotificationManager.notify或AppWidgetManager.updateAppWidget，RemoteViews作为Parcelable跨进程传到SystemServer（NotificationManagerService/AppWidgetService所在进程）。③回放——目标进程用LayoutInflater真正inflate布局id得到真实View，然后遍历Action列表逐个apply：用反射调用对应View的方法（如TextView.setText）把值设上去。④为什么不支持自定义View——回放发生在SystemServer进程，该进程无法加载App的自定义View类（类加载器隔离、安全限制），所以RemoteViews只能用系统内置View（TextView/ImageView/Button等）。setXxx也只暴露有限的系统View方法，本质是通过反射在固定白名单内操作，保证跨进程安全可控。",
    tags: ["RemoteViews", "跨进程", "Action", "反射", "SystemServer"],
  },
  {
    id: "adae-rv-2",
    chapter: "adae-remote-views",
    level: 1,
    question: "如何使用NotificationCompat.Builder发送一条带点击事件的通知？",
    answer:
      "发送通知步骤：①创建通知渠道（Android 8.0+必需）——NotificationChannel channel = new NotificationChannel(id, name, importance)；channel.setDescription(...); manager.createNotificationChannel(channel)。②构建通知——NotificationCompat.Builder(context, channelId).setSmallIcon(R.mipmap.ic_launcher)（必需，状态栏小图标）.setContentTitle(标题).setContentText(内容).setContentIntent(pendingIntent)（点击跳转）.setAutoCancel(true)（点击后消失）.build()。③PendingIntent处理点击——因为通知运行在SystemServer进程，点击要在App进程执行，必须用PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT)封装Intent，系统会在点击时代替App启动。④发送——manager.notify(notificationId, notification)，notificationId用于后续更新或取消（manager.cancel(id)）。⑤注意：setContentIntent的PendingIntent是跨进程的「延迟Intent」，这是RemoteViews机制的关键，普通Intent无法跨进程触发。",
    tags: ["Notification", "NotificationChannel", "PendingIntent", "通知"],
  },
  {
    id: "adae-rv-3",
    chapter: "adae-remote-views",
    level: 2,
    question: "AppWidget桌面小部件的工作机制是怎样的？如何实现复杂列表Widget？",
    answer:
      "AppWidget运行在桌面Launcher进程（非App进程），用RemoteViews更新：①核心组件——AppWidgetProvider（继承BroadcastReceiver，接收 onUpdate/onEnabled/onDisabled/onDeleted 等广播）、AppWidgetProviderInfo（XML声明Widget的布局/更新周期/尺寸/minWidth等）。②注册——在manifest的receiver声明AppWidgetProvider，meta-data指向xml/appwidget_info。③更新流程——系统按updatePeriodMillis定时（最小30分钟）或手动调AppWidgetManager.updateAppWidget发送RemoteViews，RemoteViews跨进程到Launcher进程回放刷新。④onUpdate在每次刷新时被调用，在里面构造RemoteViews并setXxx设置各控件。⑤复杂列表Widget——普通RemoteViews不支持ListView/GridView的可滚动列表（因为列表数据也要跨进程），需用RemoteViewsService+RemoteViewsFactory：RemoteViewsFactory提供列表数据（getCount/getViewAt），RemoteViewsService包装Factory，通过setRemoteAdapter把Service绑定到RemoteViews的ListView，系统跨进程拉取每项数据。点击用setOnClickFillInIntent设模板Intent。这套机制让Widget能展示可滚动的列表。",
    tags: ["AppWidget", "AppWidgetProvider", "RemoteViewsService", "桌面小部件"],
  },
  {
    id: "adae-rv-4",
    chapter: "adae-remote-views",
    level: 2,
    question: "RemoteViews和普通View的区别是什么？它的应用场景有哪些局限？",
    answer:
      "RemoteViews与普通View的区别：①运行进程——普通View运行在App自己的进程，RemoteViews「构造」在App进程但「显示/回放」在SystemServer或Launcher进程。②操作方式——普通View直接持引用调方法（textView.setText），RemoteViews通过setXxx记录操作再跨进程反射回放，不能直接操作View实例。③支持的View——普通View支持任意自定义View，RemoteViews仅支持系统内置View（TextView/ImageView/ProgressBar等白名单）。④交互——普通View用OnClickListener，RemoteViews用PendingIntent（因为点击需跨进程回到App执行）。应用场景局限：①只能展示简单UI，复杂自定义绘制做不了。②不支持实时频繁更新（Widget最小30分钟周期，通知也有限流）。③数据传递受Parcelable限制，大对象难传。④事件只能用PendingIntent启动组件，无法做精细的实时回调。本质是「用受限换跨进程安全」，适合通知栏、桌面Widget这类系统级UI场景。",
    tags: ["RemoteViews", "普通View", "PendingIntent", "局限"],
  },
];
