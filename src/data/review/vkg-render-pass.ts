import type { ReviewQuestion } from "./types";

/** 渲染通道与附件 复习题 */
export const vkgRenderPassQuestions: ReviewQuestion[] = [
  {
    id: "vkg-render-pass-1",
    chapter: "vkg-render-pass",
    level: 1,
    question: `VkRenderPass 和 VkFramebuffer 的关系是什么？`,
    answer: `VkRenderPass 定义渲染操作的抽象附件结构（格式、加载/存储、子通道），是管线创建的引用对象。VkFramebuffer 把具体的 VkImageView 绑定到渲染通道的附件槽位，是渲染操作的实际目标。一个 RenderPass 可关联多个 Framebuffer（如交换链的每张图像各一个）。`,
    tags: ["渲染通道", "帧缓冲"],
  },
  {
    id: "vkg-render-pass-2",
    chapter: "vkg-render-pass",
    level: 2,
    question: `VK_ATTACHMENT_LOAD_OP_CLEAR、LOAD 和 DONT_CARE 有什么区别？`,
    answer: `CLEAR：渲染开始时清空附件为 clearValue，常用于颜色和深度缓冲。LOAD：保留附件已有内容，在其基础上叠加渲染，适用于分层渲染。DONT_CARE：不关心初始内容，驱动自由处理，性能最优但内容未定义，适用于中间缓冲。`,
    tags: ["附件", "loadOp"],
  },
  {
    id: "vkg-render-pass-3",
    chapter: "vkg-render-pass",
    level: 3,
    question: `子通道依赖（Subpass Dependency）的作用是什么？遗漏它会导致什么问题？`,
    answer: `子通道依赖定义子通道间的执行顺序和内存依赖，确保前一个子通道的写入对后一个子通道可见，并指定布局转换的时机。遗漏会导致数据竞争——驱动不保证子通道 0 的写入对子通道 1 可见，可能出现读到未初始化数据或撕裂。必须用 VkSubpassDependency 指定 srcStageMask 和 dstAccessMask。`,
    tags: ["子通道依赖", "同步"],
  },
  {
    id: "vkg-render-pass-4",
    chapter: "vkg-render-pass",
    level: 4,
    question: `Vulkan 1.3 的动态渲染（Dynamic Rendering）相比传统渲染通道有什么优劣？`,
    answer: `优势：用 vkCmdBeginRendering/vkCmdEndRendering 替代传统 render pass 命令，无需预创建 VkRenderPass 和 VkFramebuffer，减少样板代码；驱动自动处理附件布局转换；更容易实现动态分辨率和可变附件配置。劣势：复杂多子通道场景（如延迟渲染）仍需传统渲染通道；旧驱动不支持。动态渲染适合简单前向渲染，传统渲染通道适合复杂多 Pass 场景。`,
    tags: ["动态渲染", "Vulkan 1.3", "对比"],
  },
];
