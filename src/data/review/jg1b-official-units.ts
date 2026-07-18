import type { ReviewQuestion } from "./types";

export const jg1bOfficialQuestions: ReviewQuestion[] = [
  {
    "id": "jg1b-official-learning-map-q1",
    "chapter": "jg1b-official-learning-map",
    "level": 2,
    "question": "“《JVM G1源码分析和调优》权威学习地图”覆盖哪些正式节点和主线？",
    "answer": "本页从“第1章 垃圾回收概述”覆盖到“附录C 阅读JVM需要了解的C++知识”，共15个节点。主线是沿12章与附录A-C建立从GC算法、G1源码、日志到调优和后继收集器的完整证据路径，交付物为135节点覆盖矩阵、源码版本地图、GC阶段依赖图和全书实验清单。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-official-learning-map-q2",
    "chapter": "jg1b-official-learning-map",
    "level": 3,
    "question": "怎样为“《JVM G1源码分析和调优》权威学习地图”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“为分配失败、RSet积压、Mixed过晚与安全点过长分别选择章节和最低扰动证据”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-official-learning-map-q3",
    "chapter": "jg1b-official-learning-map",
    "level": 3,
    "question": "为什么“把G1学习缩成Young、Mixed、Full三张流程图，遗漏分配、Refine、引用、去重、安全点、选型和源码工具”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到135节点覆盖矩阵、源码版本地图、GC阶段依赖图和全书实验清单，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-official-learning-map-q4",
    "chapter": "jg1b-official-learning-map",
    "level": 4,
    "question": "“《JVM G1源码分析和调优》权威学习地图”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-official-learning-map-q5",
    "chapter": "jg1b-official-learning-map",
    "level": 4,
    "question": "如何为“《JVM G1源码分析和调优》权威学习地图”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-official-learning-map-q6",
    "chapter": "jg1b-official-learning-map",
    "level": 4,
    "question": "“《JVM G1源码分析和调优》权威学习地图”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭135节点覆盖矩阵、源码版本地图、GC阶段依赖图和全书实验清单重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-01-gc-overview-q1",
    "chapter": "jg1b-01-gc-overview",
    "level": 2,
    "question": "“第1章 垃圾回收概述”覆盖哪些正式节点和主线？",
    "answer": "本页从“第1章 垃圾回收概述”覆盖到“1.4.4 垃圾优先回收”，共14个节点。主线是建立分代、复制、标记清除、标记压缩及串行、并行、并发、垃圾优先四类回收的共同语言，交付物为算法对象移动图、回收器时间线、停顿与吞吐权衡表、术语反例。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-01-gc-overview-q2",
    "chapter": "jg1b-01-gc-overview",
    "level": 3,
    "question": "怎样为“第1章 垃圾回收概述”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“对同一对象图手工执行复制、标记清除与标记压缩，比较空间、移动、暂停和并发读写约束”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-01-gc-overview-q3",
    "chapter": "jg1b-01-gc-overview",
    "level": 3,
    "question": "为什么“把并行与并发混同，只按算法名称判断停顿和吞吐，或跳过对象图与工作负载直接比较收集器”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到算法对象移动图、回收器时间线、停顿与吞吐权衡表、术语反例，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-01-gc-overview-q4",
    "chapter": "jg1b-01-gc-overview",
    "level": 4,
    "question": "“第1章 垃圾回收概述”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-01-gc-overview-q5",
    "chapter": "jg1b-01-gc-overview",
    "level": 4,
    "question": "如何为“第1章 垃圾回收概述”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-01-gc-overview-q6",
    "chapter": "jg1b-01-gc-overview",
    "level": 4,
    "question": "“第1章 垃圾回收概述”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭算法对象移动图、回收器时间线、停顿与吞吐权衡表、术语反例重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-02-g1-basics-q1",
    "chapter": "jg1b-02-g1-basics",
    "level": 2,
    "question": "“第2章 G1的基本概念”覆盖哪些正式节点和主线？",
    "answer": "本页从“第2章 G1的基本概念”覆盖到“2.8 参数介绍和调优”，共13个节点。主线是理解Region、停顿预测、卡表、位图、对象头、线程栈与日志，建立G1源码阅读所需的内存模型，交付物为Region状态图、预测样本、卡表位图映射、栈与句柄关系、参数证据表。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-02-g1-basics-q2",
    "chapter": "jg1b-02-g1-basics",
    "level": 3,
    "question": "怎样为“第2章 G1的基本概念”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“改变单个Region规模和目标停顿，在固定分配负载下比较预测、年轻代长度、停顿和吞吐”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-02-g1-basics-q3",
    "chapter": "jg1b-02-g1-basics",
    "level": 3,
    "question": "为什么“把MaxGCPauseMillis当硬保证、把jdk8u60对象头与目录结构外推现代JDK，或不看日志单位就调参”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到Region状态图、预测样本、卡表位图映射、栈与句柄关系、参数证据表，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-02-g1-basics-q4",
    "chapter": "jg1b-02-g1-basics",
    "level": 4,
    "question": "“第2章 G1的基本概念”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-02-g1-basics-q5",
    "chapter": "jg1b-02-g1-basics",
    "level": 4,
    "question": "如何为“第2章 G1的基本概念”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-02-g1-basics-q6",
    "chapter": "jg1b-02-g1-basics",
    "level": 4,
    "question": "“第2章 G1的基本概念”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭Region状态图、预测样本、卡表位图映射、栈与句柄关系、参数证据表重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-03-object-allocation-q1",
    "chapter": "jg1b-03-object-allocation",
    "level": 2,
    "question": "“第3章 G1的对象分配”覆盖哪些正式节点和主线？",
    "answer": "本页从“第3章 G1的对象分配”覆盖到“3.5 参数介绍和调优”，共10个节点。主线是沿TLAB快速分配、慢速路径、大对象与最后尝试理解Region分配失败如何触发回收，交付物为快慢路径流程、TLAB计数、Humongous边界、分配失败与GC触发时间线。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-03-object-allocation-q2",
    "chapter": "jg1b-03-object-allocation",
    "level": 3,
    "question": "怎样为“第3章 G1的对象分配”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“让对象大小跨过TLAB与Humongous阈值，保存分配日志并核对走过的源码分支与回收触发”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-03-object-allocation-q3",
    "chapter": "jg1b-03-object-allocation",
    "level": 3,
    "question": "为什么“把Java层new与一次堆分配等同、忽略TLAB浪费和Humongous连续Region要求，或用System.gc结果判断常态”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到快慢路径流程、TLAB计数、Humongous边界、分配失败与GC触发时间线，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-03-object-allocation-q4",
    "chapter": "jg1b-03-object-allocation",
    "level": 4,
    "question": "“第3章 G1的对象分配”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-03-object-allocation-q5",
    "chapter": "jg1b-03-object-allocation",
    "level": 4,
    "question": "如何为“第3章 G1的对象分配”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-03-object-allocation-q6",
    "chapter": "jg1b-03-object-allocation",
    "level": 4,
    "question": "“第3章 G1的对象分配”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭快慢路径流程、TLAB计数、Humongous边界、分配失败与GC触发时间线重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-04-refine-thread-q1",
    "chapter": "jg1b-04-refine-thread",
    "level": 2,
    "question": "“第4章 G1的Refine线程”覆盖哪些正式节点和主线？",
    "answer": "本页从“第4章 G1的Refine线程”覆盖到“4.6 参数介绍和调优”，共11个节点。主线是追踪写屏障、Dirty Card Queue、Refine线程与RSet更新，理解后台精炼不足如何把工作推回Mutator，交付物为跨Region引用图、写屏障路径、DCQ水位、Refinement Zone状态、Mutator税收。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-04-refine-thread-q2",
    "chapter": "jg1b-04-refine-thread",
    "level": 3,
    "question": "怎样为“第4章 G1的Refine线程”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“制造低与高跨Region更新两组负载，观察队列水位、Refine并行度、Mutator处理和暂停扫描成本”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-04-refine-thread-q3",
    "chapter": "jg1b-04-refine-thread",
    "level": 3,
    "question": "为什么“只看Refine线程CPU、忽略Mutator协助和队列区间，或通过增加线程掩盖高跨Region引用率”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到跨Region引用图、写屏障路径、DCQ水位、Refinement Zone状态、Mutator税收，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-04-refine-thread-q4",
    "chapter": "jg1b-04-refine-thread",
    "level": 4,
    "question": "“第4章 G1的Refine线程”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-04-refine-thread-q5",
    "chapter": "jg1b-04-refine-thread",
    "level": 4,
    "question": "如何为“第4章 G1的Refine线程”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-04-refine-thread-q6",
    "chapter": "jg1b-04-refine-thread",
    "level": 4,
    "question": "“第4章 G1的Refine线程”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭跨Region引用图、写屏障路径、DCQ水位、Refinement Zone状态、Mutator税收重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-05-young-gc-q1",
    "chapter": "jg1b-05-young-gc",
    "level": 2,
    "question": "“第5章 新生代回收”覆盖哪些正式节点和主线？",
    "answer": "本页从“第5章 新生代回收”覆盖到“5.5 参数介绍和调优”，共17个节点。主线是从CSet选择、根与RSet处理、复制、Redirty到Region释放复刻一次G1 Young GC及其日志，交付物为Young GC阶段时间线、CSet清单、并行任务分布、年龄表、复制与释放证据。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-05-young-gc-q2",
    "chapter": "jg1b-05-young-gc",
    "level": 3,
    "question": "怎样为“第5章 新生代回收”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“固定工作量逐步增加存活率，比较复制量、晋升、对象年龄、工作线程失衡和预测误差”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-05-young-gc-q3",
    "chapter": "jg1b-05-young-gc",
    "level": 3,
    "question": "为什么“只看总停顿、忽略并行阶段失衡、对象晋升和大对象，或缩小年轻代后不检查吞吐与混合回收提前”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到Young GC阶段时间线、CSet清单、并行任务分布、年龄表、复制与释放证据，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-05-young-gc-q4",
    "chapter": "jg1b-05-young-gc",
    "level": 4,
    "question": "“第5章 新生代回收”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-05-young-gc-q5",
    "chapter": "jg1b-05-young-gc",
    "level": 4,
    "question": "如何为“第5章 新生代回收”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-05-young-gc-q6",
    "chapter": "jg1b-05-young-gc",
    "level": 4,
    "question": "“第5章 新生代回收”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭Young GC阶段时间线、CSet清单、并行任务分布、年龄表、复制与释放证据重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-06-mixed-gc-q1",
    "chapter": "jg1b-06-mixed-gc",
    "level": 2,
    "question": "“第6章 混合回收”覆盖哪些正式节点和主线？",
    "answer": "本页从“第6章 混合回收”覆盖到“6.8 参数优化”，共23个节点。主线是用三色标记和写屏障解释并发标记，从启动、根扫描、并发标记、再标记、清理走到Mixed收集，交付物为三色对象图、并发阶段时间线、标记线程负载、候选Old Region、Mixed周期日志。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-06-mixed-gc-q2",
    "chapter": "jg1b-06-mixed-gc",
    "level": 3,
    "question": "怎样为“第6章 混合回收”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“改变分配速率与老年代存活率，观察并发周期能否及时完成、候选集如何变化以及Mixed次数”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-06-mixed-gc-q3",
    "chapter": "jg1b-06-mixed-gc",
    "level": 3,
    "question": "为什么“把并发标记当对象移动、忽略SATB队列和浮动垃圾，或只压低IHOP而造成标记过早与CPU竞争”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到三色对象图、并发阶段时间线、标记线程负载、候选Old Region、Mixed周期日志，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-06-mixed-gc-q4",
    "chapter": "jg1b-06-mixed-gc",
    "level": 4,
    "question": "“第6章 混合回收”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-06-mixed-gc-q5",
    "chapter": "jg1b-06-mixed-gc",
    "level": 4,
    "question": "如何为“第6章 混合回收”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-06-mixed-gc-q6",
    "chapter": "jg1b-06-mixed-gc",
    "level": 4,
    "question": "“第6章 混合回收”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭三色对象图、并发阶段时间线、标记线程负载、候选Old Region、Mixed周期日志重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-07-full-gc-q1",
    "chapter": "jg1b-07-full-gc",
    "level": 2,
    "question": "“第7章 Full GC”覆盖哪些正式节点和主线？",
    "answer": "本页从“第7章 Full GC”覆盖到“7.5 参数介绍和调优”，共16个节点。主线是分析Evacuation Failure及串行、JDK 10并行Full GC的标记、地址计算、引用更新、压缩与后处理，交付物为失败触发树、四阶段移动图、串并行源码差异、Full GC日志与恢复预算。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-07-full-gc-q2",
    "chapter": "jg1b-07-full-gc",
    "level": 3,
    "question": "怎样为“第7章 Full GC”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“在隔离环境提高存活集制造疏散失败，对照jdk8u60与JDK 10路径并验证增加余量后的恢复”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-07-full-gc-q3",
    "chapter": "jg1b-07-full-gc",
    "level": 3,
    "question": "为什么“把Full GC当普通周期、只加堆掩盖to-space不足，或混用jdk8u60串行实现与JDK 10并行源码”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到失败触发树、四阶段移动图、串并行源码差异、Full GC日志与恢复预算，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-07-full-gc-q4",
    "chapter": "jg1b-07-full-gc",
    "level": 4,
    "question": "“第7章 Full GC”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-07-full-gc-q5",
    "chapter": "jg1b-07-full-gc",
    "level": 4,
    "question": "如何为“第7章 Full GC”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-07-full-gc-q6",
    "chapter": "jg1b-07-full-gc",
    "level": 4,
    "question": "“第7章 Full GC”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭失败触发树、四阶段移动图、串并行源码差异、Full GC日志与恢复预算重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-08-reference-processing-q1",
    "chapter": "jg1b-08-reference-processing",
    "level": 2,
    "question": "“第8章 G1中的引用处理”覆盖哪些正式节点和主线？",
    "answer": "本页从“第8章 G1中的引用处理”覆盖到“8.6 参数介绍和调优”，共7个节点。主线是区分强、软、弱、虚引用的发现列表与处理阶段，理解重新可达和引用队列对回收结果的影响，交付物为引用状态机、发现列表、处理顺序、队列消费测试、日志与参数边界。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-08-reference-processing-q2",
    "chapter": "jg1b-08-reference-processing",
    "level": 3,
    "question": "怎样为“第8章 G1中的引用处理”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“构造四类引用和ReferenceQueue，制造内存压力并记录发现、清除、入队与重新可达结果”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-08-reference-processing-q3",
    "chapter": "jg1b-08-reference-processing",
    "level": 3,
    "question": "为什么“把引用类型当缓存策略保证、忽略referent重新可达和队列消费，或用一次GC预测软引用清理”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到引用状态机、发现列表、处理顺序、队列消费测试、日志与参数边界，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-08-reference-processing-q4",
    "chapter": "jg1b-08-reference-processing",
    "level": 4,
    "question": "“第8章 G1中的引用处理”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-08-reference-processing-q5",
    "chapter": "jg1b-08-reference-processing",
    "level": 4,
    "question": "如何为“第8章 G1中的引用处理”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-08-reference-processing-q6",
    "chapter": "jg1b-08-reference-processing",
    "level": 4,
    "question": "“第8章 G1中的引用处理”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭引用状态机、发现列表、处理顺序、队列消费测试、日志与参数边界重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-09-string-dedup-q1",
    "chapter": "jg1b-09-string-dedup",
    "level": 2,
    "question": "“第9章 G1的新特性：字符串去重”覆盖哪些正式节点和主线？",
    "answer": "本页从“第9章 G1的新特性：字符串去重”覆盖到“9.5 String.intern中的实现”，共6个节点。主线是理解G1字符串去重的候选、哈希表和后台处理，并与String.intern的语义、生命周期和成本区分，交付物为字符串分布基线、候选年龄、去重日志、CPU与内存收益、intern语义对照。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-09-string-dedup-q2",
    "chapter": "jg1b-09-string-dedup",
    "level": 3,
    "question": "怎样为“第9章 G1的新特性：字符串去重”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“分别使用高重复和低重复字符串负载，比较去重率、堆节省、CPU成本与intern行为”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-09-string-dedup-q3",
    "chapter": "jg1b-09-string-dedup",
    "level": 3,
    "question": "为什么“用平均节省比例外推业务、把去重和intern当等价，或忽略扫描、哈希、表维护和字符串分布”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到字符串分布基线、候选年龄、去重日志、CPU与内存收益、intern语义对照，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-09-string-dedup-q4",
    "chapter": "jg1b-09-string-dedup",
    "level": 4,
    "question": "“第9章 G1的新特性：字符串去重”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-09-string-dedup-q5",
    "chapter": "jg1b-09-string-dedup",
    "level": 4,
    "question": "如何为“第9章 G1的新特性：字符串去重”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-09-string-dedup-q6",
    "chapter": "jg1b-09-string-dedup",
    "level": 4,
    "question": "“第9章 G1的新特性：字符串去重”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭字符串分布基线、候选年龄、去重日志、CPU与内存收益、intern语义对照重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-10-safepoints-q1",
    "chapter": "jg1b-10-safepoints",
    "level": 2,
    "question": "“第10章 线程中的安全点”覆盖哪些正式节点和主线？",
    "answer": "本页从“第10章 线程中的安全点”覆盖到“10.8 参数介绍和调优”，共9个节点。主线是区分到达安全点的时间与安全点内工作，比较并发、解释、编译和本地代码线程的协作路径，交付物为线程到达图、TTSP与停顿拆分、轮询位置、JNI案例、安全点日志。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-10-safepoints-q2",
    "chapter": "jg1b-10-safepoints",
    "level": 3,
    "question": "怎样为“第10章 线程中的安全点”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“制造长计数循环和本地调用，对比到达安全点时间与停顿内工作，再修改一个轮询或任务边界”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-10-safepoints-q3",
    "chapter": "jg1b-10-safepoints",
    "level": 3,
    "question": "为什么“把所有停顿归因于GC工作、忽略Time to Safepoint，或用增加GC线程处理无法及时进入安全点的问题”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到线程到达图、TTSP与停顿拆分、轮询位置、JNI案例、安全点日志，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-10-safepoints-q4",
    "chapter": "jg1b-10-safepoints",
    "level": 4,
    "question": "“第10章 线程中的安全点”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-10-safepoints-q5",
    "chapter": "jg1b-10-safepoints",
    "level": 4,
    "question": "如何为“第10章 线程中的安全点”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-10-safepoints-q6",
    "chapter": "jg1b-10-safepoints",
    "level": 4,
    "question": "“第10章 线程中的安全点”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭线程到达图、TTSP与停顿拆分、轮询位置、JNI案例、安全点日志重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-11-collector-choice-q1",
    "chapter": "jg1b-11-collector-choice",
    "level": 2,
    "question": "“第11章 垃圾回收器的选择”覆盖哪些正式节点和主线？",
    "answer": "本页从“第11章 垃圾回收器的选择”覆盖到“11.2 G1调优的方向”，共3个节点。主线是以吞吐、尾延迟、内存、CPU、堆规模、恢复和运维成本选择收集器，并为G1调优建立顺序，交付物为SLO与工作量、候选收集器矩阵、基线、单变量实验、收益副作用与回滚。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-11-collector-choice-q2",
    "chapter": "jg1b-11-collector-choice",
    "level": 3,
    "question": "怎样为“第11章 垃圾回收器的选择”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“用真实流量回放比较两种候选，报告p50/p99、吞吐、CPU、内存、Full GC和恢复时间”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-11-collector-choice-q3",
    "chapter": "jg1b-11-collector-choice",
    "level": 3,
    "question": "为什么“按默认或名气选收集器、追单一最大停顿，或同时修改堆、线程、停顿目标和应用分配”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到SLO与工作量、候选收集器矩阵、基线、单变量实验、收益副作用与回滚，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-11-collector-choice-q4",
    "chapter": "jg1b-11-collector-choice",
    "level": 4,
    "question": "“第11章 垃圾回收器的选择”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-11-collector-choice-q5",
    "chapter": "jg1b-11-collector-choice",
    "level": 4,
    "question": "如何为“第11章 垃圾回收器的选择”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-11-collector-choice-q6",
    "chapter": "jg1b-11-collector-choice",
    "level": 4,
    "question": "“第11章 垃圾回收器的选择”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭SLO与工作量、候选收集器矩阵、基线、单变量实验、收益副作用与回滚重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-12-next-collectors-q1",
    "chapter": "jg1b-12-next-collectors",
    "level": 2,
    "question": "“第12章 新一代垃圾回收器”覆盖哪些正式节点和主线？",
    "answer": "本页从“第12章 新一代垃圾回收器”覆盖到“12.2 ZGC”，共3个节点。主线是从G1的疏散停顿限制理解Shenandoah与ZGC的并发移动思路，并保持2019年技术状态边界，交付物为2019机制对照、并发移动图、屏障职责、版本状态账本、选择限制。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-12-next-collectors-q2",
    "chapter": "jg1b-12-next-collectors",
    "level": 3,
    "question": "怎样为“第12章 新一代垃圾回收器”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“在原书语境还原机制，再从目标JDK一手资料复核状态、平台、参数与已变化实现，不混写结论”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-12-next-collectors-q3",
    "chapter": "jg1b-12-next-collectors",
    "level": 3,
    "question": "为什么“把原书实验期描述当现代生产结论、只比较停顿不计屏障成本与平台支持，或混淆两者着色机制”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到2019机制对照、并发移动图、屏障职责、版本状态账本、选择限制，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-12-next-collectors-q4",
    "chapter": "jg1b-12-next-collectors",
    "level": 4,
    "question": "“第12章 新一代垃圾回收器”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-12-next-collectors-q5",
    "chapter": "jg1b-12-next-collectors",
    "level": 4,
    "question": "如何为“第12章 新一代垃圾回收器”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-12-next-collectors-q6",
    "chapter": "jg1b-12-next-collectors",
    "level": 4,
    "question": "“第12章 新一代垃圾回收器”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭2019机制对照、并发移动图、屏障职责、版本状态账本、选择限制重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-appendix-a-debug-jvm-q1",
    "chapter": "jg1b-appendix-a-debug-jvm",
    "level": 2,
    "question": "“附录A 编译调试JVM”覆盖哪些正式节点和主线？",
    "answer": "本页从“附录A 编译调试JVM”覆盖到“附录A 编译调试JVM”，共1个节点。主线是建立jdk8u60 HotSpot源码目录、调试构建、GDB启动和关键G1断点的可重复环境，交付物为源码提交、依赖清单、debug构建日志、符号验证、断点与清理步骤。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-appendix-a-debug-jvm-q2",
    "chapter": "jg1b-appendix-a-debug-jvm",
    "level": 3,
    "question": "怎样为“附录A 编译调试JVM”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“在分配慢路径和Young GC入口设置断点，核对线程、参数与调用栈，并保存无调试器对照”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-appendix-a-debug-jvm-q3",
    "chapter": "jg1b-appendix-a-debug-jvm",
    "level": 3,
    "question": "为什么“用release构建期待完整符号、源码提交与boot JDK不匹配，或在未隔离环境修改运行时”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到源码提交、依赖清单、debug构建日志、符号验证、断点与清理步骤，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-appendix-a-debug-jvm-q4",
    "chapter": "jg1b-appendix-a-debug-jvm",
    "level": 4,
    "question": "“附录A 编译调试JVM”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-appendix-a-debug-jvm-q5",
    "chapter": "jg1b-appendix-a-debug-jvm",
    "level": 4,
    "question": "如何为“附录A 编译调试JVM”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-appendix-a-debug-jvm-q6",
    "chapter": "jg1b-appendix-a-debug-jvm",
    "level": 4,
    "question": "“附录A 编译调试JVM”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭源码提交、依赖清单、debug构建日志、符号验证、断点与清理步骤重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-appendix-b-nmt-q1",
    "chapter": "jg1b-appendix-b-nmt",
    "level": 2,
    "question": "“附录B 本地内存跟踪”覆盖哪些正式节点和主线？",
    "answer": "本页从“附录B 本地内存跟踪”覆盖到“附录B 本地内存跟踪”，共1个节点。主线是使用Native Memory Tracking区分堆外类别、基线与差异，并记录NMT自身开销和覆盖边界，交付物为NMT启动参数、baseline与diff、类别解释、RSS对照、未覆盖项与采集开销。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-appendix-b-nmt-q2",
    "chapter": "jg1b-appendix-b-nmt",
    "level": 3,
    "question": "怎样为“附录B 本地内存跟踪”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“固定工作量分别增加线程、类加载和直接缓冲区，核对NMT类别变化及与进程RSS的差额”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-appendix-b-nmt-q3",
    "chapter": "jg1b-appendix-b-nmt",
    "level": 3,
    "question": "为什么“把NMT总量等同RSS、忽略未跟踪本地分配，或比较不同生命周期和负载的快照”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到NMT启动参数、baseline与diff、类别解释、RSS对照、未覆盖项与采集开销，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-appendix-b-nmt-q4",
    "chapter": "jg1b-appendix-b-nmt",
    "level": 4,
    "question": "“附录B 本地内存跟踪”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-appendix-b-nmt-q5",
    "chapter": "jg1b-appendix-b-nmt",
    "level": 4,
    "question": "如何为“附录B 本地内存跟踪”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-appendix-b-nmt-q6",
    "chapter": "jg1b-appendix-b-nmt",
    "level": 4,
    "question": "“附录B 本地内存跟踪”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭NMT启动参数、baseline与diff、类别解释、RSS对照、未覆盖项与采集开销重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-appendix-c-cpp-q1",
    "chapter": "jg1b-appendix-c-cpp",
    "level": 2,
    "question": "“附录C 阅读JVM需要了解的C++知识”覆盖哪些正式节点和主线？",
    "answer": "本页从“附录C 阅读JVM需要了解的C++知识”覆盖到“附录C 阅读JVM需要了解的C++知识”，共1个节点。主线是掌握阅读HotSpot所需的头文件、类、模板、指针、宏、RAII与定义实现分离，不把删节代码当可编译原文，交付物为C++到Java差异表、头源文件导航、宏展开、所有权与生命周期注释。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-appendix-c-cpp-q2",
    "chapter": "jg1b-appendix-c-cpp",
    "level": 3,
    "question": "怎样为“附录C 阅读JVM需要了解的C++知识”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“从一个G1类追踪声明、实现、宏和调用者，画出对象所有权并由调试构建验证析构与线程边界”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-appendix-c-cpp-q3",
    "chapter": "jg1b-appendix-c-cpp",
    "level": 3,
    "question": "为什么“按Java语义猜C++对象生命周期、忽略宏和条件编译，或复制书中删节片段后误判源码”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到C++到Java差异表、头源文件导航、宏展开、所有权与生命周期注释，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-appendix-c-cpp-q4",
    "chapter": "jg1b-appendix-c-cpp",
    "level": 4,
    "question": "“附录C 阅读JVM需要了解的C++知识”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-appendix-c-cpp-q5",
    "chapter": "jg1b-appendix-c-cpp",
    "level": 4,
    "question": "如何为“附录C 阅读JVM需要了解的C++知识”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-appendix-c-cpp-q6",
    "chapter": "jg1b-appendix-c-cpp",
    "level": 4,
    "question": "“附录C 阅读JVM需要了解的C++知识”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭C++到Java差异表、头源文件导航、宏展开、所有权与生命周期注释重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jg1b-official-final-review-q1",
    "chapter": "jg1b-official-final-review",
    "level": 2,
    "question": "“《JVM G1源码分析和调优》全书总复习”覆盖哪些正式节点和主线？",
    "answer": "本页从“第1章 垃圾回收概述”覆盖到“附录C 阅读JVM需要了解的C++知识”，共15个节点。主线是用一个从分配、Refine、Young、并发标记、Mixed到Full GC的事故串联135个目录节点，交付物为事故时间线、源码调用链、GC日志、对象状态、参数实验、恢复与版本差异。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jg1b-official-final-review-q2",
    "chapter": "jg1b-official-final-review",
    "level": 3,
    "question": "怎样为“《JVM G1源码分析和调优》全书总复习”建立源码到日志的实验？",
    "answer": "固定源码提交、JDK、堆、参数和工作量，执行“随机抽取一个正式节点嵌入综合事故，让另一位读者仅凭原始证据推翻或确认根因”，对齐对象或Region状态、函数分支、原始GC日志和指标。",
    "tags": [
      "源码",
      "实验"
    ]
  },
  {
    "id": "jg1b-official-final-review-q3",
    "chapter": "jg1b-official-final-review",
    "level": 3,
    "question": "为什么“只会解释日志标签，无法把jdk8u60源码分支、对象图、阶段耗时、参数副作用和恢复条件相互印证”会得出错误调优结论？",
    "answer": "它遗漏版本、关键阶段或负面成本。应回到事故时间线、源码调用链、GC日志、对象状态、参数实验、恢复与版本差异，补齐基线、单变量对照、失败反例、吞吐CPU内存与回滚。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jg1b-official-final-review-q4",
    "chapter": "jg1b-official-final-review",
    "level": 4,
    "question": "“《JVM G1源码分析和调优》全书总复习”从jdk8u60迁移时哪些证据必须重建？",
    "answer": "源码目录和函数、参数类别与默认值、日志格式、收集阶段、对象布局和工具支持都需按目标JDK重建；只能复用机制问题，不能复制旧路径与旧值。",
    "tags": [
      "版本",
      "迁移"
    ]
  },
  {
    "id": "jg1b-official-final-review-q5",
    "chapter": "jg1b-official-final-review",
    "level": 4,
    "question": "如何为“《JVM G1源码分析和调优》全书总复习”设计能推翻参数收益的反例？",
    "answer": "保持输入与环境不变，只切换该参数；同时检查目标指标和吞吐、CPU、RSS、GC频率、Full GC、错误及恢复。任何负面指标越界都推翻“整体更优”。",
    "tags": [
      "反证",
      "调优"
    ]
  },
  {
    "id": "jg1b-official-final-review-q6",
    "chapter": "jg1b-official-final-review",
    "level": 4,
    "question": "“《JVM G1源码分析和调优》全书总复习”达到交接标准需要什么证据？",
    "answer": "需要源码提交、JDK与完整参数、固定工作量、Region或对象状态、原始日志、阶段时间线、负面指标、版本限制和回滚，让他人仅凭事故时间线、源码调用链、GC日志、对象状态、参数实验、恢复与版本差异重放。",
    "tags": [
      "验收",
      "交接"
    ]
  }
];
