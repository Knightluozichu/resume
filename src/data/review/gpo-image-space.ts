import type { ReviewQuestion } from "./types";

export const gpoImageSpaceQuestions: ReviewQuestion[] = [
  {
    id: "gpo-image-space-1",
    chapter: "gpo-image-space",
    level: 1,
    question: "SSAO 的工作原理是什么？需要什么输入？",
    answer: "SSAO 在屏幕空间对每个像素沿法线方向半球内生成采样点，投影到屏幕空间采样深度图比较——采样点深度比深度图更远说明被遮挡，统计遮挡比例作为 AO 因子。输入需要深度图和法线图（可从深度图重建或从 G-Buffer 读取）。输出 0~1 遮蔽因子乘以环境光颜色。",
    tags: ["SSAO", "环境光遮蔽"],
  },
  {
    id: "gpo-image-space-2",
    chapter: "gpo-image-space",
    level: 2,
    question: "SSR 的 Ray March 流程是什么？Hi-Z 如何加速？",
    answer: "SSR 沿反射方向步进，每步将 3D 位置投影到屏幕空间采样深度图比较——深度差小于阈值说明命中，采样颜色作为反射。Hi-Z 加速用层级深度金字塔（Mip Chain），远处用低分辨率大步长跳过空区域，近处用高分辨率小步长精确定位。自适应步长（步长递增）也是一种加速方式。",
    tags: ["SSR", "Ray March", "Hi-Z"],
  },
  {
    id: "gpo-image-space-3",
    chapter: "gpo-image-space",
    level: 3,
    question: "图像空间效果的共同局限是什么？SSR 如何解决屏幕外反射丢失？",
    answer: "共同局限：只能利用屏幕内可见信息，屏幕外几何和颜色丢失。SSAO 边缘遮蔽不正确，SSR 屏幕外反射为空。SSR 解决方案：1) Ray March 未命中时降级到 Reflection Probe 采样；2) 按粗糙度混合 SSR 和 Probe——光滑用 SSR，粗糙用 Probe；3) 屏幕边缘衰减权重平滑过渡。SSAO 与烘焙 AO 混合解决边缘问题。",
    tags: ["图像空间局限", "SSR降级"],
  },
  {
    id: "gpo-image-space-4",
    chapter: "gpo-image-space",
    level: 4,
    question: "SSAO 采样核为什么不能直接用固定大半径？如何优化？",
    answer: "固定大半径会覆盖远处几何导致过度遮蔽——如在墙角采样到另一面墙产生错误遮蔽。优化策略：1) 根据像素深度调整采样半径（远处小半径近处大半径），因为远处像素在屏幕空间更密集；2) 限制采样核在法线方向的半球内（而非全球），避免背面采样；3) 用随机旋转载体（Random Rotation Vector）在 4x4 像素块内旋转采样核，配合 Blur 降噪减少采样数；4) 使用时间复用（TAA 混合历史帧）进一步减少每帧采样数。",
    tags: ["SSAO", "采样优化", "过度遮蔽"],
  },
];
