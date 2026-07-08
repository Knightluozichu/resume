import type { ReviewQuestion } from "./types";

export const shpLightingShadersQuestions: ReviewQuestion[] = [
  {
    id: "shp-lighting-shaders-1",
    chapter: "shp-lighting-shaders",
    level: 1,
    question: "Phong 光照模型包含哪三个分量？",
    answer: "环境光（Ambient）模拟间接照明，漫反射（Diffuse）模拟粗糙表面散射，镜面反射（Specular）模拟光滑表面高光。三者相加得到最终光照颜色。",
    tags: ["Phong", "光照模型"],
  },
  {
    id: "shp-lighting-shaders-2",
    chapter: "shp-lighting-shaders",
    level: 2,
    question: "Blinn-Phong 相比 Phong 的改进是什么？",
    answer: "Blinn-Phong 用半角向量 H（光线方向与视线方向的中间向量）与法线的点积替代反射向量 R 与视线的点积。避免了昂贵的 reflect 计算，且高光更柔和自然，性能更好。",
    tags: ["Blinn-Phong", "优化"],
  },
  {
    id: "shp-lighting-shaders-3",
    chapter: "shp-lighting-shaders",
    level: 3,
    question: "为什么法线必须归一化后才能用于光照计算？",
    answer: "光照计算依赖法线方向（点积），法线长度不为 1 时点积结果不正确。插值后法线长度可能变化，必须在像素着色器中重新 normalize。法线错误会导致光照强度异常（过亮或过暗）。",
    tags: ["法线", "归一化"],
  },
  {
    id: "shp-lighting-shaders-4",
    chapter: "shp-lighting-shaders",
    level: 4,
    question: "如何在着色器中实现多光源支持？",
    answer: "1)将光源数据打包到StructuredBuffer或数组中传入 2)在像素着色器中循环遍历光源 3)逐光源计算Diffuse+Specular并累加 4)用光源范围做剔除优化 5)前向渲染光源数量受限，多光源场景应考虑延迟渲染。",
    tags: ["多光源", "延迟渲染"],
  },
];
