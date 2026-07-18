import type { ReviewQuestion } from "./types";

/** 《Go in Action》官方九章路线复习题。 */
export const giaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gia-learning-map-1",
    chapter: "gia-learning-map",
    level: 1,
    question: `原书九章的准确顺序是什么？`,
    answer: `1 Go语言介绍；2 Go快速入门；3 包与工具；4 数组、切片和映射；5 Go语言的类型系统；6 并发；7 并发模式；8 标准库；9 测试和性能。导览与总复习是本站教学层，不冒充原书章节。`,
    tags: ["官方目录", "九章", "学习路径"],
  },
  {
    id: "gia-learning-map-2",
    chapter: "gia-learning-map",
    level: 2,
    question: `为什么第2章完整搜索程序要放在第3章包工具之前？`,
    answer: `第2章先让读者看到 main、包、类型、接口、goroutine、channel 和错误怎样在一个程序中协作；第3章再解释这些源码单元如何命名、初始化、构建、检查和管理依赖。先建立整体运行模型，再补工程工具细节。`,
    tags: ["第2章", "第3章", "递进关系"],
  },
  {
    id: "gia-learning-map-3",
    chapter: "gia-learning-map",
    level: 3,
    question: `第4至7章怎样从值语义递进到并发生命周期？`,
    answer: `第4章先判断数组复制、切片别名和 map 描述符；第5章再把复制、方法集和接口组成类型行为；第6章讨论这些值跨 goroutine 共享或通过 channel 转移时如何同步；第7章把同步机制封装成 Runner、Pool 和 Work 生命周期模式。`,
    tags: ["值语义", "类型系统", "并发模式"],
  },
  {
    id: "gia-learning-map-4",
    chapter: "gia-learning-map",
    level: 4,
    question: `完成全书的最小验收证据链是什么？`,
    answer: `从干净检出开始，固定 Go 版本与依赖，运行格式、vet、测试和构建；对并发路径运行 race detector；对 I/O 注入 EOF、短读写和关闭失败；对 benchmark 保存多样本与分配数据。最后能把每个失败定位回九章中的具体契约。`,
    tags: ["验收", "证据链", "综合"],
  },
];
