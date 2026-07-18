import type { ReviewQuestion } from "../review-questions";

export const rtcd25OfficialQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-official-learning-map-1",
    chapter: "rtcd-official-learning-map",
    level: 1,
    question:
      "怎样为《实时碰撞检测算法技术》权威学习地图定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“定义查询合同 → 建立几何内核 → 生成候选对 → 执行精确查询 → 复核鲁棒性能”复核查询合同、几何内核、候选对、精确查询、鲁棒性能，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["查询合同", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-official-learning-map-2",
    chapter: "rtcd-official-learning-map",
    level: 1,
    question:
      "怎样逐项核对《实时碰撞检测算法技术》权威学习地图的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“定义查询合同 → 建立几何内核 → 生成候选对 → 执行精确查询 → 复核鲁棒性能”复核查询合同、几何内核、候选对、精确查询、鲁棒性能，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["几何内核", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-official-learning-map-3",
    chapter: "rtcd-official-learning-map",
    level: 2,
    question:
      "怎样推导并复算《实时碰撞检测算法技术》权威学习地图的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“定义查询合同 → 建立几何内核 → 生成候选对 → 执行精确查询 → 复核鲁棒性能”复核查询合同、几何内核、候选对、精确查询、鲁棒性能，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["候选对", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-official-learning-map-4",
    chapter: "rtcd-official-learning-map",
    level: 2,
    question:
      "怎样验证《实时碰撞检测算法技术》权威学习地图对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“定义查询合同 → 建立几何内核 → 生成候选对 → 执行精确查询 → 复核鲁棒性能”复核查询合同、几何内核、候选对、精确查询、鲁棒性能，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["精确查询", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-official-learning-map-5",
    chapter: "rtcd-official-learning-map",
    level: 3,
    question:
      "怎样向《实时碰撞检测算法技术》权威学习地图施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“定义查询合同 → 建立几何内核 → 生成候选对 → 执行精确查询 → 复核鲁棒性能”复核查询合同、几何内核、候选对、精确查询、鲁棒性能，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["鲁棒性能", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-official-learning-map-6",
    chapter: "rtcd-official-learning-map",
    level: 4,
    question:
      "怎样证明《实时碰撞检测算法技术》权威学习地图能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“定义查询合同 → 建立几何内核 → 生成候选对 → 执行精确查询 → 复核鲁棒性能”复核查询合同、几何内核、候选对、精确查询、鲁棒性能，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["查询合同", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-front-matter-1",
    chapter: "rtcd-front-matter",
    level: 1,
    question:
      "怎样为前置资料：版本、作者、图表与前言定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“固定版次 → 核对作者语境 → 建立图表索引 → 校准代码环境 → 声明复现实验”复核版次坐标、作者语境、图表索引、代码环境、实验合同，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["版次坐标", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-front-matter-2",
    chapter: "rtcd-front-matter",
    level: 1,
    question: "怎样逐项核对前置资料：版本、作者、图表与前言的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“固定版次 → 核对作者语境 → 建立图表索引 → 校准代码环境 → 声明复现实验”复核版次坐标、作者语境、图表索引、代码环境、实验合同，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["作者语境", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-front-matter-3",
    chapter: "rtcd-front-matter",
    level: 2,
    question:
      "怎样推导并复算前置资料：版本、作者、图表与前言的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“固定版次 → 核对作者语境 → 建立图表索引 → 校准代码环境 → 声明复现实验”复核版次坐标、作者语境、图表索引、代码环境、实验合同，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["图表索引", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-front-matter-4",
    chapter: "rtcd-front-matter",
    level: 2,
    question:
      "怎样验证前置资料：版本、作者、图表与前言对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“固定版次 → 核对作者语境 → 建立图表索引 → 校准代码环境 → 声明复现实验”复核版次坐标、作者语境、图表索引、代码环境、实验合同，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["代码环境", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-front-matter-5",
    chapter: "rtcd-front-matter",
    level: 3,
    question:
      "怎样向前置资料：版本、作者、图表与前言施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“固定版次 → 核对作者语境 → 建立图表索引 → 校准代码环境 → 声明复现实验”复核版次坐标、作者语境、图表索引、代码环境、实验合同，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["实验合同", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-front-matter-6",
    chapter: "rtcd-front-matter",
    level: 4,
    question:
      "怎样证明前置资料：版本、作者、图表与前言能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“固定版次 → 核对作者语境 → 建立图表索引 → 校准代码环境 → 声明复现实验”复核版次坐标、作者语境、图表索引、代码环境、实验合同，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["版次坐标", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-01-introduction-1",
    chapter: "rtcd-chapter-01-introduction",
    level: 1,
    question: "怎样为Chapter 1 Introduction定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“识别查询类型 → 选择几何表示 → 组织空间结构 → 执行精确测试 → 复核鲁棒与性能”复核查询类型、几何表示、空间结构、精确测试、代码复核，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["查询类型", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-01-introduction-2",
    chapter: "rtcd-chapter-01-introduction",
    level: 1,
    question: "怎样逐项核对Chapter 1 Introduction的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“识别查询类型 → 选择几何表示 → 组织空间结构 → 执行精确测试 → 复核鲁棒与性能”复核查询类型、几何表示、空间结构、精确测试、代码复核，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["几何表示", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-01-introduction-3",
    chapter: "rtcd-chapter-01-introduction",
    level: 2,
    question: "怎样推导并复算Chapter 1 Introduction的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“识别查询类型 → 选择几何表示 → 组织空间结构 → 执行精确测试 → 复核鲁棒与性能”复核查询类型、几何表示、空间结构、精确测试、代码复核，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["空间结构", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-01-introduction-4",
    chapter: "rtcd-chapter-01-introduction",
    level: 2,
    question:
      "怎样验证Chapter 1 Introduction对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“识别查询类型 → 选择几何表示 → 组织空间结构 → 执行精确测试 → 复核鲁棒与性能”复核查询类型、几何表示、空间结构、精确测试、代码复核，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["精确测试", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-01-introduction-5",
    chapter: "rtcd-chapter-01-introduction",
    level: 3,
    question: "怎样向Chapter 1 Introduction施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“识别查询类型 → 选择几何表示 → 组织空间结构 → 执行精确测试 → 复核鲁棒与性能”复核查询类型、几何表示、空间结构、精确测试、代码复核，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["代码复核", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-01-introduction-6",
    chapter: "rtcd-chapter-01-introduction",
    level: 4,
    question: "怎样证明Chapter 1 Introduction能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“识别查询类型 → 选择几何表示 → 组织空间结构 → 执行精确测试 → 复核鲁棒与性能”复核查询类型、几何表示、空间结构、精确测试、代码复核，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["查询类型", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-02-design-issues-1",
    chapter: "rtcd-chapter-02-design-issues",
    level: 1,
    question:
      "怎样为Chapter 2 Collision Detection Design Issues定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“冻结应用域 → 定义查询合同 → 估计对象与运动 → 设置鲁棒边界 → 建立调试证据”复核应用域、查询合同、运动模型、性能预算、调试证据，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["应用域", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-02-design-issues-2",
    chapter: "rtcd-chapter-02-design-issues",
    level: 1,
    question:
      "怎样逐项核对Chapter 2 Collision Detection Design Issues的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“冻结应用域 → 定义查询合同 → 估计对象与运动 → 设置鲁棒边界 → 建立调试证据”复核应用域、查询合同、运动模型、性能预算、调试证据，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["查询合同", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-02-design-issues-3",
    chapter: "rtcd-chapter-02-design-issues",
    level: 2,
    question:
      "怎样推导并复算Chapter 2 Collision Detection Design Issues的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“冻结应用域 → 定义查询合同 → 估计对象与运动 → 设置鲁棒边界 → 建立调试证据”复核应用域、查询合同、运动模型、性能预算、调试证据，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["运动模型", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-02-design-issues-4",
    chapter: "rtcd-chapter-02-design-issues",
    level: 2,
    question:
      "怎样验证Chapter 2 Collision Detection Design Issues对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“冻结应用域 → 定义查询合同 → 估计对象与运动 → 设置鲁棒边界 → 建立调试证据”复核应用域、查询合同、运动模型、性能预算、调试证据，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["性能预算", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-02-design-issues-5",
    chapter: "rtcd-chapter-02-design-issues",
    level: 3,
    question:
      "怎样向Chapter 2 Collision Detection Design Issues施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“冻结应用域 → 定义查询合同 → 估计对象与运动 → 设置鲁棒边界 → 建立调试证据”复核应用域、查询合同、运动模型、性能预算、调试证据，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["调试证据", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-02-design-issues-6",
    chapter: "rtcd-chapter-02-design-issues",
    level: 4,
    question:
      "怎样证明Chapter 2 Collision Detection Design Issues能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“冻结应用域 → 定义查询合同 → 估计对象与运动 → 设置鲁棒边界 → 建立调试证据”复核应用域、查询合同、运动模型、性能预算、调试证据，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["应用域", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-03-math-geometry-primer-1",
    chapter: "rtcd-chapter-03-math-geometry-primer",
    level: 1,
    question:
      "怎样为Chapter 3 A Math and Geometry Primer定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“统一坐标约定 → 构造几何谓词 → 表达基本图元 → 建立凸性结构 → 验证退化输入”复核坐标约定、方向谓词、重心坐标、凸包结构、退化输入，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["坐标约定", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-03-math-geometry-primer-2",
    chapter: "rtcd-chapter-03-math-geometry-primer",
    level: 1,
    question:
      "怎样逐项核对Chapter 3 A Math and Geometry Primer的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“统一坐标约定 → 构造几何谓词 → 表达基本图元 → 建立凸性结构 → 验证退化输入”复核坐标约定、方向谓词、重心坐标、凸包结构、退化输入，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["方向谓词", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-03-math-geometry-primer-3",
    chapter: "rtcd-chapter-03-math-geometry-primer",
    level: 2,
    question:
      "怎样推导并复算Chapter 3 A Math and Geometry Primer的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“统一坐标约定 → 构造几何谓词 → 表达基本图元 → 建立凸性结构 → 验证退化输入”复核坐标约定、方向谓词、重心坐标、凸包结构、退化输入，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["重心坐标", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-03-math-geometry-primer-4",
    chapter: "rtcd-chapter-03-math-geometry-primer",
    level: 2,
    question:
      "怎样验证Chapter 3 A Math and Geometry Primer对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“统一坐标约定 → 构造几何谓词 → 表达基本图元 → 建立凸性结构 → 验证退化输入”复核坐标约定、方向谓词、重心坐标、凸包结构、退化输入，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["凸包结构", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-03-math-geometry-primer-5",
    chapter: "rtcd-chapter-03-math-geometry-primer",
    level: 3,
    question:
      "怎样向Chapter 3 A Math and Geometry Primer施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“统一坐标约定 → 构造几何谓词 → 表达基本图元 → 建立凸性结构 → 验证退化输入”复核坐标约定、方向谓词、重心坐标、凸包结构、退化输入，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["退化输入", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-03-math-geometry-primer-6",
    chapter: "rtcd-chapter-03-math-geometry-primer",
    level: 4,
    question:
      "怎样证明Chapter 3 A Math and Geometry Primer能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“统一坐标约定 → 构造几何谓词 → 表达基本图元 → 建立凸性结构 → 验证退化输入”复核坐标约定、方向谓词、重心坐标、凸包结构、退化输入，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["坐标约定", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-04-bounding-volumes-1",
    chapter: "rtcd-chapter-04-bounding-volumes",
    level: 1,
    question:
      "怎样为Chapter 4 Bounding Volumes定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“选定包围体 → 离线拟合 → 运行时更新 → 执行重叠测试 → 比较紧致与成本”复核紧致性、拟合成本、更新成本、分离轴、重叠测试，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["紧致性", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-04-bounding-volumes-2",
    chapter: "rtcd-chapter-04-bounding-volumes",
    level: 1,
    question: "怎样逐项核对Chapter 4 Bounding Volumes的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“选定包围体 → 离线拟合 → 运行时更新 → 执行重叠测试 → 比较紧致与成本”复核紧致性、拟合成本、更新成本、分离轴、重叠测试，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["拟合成本", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-04-bounding-volumes-3",
    chapter: "rtcd-chapter-04-bounding-volumes",
    level: 2,
    question: "怎样推导并复算Chapter 4 Bounding Volumes的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“选定包围体 → 离线拟合 → 运行时更新 → 执行重叠测试 → 比较紧致与成本”复核紧致性、拟合成本、更新成本、分离轴、重叠测试，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["更新成本", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-04-bounding-volumes-4",
    chapter: "rtcd-chapter-04-bounding-volumes",
    level: 2,
    question:
      "怎样验证Chapter 4 Bounding Volumes对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“选定包围体 → 离线拟合 → 运行时更新 → 执行重叠测试 → 比较紧致与成本”复核紧致性、拟合成本、更新成本、分离轴、重叠测试，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["分离轴", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-04-bounding-volumes-5",
    chapter: "rtcd-chapter-04-bounding-volumes",
    level: 3,
    question: "怎样向Chapter 4 Bounding Volumes施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“选定包围体 → 离线拟合 → 运行时更新 → 执行重叠测试 → 比较紧致与成本”复核紧致性、拟合成本、更新成本、分离轴、重叠测试，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["重叠测试", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-04-bounding-volumes-6",
    chapter: "rtcd-chapter-04-bounding-volumes",
    level: 4,
    question:
      "怎样证明Chapter 4 Bounding Volumes能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“选定包围体 → 离线拟合 → 运行时更新 → 执行重叠测试 → 比较紧致与成本”复核紧致性、拟合成本、更新成本、分离轴、重叠测试，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["紧致性", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-05-basic-primitive-tests-1",
    chapter: "rtcd-chapter-05-basic-primitive-tests",
    level: 1,
    question:
      "怎样为Chapter 5 Basic Primitive Tests定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“归约最近点 → 构造静态谓词 → 求解射线区间 → 处理包含关系 → 求首次接触时间”复核最近点、静态相交、射线区间、包含谓词、首次接触，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["最近点", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-05-basic-primitive-tests-2",
    chapter: "rtcd-chapter-05-basic-primitive-tests",
    level: 1,
    question: "怎样逐项核对Chapter 5 Basic Primitive Tests的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“归约最近点 → 构造静态谓词 → 求解射线区间 → 处理包含关系 → 求首次接触时间”复核最近点、静态相交、射线区间、包含谓词、首次接触，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["静态相交", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-05-basic-primitive-tests-3",
    chapter: "rtcd-chapter-05-basic-primitive-tests",
    level: 2,
    question: "怎样推导并复算Chapter 5 Basic Primitive Tests的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“归约最近点 → 构造静态谓词 → 求解射线区间 → 处理包含关系 → 求首次接触时间”复核最近点、静态相交、射线区间、包含谓词、首次接触，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["射线区间", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-05-basic-primitive-tests-4",
    chapter: "rtcd-chapter-05-basic-primitive-tests",
    level: 2,
    question:
      "怎样验证Chapter 5 Basic Primitive Tests对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“归约最近点 → 构造静态谓词 → 求解射线区间 → 处理包含关系 → 求首次接触时间”复核最近点、静态相交、射线区间、包含谓词、首次接触，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["包含谓词", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-05-basic-primitive-tests-5",
    chapter: "rtcd-chapter-05-basic-primitive-tests",
    level: 3,
    question:
      "怎样向Chapter 5 Basic Primitive Tests施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“归约最近点 → 构造静态谓词 → 求解射线区间 → 处理包含关系 → 求首次接触时间”复核最近点、静态相交、射线区间、包含谓词、首次接触，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["首次接触", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-05-basic-primitive-tests-6",
    chapter: "rtcd-chapter-05-basic-primitive-tests",
    level: 4,
    question:
      "怎样证明Chapter 5 Basic Primitive Tests能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“归约最近点 → 构造静态谓词 → 求解射线区间 → 处理包含关系 → 求首次接触时间”复核最近点、静态相交、射线区间、包含谓词、首次接触，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["最近点", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-06-bounding-volume-hierarchies-1",
    chapter: "rtcd-chapter-06-bounding-volume-hierarchies",
    level: 1,
    question:
      "怎样为Chapter 6 Bounding Volume Hierarchies定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“定义层次代价 → 构建树结构 → 执行双树遍历 → 压紧节点布局 → 利用时空一致性”复核层次代价、构建策略、双树遍历、紧凑布局、时空缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["层次代价", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-06-bounding-volume-hierarchies-2",
    chapter: "rtcd-chapter-06-bounding-volume-hierarchies",
    level: 1,
    question:
      "怎样逐项核对Chapter 6 Bounding Volume Hierarchies的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“定义层次代价 → 构建树结构 → 执行双树遍历 → 压紧节点布局 → 利用时空一致性”复核层次代价、构建策略、双树遍历、紧凑布局、时空缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["构建策略", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-06-bounding-volume-hierarchies-3",
    chapter: "rtcd-chapter-06-bounding-volume-hierarchies",
    level: 2,
    question:
      "怎样推导并复算Chapter 6 Bounding Volume Hierarchies的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“定义层次代价 → 构建树结构 → 执行双树遍历 → 压紧节点布局 → 利用时空一致性”复核层次代价、构建策略、双树遍历、紧凑布局、时空缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["双树遍历", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-06-bounding-volume-hierarchies-4",
    chapter: "rtcd-chapter-06-bounding-volume-hierarchies",
    level: 2,
    question:
      "怎样验证Chapter 6 Bounding Volume Hierarchies对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“定义层次代价 → 构建树结构 → 执行双树遍历 → 压紧节点布局 → 利用时空一致性”复核层次代价、构建策略、双树遍历、紧凑布局、时空缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["紧凑布局", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-06-bounding-volume-hierarchies-5",
    chapter: "rtcd-chapter-06-bounding-volume-hierarchies",
    level: 3,
    question:
      "怎样向Chapter 6 Bounding Volume Hierarchies施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“定义层次代价 → 构建树结构 → 执行双树遍历 → 压紧节点布局 → 利用时空一致性”复核层次代价、构建策略、双树遍历、紧凑布局、时空缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["时空缓存", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-06-bounding-volume-hierarchies-6",
    chapter: "rtcd-chapter-06-bounding-volume-hierarchies",
    level: 4,
    question:
      "怎样证明Chapter 6 Bounding Volume Hierarchies能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“定义层次代价 → 构建树结构 → 执行双树遍历 → 压紧节点布局 → 利用时空一致性”复核层次代价、构建策略、双树遍历、紧凑布局、时空缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["层次代价", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-07-spatial-partitioning-1",
    chapter: "rtcd-chapter-07-spatial-partitioning",
    level: 1,
    question:
      "怎样为Chapter 7 Spatial Partitioning定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“选择空间尺度 → 分配对象到单元 → 遍历查询路径 → 生成候选对 → 消除重复测试”复核空间尺度、对象分桶、查询遍历、候选对、测试去重，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["空间尺度", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-07-spatial-partitioning-2",
    chapter: "rtcd-chapter-07-spatial-partitioning",
    level: 1,
    question: "怎样逐项核对Chapter 7 Spatial Partitioning的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“选择空间尺度 → 分配对象到单元 → 遍历查询路径 → 生成候选对 → 消除重复测试”复核空间尺度、对象分桶、查询遍历、候选对、测试去重，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["对象分桶", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-07-spatial-partitioning-3",
    chapter: "rtcd-chapter-07-spatial-partitioning",
    level: 2,
    question: "怎样推导并复算Chapter 7 Spatial Partitioning的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“选择空间尺度 → 分配对象到单元 → 遍历查询路径 → 生成候选对 → 消除重复测试”复核空间尺度、对象分桶、查询遍历、候选对、测试去重，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["查询遍历", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-07-spatial-partitioning-4",
    chapter: "rtcd-chapter-07-spatial-partitioning",
    level: 2,
    question:
      "怎样验证Chapter 7 Spatial Partitioning对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“选择空间尺度 → 分配对象到单元 → 遍历查询路径 → 生成候选对 → 消除重复测试”复核空间尺度、对象分桶、查询遍历、候选对、测试去重，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["候选对", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-07-spatial-partitioning-5",
    chapter: "rtcd-chapter-07-spatial-partitioning",
    level: 3,
    question:
      "怎样向Chapter 7 Spatial Partitioning施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“选择空间尺度 → 分配对象到单元 → 遍历查询路径 → 生成候选对 → 消除重复测试”复核空间尺度、对象分桶、查询遍历、候选对、测试去重，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["测试去重", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-07-spatial-partitioning-6",
    chapter: "rtcd-chapter-07-spatial-partitioning",
    level: 4,
    question:
      "怎样证明Chapter 7 Spatial Partitioning能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“选择空间尺度 → 分配对象到单元 → 遍历查询路径 → 生成候选对 → 消除重复测试”复核空间尺度、对象分桶、查询遍历、候选对、测试去重，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["空间尺度", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-08-bsp-tree-hierarchies-1",
    chapter: "rtcd-chapter-08-bsp-tree-hierarchies",
    level: 1,
    question:
      "怎样为Chapter 8 BSP Tree Hierarchies定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“选择分割平面 → 分类并切分多边形 → 构建叶语义 → 遍历点与射线 → 验证分割鲁棒性”复核分割平面、多边形分类、叶语义、查询遍历、分割鲁棒，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["分割平面", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-08-bsp-tree-hierarchies-2",
    chapter: "rtcd-chapter-08-bsp-tree-hierarchies",
    level: 1,
    question: "怎样逐项核对Chapter 8 BSP Tree Hierarchies的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“选择分割平面 → 分类并切分多边形 → 构建叶语义 → 遍历点与射线 → 验证分割鲁棒性”复核分割平面、多边形分类、叶语义、查询遍历、分割鲁棒，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["多边形分类", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-08-bsp-tree-hierarchies-3",
    chapter: "rtcd-chapter-08-bsp-tree-hierarchies",
    level: 2,
    question: "怎样推导并复算Chapter 8 BSP Tree Hierarchies的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“选择分割平面 → 分类并切分多边形 → 构建叶语义 → 遍历点与射线 → 验证分割鲁棒性”复核分割平面、多边形分类、叶语义、查询遍历、分割鲁棒，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["叶语义", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-08-bsp-tree-hierarchies-4",
    chapter: "rtcd-chapter-08-bsp-tree-hierarchies",
    level: 2,
    question:
      "怎样验证Chapter 8 BSP Tree Hierarchies对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“选择分割平面 → 分类并切分多边形 → 构建叶语义 → 遍历点与射线 → 验证分割鲁棒性”复核分割平面、多边形分类、叶语义、查询遍历、分割鲁棒，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["查询遍历", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-08-bsp-tree-hierarchies-5",
    chapter: "rtcd-chapter-08-bsp-tree-hierarchies",
    level: 3,
    question:
      "怎样向Chapter 8 BSP Tree Hierarchies施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“选择分割平面 → 分类并切分多边形 → 构建叶语义 → 遍历点与射线 → 验证分割鲁棒性”复核分割平面、多边形分类、叶语义、查询遍历、分割鲁棒，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["分割鲁棒", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-08-bsp-tree-hierarchies-6",
    chapter: "rtcd-chapter-08-bsp-tree-hierarchies",
    level: 4,
    question:
      "怎样证明Chapter 8 BSP Tree Hierarchies能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“选择分割平面 → 分类并切分多边形 → 构建叶语义 → 遍历点与射线 → 验证分割鲁棒性”复核分割平面、多边形分类、叶语义、查询遍历、分割鲁棒，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["分割平面", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-09-convexity-methods-1",
    chapter: "rtcd-chapter-09-convexity-methods",
    level: 1,
    question:
      "怎样为Chapter 9 Convexity-based Methods定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“定义支持映射 → 追踪最近特征 → 求Minkowski单纯形 → 生成距离或接触 → 缓存时空一致性”复核支持映射、最近特征、单纯形、接触流形、顶点缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["支持映射", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-09-convexity-methods-2",
    chapter: "rtcd-chapter-09-convexity-methods",
    level: 1,
    question: "怎样逐项核对Chapter 9 Convexity-based Methods的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“定义支持映射 → 追踪最近特征 → 求Minkowski单纯形 → 生成距离或接触 → 缓存时空一致性”复核支持映射、最近特征、单纯形、接触流形、顶点缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["最近特征", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-09-convexity-methods-3",
    chapter: "rtcd-chapter-09-convexity-methods",
    level: 2,
    question:
      "怎样推导并复算Chapter 9 Convexity-based Methods的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“定义支持映射 → 追踪最近特征 → 求Minkowski单纯形 → 生成距离或接触 → 缓存时空一致性”复核支持映射、最近特征、单纯形、接触流形、顶点缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["单纯形", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-09-convexity-methods-4",
    chapter: "rtcd-chapter-09-convexity-methods",
    level: 2,
    question:
      "怎样验证Chapter 9 Convexity-based Methods对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“定义支持映射 → 追踪最近特征 → 求Minkowski单纯形 → 生成距离或接触 → 缓存时空一致性”复核支持映射、最近特征、单纯形、接触流形、顶点缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["接触流形", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-09-convexity-methods-5",
    chapter: "rtcd-chapter-09-convexity-methods",
    level: 3,
    question:
      "怎样向Chapter 9 Convexity-based Methods施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“定义支持映射 → 追踪最近特征 → 求Minkowski单纯形 → 生成距离或接触 → 缓存时空一致性”复核支持映射、最近特征、单纯形、接触流形、顶点缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["顶点缓存", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-09-convexity-methods-6",
    chapter: "rtcd-chapter-09-convexity-methods",
    level: 4,
    question:
      "怎样证明Chapter 9 Convexity-based Methods能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“定义支持映射 → 追踪最近特征 → 求Minkowski单纯形 → 生成距离或接触 → 缓存时空一致性”复核支持映射、最近特征、单纯形、接触流形、顶点缓存，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["支持映射", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-10-gpu-assisted-1",
    chapter: "rtcd-chapter-10-gpu-assisted",
    level: 1,
    question:
      "怎样为Chapter 10 GPU-assisted Collision Detection定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“批量编码几何 → 提交GPU测试 → 避免同步读回 → 压缩候选结果 → 验证CPU/GPU端到端收益”复核批量编码、GPU测试、读回延迟、候选压缩、端到端收益，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["批量编码", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-10-gpu-assisted-2",
    chapter: "rtcd-chapter-10-gpu-assisted",
    level: 1,
    question:
      "怎样逐项核对Chapter 10 GPU-assisted Collision Detection的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“批量编码几何 → 提交GPU测试 → 避免同步读回 → 压缩候选结果 → 验证CPU/GPU端到端收益”复核批量编码、GPU测试、读回延迟、候选压缩、端到端收益，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["GPU测试", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-10-gpu-assisted-3",
    chapter: "rtcd-chapter-10-gpu-assisted",
    level: 2,
    question:
      "怎样推导并复算Chapter 10 GPU-assisted Collision Detection的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“批量编码几何 → 提交GPU测试 → 避免同步读回 → 压缩候选结果 → 验证CPU/GPU端到端收益”复核批量编码、GPU测试、读回延迟、候选压缩、端到端收益，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["读回延迟", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-10-gpu-assisted-4",
    chapter: "rtcd-chapter-10-gpu-assisted",
    level: 2,
    question:
      "怎样验证Chapter 10 GPU-assisted Collision Detection对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“批量编码几何 → 提交GPU测试 → 避免同步读回 → 压缩候选结果 → 验证CPU/GPU端到端收益”复核批量编码、GPU测试、读回延迟、候选压缩、端到端收益，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["候选压缩", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-10-gpu-assisted-5",
    chapter: "rtcd-chapter-10-gpu-assisted",
    level: 3,
    question:
      "怎样向Chapter 10 GPU-assisted Collision Detection施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“批量编码几何 → 提交GPU测试 → 避免同步读回 → 压缩候选结果 → 验证CPU/GPU端到端收益”复核批量编码、GPU测试、读回延迟、候选压缩、端到端收益，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["端到端收益", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-10-gpu-assisted-6",
    chapter: "rtcd-chapter-10-gpu-assisted",
    level: 4,
    question:
      "怎样证明Chapter 10 GPU-assisted Collision Detection能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“批量编码几何 → 提交GPU测试 → 避免同步读回 → 压缩候选结果 → 验证CPU/GPU端到端收益”复核批量编码、GPU测试、读回延迟、候选压缩、端到端收益，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["批量编码", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-11-numerical-robustness-1",
    chapter: "rtcd-chapter-11-numerical-robustness",
    level: 1,
    question:
      "怎样为Chapter 11 Numerical Robustness定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“识别误差来源 → 设计尺度相关容差 → 共享关键计算 → 升级区间或整数谓词 → 回归退化样本”复核浮点误差、尺度容差、厚平面、区间算术、精确谓词，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["浮点误差", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-11-numerical-robustness-2",
    chapter: "rtcd-chapter-11-numerical-robustness",
    level: 1,
    question: "怎样逐项核对Chapter 11 Numerical Robustness的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“识别误差来源 → 设计尺度相关容差 → 共享关键计算 → 升级区间或整数谓词 → 回归退化样本”复核浮点误差、尺度容差、厚平面、区间算术、精确谓词，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["尺度容差", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-11-numerical-robustness-3",
    chapter: "rtcd-chapter-11-numerical-robustness",
    level: 2,
    question: "怎样推导并复算Chapter 11 Numerical Robustness的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“识别误差来源 → 设计尺度相关容差 → 共享关键计算 → 升级区间或整数谓词 → 回归退化样本”复核浮点误差、尺度容差、厚平面、区间算术、精确谓词，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["厚平面", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-11-numerical-robustness-4",
    chapter: "rtcd-chapter-11-numerical-robustness",
    level: 2,
    question:
      "怎样验证Chapter 11 Numerical Robustness对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“识别误差来源 → 设计尺度相关容差 → 共享关键计算 → 升级区间或整数谓词 → 回归退化样本”复核浮点误差、尺度容差、厚平面、区间算术、精确谓词，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["区间算术", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-11-numerical-robustness-5",
    chapter: "rtcd-chapter-11-numerical-robustness",
    level: 3,
    question:
      "怎样向Chapter 11 Numerical Robustness施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“识别误差来源 → 设计尺度相关容差 → 共享关键计算 → 升级区间或整数谓词 → 回归退化样本”复核浮点误差、尺度容差、厚平面、区间算术、精确谓词，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["精确谓词", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-11-numerical-robustness-6",
    chapter: "rtcd-chapter-11-numerical-robustness",
    level: 4,
    question:
      "怎样证明Chapter 11 Numerical Robustness能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“识别误差来源 → 设计尺度相关容差 → 共享关键计算 → 升级区间或整数谓词 → 回归退化样本”复核浮点误差、尺度容差、厚平面、区间算术、精确谓词，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["浮点误差", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-12-geometrical-robustness-1",
    chapter: "rtcd-chapter-12-geometrical-robustness",
    level: 1,
    question:
      "怎样为Chapter 12 Geometrical Robustness定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“焊接顶点 → 重建邻接 → 修补裂缝接缝 → 三角化与凸分解 → 检查拓扑一致”复核顶点焊接、邻接关系、裂缝接缝、凸分解、拓扑一致，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["顶点焊接", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-12-geometrical-robustness-2",
    chapter: "rtcd-chapter-12-geometrical-robustness",
    level: 1,
    question: "怎样逐项核对Chapter 12 Geometrical Robustness的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“焊接顶点 → 重建邻接 → 修补裂缝接缝 → 三角化与凸分解 → 检查拓扑一致”复核顶点焊接、邻接关系、裂缝接缝、凸分解、拓扑一致，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["邻接关系", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-12-geometrical-robustness-3",
    chapter: "rtcd-chapter-12-geometrical-robustness",
    level: 2,
    question:
      "怎样推导并复算Chapter 12 Geometrical Robustness的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“焊接顶点 → 重建邻接 → 修补裂缝接缝 → 三角化与凸分解 → 检查拓扑一致”复核顶点焊接、邻接关系、裂缝接缝、凸分解、拓扑一致，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["裂缝接缝", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-12-geometrical-robustness-4",
    chapter: "rtcd-chapter-12-geometrical-robustness",
    level: 2,
    question:
      "怎样验证Chapter 12 Geometrical Robustness对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“焊接顶点 → 重建邻接 → 修补裂缝接缝 → 三角化与凸分解 → 检查拓扑一致”复核顶点焊接、邻接关系、裂缝接缝、凸分解、拓扑一致，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["凸分解", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-12-geometrical-robustness-5",
    chapter: "rtcd-chapter-12-geometrical-robustness",
    level: 3,
    question:
      "怎样向Chapter 12 Geometrical Robustness施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“焊接顶点 → 重建邻接 → 修补裂缝接缝 → 三角化与凸分解 → 检查拓扑一致”复核顶点焊接、邻接关系、裂缝接缝、凸分解、拓扑一致，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["拓扑一致", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-12-geometrical-robustness-6",
    chapter: "rtcd-chapter-12-geometrical-robustness",
    level: 4,
    question:
      "怎样证明Chapter 12 Geometrical Robustness能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“焊接顶点 → 重建邻接 → 修补裂缝接缝 → 三角化与凸分解 → 检查拓扑一致”复核顶点焊接、邻接关系、裂缝接缝、凸分解、拓扑一致，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["顶点焊接", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-chapter-13-optimization-1",
    chapter: "rtcd-chapter-13-optimization",
    level: 1,
    question: "怎样为Chapter 13 Optimization定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“建立性能基线 → 压紧代码与数据 → 重排缓存友好结构 → 向量化批量测试 → 以分位数复核”复核缓存基线、数据布局、紧凑树、SIMD批处理、分支成本，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["缓存基线", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-13-optimization-2",
    chapter: "rtcd-chapter-13-optimization",
    level: 1,
    question: "怎样逐项核对Chapter 13 Optimization的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“建立性能基线 → 压紧代码与数据 → 重排缓存友好结构 → 向量化批量测试 → 以分位数复核”复核缓存基线、数据布局、紧凑树、SIMD批处理、分支成本，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["数据布局", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-chapter-13-optimization-3",
    chapter: "rtcd-chapter-13-optimization",
    level: 2,
    question: "怎样推导并复算Chapter 13 Optimization的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“建立性能基线 → 压紧代码与数据 → 重排缓存友好结构 → 向量化批量测试 → 以分位数复核”复核缓存基线、数据布局、紧凑树、SIMD批处理、分支成本，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["紧凑树", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-13-optimization-4",
    chapter: "rtcd-chapter-13-optimization",
    level: 2,
    question:
      "怎样验证Chapter 13 Optimization对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“建立性能基线 → 压紧代码与数据 → 重排缓存友好结构 → 向量化批量测试 → 以分位数复核”复核缓存基线、数据布局、紧凑树、SIMD批处理、分支成本，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["SIMD批处理", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-chapter-13-optimization-5",
    chapter: "rtcd-chapter-13-optimization",
    level: 3,
    question: "怎样向Chapter 13 Optimization施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“建立性能基线 → 压紧代码与数据 → 重排缓存友好结构 → 向量化批量测试 → 以分位数复核”复核缓存基线、数据布局、紧凑树、SIMD批处理、分支成本，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["分支成本", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-chapter-13-optimization-6",
    chapter: "rtcd-chapter-13-optimization",
    level: 4,
    question: "怎样证明Chapter 13 Optimization能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“建立性能基线 → 压紧代码与数据 → 重排缓存友好结构 → 向量化批量测试 → 以分位数复核”复核缓存基线、数据布局、紧凑树、SIMD批处理、分支成本，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["缓存基线", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-back-matter-1",
    chapter: "rtcd-back-matter",
    level: 1,
    question:
      "怎样为后置资料：参考文献、索引与配套光盘定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“追踪算法出处 → 定位术语页码 → 核对配套资产 → 迁移旧代码环境 → 登记复现实验”复核算法出处、术语索引、配套资产、环境迁移、复现记录，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["算法出处", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-back-matter-2",
    chapter: "rtcd-back-matter",
    level: 1,
    question: "怎样逐项核对后置资料：参考文献、索引与配套光盘的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“追踪算法出处 → 定位术语页码 → 核对配套资产 → 迁移旧代码环境 → 登记复现实验”复核算法出处、术语索引、配套资产、环境迁移、复现记录，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["术语索引", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-back-matter-3",
    chapter: "rtcd-back-matter",
    level: 2,
    question:
      "怎样推导并复算后置资料：参考文献、索引与配套光盘的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“追踪算法出处 → 定位术语页码 → 核对配套资产 → 迁移旧代码环境 → 登记复现实验”复核算法出处、术语索引、配套资产、环境迁移、复现记录，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["配套资产", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-back-matter-4",
    chapter: "rtcd-back-matter",
    level: 2,
    question:
      "怎样验证后置资料：参考文献、索引与配套光盘对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“追踪算法出处 → 定位术语页码 → 核对配套资产 → 迁移旧代码环境 → 登记复现实验”复核算法出处、术语索引、配套资产、环境迁移、复现记录，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["环境迁移", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-back-matter-5",
    chapter: "rtcd-back-matter",
    level: 3,
    question:
      "怎样向后置资料：参考文献、索引与配套光盘施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“追踪算法出处 → 定位术语页码 → 核对配套资产 → 迁移旧代码环境 → 登记复现实验”复核算法出处、术语索引、配套资产、环境迁移、复现记录，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["复现记录", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-back-matter-6",
    chapter: "rtcd-back-matter",
    level: 4,
    question:
      "怎样证明后置资料：参考文献、索引与配套光盘能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“追踪算法出处 → 定位术语页码 → 核对配套资产 → 迁移旧代码环境 → 登记复现实验”复核算法出处、术语索引、配套资产、环境迁移、复现记录，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["算法出处", "RTCD中译本2010", "level-4"],
  },
  {
    id: "rtcd-official-final-review-1",
    chapter: "rtcd-official-final-review",
    level: 1,
    question:
      "怎样为《实时碰撞检测算法技术》全书总复习定义查询、输入域和生命周期边界？",
    answer:
      "先写查询合同、几何表示、坐标尺度、边界语义和失败状态。 沿“重放退化样本 → 审计候选生成 → 复算精确接触 → 注入数值误差 → 签收目标机预算”复核退化样本、候选生成、精确接触、误差边界、预算签收，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["退化样本", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-official-final-review-2",
    chapter: "rtcd-official-final-review",
    level: 1,
    question: "怎样逐项核对《实时碰撞检测算法技术》全书总复习的权威目录节点？",
    answer:
      "按目录顺序说明机制、复杂度、退化输入、误差界和可观察输出。 沿“重放退化样本 → 审计候选生成 → 复算精确接触 → 注入数值误差 → 签收目标机预算”复核退化样本、候选生成、精确接触、误差边界、预算签收，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["候选生成", "RTCD中译本2010", "level-1"],
  },
  {
    id: "rtcd-official-final-review-3",
    chapter: "rtcd-official-final-review",
    level: 2,
    question:
      "怎样推导并复算《实时碰撞检测算法技术》全书总复习的几何谓词与成本？",
    answer:
      "保留中间投影、区间、支持点、节点访问和误差界，由独立实现交叉验证。 沿“重放退化样本 → 审计候选生成 → 复算精确接触 → 注入数值误差 → 签收目标机预算”复核退化样本、候选生成、精确接触、误差边界、预算签收，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["精确接触", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-official-final-review-4",
    chapter: "rtcd-official-final-review",
    level: 2,
    question:
      "怎样验证《实时碰撞检测算法技术》全书总复习对相切、共面和零尺寸输入保持一致分类？",
    answer:
      "在边界点及正负微扰两侧运行，比较高精度参照并定位第一处分支分歧。 沿“重放退化样本 → 审计候选生成 → 复算精确接触 → 注入数值误差 → 签收目标机预算”复核退化样本、候选生成、精确接触、误差边界、预算签收，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["误差边界", "RTCD中译本2010", "level-2"],
  },
  {
    id: "rtcd-official-final-review-5",
    chapter: "rtcd-official-final-review",
    level: 3,
    question:
      "怎样向《实时碰撞检测算法技术》全书总复习施加规模、尺度或高速运动压力？",
    answer:
      "一次只改变对象数、坐标尺度或速度，先预测候选和迭代增长，再保存全管线轨迹。 沿“重放退化样本 → 审计候选生成 → 复算精确接触 → 注入数值误差 → 签收目标机预算”复核退化样本、候选生成、精确接触、误差边界、预算签收，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["预算签收", "RTCD中译本2010", "level-3"],
  },
  {
    id: "rtcd-official-final-review-6",
    chapter: "rtcd-official-final-review",
    level: 4,
    question:
      "怎样证明《实时碰撞检测算法技术》全书总复习能迁移到另一种布局、精度或后端？",
    answer:
      "保持查询合同、退化语料和证据字段，更换实现后由第三方重放并解释差异。 沿“重放退化样本 → 审计候选生成 → 复算精确接触 → 注入数值误差 → 签收目标机预算”复核退化样本、候选生成、精确接触、误差边界、预算签收，保存种子、几何代际、目标机、谓词轨迹、性能分位数与最终分类。",
    tags: ["退化样本", "RTCD中译本2010", "level-4"],
  },
];
