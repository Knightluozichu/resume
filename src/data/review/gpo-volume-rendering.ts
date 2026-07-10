import type { ReviewQuestion } from "./types";

export const gpoVolumeRenderingQuestions: ReviewQuestion[] = [
  {
    id: "gpo-volume-rendering-1",
    chapter: "gpo-volume-rendering",
    level: 1,
    question: `Ray Marching 的流程是什么？`,
    answer: `从相机出发沿像素方向按步长逐步前进，每步采样体积密度并计算光照，累积散射光和透射率。每步采样密度（3D 纹理或程序化噪声），计算内散射（光被介质散射到视线方向）和吸收衰减，用 Beer-Lambert 定律更新透射率。最终输出累积的散射光颜色和透射率。`,
    tags: ["Ray Marching", "体积渲染"],
  },
  {
    id: "gpo-volume-rendering-2",
    chapter: "gpo-volume-rendering",
    level: 2,
    question: `Beer-Lambert 定律和体积渲染方程包含哪些项？`,
    answer: `Beer-Lambert 定律：T = exp(-sigma * d)，描述光穿过参与介质的指数衰减。体积渲染方程：L = integral[Scattering(Li * phase) - Absorption(L) + Emission] * transmittance dt。包含：Scattering（内散射，光被介质散射到视线方向）、Absorption（吸收衰减）、Emission（自发光，如火焰）、transmittance（累积透射率）。Phase 函数（Henyey-Greenstein）控制散射方向性。`,
    tags: ["Beer-Lambert", "体积渲染方程", "散射"],
  },
  {
    id: "gpo-volume-rendering-3",
    chapter: "gpo-volume-rendering",
    level: 3,
    question: `环带伪影（Banding）是什么？如何解决？`,
    answer: `固定步长 Ray March 在密度梯度变化处产生等距环带——视觉上像等高线。解决方法：1) Jittering——每像素随机偏移起始位置（interleaved gradient noise），配合 TAA 在时间域消除噪点，这是标准方案；2) 增加步数（治标不治本，开销大）；3) 在采样间做插值（而非阶梯式）。Jittering + TAA 用 8 步达到 32 步的视觉质量。`,
    tags: ["环带伪影", "Jittering", "TAA"],
  },
  {
    id: "gpo-volume-rendering-4",
    chapter: "gpo-volume-rendering",
    level: 4,
    question: `Froxel 分块和时间复用如何优化体积雾？`,
    answer: `Froxel 将视锥体分为 WxHxD 的 3D 网格（如 160x90x64），Compute Shader 逐 Froxel 计算 Ray March，结果存 3D 纹理。渲染时每像素一次纹理查找替代逐像素 Ray March——从百万次采样降到 WxHxD 次。时间复用：每帧只计算 1/4 Froxel，其余用历史帧结果，4 帧完成全量更新。配合 Jittering 和 TAA 在时间域消除噪点，用 1/4 计算量达到全量质量。`,
    tags: ["Froxel", "时间复用", "体积雾优化"],
  },
];
