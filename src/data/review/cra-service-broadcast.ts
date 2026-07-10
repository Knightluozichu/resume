import type { ReviewQuestion } from "./types";

export const craServiceBroadcastQuestions: ReviewQuestion[] = [
  {
    id: "cra-sb-1",
    chapter: "cra-service-broadcast",
    level: 1,
    question: `Service的两种启动模式（startService和bindService）有什么区别？各自的生命周期是什么？`,
    answer:
      `启动式Service（startService）：调用方通过startService(intent)启动，生命周期回调：onCreate()（首次创建）→ onStartCommand(intent, flags, startId)（每次startService都触发）。特点：①调用方退出后Service继续独立运行，与调用方解耦。②需手动调用stopSelf()或stopService()停止。③适合后台音乐播放、文件下载等不需要与调用方交互的独立后台任务。绑定式Service（bindService）：调用方通过bindService(intent, connection, flags)绑定，生命周期回调：onCreate() → onBind(intent)（返回IBinder供调用方通信）。特点：①调用方通过IBinder接口与Service交互通信（调用Service方法、获取数据）。②所有绑定者都unbind后Service自动调用onUnbind → onDestroy销毁。③适合需要与Activity交互的后台服务（如后台播放器控制播放/暂停/进度）。混合模式：同一Service可同时被start和bind，需stopService+unbind都完成才销毁。onRebind在所有unbind后新客户端bind时调用。前台Service：Android 8.0+后台Service受限，需startForeground(id, Notification)显示通知栏避免被杀。`,
    tags: ["Service", "startService", "bindService", "生命周期", "IBinder", "前台Service"],
  },
  {
    id: "cra-sb-2",
    chapter: "cra-service-broadcast",
    level: 2,
    question: `Android广播机制有哪两种类型？动态注册和静态注册有什么区别？`,
    answer:
      `两种广播类型：①标准广播（Normal Broadcast）——通过sendBroadcast(intent)发送，异步执行，所有匹配的BroadcastReceiver几乎同时收到，无法截断、无法有序传递。效率高但不可控。②有序广播（Ordered Broadcast）——通过sendOrderedBroadcast(intent, permission)发送，按接收者的优先级（intent-filter的android:priority属性）从高到低链式传递，高优先级接收者可调用abortBroadcast()截断广播使低优先级收不到，也可通过setResultData修改数据传给下一个接收者。适合需要权限控制或数据处理的广播链。两种注册方式：①动态注册——在代码中registerReceiver(receiver, intentFilter)，跟随注册组件的生命周期，必须在onDestroy中unregisterReceiver释放，否则内存泄漏。灵活性高，可随时注册/注销。②静态注册——在AndroidManifest的\`<receiver>\`标签中声明intent-filter，App未启动也能收广播。Android 8.0+大部分系统广播（BOOT_COMPLETED等少数除外）不允许静态注册，只能动态注册，以省电。自定义广播通过intent.setAction设置action标识。`,
    tags: ["Broadcast", "标准广播", "有序广播", "动态注册", "静态注册", "Android 8.0"],
  },
  {
    id: "cra-sb-3",
    chapter: "cra-service-broadcast",
    level: 2,
    question: `如何实现一个后台音乐播放Service？如何与Activity交互控制播放？`,
    answer:
      `后台音乐播放Service实现：①创建MusicService继承Service，在onCreate中初始化MediaPlayer（create/setDataSource/prepare），在onStartCommand中根据intent的action控制播放（播放/暂停/停止/上一首/下一首）。②前台Service：Android 8.0+需在onStartCommand中调用startForeground(id, notification)显示通知栏，避免被系统杀死。通知中可加PendingIntent点击跳回播放界面。③与Activity交互用bindService：在MusicService的onBind中返回IBinder（自定义Binder子类，持有MusicService引用，暴露getCurrentPosition/setSeekTo等方法）。④Activity通过ServiceConnection.onServiceConnected获取IBinder，强转为自定义Binder，调用Service方法控制播放和获取状态。⑤Activity通过Handler定时调用binder.getCurrentPosition()更新进度条，或Service发送广播通知进度变化。⑥需在AndroidManifest注册Service，声明android.permission.FOREGROUND_SERVICE权限（Android 9.0+）。⑦MediaPlayer资源管理：stop后需prepare才能重新start，Activity销毁或Service销毁时调用release()释放MediaPlayer资源。`,
    tags: ["Service", "MediaPlayer", "bindService", "前台Service", "音乐播放", "IBinder", "实战"],
  },
  {
    id: "cra-sb-4",
    chapter: "cra-service-broadcast",
    level: 3,
    question: `如何使用Android电话和短信API？需要哪些权限？如何接收短信？`,
    answer:
      `电话API：①TelephonyManager——通过getSystemService(TELEPHONY_SERVICE)获取，提供getDeviceId（设备ID）、getLine1Number（本机号码）、getNetworkOperatorName（运营商）、getCallState（通话状态）等方法。需声明READ_PHONE_STATE权限。②监听来电状态——\`telephonyManager.listen(new PhoneStateListener() { onCallStateChanged(state, number) })\`，state为RINGING（响铃）/OFFHOOK（接通）/IDLE（挂断）。③拨打电话——通过Intent.ACTION_CALL + Uri.parse(\"tel:号码\") 启动系统拨号，需CALL_PHONE权限。短信API：①发送短信——SmsManager.getDefault().sendTextMessage(destAddr, scAddr, text, sentIntent, deliverIntent)，destAddr是目标号码，sentIntent是发送成功回调，deliverIntent是对方接收回调。需SEND_SMS权限。②接收短信——创建BroadcastReceiver监听SMS_RECEIVED广播，在onReceive中从intent.getExtras()取出Object[] pdus数组，每个pdu通过SmsMessage.createFromPdu((byte[])pdu)解析为SmsMessage，获取getOriginatingAddress（发送方号码）和getMessageBody（短信内容）。需RECEIVE_SMS权限。Android 6.0+需运行时动态申请危险权限（SEND_SMS/RECEIVE_SMS/READ_PHONE_STATE）。`,
    tags: ["电话", "短信", "TelephonyManager", "SmsManager", "权限", "SMS_RECEIVED"],
  },
];
