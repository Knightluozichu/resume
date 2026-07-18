import type { ReviewQuestion } from "./types";

export const davSeriesOfficialQuestions: ReviewQuestion[] = [
  {
    "id": "dav-series-official-learning-map-q1",
    "chapter": "dav-series-official-learning-map",
    "level": 1,
    "question": "为什么《深入理解Android》Framework三卷权威学习地图必须覆盖26个正式目录节点？",
    "answer": "这些节点共同组成“以卷I Native Framework、卷II非UI Java Framework、卷III UI Framework贯通26章525个目录节点”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "《深入理解Android》Framework三卷权威学习地图"
    ]
  },
  {
    "id": "dav-series-official-learning-map-q2",
    "chapter": "dav-series-official-learning-map",
    "level": 1,
    "question": "《深入理解Android》Framework三卷权威学习地图的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由三卷版本卡、26章目录矩阵、跨卷Binder/启动/UI主线、失败实验与迁移账本证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "《深入理解Android》Framework三卷权威学习地图"
    ]
  },
  {
    "id": "dav-series-official-learning-map-q3",
    "chapter": "dav-series-official-learning-map",
    "level": 2,
    "question": "《深入理解Android》Framework三卷权威学习地图怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "《深入理解Android》Framework三卷权威学习地图"
    ]
  },
  {
    "id": "dav-series-official-learning-map-q4",
    "chapter": "dav-series-official-learning-map",
    "level": 2,
    "question": "《深入理解Android》Framework三卷权威学习地图怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "《深入理解Android》Framework三卷权威学习地图"
    ]
  },
  {
    "id": "dav-series-official-learning-map-q5",
    "chapter": "dav-series-official-learning-map",
    "level": 3,
    "question": "《深入理解Android》Framework三卷权威学习地图为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "《深入理解Android》Framework三卷权威学习地图"
    ]
  },
  {
    "id": "dav-series-official-learning-map-q6",
    "chapter": "dav-series-official-learning-map",
    "level": 3,
    "question": "《深入理解Android》Framework三卷权威学习地图迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "《深入理解Android》Framework三卷权威学习地图"
    ]
  },
  {
    "id": "dav-v1-01-preparation-q1",
    "chapter": "dav-v1-01-preparation",
    "level": 1,
    "question": "为什么卷I 第1章 阅读前的准备工作必须覆盖11个正式目录节点？",
    "answer": "这些节点共同组成“建立Android 2.2四层架构、源码构建与阅读工具的统一坐标”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷I 第1章 阅读前的准备工作"
    ]
  },
  {
    "id": "dav-v1-01-preparation-q2",
    "chapter": "dav-v1-01-preparation",
    "level": 1,
    "question": "卷I 第1章 阅读前的准备工作的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由android-2.2_r1标签、构建产物、进程清单、源码索引与Busybox命令结果证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷I 第1章 阅读前的准备工作"
    ]
  },
  {
    "id": "dav-v1-01-preparation-q3",
    "chapter": "dav-v1-01-preparation",
    "level": 2,
    "question": "卷I 第1章 阅读前的准备工作怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷I 第1章 阅读前的准备工作"
    ]
  },
  {
    "id": "dav-v1-01-preparation-q4",
    "chapter": "dav-v1-01-preparation",
    "level": 2,
    "question": "卷I 第1章 阅读前的准备工作怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷I 第1章 阅读前的准备工作"
    ]
  },
  {
    "id": "dav-v1-01-preparation-q5",
    "chapter": "dav-v1-01-preparation",
    "level": 3,
    "question": "卷I 第1章 阅读前的准备工作为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷I 第1章 阅读前的准备工作"
    ]
  },
  {
    "id": "dav-v1-01-preparation-q6",
    "chapter": "dav-v1-01-preparation",
    "level": 3,
    "question": "卷I 第1章 阅读前的准备工作迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷I 第1章 阅读前的准备工作"
    ]
  },
  {
    "id": "dav-v1-02-jni-q1",
    "chapter": "dav-v1-02-jni",
    "level": 1,
    "question": "为什么卷I 第2章 深入理解JNI必须覆盖16个正式目录节点？",
    "answer": "这些节点共同组成“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷I 第2章 深入理解JNI"
    ]
  },
  {
    "id": "dav-v1-02-jni-q2",
    "chapter": "dav-v1-02-jni",
    "level": 1,
    "question": "卷I 第2章 深入理解JNI的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷I 第2章 深入理解JNI"
    ]
  },
  {
    "id": "dav-v1-02-jni-q3",
    "chapter": "dav-v1-02-jni",
    "level": 2,
    "question": "卷I 第2章 深入理解JNI怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷I 第2章 深入理解JNI"
    ]
  },
  {
    "id": "dav-v1-02-jni-q4",
    "chapter": "dav-v1-02-jni",
    "level": 2,
    "question": "卷I 第2章 深入理解JNI怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷I 第2章 深入理解JNI"
    ]
  },
  {
    "id": "dav-v1-02-jni-q5",
    "chapter": "dav-v1-02-jni",
    "level": 3,
    "question": "卷I 第2章 深入理解JNI为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷I 第2章 深入理解JNI"
    ]
  },
  {
    "id": "dav-v1-02-jni-q6",
    "chapter": "dav-v1-02-jni",
    "level": 3,
    "question": "卷I 第2章 深入理解JNI迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷I 第2章 深入理解JNI"
    ]
  },
  {
    "id": "dav-v1-03-init-q1",
    "chapter": "dav-v1-03-init",
    "level": 1,
    "question": "为什么卷I 第3章 深入理解init必须覆盖8个正式目录节点？",
    "answer": "这些节点共同组成“从PID 1解析init.rc、启动service并建立属性服务”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷I 第3章 深入理解init"
    ]
  },
  {
    "id": "dav-v1-03-init-q2",
    "chapter": "dav-v1-03-init",
    "level": 1,
    "question": "卷I 第3章 深入理解init的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由action/service解析表、进程父子关系、property socket请求、重启策略与失败日志证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷I 第3章 深入理解init"
    ]
  },
  {
    "id": "dav-v1-03-init-q3",
    "chapter": "dav-v1-03-init",
    "level": 2,
    "question": "卷I 第3章 深入理解init怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷I 第3章 深入理解init"
    ]
  },
  {
    "id": "dav-v1-03-init-q4",
    "chapter": "dav-v1-03-init",
    "level": 2,
    "question": "卷I 第3章 深入理解init怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷I 第3章 深入理解init"
    ]
  },
  {
    "id": "dav-v1-03-init-q5",
    "chapter": "dav-v1-03-init",
    "level": 3,
    "question": "卷I 第3章 深入理解init为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷I 第3章 深入理解init"
    ]
  },
  {
    "id": "dav-v1-03-init-q6",
    "chapter": "dav-v1-03-init",
    "level": 3,
    "question": "卷I 第3章 深入理解init迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷I 第3章 深入理解init"
    ]
  },
  {
    "id": "dav-v1-04-zygote-q1",
    "chapter": "dav-v1-04-zygote",
    "level": 1,
    "question": "为什么卷I 第4章 深入理解zygote必须覆盖19个正式目录节点？",
    "answer": "这些节点共同组成“追踪app_process进入Java世界、SystemServer诞生与应用进程fork”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷I 第4章 深入理解zygote"
    ]
  },
  {
    "id": "dav-v1-04-zygote-q2",
    "chapter": "dav-v1-04-zygote",
    "level": 1,
    "question": "卷I 第4章 深入理解zygote的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由Zygote socket、预加载集合、fork前后PID与页共享、AMS请求、Watchdog和启动耗时证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷I 第4章 深入理解zygote"
    ]
  },
  {
    "id": "dav-v1-04-zygote-q3",
    "chapter": "dav-v1-04-zygote",
    "level": 2,
    "question": "卷I 第4章 深入理解zygote怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷I 第4章 深入理解zygote"
    ]
  },
  {
    "id": "dav-v1-04-zygote-q4",
    "chapter": "dav-v1-04-zygote",
    "level": 2,
    "question": "卷I 第4章 深入理解zygote怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷I 第4章 深入理解zygote"
    ]
  },
  {
    "id": "dav-v1-04-zygote-q5",
    "chapter": "dav-v1-04-zygote",
    "level": 3,
    "question": "卷I 第4章 深入理解zygote为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷I 第4章 深入理解zygote"
    ]
  },
  {
    "id": "dav-v1-04-zygote-q6",
    "chapter": "dav-v1-04-zygote",
    "level": 3,
    "question": "卷I 第4章 深入理解zygote迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷I 第4章 深入理解zygote"
    ]
  },
  {
    "id": "dav-v1-05-common-classes-q1",
    "chapter": "dav-v1-05-common-classes",
    "level": 1,
    "question": "为什么卷I 第5章 深入理解常见类必须覆盖17个正式目录节点？",
    "answer": "这些节点共同组成“用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷I 第5章 深入理解常见类"
    ]
  },
  {
    "id": "dav-v1-05-common-classes-q2",
    "chapter": "dav-v1-05-common-classes",
    "level": 1,
    "question": "卷I 第5章 深入理解常见类的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由强弱计数轨迹、首次引用/最后引用回调、线程状态、锁顺序、Message入队与唤醒时间证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷I 第5章 深入理解常见类"
    ]
  },
  {
    "id": "dav-v1-05-common-classes-q3",
    "chapter": "dav-v1-05-common-classes",
    "level": 2,
    "question": "卷I 第5章 深入理解常见类怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷I 第5章 深入理解常见类"
    ]
  },
  {
    "id": "dav-v1-05-common-classes-q4",
    "chapter": "dav-v1-05-common-classes",
    "level": 2,
    "question": "卷I 第5章 深入理解常见类怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷I 第5章 深入理解常见类"
    ]
  },
  {
    "id": "dav-v1-05-common-classes-q5",
    "chapter": "dav-v1-05-common-classes",
    "level": 3,
    "question": "卷I 第5章 深入理解常见类为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷I 第5章 深入理解常见类"
    ]
  },
  {
    "id": "dav-v1-05-common-classes-q6",
    "chapter": "dav-v1-05-common-classes",
    "level": 3,
    "question": "卷I 第5章 深入理解常见类迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷I 第5章 深入理解常见类"
    ]
  },
  {
    "id": "dav-v1-06-binder-native-q1",
    "chapter": "dav-v1-06-binder-native",
    "level": 1,
    "question": "为什么卷I 第6章 深入理解Binder必须覆盖24个正式目录节点？",
    "answer": "这些节点共同组成“从MediaServer进入ProcessState、IPCThreadState、驱动协议、ServiceManager与服务客户端”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷I 第6章 深入理解Binder"
    ]
  },
  {
    "id": "dav-v1-06-binder-native-q2",
    "chapter": "dav-v1-06-binder-native",
    "level": 1,
    "question": "卷I 第6章 深入理解Binder的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由设备节点、mmap区域、BC/BR命令、handle/node/ref、线程池、死亡通知和Parcel边界证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷I 第6章 深入理解Binder"
    ]
  },
  {
    "id": "dav-v1-06-binder-native-q3",
    "chapter": "dav-v1-06-binder-native",
    "level": 2,
    "question": "卷I 第6章 深入理解Binder怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷I 第6章 深入理解Binder"
    ]
  },
  {
    "id": "dav-v1-06-binder-native-q4",
    "chapter": "dav-v1-06-binder-native",
    "level": 2,
    "question": "卷I 第6章 深入理解Binder怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷I 第6章 深入理解Binder"
    ]
  },
  {
    "id": "dav-v1-06-binder-native-q5",
    "chapter": "dav-v1-06-binder-native",
    "level": 3,
    "question": "卷I 第6章 深入理解Binder为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷I 第6章 深入理解Binder"
    ]
  },
  {
    "id": "dav-v1-06-binder-native-q6",
    "chapter": "dav-v1-06-binder-native",
    "level": 3,
    "question": "卷I 第6章 深入理解Binder迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷I 第6章 深入理解Binder"
    ]
  },
  {
    "id": "dav-v1-07-audio-native-q1",
    "chapter": "dav-v1-07-audio-native",
    "level": 1,
    "question": "为什么卷I 第7章 深入理解Audio系统必须覆盖21个正式目录节点？",
    "answer": "这些节点共同组成“追踪AudioTrack数据写入、AudioFlinger混音与AudioPolicy路由决策”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷I 第7章 深入理解Audio系统"
    ]
  },
  {
    "id": "dav-v1-07-audio-native-q2",
    "chapter": "dav-v1-07-audio-native",
    "level": 1,
    "question": "卷I 第7章 深入理解Audio系统的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由共享控制块读写指针、MixerThread周期、格式/采样率、路由设备、音量与欠载样本证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷I 第7章 深入理解Audio系统"
    ]
  },
  {
    "id": "dav-v1-07-audio-native-q3",
    "chapter": "dav-v1-07-audio-native",
    "level": 2,
    "question": "卷I 第7章 深入理解Audio系统怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷I 第7章 深入理解Audio系统"
    ]
  },
  {
    "id": "dav-v1-07-audio-native-q4",
    "chapter": "dav-v1-07-audio-native",
    "level": 2,
    "question": "卷I 第7章 深入理解Audio系统怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷I 第7章 深入理解Audio系统"
    ]
  },
  {
    "id": "dav-v1-07-audio-native-q5",
    "chapter": "dav-v1-07-audio-native",
    "level": 3,
    "question": "卷I 第7章 深入理解Audio系统为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷I 第7章 深入理解Audio系统"
    ]
  },
  {
    "id": "dav-v1-07-audio-native-q6",
    "chapter": "dav-v1-07-audio-native",
    "level": 3,
    "question": "卷I 第7章 深入理解Audio系统迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷I 第7章 深入理解Audio系统"
    ]
  },
  {
    "id": "dav-v1-08-surface-q1",
    "chapter": "dav-v1-08-surface",
    "level": 1,
    "question": "为什么卷I 第8章 深入理解Surface系统必须覆盖30个正式目录节点？",
    "answer": "这些节点共同组成“连接Activity绘制、Surface对象迁移、GraphicBuffer传输与SurfaceFlinger合成”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷I 第8章 深入理解Surface系统"
    ]
  },
  {
    "id": "dav-v1-08-surface-q2",
    "chapter": "dav-v1-08-surface",
    "level": 1,
    "question": "卷I 第8章 深入理解Surface系统的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由窗口/Surface身份、Parcel句柄、缓冲区生产消费序列、事务、脏区、Layer与显示帧证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷I 第8章 深入理解Surface系统"
    ]
  },
  {
    "id": "dav-v1-08-surface-q3",
    "chapter": "dav-v1-08-surface",
    "level": 2,
    "question": "卷I 第8章 深入理解Surface系统怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷I 第8章 深入理解Surface系统"
    ]
  },
  {
    "id": "dav-v1-08-surface-q4",
    "chapter": "dav-v1-08-surface",
    "level": 2,
    "question": "卷I 第8章 深入理解Surface系统怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷I 第8章 深入理解Surface系统"
    ]
  },
  {
    "id": "dav-v1-08-surface-q5",
    "chapter": "dav-v1-08-surface",
    "level": 3,
    "question": "卷I 第8章 深入理解Surface系统为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷I 第8章 深入理解Surface系统"
    ]
  },
  {
    "id": "dav-v1-08-surface-q6",
    "chapter": "dav-v1-08-surface",
    "level": 3,
    "question": "卷I 第8章 深入理解Surface系统迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷I 第8章 深入理解Surface系统"
    ]
  },
  {
    "id": "dav-v1-09-vold-rild-q1",
    "chapter": "dav-v1-09-vold-rild",
    "level": 1,
    "question": "为什么卷I 第9章 深入理解Vold和Rild必须覆盖22个正式目录节点？",
    "answer": "这些节点共同组成“比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷I 第9章 深入理解Vold和Rild"
    ]
  },
  {
    "id": "dav-v1-09-vold-rild-q2",
    "chapter": "dav-v1-09-vold-rild",
    "level": 1,
    "question": "卷I 第9章 深入理解Vold和Rild的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由uevent序列、Volume状态、CommandListener会话、RIL请求号、回调线程和超时恢复证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷I 第9章 深入理解Vold和Rild"
    ]
  },
  {
    "id": "dav-v1-09-vold-rild-q3",
    "chapter": "dav-v1-09-vold-rild",
    "level": 2,
    "question": "卷I 第9章 深入理解Vold和Rild怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷I 第9章 深入理解Vold和Rild"
    ]
  },
  {
    "id": "dav-v1-09-vold-rild-q4",
    "chapter": "dav-v1-09-vold-rild",
    "level": 2,
    "question": "卷I 第9章 深入理解Vold和Rild怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷I 第9章 深入理解Vold和Rild"
    ]
  },
  {
    "id": "dav-v1-09-vold-rild-q5",
    "chapter": "dav-v1-09-vold-rild",
    "level": 3,
    "question": "卷I 第9章 深入理解Vold和Rild为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷I 第9章 深入理解Vold和Rild"
    ]
  },
  {
    "id": "dav-v1-09-vold-rild-q6",
    "chapter": "dav-v1-09-vold-rild",
    "level": 3,
    "question": "卷I 第9章 深入理解Vold和Rild迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷I 第9章 深入理解Vold和Rild"
    ]
  },
  {
    "id": "dav-v1-10-media-scanner-q1",
    "chapter": "dav-v1-10-media-scanner",
    "level": 1,
    "question": "为什么卷I 第10章 深入理解MediaScanner必须覆盖15个正式目录节点？",
    "answer": "这些节点共同组成“贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷I 第10章 深入理解MediaScanner"
    ]
  },
  {
    "id": "dav-v1-10-media-scanner-q2",
    "chapter": "dav-v1-10-media-scanner",
    "level": 1,
    "question": "卷I 第10章 深入理解MediaScanner的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由挂载广播、扫描任务、文件元数据、JNI回调、数据库行、重复扫描和损坏文件样本证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷I 第10章 深入理解MediaScanner"
    ]
  },
  {
    "id": "dav-v1-10-media-scanner-q3",
    "chapter": "dav-v1-10-media-scanner",
    "level": 2,
    "question": "卷I 第10章 深入理解MediaScanner怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷I 第10章 深入理解MediaScanner"
    ]
  },
  {
    "id": "dav-v1-10-media-scanner-q4",
    "chapter": "dav-v1-10-media-scanner",
    "level": 2,
    "question": "卷I 第10章 深入理解MediaScanner怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷I 第10章 深入理解MediaScanner"
    ]
  },
  {
    "id": "dav-v1-10-media-scanner-q5",
    "chapter": "dav-v1-10-media-scanner",
    "level": 3,
    "question": "卷I 第10章 深入理解MediaScanner为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷I 第10章 深入理解MediaScanner"
    ]
  },
  {
    "id": "dav-v1-10-media-scanner-q6",
    "chapter": "dav-v1-10-media-scanner",
    "level": 3,
    "question": "卷I 第10章 深入理解MediaScanner迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷I 第10章 深入理解MediaScanner"
    ]
  },
  {
    "id": "dav-v2-01-source-environment-q1",
    "chapter": "dav-v2-01-source-environment",
    "level": 1,
    "question": "为什么卷II 第1章 搭建Android源码工作环境必须覆盖7个正式目录节点？",
    "answer": "这些节点共同组成“在Android 4.0.1上建立源码下载、编译与system_process调试基线”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷II 第1章 搭建Android源码工作环境"
    ]
  },
  {
    "id": "dav-v2-01-source-environment-q2",
    "chapter": "dav-v2-01-source-environment",
    "level": 1,
    "question": "卷II 第1章 搭建Android源码工作环境的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由manifest标签、编译目标、framework产物、Eclipse符号、调试端口与断点线程证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷II 第1章 搭建Android源码工作环境"
    ]
  },
  {
    "id": "dav-v2-01-source-environment-q3",
    "chapter": "dav-v2-01-source-environment",
    "level": 2,
    "question": "卷II 第1章 搭建Android源码工作环境怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷II 第1章 搭建Android源码工作环境"
    ]
  },
  {
    "id": "dav-v2-01-source-environment-q4",
    "chapter": "dav-v2-01-source-environment",
    "level": 2,
    "question": "卷II 第1章 搭建Android源码工作环境怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷II 第1章 搭建Android源码工作环境"
    ]
  },
  {
    "id": "dav-v2-01-source-environment-q5",
    "chapter": "dav-v2-01-source-environment",
    "level": 3,
    "question": "卷II 第1章 搭建Android源码工作环境为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷II 第1章 搭建Android源码工作环境"
    ]
  },
  {
    "id": "dav-v2-01-source-environment-q6",
    "chapter": "dav-v2-01-source-environment",
    "level": 3,
    "question": "卷II 第1章 搭建Android源码工作环境迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷II 第1章 搭建Android源码工作环境"
    ]
  },
  {
    "id": "dav-v2-02-java-binder-messagequeue-q1",
    "chapter": "dav-v2-02-java-binder-messagequeue",
    "level": 1,
    "question": "为什么卷II 第2章 深入理解Java Binder和MessageQueue必须覆盖13个正式目录节点？",
    "answer": "这些节点共同组成“连接Java Binder初始化、addService与MessageQueue的Native轮询”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷II 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v2-02-java-binder-messagequeue-q2",
    "chapter": "dav-v2-02-java-binder-messagequeue",
    "level": 1,
    "question": "卷II 第2章 深入理解Java Binder和MessageQueue的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由Java/Native对象映射、事务码、服务注册、队列头时间、epoll唤醒与线程身份证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷II 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v2-02-java-binder-messagequeue-q3",
    "chapter": "dav-v2-02-java-binder-messagequeue",
    "level": 2,
    "question": "卷II 第2章 深入理解Java Binder和MessageQueue怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷II 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v2-02-java-binder-messagequeue-q4",
    "chapter": "dav-v2-02-java-binder-messagequeue",
    "level": 2,
    "question": "卷II 第2章 深入理解Java Binder和MessageQueue怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷II 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v2-02-java-binder-messagequeue-q5",
    "chapter": "dav-v2-02-java-binder-messagequeue",
    "level": 3,
    "question": "卷II 第2章 深入理解Java Binder和MessageQueue为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷II 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v2-02-java-binder-messagequeue-q6",
    "chapter": "dav-v2-02-java-binder-messagequeue",
    "level": 3,
    "question": "卷II 第2章 深入理解Java Binder和MessageQueue迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷II 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v2-03-system-server-q1",
    "chapter": "dav-v2-03-system-server",
    "level": 1,
    "question": "为什么卷II 第3章 深入理解SystemServer必须覆盖21个正式目录节点？",
    "answer": "这些节点共同组成“从SystemServer main进入服务群并剖析熵、日志、磁盘、采样与剪贴板服务”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷II 第3章 深入理解SystemServer"
    ]
  },
  {
    "id": "dav-v2-03-system-server-q2",
    "chapter": "dav-v2-03-system-server",
    "level": 1,
    "question": "卷II 第3章 深入理解SystemServer的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由服务启动顺序、Binder名称、settings状态、文件写入、磁盘阈值、采样快照与权限检查证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷II 第3章 深入理解SystemServer"
    ]
  },
  {
    "id": "dav-v2-03-system-server-q3",
    "chapter": "dav-v2-03-system-server",
    "level": 2,
    "question": "卷II 第3章 深入理解SystemServer怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷II 第3章 深入理解SystemServer"
    ]
  },
  {
    "id": "dav-v2-03-system-server-q4",
    "chapter": "dav-v2-03-system-server",
    "level": 2,
    "question": "卷II 第3章 深入理解SystemServer怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷II 第3章 深入理解SystemServer"
    ]
  },
  {
    "id": "dav-v2-03-system-server-q5",
    "chapter": "dav-v2-03-system-server",
    "level": 3,
    "question": "卷II 第3章 深入理解SystemServer为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷II 第3章 深入理解SystemServer"
    ]
  },
  {
    "id": "dav-v2-03-system-server-q6",
    "chapter": "dav-v2-03-system-server",
    "level": 3,
    "question": "卷II 第3章 深入理解SystemServer迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷II 第3章 深入理解SystemServer"
    ]
  },
  {
    "id": "dav-v2-04-package-manager-service-q1",
    "chapter": "dav-v2-04-package-manager-service",
    "level": 1,
    "question": "为什么卷II 第4章 深入理解PackageManagerService必须覆盖24个正式目录节点？",
    "answer": "这些节点共同组成“追踪PKMS启动扫描、APK安装验证、Intent查询、installd与多用户状态”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷II 第4章 深入理解PackageManagerService"
    ]
  },
  {
    "id": "dav-v2-04-package-manager-service-q2",
    "chapter": "dav-v2-04-package-manager-service",
    "level": 1,
    "question": "卷II 第4章 深入理解PackageManagerService的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由扫描目录与Package对象、安装阶段、证书、Intent候选集、packages.xml、UID和数据目录证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷II 第4章 深入理解PackageManagerService"
    ]
  },
  {
    "id": "dav-v2-04-package-manager-service-q3",
    "chapter": "dav-v2-04-package-manager-service",
    "level": 2,
    "question": "卷II 第4章 深入理解PackageManagerService怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷II 第4章 深入理解PackageManagerService"
    ]
  },
  {
    "id": "dav-v2-04-package-manager-service-q4",
    "chapter": "dav-v2-04-package-manager-service",
    "level": 2,
    "question": "卷II 第4章 深入理解PackageManagerService怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷II 第4章 深入理解PackageManagerService"
    ]
  },
  {
    "id": "dav-v2-04-package-manager-service-q5",
    "chapter": "dav-v2-04-package-manager-service",
    "level": 3,
    "question": "卷II 第4章 深入理解PackageManagerService为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷II 第4章 深入理解PackageManagerService"
    ]
  },
  {
    "id": "dav-v2-04-package-manager-service-q6",
    "chapter": "dav-v2-04-package-manager-service",
    "level": 3,
    "question": "卷II 第4章 深入理解PackageManagerService迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷II 第4章 深入理解PackageManagerService"
    ]
  },
  {
    "id": "dav-v2-05-power-manager-service-q1",
    "chapter": "dav-v2-05-power-manager-service",
    "level": 1,
    "question": "为什么卷II 第5章 深入理解PowerManagerService必须覆盖22个正式目录节点？",
    "answer": "这些节点共同组成“连接PMS初始化、WakeLock、用户活动、电源键与电池统计”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷II 第5章 深入理解PowerManagerService"
    ]
  },
  {
    "id": "dav-v2-05-power-manager-service-q2",
    "chapter": "dav-v2-05-power-manager-service",
    "level": 1,
    "question": "卷II 第5章 深入理解PowerManagerService的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由电源状态、WakeLock持有者、超时、亮度、按键策略、电池广播、耗电归因和释放日志证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷II 第5章 深入理解PowerManagerService"
    ]
  },
  {
    "id": "dav-v2-05-power-manager-service-q3",
    "chapter": "dav-v2-05-power-manager-service",
    "level": 2,
    "question": "卷II 第5章 深入理解PowerManagerService怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷II 第5章 深入理解PowerManagerService"
    ]
  },
  {
    "id": "dav-v2-05-power-manager-service-q4",
    "chapter": "dav-v2-05-power-manager-service",
    "level": 2,
    "question": "卷II 第5章 深入理解PowerManagerService怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷II 第5章 深入理解PowerManagerService"
    ]
  },
  {
    "id": "dav-v2-05-power-manager-service-q5",
    "chapter": "dav-v2-05-power-manager-service",
    "level": 3,
    "question": "卷II 第5章 深入理解PowerManagerService为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷II 第5章 深入理解PowerManagerService"
    ]
  },
  {
    "id": "dav-v2-05-power-manager-service-q6",
    "chapter": "dav-v2-05-power-manager-service",
    "level": 3,
    "question": "卷II 第5章 深入理解PowerManagerService迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷II 第5章 深入理解PowerManagerService"
    ]
  },
  {
    "id": "dav-v2-06-activity-manager-service-q1",
    "chapter": "dav-v2-06-activity-manager-service",
    "level": 1,
    "question": "为什么卷II 第6章 深入理解ActivityManagerService必须覆盖33个正式目录节点？",
    "answer": "这些节点共同组成“剖析AMS启动、Activity、广播、Service、进程管理与崩溃回收”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷II 第6章 深入理解ActivityManagerService"
    ]
  },
  {
    "id": "dav-v2-06-activity-manager-service-q2",
    "chapter": "dav-v2-06-activity-manager-service",
    "level": 1,
    "question": "卷II 第6章 深入理解ActivityManagerService的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由Activity/Process记录、任务栈、广播队列、Service连接、oom_adj、死亡通知与ANR/Crash日志证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷II 第6章 深入理解ActivityManagerService"
    ]
  },
  {
    "id": "dav-v2-06-activity-manager-service-q3",
    "chapter": "dav-v2-06-activity-manager-service",
    "level": 2,
    "question": "卷II 第6章 深入理解ActivityManagerService怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷II 第6章 深入理解ActivityManagerService"
    ]
  },
  {
    "id": "dav-v2-06-activity-manager-service-q4",
    "chapter": "dav-v2-06-activity-manager-service",
    "level": 2,
    "question": "卷II 第6章 深入理解ActivityManagerService怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷II 第6章 深入理解ActivityManagerService"
    ]
  },
  {
    "id": "dav-v2-06-activity-manager-service-q5",
    "chapter": "dav-v2-06-activity-manager-service",
    "level": 3,
    "question": "卷II 第6章 深入理解ActivityManagerService为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷II 第6章 深入理解ActivityManagerService"
    ]
  },
  {
    "id": "dav-v2-06-activity-manager-service-q6",
    "chapter": "dav-v2-06-activity-manager-service",
    "level": 3,
    "question": "卷II 第6章 深入理解ActivityManagerService迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷II 第6章 深入理解ActivityManagerService"
    ]
  },
  {
    "id": "dav-v2-07-content-provider-q1",
    "chapter": "dav-v2-07-content-provider",
    "level": 1,
    "question": "为什么卷II 第7章 深入理解ContentProvider必须覆盖27个正式目录节点？",
    "answer": "这些节点共同组成“从MediaProvider启动进入SQLite、跨进程Cursor、关闭与文件描述符传递”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷II 第7章 深入理解ContentProvider"
    ]
  },
  {
    "id": "dav-v2-07-content-provider-q2",
    "chapter": "dav-v2-07-content-provider",
    "level": 1,
    "question": "卷II 第7章 深入理解ContentProvider的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由Provider发布表、数据库事务、Cursor窗口、引用计数、close/finalize、ParcelFileDescriptor与死亡清理证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷II 第7章 深入理解ContentProvider"
    ]
  },
  {
    "id": "dav-v2-07-content-provider-q3",
    "chapter": "dav-v2-07-content-provider",
    "level": 2,
    "question": "卷II 第7章 深入理解ContentProvider怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷II 第7章 深入理解ContentProvider"
    ]
  },
  {
    "id": "dav-v2-07-content-provider-q4",
    "chapter": "dav-v2-07-content-provider",
    "level": 2,
    "question": "卷II 第7章 深入理解ContentProvider怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷II 第7章 深入理解ContentProvider"
    ]
  },
  {
    "id": "dav-v2-07-content-provider-q5",
    "chapter": "dav-v2-07-content-provider",
    "level": 3,
    "question": "卷II 第7章 深入理解ContentProvider为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷II 第7章 深入理解ContentProvider"
    ]
  },
  {
    "id": "dav-v2-07-content-provider-q6",
    "chapter": "dav-v2-07-content-provider",
    "level": 3,
    "question": "卷II 第7章 深入理解ContentProvider迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷II 第7章 深入理解ContentProvider"
    ]
  },
  {
    "id": "dav-v2-08-content-account-sync-q1",
    "chapter": "dav-v2-08-content-account-sync",
    "level": 1,
    "question": "为什么卷II 第8章 深入理解ContentService和AccountManagerService必须覆盖17个正式目录节点？",
    "answer": "这些节点共同组成“连接内容观察者、账户认证与SyncManager调度的数据闭环”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷II 第8章 深入理解ContentService和AccountManagerService"
    ]
  },
  {
    "id": "dav-v2-08-content-account-sync-q2",
    "chapter": "dav-v2-08-content-account-sync",
    "level": 1,
    "question": "卷II 第8章 深入理解ContentService和AccountManagerService的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由Observer树、URI通知、账户令牌、Authenticator会话、同步请求、约束、重试与持久状态证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷II 第8章 深入理解ContentService和AccountManagerService"
    ]
  },
  {
    "id": "dav-v2-08-content-account-sync-q3",
    "chapter": "dav-v2-08-content-account-sync",
    "level": 2,
    "question": "卷II 第8章 深入理解ContentService和AccountManagerService怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷II 第8章 深入理解ContentService和AccountManagerService"
    ]
  },
  {
    "id": "dav-v2-08-content-account-sync-q4",
    "chapter": "dav-v2-08-content-account-sync",
    "level": 2,
    "question": "卷II 第8章 深入理解ContentService和AccountManagerService怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷II 第8章 深入理解ContentService和AccountManagerService"
    ]
  },
  {
    "id": "dav-v2-08-content-account-sync-q5",
    "chapter": "dav-v2-08-content-account-sync",
    "level": 3,
    "question": "卷II 第8章 深入理解ContentService和AccountManagerService为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷II 第8章 深入理解ContentService和AccountManagerService"
    ]
  },
  {
    "id": "dav-v2-08-content-account-sync-q6",
    "chapter": "dav-v2-08-content-account-sync",
    "level": 3,
    "question": "卷II 第8章 深入理解ContentService和AccountManagerService迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷II 第8章 深入理解ContentService和AccountManagerService"
    ]
  },
  {
    "id": "dav-v3-01-development-environment-q1",
    "chapter": "dav-v3-01-development-environment",
    "level": 1,
    "question": "为什么卷III 第1章 开发环境部署必须覆盖10个正式目录节点？",
    "answer": "这些节点共同组成“建立Android 4.2.2源码获取、编译、双IDE阅读与Java/Native调试环境”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷III 第1章 开发环境部署"
    ]
  },
  {
    "id": "dav-v3-01-development-environment-q2",
    "chapter": "dav-v3-01-development-environment",
    "level": 1,
    "question": "卷III 第1章 开发环境部署的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由android-4.2.2_r1标签、out产物、Eclipse/SourceInsight索引、JDWP与gdb断点证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷III 第1章 开发环境部署"
    ]
  },
  {
    "id": "dav-v3-01-development-environment-q3",
    "chapter": "dav-v3-01-development-environment",
    "level": 2,
    "question": "卷III 第1章 开发环境部署怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷III 第1章 开发环境部署"
    ]
  },
  {
    "id": "dav-v3-01-development-environment-q4",
    "chapter": "dav-v3-01-development-environment",
    "level": 2,
    "question": "卷III 第1章 开发环境部署怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷III 第1章 开发环境部署"
    ]
  },
  {
    "id": "dav-v3-01-development-environment-q5",
    "chapter": "dav-v3-01-development-environment",
    "level": 3,
    "question": "卷III 第1章 开发环境部署为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷III 第1章 开发环境部署"
    ]
  },
  {
    "id": "dav-v3-01-development-environment-q6",
    "chapter": "dav-v3-01-development-environment",
    "level": 3,
    "question": "卷III 第1章 开发环境部署迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷III 第1章 开发环境部署"
    ]
  },
  {
    "id": "dav-v3-02-java-binder-messagequeue-q1",
    "chapter": "dav-v3-02-java-binder-messagequeue",
    "level": 1,
    "question": "为什么卷III 第2章 深入理解Java Binder和MessageQueue必须覆盖14个正式目录节点？",
    "answer": "这些节点共同组成“以4.2.2更新Java Binder对象桥接、AIDL生成代码与MessageQueue轮询”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷III 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v3-02-java-binder-messagequeue-q2",
    "chapter": "dav-v3-02-java-binder-messagequeue",
    "level": 1,
    "question": "卷III 第2章 深入理解Java Binder和MessageQueue的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由BinderProxy/Binder对象映射、AIDL事务表、Parcel、队列时间、nativePollOnce与fd事件证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷III 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v3-02-java-binder-messagequeue-q3",
    "chapter": "dav-v3-02-java-binder-messagequeue",
    "level": 2,
    "question": "卷III 第2章 深入理解Java Binder和MessageQueue怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷III 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v3-02-java-binder-messagequeue-q4",
    "chapter": "dav-v3-02-java-binder-messagequeue",
    "level": 2,
    "question": "卷III 第2章 深入理解Java Binder和MessageQueue怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷III 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v3-02-java-binder-messagequeue-q5",
    "chapter": "dav-v3-02-java-binder-messagequeue",
    "level": 3,
    "question": "卷III 第2章 深入理解Java Binder和MessageQueue为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷III 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v3-02-java-binder-messagequeue-q6",
    "chapter": "dav-v3-02-java-binder-messagequeue",
    "level": 3,
    "question": "卷III 第2章 深入理解Java Binder和MessageQueue迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷III 第2章 深入理解Java Binder和MessageQueue"
    ]
  },
  {
    "id": "dav-v3-03-audio-service-q1",
    "chapter": "dav-v3-03-audio-service",
    "level": 1,
    "question": "为什么卷III 第3章 深入理解AudioService必须覆盖19个正式目录节点？",
    "answer": "这些节点共同组成“追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷III 第3章 深入理解AudioService"
    ]
  },
  {
    "id": "dav-v3-03-audio-service-q2",
    "chapter": "dav-v3-03-audio-service",
    "level": 1,
    "question": "卷III 第3章 深入理解AudioService的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由stream索引、别名、设备掩码、WiredAccessoryObserver事件、焦点栈、回调与持久设置证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷III 第3章 深入理解AudioService"
    ]
  },
  {
    "id": "dav-v3-03-audio-service-q3",
    "chapter": "dav-v3-03-audio-service",
    "level": 2,
    "question": "卷III 第3章 深入理解AudioService怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷III 第3章 深入理解AudioService"
    ]
  },
  {
    "id": "dav-v3-03-audio-service-q4",
    "chapter": "dav-v3-03-audio-service",
    "level": 2,
    "question": "卷III 第3章 深入理解AudioService怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷III 第3章 深入理解AudioService"
    ]
  },
  {
    "id": "dav-v3-03-audio-service-q5",
    "chapter": "dav-v3-03-audio-service",
    "level": 3,
    "question": "卷III 第3章 深入理解AudioService为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷III 第3章 深入理解AudioService"
    ]
  },
  {
    "id": "dav-v3-03-audio-service-q6",
    "chapter": "dav-v3-03-audio-service",
    "level": 3,
    "question": "卷III 第3章 深入理解AudioService迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷III 第3章 深入理解AudioService"
    ]
  },
  {
    "id": "dav-v3-04-window-manager-service-q1",
    "chapter": "dav-v3-04-window-manager-service",
    "level": 1,
    "question": "为什么卷III 第4章 深入理解WindowManagerService必须覆盖29个正式目录节点？",
    "answer": "这些节点共同组成“以窗口管理结构、Z序、布局与动画交替循环解释WMS”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷III 第4章 深入理解WindowManagerService"
    ]
  },
  {
    "id": "dav-v3-04-window-manager-service-q2",
    "chapter": "dav-v3-04-window-manager-service",
    "level": 1,
    "question": "卷III 第4章 深入理解WindowManagerService的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由WindowToken/WindowState/DisplayContent关系、layer、frame、Surface事务、动画时间线与移除状态证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷III 第4章 深入理解WindowManagerService"
    ]
  },
  {
    "id": "dav-v3-04-window-manager-service-q3",
    "chapter": "dav-v3-04-window-manager-service",
    "level": 2,
    "question": "卷III 第4章 深入理解WindowManagerService怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷III 第4章 深入理解WindowManagerService"
    ]
  },
  {
    "id": "dav-v3-04-window-manager-service-q4",
    "chapter": "dav-v3-04-window-manager-service",
    "level": 2,
    "question": "卷III 第4章 深入理解WindowManagerService怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷III 第4章 深入理解WindowManagerService"
    ]
  },
  {
    "id": "dav-v3-04-window-manager-service-q5",
    "chapter": "dav-v3-04-window-manager-service",
    "level": 3,
    "question": "卷III 第4章 深入理解WindowManagerService为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷III 第4章 深入理解WindowManagerService"
    ]
  },
  {
    "id": "dav-v3-04-window-manager-service-q6",
    "chapter": "dav-v3-04-window-manager-service",
    "level": 3,
    "question": "卷III 第4章 深入理解WindowManagerService迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷III 第4章 深入理解WindowManagerService"
    ]
  },
  {
    "id": "dav-v3-05-input-system-q1",
    "chapter": "dav-v3-05-input-system",
    "level": 1,
    "question": "为什么卷III 第5章 深入理解Android输入系统必须覆盖28个正式目录节点？",
    "answer": "这些节点共同组成“贯通Linux事件、EventHub、InputReader、InputDispatcher、InputChannel到窗口反馈”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷III 第5章 深入理解Android输入系统"
    ]
  },
  {
    "id": "dav-v3-05-input-system-q2",
    "chapter": "dav-v3-05-input-system",
    "level": 1,
    "question": "卷III 第5章 深入理解Android输入系统的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由event设备、原始/映射事件、焦点窗口、派发队列、socket通道、finish信号、ANR计时证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷III 第5章 深入理解Android输入系统"
    ]
  },
  {
    "id": "dav-v3-05-input-system-q3",
    "chapter": "dav-v3-05-input-system",
    "level": 2,
    "question": "卷III 第5章 深入理解Android输入系统怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷III 第5章 深入理解Android输入系统"
    ]
  },
  {
    "id": "dav-v3-05-input-system-q4",
    "chapter": "dav-v3-05-input-system",
    "level": 2,
    "question": "卷III 第5章 深入理解Android输入系统怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷III 第5章 深入理解Android输入系统"
    ]
  },
  {
    "id": "dav-v3-05-input-system-q5",
    "chapter": "dav-v3-05-input-system",
    "level": 3,
    "question": "卷III 第5章 深入理解Android输入系统为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷III 第5章 深入理解Android输入系统"
    ]
  },
  {
    "id": "dav-v3-05-input-system-q6",
    "chapter": "dav-v3-05-input-system",
    "level": 3,
    "question": "卷III 第5章 深入理解Android输入系统迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷III 第5章 深入理解Android输入系统"
    ]
  },
  {
    "id": "dav-v3-06-view-system-q1",
    "chapter": "dav-v3-06-view-system",
    "level": 1,
    "question": "为什么卷III 第6章 深入理解控件系统必须覆盖34个正式目录节点？",
    "answer": "这些节点共同组成“连接WindowManager、ViewRootImpl遍历、软硬件绘制、输入派发与Activity窗口”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷III 第6章 深入理解控件系统"
    ]
  },
  {
    "id": "dav-v3-06-view-system-q2",
    "chapter": "dav-v3-06-view-system",
    "level": 1,
    "question": "卷III 第6章 深入理解控件系统的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由窗口添加/更新/删除、measure-layout-draw、脏区、DisplayList、焦点、事件消费与PhoneWindow证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷III 第6章 深入理解控件系统"
    ]
  },
  {
    "id": "dav-v3-06-view-system-q3",
    "chapter": "dav-v3-06-view-system",
    "level": 2,
    "question": "卷III 第6章 深入理解控件系统怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷III 第6章 深入理解控件系统"
    ]
  },
  {
    "id": "dav-v3-06-view-system-q4",
    "chapter": "dav-v3-06-view-system",
    "level": 2,
    "question": "卷III 第6章 深入理解控件系统怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷III 第6章 深入理解控件系统"
    ]
  },
  {
    "id": "dav-v3-06-view-system-q5",
    "chapter": "dav-v3-06-view-system",
    "level": 3,
    "question": "卷III 第6章 深入理解控件系统为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷III 第6章 深入理解控件系统"
    ]
  },
  {
    "id": "dav-v3-06-view-system-q6",
    "chapter": "dav-v3-06-view-system",
    "level": 3,
    "question": "卷III 第6章 深入理解控件系统迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷III 第6章 深入理解控件系统"
    ]
  },
  {
    "id": "dav-v3-07-system-ui-q1",
    "chapter": "dav-v3-07-system-ui",
    "level": 1,
    "question": "为什么卷III 第7章 深入理解SystemUI必须覆盖26个正式目录节点？",
    "answer": "这些节点共同组成“剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷III 第7章 深入理解SystemUI"
    ]
  },
  {
    "id": "dav-v3-07-system-ui-q2",
    "chapter": "dav-v3-07-system-ui",
    "level": 1,
    "question": "卷III 第7章 深入理解SystemUI的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由SystemUIService组件、状态栏窗口树、通知记录、图标槽、导航键、disable位和visibility链证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷III 第7章 深入理解SystemUI"
    ]
  },
  {
    "id": "dav-v3-07-system-ui-q3",
    "chapter": "dav-v3-07-system-ui",
    "level": 2,
    "question": "卷III 第7章 深入理解SystemUI怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷III 第7章 深入理解SystemUI"
    ]
  },
  {
    "id": "dav-v3-07-system-ui-q4",
    "chapter": "dav-v3-07-system-ui",
    "level": 2,
    "question": "卷III 第7章 深入理解SystemUI怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷III 第7章 深入理解SystemUI"
    ]
  },
  {
    "id": "dav-v3-07-system-ui-q5",
    "chapter": "dav-v3-07-system-ui",
    "level": 3,
    "question": "卷III 第7章 深入理解SystemUI为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷III 第7章 深入理解SystemUI"
    ]
  },
  {
    "id": "dav-v3-07-system-ui-q6",
    "chapter": "dav-v3-07-system-ui",
    "level": 3,
    "question": "卷III 第7章 深入理解SystemUI迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷III 第7章 深入理解SystemUI"
    ]
  },
  {
    "id": "dav-v3-08-wallpaper-q1",
    "chapter": "dav-v3-08-wallpaper",
    "level": 1,
    "question": "为什么卷III 第8章 深入理解Android壁纸必须覆盖18个正式目录节点？",
    "answer": "这些节点共同组成“连接动态壁纸Engine、静态ImageWallpaper与WMS壁纸窗口策略”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "卷III 第8章 深入理解Android壁纸"
    ]
  },
  {
    "id": "dav-v3-08-wallpaper-q2",
    "chapter": "dav-v3-08-wallpaper",
    "level": 1,
    "question": "卷III 第8章 深入理解Android壁纸的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由壁纸服务绑定、Engine surface、位图文件、Observer、窗口Z序、可见性、偏移和动画状态证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "卷III 第8章 深入理解Android壁纸"
    ]
  },
  {
    "id": "dav-v3-08-wallpaper-q3",
    "chapter": "dav-v3-08-wallpaper",
    "level": 2,
    "question": "卷III 第8章 深入理解Android壁纸怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "卷III 第8章 深入理解Android壁纸"
    ]
  },
  {
    "id": "dav-v3-08-wallpaper-q4",
    "chapter": "dav-v3-08-wallpaper",
    "level": 2,
    "question": "卷III 第8章 深入理解Android壁纸怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "卷III 第8章 深入理解Android壁纸"
    ]
  },
  {
    "id": "dav-v3-08-wallpaper-q5",
    "chapter": "dav-v3-08-wallpaper",
    "level": 3,
    "question": "卷III 第8章 深入理解Android壁纸为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "卷III 第8章 深入理解Android壁纸"
    ]
  },
  {
    "id": "dav-v3-08-wallpaper-q6",
    "chapter": "dav-v3-08-wallpaper",
    "level": 3,
    "question": "卷III 第8章 深入理解Android壁纸迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "卷III 第8章 深入理解Android壁纸"
    ]
  },
  {
    "id": "dav-series-official-final-review-q1",
    "chapter": "dav-series-official-final-review",
    "level": 1,
    "question": "为什么《深入理解Android》Framework三卷总复习必须覆盖26个正式目录节点？",
    "answer": "这些节点共同组成“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”的完整版本、调用、状态和所有权链。",
    "tags": [
      "深入理解Android",
      "三卷目录",
      "《深入理解Android》Framework三卷总复习"
    ]
  },
  {
    "id": "dav-series-official-final-review-q2",
    "chapter": "dav-series-official-final-review",
    "level": 1,
    "question": "《深入理解Android》Framework三卷总复习的最小正确性合同是什么？",
    "answer": "在匹配源码标签和构建目标上，功能、线程进程、错误与释放必须确定，并由版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练证明。",
    "tags": [
      "正确性合同",
      "版本基线",
      "《深入理解Android》Framework三卷总复习"
    ]
  },
  {
    "id": "dav-series-official-final-review-q3",
    "chapter": "dav-series-official-final-review",
    "level": 2,
    "question": "《深入理解Android》Framework三卷总复习怎样设计版本错配反例？",
    "answer": "保持输入不变，切换到相邻卷或现代标签；若类名相似但线程、状态、错误或释放不同，就拒绝拼接流程。",
    "tags": [
      "反例",
      "版本错配",
      "《深入理解Android》Framework三卷总复习"
    ]
  },
  {
    "id": "dav-series-official-final-review-q4",
    "chapter": "dav-series-official-final-review",
    "level": 2,
    "question": "《深入理解Android》Framework三卷总复习怎样验证状态所有权闭环？",
    "answer": "记录创建者、当前持有者与释放者，再让调用方死亡、服务重启或输入损坏，确认对象、队列、缓冲区和持久状态有确定归宿。",
    "tags": [
      "所有权",
      "失败恢复",
      "《深入理解Android》Framework三卷总复习"
    ]
  },
  {
    "id": "dav-series-official-final-review-q5",
    "chapter": "dav-series-official-final-review",
    "level": 3,
    "question": "《深入理解Android》Framework三卷总复习为什么不能只依赖静态类图？",
    "answer": "类图不能证明运行标签、PID/TID、对象身份、异步反馈、错误返回和资源回收，必须结合构建产物与运行日志。",
    "tags": [
      "运行证据",
      "调用链",
      "《深入理解Android》Framework三卷总复习"
    ]
  },
  {
    "id": "dav-series-official-final-review-q6",
    "chapter": "dav-series-official-final-review",
    "level": 3,
    "question": "《深入理解Android》Framework三卷总复习迁移到现代AOSP的验收方法是什么？",
    "answer": "先保存历史行为基线，再以相同输入和故障一次替换一层，比较功能、线程、错误、性能与释放，任一不变量失败即回退。",
    "tags": [
      "迁移账本",
      "回退",
      "《深入理解Android》Framework三卷总复习"
    ]
  }
];
