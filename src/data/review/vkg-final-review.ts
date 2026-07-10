import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const vkgFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "vkg-final-review-1",
    chapter: "vkg-final-review",
    level: 1,
    question: `Vulkan 渲染流程的五大阶段是什么？`,
    answer: `1) 初始化：VkInstance → 物理设备 → VkDevice → Surface → Swapchain；2) 管线：DescriptorSetLayout → PipelineLayout → RenderPass → VkPipeline；3) 资源：VkImage → ImageView → Sampler → DescriptorSet；4) 命令：CommandPool → CommandBuffer → 录制 → Submit；5) 高级：光线追踪/网格着色器/Bindless/VRS。`,
    tags: ["全书脉络"],
  },
  {
    id: "vkg-final-review-2",
    chapter: "vkg-final-review",
    level: 2,
    question: `Vulkan 和 OpenGL 在设计哲学上的根本差异是什么？`,
    answer: `OpenGL 是隐式设计：全局状态机、驱动自动管理内存和同步、单线程上下文，代码量少但性能依赖驱动优化。Vulkan 是显式设计：不可变管线对象、开发者完全控制内存和同步、多线程录制命令缓冲，代码量大但性能可预测且 CPU 开销低。Vulkan 要求以引擎架构师思维组织代码。`,
    tags: ["对比", "设计哲学"],
  },
  {
    id: "vkg-final-review-3",
    chapter: "vkg-final-review",
    level: 3,
    question: `Vulkan 的同步原语有哪些？各自的使用场景是什么？`,
    answer: `VkSemaphore 用于 GPU-GPU 同步（交换链图像获取→渲染→呈现的 GPU 侧同步）；VkFence 用于 CPU-GPU 同步（帧间 CPU 等待 GPU 完成，MAX_FRAMES_IN_FLIGHT）；管线屏障（VkPipelineBarrier）用于图像布局转换和资源写入可见性保证；子通道依赖（VkSubpassDependency）用于渲染通道内子通道间的同步。`,
    tags: ["同步", "信号量", "fence"],
  },
  {
    id: "vkg-final-review-4",
    chapter: "vkg-final-review",
    level: 4,
    question: `描述从 vkCreateInstance 到第一帧 vkQueuePresentKHR 的完整调用链，以及对象销毁顺序原则。`,
    answer: `调用链：vkCreateInstance → vkEnumeratePhysicalDevices → vkCreateDevice → vkGetDeviceQueue → 创建 Surface → vkCreateSwapchainKHR → vkGetSwapchainImagesKHR → 创建 ImageView → 创建 RenderPass → 创建 Framebuffer → 创建 DescriptorSetLayout + PipelineLayout → 创建 ShaderModule → vkCreateGraphicsPipelines → 创建 CommandPool → vkAllocateCommandBuffers → 录制命令 → vkAcquireNextImageKHR → vkQueueSubmit → vkQueuePresentKHR。销毁顺序：必须逆序——子对象先于父对象，如命令缓冲→命令池→设备→实例，Framebuffers→ImageViews→Images，管线→管线布局→描述符集布局。`,
    tags: ["完整流程", "销毁顺序", "工程实践"],
  },
];
