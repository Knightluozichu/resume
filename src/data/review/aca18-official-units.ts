import type { ReviewQuestion } from "./types";

export const aca18OfficialUnitQuestions: ReviewQuestion[] = [
  {
    "id": "aca18-official-learning-map-q1",
    "chapter": "aca18-official-learning-map",
    "level": 1,
    "question": "“《Android组件化架构》权威学习地图”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖9个节点，从“第1章 组件化基础”到“附录A 思维与架构”；主线是沿基础、编程、优化、编译、分发、流通、模板、演化与架构思维建立2018年组件化全链路，证据为9单元131节点矩阵、版本卡、依赖与构建图、实验路线、历史API迁移账本。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-official-learning-map-q2",
    "chapter": "aca18-official-learning-map",
    "level": 2,
    "question": "怎样为“《Android组件化架构》权威学习地图”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存9单元131节点矩阵、版本卡、依赖与构建图、实验路线、历史API迁移账本。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-official-learning-map-q3",
    "chapter": "aca18-official-learning-map",
    "level": 3,
    "question": "“《Android组件化架构》权威学习地图”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把原书压成路由、通信、DI和构建几个现代专题，遗漏编译、分发、流通、模板与演化”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-official-learning-map-q4",
    "chapter": "aca18-official-learning-map",
    "level": 3,
    "question": "为什么“《Android组件化架构》权威学习地图”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-official-learning-map-q5",
    "chapter": "aca18-official-learning-map",
    "level": 4,
    "question": "“《Android组件化架构》权威学习地图”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-official-learning-map-q6",
    "chapter": "aca18-official-learning-map",
    "level": 4,
    "question": "“《Android组件化架构》权威学习地图”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及9单元131节点矩阵、版本卡、依赖与构建图、实验路线、历史API迁移账本。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "aca18-01-component-foundations-q1",
    "chapter": "aca18-01-component-foundations",
    "level": 1,
    "question": "“第1章 组件化基础”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖12个节点，从“第1章 组件化基础”到“1.5 小结”；主线是从依赖、聚合与解耦出发，验证AndroidManifest合并和多组件Application初始化的真实边界，证据为依赖图、Manifest合并报告、Application启动序列、进程记录和冲突断言。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-01-component-foundations-q2",
    "chapter": "aca18-01-component-foundations",
    "level": 2,
    "question": "怎样为“第1章 组件化基础”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存依赖图、Manifest合并报告、Application启动序列、进程记录和冲突断言。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-01-component-foundations-q3",
    "chapter": "aca18-01-component-foundations",
    "level": 3,
    "question": "“第1章 组件化基础”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只拆Gradle module便宣称完成解耦，或让每个组件直接控制全局Application初始化顺序”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-01-component-foundations-q4",
    "chapter": "aca18-01-component-foundations",
    "level": 3,
    "question": "为什么“第1章 组件化基础”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-01-component-foundations-q5",
    "chapter": "aca18-01-component-foundations",
    "level": 4,
    "question": "“第1章 组件化基础”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-01-component-foundations-q6",
    "chapter": "aca18-01-component-foundations",
    "level": 4,
    "question": "“第1章 组件化基础”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及依赖图、Manifest合并报告、Application启动序列、进程记录和冲突断言。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "aca18-02-component-programming-q1",
    "chapter": "aca18-02-component-programming",
    "level": 1,
    "question": "“第2章 组件化编程”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖46个节点，从“第2章 组件化编程”到“2.11 小结”；主线是贯通本地广播、事件总线、ARouter、反射、存储、权限、资源、混淆与多渠道的组件协作合同，证据为消息时序、路由表、反射创建记录、存储归属、权限矩阵、资源冲突与渠道产物。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-02-component-programming-q2",
    "chapter": "aca18-02-component-programming",
    "level": 2,
    "question": "怎样为“第2章 组件化编程”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存消息时序、路由表、反射创建记录、存储归属、权限矩阵、资源冲突与渠道产物。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-02-component-programming-q3",
    "chapter": "aca18-02-component-programming",
    "level": 3,
    "question": "“第2章 组件化编程”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“用全局事件总线和字符串路由掩盖依赖，把权限、数据库、R类和混淆规则留给最终集成时碰撞”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-02-component-programming-q4",
    "chapter": "aca18-02-component-programming",
    "level": 3,
    "question": "为什么“第2章 组件化编程”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-02-component-programming-q5",
    "chapter": "aca18-02-component-programming",
    "level": 4,
    "question": "“第2章 组件化编程”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-02-component-programming-q6",
    "chapter": "aca18-02-component-programming",
    "level": 4,
    "question": "“第2章 组件化编程”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及消息时序、路由表、反射创建记录、存储归属、权限矩阵、资源冲突与渠道产物。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "aca18-03-component-optimization-q1",
    "chapter": "aca18-03-component-optimization",
    "level": 1,
    "question": "“第3章 组件化优化”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖11个节点，从“第3章 组件化优化”到“3.3 小结”；主线是用Gradle参数、调试、资源引用与4.1依赖特性缩短反馈，再比较Git submodule与subtree部署边界，证据为构建扫描、配置时间、依赖解析、资源引用报告、Git提交拓扑和回滚演练。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-03-component-optimization-q2",
    "chapter": "aca18-03-component-optimization",
    "level": 2,
    "question": "怎样为“第3章 组件化优化”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存构建扫描、配置时间、依赖解析、资源引用报告、Git提交拓扑和回滚演练。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-03-component-optimization-q3",
    "chapter": "aca18-03-component-optimization",
    "level": 3,
    "question": "“第3章 组件化优化”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“在没有基线和命中率证据时堆叠Gradle参数，或选择Git子仓方案却不定义版本推进与回滚所有者”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-03-component-optimization-q4",
    "chapter": "aca18-03-component-optimization",
    "level": 3,
    "question": "为什么“第3章 组件化优化”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-03-component-optimization-q5",
    "chapter": "aca18-03-component-optimization",
    "level": 4,
    "question": "“第3章 组件化优化”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-03-component-optimization-q6",
    "chapter": "aca18-03-component-optimization",
    "level": 4,
    "question": "“第3章 组件化优化”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及构建扫描、配置时间、依赖解析、资源引用报告、Git提交拓扑和回滚演练。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "aca18-04-component-compilation-q1",
    "chapter": "aca18-04-component-compilation",
    "level": 1,
    "question": "“第4章 组件化编译”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖9个节点，从“第4章 组件化编译”到“4.3 小结”；主线是沿Android构建任务图解释Gradle编译、Instant Run、构建策略与Freeline增量编译的输入输出和失效条件，证据为任务图、增量输入、缓存命中、冷暖构建时间、安装产物和错误回退路径。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-04-component-compilation-q2",
    "chapter": "aca18-04-component-compilation",
    "level": 2,
    "question": "怎样为“第4章 组件化编译”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存任务图、增量输入、缓存命中、冷暖构建时间、安装产物和错误回退路径。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-04-component-compilation-q3",
    "chapter": "aca18-04-component-compilation",
    "level": 3,
    "question": "“第4章 组件化编译”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只记录一次热构建速度，忽略代码、资源、Manifest、插件变化会触发不同范围的失效与全量回退”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-04-component-compilation-q4",
    "chapter": "aca18-04-component-compilation",
    "level": 3,
    "question": "为什么“第4章 组件化编译”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-04-component-compilation-q5",
    "chapter": "aca18-04-component-compilation",
    "level": 4,
    "question": "“第4章 组件化编译”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-04-component-compilation-q6",
    "chapter": "aca18-04-component-compilation",
    "level": 4,
    "question": "“第4章 组件化编译”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及任务图、增量输入、缓存命中、冷暖构建时间、安装产物和错误回退路径。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "aca18-05-component-distribution-q1",
    "chapter": "aca18-05-component-distribution",
    "level": 1,
    "question": "“第5章 组件化分发”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖26个节点，从“第5章 组件化分发”到“5.9 小结”；主线是把Activity、Fragment与View生命周期分发连接到依赖倒置、JavaPoet列表、加载优化、层级限制和多模板配置，证据为生命周期时序、分发注册表、生成源码、线程与懒加载记录、层级违规测试和模板产物。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-05-component-distribution-q2",
    "chapter": "aca18-05-component-distribution",
    "level": 2,
    "question": "怎样为“第5章 组件化分发”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存生命周期时序、分发注册表、生成源码、线程与懒加载记录、层级违规测试和模板产物。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-05-component-distribution-q3",
    "chapter": "aca18-05-component-distribution",
    "level": 3,
    "question": "“第5章 组件化分发”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“用反射扫描或全局回调无界分发，让组件在错误生命周期、线程或依赖层级执行初始化与释放”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-05-component-distribution-q4",
    "chapter": "aca18-05-component-distribution",
    "level": 3,
    "question": "为什么“第5章 组件化分发”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-05-component-distribution-q5",
    "chapter": "aca18-05-component-distribution",
    "level": 4,
    "question": "“第5章 组件化分发”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-05-component-distribution-q6",
    "chapter": "aca18-05-component-distribution",
    "level": 4,
    "question": "“第5章 组件化分发”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及生命周期时序、分发注册表、生成源码、线程与懒加载记录、层级违规测试和模板产物。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "aca18-06-component-circulation-q1",
    "chapter": "aca18-06-component-circulation",
    "level": 1,
    "question": "“第6章 组件化流通”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖11个节点，从“第6章 组件化流通”到“6.4 小结”；主线是从Maven本地缓存与远程仓库建立组件版本流通，再比较SDK、Python合并、fat-aar和JCenter发布，证据为坐标与依赖图、校验和、仓库权限、AAR内容、合并冲突、发布消费与回滚记录。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-06-component-circulation-q2",
    "chapter": "aca18-06-component-circulation",
    "level": 2,
    "question": "怎样为“第6章 组件化流通”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存坐标与依赖图、校验和、仓库权限、AAR内容、合并冲突、发布消费与回滚记录。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-06-component-circulation-q3",
    "chapter": "aca18-06-component-circulation",
    "level": 3,
    "question": "“第6章 组件化流通”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“发布可变版本或把依赖打入fat-aar却不记录来源，导致重复类、资源覆盖和不可复现供应链”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-06-component-circulation-q4",
    "chapter": "aca18-06-component-circulation",
    "level": 3,
    "question": "为什么“第6章 组件化流通”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-06-component-circulation-q5",
    "chapter": "aca18-06-component-circulation",
    "level": 4,
    "question": "“第6章 组件化流通”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-06-component-circulation-q6",
    "chapter": "aca18-06-component-circulation",
    "level": 4,
    "question": "“第6章 组件化流通”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及坐标与依赖图、校验和、仓库权限、AAR内容、合并冲突、发布消费与回滚记录。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "aca18-07-architecture-templates-q1",
    "chapter": "aca18-07-architecture-templates",
    "level": 1,
    "question": "“第7章 架构模板”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖8个节点，从“第7章 架构模板”到“7.3 小结”；主线是把组件模板、实时模板、文件头模板和注解检测变成可版本化、可验证的工程规范入口，证据为模板源、生成前后差异、IDE版本、注解检测结果、错误样例和升级迁移。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-07-architecture-templates-q2",
    "chapter": "aca18-07-architecture-templates",
    "level": 2,
    "question": "怎样为“第7章 架构模板”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存模板源、生成前后差异、IDE版本、注解检测结果、错误样例和升级迁移。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-07-architecture-templates-q3",
    "chapter": "aca18-07-architecture-templates",
    "level": 3,
    "question": "“第7章 架构模板”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把模板复制视为架构治理，生成后不检查依赖方向、命名、所有者与过期配置”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-07-architecture-templates-q4",
    "chapter": "aca18-07-architecture-templates",
    "level": 3,
    "question": "为什么“第7章 架构模板”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-07-architecture-templates-q5",
    "chapter": "aca18-07-architecture-templates",
    "level": 4,
    "question": "“第7章 架构模板”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-07-architecture-templates-q6",
    "chapter": "aca18-07-architecture-templates",
    "level": 4,
    "question": "“第7章 架构模板”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及模板源、生成前后差异、IDE版本、注解检测结果、错误样例和升级迁移。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "aca18-08-architecture-evolution-q1",
    "chapter": "aca18-08-architecture-evolution",
    "level": 1,
    "question": "“第8章 架构演化”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖8个节点，从“第8章 架构演化”到“8.7 小结”；主线是比较基础架构、基础组件化、模块化、多模板化、插件化和进程化的隔离强度、成本与适用规模，证据为阶段能力矩阵、依赖边界、构建部署成本、运行隔离、团队所有权和迁移决策记录。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-08-architecture-evolution-q2",
    "chapter": "aca18-08-architecture-evolution",
    "level": 2,
    "question": "怎样为“第8章 架构演化”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存阶段能力矩阵、依赖边界、构建部署成本、运行隔离、团队所有权和迁移决策记录。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-08-architecture-evolution-q3",
    "chapter": "aca18-08-architecture-evolution",
    "level": 3,
    "question": "“第8章 架构演化”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把插件化或进程化当作组件化的必然终点，不核对业务隔离、发布频率、团队规模和故障成本”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-08-architecture-evolution-q4",
    "chapter": "aca18-08-architecture-evolution",
    "level": 3,
    "question": "为什么“第8章 架构演化”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-08-architecture-evolution-q5",
    "chapter": "aca18-08-architecture-evolution",
    "level": 4,
    "question": "“第8章 架构演化”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-08-architecture-evolution-q6",
    "chapter": "aca18-08-architecture-evolution",
    "level": 4,
    "question": "“第8章 架构演化”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及阶段能力矩阵、依赖边界、构建部署成本、运行隔离、团队所有权和迁移决策记录。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "aca18-appendix-a-thinking-architecture-q1",
    "chapter": "aca18-appendix-a-thinking-architecture",
    "level": 1,
    "question": "“附录A 思维与架构”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖1个节点，从“附录A 思维与架构”到“附录A 思维与架构”；主线是把架构决策还原为问题、约束、证据、取舍、所有者和可逆迁移，而不是工具清单，证据为问题陈述、约束表、备选方案、决策记录、反例、度量与复盘。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-appendix-a-thinking-architecture-q2",
    "chapter": "aca18-appendix-a-thinking-architecture",
    "level": 2,
    "question": "怎样为“附录A 思维与架构”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存问题陈述、约束表、备选方案、决策记录、反例、度量与复盘。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-appendix-a-thinking-architecture-q3",
    "chapter": "aca18-appendix-a-thinking-architecture",
    "level": 3,
    "question": "“附录A 思维与架构”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“先选ARouter、Gradle脚本或发布平台，再倒推问题，使工具替代边界和团队责任设计”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-appendix-a-thinking-architecture-q4",
    "chapter": "aca18-appendix-a-thinking-architecture",
    "level": 3,
    "question": "为什么“附录A 思维与架构”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-appendix-a-thinking-architecture-q5",
    "chapter": "aca18-appendix-a-thinking-architecture",
    "level": 4,
    "question": "“附录A 思维与架构”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-appendix-a-thinking-architecture-q6",
    "chapter": "aca18-appendix-a-thinking-architecture",
    "level": 4,
    "question": "“附录A 思维与架构”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及问题陈述、约束表、备选方案、决策记录、反例、度量与复盘。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "aca18-official-final-review-q1",
    "chapter": "aca18-official-final-review",
    "level": 1,
    "question": "“《Android组件化架构》全书总复习”覆盖哪些权威节点与工程主线？",
    "answer": "覆盖9个节点，从“第1章 组件化基础”到“附录A 思维与架构”；主线是从源码依赖、构建任务、运行分发、制品流通和团队治理五条链闭环全部正式节点，证据为全书节点表、垂直组件样例、构建基线、故障注入、发布回滚和架构决策记录。",
    "tags": [
      "官方目录",
      "组件边界"
    ]
  },
  {
    "id": "aca18-official-final-review-q2",
    "chapter": "aca18-official-final-review",
    "level": 2,
    "question": "怎样为“《Android组件化架构》全书总复习”建立最小垂直切片？",
    "answer": "锁定源码、Gradle、插件、JDK、仓库和设备，贯通合同、构建、合并、运行与制品，并保存全书节点表、垂直组件样例、构建基线、故障注入、发布回滚和架构决策记录。",
    "tags": [
      "实验",
      "构建"
    ]
  },
  {
    "id": "aca18-official-final-review-q3",
    "chapter": "aca18-official-final-review",
    "level": 3,
    "question": "“《Android组件化架构》全书总复习”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只有集成成功截图，没有依赖违规、Manifest冲突、增量失效、生命周期错位和制品回滚证据”；只改变依赖、Manifest、资源、路由、缓存、生命周期或仓库之一即可反证。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "aca18-official-final-review-q4",
    "chapter": "aca18-official-final-review",
    "level": 3,
    "question": "为什么“《Android组件化架构》全书总复习”的一次集成成功不足以证明组件化？",
    "answer": "一次成功没有证明依赖拒绝、增量失效、冲突诊断、进程重建、资源释放、制品追溯与回滚；必须保存失败证据。",
    "tags": [
      "诊断",
      "故障"
    ]
  },
  {
    "id": "aca18-official-final-review-q5",
    "chapter": "aca18-official-final-review",
    "level": 4,
    "question": "“《Android组件化架构》全书总复习”迁移历史工具时如何控制变量？",
    "answer": "先保存2018年Gradle 4.1、Instant Run、Freeline和JCenter机制，再一次只替换一个工具，比较输入、产物、行为与回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "aca18-official-final-review-q6",
    "chapter": "aca18-official-final-review",
    "level": 4,
    "question": "“《Android组件化架构》全书总复习”达到独立交接需要什么？",
    "answer": "需要环境指纹、依赖图、任务与合并报告、运行时序、产物校验和、失败测试、回滚路径及全书节点表、垂直组件样例、构建基线、故障注入、发布回滚和架构决策记录。",
    "tags": [
      "验收",
      "交接"
    ]
  }
];
