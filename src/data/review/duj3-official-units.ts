import type { ReviewQuestion } from "./types";

export const duj3OfficialQuestions: ReviewQuestion[] = [
  {
    "id": "duj3-official-learning-map-q1",
    "chapter": "duj3-official-learning-map",
    "level": 2,
    "question": "“《深入理解Java虚拟机（第3版）》权威学习地图”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第一部分 走近Java”覆盖到“附录E JDK历史版本轨迹”，共23个节点。主线是沿5个部分、13章和附录A-E建立从JVM历史、内存、执行、编译到并发的完整学习与证据路径，交付物为282节点覆盖矩阵、章节依赖图、版本边界账本和全书实验清单。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-official-learning-map-q2",
    "chapter": "duj3-official-learning-map",
    "level": 3,
    "question": "怎样为“《深入理解Java虚拟机（第3版）》权威学习地图”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“从OOM、类冲突、启动慢和数据竞争四个症状分别选择最短章节路径，并声明每步停止条件”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-official-learning-map-q3",
    "chapter": "duj3-official-learning-map",
    "level": 3,
    "question": "为什么“把本书压缩成GC参数和面试术语，遗漏Class格式、加载执行、编译器、并发语义与历史版本边界”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到282节点覆盖矩阵、章节依赖图、版本边界账本和全书实验清单，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-official-learning-map-q4",
    "chapter": "duj3-official-learning-map",
    "level": 4,
    "question": "“《深入理解Java虚拟机（第3版）》权威学习地图”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-official-learning-map-q5",
    "chapter": "duj3-official-learning-map",
    "level": 4,
    "question": "如何为“《深入理解Java虚拟机（第3版）》权威学习地图”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-official-learning-map-q6",
    "chapter": "duj3-official-learning-map",
    "level": 4,
    "question": "“《深入理解Java虚拟机（第3版）》权威学习地图”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭282节点覆盖矩阵、章节依赖图、版本边界账本和全书实验清单重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-part-1-approaching-java-q1",
    "chapter": "duj3-part-1-approaching-java",
    "level": 2,
    "question": "“第一部分 走近Java”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第一部分 走近Java”覆盖到“第一部分 走近Java”，共1个节点。主线是建立Java技术体系、虚拟机家族与OpenJDK构建的历史坐标，理解规范、实现和发行版不是同一层次，交付物为技术体系分层图、虚拟机谱系、JDK构建环境指纹与源码调试入口。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-part-1-approaching-java-q2",
    "chapter": "duj3-part-1-approaching-java",
    "level": 3,
    "question": "怎样为“第一部分 走近Java”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“选择一项JVM行为，分别定位规范约束、HotSpot实现与发行版配置，说明三者何处可能不同”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-part-1-approaching-java-q3",
    "chapter": "duj3-part-1-approaching-java",
    "level": 3,
    "question": "为什么“把HotSpot的实现细节误说成所有JVM必须遵守的规范，或只背版本时间线而不验证工具链”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到技术体系分层图、虚拟机谱系、JDK构建环境指纹与源码调试入口，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-part-1-approaching-java-q4",
    "chapter": "duj3-part-1-approaching-java",
    "level": 4,
    "question": "“第一部分 走近Java”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-part-1-approaching-java-q5",
    "chapter": "duj3-part-1-approaching-java",
    "level": 4,
    "question": "如何为“第一部分 走近Java”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-part-1-approaching-java-q6",
    "chapter": "duj3-part-1-approaching-java",
    "level": 4,
    "question": "“第一部分 走近Java”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭技术体系分层图、虚拟机谱系、JDK构建环境指纹与源码调试入口重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-01-approaching-java-q1",
    "chapter": "duj3-01-approaching-java",
    "level": 2,
    "question": "“第1章 走近Java”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第1章 走近Java”覆盖到“1.7 本章小结”，共26个节点。主线是从Java体系和JVM演进走到可重复的OpenJDK 12源码构建，建立阅读虚拟机实现的入口，交付物为JVM家族比较表、JDK 12构建清单、构建日志、镜像验证与调试断点。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-01-approaching-java-q2",
    "chapter": "duj3-01-approaching-java",
    "level": 3,
    "question": "怎样为“第1章 走近Java”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“固定源码提交和boot JDK，完成一次干净构建并在类加载或GC初始化路径命中源码断点”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-01-approaching-java-q3",
    "chapter": "duj3-01-approaching-java",
    "level": 3,
    "question": "为什么“用今天的发行版默认行为回填2019年的技术语境，或构建成功却不记录源码提交、boot JDK与依赖”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到JVM家族比较表、JDK 12构建清单、构建日志、镜像验证与调试断点，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-01-approaching-java-q4",
    "chapter": "duj3-01-approaching-java",
    "level": 4,
    "question": "“第1章 走近Java”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-01-approaching-java-q5",
    "chapter": "duj3-01-approaching-java",
    "level": 4,
    "question": "如何为“第1章 走近Java”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-01-approaching-java-q6",
    "chapter": "duj3-01-approaching-java",
    "level": 4,
    "question": "“第1章 走近Java”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭JVM家族比较表、JDK 12构建清单、构建日志、镜像验证与调试断点重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-part-2-memory-management-q1",
    "chapter": "duj3-part-2-memory-management",
    "level": 2,
    "question": "“第二部分 自动内存管理”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第二部分 自动内存管理”覆盖到“第二部分 自动内存管理”，共1个节点。主线是把运行时数据区、对象生命周期、收集器、诊断工具和调优案例串成内存问题的因果链，交付物为内存区域地图、对象生命周期、GC证据矩阵、采集风险预算。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-part-2-memory-management-q2",
    "chapter": "duj3-part-2-memory-management",
    "level": 3,
    "question": "怎样为“第二部分 自动内存管理”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“制造堆、栈、元空间与直接内存四类不同压力，比较错误、日志、转储和恢复方式”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-part-2-memory-management-q3",
    "chapter": "duj3-part-2-memory-management",
    "level": 3,
    "question": "为什么“只记堆参数和收集器名称，不区分规范区域、HotSpot实现、分配速率、存活集与本地内存”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到内存区域地图、对象生命周期、GC证据矩阵、采集风险预算，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-part-2-memory-management-q4",
    "chapter": "duj3-part-2-memory-management",
    "level": 4,
    "question": "“第二部分 自动内存管理”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-part-2-memory-management-q5",
    "chapter": "duj3-part-2-memory-management",
    "level": 4,
    "question": "如何为“第二部分 自动内存管理”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-part-2-memory-management-q6",
    "chapter": "duj3-part-2-memory-management",
    "level": 4,
    "question": "“第二部分 自动内存管理”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭内存区域地图、对象生命周期、GC证据矩阵、采集风险预算重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-02-memory-areas-q1",
    "chapter": "duj3-02-memory-areas",
    "level": 2,
    "question": "“第2章 Java内存区域与内存溢出异常”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第2章 Java内存区域与内存溢出异常”覆盖到“2.5 本章小结”，共20个节点。主线是区分线程私有与共享运行时区域，理解HotSpot对象创建和布局，并为每类内存异常建立可控复现，交付物为区域所有权图、对象布局记录、四类OOM最小案例、限制参数与转储证据。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-02-memory-areas-q2",
    "chapter": "duj3-02-memory-areas",
    "level": 3,
    "question": "怎样为“第2章 Java内存区域与内存溢出异常”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“在受限容器中一次只压迫一个区域，记录错误类型、触发阈值、进程内存与可恢复性”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-02-memory-areas-q3",
    "chapter": "duj3-02-memory-areas",
    "level": 3,
    "question": "为什么“把进程RSS全部归因于Java堆，或在无资源隔离的机器上运行故意溢出的示例”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到区域所有权图、对象布局记录、四类OOM最小案例、限制参数与转储证据，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-02-memory-areas-q4",
    "chapter": "duj3-02-memory-areas",
    "level": 4,
    "question": "“第2章 Java内存区域与内存溢出异常”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-02-memory-areas-q5",
    "chapter": "duj3-02-memory-areas",
    "level": 4,
    "question": "如何为“第2章 Java内存区域与内存溢出异常”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-02-memory-areas-q6",
    "chapter": "duj3-02-memory-areas",
    "level": 4,
    "question": "“第2章 Java内存区域与内存溢出异常”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭区域所有权图、对象布局记录、四类OOM最小案例、限制参数与转储证据重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-03-gc-allocation-q1",
    "chapter": "duj3-03-gc-allocation",
    "level": 2,
    "question": "“第3章 垃圾收集器与内存分配策略”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第3章 垃圾收集器与内存分配策略”覆盖到“3.9 本章小结”，共43个节点。主线是从对象存活判定、收集算法和HotSpot并发标记细节走到收集器权衡与分配实验，交付物为可达性图、算法移动过程、收集器权衡表、GC日志、分配年龄实验。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-03-gc-allocation-q2",
    "chapter": "duj3-03-gc-allocation",
    "level": 3,
    "question": "怎样为“第3章 垃圾收集器与内存分配策略”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“固定工作量分别观察吞吐优先与低延迟收集器，比较暂停分布、CPU、存活集和内存余量”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-03-gc-allocation-q3",
    "chapter": "duj3-03-gc-allocation",
    "level": 3,
    "question": "为什么“按收集器流行度选型、混淆并行和并发，或只比较停顿而忽略吞吐、CPU、堆占用和失败模式”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到可达性图、算法移动过程、收集器权衡表、GC日志、分配年龄实验，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-03-gc-allocation-q4",
    "chapter": "duj3-03-gc-allocation",
    "level": 4,
    "question": "“第3章 垃圾收集器与内存分配策略”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-03-gc-allocation-q5",
    "chapter": "duj3-03-gc-allocation",
    "level": 4,
    "question": "如何为“第3章 垃圾收集器与内存分配策略”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-03-gc-allocation-q6",
    "chapter": "duj3-03-gc-allocation",
    "level": 4,
    "question": "“第3章 垃圾收集器与内存分配策略”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭可达性图、算法移动过程、收集器权衡表、GC日志、分配年龄实验重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-04-monitoring-tools-q1",
    "chapter": "duj3-04-monitoring-tools",
    "level": 2,
    "question": "“第4章 虚拟机性能监控、故障处理工具”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第4章 虚拟机性能监控、故障处理工具”覆盖到“4.5 本章小结”，共17个节点。主线是按问题选择jps、jstat、jinfo、jmap、jstack、JHSDB、JConsole、VisualVM、JFR与JMC，并记录探针效应，交付物为工具选择矩阵、命令与版本、原始输出、采集开销、敏感数据处置记录。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-04-monitoring-tools-q2",
    "chapter": "duj3-04-monitoring-tools",
    "level": 3,
    "question": "怎样为“第4章 虚拟机性能监控、故障处理工具”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“针对同一延迟症状先用低扰动统计，再逐级采集线程和飞行记录，比较每步新增的判别信息”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-04-monitoring-tools-q3",
    "chapter": "duj3-04-monitoring-tools",
    "level": 3,
    "question": "为什么“把工具截图当根因、在生产无预算地执行高开销采集，或忽略容器、权限和JDK版本差异”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到工具选择矩阵、命令与版本、原始输出、采集开销、敏感数据处置记录，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-04-monitoring-tools-q4",
    "chapter": "duj3-04-monitoring-tools",
    "level": 4,
    "question": "“第4章 虚拟机性能监控、故障处理工具”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-04-monitoring-tools-q5",
    "chapter": "duj3-04-monitoring-tools",
    "level": 4,
    "question": "如何为“第4章 虚拟机性能监控、故障处理工具”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-04-monitoring-tools-q6",
    "chapter": "duj3-04-monitoring-tools",
    "level": 4,
    "question": "“第4章 虚拟机性能监控、故障处理工具”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭工具选择矩阵、命令与版本、原始输出、采集开销、敏感数据处置记录重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-05-tuning-cases-q1",
    "chapter": "duj3-05-tuning-cases",
    "level": 2,
    "question": "“第5章 调优案例分析与实战”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第5章 调优案例分析与实战”覆盖到“5.4 本章小结”，共18个节点。主线是用多类真实案例练习从现象到证据，再以Eclipse案例建立版本、类加载、编译、内存和收集器的受控调优流程，交付物为案例因果图、基线报告、单变量变更、兼容清单、收益与回滚阈值。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-05-tuning-cases-q2",
    "chapter": "duj3-05-tuning-cases",
    "level": 3,
    "question": "怎样为“第5章 调优案例分析与实战”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“选一个启动慢和一个稳态停顿问题，每轮只改变JDK、堆或收集器之一，并用相同脚本重复测量”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-05-tuning-cases-q3",
    "chapter": "duj3-05-tuning-cases",
    "level": 3,
    "question": "为什么“先改参数再量基线、把个案结论复制到不同负载，或升级JDK时同时改变过多变量导致因果不可辨”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到案例因果图、基线报告、单变量变更、兼容清单、收益与回滚阈值，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-05-tuning-cases-q4",
    "chapter": "duj3-05-tuning-cases",
    "level": 4,
    "question": "“第5章 调优案例分析与实战”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-05-tuning-cases-q5",
    "chapter": "duj3-05-tuning-cases",
    "level": 4,
    "question": "如何为“第5章 调优案例分析与实战”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-05-tuning-cases-q6",
    "chapter": "duj3-05-tuning-cases",
    "level": 4,
    "question": "“第5章 调优案例分析与实战”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭案例因果图、基线报告、单变量变更、兼容清单、收益与回滚阈值重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-part-3-execution-subsystem-q1",
    "chapter": "duj3-part-3-execution-subsystem",
    "level": 2,
    "question": "“第三部分 虚拟机执行子系统”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第三部分 虚拟机执行子系统”覆盖到“第三部分 虚拟机执行子系统”，共1个节点。主线是沿Class文件、加载与链接、栈帧执行、动态调用和案例实战解释字节码如何成为运行行为，交付物为源码到Class映射、加载状态机、栈帧时间线、动态调用验证。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-part-3-execution-subsystem-q2",
    "chapter": "duj3-part-3-execution-subsystem",
    "level": 3,
    "question": "怎样为“第三部分 虚拟机执行子系统”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“编译一个包含泛型、异常、同步和动态调用的最小类，串联解析、加载、验证和逐指令执行证据”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-part-3-execution-subsystem-q3",
    "chapter": "duj3-part-3-execution-subsystem",
    "level": 3,
    "question": "为什么“只背Class格式和指令表，无法从源码、字节码、加载器身份与运行栈互相映射”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到源码到Class映射、加载状态机、栈帧时间线、动态调用验证，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-part-3-execution-subsystem-q4",
    "chapter": "duj3-part-3-execution-subsystem",
    "level": 4,
    "question": "“第三部分 虚拟机执行子系统”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-part-3-execution-subsystem-q5",
    "chapter": "duj3-part-3-execution-subsystem",
    "level": 4,
    "question": "如何为“第三部分 虚拟机执行子系统”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-part-3-execution-subsystem-q6",
    "chapter": "duj3-part-3-execution-subsystem",
    "level": 4,
    "question": "“第三部分 虚拟机执行子系统”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭源码到Class映射、加载状态机、栈帧时间线、动态调用验证重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-06-class-file-q1",
    "chapter": "duj3-06-class-file",
    "level": 2,
    "question": "“第6章 类文件结构”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第6章 类文件结构”覆盖到“6.7 本章小结”，共25个节点。主线是逐字节解析Class文件表结构与指令族，区分规范公开格式和虚拟机私有执行实现，交付物为十六进制偏移表、常量池索引图、方法Code属性、操作数栈轨迹、验证失败样本。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-06-class-file-q2",
    "chapter": "duj3-06-class-file",
    "level": 3,
    "question": "怎样为“第6章 类文件结构”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“从最小类手工定位魔数、版本、常量池和Code属性，再改变一个索引观察验证器拒绝位置”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-06-class-file-q3",
    "chapter": "duj3-06-class-file",
    "level": 3,
    "question": "为什么“用反编译后的Java代替Class证据、忽略版本与属性长度，或修改字节后不经过验证器检查”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到十六进制偏移表、常量池索引图、方法Code属性、操作数栈轨迹、验证失败样本，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-06-class-file-q4",
    "chapter": "duj3-06-class-file",
    "level": 4,
    "question": "“第6章 类文件结构”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-06-class-file-q5",
    "chapter": "duj3-06-class-file",
    "level": 4,
    "question": "如何为“第6章 类文件结构”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-06-class-file-q6",
    "chapter": "duj3-06-class-file",
    "level": 4,
    "question": "“第6章 类文件结构”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭十六进制偏移表、常量池索引图、方法Code属性、操作数栈轨迹、验证失败样本重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-07-class-loading-q1",
    "chapter": "duj3-07-class-loading",
    "level": 2,
    "question": "“第7章 虚拟机类加载机制”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第7章 虚拟机类加载机制”覆盖到“7.6 本章小结”，共17个节点。主线是掌握加载、验证、准备、解析、初始化五阶段，理解类身份由名称与加载器共同决定，并纳入JPMS模块边界，交付物为加载状态机、初始化触发矩阵、加载器委派图、类身份实验、模块可读性与导出表。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-07-class-loading-q2",
    "chapter": "duj3-07-class-loading",
    "level": 3,
    "question": "怎样为“第7章 虚拟机类加载机制”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“由两个独立加载器加载同名Class，验证类型不兼容，再改变模块可读性观察解析和访问失败”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-07-class-loading-q3",
    "chapter": "duj3-07-class-loading",
    "level": 3,
    "question": "为什么“把加载和初始化混为一谈、只按类名判断同一类型，或机械打破双亲委派造成重复类与隔离漏洞”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到加载状态机、初始化触发矩阵、加载器委派图、类身份实验、模块可读性与导出表，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-07-class-loading-q4",
    "chapter": "duj3-07-class-loading",
    "level": 4,
    "question": "“第7章 虚拟机类加载机制”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-07-class-loading-q5",
    "chapter": "duj3-07-class-loading",
    "level": 4,
    "question": "如何为“第7章 虚拟机类加载机制”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-07-class-loading-q6",
    "chapter": "duj3-07-class-loading",
    "level": 4,
    "question": "“第7章 虚拟机类加载机制”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭加载状态机、初始化触发矩阵、加载器委派图、类身份实验、模块可读性与导出表重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-08-bytecode-engine-q1",
    "chapter": "duj3-08-bytecode-engine",
    "level": 2,
    "question": "“第8章 虚拟机字节码执行引擎”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第8章 虚拟机字节码执行引擎”覆盖到“8.6 本章小结”，共22个节点。主线是从栈帧和方法调用解释字节码执行，区分解析与分派，并通过MethodHandle与invokedynamic理解动态链接，交付物为栈帧剖面、invoke指令对照、分派矩阵、MethodHandle实验、逐指令栈变化。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-08-bytecode-engine-q2",
    "chapter": "duj3-08-bytecode-engine",
    "level": 3,
    "question": "怎样为“第8章 虚拟机字节码执行引擎”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“为重载、覆盖、接口调用和invokedynamic各编译一个样本，预测并核对调用点与目标方法”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-08-bytecode-engine-q3",
    "chapter": "duj3-08-bytecode-engine",
    "level": 3,
    "question": "为什么“把重载当动态分派、忽略接收者和静态类型，或只看源码不跟踪局部变量表与操作数栈”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到栈帧剖面、invoke指令对照、分派矩阵、MethodHandle实验、逐指令栈变化，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-08-bytecode-engine-q4",
    "chapter": "duj3-08-bytecode-engine",
    "level": 4,
    "question": "“第8章 虚拟机字节码执行引擎”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-08-bytecode-engine-q5",
    "chapter": "duj3-08-bytecode-engine",
    "level": 4,
    "question": "如何为“第8章 虚拟机字节码执行引擎”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-08-bytecode-engine-q6",
    "chapter": "duj3-08-bytecode-engine",
    "level": 4,
    "question": "“第8章 虚拟机字节码执行引擎”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭栈帧剖面、invoke指令对照、分派矩阵、MethodHandle实验、逐指令栈变化重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-09-loading-execution-cases-q1",
    "chapter": "duj3-09-loading-execution-cases",
    "level": 2,
    "question": "“第9章 类加载及执行子系统的案例与实战”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第9章 类加载及执行子系统的案例与实战”覆盖到“9.4 本章小结”，共13个节点。主线是比较Tomcat、OSGi、动态代理和Backport的类隔离与字节码改写，再实现受约束的远程执行实验，交付物为类加载拓扑、隔离用例、代理字节码、远程执行威胁模型、沙箱与清理验证。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-09-loading-execution-cases-q2",
    "chapter": "duj3-09-loading-execution-cases",
    "level": 3,
    "question": "怎样为“第9章 类加载及执行子系统的案例与实战”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“仅允许白名单类在隔离进程执行，注入超时、异常和静态状态，确认输出、资源与类加载器均被回收”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-09-loading-execution-cases-q3",
    "chapter": "duj3-09-loading-execution-cases",
    "level": 3,
    "question": "为什么“把远程执行示例当生产功能、允许任意字节码和权限，或忽略加载器泄漏、输出隔离和超时”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到类加载拓扑、隔离用例、代理字节码、远程执行威胁模型、沙箱与清理验证，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-09-loading-execution-cases-q4",
    "chapter": "duj3-09-loading-execution-cases",
    "level": 4,
    "question": "“第9章 类加载及执行子系统的案例与实战”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-09-loading-execution-cases-q5",
    "chapter": "duj3-09-loading-execution-cases",
    "level": 4,
    "question": "如何为“第9章 类加载及执行子系统的案例与实战”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-09-loading-execution-cases-q6",
    "chapter": "duj3-09-loading-execution-cases",
    "level": 4,
    "question": "“第9章 类加载及执行子系统的案例与实战”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭类加载拓扑、隔离用例、代理字节码、远程执行威胁模型、沙箱与清理验证重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-part-4-compilation-q1",
    "chapter": "duj3-part-4-compilation",
    "level": 2,
    "question": "“第四部分 程序编译与代码优化”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第四部分 程序编译与代码优化”覆盖到“第四部分 程序编译与代码优化”，共1个节点。主线是区分前端编译、即时编译和提前编译，观察语法糖、IR与优化如何改变代码表示而保持语义，交付物为编译流水线、源码到字节码差异、JIT事件、IR和基准证据。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-part-4-compilation-q2",
    "chapter": "duj3-part-4-compilation",
    "level": 3,
    "question": "怎样为“第四部分 程序编译与代码优化”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“让同一热点经历解释、分层编译、内联和去优化，保存编译日志与行为不变量”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-part-4-compilation-q3",
    "chapter": "duj3-part-4-compilation",
    "level": 3,
    "question": "为什么“把编译器优化当保证、用微基准观察到的汇编外推业务系统，或忽略去优化与分层编译”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到编译流水线、源码到字节码差异、JIT事件、IR和基准证据，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-part-4-compilation-q4",
    "chapter": "duj3-part-4-compilation",
    "level": 4,
    "question": "“第四部分 程序编译与代码优化”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-part-4-compilation-q5",
    "chapter": "duj3-part-4-compilation",
    "level": 4,
    "question": "如何为“第四部分 程序编译与代码优化”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-part-4-compilation-q6",
    "chapter": "duj3-part-4-compilation",
    "level": 4,
    "question": "“第四部分 程序编译与代码优化”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭编译流水线、源码到字节码差异、JIT事件、IR和基准证据重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-10-frontend-compiler-q1",
    "chapter": "duj3-10-frontend-compiler",
    "level": 2,
    "question": "“第10章 前端编译与优化”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第10章 前端编译与优化”覆盖到“10.5 本章小结”，共17个节点。主线是沿Javac解析、符号表、注解处理、语义分析到字节码生成，拆解泛型擦除、装箱与遍历等语法糖，交付物为Javac阶段图、脱糖前后字节码、处理器输入输出、确定性构建测试。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-10-frontend-compiler-q2",
    "chapter": "duj3-10-frontend-compiler",
    "level": 3,
    "question": "怎样为“第10章 前端编译与优化”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“编写只读语法树的检查器，固定输入两次构建并比较生成物哈希，再验证错误定位与增量构建”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-10-frontend-compiler-q3",
    "chapter": "duj3-10-frontend-compiler",
    "level": 3,
    "question": "为什么“注解处理器产生不稳定构建、把泛型信息误认为完整保留到运行时，或忽略装箱空值和分配成本”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到Javac阶段图、脱糖前后字节码、处理器输入输出、确定性构建测试，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-10-frontend-compiler-q4",
    "chapter": "duj3-10-frontend-compiler",
    "level": 4,
    "question": "“第10章 前端编译与优化”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-10-frontend-compiler-q5",
    "chapter": "duj3-10-frontend-compiler",
    "level": 4,
    "question": "如何为“第10章 前端编译与优化”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-10-frontend-compiler-q6",
    "chapter": "duj3-10-frontend-compiler",
    "level": 4,
    "question": "“第10章 前端编译与优化”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭Javac阶段图、脱糖前后字节码、处理器输入输出、确定性构建测试重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-11-backend-compiler-q1",
    "chapter": "duj3-11-backend-compiler",
    "level": 2,
    "question": "“第11章 后端编译与优化”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第11章 后端编译与优化”覆盖到“11.6 本章小结”，共23个节点。主线是比较解释、JIT与AOT，理解编译触发、内联、逃逸分析和Graal IR，并识别投机优化与去优化，交付物为编译事件时间线、内联决策、逃逸证据、IR演化、去优化反例与版本账本。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-11-backend-compiler-q2",
    "chapter": "duj3-11-backend-compiler",
    "level": 3,
    "question": "怎样为“第11章 后端编译与优化”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“用可靠基准固定工作量，观察热点从解释到编译、内联失败再到类型假设失效后的去优化”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-11-backend-compiler-q3",
    "chapter": "duj3-11-backend-compiler",
    "level": 3,
    "question": "为什么“只看峰值不计预热、假设逃逸分析必然栈上分配，或把书中Jaotc状态当作所有后续JDK现状”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到编译事件时间线、内联决策、逃逸证据、IR演化、去优化反例与版本账本，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-11-backend-compiler-q4",
    "chapter": "duj3-11-backend-compiler",
    "level": 4,
    "question": "“第11章 后端编译与优化”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-11-backend-compiler-q5",
    "chapter": "duj3-11-backend-compiler",
    "level": 4,
    "question": "如何为“第11章 后端编译与优化”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-11-backend-compiler-q6",
    "chapter": "duj3-11-backend-compiler",
    "level": 4,
    "question": "“第11章 后端编译与优化”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭编译事件时间线、内联决策、逃逸证据、IR演化、去优化反例与版本账本重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-part-5-concurrency-q1",
    "chapter": "duj3-part-5-concurrency",
    "level": 2,
    "question": "“第五部分 高效并发”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第五部分 高效并发”覆盖到“第五部分 高效并发”，共1个节点。主线是把硬件一致性、Java内存模型、线程实现、协程与锁优化统一到可证明的并发正确性和性能边界，交付物为共享状态模型、happens-before图、并发反例、锁状态与公平性证据。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-part-5-concurrency-q2",
    "chapter": "duj3-part-5-concurrency",
    "level": 3,
    "question": "怎样为“第五部分 高效并发”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“构造可见性、原子性、有序性和竞争四类最小反例，再用对应同步关系逐个修复”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-part-5-concurrency-q3",
    "chapter": "duj3-part-5-concurrency",
    "level": 3,
    "question": "为什么“用sleep和单次运行证明并发正确，把volatile、原子和锁互相替代，或为了性能破坏happens-before”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到共享状态模型、happens-before图、并发反例、锁状态与公平性证据，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-part-5-concurrency-q4",
    "chapter": "duj3-part-5-concurrency",
    "level": 4,
    "question": "“第五部分 高效并发”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-part-5-concurrency-q5",
    "chapter": "duj3-part-5-concurrency",
    "level": 4,
    "question": "如何为“第五部分 高效并发”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-part-5-concurrency-q6",
    "chapter": "duj3-part-5-concurrency",
    "level": 4,
    "question": "“第五部分 高效并发”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭共享状态模型、happens-before图、并发反例、锁状态与公平性证据重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-12-memory-model-threads-q1",
    "chapter": "duj3-12-memory-model-threads",
    "level": 2,
    "question": "“第12章 Java内存模型与线程”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第12章 Java内存模型与线程”覆盖到“12.6 本章小结”，共19个节点。主线是从缓存一致性过渡到JMM的原子性、可见性、有序性和happens-before，再比较内核线程与协程，交付物为JMM动作图、重排序反例、happens-before证明、线程状态轨迹、协程版本边界。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-12-memory-model-threads-q2",
    "chapter": "duj3-12-memory-model-threads",
    "level": 3,
    "question": "怎样为“第12章 Java内存模型与线程”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“用并发测试器验证消息传递反例，分别加入volatile、锁和线程启动/终止规则，解释合法结果变化”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-12-memory-model-threads-q3",
    "chapter": "duj3-12-memory-model-threads",
    "level": 3,
    "question": "为什么“把volatile误作复合操作原子性、用线程状态猜调度保证，或把原书中的协程展望冒充后续实现现状”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到JMM动作图、重排序反例、happens-before证明、线程状态轨迹、协程版本边界，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-12-memory-model-threads-q4",
    "chapter": "duj3-12-memory-model-threads",
    "level": 4,
    "question": "“第12章 Java内存模型与线程”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-12-memory-model-threads-q5",
    "chapter": "duj3-12-memory-model-threads",
    "level": 4,
    "question": "如何为“第12章 Java内存模型与线程”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-12-memory-model-threads-q6",
    "chapter": "duj3-12-memory-model-threads",
    "level": 4,
    "question": "“第12章 Java内存模型与线程”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭JMM动作图、重排序反例、happens-before证明、线程状态轨迹、协程版本边界重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-13-thread-safety-locks-q1",
    "chapter": "duj3-13-thread-safety-locks",
    "level": 2,
    "question": "“第13章 线程安全与锁优化”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第13章 线程安全与锁优化”覆盖到“13.4 本章小结”，共12个节点。主线是从不可变、互斥与非阻塞实现线程安全，理解自旋、消除、粗化、轻量级锁与偏向锁的版本化实现，交付物为安全性定义、线性化点、竞争基准、锁状态记录、版本适用域与回归测试。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-13-thread-safety-locks-q2",
    "chapter": "duj3-13-thread-safety-locks",
    "level": 3,
    "question": "怎样为“第13章 线程安全与锁优化”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“在低竞争和高竞争两组负载比较互斥与CAS方案，检查吞吐、尾延迟、失败重试、饥饿和业务不变量”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-13-thread-safety-locks-q3",
    "chapter": "duj3-13-thread-safety-locks",
    "level": 3,
    "question": "为什么“只追求无锁标签、用对象头截图外推所有JDK，或缩小锁范围后破坏跨字段不变量”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到安全性定义、线性化点、竞争基准、锁状态记录、版本适用域与回归测试，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-13-thread-safety-locks-q4",
    "chapter": "duj3-13-thread-safety-locks",
    "level": 4,
    "question": "“第13章 线程安全与锁优化”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-13-thread-safety-locks-q5",
    "chapter": "duj3-13-thread-safety-locks",
    "level": 4,
    "question": "如何为“第13章 线程安全与锁优化”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-13-thread-safety-locks-q6",
    "chapter": "duj3-13-thread-safety-locks",
    "level": 4,
    "question": "“第13章 线程安全与锁优化”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭安全性定义、线性化点、竞争基准、锁状态记录、版本适用域与回归测试重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-appendix-a-build-openjdk6-q1",
    "chapter": "duj3-appendix-a-build-openjdk6",
    "level": 2,
    "question": "“附录A 在Windows系统下编译OpenJDK 6”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“附录A 在Windows系统下编译OpenJDK 6”覆盖到“附录A 在Windows系统下编译OpenJDK 6”，共1个节点。主线是保留旧版Windows构建OpenJDK 6的历史方法，借此识别工具链、平台和版本依赖，交付物为历史工具链清单、隔离环境、构建日志、与第1章OpenJDK 12流程的差异。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-appendix-a-build-openjdk6-q2",
    "chapter": "duj3-appendix-a-build-openjdk6",
    "level": 3,
    "question": "怎样为“附录A 在Windows系统下编译OpenJDK 6”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“在隔离环境只复核构建步骤和依赖关系，不把旧二进制接入生产或联网服务”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-appendix-a-build-openjdk6-q3",
    "chapter": "duj3-appendix-a-build-openjdk6",
    "level": 3,
    "question": "为什么“直接在现代生产环境照搬过时依赖，或删除历史上下文后误解原书构建差异”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到历史工具链清单、隔离环境、构建日志、与第1章OpenJDK 12流程的差异，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-appendix-a-build-openjdk6-q4",
    "chapter": "duj3-appendix-a-build-openjdk6",
    "level": 4,
    "question": "“附录A 在Windows系统下编译OpenJDK 6”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-appendix-a-build-openjdk6-q5",
    "chapter": "duj3-appendix-a-build-openjdk6",
    "level": 4,
    "question": "如何为“附录A 在Windows系统下编译OpenJDK 6”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-appendix-a-build-openjdk6-q6",
    "chapter": "duj3-appendix-a-build-openjdk6",
    "level": 4,
    "question": "“附录A 在Windows系统下编译OpenJDK 6”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭历史工具链清单、隔离环境、构建日志、与第1章OpenJDK 12流程的差异重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-appendix-b-java-future-2013-q1",
    "chapter": "duj3-appendix-b-java-future-2013",
    "level": 2,
    "question": "“附录B 展望Java技术的未来（2013年版）”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“附录B 展望Java技术的未来（2013年版）”覆盖到“附录B 展望Java技术的未来（2013年版）”，共1个节点。主线是把2013年的预测作为可检验历史样本，与第3版2019年的观察分开，训练技术判断的证据意识，交付物为预测命题、当时证据、实际结果、偏差原因与不可知项。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-appendix-b-java-future-2013-q2",
    "chapter": "duj3-appendix-b-java-future-2013",
    "level": 3,
    "question": "怎样为“附录B 展望Java技术的未来（2013年版）”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“随机选择三项预测，固定截止日期和判定标准，用一手发布资料复核命中与偏差”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-appendix-b-java-future-2013-q3",
    "chapter": "duj3-appendix-b-java-future-2013",
    "level": 3,
    "question": "为什么“事后选择性解释预测，或把历史设想当当前路线图与产品承诺”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到预测命题、当时证据、实际结果、偏差原因与不可知项，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-appendix-b-java-future-2013-q4",
    "chapter": "duj3-appendix-b-java-future-2013",
    "level": 4,
    "question": "“附录B 展望Java技术的未来（2013年版）”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-appendix-b-java-future-2013-q5",
    "chapter": "duj3-appendix-b-java-future-2013",
    "level": 4,
    "question": "如何为“附录B 展望Java技术的未来（2013年版）”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-appendix-b-java-future-2013-q6",
    "chapter": "duj3-appendix-b-java-future-2013",
    "level": 4,
    "question": "“附录B 展望Java技术的未来（2013年版）”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭预测命题、当时证据、实际结果、偏差原因与不可知项重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-appendix-c-bytecode-table-q1",
    "chapter": "duj3-appendix-c-bytecode-table",
    "level": 2,
    "question": "“附录C 虚拟机字节码指令表”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“附录C 虚拟机字节码指令表”覆盖到“附录C 虚拟机字节码指令表”，共1个节点。主线是将指令表作为第6与第8章的查阅索引，按操作数、栈效果、异常和控制流解释字节码，交付物为指令分类表、栈效果注释、控制流图、验证器约束。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-appendix-c-bytecode-table-q2",
    "chapter": "duj3-appendix-c-bytecode-table",
    "level": 3,
    "question": "怎样为“附录C 虚拟机字节码指令表”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“抽取一个含异常和同步的方法，为每条指令标注输入输出栈并与javap结果核对”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-appendix-c-bytecode-table-q3",
    "chapter": "duj3-appendix-c-bytecode-table",
    "level": 3,
    "question": "为什么“孤立背操作码、不验证栈高度和类型，或忽略指令版本与保留操作码”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到指令分类表、栈效果注释、控制流图、验证器约束，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-appendix-c-bytecode-table-q4",
    "chapter": "duj3-appendix-c-bytecode-table",
    "level": 4,
    "question": "“附录C 虚拟机字节码指令表”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-appendix-c-bytecode-table-q5",
    "chapter": "duj3-appendix-c-bytecode-table",
    "level": 4,
    "question": "如何为“附录C 虚拟机字节码指令表”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-appendix-c-bytecode-table-q6",
    "chapter": "duj3-appendix-c-bytecode-table",
    "level": 4,
    "question": "“附录C 虚拟机字节码指令表”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭指令分类表、栈效果注释、控制流图、验证器约束重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-appendix-d-oql-q1",
    "chapter": "duj3-appendix-d-oql",
    "level": 2,
    "question": "“附录D 对象查询语言（OQL）简介”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“附录D 对象查询语言（OQL）简介”覆盖到“附录D 对象查询语言（OQL）简介”，共1个节点。主线是用OQL从堆转储筛选对象、字段与引用关系，同时控制查询成本和敏感数据暴露，交付物为转储校验和、OQL查询、结果采样、GC根路径、访问与销毁审计。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-appendix-d-oql-q2",
    "chapter": "duj3-appendix-d-oql",
    "level": 3,
    "question": "怎样为“附录D 对象查询语言（OQL）简介”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“构造已关闭但仍被监听器保留的对象，用OQL筛选并沿GC根找到所有者，修复后重采集”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-appendix-d-oql-q3",
    "chapter": "duj3-appendix-d-oql",
    "level": 3,
    "question": "为什么“只按类名计数认定泄漏、运行无界查询耗尽分析器，或共享含秘密的堆转储”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到转储校验和、OQL查询、结果采样、GC根路径、访问与销毁审计，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-appendix-d-oql-q4",
    "chapter": "duj3-appendix-d-oql",
    "level": 4,
    "question": "“附录D 对象查询语言（OQL）简介”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-appendix-d-oql-q5",
    "chapter": "duj3-appendix-d-oql",
    "level": 4,
    "question": "如何为“附录D 对象查询语言（OQL）简介”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-appendix-d-oql-q6",
    "chapter": "duj3-appendix-d-oql",
    "level": 4,
    "question": "“附录D 对象查询语言（OQL）简介”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭转储校验和、OQL查询、结果采样、GC根路径、访问与销毁审计重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-appendix-e-jdk-history-q1",
    "chapter": "duj3-appendix-e-jdk-history",
    "level": 2,
    "question": "“附录E JDK历史版本轨迹”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“附录E JDK历史版本轨迹”覆盖到“附录E JDK历史版本轨迹”，共1个节点。主线是把JDK版本演进与本书章节中的行为变化建立索引，避免跨版本套用参数、工具和对象布局，交付物为版本轨迹、特性到章节映射、弃用与移除清单、迁移验证。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-appendix-e-jdk-history-q2",
    "chapter": "duj3-appendix-e-jdk-history",
    "level": 3,
    "question": "怎样为“附录E JDK历史版本轨迹”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“选择一个GC参数、一个工具和一个类加载行为，在两个目标JDK上用一手文档与最小实验复核”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-appendix-e-jdk-history-q3",
    "chapter": "duj3-appendix-e-jdk-history",
    "level": 3,
    "question": "为什么“只按版本号判断兼容，忽略供应商、垃圾收集器、模块、容器和已移除功能”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到版本轨迹、特性到章节映射、弃用与移除清单、迁移验证，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-appendix-e-jdk-history-q4",
    "chapter": "duj3-appendix-e-jdk-history",
    "level": 4,
    "question": "“附录E JDK历史版本轨迹”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-appendix-e-jdk-history-q5",
    "chapter": "duj3-appendix-e-jdk-history",
    "level": 4,
    "question": "如何为“附录E JDK历史版本轨迹”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-appendix-e-jdk-history-q6",
    "chapter": "duj3-appendix-e-jdk-history",
    "level": 4,
    "question": "“附录E JDK历史版本轨迹”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭版本轨迹、特性到章节映射、弃用与移除清单、迁移验证重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "duj3-official-final-review-q1",
    "chapter": "duj3-official-final-review",
    "level": 2,
    "question": "“《深入理解Java虚拟机（第3版）》全书总复习”覆盖哪些正式节点，主线是什么？",
    "answer": "本页从“第一部分 走近Java”覆盖到“附录E JDK历史版本轨迹”，共23个节点。主线是用一个从Class加载、热点编译、并发竞争到GC停顿的综合案例答辩串联282个正式节点，交付物为全书答辩包、原始输出、阶段状态图、版本差异、反例、回滚与复现实验。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "duj3-official-final-review-q2",
    "chapter": "duj3-official-final-review",
    "level": 3,
    "question": "怎样为“《深入理解Java虚拟机（第3版）》全书总复习”建立跨层最小实验？",
    "answer": "固定JDK、JVM实现、参数、源码和工作量，执行“随机抽取一个目录节点嵌入综合故障，让另一位读者从原始证据重建并挑战根因”，保存源码、Class、运行时和工具原始证据，并预先声明可推翻条件。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "duj3-official-final-review-q3",
    "chapter": "duj3-official-final-review",
    "level": 3,
    "question": "为什么“只能复述概念，无法从源码、Class、运行日志、转储和并发结果建立可推翻的因果链”会导致错误结论？",
    "answer": "它混淆规范、实现、发行版或版本，或让多个变量同时变化。应回到全书答辩包、原始输出、阶段状态图、版本差异、反例、回滚与复现实验，补齐环境指纹、单变量对照、失败反例和回滚。",
    "tags": [
      "陷阱",
      "边界"
    ]
  },
  {
    "id": "duj3-official-final-review-q4",
    "chapter": "duj3-official-final-review",
    "level": 4,
    "question": "“《深入理解Java虚拟机（第3版）》全书总复习”中哪些结论不能直接跨JDK版本复用？",
    "answer": "对象布局、收集器默认值、参数、工具、JIT阈值、类加载器实现和历史功能都可能变化；规范合同相对稳定，但仍需以目标JDK规范与发布资料、作者勘误和最小实验复核。",
    "tags": [
      "版本",
      "规范实现"
    ]
  },
  {
    "id": "duj3-official-final-review-q5",
    "chapter": "duj3-official-final-review",
    "level": 4,
    "question": "如何为“《深入理解Java虚拟机（第3版）》全书总复习”设计能推翻当前解释的反例？",
    "answer": "选择两个会产生不同预期结果的竞争假设，只改变一个输入、参数或版本；保留无探针对照和原始输出。若两种解释预测相同，就继续寻找更有判别力的状态转换。",
    "tags": [
      "反证",
      "控制变量"
    ]
  },
  {
    "id": "duj3-official-final-review-q6",
    "chapter": "duj3-official-final-review",
    "level": 4,
    "question": "“《深入理解Java虚拟机（第3版）》全书总复习”达到交接标准需要什么？",
    "answer": "需要规范与实现边界、环境指纹、固定工作量、源码和Class校验和、原始日志或转储、故障反例、版本限制、资源风险、修复前后结果及回滚，让他人仅凭全书答辩包、原始输出、阶段状态图、版本差异、反例、回滚与复现实验重放。",
    "tags": [
      "验收",
      "交接"
    ]
  }
];
