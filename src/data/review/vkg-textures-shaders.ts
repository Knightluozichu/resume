import type { ReviewQuestion } from "./types";

/** 纹理与着色器 复习题 */
export const vkgTexturesShadersQuestions: ReviewQuestion[] = [
  {
    id: "vkg-textures-shaders-1",
    chapter: "vkg-textures-shaders",
    level: 1,
    question: `VkImage 和 VkImageView 的区别是什么？`,
    answer: `VkImage 是原始的 GPU 图像资源，只存储像素数据，不定义如何解释。VkImageView 是对 VkImage 的子资源视图，指定格式、视图类型（2D/3D/Cube）、mip 层和数组层范围。着色器通过描述符绑定的是 ImageView 而非 Image，因为驱动需要知道如何采样和过滤。一个 Image 可以创建多个 View。`,
    tags: ["VkImage", "VkImageView"],
  },
  {
    id: "vkg-textures-shaders-2",
    chapter: "vkg-textures-shaders",
    level: 2,
    question: `纹理上传到 GPU 后需要经过哪些图像布局转换？`,
    answer: `三个阶段：1) UNDEFINED → TRANSFER_DST_OPTIMAL（上传前，准备接收数据）；2) 执行 vkCmdCopyBufferToImage 把 staging buffer 的像素拷贝到图像；3) TRANSFER_DST_OPTIMAL → SHADER_READ_ONLY_OPTIMAL（上传后，准备着色器采样）。每一步都需要 VkImageMemoryBarrier 配合 vkCmdPipelineBarrier 完成布局转换和内存同步。`,
    tags: ["布局转换", "纹理上传"],
  },
  {
    id: "vkg-textures-shaders-3",
    chapter: "vkg-textures-shaders",
    level: 3,
    question: `描述符池、描述符集布局和描述符集三者是什么关系？`,
    answer: `描述符集布局定义着色器需要的资源绑定结构（哪些 binding、什么类型、哪个阶段使用）。描述符池是描述符集的内存分配器，按类型和数量预分配内存。描述符集从池中分配，必须符合某个布局，运行时通过 vkUpdateDescriptorSets 写入资源信息。创建管线布局时引用描述符集布局，录制命令时 vkCmdBindDescriptorSets 绑定到管线。一个布局可分配多个描述符集。`,
    tags: ["描述符系统"],
  },
  {
    id: "vkg-textures-shaders-4",
    chapter: "vkg-textures-shaders",
    level: 4,
    question: `推送常量有什么限制？什么场景应该用它而不是 uniform 缓冲？`,
    answer: `推送常量有严格大小限制（通常 128 字节，部分设备 256 字节），超出会导致管线布局创建失败。适合少量频繁变化的小数据，如单个 MVP 矩阵（64 字节）或几个 flag。优势是更新极快（直接写入命令缓冲，无需描述符），无需描述符池分配。大矩阵数据（如骨骼动画的多个矩阵）或大量 uniform 应用 uniform 缓冲配合描述符集。两者可同时使用：推送常量传 MVP，uniform 缓冲传材质参数。`,
    tags: ["推送常量", "uniform", "限制"],
  },
];
