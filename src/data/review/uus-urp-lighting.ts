import type { ReviewQuestion } from "./types";

export const uusUrpLightingQuestions: ReviewQuestion[] = [
  {
    id: "uus-urp-lighting-1",
    chapter: "uus-urp-lighting",
    level: 1,
    question: `URP 光照公式是什么？最终颜色由哪些部分组成？`,
    answer: `最终颜色 = Direct(Diffuse + Specular) + Indirect(Diffuse + Specular)。Direct 是直接光（主光源 + 附加光），Indirect 是间接光（GI 球谐光照 + 反射探针）。Diffuse 是漫反射，Specular 是镜面反射，通过 BRDF 模型计算。`,
    tags: ["光照公式", "BRDF"],
  },
  {
    id: "uus-urp-lighting-2",
    chapter: "uus-urp-lighting",
    level: 2,
    question: `主光源和附加光的区别是什么？逐像素和逐顶点光源如何划分？`,
    answer: `主光源是最亮的一个平行光，始终逐像素计算。附加光是主光源之外的光源（点光/聚光），按 URP Asset 中的逐像素上限（Per Pixel Limit）划分：上限内的逐像素计算，超出的退化为逐顶点计算。逐像素光照在片元着色器计算，质量高但开销大；逐顶点光照在顶点着色器计算后插值，开销小但高光会面片化。`,
    tags: ["主光源", "附加光", "逐像素"],
  },
  {
    id: "uus-urp-lighting-3",
    chapter: "uus-urp-lighting",
    level: 3,
    question: `URP 使用的 BRDF（Cook-Torrance）的三个组成部分是什么？各起什么作用？`,
    answer: `1) D = GGX NDF（法线分布函数），控制高光集中在法线方向的程度，Smoothness 越高高光越集中；2) G = Smith Geometry（几何遮蔽函数），模拟微表面间互相遮挡导致的光线损失，在掠射角时遮蔽增强；3) F = Schlick Fresnel（菲涅尔反射），描述反射率随视角变化——掠射角（接近 90 度）时反射率增高。Specular = (D * G * F) / (4 * (N dot L) * (N dot V))。`,
    tags: ["BRDF", "Cook-Torrance", "GGX"],
  },
  {
    id: "uus-urp-lighting-4",
    chapter: "uus-urp-lighting",
    level: 4,
    question: `URP 的 GI 如何提供间接光？SH 和 Reflection Probe 各自的原理和局限是什么？`,
    answer: `GI 提供间接光：Spherical Harmonics（SH）用低阶球谐函数编码环境光照，提供低频漫反射间接光（颜色变化但无方向细节），开销极低但精度有限。Reflection Probe 用立方体贴图捕获环境反射，提供镜面间接光（有方向细节），精度高但需要烘焙或实时渲染（开销大）。局限：SH 无法表达高频光照变化（如强光源附近），Reflection Probe 有分辨率和更新频率限制。烘焙 Lightmap 可提供高质量静态间接光但无法响应动态光源变化。`,
    tags: ["GI", "球谐光照", "Reflection Probe"],
  },
];
