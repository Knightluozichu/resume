import type { ReviewQuestion } from "../review-questions";

export const gep221OfficialQuestions: ReviewQuestion[] = [
  {
    id: "gep2-official-learning-map-1",
    chapter: "gep2-official-learning-map",
    level: 1,
    question:
      "怎样为《游戏引擎原理与实践·卷2：高级技术》权威学习地图建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“校准卷1基础 → 建立动画管线 → 构建渲染架构 → 并行资源工作 → 完成性能验收”复核动画管线、渲染架构、材质系统、并行运行时、性能证据，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["动画管线", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-official-learning-map-2",
    chapter: "gep2-official-learning-map",
    level: 1,
    question:
      "怎样逐项核对《游戏引擎原理与实践·卷2：高级技术》权威学习地图的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“校准卷1基础 → 建立动画管线 → 构建渲染架构 → 并行资源工作 → 完成性能验收”复核动画管线、渲染架构、材质系统、并行运行时、性能证据，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["渲染架构", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-official-learning-map-3",
    chapter: "gep2-official-learning-map",
    level: 2,
    question:
      "怎样计算《游戏引擎原理与实践·卷2：高级技术》权威学习地图中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“校准卷1基础 → 建立动画管线 → 构建渲染架构 → 并行资源工作 → 完成性能验收”复核动画管线、渲染架构、材质系统、并行运行时、性能证据，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["材质系统", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-official-learning-map-4",
    chapter: "gep2-official-learning-map",
    level: 2,
    question:
      "怎样验证《游戏引擎原理与实践·卷2：高级技术》权威学习地图没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“校准卷1基础 → 建立动画管线 → 构建渲染架构 → 并行资源工作 → 完成性能验收”复核动画管线、渲染架构、材质系统、并行运行时、性能证据，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["并行运行时", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-official-learning-map-5",
    chapter: "gep2-official-learning-map",
    level: 3,
    question:
      "怎样向《游戏引擎原理与实践·卷2：高级技术》权威学习地图注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“校准卷1基础 → 建立动画管线 → 构建渲染架构 → 并行资源工作 → 完成性能验收”复核动画管线、渲染架构、材质系统、并行运行时、性能证据，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["性能证据", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-official-learning-map-6",
    chapter: "gep2-official-learning-map",
    level: 4,
    question:
      "怎样证明《游戏引擎原理与实践·卷2：高级技术》权威学习地图能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“校准卷1基础 → 建立动画管线 → 构建渲染架构 → 并行资源工作 → 完成性能验收”复核动画管线、渲染架构、材质系统、并行运行时、性能证据，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["动画管线", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-front-matter-1",
    chapter: "gep2-front-matter",
    level: 1,
    question:
      "怎样为书前资料：版本、范围、读者与资源建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“固定版本坐标 → 校准前置能力 → 获取配套资源 → 建立实验基线 → 记录复核证据”复核版本坐标、能力基线、资源校验、实验口径、证据记录，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["版本坐标", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-front-matter-2",
    chapter: "gep2-front-matter",
    level: 1,
    question:
      "怎样逐项核对书前资料：版本、范围、读者与资源的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“固定版本坐标 → 校准前置能力 → 获取配套资源 → 建立实验基线 → 记录复核证据”复核版本坐标、能力基线、资源校验、实验口径、证据记录，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["能力基线", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-front-matter-3",
    chapter: "gep2-front-matter",
    level: 2,
    question:
      "怎样计算书前资料：版本、范围、读者与资源中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“固定版本坐标 → 校准前置能力 → 获取配套资源 → 建立实验基线 → 记录复核证据”复核版本坐标、能力基线、资源校验、实验口径、证据记录，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["资源校验", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-front-matter-4",
    chapter: "gep2-front-matter",
    level: 2,
    question:
      "怎样验证书前资料：版本、范围、读者与资源没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“固定版本坐标 → 校准前置能力 → 获取配套资源 → 建立实验基线 → 记录复核证据”复核版本坐标、能力基线、资源校验、实验口径、证据记录，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["实验口径", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-front-matter-5",
    chapter: "gep2-front-matter",
    level: 3,
    question:
      "怎样向书前资料：版本、范围、读者与资源注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“固定版本坐标 → 校准前置能力 → 获取配套资源 → 建立实验基线 → 记录复核证据”复核版本坐标、能力基线、资源校验、实验口径、证据记录，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["证据记录", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-front-matter-6",
    chapter: "gep2-front-matter",
    level: 4,
    question:
      "怎样证明书前资料：版本、范围、读者与资源能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“固定版本坐标 → 校准前置能力 → 获取配套资源 → 建立实验基线 → 记录复核证据”复核版本坐标、能力基线、资源校验、实验口径、证据记录，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["版本坐标", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-01-skeletal-skinning-basics-1",
    chapter: "gep2-chapter-01-skeletal-skinning-basics",
    level: 1,
    question:
      "怎样为第1章 骨骼蒙皮模型与动画基础建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“解析骨骼层级 → 绑定网格权重 → 导入动作轨道 → 压缩运行数据 → 验证姿态包围盒”复核骨架层级、蒙皮矩阵、权重归一、轨道压缩、动态包围盒，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["骨架层级", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-01-skeletal-skinning-basics-2",
    chapter: "gep2-chapter-01-skeletal-skinning-basics",
    level: 1,
    question:
      "怎样逐项核对第1章 骨骼蒙皮模型与动画基础的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“解析骨骼层级 → 绑定网格权重 → 导入动作轨道 → 压缩运行数据 → 验证姿态包围盒”复核骨架层级、蒙皮矩阵、权重归一、轨道压缩、动态包围盒，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["蒙皮矩阵", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-01-skeletal-skinning-basics-3",
    chapter: "gep2-chapter-01-skeletal-skinning-basics",
    level: 2,
    question: "怎样计算第1章 骨骼蒙皮模型与动画基础中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“解析骨骼层级 → 绑定网格权重 → 导入动作轨道 → 压缩运行数据 → 验证姿态包围盒”复核骨架层级、蒙皮矩阵、权重归一、轨道压缩、动态包围盒，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["权重归一", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-01-skeletal-skinning-basics-4",
    chapter: "gep2-chapter-01-skeletal-skinning-basics",
    level: 2,
    question:
      "怎样验证第1章 骨骼蒙皮模型与动画基础没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“解析骨骼层级 → 绑定网格权重 → 导入动作轨道 → 压缩运行数据 → 验证姿态包围盒”复核骨架层级、蒙皮矩阵、权重归一、轨道压缩、动态包围盒，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["轨道压缩", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-01-skeletal-skinning-basics-5",
    chapter: "gep2-chapter-01-skeletal-skinning-basics",
    level: 3,
    question:
      "怎样向第1章 骨骼蒙皮模型与动画基础注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“解析骨骼层级 → 绑定网格权重 → 导入动作轨道 → 压缩运行数据 → 验证姿态包围盒”复核骨架层级、蒙皮矩阵、权重归一、轨道压缩、动态包围盒，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["动态包围盒", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-01-skeletal-skinning-basics-6",
    chapter: "gep2-chapter-01-skeletal-skinning-basics",
    level: 4,
    question:
      "怎样证明第1章 骨骼蒙皮模型与动画基础能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“解析骨骼层级 → 绑定网格权重 → 导入动作轨道 → 压缩运行数据 → 验证姿态包围盒”复核骨架层级、蒙皮矩阵、权重归一、轨道压缩、动态包围盒，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["骨架层级", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-02-animation-playback-slots-1",
    chapter: "gep2-chapter-02-animation-playback-slots",
    level: 1,
    question: "怎样为第2章 动画播放与插槽建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“推进播放时钟 → 采样骨骼姿态 → 提取根骨运动 → 更新动态边界 → 解析插槽挂接”复核播放时钟、根骨运动、姿态采样、插槽空间、边界更新，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["播放时钟", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-02-animation-playback-slots-2",
    chapter: "gep2-chapter-02-animation-playback-slots",
    level: 1,
    question:
      "怎样逐项核对第2章 动画播放与插槽的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“推进播放时钟 → 采样骨骼姿态 → 提取根骨运动 → 更新动态边界 → 解析插槽挂接”复核播放时钟、根骨运动、姿态采样、插槽空间、边界更新，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["根骨运动", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-02-animation-playback-slots-3",
    chapter: "gep2-chapter-02-animation-playback-slots",
    level: 2,
    question: "怎样计算第2章 动画播放与插槽中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“推进播放时钟 → 采样骨骼姿态 → 提取根骨运动 → 更新动态边界 → 解析插槽挂接”复核播放时钟、根骨运动、姿态采样、插槽空间、边界更新，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["姿态采样", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-02-animation-playback-slots-4",
    chapter: "gep2-chapter-02-animation-playback-slots",
    level: 2,
    question: "怎样验证第2章 动画播放与插槽没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“推进播放时钟 → 采样骨骼姿态 → 提取根骨运动 → 更新动态边界 → 解析插槽挂接”复核播放时钟、根骨运动、姿态采样、插槽空间、边界更新，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["插槽空间", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-02-animation-playback-slots-5",
    chapter: "gep2-chapter-02-animation-playback-slots",
    level: 3,
    question:
      "怎样向第2章 动画播放与插槽注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“推进播放时钟 → 采样骨骼姿态 → 提取根骨运动 → 更新动态边界 → 解析插槽挂接”复核播放时钟、根骨运动、姿态采样、插槽空间、边界更新，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["边界更新", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-02-animation-playback-slots-6",
    chapter: "gep2-chapter-02-animation-playback-slots",
    level: 4,
    question: "怎样证明第2章 动画播放与插槽能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“推进播放时钟 → 采样骨骼姿态 → 提取根骨运动 → 更新动态边界 → 解析插槽挂接”复核播放时钟、根骨运动、姿态采样、插槽空间、边界更新，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["播放时钟", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-03-animation-blending-1",
    chapter: "gep2-chapter-03-animation-blending",
    level: 1,
    question: "怎样为第3章 动画混合建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“构建动画树 → 采样混合参数 → 求解状态过渡 → 叠加局部动作 → 缓存实例姿态”复核动画树、混合空间、过渡曲线、局部遮罩、实例缓存，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["动画树", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-03-animation-blending-2",
    chapter: "gep2-chapter-03-animation-blending",
    level: 1,
    question: "怎样逐项核对第3章 动画混合的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“构建动画树 → 采样混合参数 → 求解状态过渡 → 叠加局部动作 → 缓存实例姿态”复核动画树、混合空间、过渡曲线、局部遮罩、实例缓存，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["混合空间", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-03-animation-blending-3",
    chapter: "gep2-chapter-03-animation-blending",
    level: 2,
    question: "怎样计算第3章 动画混合中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“构建动画树 → 采样混合参数 → 求解状态过渡 → 叠加局部动作 → 缓存实例姿态”复核动画树、混合空间、过渡曲线、局部遮罩、实例缓存，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["过渡曲线", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-03-animation-blending-4",
    chapter: "gep2-chapter-03-animation-blending",
    level: 2,
    question: "怎样验证第3章 动画混合没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“构建动画树 → 采样混合参数 → 求解状态过渡 → 叠加局部动作 → 缓存实例姿态”复核动画树、混合空间、过渡曲线、局部遮罩、实例缓存，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["局部遮罩", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-03-animation-blending-5",
    chapter: "gep2-chapter-03-animation-blending",
    level: 3,
    question: "怎样向第3章 动画混合注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“构建动画树 → 采样混合参数 → 求解状态过渡 → 叠加局部动作 → 缓存实例姿态”复核动画树、混合空间、过渡曲线、局部遮罩、实例缓存，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["实例缓存", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-03-animation-blending-6",
    chapter: "gep2-chapter-03-animation-blending",
    level: 4,
    question: "怎样证明第3章 动画混合能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“构建动画树 → 采样混合参数 → 求解状态过渡 → 叠加局部动作 → 缓存实例姿态”复核动画树、混合空间、过渡曲线、局部遮罩、实例缓存，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["动画树", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-04-morph-animation-blending-1",
    chapter: "gep2-chapter-04-morph-animation-blending",
    level: 1,
    question: "怎样为第4章 变形动画混合建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“导入形态目标 → 压缩顶点增量 → 构建变形树 → 求解混合权重 → 验证网格输出”复核形态目标、顶点增量、变形树、权重约束、网格一致，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["形态目标", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-04-morph-animation-blending-2",
    chapter: "gep2-chapter-04-morph-animation-blending",
    level: 1,
    question:
      "怎样逐项核对第4章 变形动画混合的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“导入形态目标 → 压缩顶点增量 → 构建变形树 → 求解混合权重 → 验证网格输出”复核形态目标、顶点增量、变形树、权重约束、网格一致，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["顶点增量", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-04-morph-animation-blending-3",
    chapter: "gep2-chapter-04-morph-animation-blending",
    level: 2,
    question: "怎样计算第4章 变形动画混合中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“导入形态目标 → 压缩顶点增量 → 构建变形树 → 求解混合权重 → 验证网格输出”复核形态目标、顶点增量、变形树、权重约束、网格一致，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["变形树", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-04-morph-animation-blending-4",
    chapter: "gep2-chapter-04-morph-animation-blending",
    level: 2,
    question: "怎样验证第4章 变形动画混合没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“导入形态目标 → 压缩顶点增量 → 构建变形树 → 求解混合权重 → 验证网格输出”复核形态目标、顶点增量、变形树、权重约束、网格一致，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["权重约束", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-04-morph-animation-blending-5",
    chapter: "gep2-chapter-04-morph-animation-blending",
    level: 3,
    question:
      "怎样向第4章 变形动画混合注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“导入形态目标 → 压缩顶点增量 → 构建变形树 → 求解混合权重 → 验证网格输出”复核形态目标、顶点增量、变形树、权重约束、网格一致，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["网格一致", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-04-morph-animation-blending-6",
    chapter: "gep2-chapter-04-morph-animation-blending",
    level: 4,
    question: "怎样证明第4章 变形动画混合能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“导入形态目标 → 压缩顶点增量 → 构建变形树 → 求解混合权重 → 验证网格输出”复核形态目标、顶点增量、变形树、权重约束、网格一致，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["形态目标", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-05-ik-characters-1",
    chapter: "gep2-chapter-05-ik-characters",
    level: 1,
    question: "怎样为第5章 IK与角色建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“定义末端目标 → 选择关节链 → 迭代求解约束 → 融合原始姿态 → 验证角色状态”复核末端目标、关节约束、迭代收敛、姿态融合、角色合同，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["末端目标", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-05-ik-characters-2",
    chapter: "gep2-chapter-05-ik-characters",
    level: 1,
    question: "怎样逐项核对第5章 IK与角色的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“定义末端目标 → 选择关节链 → 迭代求解约束 → 融合原始姿态 → 验证角色状态”复核末端目标、关节约束、迭代收敛、姿态融合、角色合同，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["关节约束", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-05-ik-characters-3",
    chapter: "gep2-chapter-05-ik-characters",
    level: 2,
    question: "怎样计算第5章 IK与角色中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“定义末端目标 → 选择关节链 → 迭代求解约束 → 融合原始姿态 → 验证角色状态”复核末端目标、关节约束、迭代收敛、姿态融合、角色合同，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["迭代收敛", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-05-ik-characters-4",
    chapter: "gep2-chapter-05-ik-characters",
    level: 2,
    question: "怎样验证第5章 IK与角色没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“定义末端目标 → 选择关节链 → 迭代求解约束 → 融合原始姿态 → 验证角色状态”复核末端目标、关节约束、迭代收敛、姿态融合、角色合同，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["姿态融合", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-05-ik-characters-5",
    chapter: "gep2-chapter-05-ik-characters",
    level: 3,
    question: "怎样向第5章 IK与角色注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“定义末端目标 → 选择关节链 → 迭代求解约束 → 融合原始姿态 → 验证角色状态”复核末端目标、关节约束、迭代收敛、姿态融合、角色合同，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["角色合同", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-05-ik-characters-6",
    chapter: "gep2-chapter-05-ik-characters",
    level: 4,
    question: "怎样证明第5章 IK与角色能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“定义末端目标 → 选择关节链 → 迭代求解约束 → 融合原始姿态 → 验证角色状态”复核末端目标、关节约束、迭代收敛、姿态融合、角色合同，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["末端目标", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-06-lighting-rendering-history-1",
    chapter: "gep2-chapter-06-lighting-rendering-history",
    level: 1,
    question:
      "怎样为第6章 光照渲染的发展史建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“建立场景基线 → 测量几何负载 → 统计光源覆盖 → 比较带宽成本 → 选择渲染路径”复核几何复杂度、光源覆盖、G缓冲区、分块剔除、路径选择，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["几何复杂度", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-06-lighting-rendering-history-2",
    chapter: "gep2-chapter-06-lighting-rendering-history",
    level: 1,
    question:
      "怎样逐项核对第6章 光照渲染的发展史的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“建立场景基线 → 测量几何负载 → 统计光源覆盖 → 比较带宽成本 → 选择渲染路径”复核几何复杂度、光源覆盖、G缓冲区、分块剔除、路径选择，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["光源覆盖", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-06-lighting-rendering-history-3",
    chapter: "gep2-chapter-06-lighting-rendering-history",
    level: 2,
    question: "怎样计算第6章 光照渲染的发展史中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“建立场景基线 → 测量几何负载 → 统计光源覆盖 → 比较带宽成本 → 选择渲染路径”复核几何复杂度、光源覆盖、G缓冲区、分块剔除、路径选择，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["G缓冲区", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-06-lighting-rendering-history-4",
    chapter: "gep2-chapter-06-lighting-rendering-history",
    level: 2,
    question: "怎样验证第6章 光照渲染的发展史没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“建立场景基线 → 测量几何负载 → 统计光源覆盖 → 比较带宽成本 → 选择渲染路径”复核几何复杂度、光源覆盖、G缓冲区、分块剔除、路径选择，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["分块剔除", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-06-lighting-rendering-history-5",
    chapter: "gep2-chapter-06-lighting-rendering-history",
    level: 3,
    question:
      "怎样向第6章 光照渲染的发展史注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“建立场景基线 → 测量几何负载 → 统计光源覆盖 → 比较带宽成本 → 选择渲染路径”复核几何复杂度、光源覆盖、G缓冲区、分块剔除、路径选择，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["路径选择", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-06-lighting-rendering-history-6",
    chapter: "gep2-chapter-06-lighting-rendering-history",
    level: 4,
    question: "怎样证明第6章 光照渲染的发展史能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“建立场景基线 → 测量几何负载 → 统计光源覆盖 → 比较带宽成本 → 选择渲染路径”复核几何复杂度、光源覆盖、G缓冲区、分块剔除、路径选择，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["几何复杂度", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-07-renderer-interface-1",
    chapter: "gep2-chapter-07-renderer-interface",
    level: 1,
    question: "怎样为第7章 渲染器接口建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“描述设备能力 → 创建渲染资源 → 绑定不可变状态 → 提交绘制命令 → 延迟销毁资源”复核能力查询、资源句柄、状态对象、命令提交、延迟销毁，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["能力查询", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-07-renderer-interface-2",
    chapter: "gep2-chapter-07-renderer-interface",
    level: 1,
    question: "怎样逐项核对第7章 渲染器接口的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“描述设备能力 → 创建渲染资源 → 绑定不可变状态 → 提交绘制命令 → 延迟销毁资源”复核能力查询、资源句柄、状态对象、命令提交、延迟销毁，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["资源句柄", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-07-renderer-interface-3",
    chapter: "gep2-chapter-07-renderer-interface",
    level: 2,
    question: "怎样计算第7章 渲染器接口中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“描述设备能力 → 创建渲染资源 → 绑定不可变状态 → 提交绘制命令 → 延迟销毁资源”复核能力查询、资源句柄、状态对象、命令提交、延迟销毁，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["状态对象", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-07-renderer-interface-4",
    chapter: "gep2-chapter-07-renderer-interface",
    level: 2,
    question: "怎样验证第7章 渲染器接口没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“描述设备能力 → 创建渲染资源 → 绑定不可变状态 → 提交绘制命令 → 延迟销毁资源”复核能力查询、资源句柄、状态对象、命令提交、延迟销毁，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["命令提交", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-07-renderer-interface-5",
    chapter: "gep2-chapter-07-renderer-interface",
    level: 3,
    question: "怎样向第7章 渲染器接口注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“描述设备能力 → 创建渲染资源 → 绑定不可变状态 → 提交绘制命令 → 延迟销毁资源”复核能力查询、资源句柄、状态对象、命令提交、延迟销毁，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["延迟销毁", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-07-renderer-interface-6",
    chapter: "gep2-chapter-07-renderer-interface",
    level: 4,
    question: "怎样证明第7章 渲染器接口能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“描述设备能力 → 创建渲染资源 → 绑定不可变状态 → 提交绘制命令 → 延迟销毁资源”复核能力查询、资源句柄、状态对象、命令提交、延迟销毁，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["能力查询", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-08-materials-1",
    chapter: "gep2-chapter-08-materials",
    level: 1,
    question: "怎样为第8章 材质建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“规范材质参数 → 生成着色器键 → 遍历节点图 → 编译缓存变体 → 绑定材质实例”复核材质参数、着色器键、节点图、变体缓存、材质实例，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["材质参数", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-08-materials-2",
    chapter: "gep2-chapter-08-materials",
    level: 1,
    question: "怎样逐项核对第8章 材质的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“规范材质参数 → 生成着色器键 → 遍历节点图 → 编译缓存变体 → 绑定材质实例”复核材质参数、着色器键、节点图、变体缓存、材质实例，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["着色器键", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-08-materials-3",
    chapter: "gep2-chapter-08-materials",
    level: 2,
    question: "怎样计算第8章 材质中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“规范材质参数 → 生成着色器键 → 遍历节点图 → 编译缓存变体 → 绑定材质实例”复核材质参数、着色器键、节点图、变体缓存、材质实例，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["节点图", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-08-materials-4",
    chapter: "gep2-chapter-08-materials",
    level: 2,
    question: "怎样验证第8章 材质没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“规范材质参数 → 生成着色器键 → 遍历节点图 → 编译缓存变体 → 绑定材质实例”复核材质参数、着色器键、节点图、变体缓存、材质实例，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["变体缓存", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-08-materials-5",
    chapter: "gep2-chapter-08-materials",
    level: 3,
    question: "怎样向第8章 材质注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“规范材质参数 → 生成着色器键 → 遍历节点图 → 编译缓存变体 → 绑定材质实例”复核材质参数、着色器键、节点图、变体缓存、材质实例，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["材质实例", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-08-materials-6",
    chapter: "gep2-chapter-08-materials",
    level: 4,
    question: "怎样证明第8章 材质能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“规范材质参数 → 生成着色器键 → 遍历节点图 → 编译缓存变体 → 绑定材质实例”复核材质参数、着色器键、节点图、变体缓存、材质实例，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["材质参数", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-09-render-pipeline-architecture-1",
    chapter: "gep2-chapter-09-render-pipeline-architecture",
    level: 1,
    question: "怎样为第9章 流程渲染架构建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“收集可见项 → 生成渲染队列 → 分配目标资源 → 执行场景流程 → 提交视图族”复核可见项、渲染队列、目标池、场景流程、视图族，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["可见项", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-09-render-pipeline-architecture-2",
    chapter: "gep2-chapter-09-render-pipeline-architecture",
    level: 1,
    question:
      "怎样逐项核对第9章 流程渲染架构的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“收集可见项 → 生成渲染队列 → 分配目标资源 → 执行场景流程 → 提交视图族”复核可见项、渲染队列、目标池、场景流程、视图族，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["渲染队列", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-09-render-pipeline-architecture-3",
    chapter: "gep2-chapter-09-render-pipeline-architecture",
    level: 2,
    question: "怎样计算第9章 流程渲染架构中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“收集可见项 → 生成渲染队列 → 分配目标资源 → 执行场景流程 → 提交视图族”复核可见项、渲染队列、目标池、场景流程、视图族，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["目标池", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-09-render-pipeline-architecture-4",
    chapter: "gep2-chapter-09-render-pipeline-architecture",
    level: 2,
    question: "怎样验证第9章 流程渲染架构没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“收集可见项 → 生成渲染队列 → 分配目标资源 → 执行场景流程 → 提交视图族”复核可见项、渲染队列、目标池、场景流程、视图族，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["场景流程", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-09-render-pipeline-architecture-5",
    chapter: "gep2-chapter-09-render-pipeline-architecture",
    level: 3,
    question:
      "怎样向第9章 流程渲染架构注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“收集可见项 → 生成渲染队列 → 分配目标资源 → 执行场景流程 → 提交视图族”复核可见项、渲染队列、目标池、场景流程、视图族，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["视图族", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-09-render-pipeline-architecture-6",
    chapter: "gep2-chapter-09-render-pipeline-architecture",
    level: 4,
    question: "怎样证明第9章 流程渲染架构能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“收集可见项 → 生成渲染队列 → 分配目标资源 → 执行场景流程 → 提交视图族”复核可见项、渲染队列、目标池、场景流程、视图族，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["可见项", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-10-lighting-materials-1",
    chapter: "gep2-chapter-10-lighting-materials",
    level: 1,
    question: "怎样为第10章 光照与材质建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“分类场景光源 → 选择材质通道 → 累积直接光 → 组合间接光 → 验证投射函数”复核光源分类、材质通道、直接光、间接光、投射函数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["光源分类", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-10-lighting-materials-2",
    chapter: "gep2-chapter-10-lighting-materials",
    level: 1,
    question: "怎样逐项核对第10章 光照与材质的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“分类场景光源 → 选择材质通道 → 累积直接光 → 组合间接光 → 验证投射函数”复核光源分类、材质通道、直接光、间接光、投射函数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["材质通道", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-10-lighting-materials-3",
    chapter: "gep2-chapter-10-lighting-materials",
    level: 2,
    question: "怎样计算第10章 光照与材质中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“分类场景光源 → 选择材质通道 → 累积直接光 → 组合间接光 → 验证投射函数”复核光源分类、材质通道、直接光、间接光、投射函数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["直接光", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-10-lighting-materials-4",
    chapter: "gep2-chapter-10-lighting-materials",
    level: 2,
    question: "怎样验证第10章 光照与材质没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“分类场景光源 → 选择材质通道 → 累积直接光 → 组合间接光 → 验证投射函数”复核光源分类、材质通道、直接光、间接光、投射函数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["间接光", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-10-lighting-materials-5",
    chapter: "gep2-chapter-10-lighting-materials",
    level: 3,
    question: "怎样向第10章 光照与材质注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“分类场景光源 → 选择材质通道 → 累积直接光 → 组合间接光 → 验证投射函数”复核光源分类、材质通道、直接光、间接光、投射函数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["投射函数", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-10-lighting-materials-6",
    chapter: "gep2-chapter-10-lighting-materials",
    level: 4,
    question: "怎样证明第10章 光照与材质能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“分类场景光源 → 选择材质通道 → 累积直接光 → 组合间接光 → 验证投射函数”复核光源分类、材质通道、直接光、间接光、投射函数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["光源分类", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-11-post-effects-1",
    chapter: "gep2-chapter-11-post-effects",
    level: 1,
    question: "怎样为第11章 后期效果建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“读取场景输出 → 声明效果依赖 → 分配临时目标 → 执行后期材质 → 合成最终画面”复核场景输出、效果依赖、临时目标、后期材质、画质验证，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["场景输出", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-11-post-effects-2",
    chapter: "gep2-chapter-11-post-effects",
    level: 1,
    question: "怎样逐项核对第11章 后期效果的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“读取场景输出 → 声明效果依赖 → 分配临时目标 → 执行后期材质 → 合成最终画面”复核场景输出、效果依赖、临时目标、后期材质、画质验证，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["效果依赖", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-11-post-effects-3",
    chapter: "gep2-chapter-11-post-effects",
    level: 2,
    question: "怎样计算第11章 后期效果中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“读取场景输出 → 声明效果依赖 → 分配临时目标 → 执行后期材质 → 合成最终画面”复核场景输出、效果依赖、临时目标、后期材质、画质验证，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["临时目标", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-11-post-effects-4",
    chapter: "gep2-chapter-11-post-effects",
    level: 2,
    question: "怎样验证第11章 后期效果没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“读取场景输出 → 声明效果依赖 → 分配临时目标 → 执行后期材质 → 合成最终画面”复核场景输出、效果依赖、临时目标、后期材质、画质验证，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["后期材质", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-11-post-effects-5",
    chapter: "gep2-chapter-11-post-effects",
    level: 3,
    question: "怎样向第11章 后期效果注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“读取场景输出 → 声明效果依赖 → 分配临时目标 → 执行后期材质 → 合成最终画面”复核场景输出、效果依赖、临时目标、后期材质、画质验证，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["画质验证", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-11-post-effects-6",
    chapter: "gep2-chapter-11-post-effects",
    level: 4,
    question: "怎样证明第11章 后期效果能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“读取场景输出 → 声明效果依赖 → 分配临时目标 → 执行后期材质 → 合成最终画面”复核场景输出、效果依赖、临时目标、后期材质、画质验证，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["场景输出", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-12-shadows-1",
    chapter: "gep2-chapter-12-shadows",
    level: 1,
    question: "怎样为第12章 阴影建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“选择投影模型 → 构建遮挡表示 → 分配阴影预算 → 采样并过滤 → 验证漏光与抖动”复核投影模型、遮挡表示、阴影预算、偏差控制、级联稳定，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["投影模型", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-12-shadows-2",
    chapter: "gep2-chapter-12-shadows",
    level: 1,
    question: "怎样逐项核对第12章 阴影的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“选择投影模型 → 构建遮挡表示 → 分配阴影预算 → 采样并过滤 → 验证漏光与抖动”复核投影模型、遮挡表示、阴影预算、偏差控制、级联稳定，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["遮挡表示", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-12-shadows-3",
    chapter: "gep2-chapter-12-shadows",
    level: 2,
    question: "怎样计算第12章 阴影中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“选择投影模型 → 构建遮挡表示 → 分配阴影预算 → 采样并过滤 → 验证漏光与抖动”复核投影模型、遮挡表示、阴影预算、偏差控制、级联稳定，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["阴影预算", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-12-shadows-4",
    chapter: "gep2-chapter-12-shadows",
    level: 2,
    question: "怎样验证第12章 阴影没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“选择投影模型 → 构建遮挡表示 → 分配阴影预算 → 采样并过滤 → 验证漏光与抖动”复核投影模型、遮挡表示、阴影预算、偏差控制、级联稳定，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["偏差控制", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-12-shadows-5",
    chapter: "gep2-chapter-12-shadows",
    level: 3,
    question: "怎样向第12章 阴影注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“选择投影模型 → 构建遮挡表示 → 分配阴影预算 → 采样并过滤 → 验证漏光与抖动”复核投影模型、遮挡表示、阴影预算、偏差控制、级联稳定，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["级联稳定", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-12-shadows-6",
    chapter: "gep2-chapter-12-shadows",
    level: 4,
    question: "怎样证明第12章 阴影能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“选择投影模型 → 构建遮挡表示 → 分配阴影预算 → 采样并过滤 → 验证漏光与抖动”复核投影模型、遮挡表示、阴影预算、偏差控制、级联稳定，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["投影模型", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-13-multithreading-1",
    chapter: "gep2-chapter-13-multithreading",
    level: 1,
    question: "怎样为第13章 多线程建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“建立任务依赖 → 隔离线程所有权 → 分发更新命令 → 同步渲染资源 → 回放并发证据”复核任务依赖、线程所有权、命令队列、资源栅栏、并发回放，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["任务依赖", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-13-multithreading-2",
    chapter: "gep2-chapter-13-multithreading",
    level: 1,
    question: "怎样逐项核对第13章 多线程的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“建立任务依赖 → 隔离线程所有权 → 分发更新命令 → 同步渲染资源 → 回放并发证据”复核任务依赖、线程所有权、命令队列、资源栅栏、并发回放，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["线程所有权", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-13-multithreading-3",
    chapter: "gep2-chapter-13-multithreading",
    level: 2,
    question: "怎样计算第13章 多线程中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“建立任务依赖 → 隔离线程所有权 → 分发更新命令 → 同步渲染资源 → 回放并发证据”复核任务依赖、线程所有权、命令队列、资源栅栏、并发回放，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["命令队列", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-13-multithreading-4",
    chapter: "gep2-chapter-13-multithreading",
    level: 2,
    question: "怎样验证第13章 多线程没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“建立任务依赖 → 隔离线程所有权 → 分发更新命令 → 同步渲染资源 → 回放并发证据”复核任务依赖、线程所有权、命令队列、资源栅栏、并发回放，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["资源栅栏", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-13-multithreading-5",
    chapter: "gep2-chapter-13-multithreading",
    level: 3,
    question: "怎样向第13章 多线程注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“建立任务依赖 → 隔离线程所有权 → 分发更新命令 → 同步渲染资源 → 回放并发证据”复核任务依赖、线程所有权、命令队列、资源栅栏、并发回放，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["并发回放", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-13-multithreading-6",
    chapter: "gep2-chapter-13-multithreading",
    level: 4,
    question: "怎样证明第13章 多线程能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“建立任务依赖 → 隔离线程所有权 → 分发更新命令 → 同步渲染资源 → 回放并发证据”复核任务依赖、线程所有权、命令队列、资源栅栏、并发回放，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["任务依赖", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-chapter-14-dynamic-buffers-profiler-1",
    chapter: "gep2-chapter-14-dynamic-buffers-profiler",
    level: 1,
    question:
      "怎样为第14章 动态缓冲区与性能分析器建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“预算动态容量 → 分配环形区间 → 插入GPU栅栏 → 采集层级事件 → 比较帧分位数”复核环形缓冲、写入策略、GPU栅栏、层级事件、帧分位数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["环形缓冲", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-14-dynamic-buffers-profiler-2",
    chapter: "gep2-chapter-14-dynamic-buffers-profiler",
    level: 1,
    question:
      "怎样逐项核对第14章 动态缓冲区与性能分析器的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“预算动态容量 → 分配环形区间 → 插入GPU栅栏 → 采集层级事件 → 比较帧分位数”复核环形缓冲、写入策略、GPU栅栏、层级事件、帧分位数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["写入策略", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-chapter-14-dynamic-buffers-profiler-3",
    chapter: "gep2-chapter-14-dynamic-buffers-profiler",
    level: 2,
    question: "怎样计算第14章 动态缓冲区与性能分析器中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“预算动态容量 → 分配环形区间 → 插入GPU栅栏 → 采集层级事件 → 比较帧分位数”复核环形缓冲、写入策略、GPU栅栏、层级事件、帧分位数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["GPU栅栏", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-14-dynamic-buffers-profiler-4",
    chapter: "gep2-chapter-14-dynamic-buffers-profiler",
    level: 2,
    question:
      "怎样验证第14章 动态缓冲区与性能分析器没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“预算动态容量 → 分配环形区间 → 插入GPU栅栏 → 采集层级事件 → 比较帧分位数”复核环形缓冲、写入策略、GPU栅栏、层级事件、帧分位数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["层级事件", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-chapter-14-dynamic-buffers-profiler-5",
    chapter: "gep2-chapter-14-dynamic-buffers-profiler",
    level: 3,
    question:
      "怎样向第14章 动态缓冲区与性能分析器注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“预算动态容量 → 分配环形区间 → 插入GPU栅栏 → 采集层级事件 → 比较帧分位数”复核环形缓冲、写入策略、GPU栅栏、层级事件、帧分位数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["帧分位数", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-chapter-14-dynamic-buffers-profiler-6",
    chapter: "gep2-chapter-14-dynamic-buffers-profiler",
    level: 4,
    question:
      "怎样证明第14章 动态缓冲区与性能分析器能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“预算动态容量 → 分配环形区间 → 插入GPU栅栏 → 采集层级事件 → 比较帧分位数”复核环形缓冲、写入策略、GPU栅栏、层级事件、帧分位数，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["环形缓冲", "人邮2021卷2", "level-4"],
  },
  {
    id: "gep2-official-final-review-1",
    chapter: "gep2-official-final-review",
    level: 1,
    question:
      "怎样为《游戏引擎原理与实践·卷2：高级技术》全书总复习建立资产、资源、线程与生命周期边界？",
    answer:
      "先画所有权和状态图，声明每个阶段的输入代际、执行线程、输出版本与失败回收。 沿“重放动画证据 → 复核材质变体 → 审计渲染依赖 → 注入并发故障 → 签收性能预算”复核姿态证据、变体证据、依赖证据、并发证据、预算签收，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["姿态证据", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-official-final-review-2",
    chapter: "gep2-official-final-review",
    level: 1,
    question:
      "怎样逐项核对《游戏引擎原理与实践·卷2：高级技术》全书总复习的权威目录节点而不遗漏示例与练习？",
    answer:
      "按目录顺序为每个节点写出机制、可观察状态、适用边界和至少一个反例，再由清单复核。 沿“重放动画证据 → 复核材质变体 → 审计渲染依赖 → 注入并发故障 → 签收性能预算”复核姿态证据、变体证据、依赖证据、并发证据、预算签收，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["变体证据", "人邮2021卷2", "level-1"],
  },
  {
    id: "gep2-official-final-review-3",
    chapter: "gep2-official-final-review",
    level: 2,
    question:
      "怎样计算《游戏引擎原理与实践·卷2：高级技术》全书总复习中的姿态、渲染与帧预算？",
    answer:
      "固定资产、输入和设备，分别计算姿态误差、CPU/GPU时间、同步等待、峰值内存和缓存冷热命中。 沿“重放动画证据 → 复核材质变体 → 审计渲染依赖 → 注入并发故障 → 签收性能预算”复核姿态证据、变体证据、依赖证据、并发证据、预算签收，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["依赖证据", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-official-final-review-4",
    chapter: "gep2-official-final-review",
    level: 2,
    question:
      "怎样验证《游戏引擎原理与实践·卷2：高级技术》全书总复习没有留下飞行资源或半更新帧？",
    answer:
      "用资产代际、帧快照、命令序号、资源栅栏和延迟回收轨迹交叉核对最后读者。 沿“重放动画证据 → 复核材质变体 → 审计渲染依赖 → 注入并发故障 → 签收性能预算”复核姿态证据、变体证据、依赖证据、并发证据、预算签收，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["并发证据", "人邮2021卷2", "level-2"],
  },
  {
    id: "gep2-official-final-review-5",
    chapter: "gep2-official-final-review",
    level: 3,
    question:
      "怎样向《游戏引擎原理与实践·卷2：高级技术》全书总复习注入规模压力或资源迟到并定位首个失效点？",
    answer:
      "一次只改变对象、变体、线程或I/O条件，先预测，再保存异常帧前后的状态与时间线。 沿“重放动画证据 → 复核材质变体 → 审计渲染依赖 → 注入并发故障 → 签收性能预算”复核姿态证据、变体证据、依赖证据、并发证据、预算签收，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["预算签收", "人邮2021卷2", "level-3"],
  },
  {
    id: "gep2-official-final-review-6",
    chapter: "gep2-official-final-review",
    level: 4,
    question:
      "怎样证明《游戏引擎原理与实践·卷2：高级技术》全书总复习能迁移到另一套引擎或图形后端？",
    answer:
      "更换API和类型名但保持数据、所有权、阶段、预算与证据合同，由独立复核者重现实验。 沿“重放动画证据 → 复核材质变体 → 审计渲染依赖 → 注入并发故障 → 签收性能预算”复核姿态证据、变体证据、依赖证据、并发证据、预算签收，保存构建、设备、资产ID、帧号、CPU/GPU事件与最终状态。",
    tags: ["姿态证据", "人邮2021卷2", "level-4"],
  },
];
