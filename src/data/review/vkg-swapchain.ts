import type { ReviewQuestion } from "./types";

/** 交换链与呈现 复习题 */
export const vkgSwapchainQuestions: ReviewQuestion[] = [
  {
    id: "vkg-swapchain-1",
    chapter: "vkg-swapchain",
    level: 1,
    question: "交换链的核心作用是什么？",
    answer: "交换链是一组用于呈现到屏幕的图像集合，管理后台渲染与前台显示的轮换机制。它把 GPU 渲染结果安全地送到显示器上，是 Vulkan 窗口呈现的基础。",
    tags: ["交换链"],
  },
  {
    id: "vkg-swapchain-2",
    chapter: "vkg-swapchain",
    level: 2,
    question: "FIFO 和 Mailbox 呈现模式有什么区别？",
    answer: "FIFO 模式下帧在队列中排队等待 VSync，帧率受刷新率限制，延迟较高但无撕裂，是保证支持的默认模式。Mailbox 模式下新帧会替换队列中未展示的旧帧，仍受刷新率限制但延迟更低，因为总是展示最新帧。",
    tags: ["呈现模式", "FIFO", "Mailbox"],
  },
  {
    id: "vkg-swapchain-3",
    chapter: "vkg-swapchain",
    level: 3,
    question: "为什么 vkAcquireNextImageKHR 使用信号量而不是 fence 做同步？",
    answer: "信号量用于 GPU-GPU 同步，让 GPU 自动等待图像就绪而不阻塞 CPU。如果用 fence 则 CPU 必须阻塞等待 GPU 确认图像可用，降低并发效率。标准做法是用 imageAvailable 信号量做 GPU 侧同步，fence 仅用于帧级 CPU 同步（等待前一帧完成）。",
    tags: ["同步", "信号量", "fence"],
  },
  {
    id: "vkg-swapchain-4",
    chapter: "vkg-swapchain",
    level: 4,
    question: "当 VK_ERROR_OUT_OF_DATE_KHR 返回时该如何处理？重建交换链的完整流程是什么？",
    answer: "该返回码表示交换链不再与表面兼容（通常窗口尺寸变化）。处理流程：1) 等待设备空闲 vkDeviceWaitIdle；2) 清理旧资源（framebuffer、image view、command buffer）；3) 重新查询 VkSurfaceCapabilitiesKHR；4) 用 oldSwapchain 字段指向旧交换链创建新交换链；5) 销毁旧交换链；6) 重新创建 image view、framebuffer 和 command buffer。",
    tags: ["重建", "窗口尺寸", "错误处理"],
  },
];
