import type { ReviewQuestion } from "./types";

export const gpoMobileRenderingQuestions: ReviewQuestion[] = [
  {
    id: "gpo-mobile-rendering-1",
    chapter: "gpo-mobile-rendering",
    level: 1,
    question: "TBR 的工作原理是什么？为什么能减少带宽？",
    answer: "TBR 将屏幕分成小块 Tile（如 16x16），逐 Tile 执行完整渲染管线。每个 Tile 在片上缓存（Tile Memory/SRAM）中暂存 RT，Tile 内读写不走显存。减少带宽因为：1) G-Buffer 读写在片上缓存完成；2) 深度测试在 Tile 内完成，被遮挡片元不写出；3) RT 只需最终写回一次。",
    tags: ["TBR", "带宽", "Tile"],
  },
  {
    id: "gpo-mobile-rendering-2",
    chapter: "gpo-mobile-rendering",
    level: 2,
    question: "为什么移动端优先减少 RT 数量和 Blit 次数？",
    answer: "移动端核心瓶颈是带宽。每张 RT 读写消耗带宽：1 张 1080p RGBA8 约 8MB。延迟渲染 3 张 G-Buffer + 光照 RT = 4 张读写 = 32MB/帧。5 个后处理 Blit = 80MB/帧。移动 GPU 带宽通常 10-20GB/s，112MB/帧在 60fps 需 6.7GB/s 接近上限。减少 RT 数量（Forward+ 替代延迟）和 Blit 次数直接降低带宽压力。",
    tags: ["移动端", "带宽", "RT"],
  },
  {
    id: "gpo-mobile-rendering-3",
    chapter: "gpo-mobile-rendering",
    level: 3,
    question: "half 精度在移动端的性能优势是什么？如何正确使用？",
    answer: "移动 GPU（Mali/Adreno/PowerVR）的 half ALU 吞吐量是 float 的 2 倍，half 寄存器占用减半。全 float Shader 帧率可能比 half 版本低 30-50%。正确使用：所有颜色、光照、纹理坐标用 half；只在位置（世界空间大坐标）、深度（精度要求高）、时间累积（大数值）用 float。注意 half 精度范围 [-65504, 65504]，超出会溢出。",
    tags: ["half精度", "移动端", "性能"],
  },
  {
    id: "gpo-mobile-rendering-4",
    chapter: "gpo-mobile-rendering",
    level: 4,
    question: "为什么 PC 端的延迟渲染不适合直接搬到移动端？移动端应该用什么替代方案？",
    answer: "延迟渲染需 3-4 张 G-Buffer RT，在 TBR 架构下每张 RT 占 Tile Memory。多张 RT 超出 Tile Memory 容量会溢出到显存（Tile Memory Spill），带宽暴增。替代方案：1) Forward+（分块前向渲染）——将屏幕分 Tile，每 Tile 统计光源列表，前向渲染但只计算 Tile 内光源，避免 G-Buffer；2) Tile-Based Deferred——G-Buffer 在 Tile 内完成光照不写出显存（需 API 支持如 Metal 的 Tile Shader）；3) 简化 G-Buffer——减少到 1-2 张 RT，法线从深度重建。",
    tags: ["延迟渲染", "移动端", "Forward+"],
  },
];
