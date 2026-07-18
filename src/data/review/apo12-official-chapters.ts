import type { ReviewQuestion } from "./types";

export const apo12OfficialChapterQuestions: ReviewQuestion[] = [
  {
    "id": "apo12-official-learning-map-q1",
    "chapter": "apo12-official-learning-map",
    "level": 1,
    "question": "“《Android应用性能优化》权威学习地图”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖9个节点，从“第1章 Java代码优化”到“第9章 RenderScript”；主线是沿Java、两层NDK、内存、线程、评测、电池、图形和RenderScript重建Android 4.0时代性能因果链，证据为9章152节点矩阵、设备版本卡、测量协议、跨层实验路线和现代迁移账本。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-official-learning-map-q2",
    "chapter": "apo12-official-learning-map",
    "level": 2,
    "question": "怎样为“《Android应用性能优化》权威学习地图”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存9章152节点矩阵、设备版本卡、测量协议、跨层实验路线和现代迁移账本。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-official-learning-map-q3",
    "chapter": "apo12-official-learning-map",
    "level": 3,
    "question": "“《Android应用性能优化》权威学习地图”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“用Perfetto、WorkManager、DataStore等现代专题替换原书，遗漏NDK、NEON、OpenGL ES与RenderScript主线”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-official-learning-map-q4",
    "chapter": "apo12-official-learning-map",
    "level": 3,
    "question": "为什么“《Android应用性能优化》权威学习地图”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-official-learning-map-q5",
    "chapter": "apo12-official-learning-map",
    "level": 4,
    "question": "“《Android应用性能优化》权威学习地图”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-official-learning-map-q6",
    "chapter": "apo12-official-learning-map",
    "level": 4,
    "question": "“《Android应用性能优化》权威学习地图”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及9章152节点矩阵、设备版本卡、测量协议、跨层实验路线和现代迁移账本。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "apo12-01-optimizing-java-code-q1",
    "chapter": "apo12-01-optimizing-java-code",
    "level": 1,
    "question": "“第1章 Java代码优化”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖16个节点，从“第1章 Java代码优化”到“1.8 总结”；主线是从Dalvik执行、斐波纳契算法与缓存，扩展到API等级、数据结构、响应性、StrictMode和SQLite，证据为算法基线、缓存命中、API分支、主线程违规、SQLite事务与查询计划。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-01-optimizing-java-code-q2",
    "chapter": "apo12-01-optimizing-java-code",
    "level": 2,
    "question": "怎样为“第1章 Java代码优化”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存算法基线、缓存命中、API分支、主线程违规、SQLite事务与查询计划。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-01-optimizing-java-code-q3",
    "chapter": "apo12-01-optimizing-java-code",
    "level": 3,
    "question": "“第1章 Java代码优化”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“在没有等价性测试与基准的情况下微调语法，或用缓存换速度却不限制失效、容量和线程安全”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-01-optimizing-java-code-q4",
    "chapter": "apo12-01-optimizing-java-code",
    "level": 3,
    "question": "为什么“第1章 Java代码优化”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-01-optimizing-java-code-q5",
    "chapter": "apo12-01-optimizing-java-code",
    "level": 4,
    "question": "“第1章 Java代码优化”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-01-optimizing-java-code-q6",
    "chapter": "apo12-01-optimizing-java-code",
    "level": 4,
    "question": "“第1章 Java代码优化”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及算法基线、缓存命中、API分支、主线程违规、SQLite事务与查询计划。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "apo12-02-getting-started-ndk-q1",
    "chapter": "apo12-02-getting-started-ndk",
    "level": 1,
    "question": "“第2章 NDK入门”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖18个节点，从“第2章 NDK入门”到“2.7 总结”；主线是贯通NDK内容、Java与C/C++混合、JNI粘合层、Makefile、ABI配置、Android.mk、性能对照与NativeActivity，证据为JNI签名、Application.mk与Android.mk、ABI产物、加载日志、基准和NativeActivity回退。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-02-getting-started-ndk-q2",
    "chapter": "apo12-02-getting-started-ndk",
    "level": 2,
    "question": "怎样为“第2章 NDK入门”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存JNI签名、Application.mk与Android.mk、ABI产物、加载日志、基准和NativeActivity回退。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-02-getting-started-ndk-q3",
    "chapter": "apo12-02-getting-started-ndk",
    "level": 3,
    "question": "“第2章 NDK入门”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“因为C/C++看似更快就搬迁全部逻辑，忽略JNI过渡、复制、异常、ABI体积和生命周期成本”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-02-getting-started-ndk-q4",
    "chapter": "apo12-02-getting-started-ndk",
    "level": 3,
    "question": "为什么“第2章 NDK入门”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-02-getting-started-ndk-q5",
    "chapter": "apo12-02-getting-started-ndk",
    "level": 4,
    "question": "“第2章 NDK入门”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-02-getting-started-ndk-q6",
    "chapter": "apo12-02-getting-started-ndk",
    "level": 4,
    "question": "“第2章 NDK入门”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及JNI签名、Application.mk与Android.mk、ABI产物、加载日志、基准和NativeActivity回退。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "apo12-03-advanced-ndk-q1",
    "chapter": "apo12-03-advanced-ndk",
    "level": 1,
    "question": "“第3章 NDK进阶”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖17个节点，从“第3章 NDK进阶”到“3.4 总结”；主线是用汇编、ARM/NEON、CPU特性、C扩展、向量指令、内联、循环展开、预取与批量访存验证热点优化，证据为CPU特性探测、标量与SIMD结果、反汇编、对齐测试、循环基准和跨设备回退。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-03-advanced-ndk-q2",
    "chapter": "apo12-03-advanced-ndk",
    "level": 2,
    "question": "怎样为“第3章 NDK进阶”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存CPU特性探测、标量与SIMD结果、反汇编、对齐测试、循环基准和跨设备回退。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-03-advanced-ndk-q3",
    "chapter": "apo12-03-advanced-ndk",
    "level": 3,
    "question": "“第3章 NDK进阶”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“为单一ARM设备写死NEON或汇编路径，未验证数值等价、内存对齐、尾部元素与非支持CPU回退”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-03-advanced-ndk-q4",
    "chapter": "apo12-03-advanced-ndk",
    "level": 3,
    "question": "为什么“第3章 NDK进阶”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-03-advanced-ndk-q5",
    "chapter": "apo12-03-advanced-ndk",
    "level": 4,
    "question": "“第3章 NDK进阶”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-03-advanced-ndk-q6",
    "chapter": "apo12-03-advanced-ndk",
    "level": 4,
    "question": "“第3章 NDK进阶”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及CPU特性探测、标量与SIMD结果、反汇编、对齐测试、循环基准和跨设备回退。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "apo12-04-using-memory-efficiently-q1",
    "chapter": "apo12-04-using-memory-efficiently",
    "level": 1,
    "question": "“第4章 高效使用内存”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖15个节点，从“第4章 高效使用内存”到“4.8 总结”；主线是从设备内存约束、数据类型与比较、内存访问和数据布局，推导GC、泄漏、引用、低内存回调与API选择，证据为堆基线、对象与数组尺寸、访问局部性、GC停顿、引用链、低内存回调和恢复断言。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-04-using-memory-efficiently-q2",
    "chapter": "apo12-04-using-memory-efficiently",
    "level": 2,
    "question": "怎样为“第4章 高效使用内存”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存堆基线、对象与数组尺寸、访问局部性、GC停顿、引用链、低内存回调和恢复断言。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-04-using-memory-efficiently-q3",
    "chapter": "apo12-04-using-memory-efficiently",
    "level": 3,
    "question": "“第4章 高效使用内存”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只看峰值堆大小，不测分配速率、局部性、GC停顿和生命周期引用，或用弱引用掩盖所有权错误”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-04-using-memory-efficiently-q4",
    "chapter": "apo12-04-using-memory-efficiently",
    "level": 3,
    "question": "为什么“第4章 高效使用内存”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-04-using-memory-efficiently-q5",
    "chapter": "apo12-04-using-memory-efficiently",
    "level": 4,
    "question": "“第4章 高效使用内存”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-04-using-memory-efficiently-q6",
    "chapter": "apo12-04-using-memory-efficiently",
    "level": 4,
    "question": "“第4章 高效使用内存”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及堆基线、对象与数组尺寸、访问局部性、GC停顿、引用链、低内存回调和恢复断言。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "apo12-05-multithreading-synchronization-q1",
    "chapter": "apo12-05-multithreading-synchronization",
    "level": 1,
    "question": "“第5章 多线程和同步”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖15个节点，从“第5章 多线程和同步”到“5.8 总结”；主线是比较Thread、AsyncTask、Handler/Looper、并发容器与多核算法，并把结果交付绑定到Activity生命周期，证据为线程时序、消息队列、锁竞争、多核加速比、状态保存、取消与迟到结果测试。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-05-multithreading-synchronization-q2",
    "chapter": "apo12-05-multithreading-synchronization",
    "level": 2,
    "question": "怎样为“第5章 多线程和同步”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存线程时序、消息队列、锁竞争、多核加速比、状态保存、取消与迟到结果测试。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-05-multithreading-synchronization-q3",
    "chapter": "apo12-05-multithreading-synchronization",
    "level": 3,
    "question": "“第5章 多线程和同步”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把后台线程等同于并行加速，或让AsyncTask、Handler和工作线程越过Activity销毁继续持有与回调UI”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-05-multithreading-synchronization-q4",
    "chapter": "apo12-05-multithreading-synchronization",
    "level": 3,
    "question": "为什么“第5章 多线程和同步”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-05-multithreading-synchronization-q5",
    "chapter": "apo12-05-multithreading-synchronization",
    "level": 4,
    "question": "“第5章 多线程和同步”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-05-multithreading-synchronization-q6",
    "chapter": "apo12-05-multithreading-synchronization",
    "level": 4,
    "question": "“第5章 多线程和同步”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及线程时序、消息队列、锁竞争、多核加速比、状态保存、取消与迟到结果测试。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "apo12-06-benchmarking-profiling-q1",
    "chapter": "apo12-06-benchmarking-profiling",
    "level": 1,
    "question": "“第6章 性能评测和剖析”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖11个节点，从“第6章 性能评测和剖析”到“6.4 总结”；主线是用墙钟与线程CPU时间、方法跟踪、TraceView、DDMS、本地跟踪和日志建立可重复性能证据，证据为预热与采样计划、墙钟/CPU时间、trace文件、调用树、原生热点、日志开销和置信区间。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-06-benchmarking-profiling-q2",
    "chapter": "apo12-06-benchmarking-profiling",
    "level": 2,
    "question": "怎样为“第6章 性能评测和剖析”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存预热与采样计划、墙钟/CPU时间、trace文件、调用树、原生热点、日志开销和置信区间。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-06-benchmarking-profiling-q3",
    "chapter": "apo12-06-benchmarking-profiling",
    "level": 3,
    "question": "“第6章 性能评测和剖析”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“用一次Debug构建墙钟数字下结论，忽略预热、调度、跟踪开销、设备状态与Release产物差异”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-06-benchmarking-profiling-q4",
    "chapter": "apo12-06-benchmarking-profiling",
    "level": 3,
    "question": "为什么“第6章 性能评测和剖析”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-06-benchmarking-profiling-q5",
    "chapter": "apo12-06-benchmarking-profiling",
    "level": 4,
    "question": "“第6章 性能评测和剖析”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-06-benchmarking-profiling-q6",
    "chapter": "apo12-06-benchmarking-profiling",
    "level": 4,
    "question": "“第6章 性能评测和剖析”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及预热与采样计划、墙钟/CPU时间、trace文件、调用树、原生热点、日志开销和置信区间。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "apo12-07-maximizing-battery-life-q1",
    "chapter": "apo12-07-maximizing-battery-life",
    "level": 1,
    "question": "“第7章 延长电池续航时间”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖17个节点，从“第7章 延长电池续航时间”到“7.9 总结”；主线是从电池计量、广播接收器、网络、位置、传感器、图形、提醒和WakeLock控制唤醒与无线电活动，证据为电量基线、唤醒次数、传输批次、定位更新、传感器注销、图形负载、Alarm和WakeLock时长。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-07-maximizing-battery-life-q2",
    "chapter": "apo12-07-maximizing-battery-life",
    "level": 2,
    "question": "怎样为“第7章 延长电池续航时间”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存电量基线、唤醒次数、传输批次、定位更新、传感器注销、图形负载、Alarm和WakeLock时长。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-07-maximizing-battery-life-q3",
    "chapter": "apo12-07-maximizing-battery-life",
    "level": 3,
    "question": "“第7章 延长电池续航时间”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只减少CPU代码却频繁唤醒无线电、定位和传感器，或获取WakeLock后没有超时与finally释放”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-07-maximizing-battery-life-q4",
    "chapter": "apo12-07-maximizing-battery-life",
    "level": 3,
    "question": "为什么“第7章 延长电池续航时间”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-07-maximizing-battery-life-q5",
    "chapter": "apo12-07-maximizing-battery-life",
    "level": 4,
    "question": "“第7章 延长电池续航时间”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-07-maximizing-battery-life-q6",
    "chapter": "apo12-07-maximizing-battery-life",
    "level": 4,
    "question": "“第7章 延长电池续航时间”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及电量基线、唤醒次数、传输批次、定位更新、传感器注销、图形负载、Alarm和WakeLock时长。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "apo12-08-graphics-q1",
    "chapter": "apo12-08-graphics",
    "level": 1,
    "question": "“第8章 图形”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖20个节点，从“第8章 图形”到“8.4 总结”；主线是从布局优化与层级工具进入OpenGL ES扩展、纹理压缩、Mipmap、多APK、着色、场景复杂度、消隐与功耗，证据为布局层级、测绘制时间、纹理格式与显存、设备扩展、多APK选择、GPU帧与功耗对照。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-08-graphics-q2",
    "chapter": "apo12-08-graphics",
    "level": 2,
    "question": "怎样为“第8章 图形”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存布局层级、测绘制时间、纹理格式与显存、设备扩展、多APK选择、GPU帧与功耗对照。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-08-graphics-q3",
    "chapter": "apo12-08-graphics",
    "level": 3,
    "question": "“第8章 图形”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只追求更少View或更高纹理质量，忽略设备扩展、显存、填充率、场景复杂度与图形功耗的联合约束”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-08-graphics-q4",
    "chapter": "apo12-08-graphics",
    "level": 3,
    "question": "为什么“第8章 图形”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-08-graphics-q5",
    "chapter": "apo12-08-graphics",
    "level": 4,
    "question": "“第8章 图形”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-08-graphics-q6",
    "chapter": "apo12-08-graphics",
    "level": 4,
    "question": "“第8章 图形”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及布局层级、测绘制时间、纹理格式与显存、设备扩展、多APK选择、GPU帧与功耗对照。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "apo12-09-renderscript-q1",
    "chapter": "apo12-09-renderscript",
    "level": 1,
    "question": "“第9章 RenderScript”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖23个节点，从“第9章 RenderScript”到“9.8 总结”；主线是从RenderScript概览、Hello World与渲染，进入脚本变量、Allocation、rsForEach、内置头文件并与NDK对比，证据为脚本编译产物、Context与Surface生命周期、Allocation传输、并行结果、API调用和NDK基准。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-09-renderscript-q2",
    "chapter": "apo12-09-renderscript",
    "level": 2,
    "question": "怎样为“第9章 RenderScript”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存脚本编译产物、Context与Surface生命周期、Allocation传输、并行结果、API调用和NDK基准。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-09-renderscript-q3",
    "chapter": "apo12-09-renderscript",
    "level": 3,
    "question": "“第9章 RenderScript”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把RenderScript并行化当作自动加速，忽略数据传输、设备实现、Context生命周期和现已弃用的迁移边界”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-09-renderscript-q4",
    "chapter": "apo12-09-renderscript",
    "level": 3,
    "question": "为什么“第9章 RenderScript”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-09-renderscript-q5",
    "chapter": "apo12-09-renderscript",
    "level": 4,
    "question": "“第9章 RenderScript”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-09-renderscript-q6",
    "chapter": "apo12-09-renderscript",
    "level": 4,
    "question": "“第9章 RenderScript”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及脚本编译产物、Context与Surface生命周期、Allocation传输、并行结果、API调用和NDK基准。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "apo12-official-final-review-q1",
    "chapter": "apo12-official-final-review",
    "level": 1,
    "question": "“《Android应用性能优化》全书总复习”覆盖哪些权威节点与性能主线？",
    "answer": "覆盖9个节点，从“第1章 Java代码优化”到“第9章 RenderScript”；主线是从等价性、时间、内存、线程、能耗和图形六类证据闭环SDK、NDK与RenderScript全部节点，证据为全书节点表、Java/NDK对照基准、内存与线程故障、电量记录、图形实验和版本迁移报告。",
    "tags": [
      "官方目录",
      "性能因果"
    ]
  },
  {
    "id": "apo12-official-final-review-q2",
    "chapter": "apo12-official-final-review",
    "level": 2,
    "question": "怎样为“《Android应用性能优化》全书总复习”建立最小可重复实验？",
    "answer": "固定输入、正确输出、Release构建、设备、Android版本、ABI、电源和热状态，预热并重复采样，保存全书节点表、Java/NDK对照基准、内存与线程故障、电量记录、图形实验和版本迁移报告。",
    "tags": [
      "基准",
      "实验"
    ]
  },
  {
    "id": "apo12-official-final-review-q3",
    "chapter": "apo12-official-final-review",
    "level": 3,
    "question": "“《Android应用性能优化》全书总复习”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只有优化后数字，没有相同输入、正确性、预热、重复样本、设备状态、资源释放与回滚基线”；只改变算法、边界、线程、设备、生命周期或测量方式之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "apo12-official-final-review-q4",
    "chapter": "apo12-official-final-review",
    "level": 3,
    "question": "为什么“《Android应用性能优化》全书总复习”的一次更快数字不足以证明优化？",
    "answer": "一次数字没有证明结果等价、预热、样本分布、设备状态、跟踪开销、尾延迟和资源释放；必须保存原始样本。",
    "tags": [
      "测量",
      "诊断"
    ]
  },
  {
    "id": "apo12-official-final-review-q5",
    "chapter": "apo12-official-final-review",
    "level": 4,
    "question": "“《Android应用性能优化》全书总复习”迁移到现代Android时如何控制变量？",
    "answer": "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "apo12-official-final-review-q6",
    "chapter": "apo12-official-final-review",
    "level": 4,
    "question": "“《Android应用性能优化》全书总复习”达到独立交接需要什么？",
    "answer": "需要源码输入、正确性断言、构建设备指纹、预热采样、时间/内存/线程/能耗/图形证据、失败测试及全书节点表、Java/NDK对照基准、内存与线程故障、电量记录、图形实验和版本迁移报告。",
    "tags": [
      "验收",
      "交接"
    ]
  }
];
