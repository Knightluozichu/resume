import type { ReviewQuestion } from "./types";

export const CgpLightingModelsQuestions: ReviewQuestion[] = [
  {
    id: "cgp-lighting-models-1",
    chapter: "cgp-lighting-models",
    level: 1,
    question: "Gouraud 着色和 Phong 着色的区别是什么？",
    answer: "Gouraud 在顶点算光照再插值颜色到片元（快但高光可能丢失）。Phong 在顶点插值法线再在片元算光照（慢但高光保留正确）。",
    tags: ["Gouraud", "Phong", "着色"],
  },
  {
    id: "cgp-lighting-models-2",
    chapter: "cgp-lighting-models",
    level: 2,
    question: "Phong 光照模型的三个分量是什么？环境光分量为什么是近似？",
    answer: "环境光（常数模拟间接光）、漫反射（Lambert 点积）、镜面反射（反射向量与视线点积的高次幂）。环境光是常数，不随方向变化，真实间接光应随位置和方向变化（角落暗、开放区亮），所以是粗糙近似。",
    tags: ["Phong", "光照分量", "环境光"],
  },
  {
    id: "cgp-lighting-models-3",
    chapter: "cgp-lighting-models",
    level: 3,
    question: "Flat 着色、Gouraud 着色、Phong 着色三者的质量与性能权衡是什么？",
    answer: "Flat：每面一个法线一个颜色，最快但锯齿明显，适合低多边形风格。Gouraud：顶点算光照插值颜色，中等开销但高光在小三角形上会丢失。Phong：插值法线逐像素算光照，质量最好但最慢。现代 GPU 都用 Phong（逐片元着色），Flat 和 Gouraud 是历史遗留。",
    tags: ["Flat", "Gouraud", "Phong", "权衡"],
  },
  {
    id: "cgp-lighting-models-4",
    chapter: "cgp-lighting-models",
    level: 4,
    question: "从 Lambert 到 Cook-Torrance 的光照模型演进，每一步增加了什么物理真实感？",
    answer: "Lambert：纯漫反射，无高光，粗糙表面近似。Phong：加经验镜面高光但能量不守恒、高光不随粗糙度物理变化。Blinn-Phong：优化高光计算仍是经验模型。Cook-Torrance：引入微表面理论（D/G/F），能量守恒，高光随粗糙度物理变化，金属非金属统一框架。每一步都在消除经验假设引入物理约束，代价是计算复杂度递增。",
    tags: ["Lambert", "Cook-Torrance", "演进"],
  },
];
