import type { ReviewQuestion } from "./types";

export const sxxPostProcessingQuestions: ReviewQuestion[] = [
  {
    id: "sxx-post-processing-1",
    chapter: "sxx-post-processing",
    level: 1,
    question: "后处理的基本工作原理是什么？",
    answer: "后处理是先把整个场景渲染到一张离屏纹理（Render Target），然后用全屏着色器（全屏四边形）对这张纹理做像素级操作。每个后处理效果（模糊、辉光、色调映射）可以是一趟独立 Pass，Pass 之间通过纹理串联。性能开销与屏幕分辨率成正比。",
    tags: ["后处理", "Render Target"],
  },
  {
    id: "sxx-post-processing-2",
    chapter: "sxx-post-processing",
    level: 2,
    question: "高斯模糊的分离卷积优化原理是什么？性能提升多少？",
    answer: "二维高斯核是可分离的——G(x,y) = G(x) * G(y)，因此 N×N 的2D卷积可拆成水平1D卷积和垂直1D卷积两趟。采样次数从 N×N 降为 2N。以 9×9 核为例：朴素法81次采样，分离法9+9=18次，性能提升约4.5倍。两趟1D卷积结果与一趟2D卷积完全等价，是后处理最经典的优化技巧。",
    tags: ["高斯模糊", "分离卷积", "性能优化"],
  },
  {
    id: "sxx-post-processing-3",
    chapter: "sxx-post-processing",
    level: 3,
    question: "Bloom 辉光效果的完整流程是什么？为什么需要降采样？",
    answer: "Bloom 流程：1) 亮度提取——阈值过滤出亮区；2) 降采样——缩小到1/2、1/4、1/8等多级分辨率；3) 逐级模糊——每级做高斯模糊；4) 逐级叠加——从最小级别逐级上采样叠加回原分辨率；5) 合成——Bloom纹理加到原始场景上。降采样原因：原分辨率上做大范围模糊需很大核（如64x64），极其昂贵；降采样后8x8核在小分辨率图上等效覆盖原分辨率大范围，性能提升数十倍。",
    tags: ["Bloom", "降采样", "辉光"],
  },
  {
    id: "sxx-post-processing-4",
    chapter: "sxx-post-processing",
    level: 4,
    question: "后处理管线的 HDR Render Target 格式选择和采样器配置有哪些注意事项？",
    answer: "Render Target 格式：HDR 效果（Bloom、色调映射）必须用 float16 或 float32 格式存储中间结果，R8G8B8 会丢失高光信息导致 Bloom 不正确——HDR 值 >1.0 在 LDR 格式中被截断为1.0。采样器配置：模糊应该用线性采样（双线性插值可合并相邻采样点减少采样次数），亮度提取和最终合成用点采样（避免不必要模糊）。降采样用双线性，上采样也可用双线性但多级叠加时用高斯权重更平滑。深度相关后处理（景深）需用点采样避免深度边缘模糊。Mipmap 对后处理意义不大（手动控制降采样级别），但启用电不会有害。",
    tags: ["HDR", "Render Target", "采样器配置"],
  },
];
