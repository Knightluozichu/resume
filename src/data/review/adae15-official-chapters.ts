import type { ReviewQuestion } from "./types";

export const adae15OfficialChapterQuestions: ReviewQuestion[] = [
  {
    "id": "adae15-official-learning-map-q1",
    "chapter": "adae15-official-learning-map",
    "level": 1,
    "question": "“《Android开发艺术探索》权威学习地图”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖15个节点，从“第1章 Activity的生命周期和启动模式”到“第15章 Android性能优化”；主线是沿Android 5.0源码与应用层边界串联Activity、IPC、View、跨进程UI、框架内部、线程、缓存、JNI和性能，证据为15章173节点矩阵、框架调用图、实验路线、版本迁移账本和全书验收表。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-official-learning-map-q2",
    "chapter": "adae15-official-learning-map",
    "level": 2,
    "question": "怎样为“《Android开发艺术探索》权威学习地图”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存15章173节点矩阵、框架调用图、实验路线、版本迁移账本和全书验收表。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-official-learning-map-q3",
    "chapter": "adae15-official-learning-map",
    "level": 3,
    "question": "“《Android开发艺术探索》权威学习地图”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把15章压成生命周期、Binder、View、Handler和性能几个概览，遗漏完整机制链”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-official-learning-map-q4",
    "chapter": "adae15-official-learning-map",
    "level": 3,
    "question": "为什么“《Android开发艺术探索》权威学习地图”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-official-learning-map-q5",
    "chapter": "adae15-official-learning-map",
    "level": 4,
    "question": "“《Android开发艺术探索》权威学习地图”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-official-learning-map-q6",
    "chapter": "adae15-official-learning-map",
    "level": 4,
    "question": "“《Android开发艺术探索》权威学习地图”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和15章173节点矩阵、框架调用图、实验路线、版本迁移账本和全书验收表。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-01-activity-lifecycle-launch-mode-q1",
    "chapter": "adae15-01-activity-lifecycle-launch-mode",
    "level": 1,
    "question": "“第1章 Activity的生命周期和启动模式”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖8个节点，从“第1章 Activity的生命周期和启动模式”到“1.3 IntentFilter的匹配规则”；主线是从典型与异常生命周期、LaunchMode、Flags和IntentFilter建立Activity任务栈与状态恢复模型，证据为生命周期轨迹、任务栈快照、重建状态、启动矩阵和Intent匹配测试。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-01-activity-lifecycle-launch-mode-q2",
    "chapter": "adae15-01-activity-lifecycle-launch-mode",
    "level": 2,
    "question": "怎样为“第1章 Activity的生命周期和启动模式”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存生命周期轨迹、任务栈快照、重建状态、启动矩阵和Intent匹配测试。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-01-activity-lifecycle-launch-mode-q3",
    "chapter": "adae15-01-activity-lifecycle-launch-mode",
    "level": 3,
    "question": "“第1章 Activity的生命周期和启动模式”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把onDestroy当作必然回调，或把启动模式与Intent Flags混为同一层配置”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-01-activity-lifecycle-launch-mode-q4",
    "chapter": "adae15-01-activity-lifecycle-launch-mode",
    "level": 3,
    "question": "为什么“第1章 Activity的生命周期和启动模式”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-01-activity-lifecycle-launch-mode-q5",
    "chapter": "adae15-01-activity-lifecycle-launch-mode",
    "level": 4,
    "question": "“第1章 Activity的生命周期和启动模式”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-01-activity-lifecycle-launch-mode-q6",
    "chapter": "adae15-01-activity-lifecycle-launch-mode",
    "level": 4,
    "question": "“第1章 Activity的生命周期和启动模式”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和生命周期轨迹、任务栈快照、重建状态、启动矩阵和Intent匹配测试。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-02-ipc-q1",
    "chapter": "adae15-02-ipc",
    "level": 1,
    "question": "“第2章 IPC机制”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖18个节点，从“第2章 IPC机制”到“2.6 选用合适的IPC方式”；主线是比较多进程状态隔离、Serializable、Parcelable、Binder及六种IPC通道，并用Binder连接池管理服务，证据为进程边界图、序列化样本、Binder线程记录、故障矩阵、连接池和选型表。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-02-ipc-q2",
    "chapter": "adae15-02-ipc",
    "level": 2,
    "question": "怎样为“第2章 IPC机制”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存进程边界图、序列化样本、Binder线程记录、故障矩阵、连接池和选型表。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-02-ipc-q3",
    "chapter": "adae15-02-ipc",
    "level": 3,
    "question": "“第2章 IPC机制”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把内存单例当作跨进程共享状态，或在Binder线程直接修改主线程UI”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-02-ipc-q4",
    "chapter": "adae15-02-ipc",
    "level": 3,
    "question": "为什么“第2章 IPC机制”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-02-ipc-q5",
    "chapter": "adae15-02-ipc",
    "level": 4,
    "question": "“第2章 IPC机制”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-02-ipc-q6",
    "chapter": "adae15-02-ipc",
    "level": 4,
    "question": "“第2章 IPC机制”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和进程边界图、序列化样本、Binder线程记录、故障矩阵、连接池和选型表。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-03-view-event-system-q1",
    "chapter": "adae15-03-view-event-system",
    "level": 1,
    "question": "“第3章 View的事件体系”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖22个节点，从“第3章 View的事件体系”到“3.5.3 滑动冲突的解决方式”；主线是从坐标、MotionEvent、TouchSlop和速度工具推导滑动、弹性滑动、事件分发与滑动冲突解决，证据为坐标轨迹、手势阈值、三种滑动对照、分发日志和冲突方向矩阵。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-03-view-event-system-q2",
    "chapter": "adae15-03-view-event-system",
    "level": 2,
    "question": "怎样为“第3章 View的事件体系”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存坐标轨迹、手势阈值、三种滑动对照、分发日志和冲突方向矩阵。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-03-view-event-system-q3",
    "chapter": "adae15-03-view-event-system",
    "level": 3,
    "question": "“第3章 View的事件体系”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只处理ACTION_DOWN和UP，忽略多指、CANCEL、父子拦截与事件序列所有权”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-03-view-event-system-q4",
    "chapter": "adae15-03-view-event-system",
    "level": 3,
    "question": "为什么“第3章 View的事件体系”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-03-view-event-system-q5",
    "chapter": "adae15-03-view-event-system",
    "level": 4,
    "question": "“第3章 View的事件体系”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-03-view-event-system-q6",
    "chapter": "adae15-03-view-event-system",
    "level": 4,
    "question": "“第3章 View的事件体系”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和坐标轨迹、手势阈值、三种滑动对照、分发日志和冲突方向矩阵。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-04-view-working-principles-q1",
    "chapter": "adae15-04-view-working-principles",
    "level": 1,
    "question": "“第4章 View的工作原理”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖14个节点，从“第4章 View的工作原理”到“4.4.4 自定义View的思想”；主线是沿ViewRoot、DecorView、MeasureSpec、measure/layout/draw三阶段实现可验证的自定义View，证据为View树、MeasureSpec表、三阶段调用轨迹、尺寸断言和自定义View检查单。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-04-view-working-principles-q2",
    "chapter": "adae15-04-view-working-principles",
    "level": 2,
    "question": "怎样为“第4章 View的工作原理”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存View树、MeasureSpec表、三阶段调用轨迹、尺寸断言和自定义View检查单。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-04-view-working-principles-q3",
    "chapter": "adae15-04-view-working-principles",
    "level": 3,
    "question": "“第4章 View的工作原理”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“在onDraw分配对象、忽略padding与建议尺寸，或把测量尺寸和布局位置混为一谈”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-04-view-working-principles-q4",
    "chapter": "adae15-04-view-working-principles",
    "level": 3,
    "question": "为什么“第4章 View的工作原理”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-04-view-working-principles-q5",
    "chapter": "adae15-04-view-working-principles",
    "level": 4,
    "question": "“第4章 View的工作原理”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-04-view-working-principles-q6",
    "chapter": "adae15-04-view-working-principles",
    "level": 4,
    "question": "“第4章 View的工作原理”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和View树、MeasureSpec表、三阶段调用轨迹、尺寸断言和自定义View检查单。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-05-remoteviews-q1",
    "chapter": "adae15-05-remoteviews",
    "level": 1,
    "question": "“第5章 理解RemoteViews”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖7个节点，从“第5章 理解RemoteViews”到“5.3 RemoteViews的意义”；主线是在通知与桌面小部件中使用受限View操作和PendingIntent，并解释RemoteViews跨进程apply/reapply机制，证据为通知样本、小部件更新、PendingIntent身份矩阵、跨进程操作列表和失败日志。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-05-remoteviews-q2",
    "chapter": "adae15-05-remoteviews",
    "level": 2,
    "question": "怎样为“第5章 理解RemoteViews”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存通知样本、小部件更新、PendingIntent身份矩阵、跨进程操作列表和失败日志。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-05-remoteviews-q3",
    "chapter": "adae15-05-remoteviews",
    "level": 3,
    "question": "“第5章 理解RemoteViews”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把RemoteViews当普通View树操作，或复用错误PendingIntent导致动作被覆盖”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-05-remoteviews-q4",
    "chapter": "adae15-05-remoteviews",
    "level": 3,
    "question": "为什么“第5章 理解RemoteViews”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-05-remoteviews-q5",
    "chapter": "adae15-05-remoteviews",
    "level": 4,
    "question": "“第5章 理解RemoteViews”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-05-remoteviews-q6",
    "chapter": "adae15-05-remoteviews",
    "level": 4,
    "question": "“第5章 理解RemoteViews”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和通知样本、小部件更新、PendingIntent身份矩阵、跨进程操作列表和失败日志。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-06-drawable-q1",
    "chapter": "adae15-06-drawable",
    "level": 1,
    "question": "“第6章 Android的Drawable”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖13个节点，从“第6章 Android的Drawable”到“6.3 自定义Drawable”；主线是比较九类Drawable的尺寸、状态、层叠、级别、过渡、嵌入、缩放与裁剪语义，并实现自定义Drawable，证据为Drawable选型表、状态矩阵、层级图、level实验、边界尺寸和自定义绘制测试。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-06-drawable-q2",
    "chapter": "adae15-06-drawable",
    "level": 2,
    "question": "怎样为“第6章 Android的Drawable”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存Drawable选型表、状态矩阵、层级图、level实验、边界尺寸和自定义绘制测试。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-06-drawable-q3",
    "chapter": "adae15-06-drawable",
    "level": 3,
    "question": "“第6章 Android的Drawable”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把Drawable误当Bitmap，忽略intrinsic size、state、level、bounds和共享ConstantState”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-06-drawable-q4",
    "chapter": "adae15-06-drawable",
    "level": 3,
    "question": "为什么“第6章 Android的Drawable”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-06-drawable-q5",
    "chapter": "adae15-06-drawable",
    "level": 4,
    "question": "“第6章 Android的Drawable”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-06-drawable-q6",
    "chapter": "adae15-06-drawable",
    "level": 4,
    "question": "“第6章 Android的Drawable”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和Drawable选型表、状态矩阵、层级图、level实验、边界尺寸和自定义绘制测试。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-07-animation-q1",
    "chapter": "adae15-07-animation",
    "level": 1,
    "question": "“第7章 Android动画深入分析”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖15个节点，从“第7章 Android动画深入分析”到“7.4 使用动画的注意事项”；主线是区分View动画、帧动画与属性动画，理解插值器、估值器、监听器、任意属性适配和底层更新，证据为动画类型表、时间曲线、属性快照、监听顺序、触摸命中测试和性能轨迹。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-07-animation-q2",
    "chapter": "adae15-07-animation",
    "level": 2,
    "question": "怎样为“第7章 Android动画深入分析”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存动画类型表、时间曲线、属性快照、监听顺序、触摸命中测试和性能轨迹。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-07-animation-q3",
    "chapter": "adae15-07-animation",
    "level": 3,
    "question": "“第7章 Android动画深入分析”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只改变视觉矩阵却假设真实属性和点击区域已经改变，或让无限动画泄漏页面”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-07-animation-q4",
    "chapter": "adae15-07-animation",
    "level": 3,
    "question": "为什么“第7章 Android动画深入分析”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-07-animation-q5",
    "chapter": "adae15-07-animation",
    "level": 4,
    "question": "“第7章 Android动画深入分析”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-07-animation-q6",
    "chapter": "adae15-07-animation",
    "level": 4,
    "question": "“第7章 Android动画深入分析”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和动画类型表、时间曲线、属性快照、监听顺序、触摸命中测试和性能轨迹。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-08-window-windowmanager-q1",
    "chapter": "adae15-08-window-windowmanager",
    "level": 1,
    "question": "“第8章 理解Window和WindowManager”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖10个节点，从“第8章 理解Window和WindowManager”到“8.3.3 Toast的Window创建过程”；主线是沿WindowManager接口、WindowManagerGlobal、ViewRootImpl和WMS解释Window添加、删除、更新及三类创建过程，证据为跨进程调用图、token表、add/remove/update轨迹、Activity/Dialog/Toast对照和泄漏测试。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-08-window-windowmanager-q2",
    "chapter": "adae15-08-window-windowmanager",
    "level": 2,
    "question": "怎样为“第8章 理解Window和WindowManager”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存跨进程调用图、token表、add/remove/update轨迹、Activity/Dialog/Toast对照和泄漏测试。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-08-window-windowmanager-q3",
    "chapter": "adae15-08-window-windowmanager",
    "level": 3,
    "question": "“第8章 理解Window和WindowManager”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“在无效token或已销毁Context上添加Window，或忘记移除导致WindowLeaked”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-08-window-windowmanager-q4",
    "chapter": "adae15-08-window-windowmanager",
    "level": 3,
    "question": "为什么“第8章 理解Window和WindowManager”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-08-window-windowmanager-q5",
    "chapter": "adae15-08-window-windowmanager",
    "level": 4,
    "question": "“第8章 理解Window和WindowManager”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-08-window-windowmanager-q6",
    "chapter": "adae15-08-window-windowmanager",
    "level": 4,
    "question": "“第8章 理解Window和WindowManager”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和跨进程调用图、token表、add/remove/update轨迹、Activity/Dialog/Toast对照和泄漏测试。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-09-four-components-q1",
    "chapter": "adae15-09-four-components",
    "level": 1,
    "question": "“第9章 四大组件的工作过程”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖10个节点，从“第9章 四大组件的工作过程”到“9.5 ContentProvider的工作过程”；主线是从应用进程到AMS与Binder调用链追踪Activity、Service、BroadcastReceiver和ContentProvider的启动与调度，证据为四组件状态表、进程启动图、Binder时序、注册/发送轨迹、Provider初始化和失败点。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-09-four-components-q2",
    "chapter": "adae15-09-four-components",
    "level": 2,
    "question": "怎样为“第9章 四大组件的工作过程”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存四组件状态表、进程启动图、Binder时序、注册/发送轨迹、Provider初始化和失败点。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-09-four-components-q3",
    "chapter": "adae15-09-four-components",
    "level": 3,
    "question": "“第9章 四大组件的工作过程”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把四大组件都当作本地Java对象调用，忽略AMS调度、进程边界和主线程回调”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-09-four-components-q4",
    "chapter": "adae15-09-four-components",
    "level": 3,
    "question": "为什么“第9章 四大组件的工作过程”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-09-four-components-q5",
    "chapter": "adae15-09-four-components",
    "level": 4,
    "question": "“第9章 四大组件的工作过程”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-09-four-components-q6",
    "chapter": "adae15-09-four-components",
    "level": 4,
    "question": "“第9章 四大组件的工作过程”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和四组件状态表、进程启动图、Binder时序、注册/发送轨迹、Provider初始化和失败点。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-10-message-mechanism-q1",
    "chapter": "adae15-10-message-mechanism",
    "level": 1,
    "question": "“第10章 Android的消息机制”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖8个节点，从“第10章 Android的消息机制”到“10.3 主线程的消息循环”；主线是拆解ThreadLocal、MessageQueue、Looper、Handler与主线程消息循环，验证消息入队、取出、分发和退出，证据为线程局部表、消息队列时间线、Looper循环、Handler归属、主线程栈和泄漏实验。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-10-message-mechanism-q2",
    "chapter": "adae15-10-message-mechanism",
    "level": 2,
    "question": "怎样为“第10章 Android的消息机制”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存线程局部表、消息队列时间线、Looper循环、Handler归属、主线程栈和泄漏实验。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-10-message-mechanism-q3",
    "chapter": "adae15-10-message-mechanism",
    "level": 3,
    "question": "“第10章 Android的消息机制”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“在没有Looper的线程创建Handler，或让非静态Handler长期持有已销毁组件”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-10-message-mechanism-q4",
    "chapter": "adae15-10-message-mechanism",
    "level": 3,
    "question": "为什么“第10章 Android的消息机制”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-10-message-mechanism-q5",
    "chapter": "adae15-10-message-mechanism",
    "level": 4,
    "question": "“第10章 Android的消息机制”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-10-message-mechanism-q6",
    "chapter": "adae15-10-message-mechanism",
    "level": 4,
    "question": "“第10章 Android的消息机制”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和线程局部表、消息队列时间线、Looper循环、Handler归属、主线程栈和泄漏实验。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-11-threads-pools-q1",
    "chapter": "adae15-11-threads-pools",
    "level": 1,
    "question": "“第11章 Android的线程和线程池”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖10个节点，从“第11章 Android的线程和线程池”到“11.3.2 线程池的分类”；主线是比较主/子线程、AsyncTask、HandlerThread、IntentService与ThreadPoolExecutor，并按任务特征选择线程池，证据为线程归属表、AsyncTask源码时序、串并行实验、线程池参数、拒绝策略和取消记录。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-11-threads-pools-q2",
    "chapter": "adae15-11-threads-pools",
    "level": 2,
    "question": "怎样为“第11章 Android的线程和线程池”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存线程归属表、AsyncTask源码时序、串并行实验、线程池参数、拒绝策略和取消记录。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-11-threads-pools-q3",
    "chapter": "adae15-11-threads-pools",
    "level": 3,
    "question": "“第11章 Android的线程和线程池”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“无限创建线程、无界排队或依赖已废弃AsyncTask/IntentService而不声明历史边界”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-11-threads-pools-q4",
    "chapter": "adae15-11-threads-pools",
    "level": 3,
    "question": "为什么“第11章 Android的线程和线程池”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-11-threads-pools-q5",
    "chapter": "adae15-11-threads-pools",
    "level": 4,
    "question": "“第11章 Android的线程和线程池”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-11-threads-pools-q6",
    "chapter": "adae15-11-threads-pools",
    "level": 4,
    "question": "“第11章 Android的线程和线程池”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和线程归属表、AsyncTask源码时序、串并行实验、线程池参数、拒绝策略和取消记录。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-12-bitmap-cache-q1",
    "chapter": "adae15-12-bitmap-cache",
    "level": 1,
    "question": "“第12章 Bitmap的加载和Cache”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖9个节点，从“第12章 Bitmap的加载和Cache”到“12.3.2 优化列表的卡顿现象”；主线是按目标尺寸采样加载Bitmap，组合LruCache、DiskLruCache和ImageLoader，并解决照片墙列表卡顿，证据为采样计算、内存预算、缓存命中轨迹、并发去重、滚动帧时间和回收测试。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-12-bitmap-cache-q2",
    "chapter": "adae15-12-bitmap-cache",
    "level": 2,
    "question": "怎样为“第12章 Bitmap的加载和Cache”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存采样计算、内存预算、缓存命中轨迹、并发去重、滚动帧时间和回收测试。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-12-bitmap-cache-q3",
    "chapter": "adae15-12-bitmap-cache",
    "level": 3,
    "question": "“第12章 Bitmap的加载和Cache”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“按原尺寸解码大图、在主线程读磁盘，或让错位的异步结果覆盖复用列表项”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-12-bitmap-cache-q4",
    "chapter": "adae15-12-bitmap-cache",
    "level": 3,
    "question": "为什么“第12章 Bitmap的加载和Cache”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-12-bitmap-cache-q5",
    "chapter": "adae15-12-bitmap-cache",
    "level": 4,
    "question": "“第12章 Bitmap的加载和Cache”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-12-bitmap-cache-q6",
    "chapter": "adae15-12-bitmap-cache",
    "level": 4,
    "question": "“第12章 Bitmap的加载和Cache”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和采样计算、内存预算、缓存命中轨迹、并发去重、滚动帧时间和回收测试。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-13-integrated-techniques-q1",
    "chapter": "adae15-13-integrated-techniques",
    "level": 1,
    "question": "“第13章 综合技术”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖7个节点，从“第13章 综合技术”到“13.4.2 使用apktool对apk进行二次打包”；主线是建立CrashHandler、multidex、动态加载与反编译/重打包实验，理解诊断、构建和代码边界，证据为崩溃包、方法数报告、类加载图、签名差异、反编译结果和安全边界。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-13-integrated-techniques-q2",
    "chapter": "adae15-13-integrated-techniques",
    "level": 2,
    "question": "怎样为“第13章 综合技术”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存崩溃包、方法数报告、类加载图、签名差异、反编译结果和安全边界。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-13-integrated-techniques-q3",
    "chapter": "adae15-13-integrated-techniques",
    "level": 3,
    "question": "“第13章 综合技术”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“收集崩溃时泄露敏感数据，或把动态加载与二次打包当作无信任边界的普通功能”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-13-integrated-techniques-q4",
    "chapter": "adae15-13-integrated-techniques",
    "level": 3,
    "question": "为什么“第13章 综合技术”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-13-integrated-techniques-q5",
    "chapter": "adae15-13-integrated-techniques",
    "level": 4,
    "question": "“第13章 综合技术”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-13-integrated-techniques-q6",
    "chapter": "adae15-13-integrated-techniques",
    "level": 4,
    "question": "“第13章 综合技术”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和崩溃包、方法数报告、类加载图、签名差异、反编译结果和安全边界。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-14-jni-ndk-q1",
    "chapter": "adae15-14-jni-ndk",
    "level": 1,
    "question": "“第14章 JNI和NDK编程”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖5个节点，从“第14章 JNI和NDK编程”到“14.4 JNI调用Java方法的流程”；主线是贯通JNI/NDK构建、Java与原生类型签名、方法查找、线程附着和异常/资源释放，证据为构建指纹、符号表、类型签名表、调用时序、异常传播和资源清理测试。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-14-jni-ndk-q2",
    "chapter": "adae15-14-jni-ndk",
    "level": 2,
    "question": "怎样为“第14章 JNI和NDK编程”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存构建指纹、符号表、类型签名表、调用时序、异常传播和资源清理测试。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-14-jni-ndk-q3",
    "chapter": "adae15-14-jni-ndk",
    "level": 3,
    "question": "“第14章 JNI和NDK编程”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“缓存线程局部JNIEnv、遗漏Release/Delete，或让原生崩溃绕过Java异常模型”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-14-jni-ndk-q4",
    "chapter": "adae15-14-jni-ndk",
    "level": 3,
    "question": "为什么“第14章 JNI和NDK编程”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-14-jni-ndk-q5",
    "chapter": "adae15-14-jni-ndk",
    "level": 4,
    "question": "“第14章 JNI和NDK编程”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-14-jni-ndk-q6",
    "chapter": "adae15-14-jni-ndk",
    "level": 4,
    "question": "“第14章 JNI和NDK编程”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和构建指纹、符号表、类型签名表、调用时序、异常传播和资源清理测试。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-15-performance-optimization-q1",
    "chapter": "adae15-15-performance-optimization",
    "level": 1,
    "question": "“第15章 Android性能优化”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖11个节点，从“第15章 Android性能优化”到“15.3 提高程序的可维护性”；主线是以测量驱动布局、绘制、泄漏、响应、ANR、列表、Bitmap和线程优化，并用MAT与可维护性收口，证据为性能预算、基线trace、布局层级、内存引用链、ANR栈、帧时间和回归门。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-15-performance-optimization-q2",
    "chapter": "adae15-15-performance-optimization",
    "level": 2,
    "question": "怎样为“第15章 Android性能优化”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存性能预算、基线trace、布局层级、内存引用链、ANR栈、帧时间和回归门。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-15-performance-optimization-q3",
    "chapter": "adae15-15-performance-optimization",
    "level": 3,
    "question": "“第15章 Android性能优化”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“先优化再测量、只看平均值，或用缓存与线程掩盖生命周期泄漏”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-15-performance-optimization-q4",
    "chapter": "adae15-15-performance-optimization",
    "level": 3,
    "question": "为什么“第15章 Android性能优化”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-15-performance-optimization-q5",
    "chapter": "adae15-15-performance-optimization",
    "level": 4,
    "question": "“第15章 Android性能优化”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-15-performance-optimization-q6",
    "chapter": "adae15-15-performance-optimization",
    "level": 4,
    "question": "“第15章 Android性能优化”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和性能预算、基线trace、布局层级、内存引用链、ANR栈、帧时间和回归门。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "adae15-official-final-review-q1",
    "chapter": "adae15-official-final-review",
    "level": 1,
    "question": "“《Android开发艺术探索》全书总复习”覆盖哪些权威目录节点与framework主线？",
    "answer": "覆盖15个节点，从“第1章 Activity的生命周期和启动模式”到“第15章 Android性能优化”；主线是跨15章重建从用户事件到framework、Binder、线程、缓存、原生边界和性能证据的完整调用链，证据为整书机制图、综合故障实验、源码定位、迁移差异和独立交接包。",
    "tags": [
      "官方目录",
      "调用链"
    ]
  },
  {
    "id": "adae15-official-final-review-q2",
    "chapter": "adae15-official-final-review",
    "level": 2,
    "question": "怎样为“《Android开发艺术探索》全书总复习”建立最小垂直切片？",
    "answer": "固定Android 5.0语境、JDK、构建、设备、进程和输入，贯通应用、framework、线程/进程与可观察结果，并保存整书机制图、综合故障实验、源码定位、迁移差异和独立交接包。",
    "tags": [
      "实验",
      "系统"
    ]
  },
  {
    "id": "adae15-official-final-review-q3",
    "chapter": "adae15-official-final-review",
    "level": 3,
    "question": "“《Android开发艺术探索》全书总复习”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“按章背诵类名却无法追踪一次操作跨组件、跨线程和跨进程的因果链”；用重建、进程退出、错误线程、队列压力、无效输入或未释放资源只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "adae15-official-final-review-q4",
    "chapter": "adae15-official-final-review",
    "level": 3,
    "question": "为什么“《Android开发艺术探索》全书总复习”的一次正常运行不足以证明机制？",
    "answer": "一次运行未证明真实源码分支、线程/进程、状态恢复、系统故障与释放；必须保存时序、故障路径、资源计数和断言。",
    "tags": [
      "源码",
      "诊断"
    ]
  },
  {
    "id": "adae15-official-final-review-q5",
    "chapter": "adae15-official-final-review",
    "level": 4,
    "question": "“《Android开发艺术探索》全书总复习”迁移到现代targetSdk时如何控制变量？",
    "answer": "先保存Android 5.0行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，比较行为、测试与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "adae15-official-final-review-q6",
    "chapter": "adae15-official-final-review",
    "level": 4,
    "question": "“《Android开发艺术探索》全书总复习”达到独立交接需要什么？",
    "answer": "需要环境与设备指纹、源码版本、构建产物、输入、线程/进程时序、状态、失败测试、资源释放、版本边界和整书机制图、综合故障实验、源码定位、迁移差异和独立交接包。",
    "tags": [
      "验收",
      "交接"
    ]
  }
];
