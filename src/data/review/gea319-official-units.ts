import type { ReviewQuestion } from "../review/types";

export const gea319OfficialQuestions: ReviewQuestion[] = [
  {
    id: "gea3-official-learning-map-1",
    chapter: "gea3-official-learning-map",
    level: 1,
    question:
      "怎样为《游戏引擎架构》第3版权威学习地图声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“核定132个节点 → 建立五部地图 → 追踪一帧数据 → 运行瓶颈实验 → 跨系统复核”检查目录完整、层级依赖、实时预算、资产身份、调试证据，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["目录完整", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-official-learning-map-2",
    chapter: "gea3-official-learning-map",
    level: 1,
    question: "怎样从《游戏引擎架构》第3版权威学习地图找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“核定132个节点 → 建立五部地图 → 追踪一帧数据 → 运行瓶颈实验 → 跨系统复核”检查目录完整、层级依赖、实时预算、资产身份、调试证据，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["层级依赖", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-official-learning-map-3",
    chapter: "gea3-official-learning-map",
    level: 2,
    question:
      "怎样计算《游戏引擎架构》第3版权威学习地图的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“核定132个节点 → 建立五部地图 → 追踪一帧数据 → 运行瓶颈实验 → 跨系统复核”检查目录完整、层级依赖、实时预算、资产身份、调试证据，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["实时预算", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-official-learning-map-4",
    chapter: "gea3-official-learning-map",
    level: 2,
    question:
      "怎样验证《游戏引擎架构》第3版权威学习地图中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“核定132个节点 → 建立五部地图 → 追踪一帧数据 → 运行瓶颈实验 → 跨系统复核”检查目录完整、层级依赖、实时预算、资产身份、调试证据，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["资产身份", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-official-learning-map-5",
    chapter: "gea3-official-learning-map",
    level: 3,
    question:
      "怎样向《游戏引擎架构》第3版权威学习地图注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“核定132个节点 → 建立五部地图 → 追踪一帧数据 → 运行瓶颈实验 → 跨系统复核”检查目录完整、层级依赖、实时预算、资产身份、调试证据，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["调试证据", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-official-learning-map-6",
    chapter: "gea3-official-learning-map",
    level: 4,
    question:
      "怎样证明《游戏引擎架构》第3版权威学习地图可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“核定132个节点 → 建立五部地图 → 追踪一帧数据 → 运行瓶颈实验 → 跨系统复核”检查目录完整、层级依赖、实时预算、资产身份、调试证据，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["目录完整", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-preface-1",
    chapter: "gea3-preface",
    level: 1,
    question: "怎样为前言（Preface）声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“确认版次 → 识别五部 → 建立系统边界 → 约定实验记录 → 规划迁移项目”检查版次合同、工业语境、跨层依赖、证据记录、迁移路线，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["版次合同", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-preface-2",
    chapter: "gea3-preface",
    level: 1,
    question: "怎样从前言（Preface）找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“确认版次 → 识别五部 → 建立系统边界 → 约定实验记录 → 规划迁移项目”检查版次合同、工业语境、跨层依赖、证据记录、迁移路线，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["工业语境", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-preface-3",
    chapter: "gea3-preface",
    level: 2,
    question: "怎样计算前言（Preface）的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“确认版次 → 识别五部 → 建立系统边界 → 约定实验记录 → 规划迁移项目”检查版次合同、工业语境、跨层依赖、证据记录、迁移路线，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["跨层依赖", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-preface-4",
    chapter: "gea3-preface",
    level: 2,
    question: "怎样验证前言（Preface）中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“确认版次 → 识别五部 → 建立系统边界 → 约定实验记录 → 规划迁移项目”检查版次合同、工业语境、跨层依赖、证据记录、迁移路线，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["证据记录", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-preface-5",
    chapter: "gea3-preface",
    level: 3,
    question: "怎样向前言（Preface）注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“确认版次 → 识别五部 → 建立系统边界 → 约定实验记录 → 规划迁移项目”检查版次合同、工业语境、跨层依赖、证据记录、迁移路线，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["迁移路线", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-preface-6",
    chapter: "gea3-preface",
    level: 4,
    question: "怎样证明前言（Preface）可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“确认版次 → 识别五部 → 建立系统边界 → 约定实验记录 → 规划迁移项目”检查版次合同、工业语境、跨层依赖、证据记录、迁移路线，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["版次合同", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-01-introduction-1",
    chapter: "gea3-chapter-01-introduction",
    level: 1,
    question: "怎样为第1章 Introduction声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“冻结游戏约束 → 画团队交付图 → 划分运行时层 → 追踪资产变换 → 验证类型差异”检查团队边界、实时模拟、复用范围、层间依赖、资产可追溯，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["团队边界", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-01-introduction-2",
    chapter: "gea3-chapter-01-introduction",
    level: 1,
    question: "怎样从第1章 Introduction找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“冻结游戏约束 → 画团队交付图 → 划分运行时层 → 追踪资产变换 → 验证类型差异”检查团队边界、实时模拟、复用范围、层间依赖、资产可追溯，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["实时模拟", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-01-introduction-3",
    chapter: "gea3-chapter-01-introduction",
    level: 2,
    question: "怎样计算第1章 Introduction的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“冻结游戏约束 → 画团队交付图 → 划分运行时层 → 追踪资产变换 → 验证类型差异”检查团队边界、实时模拟、复用范围、层间依赖、资产可追溯，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["复用范围", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-01-introduction-4",
    chapter: "gea3-chapter-01-introduction",
    level: 2,
    question: "怎样验证第1章 Introduction中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“冻结游戏约束 → 画团队交付图 → 划分运行时层 → 追踪资产变换 → 验证类型差异”检查团队边界、实时模拟、复用范围、层间依赖、资产可追溯，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["层间依赖", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-01-introduction-5",
    chapter: "gea3-chapter-01-introduction",
    level: 3,
    question: "怎样向第1章 Introduction注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“冻结游戏约束 → 画团队交付图 → 划分运行时层 → 追踪资产变换 → 验证类型差异”检查团队边界、实时模拟、复用范围、层间依赖、资产可追溯，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["资产可追溯", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-01-introduction-6",
    chapter: "gea3-chapter-01-introduction",
    level: 4,
    question: "怎样证明第1章 Introduction可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“冻结游戏约束 → 画团队交付图 → 划分运行时层 → 追踪资产变换 → 验证类型差异”检查团队边界、实时模拟、复用范围、层间依赖、资产可追溯，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["团队边界", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-02-tools-of-the-trade-1",
    chapter: "gea3-chapter-02-tools-of-the-trade",
    level: 1,
    question:
      "怎样为第2章 Tools of the Trade声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“提交变更 → 生成构建 → 运行目标包 → 采集性能证据 → 复现并修复”检查版本可追溯、构建确定性、采样偏差、内存证据、反馈时延，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["版本可追溯", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-02-tools-of-the-trade-2",
    chapter: "gea3-chapter-02-tools-of-the-trade",
    level: 1,
    question: "怎样从第2章 Tools of the Trade找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“提交变更 → 生成构建 → 运行目标包 → 采集性能证据 → 复现并修复”检查版本可追溯、构建确定性、采样偏差、内存证据、反馈时延，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["构建确定性", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-02-tools-of-the-trade-3",
    chapter: "gea3-chapter-02-tools-of-the-trade",
    level: 2,
    question:
      "怎样计算第2章 Tools of the Trade的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“提交变更 → 生成构建 → 运行目标包 → 采集性能证据 → 复现并修复”检查版本可追溯、构建确定性、采样偏差、内存证据、反馈时延，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["采样偏差", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-02-tools-of-the-trade-4",
    chapter: "gea3-chapter-02-tools-of-the-trade",
    level: 2,
    question:
      "怎样验证第2章 Tools of the Trade中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“提交变更 → 生成构建 → 运行目标包 → 采集性能证据 → 复现并修复”检查版本可追溯、构建确定性、采样偏差、内存证据、反馈时延，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["内存证据", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-02-tools-of-the-trade-5",
    chapter: "gea3-chapter-02-tools-of-the-trade",
    level: 3,
    question: "怎样向第2章 Tools of the Trade注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“提交变更 → 生成构建 → 运行目标包 → 采集性能证据 → 复现并修复”检查版本可追溯、构建确定性、采样偏差、内存证据、反馈时延，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["反馈时延", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-02-tools-of-the-trade-6",
    chapter: "gea3-chapter-02-tools-of-the-trade",
    level: 4,
    question: "怎样证明第2章 Tools of the Trade可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“提交变更 → 生成构建 → 运行目标包 → 采集性能证据 → 复现并修复”检查版本可追溯、构建确定性、采样偏差、内存证据、反馈时延，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["版本可追溯", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-03-software-engineering-1",
    chapter: "gea3-chapter-03-software-engineering",
    level: 1,
    question:
      "怎样为第3章 Fundamentals of Software Engineering for Games声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“声明所有权 → 固定错误语义 → 测量数据访问 → 映射硬件层级 → 验证布局收益”检查生命周期、错误隔离、缓存局部性、硬件并行、内存带宽，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["生命周期", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-03-software-engineering-2",
    chapter: "gea3-chapter-03-software-engineering",
    level: 1,
    question:
      "怎样从第3章 Fundamentals of Software Engineering for Games找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“声明所有权 → 固定错误语义 → 测量数据访问 → 映射硬件层级 → 验证布局收益”检查生命周期、错误隔离、缓存局部性、硬件并行、内存带宽，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["错误隔离", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-03-software-engineering-3",
    chapter: "gea3-chapter-03-software-engineering",
    level: 2,
    question:
      "怎样计算第3章 Fundamentals of Software Engineering for Games的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“声明所有权 → 固定错误语义 → 测量数据访问 → 映射硬件层级 → 验证布局收益”检查生命周期、错误隔离、缓存局部性、硬件并行、内存带宽，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["缓存局部性", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-03-software-engineering-4",
    chapter: "gea3-chapter-03-software-engineering",
    level: 2,
    question:
      "怎样验证第3章 Fundamentals of Software Engineering for Games中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“声明所有权 → 固定错误语义 → 测量数据访问 → 映射硬件层级 → 验证布局收益”检查生命周期、错误隔离、缓存局部性、硬件并行、内存带宽，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["硬件并行", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-03-software-engineering-5",
    chapter: "gea3-chapter-03-software-engineering",
    level: 3,
    question:
      "怎样向第3章 Fundamentals of Software Engineering for Games注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“声明所有权 → 固定错误语义 → 测量数据访问 → 映射硬件层级 → 验证布局收益”检查生命周期、错误隔离、缓存局部性、硬件并行、内存带宽，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["内存带宽", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-03-software-engineering-6",
    chapter: "gea3-chapter-03-software-engineering",
    level: 4,
    question:
      "怎样证明第3章 Fundamentals of Software Engineering for Games可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“声明所有权 → 固定错误语义 → 测量数据访问 → 映射硬件层级 → 验证布局收益”检查生命周期、错误隔离、缓存局部性、硬件并行、内存带宽，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["生命周期", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-04-parallelism-concurrency-1",
    chapter: "gea3-chapter-04-parallelism-concurrency",
    level: 1,
    question:
      "怎样为第4章 Parallelism and Concurrent Programming声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“画任务依赖 → 隔离共享状态 → 选择同步语义 → 测量关键路径 → 注入竞争失败”检查任务粒度、内存序、锁竞争、SIMD布局、GPU分歧，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["任务粒度", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-04-parallelism-concurrency-2",
    chapter: "gea3-chapter-04-parallelism-concurrency",
    level: 1,
    question:
      "怎样从第4章 Parallelism and Concurrent Programming找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“画任务依赖 → 隔离共享状态 → 选择同步语义 → 测量关键路径 → 注入竞争失败”检查任务粒度、内存序、锁竞争、SIMD布局、GPU分歧，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["内存序", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-04-parallelism-concurrency-3",
    chapter: "gea3-chapter-04-parallelism-concurrency",
    level: 2,
    question:
      "怎样计算第4章 Parallelism and Concurrent Programming的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“画任务依赖 → 隔离共享状态 → 选择同步语义 → 测量关键路径 → 注入竞争失败”检查任务粒度、内存序、锁竞争、SIMD布局、GPU分歧，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["锁竞争", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-04-parallelism-concurrency-4",
    chapter: "gea3-chapter-04-parallelism-concurrency",
    level: 2,
    question:
      "怎样验证第4章 Parallelism and Concurrent Programming中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“画任务依赖 → 隔离共享状态 → 选择同步语义 → 测量关键路径 → 注入竞争失败”检查任务粒度、内存序、锁竞争、SIMD布局、GPU分歧，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["SIMD布局", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-04-parallelism-concurrency-5",
    chapter: "gea3-chapter-04-parallelism-concurrency",
    level: 3,
    question:
      "怎样向第4章 Parallelism and Concurrent Programming注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“画任务依赖 → 隔离共享状态 → 选择同步语义 → 测量关键路径 → 注入竞争失败”检查任务粒度、内存序、锁竞争、SIMD布局、GPU分歧，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["GPU分歧", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-04-parallelism-concurrency-6",
    chapter: "gea3-chapter-04-parallelism-concurrency",
    level: 4,
    question:
      "怎样证明第4章 Parallelism and Concurrent Programming可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“画任务依赖 → 隔离共享状态 → 选择同步语义 → 测量关键路径 → 注入竞争失败”检查任务粒度、内存序、锁竞争、SIMD布局、GPU分歧，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["任务粒度", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-05-3d-math-1",
    chapter: "gea3-chapter-05-3d-math",
    level: 1,
    question: "怎样为第5章 3D Math for Games声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“声明坐标空间 → 选择表示 → 组合变换 → 检查数值误差 → 跨系统复算”检查空间语义、旋转表示、变换顺序、数值稳定、随机可复现，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["空间语义", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-05-3d-math-2",
    chapter: "gea3-chapter-05-3d-math",
    level: 1,
    question: "怎样从第5章 3D Math for Games找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“声明坐标空间 → 选择表示 → 组合变换 → 检查数值误差 → 跨系统复算”检查空间语义、旋转表示、变换顺序、数值稳定、随机可复现，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["旋转表示", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-05-3d-math-3",
    chapter: "gea3-chapter-05-3d-math",
    level: 2,
    question:
      "怎样计算第5章 3D Math for Games的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“声明坐标空间 → 选择表示 → 组合变换 → 检查数值误差 → 跨系统复算”检查空间语义、旋转表示、变换顺序、数值稳定、随机可复现，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["变换顺序", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-05-3d-math-4",
    chapter: "gea3-chapter-05-3d-math",
    level: 2,
    question:
      "怎样验证第5章 3D Math for Games中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“声明坐标空间 → 选择表示 → 组合变换 → 检查数值误差 → 跨系统复算”检查空间语义、旋转表示、变换顺序、数值稳定、随机可复现，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["数值稳定", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-05-3d-math-5",
    chapter: "gea3-chapter-05-3d-math",
    level: 3,
    question: "怎样向第5章 3D Math for Games注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“声明坐标空间 → 选择表示 → 组合变换 → 检查数值误差 → 跨系统复算”检查空间语义、旋转表示、变换顺序、数值稳定、随机可复现，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["随机可复现", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-05-3d-math-6",
    chapter: "gea3-chapter-05-3d-math",
    level: 4,
    question: "怎样证明第5章 3D Math for Games可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“声明坐标空间 → 选择表示 → 组合变换 → 检查数值误差 → 跨系统复算”检查空间语义、旋转表示、变换顺序、数值稳定、随机可复现，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["空间语义", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-06-engine-support-1",
    chapter: "gea3-chapter-06-engine-support",
    level: 1,
    question:
      "怎样为第6章 Engine Support Systems声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“画启动DAG → 分配生命周期 → 选择数据容器 → 规范标识文本 → 冻结配置来源”检查启动顺序、分配策略、迭代稳定、编码边界、配置漂移，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["启动顺序", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-06-engine-support-2",
    chapter: "gea3-chapter-06-engine-support",
    level: 1,
    question: "怎样从第6章 Engine Support Systems找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“画启动DAG → 分配生命周期 → 选择数据容器 → 规范标识文本 → 冻结配置来源”检查启动顺序、分配策略、迭代稳定、编码边界、配置漂移，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["分配策略", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-06-engine-support-3",
    chapter: "gea3-chapter-06-engine-support",
    level: 2,
    question:
      "怎样计算第6章 Engine Support Systems的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“画启动DAG → 分配生命周期 → 选择数据容器 → 规范标识文本 → 冻结配置来源”检查启动顺序、分配策略、迭代稳定、编码边界、配置漂移，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["迭代稳定", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-06-engine-support-4",
    chapter: "gea3-chapter-06-engine-support",
    level: 2,
    question:
      "怎样验证第6章 Engine Support Systems中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“画启动DAG → 分配生命周期 → 选择数据容器 → 规范标识文本 → 冻结配置来源”检查启动顺序、分配策略、迭代稳定、编码边界、配置漂移，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["编码边界", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-06-engine-support-5",
    chapter: "gea3-chapter-06-engine-support",
    level: 3,
    question:
      "怎样向第6章 Engine Support Systems注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“画启动DAG → 分配生命周期 → 选择数据容器 → 规范标识文本 → 冻结配置来源”检查启动顺序、分配策略、迭代稳定、编码边界、配置漂移，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["配置漂移", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-06-engine-support-6",
    chapter: "gea3-chapter-06-engine-support",
    level: 4,
    question:
      "怎样证明第6章 Engine Support Systems可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“画启动DAG → 分配生命周期 → 选择数据容器 → 规范标识文本 → 冻结配置来源”检查启动顺序、分配策略、迭代稳定、编码边界、配置漂移，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["启动顺序", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-07-resources-file-system-1",
    chapter: "gea3-chapter-07-resources-file-system",
    level: 1,
    question:
      "怎样为第7章 Resources and the File System声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“规范资产身份 → 解析依赖 → 排队异步读取 → 创建运行时对象 → 按预算回收”检查路径一致、依赖闭包、加载抖动、句柄稳定、内存预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["路径一致", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-07-resources-file-system-2",
    chapter: "gea3-chapter-07-resources-file-system",
    level: 1,
    question: "怎样从第7章 Resources and the File System找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“规范资产身份 → 解析依赖 → 排队异步读取 → 创建运行时对象 → 按预算回收”检查路径一致、依赖闭包、加载抖动、句柄稳定、内存预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["依赖闭包", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-07-resources-file-system-3",
    chapter: "gea3-chapter-07-resources-file-system",
    level: 2,
    question:
      "怎样计算第7章 Resources and the File System的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“规范资产身份 → 解析依赖 → 排队异步读取 → 创建运行时对象 → 按预算回收”检查路径一致、依赖闭包、加载抖动、句柄稳定、内存预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["加载抖动", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-07-resources-file-system-4",
    chapter: "gea3-chapter-07-resources-file-system",
    level: 2,
    question:
      "怎样验证第7章 Resources and the File System中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“规范资产身份 → 解析依赖 → 排队异步读取 → 创建运行时对象 → 按预算回收”检查路径一致、依赖闭包、加载抖动、句柄稳定、内存预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["句柄稳定", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-07-resources-file-system-5",
    chapter: "gea3-chapter-07-resources-file-system",
    level: 3,
    question:
      "怎样向第7章 Resources and the File System注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“规范资产身份 → 解析依赖 → 排队异步读取 → 创建运行时对象 → 按预算回收”检查路径一致、依赖闭包、加载抖动、句柄稳定、内存预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["内存预算", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-07-resources-file-system-6",
    chapter: "gea3-chapter-07-resources-file-system",
    level: 4,
    question:
      "怎样证明第7章 Resources and the File System可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“规范资产身份 → 解析依赖 → 排队异步读取 → 创建运行时对象 → 按预算回收”检查路径一致、依赖闭包、加载抖动、句柄稳定、内存预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["路径一致", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-08-game-loop-1",
    chapter: "gea3-chapter-08-game-loop",
    level: 1,
    question:
      "怎样为第8章 The Game Loop and Real-Time Simulation声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“采样单调时钟 → 累积固定步 → 并行系统更新 → 提交渲染 → 测量帧尾等待”检查帧预算、时间域、固定步、CPU/GPU重叠、输入延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["帧预算", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-08-game-loop-2",
    chapter: "gea3-chapter-08-game-loop",
    level: 1,
    question:
      "怎样从第8章 The Game Loop and Real-Time Simulation找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“采样单调时钟 → 累积固定步 → 并行系统更新 → 提交渲染 → 测量帧尾等待”检查帧预算、时间域、固定步、CPU/GPU重叠、输入延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["时间域", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-08-game-loop-3",
    chapter: "gea3-chapter-08-game-loop",
    level: 2,
    question:
      "怎样计算第8章 The Game Loop and Real-Time Simulation的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“采样单调时钟 → 累积固定步 → 并行系统更新 → 提交渲染 → 测量帧尾等待”检查帧预算、时间域、固定步、CPU/GPU重叠、输入延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["固定步", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-08-game-loop-4",
    chapter: "gea3-chapter-08-game-loop",
    level: 2,
    question:
      "怎样验证第8章 The Game Loop and Real-Time Simulation中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“采样单调时钟 → 累积固定步 → 并行系统更新 → 提交渲染 → 测量帧尾等待”检查帧预算、时间域、固定步、CPU/GPU重叠、输入延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["CPU/GPU重叠", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-08-game-loop-5",
    chapter: "gea3-chapter-08-game-loop",
    level: 3,
    question:
      "怎样向第8章 The Game Loop and Real-Time Simulation注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“采样单调时钟 → 累积固定步 → 并行系统更新 → 提交渲染 → 测量帧尾等待”检查帧预算、时间域、固定步、CPU/GPU重叠、输入延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["输入延迟", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-08-game-loop-6",
    chapter: "gea3-chapter-08-game-loop",
    level: 4,
    question:
      "怎样证明第8章 The Game Loop and Real-Time Simulation可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“采样单调时钟 → 累积固定步 → 并行系统更新 → 提交渲染 → 测量帧尾等待”检查帧预算、时间域、固定步、CPU/GPU重叠、输入延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["帧预算", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-09-human-interface-1",
    chapter: "gea3-chapter-09-human-interface",
    level: 1,
    question:
      "怎样为第9章 Human Interface Devices (HID)声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“枚举设备 → 采样原始信号 → 归一化与滤波 → 映射逻辑动作 → 输出反馈并测延迟”检查热插拔、死区滤波、动作映射、可访问性、端到端延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["热插拔", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-09-human-interface-2",
    chapter: "gea3-chapter-09-human-interface",
    level: 1,
    question: "怎样从第9章 Human Interface Devices (HID)找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“枚举设备 → 采样原始信号 → 归一化与滤波 → 映射逻辑动作 → 输出反馈并测延迟”检查热插拔、死区滤波、动作映射、可访问性、端到端延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["死区滤波", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-09-human-interface-3",
    chapter: "gea3-chapter-09-human-interface",
    level: 2,
    question:
      "怎样计算第9章 Human Interface Devices (HID)的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“枚举设备 → 采样原始信号 → 归一化与滤波 → 映射逻辑动作 → 输出反馈并测延迟”检查热插拔、死区滤波、动作映射、可访问性、端到端延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["动作映射", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-09-human-interface-4",
    chapter: "gea3-chapter-09-human-interface",
    level: 2,
    question:
      "怎样验证第9章 Human Interface Devices (HID)中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“枚举设备 → 采样原始信号 → 归一化与滤波 → 映射逻辑动作 → 输出反馈并测延迟”检查热插拔、死区滤波、动作映射、可访问性、端到端延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["可访问性", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-09-human-interface-5",
    chapter: "gea3-chapter-09-human-interface",
    level: 3,
    question:
      "怎样向第9章 Human Interface Devices (HID)注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“枚举设备 → 采样原始信号 → 归一化与滤波 → 映射逻辑动作 → 输出反馈并测延迟”检查热插拔、死区滤波、动作映射、可访问性、端到端延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["端到端延迟", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-09-human-interface-6",
    chapter: "gea3-chapter-09-human-interface",
    level: 4,
    question:
      "怎样证明第9章 Human Interface Devices (HID)可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“枚举设备 → 采样原始信号 → 归一化与滤波 → 映射逻辑动作 → 输出反馈并测延迟”检查热插拔、死区滤波、动作映射、可访问性、端到端延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["热插拔", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-10-debugging-development-1",
    chapter: "gea3-chapter-10-debugging-development",
    level: 1,
    question:
      "怎样为第10章 Tools for Debugging and Development声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“声明观测问题 → 插入低扰动探针 → 采集目标机轨迹 → 关联版本与状态 → 复现并回归”检查观测扰动、因果时间线、运行时权限、目标机画像、内存归因，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["观测扰动", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-10-debugging-development-2",
    chapter: "gea3-chapter-10-debugging-development",
    level: 1,
    question:
      "怎样从第10章 Tools for Debugging and Development找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“声明观测问题 → 插入低扰动探针 → 采集目标机轨迹 → 关联版本与状态 → 复现并回归”检查观测扰动、因果时间线、运行时权限、目标机画像、内存归因，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["因果时间线", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-10-debugging-development-3",
    chapter: "gea3-chapter-10-debugging-development",
    level: 2,
    question:
      "怎样计算第10章 Tools for Debugging and Development的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“声明观测问题 → 插入低扰动探针 → 采集目标机轨迹 → 关联版本与状态 → 复现并回归”检查观测扰动、因果时间线、运行时权限、目标机画像、内存归因，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["运行时权限", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-10-debugging-development-4",
    chapter: "gea3-chapter-10-debugging-development",
    level: 2,
    question:
      "怎样验证第10章 Tools for Debugging and Development中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“声明观测问题 → 插入低扰动探针 → 采集目标机轨迹 → 关联版本与状态 → 复现并回归”检查观测扰动、因果时间线、运行时权限、目标机画像、内存归因，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["目标机画像", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-10-debugging-development-5",
    chapter: "gea3-chapter-10-debugging-development",
    level: 3,
    question:
      "怎样向第10章 Tools for Debugging and Development注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“声明观测问题 → 插入低扰动探针 → 采集目标机轨迹 → 关联版本与状态 → 复现并回归”检查观测扰动、因果时间线、运行时权限、目标机画像、内存归因，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["内存归因", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-10-debugging-development-6",
    chapter: "gea3-chapter-10-debugging-development",
    level: 4,
    question:
      "怎样证明第10章 Tools for Debugging and Development可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“声明观测问题 → 插入低扰动探针 → 采集目标机轨迹 → 关联版本与状态 → 复现并回归”检查观测扰动、因果时间线、运行时权限、目标机画像、内存归因，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["观测扰动", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-11-rendering-engine-1",
    chapter: "gea3-chapter-11-rendering-engine",
    level: 1,
    question:
      "怎样为第11章 The Rendering Engine声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“提取渲染世界 → 剔除并排序 → 绑定材质资源 → 构建GPU命令 → 呈现并画像”检查空间正确、可见性、状态切换、GPU预算、画质伸缩，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["空间正确", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-11-rendering-engine-2",
    chapter: "gea3-chapter-11-rendering-engine",
    level: 1,
    question: "怎样从第11章 The Rendering Engine找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“提取渲染世界 → 剔除并排序 → 绑定材质资源 → 构建GPU命令 → 呈现并画像”检查空间正确、可见性、状态切换、GPU预算、画质伸缩，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["可见性", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-11-rendering-engine-3",
    chapter: "gea3-chapter-11-rendering-engine",
    level: 2,
    question:
      "怎样计算第11章 The Rendering Engine的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“提取渲染世界 → 剔除并排序 → 绑定材质资源 → 构建GPU命令 → 呈现并画像”检查空间正确、可见性、状态切换、GPU预算、画质伸缩，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["状态切换", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-11-rendering-engine-4",
    chapter: "gea3-chapter-11-rendering-engine",
    level: 2,
    question:
      "怎样验证第11章 The Rendering Engine中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“提取渲染世界 → 剔除并排序 → 绑定材质资源 → 构建GPU命令 → 呈现并画像”检查空间正确、可见性、状态切换、GPU预算、画质伸缩，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["GPU预算", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-11-rendering-engine-5",
    chapter: "gea3-chapter-11-rendering-engine",
    level: 3,
    question: "怎样向第11章 The Rendering Engine注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“提取渲染世界 → 剔除并排序 → 绑定材质资源 → 构建GPU命令 → 呈现并画像”检查空间正确、可见性、状态切换、GPU预算、画质伸缩，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["画质伸缩", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-11-rendering-engine-6",
    chapter: "gea3-chapter-11-rendering-engine",
    level: 4,
    question:
      "怎样证明第11章 The Rendering Engine可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“提取渲染世界 → 剔除并排序 → 绑定材质资源 → 构建GPU命令 → 呈现并画像”检查空间正确、可见性、状态切换、GPU预算、画质伸缩，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["空间正确", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-12-animation-systems-1",
    chapter: "gea3-chapter-12-animation-systems",
    level: 1,
    question:
      "怎样为第12章 Animation Systems声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“采样动作片段 → 混合局部姿态 → 求值骨架层级 → 执行约束后处理 → 生成蒙皮调色板”检查时间同步、空间转换、混合连续、压缩误差、求解预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["时间同步", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-12-animation-systems-2",
    chapter: "gea3-chapter-12-animation-systems",
    level: 1,
    question: "怎样从第12章 Animation Systems找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“采样动作片段 → 混合局部姿态 → 求值骨架层级 → 执行约束后处理 → 生成蒙皮调色板”检查时间同步、空间转换、混合连续、压缩误差、求解预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["空间转换", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-12-animation-systems-3",
    chapter: "gea3-chapter-12-animation-systems",
    level: 2,
    question:
      "怎样计算第12章 Animation Systems的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“采样动作片段 → 混合局部姿态 → 求值骨架层级 → 执行约束后处理 → 生成蒙皮调色板”检查时间同步、空间转换、混合连续、压缩误差、求解预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["混合连续", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-12-animation-systems-4",
    chapter: "gea3-chapter-12-animation-systems",
    level: 2,
    question:
      "怎样验证第12章 Animation Systems中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“采样动作片段 → 混合局部姿态 → 求值骨架层级 → 执行约束后处理 → 生成蒙皮调色板”检查时间同步、空间转换、混合连续、压缩误差、求解预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["压缩误差", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-12-animation-systems-5",
    chapter: "gea3-chapter-12-animation-systems",
    level: 3,
    question: "怎样向第12章 Animation Systems注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“采样动作片段 → 混合局部姿态 → 求值骨架层级 → 执行约束后处理 → 生成蒙皮调色板”检查时间同步、空间转换、混合连续、压缩误差、求解预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["求解预算", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-12-animation-systems-6",
    chapter: "gea3-chapter-12-animation-systems",
    level: 4,
    question: "怎样证明第12章 Animation Systems可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“采样动作片段 → 混合局部姿态 → 求值骨架层级 → 执行约束后处理 → 生成蒙皮调色板”检查时间同步、空间转换、混合连续、压缩误差、求解预算，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["时间同步", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-13-collision-rigid-body-1",
    chapter: "gea3-chapter-13-collision-rigid-body",
    level: 1,
    question:
      "怎样为第13章 Collision and Rigid Body Dynamics声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“同步碰撞形状 → 生成候选对 → 计算接触 → 求解约束 → 回写变换与事件”检查形状近似、宽窄相、积分稳定、约束收敛、双向同步，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["形状近似", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-13-collision-rigid-body-2",
    chapter: "gea3-chapter-13-collision-rigid-body",
    level: 1,
    question:
      "怎样从第13章 Collision and Rigid Body Dynamics找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“同步碰撞形状 → 生成候选对 → 计算接触 → 求解约束 → 回写变换与事件”检查形状近似、宽窄相、积分稳定、约束收敛、双向同步，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["宽窄相", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-13-collision-rigid-body-3",
    chapter: "gea3-chapter-13-collision-rigid-body",
    level: 2,
    question:
      "怎样计算第13章 Collision and Rigid Body Dynamics的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“同步碰撞形状 → 生成候选对 → 计算接触 → 求解约束 → 回写变换与事件”检查形状近似、宽窄相、积分稳定、约束收敛、双向同步，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["积分稳定", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-13-collision-rigid-body-4",
    chapter: "gea3-chapter-13-collision-rigid-body",
    level: 2,
    question:
      "怎样验证第13章 Collision and Rigid Body Dynamics中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“同步碰撞形状 → 生成候选对 → 计算接触 → 求解约束 → 回写变换与事件”检查形状近似、宽窄相、积分稳定、约束收敛、双向同步，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["约束收敛", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-13-collision-rigid-body-5",
    chapter: "gea3-chapter-13-collision-rigid-body",
    level: 3,
    question:
      "怎样向第13章 Collision and Rigid Body Dynamics注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“同步碰撞形状 → 生成候选对 → 计算接触 → 求解约束 → 回写变换与事件”检查形状近似、宽窄相、积分稳定、约束收敛、双向同步，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["双向同步", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-13-collision-rigid-body-6",
    chapter: "gea3-chapter-13-collision-rigid-body",
    level: 4,
    question:
      "怎样证明第13章 Collision and Rigid Body Dynamics可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“同步碰撞形状 → 生成候选对 → 计算接触 → 求解约束 → 回写变换与事件”检查形状近似、宽窄相、积分稳定、约束收敛、双向同步，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["形状近似", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-14-audio-1",
    chapter: "gea3-chapter-14-audio",
    level: 1,
    question: "怎样为第14章 Audio声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“接收音频事件 → 解析资源与声部 → 计算空间参数 → 混音与DSP → 缓冲并输出”检查采样边界、声部预算、空间遮挡、线程隔离、输出延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["采样边界", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-14-audio-2",
    chapter: "gea3-chapter-14-audio",
    level: 1,
    question: "怎样从第14章 Audio找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“接收音频事件 → 解析资源与声部 → 计算空间参数 → 混音与DSP → 缓冲并输出”检查采样边界、声部预算、空间遮挡、线程隔离、输出延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["声部预算", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-14-audio-3",
    chapter: "gea3-chapter-14-audio",
    level: 2,
    question: "怎样计算第14章 Audio的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“接收音频事件 → 解析资源与声部 → 计算空间参数 → 混音与DSP → 缓冲并输出”检查采样边界、声部预算、空间遮挡、线程隔离、输出延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["空间遮挡", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-14-audio-4",
    chapter: "gea3-chapter-14-audio",
    level: 2,
    question: "怎样验证第14章 Audio中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“接收音频事件 → 解析资源与声部 → 计算空间参数 → 混音与DSP → 缓冲并输出”检查采样边界、声部预算、空间遮挡、线程隔离、输出延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["线程隔离", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-14-audio-5",
    chapter: "gea3-chapter-14-audio",
    level: 3,
    question: "怎样向第14章 Audio注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“接收音频事件 → 解析资源与声部 → 计算空间参数 → 混音与DSP → 缓冲并输出”检查采样边界、声部预算、空间遮挡、线程隔离、输出延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["输出延迟", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-14-audio-6",
    chapter: "gea3-chapter-14-audio",
    level: 4,
    question: "怎样证明第14章 Audio可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“接收音频事件 → 解析资源与声部 → 计算空间参数 → 混音与DSP → 缓冲并输出”检查采样边界、声部预算、空间遮挡、线程隔离、输出延迟，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["采样边界", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-15-gameplay-introduction-1",
    chapter: "gea3-chapter-15-gameplay-introduction",
    level: 1,
    question:
      "怎样为第15章 Introduction to Gameplay Systems声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“定义世界边界 → 选择对象模型 → 声明数据模式 → 编辑并验证内容 → 加载到运行时”检查世界分区、对象组合、模式演化、编辑事务、运行时一致，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["世界分区", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-15-gameplay-introduction-2",
    chapter: "gea3-chapter-15-gameplay-introduction",
    level: 1,
    question:
      "怎样从第15章 Introduction to Gameplay Systems找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“定义世界边界 → 选择对象模型 → 声明数据模式 → 编辑并验证内容 → 加载到运行时”检查世界分区、对象组合、模式演化、编辑事务、运行时一致，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["对象组合", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-15-gameplay-introduction-3",
    chapter: "gea3-chapter-15-gameplay-introduction",
    level: 2,
    question:
      "怎样计算第15章 Introduction to Gameplay Systems的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“定义世界边界 → 选择对象模型 → 声明数据模式 → 编辑并验证内容 → 加载到运行时”检查世界分区、对象组合、模式演化、编辑事务、运行时一致，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["模式演化", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-15-gameplay-introduction-4",
    chapter: "gea3-chapter-15-gameplay-introduction",
    level: 2,
    question:
      "怎样验证第15章 Introduction to Gameplay Systems中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“定义世界边界 → 选择对象模型 → 声明数据模式 → 编辑并验证内容 → 加载到运行时”检查世界分区、对象组合、模式演化、编辑事务、运行时一致，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["编辑事务", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-15-gameplay-introduction-5",
    chapter: "gea3-chapter-15-gameplay-introduction",
    level: 3,
    question:
      "怎样向第15章 Introduction to Gameplay Systems注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“定义世界边界 → 选择对象模型 → 声明数据模式 → 编辑并验证内容 → 加载到运行时”检查世界分区、对象组合、模式演化、编辑事务、运行时一致，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["运行时一致", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-15-gameplay-introduction-6",
    chapter: "gea3-chapter-15-gameplay-introduction",
    level: 4,
    question:
      "怎样证明第15章 Introduction to Gameplay Systems可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“定义世界边界 → 选择对象模型 → 声明数据模式 → 编辑并验证内容 → 加载到运行时”检查世界分区、对象组合、模式演化、编辑事务、运行时一致，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["世界分区", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-16-runtime-gameplay-1",
    chapter: "gea3-chapter-16-runtime-gameplay",
    level: 1,
    question:
      "怎样为第16章 Runtime Gameplay Foundation Systems声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“流送世界块 → 解析对象身份 → 调度分阶段更新 → 交换事件消息 → 提交流程状态”检查稳定句柄、更新调度、并发副作用、消息顺序、脚本热更，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["稳定句柄", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-16-runtime-gameplay-2",
    chapter: "gea3-chapter-16-runtime-gameplay",
    level: 1,
    question:
      "怎样从第16章 Runtime Gameplay Foundation Systems找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“流送世界块 → 解析对象身份 → 调度分阶段更新 → 交换事件消息 → 提交流程状态”检查稳定句柄、更新调度、并发副作用、消息顺序、脚本热更，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["更新调度", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-16-runtime-gameplay-3",
    chapter: "gea3-chapter-16-runtime-gameplay",
    level: 2,
    question:
      "怎样计算第16章 Runtime Gameplay Foundation Systems的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“流送世界块 → 解析对象身份 → 调度分阶段更新 → 交换事件消息 → 提交流程状态”检查稳定句柄、更新调度、并发副作用、消息顺序、脚本热更，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["并发副作用", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-16-runtime-gameplay-4",
    chapter: "gea3-chapter-16-runtime-gameplay",
    level: 2,
    question:
      "怎样验证第16章 Runtime Gameplay Foundation Systems中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“流送世界块 → 解析对象身份 → 调度分阶段更新 → 交换事件消息 → 提交流程状态”检查稳定句柄、更新调度、并发副作用、消息顺序、脚本热更，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["消息顺序", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-16-runtime-gameplay-5",
    chapter: "gea3-chapter-16-runtime-gameplay",
    level: 3,
    question:
      "怎样向第16章 Runtime Gameplay Foundation Systems注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“流送世界块 → 解析对象身份 → 调度分阶段更新 → 交换事件消息 → 提交流程状态”检查稳定句柄、更新调度、并发副作用、消息顺序、脚本热更，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["脚本热更", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-16-runtime-gameplay-6",
    chapter: "gea3-chapter-16-runtime-gameplay",
    level: 4,
    question:
      "怎样证明第16章 Runtime Gameplay Foundation Systems可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“流送世界块 → 解析对象身份 → 调度分阶段更新 → 交换事件消息 → 提交流程状态”检查稳定句柄、更新调度、并发副作用、消息顺序、脚本热更，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["稳定句柄", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-chapter-17-more-1",
    chapter: "gea3-chapter-17-more",
    level: 1,
    question:
      "怎样为第17章 You Mean There’s More?声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“列出遗漏系统 → 定位依赖层 → 声明生命周期 → 分配实时预算 → 设计验证实验”检查知识边界、架构迁移、玩法专属、在线服务、持续演化，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["知识边界", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-17-more-2",
    chapter: "gea3-chapter-17-more",
    level: 1,
    question: "怎样从第17章 You Mean There’s More?找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“列出遗漏系统 → 定位依赖层 → 声明生命周期 → 分配实时预算 → 设计验证实验”检查知识边界、架构迁移、玩法专属、在线服务、持续演化，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["架构迁移", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-chapter-17-more-3",
    chapter: "gea3-chapter-17-more",
    level: 2,
    question:
      "怎样计算第17章 You Mean There’s More?的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“列出遗漏系统 → 定位依赖层 → 声明生命周期 → 分配实时预算 → 设计验证实验”检查知识边界、架构迁移、玩法专属、在线服务、持续演化，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["玩法专属", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-17-more-4",
    chapter: "gea3-chapter-17-more",
    level: 2,
    question:
      "怎样验证第17章 You Mean There’s More?中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“列出遗漏系统 → 定位依赖层 → 声明生命周期 → 分配实时预算 → 设计验证实验”检查知识边界、架构迁移、玩法专属、在线服务、持续演化，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["在线服务", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-chapter-17-more-5",
    chapter: "gea3-chapter-17-more",
    level: 3,
    question:
      "怎样向第17章 You Mean There’s More?注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“列出遗漏系统 → 定位依赖层 → 声明生命周期 → 分配实时预算 → 设计验证实验”检查知识边界、架构迁移、玩法专属、在线服务、持续演化，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["持续演化", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-chapter-17-more-6",
    chapter: "gea3-chapter-17-more",
    level: 4,
    question:
      "怎样证明第17章 You Mean There’s More?可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“列出遗漏系统 → 定位依赖层 → 声明生命周期 → 分配实时预算 → 设计验证实验”检查知识边界、架构迁移、玩法专属、在线服务、持续演化，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["知识边界", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-bibliography-1",
    chapter: "gea3-bibliography",
    level: 1,
    question:
      "怎样为参考文献（Bibliography）声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“定位主张 → 找到原始引用 → 核对适用条件 → 复现实验 → 记录版本差异”检查来源层级、适用条件、实验复现、版本变化、引用闭环，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["来源层级", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-bibliography-2",
    chapter: "gea3-bibliography",
    level: 1,
    question: "怎样从参考文献（Bibliography）找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“定位主张 → 找到原始引用 → 核对适用条件 → 复现实验 → 记录版本差异”检查来源层级、适用条件、实验复现、版本变化、引用闭环，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["适用条件", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-bibliography-3",
    chapter: "gea3-bibliography",
    level: 2,
    question:
      "怎样计算参考文献（Bibliography）的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“定位主张 → 找到原始引用 → 核对适用条件 → 复现实验 → 记录版本差异”检查来源层级、适用条件、实验复现、版本变化、引用闭环，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["实验复现", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-bibliography-4",
    chapter: "gea3-bibliography",
    level: 2,
    question:
      "怎样验证参考文献（Bibliography）中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“定位主张 → 找到原始引用 → 核对适用条件 → 复现实验 → 记录版本差异”检查来源层级、适用条件、实验复现、版本变化、引用闭环，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["版本变化", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-bibliography-5",
    chapter: "gea3-bibliography",
    level: 3,
    question: "怎样向参考文献（Bibliography）注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“定位主张 → 找到原始引用 → 核对适用条件 → 复现实验 → 记录版本差异”检查来源层级、适用条件、实验复现、版本变化、引用闭环，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["引用闭环", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-bibliography-6",
    chapter: "gea3-bibliography",
    level: 4,
    question: "怎样证明参考文献（Bibliography）可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“定位主张 → 找到原始引用 → 核对适用条件 → 复现实验 → 记录版本差异”检查来源层级、适用条件、实验复现、版本变化、引用闭环，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["来源层级", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-index-1",
    chapter: "gea3-index",
    level: 1,
    question: "怎样为索引（Index）声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“选择核心术语 → 定位全部出现 → 比较上下文语义 → 连接依赖关系 → 生成调试路线”检查术语一致、跨章连接、语义差异、查询效率、调试入口，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["术语一致", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-index-2",
    chapter: "gea3-index",
    level: 1,
    question: "怎样从索引（Index）找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“选择核心术语 → 定位全部出现 → 比较上下文语义 → 连接依赖关系 → 生成调试路线”检查术语一致、跨章连接、语义差异、查询效率、调试入口，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["跨章连接", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-index-3",
    chapter: "gea3-index",
    level: 2,
    question: "怎样计算索引（Index）的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“选择核心术语 → 定位全部出现 → 比较上下文语义 → 连接依赖关系 → 生成调试路线”检查术语一致、跨章连接、语义差异、查询效率、调试入口，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["语义差异", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-index-4",
    chapter: "gea3-index",
    level: 2,
    question: "怎样验证索引（Index）中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“选择核心术语 → 定位全部出现 → 比较上下文语义 → 连接依赖关系 → 生成调试路线”检查术语一致、跨章连接、语义差异、查询效率、调试入口，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["查询效率", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-index-5",
    chapter: "gea3-index",
    level: 3,
    question: "怎样向索引（Index）注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“选择核心术语 → 定位全部出现 → 比较上下文语义 → 连接依赖关系 → 生成调试路线”检查术语一致、跨章连接、语义差异、查询效率、调试入口，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["调试入口", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-index-6",
    chapter: "gea3-index",
    level: 4,
    question: "怎样证明索引（Index）可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“选择核心术语 → 定位全部出现 → 比较上下文语义 → 连接依赖关系 → 生成调试路线”检查术语一致、跨章连接、语义差异、查询效率、调试入口，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["术语一致", "GEA3权威目录", "level-4"],
  },
  {
    id: "gea3-official-final-review-1",
    chapter: "gea3-official-final-review",
    level: 1,
    question:
      "怎样为《游戏引擎架构》第3版全书综合复核声明输入、输出、所有权和生命周期？",
    answer:
      "先冻结系统边界与状态机，再画正常路径和失败回收路径。沿“冻结目标约束 → 画运行时依赖 → 注入预算压力 → 追踪跨帧因果 → 独立复核证据”检查整机视角、关键路径、生命周期、失败注入、迁移能力，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["整机视角", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-official-final-review-2",
    chapter: "gea3-official-final-review",
    level: 1,
    question: "怎样从《游戏引擎架构》第3版全书综合复核找出真正的帧关键路径？",
    answer:
      "从呈现或任务完成点逆向追踪最长依赖链，把执行、同步和等待分开。沿“冻结目标约束 → 画运行时依赖 → 注入预算压力 → 追踪跨帧因果 → 独立复核证据”检查整机视角、关键路径、生命周期、失败注入、迁移能力，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["关键路径", "GEA3权威目录", "level-1"],
  },
  {
    id: "gea3-official-final-review-3",
    chapter: "gea3-official-final-review",
    level: 2,
    question:
      "怎样计算《游戏引擎架构》第3版全书综合复核的预算占用而不重复累计CPU/GPU重叠？",
    answer:
      "分别重建CPU、GPU时间线，以主路径最大值加同步与等待，并报告尾延迟。沿“冻结目标约束 → 画运行时依赖 → 注入预算压力 → 追踪跨帧因果 → 独立复核证据”检查整机视角、关键路径、生命周期、失败注入、迁移能力，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["生命周期", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-official-final-review-4",
    chapter: "gea3-official-final-review",
    level: 2,
    question:
      "怎样验证《游戏引擎架构》第3版全书综合复核中的资源身份和状态没有跨线程漂移？",
    answer:
      "用稳定句柄、代际或版本、状态转换日志和帧边界快照交叉核对。沿“冻结目标约束 → 画运行时依赖 → 注入预算压力 → 追踪跨帧因果 → 独立复核证据”检查整机视角、关键路径、生命周期、失败注入、迁移能力，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["失败注入", "GEA3权威目录", "level-2"],
  },
  {
    id: "gea3-official-final-review-5",
    chapter: "gea3-official-final-review",
    level: 3,
    question:
      "怎样向《游戏引擎架构》第3版全书综合复核注入压力并定位第一个失效节点？",
    answer:
      "一次只改变负载、并行度或缓冲，先预测再采集首个异常帧前后的完整轨迹。沿“冻结目标约束 → 画运行时依赖 → 注入预算压力 → 追踪跨帧因果 → 独立复核证据”检查整机视角、关键路径、生命周期、失败注入、迁移能力，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["迁移能力", "GEA3权威目录", "level-3"],
  },
  {
    id: "gea3-official-final-review-6",
    chapter: "gea3-official-final-review",
    level: 4,
    question:
      "怎样证明《游戏引擎架构》第3版全书综合复核可以迁移到陌生引擎和目标设备？",
    answer:
      "替换具体API但保持输入、状态、预算和证据合同，由独立复核者复现实验与边界。沿“冻结目标约束 → 画运行时依赖 → 注入预算压力 → 追踪跨帧因果 → 独立复核证据”检查整机视角、关键路径、生命周期、失败注入、迁移能力，并记录版本、平台、帧号、资源身份、线程、时间区间和失败状态。",
    tags: ["整机视角", "GEA3权威目录", "level-4"],
  },
];
