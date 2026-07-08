import type { ReviewQuestion } from "./types";

/** 高级特性与扩展 复习题 */
export const vkgAdvancedFeaturesQuestions: ReviewQuestion[] = [
  {
    id: "vkg-advanced-features-1",
    chapter: "vkg-advanced-features",
    level: 1,
    question: "Vulkan 扩展的层级（厂商/EXT/KHR/核心）是什么意思？",
    answer: "厂商扩展（VK_NV_*/VK_AMD_*）是特定厂商专有的；EXT 扩展是多厂商共识但未必全面支持；KHR 扩展是 Khronos 官方认可、跨厂商广泛支持；成熟 KHR 扩展可被提升进核心 API（如 Vulkan 1.3 提升了 dynamic_rendering 等）。使用前都需检查设备支持。",
    tags: ["扩展系统"],
  },
  {
    id: "vkg-advanced-features-2",
    chapter: "vkg-advanced-features",
    level: 2,
    question: "光线追踪中 BLAS 和 TLAS 为什么要分两级？",
    answer: "BLAS（几何体级）直接包含三角形/AABB 数据，构建慢但可复用。TLAS（实例级）引用多个 BLAS 并含实例变换矩阵，构建快可每帧更新。分两级是因为场景中同一模型常被多次实例化（如森林用同一棵树），BLAS 只构建一次，TLAS 每帧更新变换即可，避免重复构建几何加速结构。",
    tags: ["光线追踪", "BLAS", "TLAS"],
  },
  {
    id: "vkg-advanced-features-3",
    chapter: "vkg-advanced-features",
    level: 3,
    question: "网格着色器相比传统顶点管线有什么优势？适用于什么场景？",
    answer: "优势：1) 以线程组为单位直接输出顶点和图元，跳过顶点输入/装配/曲面细分等固定阶段；2) 支持程序化几何生成，无需顶点缓冲；3) 适合 GPU 驱动渲染管线，减少 CPU-GPU 传输；4) 线程组内共享数据，便于 LOD 和剔除。适用于大规模粒子/植被、GPU 驱动管线、程序化地形、点云渲染等场景。",
    tags: ["网格着色器", "GPU 驱动"],
  },
  {
    id: "vkg-advanced-features-4",
    chapter: "vkg-advanced-features",
    level: 4,
    question: "为什么不能用 API 版本号判断扩展支持？Bindless 场景中有哪些必须启用的特性？",
    answer: "不能用版本号判断是因为很多扩展（如 ray_tracing_pipeline、mesh_shader）永远不会被提升进核心，必须用 vkEnumerateDeviceExtensionProperties 检查。Vulkan 1.3 虽提升了部分扩展但不覆盖全部。Bindless 场景中必须启用 shaderSampledImageArrayNonUniformIndexing（非 uniform 索引纹理数组）、runtimeDescriptorArray（运行时大小数组）、descriptorBindingPartiallyBound（部分绑定）等特性，否则验证层报错或出现未定义行为。",
    tags: ["扩展查询", "Bindless", "特性启用"],
  },
];
