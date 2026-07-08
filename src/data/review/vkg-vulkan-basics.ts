import type { ReviewQuestion } from "./types";

/** Vulkan 基础与概念 复习题 */
export const vkgVulkanBasicsQuestions: ReviewQuestion[] = [
  {
    id: "vkg-vulkan-basics-1",
    chapter: "vkg-vulkan-basics",
    level: 1,
    question: "物理设备与逻辑设备有何区别？",
    answer: "物理设备代表实际显卡硬件，用于查询特性与队列族能力，不分配资源；逻辑设备是应用打开的 GPU 使用权，实际创建资源与执行命令的句柄。先枚举物理设备查能力，再基于它创建逻辑设备。",
    tags: ["设备"],
  },
  {
    id: "vkg-vulkan-basics-2",
    chapter: "vkg-vulkan-basics",
    level: 2,
    question: "队列族是什么？怎么选？验证层何时开何时关？",
    answer: "队列族是按命令类型分组的 GPU 执行通道（图形/计算/传输/呈现）。选时枚举查 VK_QUEUE_GRAPHICS_BIT 与表面呈现支持 vkGetPhysicalDeviceSurfaceSupportKHR，选同时支持图形与呈现的族再请求队列。验证层开发期开（拦截误用报详细错误），发布期关（零开销）。",
    tags: ["队列族", "验证层"],
  },
  {
    id: "vkg-vulkan-basics-3",
    chapter: "vkg-vulkan-basics",
    level: 3,
    question: "用栅栏协调取图像与呈现，画面仍撕裂，为什么？",
    answer: "栅栏是 CPU 等 GPU 的同步，不串 GPU 内部命令顺序；取图像→绘制→呈现是 GPU 内部三步接力，需信号量串联。栅栏无法保证这三步的 GPU 内部先后，故画面撕裂。修法：用 imageAvailable 信号量通知绘制可开始、renderFinished 信号量通知呈现可进行；栅栏只用于 CPU 等命令缓冲执行完以便重用。",
    tags: ["同步", "撕裂"],
  },
  {
    id: "vkg-vulkan-basics-4",
    chapter: "vkg-vulkan-basics",
    level: 4,
    question: "栅栏和信号量为什么不能互换？发布版忘记关验证层会怎样？",
    answer: "栅栏只让 CPU 等 GPU、无法串 GPU 内部命令顺序；信号量只在 GPU 侧接力、不能被 CPU 直接等待——各管一侧不可互换。发布版忘关验证层会有性能损耗（每次 API 调用被拦截校验），虽不致功能错误但拖慢帧率；应在发布构建条件编译里去掉验证层、保留零开销。",
    tags: ["综合", "同步原语", "验证层"],
  },
];
