import type { ReviewQuestion } from "../review/types";

export const gep120OfficialQuestions: ReviewQuestion[] = [
  {
    id: "gep1-official-learning-map-1",
    chapter: "gep1-official-learning-map",
    level: 1,
    question:
      "怎样为《游戏引擎原理与实践·卷1》权威学习地图建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“核定140个节点 → 搭建底层系统 → 建立对象资源 → 组织场景资产 → 验证LOD输出”复核目录完整、生命周期、对象身份、空间组织、画质预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["目录完整", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-official-learning-map-2",
    chapter: "gep1-official-learning-map",
    level: 1,
    question:
      "怎样逐项核对《游戏引擎原理与实践·卷1》权威学习地图的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“核定140个节点 → 搭建底层系统 → 建立对象资源 → 组织场景资产 → 验证LOD输出”复核目录完整、生命周期、对象身份、空间组织、画质预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["生命周期", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-official-learning-map-3",
    chapter: "gep1-official-learning-map",
    level: 2,
    question:
      "怎样计算《游戏引擎原理与实践·卷1》权威学习地图的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“核定140个节点 → 搭建底层系统 → 建立对象资源 → 组织场景资产 → 验证LOD输出”复核目录完整、生命周期、对象身份、空间组织、画质预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["对象身份", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-official-learning-map-4",
    chapter: "gep1-official-learning-map",
    level: 2,
    question:
      "怎样验证《游戏引擎原理与实践·卷1》权威学习地图没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“核定140个节点 → 搭建底层系统 → 建立对象资源 → 组织场景资产 → 验证LOD输出”复核目录完整、生命周期、对象身份、空间组织、画质预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["空间组织", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-official-learning-map-5",
    chapter: "gep1-official-learning-map",
    level: 3,
    question:
      "怎样向《游戏引擎原理与实践·卷1》权威学习地图注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“核定140个节点 → 搭建底层系统 → 建立对象资源 → 组织场景资产 → 验证LOD输出”复核目录完整、生命周期、对象身份、空间组织、画质预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["画质预算", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-official-learning-map-6",
    chapter: "gep1-official-learning-map",
    level: 4,
    question:
      "怎样证明《游戏引擎原理与实践·卷1》权威学习地图能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“核定140个节点 → 搭建底层系统 → 建立对象资源 → 组织场景资产 → 验证LOD输出”复核目录完整、生命周期、对象身份、空间组织、画质预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["目录完整", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-front-matter-1",
    chapter: "gep1-front-matter",
    level: 1,
    question:
      "怎样为书前资料：版权、提要、推荐序、前言与资源建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“核定版次 → 读取范围 → 检查先修 → 绑定配套资源 → 建立复现环境”复核版次一致、卷册边界、先修能力、资源完整、环境可复现，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["版次一致", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-front-matter-2",
    chapter: "gep1-front-matter",
    level: 1,
    question:
      "怎样逐项核对书前资料：版权、提要、推荐序、前言与资源的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“核定版次 → 读取范围 → 检查先修 → 绑定配套资源 → 建立复现环境”复核版次一致、卷册边界、先修能力、资源完整、环境可复现，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["卷册边界", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-front-matter-3",
    chapter: "gep1-front-matter",
    level: 2,
    question:
      "怎样计算书前资料：版权、提要、推荐序、前言与资源的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“核定版次 → 读取范围 → 检查先修 → 绑定配套资源 → 建立复现环境”复核版次一致、卷册边界、先修能力、资源完整、环境可复现，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["先修能力", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-front-matter-4",
    chapter: "gep1-front-matter",
    level: 2,
    question:
      "怎样验证书前资料：版权、提要、推荐序、前言与资源没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“核定版次 → 读取范围 → 检查先修 → 绑定配套资源 → 建立复现环境”复核版次一致、卷册边界、先修能力、资源完整、环境可复现，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["资源完整", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-front-matter-5",
    chapter: "gep1-front-matter",
    level: 3,
    question:
      "怎样向书前资料：版权、提要、推荐序、前言与资源注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“核定版次 → 读取范围 → 检查先修 → 绑定配套资源 → 建立复现环境”复核版次一致、卷册边界、先修能力、资源完整、环境可复现，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["环境可复现", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-front-matter-6",
    chapter: "gep1-front-matter",
    level: 4,
    question:
      "怎样证明书前资料：版权、提要、推荐序、前言与资源能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“核定版次 → 读取范围 → 检查先修 → 绑定配套资源 → 建立复现环境”复核版次一致、卷册边界、先修能力、资源完整、环境可复现，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["版次一致", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-01-engine-conflict-1",
    chapter: "gep1-chapter-01-engine-conflict",
    level: 1,
    question: "怎样为第1章 引擎的纷争建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“冻结项目约束 → 识别通用能力 → 比较引擎方案 → 划分游戏边界 → 验证复用收益”复核引擎定义、历史演化、自研成本、玩法边界、团队控制，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["引擎定义", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-01-engine-conflict-2",
    chapter: "gep1-chapter-01-engine-conflict",
    level: 1,
    question: "怎样逐项核对第1章 引擎的纷争的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“冻结项目约束 → 识别通用能力 → 比较引擎方案 → 划分游戏边界 → 验证复用收益”复核引擎定义、历史演化、自研成本、玩法边界、团队控制，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["历史演化", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-01-engine-conflict-3",
    chapter: "gep1-chapter-01-engine-conflict",
    level: 2,
    question: "怎样计算第1章 引擎的纷争的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“冻结项目约束 → 识别通用能力 → 比较引擎方案 → 划分游戏边界 → 验证复用收益”复核引擎定义、历史演化、自研成本、玩法边界、团队控制，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["自研成本", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-01-engine-conflict-4",
    chapter: "gep1-chapter-01-engine-conflict",
    level: 2,
    question: "怎样验证第1章 引擎的纷争没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“冻结项目约束 → 识别通用能力 → 比较引擎方案 → 划分游戏边界 → 验证复用收益”复核引擎定义、历史演化、自研成本、玩法边界、团队控制，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["玩法边界", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-01-engine-conflict-5",
    chapter: "gep1-chapter-01-engine-conflict",
    level: 3,
    question: "怎样向第1章 引擎的纷争注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“冻结项目约束 → 识别通用能力 → 比较引擎方案 → 划分游戏边界 → 验证复用收益”复核引擎定义、历史演化、自研成本、玩法边界、团队控制，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["团队控制", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-01-engine-conflict-6",
    chapter: "gep1-chapter-01-engine-conflict",
    level: 4,
    question: "怎样证明第1章 引擎的纷争能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“冻结项目约束 → 识别通用能力 → 比较引擎方案 → 划分游戏边界 → 验证复用收益”复核引擎定义、历史演化、自研成本、玩法边界、团队控制，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["引擎定义", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-02-setting-sail-1",
    chapter: "gep1-chapter-02-setting-sail",
    level: 1,
    question: "怎样为第2章 起航建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“建立程序循环 → 统一空间约定 → 追踪3D流水线 → 连接编辑器资产 → 验证目标机输出”复核实时顺序、坐标合同、API差异、汇编证据、工作流反馈，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["实时顺序", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-02-setting-sail-2",
    chapter: "gep1-chapter-02-setting-sail",
    level: 1,
    question: "怎样逐项核对第2章 起航的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“建立程序循环 → 统一空间约定 → 追踪3D流水线 → 连接编辑器资产 → 验证目标机输出”复核实时顺序、坐标合同、API差异、汇编证据、工作流反馈，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["坐标合同", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-02-setting-sail-3",
    chapter: "gep1-chapter-02-setting-sail",
    level: 2,
    question: "怎样计算第2章 起航的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“建立程序循环 → 统一空间约定 → 追踪3D流水线 → 连接编辑器资产 → 验证目标机输出”复核实时顺序、坐标合同、API差异、汇编证据、工作流反馈，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["API差异", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-02-setting-sail-4",
    chapter: "gep1-chapter-02-setting-sail",
    level: 2,
    question: "怎样验证第2章 起航没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“建立程序循环 → 统一空间约定 → 追踪3D流水线 → 连接编辑器资产 → 验证目标机输出”复核实时顺序、坐标合同、API差异、汇编证据、工作流反馈，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["汇编证据", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-02-setting-sail-5",
    chapter: "gep1-chapter-02-setting-sail",
    level: 3,
    question: "怎样向第2章 起航注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“建立程序循环 → 统一空间约定 → 追踪3D流水线 → 连接编辑器资产 → 验证目标机输出”复核实时顺序、坐标合同、API差异、汇编证据、工作流反馈，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["工作流反馈", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-02-setting-sail-6",
    chapter: "gep1-chapter-02-setting-sail",
    level: 4,
    question: "怎样证明第2章 起航能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“建立程序循环 → 统一空间约定 → 追踪3D流水线 → 连接编辑器资产 → 验证目标机输出”复核实时顺序、坐标合同、API差异、汇编证据、工作流反馈，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["实时顺序", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-03-basic-system-1",
    chapter: "gep1-chapter-03-basic-system",
    level: 1,
    question: "怎样为第3章 基本系统建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“固定构建环境 → 初始化底层工程 → 分配并标记内存 → 检查类型关系 → 逆序回收”复核构建一致、内存对齐、泄漏归因、平台抽象、关闭完整，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["构建一致", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-03-basic-system-2",
    chapter: "gep1-chapter-03-basic-system",
    level: 1,
    question: "怎样逐项核对第3章 基本系统的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“固定构建环境 → 初始化底层工程 → 分配并标记内存 → 检查类型关系 → 逆序回收”复核构建一致、内存对齐、泄漏归因、平台抽象、关闭完整，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["内存对齐", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-03-basic-system-3",
    chapter: "gep1-chapter-03-basic-system",
    level: 2,
    question: "怎样计算第3章 基本系统的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“固定构建环境 → 初始化底层工程 → 分配并标记内存 → 检查类型关系 → 逆序回收”复核构建一致、内存对齐、泄漏归因、平台抽象、关闭完整，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["泄漏归因", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-03-basic-system-4",
    chapter: "gep1-chapter-03-basic-system",
    level: 2,
    question: "怎样验证第3章 基本系统没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“固定构建环境 → 初始化底层工程 → 分配并标记内存 → 检查类型关系 → 逆序回收”复核构建一致、内存对齐、泄漏归因、平台抽象、关闭完整，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["平台抽象", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-03-basic-system-5",
    chapter: "gep1-chapter-03-basic-system",
    level: 3,
    question: "怎样向第3章 基本系统注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“固定构建环境 → 初始化底层工程 → 分配并标记内存 → 检查类型关系 → 逆序回收”复核构建一致、内存对齐、泄漏归因、平台抽象、关闭完整，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["关闭完整", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-03-basic-system-6",
    chapter: "gep1-chapter-03-basic-system",
    level: 4,
    question: "怎样证明第3章 基本系统能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“固定构建环境 → 初始化底层工程 → 分配并标记内存 → 检查类型关系 → 逆序回收”复核构建一致、内存对齐、泄漏归因、平台抽象、关闭完整，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["构建一致", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-04-data-structures-1",
    chapter: "gep1-chapter-04-data-structures",
    level: 1,
    question: "怎样为第4章 基本数据结构建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“声明访问模式 → 选择容器布局 → 绑定分配策略 → 定义迭代失效 → 压测真实负载”复核缓存局部、容量增长、句柄稳定、委托生命周期、复杂度实测，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["缓存局部", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-04-data-structures-2",
    chapter: "gep1-chapter-04-data-structures",
    level: 1,
    question: "怎样逐项核对第4章 基本数据结构的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“声明访问模式 → 选择容器布局 → 绑定分配策略 → 定义迭代失效 → 压测真实负载”复核缓存局部、容量增长、句柄稳定、委托生命周期、复杂度实测，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["容量增长", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-04-data-structures-3",
    chapter: "gep1-chapter-04-data-structures",
    level: 2,
    question: "怎样计算第4章 基本数据结构的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“声明访问模式 → 选择容器布局 → 绑定分配策略 → 定义迭代失效 → 压测真实负载”复核缓存局部、容量增长、句柄稳定、委托生命周期、复杂度实测，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["句柄稳定", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-04-data-structures-4",
    chapter: "gep1-chapter-04-data-structures",
    level: 2,
    question: "怎样验证第4章 基本数据结构没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“声明访问模式 → 选择容器布局 → 绑定分配策略 → 定义迭代失效 → 压测真实负载”复核缓存局部、容量增长、句柄稳定、委托生命周期、复杂度实测，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["委托生命周期", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-04-data-structures-5",
    chapter: "gep1-chapter-04-data-structures",
    level: 3,
    question:
      "怎样向第4章 基本数据结构注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“声明访问模式 → 选择容器布局 → 绑定分配策略 → 定义迭代失效 → 压测真实负载”复核缓存局部、容量增长、句柄稳定、委托生命周期、复杂度实测，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["复杂度实测", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-04-data-structures-6",
    chapter: "gep1-chapter-04-data-structures",
    level: 4,
    question:
      "怎样证明第4章 基本数据结构能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“声明访问模式 → 选择容器布局 → 绑定分配策略 → 定义迭代失效 → 压测真实负载”复核缓存局部、容量增长、句柄稳定、委托生命周期、复杂度实测，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["缓存局部", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-05-math-library-1",
    chapter: "gep1-chapter-05-math-library",
    level: 1,
    question: "怎样为第5章 数学库建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“冻结数值约定 → 实现基础类型 → 组合空间变换 → 构建几何单元 → 运行性质测试”复核浮点误差、空间语义、SIMD布局、几何鲁棒、性质验证，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["浮点误差", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-05-math-library-2",
    chapter: "gep1-chapter-05-math-library",
    level: 1,
    question: "怎样逐项核对第5章 数学库的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“冻结数值约定 → 实现基础类型 → 组合空间变换 → 构建几何单元 → 运行性质测试”复核浮点误差、空间语义、SIMD布局、几何鲁棒、性质验证，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["空间语义", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-05-math-library-3",
    chapter: "gep1-chapter-05-math-library",
    level: 2,
    question: "怎样计算第5章 数学库的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“冻结数值约定 → 实现基础类型 → 组合空间变换 → 构建几何单元 → 运行性质测试”复核浮点误差、空间语义、SIMD布局、几何鲁棒、性质验证，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["SIMD布局", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-05-math-library-4",
    chapter: "gep1-chapter-05-math-library",
    level: 2,
    question: "怎样验证第5章 数学库没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“冻结数值约定 → 实现基础类型 → 组合空间变换 → 构建几何单元 → 运行性质测试”复核浮点误差、空间语义、SIMD布局、几何鲁棒、性质验证，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["几何鲁棒", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-05-math-library-5",
    chapter: "gep1-chapter-05-math-library",
    level: 3,
    question: "怎样向第5章 数学库注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“冻结数值约定 → 实现基础类型 → 组合空间变换 → 构建几何单元 → 运行性质测试”复核浮点误差、空间语义、SIMD布局、几何鲁棒、性质验证，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["性质验证", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-05-math-library-6",
    chapter: "gep1-chapter-05-math-library",
    level: 4,
    question: "怎样证明第5章 数学库能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“冻结数值约定 → 实现基础类型 → 组合空间变换 → 构建几何单元 → 运行性质测试”复核浮点误差、空间语义、SIMD布局、几何鲁棒、性质验证，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["浮点误差", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-06-initialization-destruction-1",
    chapter: "gep1-chapter-06-initialization-destruction",
    level: 1,
    question: "怎样为第6章 初始化与销毁建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“声明依赖图 → 分阶段初始化 → 发布可用状态 → 注入启动失败 → 逆序销毁”复核静态顺序、部分失败、全局服务、普通对象、关闭证明，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["静态顺序", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-06-initialization-destruction-2",
    chapter: "gep1-chapter-06-initialization-destruction",
    level: 1,
    question: "怎样逐项核对第6章 初始化与销毁的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“声明依赖图 → 分阶段初始化 → 发布可用状态 → 注入启动失败 → 逆序销毁”复核静态顺序、部分失败、全局服务、普通对象、关闭证明，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["部分失败", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-06-initialization-destruction-3",
    chapter: "gep1-chapter-06-initialization-destruction",
    level: 2,
    question: "怎样计算第6章 初始化与销毁的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“声明依赖图 → 分阶段初始化 → 发布可用状态 → 注入启动失败 → 逆序销毁”复核静态顺序、部分失败、全局服务、普通对象、关闭证明，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["全局服务", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-06-initialization-destruction-4",
    chapter: "gep1-chapter-06-initialization-destruction",
    level: 2,
    question: "怎样验证第6章 初始化与销毁没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“声明依赖图 → 分阶段初始化 → 发布可用状态 → 注入启动失败 → 逆序销毁”复核静态顺序、部分失败、全局服务、普通对象、关闭证明，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["普通对象", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-06-initialization-destruction-5",
    chapter: "gep1-chapter-06-initialization-destruction",
    level: 3,
    question:
      "怎样向第6章 初始化与销毁注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“声明依赖图 → 分阶段初始化 → 发布可用状态 → 注入启动失败 → 逆序销毁”复核静态顺序、部分失败、全局服务、普通对象、关闭证明，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["关闭证明", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-06-initialization-destruction-6",
    chapter: "gep1-chapter-06-initialization-destruction",
    level: 4,
    question:
      "怎样证明第6章 初始化与销毁能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“声明依赖图 → 分阶段初始化 → 发布可用状态 → 注入启动失败 → 逆序销毁”复核静态顺序、部分失败、全局服务、普通对象、关闭证明，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["静态顺序", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-07-application-framework-1",
    chapter: "gep1-chapter-07-application-framework",
    level: 1,
    question: "怎样为第7章 应用程序框架建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“创建应用实例 → 接入平台事件 → 映射逻辑动作 → 驱动帧循环 → 安全退出”复核平台隔离、事件顺序、动作映射、帧节奏、退出状态，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["平台隔离", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-07-application-framework-2",
    chapter: "gep1-chapter-07-application-framework",
    level: 1,
    question: "怎样逐项核对第7章 应用程序框架的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“创建应用实例 → 接入平台事件 → 映射逻辑动作 → 驱动帧循环 → 安全退出”复核平台隔离、事件顺序、动作映射、帧节奏、退出状态，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["事件顺序", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-07-application-framework-3",
    chapter: "gep1-chapter-07-application-framework",
    level: 2,
    question: "怎样计算第7章 应用程序框架的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“创建应用实例 → 接入平台事件 → 映射逻辑动作 → 驱动帧循环 → 安全退出”复核平台隔离、事件顺序、动作映射、帧节奏、退出状态，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["动作映射", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-07-application-framework-4",
    chapter: "gep1-chapter-07-application-framework",
    level: 2,
    question: "怎样验证第7章 应用程序框架没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“创建应用实例 → 接入平台事件 → 映射逻辑动作 → 驱动帧循环 → 安全退出”复核平台隔离、事件顺序、动作映射、帧节奏、退出状态，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["帧节奏", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-07-application-framework-5",
    chapter: "gep1-chapter-07-application-framework",
    level: 3,
    question:
      "怎样向第7章 应用程序框架注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“创建应用实例 → 接入平台事件 → 映射逻辑动作 → 驱动帧循环 → 安全退出”复核平台隔离、事件顺序、动作映射、帧节奏、退出状态，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["退出状态", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-07-application-framework-6",
    chapter: "gep1-chapter-07-application-framework",
    level: 4,
    question:
      "怎样证明第7章 应用程序框架能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“创建应用实例 → 接入平台事件 → 映射逻辑动作 → 驱动帧循环 → 安全退出”复核平台隔离、事件顺序、动作映射、帧节奏、退出状态，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["平台隔离", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-08-object-system-1",
    chapter: "gep1-chapter-08-object-system",
    level: 1,
    question: "怎样为第8章 对象系统建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“注册类型元数据 → 创建稳定对象 → 编辑与序列化 → 克隆或复制 → 回收引用图”复核引用所有权、反射版本、对象图存储、UI事务、复制权限，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["引用所有权", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-08-object-system-2",
    chapter: "gep1-chapter-08-object-system",
    level: 1,
    question: "怎样逐项核对第8章 对象系统的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“注册类型元数据 → 创建稳定对象 → 编辑与序列化 → 克隆或复制 → 回收引用图”复核引用所有权、反射版本、对象图存储、UI事务、复制权限，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["反射版本", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-08-object-system-3",
    chapter: "gep1-chapter-08-object-system",
    level: 2,
    question: "怎样计算第8章 对象系统的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“注册类型元数据 → 创建稳定对象 → 编辑与序列化 → 克隆或复制 → 回收引用图”复核引用所有权、反射版本、对象图存储、UI事务、复制权限，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["对象图存储", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-08-object-system-4",
    chapter: "gep1-chapter-08-object-system",
    level: 2,
    question: "怎样验证第8章 对象系统没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“注册类型元数据 → 创建稳定对象 → 编辑与序列化 → 克隆或复制 → 回收引用图”复核引用所有权、反射版本、对象图存储、UI事务、复制权限，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["UI事务", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-08-object-system-5",
    chapter: "gep1-chapter-08-object-system",
    level: 3,
    question: "怎样向第8章 对象系统注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“注册类型元数据 → 创建稳定对象 → 编辑与序列化 → 克隆或复制 → 回收引用图”复核引用所有权、反射版本、对象图存储、UI事务、复制权限，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["复制权限", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-08-object-system-6",
    chapter: "gep1-chapter-08-object-system",
    level: 4,
    question: "怎样证明第8章 对象系统能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“注册类型元数据 → 创建稳定对象 → 编辑与序列化 → 克隆或复制 → 回收引用图”复核引用所有权、反射版本、对象图存储、UI事务、复制权限，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["引用所有权", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-09-resource-management-1",
    chapter: "gep1-chapter-09-resource-management",
    level: 1,
    question: "怎样为第9章 资源管理建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“解析资源身份 → 展开依赖 → 异步读取加工 → 通过代理发布 → 按预算回收”复核类型加载、代理稳定、依赖闭包、字符串身份、缓存预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["类型加载", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-09-resource-management-2",
    chapter: "gep1-chapter-09-resource-management",
    level: 1,
    question: "怎样逐项核对第9章 资源管理的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“解析资源身份 → 展开依赖 → 异步读取加工 → 通过代理发布 → 按预算回收”复核类型加载、代理稳定、依赖闭包、字符串身份、缓存预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["代理稳定", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-09-resource-management-3",
    chapter: "gep1-chapter-09-resource-management",
    level: 2,
    question: "怎样计算第9章 资源管理的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“解析资源身份 → 展开依赖 → 异步读取加工 → 通过代理发布 → 按预算回收”复核类型加载、代理稳定、依赖闭包、字符串身份、缓存预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["依赖闭包", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-09-resource-management-4",
    chapter: "gep1-chapter-09-resource-management",
    level: 2,
    question: "怎样验证第9章 资源管理没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“解析资源身份 → 展开依赖 → 异步读取加工 → 通过代理发布 → 按预算回收”复核类型加载、代理稳定、依赖闭包、字符串身份、缓存预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["字符串身份", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-09-resource-management-5",
    chapter: "gep1-chapter-09-resource-management",
    level: 3,
    question: "怎样向第9章 资源管理注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“解析资源身份 → 展开依赖 → 异步读取加工 → 通过代理发布 → 按预算回收”复核类型加载、代理稳定、依赖闭包、字符串身份、缓存预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["缓存预算", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-09-resource-management-6",
    chapter: "gep1-chapter-09-resource-management",
    level: 4,
    question: "怎样证明第9章 资源管理能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“解析资源身份 → 展开依赖 → 异步读取加工 → 通过代理发布 → 按预算回收”复核类型加载、代理稳定、依赖闭包、字符串身份、缓存预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["类型加载", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-10-design-philosophy-1",
    chapter: "gep1-chapter-10-design-philosophy",
    level: 1,
    question: "怎样为第10章 引擎的设计哲学建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“抽象世界对象 → 声明关系语义 → 映射引擎层 → 构建可达图 → 按预算回收”复核抽象边界、关系类型、层级依赖、根集合、回收暂停，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["抽象边界", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-10-design-philosophy-2",
    chapter: "gep1-chapter-10-design-philosophy",
    level: 1,
    question: "怎样逐项核对第10章 引擎的设计哲学的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“抽象世界对象 → 声明关系语义 → 映射引擎层 → 构建可达图 → 按预算回收”复核抽象边界、关系类型、层级依赖、根集合、回收暂停，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["关系类型", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-10-design-philosophy-3",
    chapter: "gep1-chapter-10-design-philosophy",
    level: 2,
    question: "怎样计算第10章 引擎的设计哲学的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“抽象世界对象 → 声明关系语义 → 映射引擎层 → 构建可达图 → 按预算回收”复核抽象边界、关系类型、层级依赖、根集合、回收暂停，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["层级依赖", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-10-design-philosophy-4",
    chapter: "gep1-chapter-10-design-philosophy",
    level: 2,
    question: "怎样验证第10章 引擎的设计哲学没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“抽象世界对象 → 声明关系语义 → 映射引擎层 → 构建可达图 → 按预算回收”复核抽象边界、关系类型、层级依赖、根集合、回收暂停，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["根集合", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-10-design-philosophy-5",
    chapter: "gep1-chapter-10-design-philosophy",
    level: 3,
    question:
      "怎样向第10章 引擎的设计哲学注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“抽象世界对象 → 声明关系语义 → 映射引擎层 → 构建可达图 → 按预算回收”复核抽象边界、关系类型、层级依赖、根集合、回收暂停，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["回收暂停", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-10-design-philosophy-6",
    chapter: "gep1-chapter-10-design-philosophy",
    level: 4,
    question:
      "怎样证明第10章 引擎的设计哲学能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“抽象世界对象 → 声明关系语义 → 映射引擎层 → 构建可达图 → 按预算回收”复核抽象边界、关系类型、层级依赖、根集合、回收暂停，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["抽象边界", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-11-scene-management-1",
    chapter: "gep1-chapter-11-scene-management",
    level: 1,
    question: "怎样为第11章 场景管理建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“更新层级变换 → 维护空间索引 → 构建相机视锥 → 筛选对象与光源 → 提交可见集合”复核层级正确、包围体保守、索引更新、剔除延迟、光源影响，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["层级正确", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-11-scene-management-2",
    chapter: "gep1-chapter-11-scene-management",
    level: 1,
    question: "怎样逐项核对第11章 场景管理的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“更新层级变换 → 维护空间索引 → 构建相机视锥 → 筛选对象与光源 → 提交可见集合”复核层级正确、包围体保守、索引更新、剔除延迟、光源影响，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["包围体保守", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-11-scene-management-3",
    chapter: "gep1-chapter-11-scene-management",
    level: 2,
    question: "怎样计算第11章 场景管理的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“更新层级变换 → 维护空间索引 → 构建相机视锥 → 筛选对象与光源 → 提交可见集合”复核层级正确、包围体保守、索引更新、剔除延迟、光源影响，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["索引更新", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-11-scene-management-4",
    chapter: "gep1-chapter-11-scene-management",
    level: 2,
    question: "怎样验证第11章 场景管理没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“更新层级变换 → 维护空间索引 → 构建相机视锥 → 筛选对象与光源 → 提交可见集合”复核层级正确、包围体保守、索引更新、剔除延迟、光源影响，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["剔除延迟", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-11-scene-management-5",
    chapter: "gep1-chapter-11-scene-management",
    level: 3,
    question: "怎样向第11章 场景管理注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“更新层级变换 → 维护空间索引 → 构建相机视锥 → 筛选对象与光源 → 提交可见集合”复核层级正确、包围体保守、索引更新、剔除延迟、光源影响，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["光源影响", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-11-scene-management-6",
    chapter: "gep1-chapter-11-scene-management",
    level: 4,
    question: "怎样证明第11章 场景管理能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“更新层级变换 → 维护空间索引 → 构建相机视锥 → 筛选对象与光源 → 提交可见集合”复核层级正确、包围体保守、索引更新、剔除延迟、光源影响，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["层级正确", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-12-models-textures-1",
    chapter: "gep1-chapter-12-models-textures",
    level: 1,
    question: "怎样为第12章 模型与贴图建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“校验源模型 → 生成几何属性 → 创建GPU缓冲 → 绑定纹理材质 → 验证运行时绘制”复核切线正确、顶点布局、导入压缩、颜色空间、资产追踪，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["切线正确", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-12-models-textures-2",
    chapter: "gep1-chapter-12-models-textures",
    level: 1,
    question: "怎样逐项核对第12章 模型与贴图的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“校验源模型 → 生成几何属性 → 创建GPU缓冲 → 绑定纹理材质 → 验证运行时绘制”复核切线正确、顶点布局、导入压缩、颜色空间、资产追踪，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["顶点布局", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-12-models-textures-3",
    chapter: "gep1-chapter-12-models-textures",
    level: 2,
    question: "怎样计算第12章 模型与贴图的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“校验源模型 → 生成几何属性 → 创建GPU缓冲 → 绑定纹理材质 → 验证运行时绘制”复核切线正确、顶点布局、导入压缩、颜色空间、资产追踪，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["导入压缩", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-12-models-textures-4",
    chapter: "gep1-chapter-12-models-textures",
    level: 2,
    question: "怎样验证第12章 模型与贴图没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“校验源模型 → 生成几何属性 → 创建GPU缓冲 → 绑定纹理材质 → 验证运行时绘制”复核切线正确、顶点布局、导入压缩、颜色空间、资产追踪，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["颜色空间", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-12-models-textures-5",
    chapter: "gep1-chapter-12-models-textures",
    level: 3,
    question: "怎样向第12章 模型与贴图注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“校验源模型 → 生成几何属性 → 创建GPU缓冲 → 绑定纹理材质 → 验证运行时绘制”复核切线正确、顶点布局、导入压缩、颜色空间、资产追踪，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["资产追踪", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-12-models-textures-6",
    chapter: "gep1-chapter-12-models-textures",
    level: 4,
    question: "怎样证明第12章 模型与贴图能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“校验源模型 → 生成几何属性 → 创建GPU缓冲 → 绑定纹理材质 → 验证运行时绘制”复核切线正确、顶点布局、导入压缩、颜色空间、资产追踪，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["切线正确", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-chapter-13-lod-1",
    chapter: "gep1-chapter-13-lod",
    level: 1,
    question: "怎样为第13章 LOD建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“估计屏幕误差 → 选择LOD表示 → 加入滞回约束 → 处理地形边界 → 测量画质与成本”复核屏幕误差、切换抖动、拓扑连续、地形裂缝、流送预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["屏幕误差", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-13-lod-2",
    chapter: "gep1-chapter-13-lod",
    level: 1,
    question: "怎样逐项核对第13章 LOD的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“估计屏幕误差 → 选择LOD表示 → 加入滞回约束 → 处理地形边界 → 测量画质与成本”复核屏幕误差、切换抖动、拓扑连续、地形裂缝、流送预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["切换抖动", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-chapter-13-lod-3",
    chapter: "gep1-chapter-13-lod",
    level: 2,
    question: "怎样计算第13章 LOD的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“估计屏幕误差 → 选择LOD表示 → 加入滞回约束 → 处理地形边界 → 测量画质与成本”复核屏幕误差、切换抖动、拓扑连续、地形裂缝、流送预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["拓扑连续", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-13-lod-4",
    chapter: "gep1-chapter-13-lod",
    level: 2,
    question: "怎样验证第13章 LOD没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“估计屏幕误差 → 选择LOD表示 → 加入滞回约束 → 处理地形边界 → 测量画质与成本”复核屏幕误差、切换抖动、拓扑连续、地形裂缝、流送预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["地形裂缝", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-chapter-13-lod-5",
    chapter: "gep1-chapter-13-lod",
    level: 3,
    question: "怎样向第13章 LOD注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“估计屏幕误差 → 选择LOD表示 → 加入滞回约束 → 处理地形边界 → 测量画质与成本”复核屏幕误差、切换抖动、拓扑连续、地形裂缝、流送预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["流送预算", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-chapter-13-lod-6",
    chapter: "gep1-chapter-13-lod",
    level: 4,
    question: "怎样证明第13章 LOD能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“估计屏幕误差 → 选择LOD表示 → 加入滞回约束 → 处理地形边界 → 测量画质与成本”复核屏幕误差、切换抖动、拓扑连续、地形裂缝、流送预算，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["屏幕误差", "人邮2020卷1", "level-4"],
  },
  {
    id: "gep1-official-final-review-1",
    chapter: "gep1-official-final-review",
    level: 1,
    question:
      "怎样为《游戏引擎原理与实践·卷1》全书综合复核建立对象、资源和生命周期边界？",
    answer:
      "先画状态图和拥有关系，再声明正常与失败回收。沿“冻结项目与资源 → 启动基础系统 → 创建对象资源 → 更新场景可见性 → 选择LOD并呈现”复核整卷迁移、启动关闭、对象资源、场景查询、LOD证据，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["整卷迁移", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-official-final-review-2",
    chapter: "gep1-official-final-review",
    level: 1,
    question:
      "怎样逐项核对《游戏引擎原理与实践·卷1》全书综合复核的权威目录节点？",
    answer:
      "按目录顺序说明每个节点的输入、机制、输出与适用边界。沿“冻结项目与资源 → 启动基础系统 → 创建对象资源 → 更新场景可见性 → 选择LOD并呈现”复核整卷迁移、启动关闭、对象资源、场景查询、LOD证据，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["启动关闭", "人邮2020卷1", "level-1"],
  },
  {
    id: "gep1-official-final-review-3",
    chapter: "gep1-official-final-review",
    level: 2,
    question:
      "怎样计算《游戏引擎原理与实践·卷1》全书综合复核的帧、内存与缓存成本？",
    answer:
      "固定统计口径，分开更新、渲染、等待、对齐、峰值和冷热命中。沿“冻结项目与资源 → 启动基础系统 → 创建对象资源 → 更新场景可见性 → 选择LOD并呈现”复核整卷迁移、启动关闭、对象资源、场景查询、LOD证据，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["对象资源", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-official-final-review-4",
    chapter: "gep1-official-final-review",
    level: 2,
    question:
      "怎样验证《游戏引擎原理与实践·卷1》全书综合复核没有留下失效引用或半更新状态？",
    answer:
      "用对象代际、资源状态、阶段快照和关闭轨迹交叉核对。沿“冻结项目与资源 → 启动基础系统 → 创建对象资源 → 更新场景可见性 → 选择LOD并呈现”复核整卷迁移、启动关闭、对象资源、场景查询、LOD证据，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["场景查询", "人邮2020卷1", "level-2"],
  },
  {
    id: "gep1-official-final-review-5",
    chapter: "gep1-official-final-review",
    level: 3,
    question:
      "怎样向《游戏引擎原理与实践·卷1》全书综合复核注入资源迟到或规模压力并定位首个失效点？",
    answer:
      "一次只改对象、缓存或LOD条件，先预测再保存异常帧前后轨迹。沿“冻结项目与资源 → 启动基础系统 → 创建对象资源 → 更新场景可见性 → 选择LOD并呈现”复核整卷迁移、启动关闭、对象资源、场景查询、LOD证据，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["LOD证据", "人邮2020卷1", "level-3"],
  },
  {
    id: "gep1-official-final-review-6",
    chapter: "gep1-official-final-review",
    level: 4,
    question:
      "怎样证明《游戏引擎原理与实践·卷1》全书综合复核能迁移到另一套引擎而非只记住VSSystem？",
    answer:
      "更换API与类型名但保持身份、状态、预算和证据合同，由他人独立复现。沿“冻结项目与资源 → 启动基础系统 → 创建对象资源 → 更新场景可见性 → 选择LOD并呈现”复核整卷迁移、启动关闭、对象资源、场景查询、LOD证据，保存对象、资源、内存、线程、帧号与失败状态。",
    tags: ["整卷迁移", "人邮2020卷1", "level-4"],
  },
];
