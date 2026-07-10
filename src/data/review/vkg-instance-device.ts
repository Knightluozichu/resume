import type { ReviewQuestion } from "./types";

/** 实例与物理设备 复习题 */
export const vkgInstanceDeviceQuestions: ReviewQuestion[] = [
  {
    id: "vkg-instance-device-1",
    chapter: "vkg-instance-device",
    level: 1,
    question: `Vulkan 初始化的四个步骤是什么？`,
    answer: `创建 VkInstance（连接运行时）→ 枚举 VkPhysicalDevice（选择 GPU）→ 选择队列族（确定操作能力）→ 创建 VkDevice（逻辑设备）。`,
    tags: ["初始化流程"],
  },
  {
    id: "vkg-instance-device-2",
    chapter: "vkg-instance-device",
    level: 2,
    question: `为什么 vkEnumeratePhysicalDevices 需要调用两次？`,
    answer: `第一次传 NULL 获取设备数量，第二次传入数组填充实际设备。这是 Vulkan 枚举 API 的标准两步模式，避免预分配固定大小缓冲区，所有枚举类 API 都遵循此模式。`,
    tags: ["枚举模式"],
  },
  {
    id: "vkg-instance-device-3",
    chapter: "vkg-instance-device",
    level: 3,
    question: `实例级扩展和设备级扩展有什么区别？举例说明。`,
    answer: `实例级扩展（如 VK_KHR_surface）与 Vulkan 运行时相关，是全局功能；设备级扩展（如 VK_KHR_swapchain）与特定 GPU 硬件能力相关，只影响对应逻辑设备。两者作用域不同，需分别在 vkCreateInstance 和 vkCreateDevice 中启用。`,
    tags: ["扩展", "实例", "设备"],
  },
  {
    id: "vkg-instance-device-4",
    chapter: "vkg-instance-device",
    level: 4,
    question: `如何选择最优物理设备？需要考虑哪些因素？`,
    answer: `遍历所有物理设备查询 VkPhysicalDeviceProperties，优先选 VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU（性能最强）。同时检查：1) 是否有支持 VK_QUEUE_GRAPHICS_BIT 的队列族；2) 是否支持所需设备扩展（如 VK_KHR_swapchain）；3) VkPhysicalDeviceFeatures 是否满足特性需求；4) 可参考 limits 和 memory 属性做最终筛选。`,
    tags: ["设备选择", "队列族", "扩展检查"],
  },
];
