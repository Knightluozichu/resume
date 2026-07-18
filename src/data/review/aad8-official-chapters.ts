import type { ReviewQuestion } from "../review-questions";

export const aad8OfficialQuestions: ReviewQuestion[] = [
  {
    chapter: "aad8-official-learning-map",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码权威学习地图",
      "Android 8.0",
    ],
    id: "aad8-official-learning-map-q1",
    level: 1,
    question:
      "“Android 8.0源码权威学习地图”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖20个目录/复习节点，主链是把17章、251个正式目录节点连成系统启动、运行时/动态技术和应用修复/优化三条互相依赖的源码追踪路线。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-official-learning-map",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码权威学习地图",
      "17章",
    ],
    id: "aad8-official-learning-map-q2",
    level: 1,
    question: "“Android 8.0源码权威学习地图”的最小运行不变量是什么？",
    answer:
      "所有251个正式节点均可定位，任何结论都带Android 8.0版本、源码入口、进程/线程、状态轨迹、失败反例和复现证据",
  },
  {
    chapter: "aad8-official-learning-map",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码权威学习地图",
      "251个节点",
    ],
    id: "aad8-official-learning-map-q3",
    level: 2,
    question: "怎样为“Android 8.0源码权威学习地图”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：把Android 10以后ATMS、现代ART、Perfetto或隐藏API限制倒灌进来，会改变类、工具和Hook/插件化成立条件，失去原书版本忠实度",
  },
  {
    chapter: "aad8-official-learning-map",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码权威学习地图",
      "源码调用链",
    ],
    id: "aad8-official-learning-map-q4",
    level: 2,
    question: "为什么“Android 8.0源码权威学习地图”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-official-learning-map",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码权威学习地图",
      "版本门",
    ],
    id: "aad8-official-learning-map-q5",
    level: 3,
    question: "如何验证“Android 8.0源码权威学习地图”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-official-learning-map",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码权威学习地图",
      "Android 8.0",
    ],
    id: "aad8-official-learning-map-q6",
    level: 3,
    question: "“Android 8.0源码权威学习地图”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-01-android-system-architecture",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第1章 Android系统架构",
      "Android系统架构",
    ],
    id: "aad8-01-android-system-architecture-q1",
    level: 1,
    question: "“第1章 Android系统架构”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖10个目录/复习节点，主链是建立应用层、应用框架层、C/C++程序库与运行时、HAL和Linux内核的调用边界，并掌握Android 8.0源码目录与阅读路径。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-01-android-system-architecture",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第1章 Android系统架构",
      "frameworks/base",
    ],
    id: "aad8-01-android-system-architecture-q2",
    level: 1,
    question: "“第1章 Android系统架构”的最小运行不变量是什么？",
    answer:
      "每次源码追踪都能从公开入口沿真实调用链定位到责任层、进程、线程与返回结果，不用架构层名替代代码证据",
  },
  {
    chapter: "aad8-01-android-system-architecture",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第1章 Android系统架构",
      "system/core",
    ],
    id: "aad8-01-android-system-architecture-q3",
    level: 2,
    question: "怎样为“第1章 Android系统架构”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：只背五层架构图却不知道frameworks/base、system/core和art中的入口，会在类名变化或跨Java/Native边界时失去追踪路径",
  },
  {
    chapter: "aad8-01-android-system-architecture",
    tags: ["Android进阶解密", "Android 8.0", "第1章 Android系统架构", "ART"],
    id: "aad8-01-android-system-architecture-q4",
    level: 2,
    question: "为什么“第1章 Android系统架构”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-01-android-system-architecture",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第1章 Android系统架构",
      "Source Insight",
    ],
    id: "aad8-01-android-system-architecture-q5",
    level: 3,
    question: "如何验证“第1章 Android系统架构”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-01-android-system-architecture",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第1章 Android系统架构",
      "Android系统架构",
    ],
    id: "aad8-01-android-system-architecture-q6",
    level: 3,
    question: "“第1章 Android系统架构”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-02-android-system-startup",
    tags: ["Android进阶解密", "Android 8.0", "第2章 Android系统启动", "init"],
    id: "aad8-02-android-system-startup-q1",
    level: 1,
    question: "“第2章 Android系统启动”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖23个目录/复习节点，主链是沿init、Zygote、SystemServer和Launcher四段主链追踪Android 8.0从PID 1到应用图标可见的启动过程。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-02-android-system-startup",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第2章 Android系统启动",
      "init.rc",
    ],
    id: "aad8-02-android-system-startup-q2",
    level: 1,
    question: "“第2章 Android系统启动”的最小运行不变量是什么？",
    answer:
      "每个阶段都明确谁创建下一进程、使用何种配置或IPC、何时进入消息循环，以及何种日志证明阶段完成",
  },
  {
    chapter: "aad8-02-android-system-startup",
    tags: ["Android进阶解密", "Android 8.0", "第2章 Android系统启动", "Zygote"],
    id: "aad8-02-android-system-startup-q3",
    level: 2,
    question: "怎样为“第2章 Android系统启动”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：把启动描述成线性函数列表会忽略init action/service触发、Zygote socket、SystemServer服务依赖与Launcher查询包信息的跨进程边界",
  },
  {
    chapter: "aad8-02-android-system-startup",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第2章 Android系统启动",
      "SystemServer",
    ],
    id: "aad8-02-android-system-startup-q4",
    level: 2,
    question: "为什么“第2章 Android系统启动”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-02-android-system-startup",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第2章 Android系统启动",
      "Launcher",
    ],
    id: "aad8-02-android-system-startup-q5",
    level: 3,
    question: "如何验证“第2章 Android系统启动”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-02-android-system-startup",
    tags: ["Android进阶解密", "Android 8.0", "第2章 Android系统启动", "init"],
    id: "aad8-02-android-system-startup-q6",
    level: 3,
    question: "“第2章 Android系统启动”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-03-app-process-startup",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第3章 应用程序进程启动过程",
      "Process.start",
    ],
    id: "aad8-03-app-process-startup-q1",
    level: 1,
    question:
      "“第3章 应用程序进程启动过程”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖7个目录/复习节点，主链是从AMS提出进程请求，经Zygote socket与fork，到RuntimeInit、ActivityThread、Binder线程池和主线程Looper就绪。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-03-app-process-startup",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第3章 应用程序进程启动过程",
      "ZygoteProcess",
    ],
    id: "aad8-03-app-process-startup-q2",
    level: 1,
    question: "“第3章 应用程序进程启动过程”的最小运行不变量是什么？",
    answer:
      "进程只有在PID、Binder线程池、主线程消息循环和Application绑定均可观察时才算启动完成，不能把fork成功当成应用可运行",
  },
  {
    chapter: "aad8-03-app-process-startup",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第3章 应用程序进程启动过程",
      "fork",
    ],
    id: "aad8-03-app-process-startup-q3",
    level: 2,
    question: "怎样为“第3章 应用程序进程启动过程”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：忽略Zygote父子分支或ActivityThread主循环会误判代码运行进程与线程，也无法解释启动超时、Binder阻塞和主线程尚未就绪的竞态",
  },
  {
    chapter: "aad8-03-app-process-startup",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第3章 应用程序进程启动过程",
      "Binder线程池",
    ],
    id: "aad8-03-app-process-startup-q4",
    level: 2,
    question: "为什么“第3章 应用程序进程启动过程”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-03-app-process-startup",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第3章 应用程序进程启动过程",
      "ActivityThread",
    ],
    id: "aad8-03-app-process-startup-q5",
    level: 3,
    question: "如何验证“第3章 应用程序进程启动过程”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-03-app-process-startup",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第3章 应用程序进程启动过程",
      "Process.start",
    ],
    id: "aad8-03-app-process-startup-q6",
    level: 3,
    question: "“第3章 应用程序进程启动过程”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-04-four-components-workflow",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第4章 四大组件的工作过程",
      "ApplicationThread",
    ],
    id: "aad8-04-four-components-workflow-q1",
    level: 1,
    question:
      "“第4章 四大组件的工作过程”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖18个目录/复习节点，主链是以Activity、启动/绑定Service、动态广播和ContentProvider为四条端到端链路，连接ContextImpl、AMS、ApplicationThread与ActivityThread。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-04-four-components-workflow",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第4章 四大组件的工作过程",
      "ActivityThread",
    ],
    id: "aad8-04-four-components-workflow-q2",
    level: 1,
    question: "“第4章 四大组件的工作过程”的最小运行不变量是什么？",
    answer:
      "每个组件链都区分调用进程、system_server决策、目标进程调度和主线程回调，并能说明组件不存在或进程未启动时的分支",
  },
  {
    chapter: "aad8-04-four-components-workflow",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第4章 四大组件的工作过程",
      "根Activity",
    ],
    id: "aad8-04-four-components-workflow-q3",
    level: 2,
    question: "怎样为“第4章 四大组件的工作过程”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：把startActivity、startService、sendBroadcast或query视为本地方法会遗漏Binder跳转、进程创建、调度队列与生命周期回调顺序",
  },
  {
    chapter: "aad8-04-four-components-workflow",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第4章 四大组件的工作过程",
      "Service绑定",
    ],
    id: "aad8-04-four-components-workflow-q4",
    level: 2,
    question: "为什么“第4章 四大组件的工作过程”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-04-four-components-workflow",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第4章 四大组件的工作过程",
      "ContentProvider",
    ],
    id: "aad8-04-four-components-workflow-q5",
    level: 3,
    question: "如何验证“第4章 四大组件的工作过程”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-04-four-components-workflow",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第4章 四大组件的工作过程",
      "ApplicationThread",
    ],
    id: "aad8-04-four-components-workflow-q6",
    level: 3,
    question: "“第4章 四大组件的工作过程”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-05-context",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第5章 理解上下文Context",
      "Context",
    ],
    id: "aad8-05-context-q1",
    level: 1,
    question:
      "“第5章 理解上下文Context”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖6个目录/复习节点，主链是沿Context、ContextWrapper与ContextImpl关系，比较Application、Activity和Service的Context创建、持有资源与生命周期。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-05-context",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第5章 理解上下文Context",
      "ContextImpl",
    ],
    id: "aad8-05-context-q2",
    level: 1,
    question: "“第5章 理解上下文Context”的最小运行不变量是什么？",
    answer:
      "每个Context引用都能说明base实现、主题/窗口能力、生命周期所有者与允许的操作；长生命周期对象不持有短生命周期Activity",
  },
  {
    chapter: "aad8-05-context",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第5章 理解上下文Context",
      "ContextWrapper",
    ],
    id: "aad8-05-context-q3",
    level: 2,
    question: "怎样为“第5章 理解上下文Context”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：把所有Context视为可互换会导致窗口token错误、主题丢失和Activity泄漏，也无法解释Application与Service的创建入口",
  },
  {
    chapter: "aad8-05-context",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第5章 理解上下文Context",
      "Application Context",
    ],
    id: "aad8-05-context-q4",
    level: 2,
    question: "为什么“第5章 理解上下文Context”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-05-context",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第5章 理解上下文Context",
      "ContextThemeWrapper",
    ],
    id: "aad8-05-context-q5",
    level: 3,
    question: "如何验证“第5章 理解上下文Context”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-05-context",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第5章 理解上下文Context",
      "Context",
    ],
    id: "aad8-05-context-q6",
    level: 3,
    question: "“第5章 理解上下文Context”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-06-activity-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第6章 理解ActivityManagerService",
      "IActivityManager",
    ],
    id: "aad8-06-activity-manager-service-q1",
    level: 1,
    question:
      "“第6章 理解ActivityManagerService”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖15个目录/复习节点，主链是比较Android 7.0与8.0的AMS访问家族，追踪AMS启动、应用进程协作、ActivityRecord/TaskRecord/ActivityStack与任务栈规则。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-06-activity-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第6章 理解ActivityManagerService",
      "AMS",
    ],
    id: "aad8-06-activity-manager-service-q2",
    level: 1,
    question: "“第6章 理解ActivityManagerService”的最小运行不变量是什么？",
    answer:
      "任何Activity栈结论都能由record、task、stack三层数据和Intent/manifest输入共同解释，且明确Android 8.0访问入口",
  },
  {
    chapter: "aad8-06-activity-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第6章 理解ActivityManagerService",
      "ActivityRecord",
    ],
    id: "aad8-06-activity-manager-service-q3",
    level: 2,
    question: "怎样为“第6章 理解ActivityManagerService”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：混用ActivityManagerNative旧入口与Android 8.0单例入口，或只背launchMode而不看FLAG和taskAffinity，会得出错误任务归属",
  },
  {
    chapter: "aad8-06-activity-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第6章 理解ActivityManagerService",
      "TaskRecord",
    ],
    id: "aad8-06-activity-manager-service-q4",
    level: 2,
    question:
      "为什么“第6章 理解ActivityManagerService”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-06-activity-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第6章 理解ActivityManagerService",
      "ActivityStack",
    ],
    id: "aad8-06-activity-manager-service-q5",
    level: 3,
    question:
      "如何验证“第6章 理解ActivityManagerService”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-06-activity-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第6章 理解ActivityManagerService",
      "IActivityManager",
    ],
    id: "aad8-06-activity-manager-service-q6",
    level: 3,
    question: "“第6章 理解ActivityManagerService”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-07-window-manager",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第7章 理解WindowManager",
      "Window",
    ],
    id: "aad8-07-window-manager-q1",
    level: 1,
    question:
      "“第7章 理解WindowManager”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖11个目录/复习节点，主链是从客户端Window、WindowManager、WindowManagerImpl、WindowManagerGlobal到ViewRootImpl，解释窗口属性与添加、更新、删除操作。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-07-window-manager",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第7章 理解WindowManager",
      "WindowManager",
    ],
    id: "aad8-07-window-manager-q2",
    level: 1,
    question: "“第7章 理解WindowManager”的最小运行不变量是什么？",
    answer:
      "每个窗口都具备合法token、type、flags、softInputMode和ViewRootImpl会话；显示次序与输入行为能从LayoutParams解释",
  },
  {
    chapter: "aad8-07-window-manager",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第7章 理解WindowManager",
      "WindowManagerGlobal",
    ],
    id: "aad8-07-window-manager-q3",
    level: 2,
    question: "怎样为“第7章 理解WindowManager”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：把WindowManager当作普通View容器会忽略token和WMS会话，导致BadTokenException、层级错误或软键盘遮挡行为不可预测",
  },
  {
    chapter: "aad8-07-window-manager",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第7章 理解WindowManager",
      "ViewRootImpl",
    ],
    id: "aad8-07-window-manager-q4",
    level: 2,
    question: "为什么“第7章 理解WindowManager”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-07-window-manager",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第7章 理解WindowManager",
      "LayoutParams",
    ],
    id: "aad8-07-window-manager-q5",
    level: 3,
    question: "如何验证“第7章 理解WindowManager”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-07-window-manager",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第7章 理解WindowManager",
      "Window",
    ],
    id: "aad8-07-window-manager-q6",
    level: 3,
    question: "“第7章 理解WindowManager”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-08-window-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第8章 理解WindowManagerService",
      "WMS",
    ],
    id: "aad8-08-window-manager-service-q1",
    level: 1,
    question:
      "“第8章 理解WindowManagerService”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖6个目录/复习节点，主链是在system_server侧分析WMS职责、创建依赖、重要成员以及Window添加与删除时的权限、token、WindowState和Surface链路。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-08-window-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第8章 理解WindowManagerService",
      "WindowState",
    ],
    id: "aad8-08-window-manager-service-q2",
    level: 1,
    question: "“第8章 理解WindowManagerService”的最小运行不变量是什么？",
    answer:
      "窗口进入系统前通过权限、display、token和父子关系校验；删除后WindowState、输入通道和Surface资源均可证明被释放",
  },
  {
    chapter: "aad8-08-window-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第8章 理解WindowManagerService",
      "WindowToken",
    ],
    id: "aad8-08-window-manager-service-q3",
    level: 2,
    question: "怎样为“第8章 理解WindowManagerService”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：只追客户端addView而不进入WMS会遗漏拒绝码、WindowToken与Surface分配，也无法解释窗口已从View树删除但系统资源仍残留",
  },
  {
    chapter: "aad8-08-window-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第8章 理解WindowManagerService",
      "Session",
    ],
    id: "aad8-08-window-manager-service-q4",
    level: 2,
    question: "为什么“第8章 理解WindowManagerService”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-08-window-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第8章 理解WindowManagerService",
      "Surface",
    ],
    id: "aad8-08-window-manager-service-q5",
    level: 3,
    question:
      "如何验证“第8章 理解WindowManagerService”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-08-window-manager-service",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第8章 理解WindowManagerService",
      "WMS",
    ],
    id: "aad8-08-window-manager-service-q6",
    level: 3,
    question: "“第8章 理解WindowManagerService”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-09-jni",
    tags: ["Android进阶解密", "Android 8.0", "第9章 JNI原理", "JNIEnv"],
    id: "aad8-09-jni-q1",
    level: 1,
    question: "“第9章 JNI原理”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖17个目录/复习节点，主链是以MediaRecorder为纵向样例连接Java Framework、JNI注册和Native实现，并掌握类型、签名、JNIEnv、成员ID与引用生命周期。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-09-jni",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第9章 JNI原理",
      "JNINativeMethod",
    ],
    id: "aad8-09-jni-q2",
    level: 1,
    question: "“第9章 JNI原理”的最小运行不变量是什么？",
    answer:
      "每次JNI调用都能校验签名和类型，检查异常，控制本地/全局/弱全局引用生命周期，并明确线程对应的JNIEnv",
  },
  {
    chapter: "aad8-09-jni",
    tags: ["Android进阶解密", "Android 8.0", "第9章 JNI原理", "方法签名"],
    id: "aad8-09-jni-q3",
    level: 2,
    question: "怎样为“第9章 JNI原理”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：缓存本地引用、跨线程复用JNIEnv或写错方法签名可能在简单测试中不暴露，却会在GC、线程切换或压力下崩溃",
  },
  {
    chapter: "aad8-09-jni",
    tags: ["Android进阶解密", "Android 8.0", "第9章 JNI原理", "jmethodID"],
    id: "aad8-09-jni-q4",
    level: 2,
    question: "为什么“第9章 JNI原理”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-09-jni",
    tags: ["Android进阶解密", "Android 8.0", "第9章 JNI原理", "全局引用"],
    id: "aad8-09-jni-q5",
    level: 3,
    question: "如何验证“第9章 JNI原理”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-09-jni",
    tags: ["Android进阶解密", "Android 8.0", "第9章 JNI原理", "JNIEnv"],
    id: "aad8-09-jni-q6",
    level: 3,
    question: "“第9章 JNI原理”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-10-java-virtual-machine",
    tags: ["Android进阶解密", "Android 8.0", "第10章 Java虚拟机", "Class文件"],
    id: "aad8-10-java-virtual-machine-q1",
    level: 1,
    question: "“第10章 Java虚拟机”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖22个目录/复习节点，主链是建立Class文件、类生命周期、类加载子系统、运行时区域、对象布局、oop-klass模型、可达性标记与四类GC算法的基础。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-10-java-virtual-machine",
    tags: ["Android进阶解密", "Android 8.0", "第10章 Java虚拟机", "类生命周期"],
    id: "aad8-10-java-virtual-machine-q2",
    level: 1,
    question: "“第10章 Java虚拟机”的最小运行不变量是什么？",
    answer:
      "对象创建、存放、可达性判断和回收都能映射到明确运行时区域与算法阶段，不用“栈快、堆慢”之类口号替代模型",
  },
  {
    chapter: "aad8-10-java-virtual-machine",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第10章 Java虚拟机",
      "运行时数据区域",
    ],
    id: "aad8-10-java-virtual-machine-q3",
    level: 2,
    question: "怎样为“第10章 Java虚拟机”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：混淆Class元数据、对象实例、引用变量和线程栈会导致错误的泄漏/GC判断，也无法把JVM概念正确迁移到ART",
  },
  {
    chapter: "aad8-10-java-virtual-machine",
    tags: ["Android进阶解密", "Android 8.0", "第10章 Java虚拟机", "oop-klass"],
    id: "aad8-10-java-virtual-machine-q4",
    level: 2,
    question: "为什么“第10章 Java虚拟机”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-10-java-virtual-machine",
    tags: ["Android进阶解密", "Android 8.0", "第10章 Java虚拟机", "根搜索"],
    id: "aad8-10-java-virtual-machine-q5",
    level: 3,
    question: "如何验证“第10章 Java虚拟机”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-10-java-virtual-machine",
    tags: ["Android进阶解密", "Android 8.0", "第10章 Java虚拟机", "Class文件"],
    id: "aad8-10-java-virtual-machine-q6",
    level: 3,
    question: "“第10章 Java虚拟机”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-11-dalvik-art",
    tags: ["Android进阶解密", "Android 8.0", "第11章 Dalvik和ART", "DVM"],
    id: "aad8-11-dalvik-art-q1",
    level: 1,
    question: "“第11章 Dalvik和ART”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖11个目录/复习节点，主链是比较DVM与JVM、DVM架构与堆日志，再分析ART的执行/堆/GC日志差异以及两种运行时的演进背景。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-11-dalvik-art",
    tags: ["Android进阶解密", "Android 8.0", "第11章 Dalvik和ART", "ART"],
    id: "aad8-11-dalvik-art-q2",
    level: 1,
    question: "“第11章 Dalvik和ART”的最小运行不变量是什么？",
    answer:
      "比较结论明确Android版本、字节码/寄存器模型、编译时机、堆与GC日志字段，不能把ART简化为只有AOT或把现代行为倒灌到8.0",
  },
  {
    chapter: "aad8-11-dalvik-art",
    tags: ["Android进阶解密", "Android 8.0", "第11章 Dalvik和ART", "DEX"],
    id: "aad8-11-dalvik-art-q3",
    level: 2,
    question: "怎样为“第11章 Dalvik和ART”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：只用“Dalvik JIT、ART AOT”二分会遗漏Android 7/8的混合编译、配置文件和不同GC策略，也无法从日志诊断停顿",
  },
  {
    chapter: "aad8-11-dalvik-art",
    tags: ["Android进阶解密", "Android 8.0", "第11章 Dalvik和ART", "运行时堆"],
    id: "aad8-11-dalvik-art-q4",
    level: 2,
    question: "为什么“第11章 Dalvik和ART”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-11-dalvik-art",
    tags: ["Android进阶解密", "Android 8.0", "第11章 Dalvik和ART", "GC日志"],
    id: "aad8-11-dalvik-art-q5",
    level: 3,
    question: "如何验证“第11章 Dalvik和ART”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-11-dalvik-art",
    tags: ["Android进阶解密", "Android 8.0", "第11章 Dalvik和ART", "DVM"],
    id: "aad8-11-dalvik-art-q6",
    level: 3,
    question: "“第11章 Dalvik和ART”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-12-class-loader",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第12章 理解ClassLoader",
      "ClassLoader",
    ],
    id: "aad8-12-class-loader-q1",
    level: 1,
    question: "“第12章 理解ClassLoader”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖12个目录/复习节点，主链是先建立Java ClassLoader类型、继承、双亲委托与自定义加载，再进入Android BootClassLoader、PathClassLoader和Dex加载链。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-12-class-loader",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第12章 理解ClassLoader",
      "双亲委托",
    ],
    id: "aad8-12-class-loader-q2",
    level: 1,
    question: "“第12章 理解ClassLoader”的最小运行不变量是什么？",
    answer:
      "给定类名和dex路径，能够预测哪个加载器先查找、类身份由哪个加载器定义、何时委托或失败，并用加载器实例验证",
  },
  {
    chapter: "aad8-12-class-loader",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第12章 理解ClassLoader",
      "BootClassLoader",
    ],
    id: "aad8-12-class-loader-q3",
    level: 2,
    question: "怎样为“第12章 理解ClassLoader”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：认为同名Class字节完全相同就属于同一类型，或随意打破委托，会产生ClassCastException、核心类遮蔽和补丁顺序错误",
  },
  {
    chapter: "aad8-12-class-loader",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第12章 理解ClassLoader",
      "PathClassLoader",
    ],
    id: "aad8-12-class-loader-q4",
    level: 2,
    question: "为什么“第12章 理解ClassLoader”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-12-class-loader",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第12章 理解ClassLoader",
      "DexPathList",
    ],
    id: "aad8-12-class-loader-q5",
    level: 3,
    question: "如何验证“第12章 理解ClassLoader”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-12-class-loader",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第12章 理解ClassLoader",
      "ClassLoader",
    ],
    id: "aad8-12-class-loader-q6",
    level: 3,
    question: "“第12章 理解ClassLoader”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-13-hotfix",
    tags: ["Android进阶解密", "Android 8.0", "第13章 热修复原理", "资源修复"],
    id: "aad8-13-hotfix-q1",
    level: 1,
    question: "“第13章 热修复原理”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖13个目录/复习节点，主链是比较资源、代码与so三类修复：从Instant Run资源策略，到dex类加载/底层替换/Instant Run代码方案，再到System.load与nativeLoad。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-13-hotfix",
    tags: ["Android进阶解密", "Android 8.0", "第13章 热修复原理", "类加载方案"],
    id: "aad8-13-hotfix-q2",
    level: 1,
    question: "“第13章 热修复原理”的最小运行不变量是什么？",
    answer:
      "补丁必须在错误实现首次加载前生效，资源/类/so解析命中补丁且可回滚，并验证Android 8.0兼容、签名和进程重启边界",
  },
  {
    chapter: "aad8-13-hotfix",
    tags: ["Android进阶解密", "Android 8.0", "第13章 热修复原理", "底层替换"],
    id: "aad8-13-hotfix-q3",
    level: 2,
    question: "怎样为“第13章 热修复原理”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：只验证补丁文件下载成功会遗漏类已加载、资源缓存、ABI、so依赖和进程状态，可能得到部分用户有效、重启后失效的不可控修复",
  },
  {
    chapter: "aad8-13-hotfix",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第13章 热修复原理",
      "Instant Run",
    ],
    id: "aad8-13-hotfix-q4",
    level: 2,
    question: "为什么“第13章 热修复原理”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-13-hotfix",
    tags: ["Android进阶解密", "Android 8.0", "第13章 热修复原理", "nativeLoad"],
    id: "aad8-13-hotfix-q5",
    level: 3,
    question: "如何验证“第13章 热修复原理”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-13-hotfix",
    tags: ["Android进阶解密", "Android 8.0", "第13章 热修复原理", "资源修复"],
    id: "aad8-13-hotfix-q6",
    level: 3,
    question: "“第13章 热修复原理”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-14-hook",
    tags: ["Android进阶解密", "Android 8.0", "第14章 Hook技术", "Hook"],
    id: "aad8-14-hook-q1",
    level: 1,
    question: "“第14章 Hook技术”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖10个目录/复习节点，主链是从代理模式和动态代理建立替换点，再分别Hook Activity与Context的startActivity调用链，验证代理注入与委托。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-14-hook",
    tags: ["Android进阶解密", "Android 8.0", "第14章 Hook技术", "代理模式"],
    id: "aad8-14-hook-q2",
    level: 1,
    question: "“第14章 Hook技术”的最小运行不变量是什么？",
    answer:
      "Hook对象与原对象满足同一接口，未命中的调用完整委托，命中调用可记录/改写且能恢复原引用，不破坏并发与异常语义",
  },
  {
    chapter: "aad8-14-hook",
    tags: ["Android进阶解密", "Android 8.0", "第14章 Hook技术", "动态代理"],
    id: "aad8-14-hook-q3",
    level: 2,
    question: "怎样为“第14章 Hook技术”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：按字段名反射替换单例却不校验Android 8.0版本，会因缓存位置或隐藏实现变化失效；吞掉未处理方法还会改变整个系统服务代理语义",
  },
  {
    chapter: "aad8-14-hook",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第14章 Hook技术",
      "IActivityManager",
    ],
    id: "aad8-14-hook-q4",
    level: 2,
    question: "为什么“第14章 Hook技术”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-14-hook",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第14章 Hook技术",
      "Instrumentation",
    ],
    id: "aad8-14-hook-q5",
    level: 3,
    question: "如何验证“第14章 Hook技术”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-14-hook",
    tags: ["Android进阶解密", "Android 8.0", "第14章 Hook技术", "Hook"],
    id: "aad8-14-hook-q6",
    level: 3,
    question: "“第14章 Hook技术”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-15-pluginization",
    tags: ["Android进阶解密", "Android 8.0", "第15章 插件化原理", "动态加载"],
    id: "aad8-15-pluginization-q1",
    level: 1,
    question: "“第15章 插件化原理”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖25个目录/复习节点，主链是从动态加载与工程瓶颈出发，串联Activity、Service、ContentProvider、BroadcastReceiver、资源和so六类插件化边界。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-15-pluginization",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第15章 插件化原理",
      "IActivityManager Hook",
    ],
    id: "aad8-15-pluginization-q2",
    level: 1,
    question: "“第15章 插件化原理”的最小运行不变量是什么？",
    answer:
      "宿主能加载插件代码/资源并通过占位或代理满足Android 8.0组件注册检查，同时恢复真实组件生命周期、Context、类加载器与资源",
  },
  {
    chapter: "aad8-15-pluginization",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第15章 插件化原理",
      "Instrumentation Hook",
    ],
    id: "aad8-15-pluginization-q3",
    level: 2,
    question: "怎样为“第15章 插件化原理”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：只让插件Activity显示不等于插件化完成；Service粘性、Provider authority、广播注册、资源ID冲突和so ABI任一遗漏都会破坏组件语义",
  },
  {
    chapter: "aad8-15-pluginization",
    tags: ["Android进阶解密", "Android 8.0", "第15章 插件化原理", "VirtualApk"],
    id: "aad8-15-pluginization-q4",
    level: 2,
    question: "为什么“第15章 插件化原理”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-15-pluginization",
    tags: ["Android进阶解密", "Android 8.0", "第15章 插件化原理", "资源插件化"],
    id: "aad8-15-pluginization-q5",
    level: 3,
    question: "如何验证“第15章 插件化原理”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-15-pluginization",
    tags: ["Android进阶解密", "Android 8.0", "第15章 插件化原理", "动态加载"],
    id: "aad8-15-pluginization-q6",
    level: 3,
    question: "“第15章 插件化原理”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-16-rendering-optimization",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第16章 绘制优化",
      "Profile GPU Rendering",
    ],
    id: "aad8-16-rendering-optimization-q1",
    level: 1,
    question: "“第16章 绘制优化”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖10个目录/复习节点，主链是先用绘制原理、Profile GPU Rendering、Systrace和Traceview定位瓶颈，再以布局工具、层级简化和过度绘制治理完成优化。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-16-rendering-optimization",
    tags: ["Android进阶解密", "Android 8.0", "第16章 绘制优化", "Systrace"],
    id: "aad8-16-rendering-optimization-q2",
    level: 1,
    question: "“第16章 绘制优化”的最小运行不变量是什么？",
    answer:
      "优化前后使用同设备、同构建、同场景与同帧窗口，既报告CPU/UI线程阶段，也验证GPU柱状、层级和过度绘制改善且画面不变",
  },
  {
    chapter: "aad8-16-rendering-optimization",
    tags: ["Android进阶解密", "Android 8.0", "第16章 绘制优化", "Traceview"],
    id: "aad8-16-rendering-optimization-q3",
    level: 2,
    question: "怎样为“第16章 绘制优化”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：凭主观顺滑或只看平均帧耗时会掩盖长尾卡顿；盲目减少View数量也可能增加measure复杂度、缓存失效或渲染错误",
  },
  {
    chapter: "aad8-16-rendering-optimization",
    tags: ["Android进阶解密", "Android 8.0", "第16章 绘制优化", "布局层级"],
    id: "aad8-16-rendering-optimization-q4",
    level: 2,
    question: "为什么“第16章 绘制优化”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-16-rendering-optimization",
    tags: ["Android进阶解密", "Android 8.0", "第16章 绘制优化", "过度绘制"],
    id: "aad8-16-rendering-optimization-q5",
    level: 3,
    question: "如何验证“第16章 绘制优化”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-16-rendering-optimization",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第16章 绘制优化",
      "Profile GPU Rendering",
    ],
    id: "aad8-16-rendering-optimization-q6",
    level: 3,
    question: "“第16章 绘制优化”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-17-memory-optimization",
    tags: ["Android进阶解密", "Android 8.0", "第17章 内存优化", "内存泄漏"],
    id: "aad8-17-memory-optimization-q1",
    level: 1,
    question: "“第17章 内存优化”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖20个目录/复习节点，主链是从可控泄漏场景出发，依次使用Memory Monitor、Allocation Tracker、Heap Dump、MAT和LeakCanary形成发现到根因的证据链。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-17-memory-optimization",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第17章 内存优化",
      "Memory Monitor",
    ],
    id: "aad8-17-memory-optimization-q2",
    level: 1,
    question: "“第17章 内存优化”的最小运行不变量是什么？",
    answer:
      "泄漏结论必须显示预期销毁对象仍被GC Root路径持有；优化后重复场景中对象可回收、堆稳态恢复且无功能回归",
  },
  {
    chapter: "aad8-17-memory-optimization",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "第17章 内存优化",
      "Allocation Tracker",
    ],
    id: "aad8-17-memory-optimization-q3",
    level: 2,
    question: "怎样为“第17章 内存优化”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：把一次堆增长当泄漏或只贴LeakCanary结论会混淆缓存、抖动与真实不可达失败，也无法证明修复后的稳定状态",
  },
  {
    chapter: "aad8-17-memory-optimization",
    tags: ["Android进阶解密", "Android 8.0", "第17章 内存优化", "Heap Dump"],
    id: "aad8-17-memory-optimization-q4",
    level: 2,
    question: "为什么“第17章 内存优化”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-17-memory-optimization",
    tags: ["Android进阶解密", "Android 8.0", "第17章 内存优化", "LeakCanary"],
    id: "aad8-17-memory-optimization-q5",
    level: 3,
    question: "如何验证“第17章 内存优化”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-17-memory-optimization",
    tags: ["Android进阶解密", "Android 8.0", "第17章 内存优化", "内存泄漏"],
    id: "aad8-17-memory-optimization-q6",
    level: 3,
    question: "“第17章 内存优化”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
  {
    chapter: "aad8-official-final-review",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码总复习",
      "端到端追踪",
    ],
    id: "aad8-official-final-review-q1",
    level: 1,
    question: "“Android 8.0源码总复习”在Android 8.0中的主链和正式分母是什么？",
    answer:
      "本页完整覆盖17个目录/复习节点，主链是用一个应用启动、插件组件和性能故障贯通17章，从init到窗口首帧，再到ClassLoader/Hook/插件化与内存回收。所有类、工具和行为固定Android 8.0。",
  },
  {
    chapter: "aad8-official-final-review",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码总复习",
      "Binder边界",
    ],
    id: "aad8-official-final-review-q2",
    level: 1,
    question: "“Android 8.0源码总复习”的最小运行不变量是什么？",
    answer:
      "独立复核者可从同一Android 8.0镜像和样例复现跨进程调用、类/资源加载、帧与堆证据，并明确停止和回退条件",
  },
  {
    chapter: "aad8-official-final-review",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码总复习",
      "加载边界",
    ],
    id: "aad8-official-final-review-q3",
    level: 2,
    question: "怎样为“Android 8.0源码总复习”构造单变量失败实验？",
    answer:
      "固定Android 8.0镜像、构建、数据和操作，只改变一个进程、线程、token、加载顺序、帧负载或对象引用；重点反证：分章背诵类名却不能沿同一请求跨章追踪，会在系统版本、进程切换或性能症状变化时失去诊断能力",
  },
  {
    chapter: "aad8-official-final-review",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码总复习",
      "性能证据",
    ],
    id: "aad8-official-final-review-q4",
    level: 2,
    question: "为什么“Android 8.0源码总复习”不能只靠调用栈截图验收？",
    answer:
      "调用栈只代表某一瞬间的控制流，不能证明进程/线程、状态前后值、异步完成、资源释放和最终业务事实；需要源码、轨迹与状态对账。",
  },
  {
    chapter: "aad8-official-final-review",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码总复习",
      "独立交接",
    ],
    id: "aad8-official-final-review-q5",
    level: 3,
    question: "如何验证“Android 8.0源码总复习”没有混入后续Android版本？",
    answer:
      "核对AOSP标签、源码路径、类和工具，排除Android 10后的ATMS、现代ART/Profiler/Perfetto和新隐藏API规则；迁移差异必须单独标注。",
  },
  {
    chapter: "aad8-official-final-review",
    tags: [
      "Android进阶解密",
      "Android 8.0",
      "Android 8.0源码总复习",
      "端到端追踪",
    ],
    id: "aad8-official-final-review-q6",
    level: 3,
    question: "“Android 8.0源码总复习”独立交接必须包含什么？",
    answer:
      "需要出版社目录、Android版本、源码文件/符号、PID/TID或加载器身份、状态轨迹、失败注入、日志/追踪/堆证据、最终结果、停止、恢复、回退、责任人与复核人。",
  },
];
