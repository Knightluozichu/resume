import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第10章 Service和BroadcastReceiver",
  "10.1 Service简介",
  "10.1.1 创建、配置Service",
  "10.1.2 启动和停止Service",
  "10.1.3 绑定本地Service并与之通信",
  "10.1.4 Service的生命周期",
  "10.1.5 使用IntentService",
  "10.2 跨进程调用Service（AIDL Service）",
  "10.2.1 AIDL Service简介",
  "10.2.2 创建AIDL文件",
  "10.2.3 将接口暴露给客户端",
  "10.2.4 客户端访问AIDL Service",
  "实例：传递复杂数据的AIDL Service",
  "10.3 电话管理器（TelephonyManager）",
  "实例：获取网络和SIM卡信息",
  "实例：监听手机来电",
  "10.4 短信管理器（SmsManager）",
  "实例：发送短信",
  "实例：短信群发",
  "10.5 音频管理器（AudioManager）",
  "10.5.1 AudioManager简介",
  "10.5.2 实例：使用AudioManager控制手机音频",
  "10.6 振动器（Vibrator）",
  "10.6.1 Vibrator简介",
  "10.6.2 使用Vibrator控制手机振动",
  "10.7 手机闹钟服务（AlarmManager）",
  "10.7.1 AlarmManager简介",
  "10.7.2 设置闹钟",
  "10.8 广播接收器",
  "10.8.1 BroadcastReceiver简介",
  "10.8.2 发送广播",
  "10.8.3 有序广播",
  "实例：基于Service的音乐播放器",
  "10.9 接收系统广播消息",
  "实例：开机自动运行的Activity",
  "实例：手机电量提示",
  "10.10 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第10章 Service和BroadcastReceiver" focus="比较启动/绑定/AIDL Service与BroadcastReceiver，验证系统服务、闹钟、广播和后台音乐的生命周期" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第10章 Service和BroadcastReceiver" focus="比较启动/绑定/AIDL Service与BroadcastReceiver，验证系统服务、闹钟、广播和后台音乐的生命周期" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第10章 Service和BroadcastReceiver" focus="Service/Receiver状态机、Binder调用记录、广播权限、后台限制与资源释放证据" nodes={nodes} />; }
