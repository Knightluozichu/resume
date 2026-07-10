import type { ReviewQuestion } from "./types";

export const gpoRenderingTechniquesQuestions: ReviewQuestion[] = [
  {
    id: "gpo-rendering-techniques-1",
    chapter: "gpo-rendering-techniques",
    level: 1,
    question: `前向渲染和延迟渲染的光源复杂度分别是什么？`,
    answer: `前向渲染 O(N*M)（N=物体数，M=光源数），每个物体在每个光源下渲染一次。延迟渲染 O(N+M)，G-Buffer Pass 渲染 N 个物体（不含光照），光照 Pass 逐像素遍历 M 个光源（与物体数无关）。延迟渲染将几何和光照解耦。`,
    tags: ["前向渲染", "延迟渲染", "复杂度"],
  },
  {
    id: "gpo-rendering-techniques-2",
    chapter: "gpo-rendering-techniques",
    level: 2,
    question: `延迟渲染的 G-Buffer 通常包含哪些信息？为什么带宽大？`,
    answer: `G-Buffer 通常包含：albedo（颜色）、normal（法线）、material（metallic/roughness/emission 等）、depth（深度）。通常需要 3-4 张 RGBA RT，总计 96-128bit/pixel。4K 分辨率下 G-Buffer 读写约 24-32MB/帧。带宽大因为每个像素都要写入多张 RT（G-Buffer Pass）再读取（光照 Pass），是延迟渲染的主要性能开销。`,
    tags: ["G-Buffer", "带宽", "延迟渲染"],
  },
  {
    id: "gpo-rendering-techniques-3",
    chapter: "gpo-rendering-techniques",
    level: 3,
    question: `可见性缓冲相比延迟渲染的优势是什么？为什么需要现代 GPU 特性？`,
    answer: `优势：1) G-Buffer 只存 32bit 图元 ID（vs 延迟渲染 96-128bit），带宽极低；2) 材质复杂度无关——光照时按需读取原始顶点属性，无 G-Buffer 编码限制；3) 支持任意复杂材质。需要现代 GPU 因为：1) Bindless Resource 允许 Shader 随机访问任意顶点缓冲；2) 间接绘制支持 GPU 侧调度；3) 需高速 Structured Buffer 随机访问。DX11/GL 不支持，需 DX12/Vulkan/Metal。`,
    tags: ["可见性缓冲", "Bindless", "现代GPU"],
  },
  {
    id: "gpo-rendering-techniques-4",
    chapter: "gpo-rendering-techniques",
    level: 4,
    question: `在什么场景下该选前向、延迟还是可见性缓冲？给出决策依据。`,
    answer: `前向渲染：少光源（1-2 个）场景、需要 MSAA、大量透明物体。延迟渲染：多光源（4+）场景、PC 端、材质参数不复杂。可见性缓冲：追求极致带宽效率、材质复杂（多层 BRDF/SSS）、DX12/Vulkan/Metal 平台、高端项目。决策依据：光源数量（少→前向，多→延迟/可见性）、平台（移动→前向，PC→延迟/可见性）、材质复杂度（简单→延迟，复杂→可见性）、MSAA 需求（需要→前向）。`,
    tags: ["技术选型", "决策"],
  },
];
