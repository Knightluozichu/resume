import type { ReviewQuestion } from "./types";

/** 命令缓冲与录制 复习题 */
export const vkgCommandBuffersQuestions: ReviewQuestion[] = [
  {
    id: "vkg-command-buffers-1",
    chapter: "vkg-command-buffers",
    level: 1,
    question: "VkCommandPool 和 VkCommandBuffer 的关系是什么？",
    answer: "VkCommandPool 是命令缓冲的内存分配器，与特定队列族绑定，负责命令缓冲的分配和回收。VkCommandBuffer 从命令池中分配，是预录制的 GPU 命令序列。一个命令池可以分配多个命令缓冲，所有命令缓冲共享池的内存。",
    tags: ["命令池", "命令缓冲"],
  },
  {
    id: "vkg-command-buffers-2",
    chapter: "vkg-command-buffers",
    level: 2,
    question: "为什么需要 MAX_FRAMES_IN_FLIGHT？它解决了什么问题？",
    answer: "单缓冲下 CPU 必须等 GPU 完成当前帧才能录制下一帧（vkWaitForFences 阻塞），CPU 和 GPU 无法并行。MAX_FRAMES_IN_FLIGHT 让 CPU 录制第 N+1 帧时 GPU 同时执行第 N 帧，两者重叠执行大幅提升吞吐量。通常设为 2，每帧有独立的命令缓冲、信号量和 fence。",
    tags: ["多帧并行", "性能"],
  },
  {
    id: "vkg-command-buffers-3",
    chapter: "vkg-command-buffers",
    level: 3,
    question: "主命令缓冲和次级命令缓冲有什么区别？次级缓冲适用于什么场景？",
    answer: "主缓冲可直接提交到队列执行，次级缓冲不能单独提交，只能被主缓冲通过 vkCmdExecuteCommands 调用。次级缓冲适用于：1) 可复用命令片段（如固定 UI）；2) 多线程录制（不同线程录制不同次级缓冲后汇总）；3) 复杂场景分块。次级缓冲不支持 render pass 的 begin/end。",
    tags: ["主缓冲", "次级缓冲", "多线程"],
  },
  {
    id: "vkg-command-buffers-4",
    chapter: "vkg-command-buffers",
    level: 4,
    question: "VkSubmitInfo 中 pWaitDstStageMask 的作用是什么？为什么通常设为 VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT？",
    answer: "pWaitDstStageMask 指定信号量在管线哪个阶段解除阻塞，不是指定等待哪个阶段完成。设为 COLOR_ATTACHMENT_OUTPUT_BIT 意味着 GPU 可以在顶点处理阶段就开始工作，直到颜色输出阶段才阻塞等待 imageAvailable 信号量（交换链图像就绪）。这最大化 CPU/GPU 并行度——图像获取与顶点变换重叠执行，仅在真正需要写入颜色附件时才同步。",
    tags: ["同步", "pWaitDstStageMask", "并行"],
  },
];
