import type { ReviewQuestion } from "./types";

export const sxxLightingModelsQuestions: ReviewQuestion[] = [
  {
    id: "sxx-lighting-models-1",
    chapter: "sxx-lighting-models",
    level: 1,
    question: `Phong 和 Blinn-Phong 光照模型的公式差异是什么？`,
    answer: `Phong 用反射向量 R = reflect(-L, N)，specular = pow(max(R·V, 0), shininess)。Blinn-Phong 用半角向量 H = normalize(L+V)，specular = pow(max(N·H, 0), shininess)。Blinn-Phong 高光更圆更柔和，性能略好（避免 reflect 计算），匹配相同效果时 shininess 约为 Phong 的 2-4 倍。`,
    tags: ["Phong", "Blinn-Phong", "光照模型"],
  },
  {
    id: "sxx-lighting-models-2",
    chapter: "sxx-lighting-models",
    level: 2,
    question: `BRDF 的定义是什么？为什么需要物理正确的 BRDF？`,
    answer: `BRDF（双向反射分布函数）描述光线从入射方向到出射方向的反射比例。需要物理正确 BRDF 的原因：经验模型（Phong）不满足能量守恒（反射光可能多于入射光），在不同光照条件下表现不一致。物理 BRDF（如 Cook-Torrance）满足能量守恒和亥姆霍兹互易性，使材质在不同光照环境下表现一致，是 PBR（基于物理的渲染）的基础。`,
    tags: ["BRDF", "PBR", "能量守恒"],
  },
  {
    id: "sxx-lighting-models-3",
    chapter: "sxx-lighting-models",
    level: 3,
    question: `Cook-Torrance BRDF 中 D、F、G 三项分别代表什么物理意义？`,
    answer: `D（法线分布函数）：描述微平面法线分布——多少微面法线对齐到半角向量 H。常用 GGX 模型，roughness 越大分布越广。F（菲涅尔项）：反射率随视角变化——掠射角反射趋近100%，正视角取决于材质。常用 Schlick 近似。G（几何遮蔽项）：微平面间互相遮挡比例。roughness 越大遮挡越严重。DFG 乘积除以 4(N·L)(N·V) 构成物理正确的镜面反射 BRDF。`,
    tags: ["Cook-Torrance", "微平面", "菲涅尔"],
  },
  {
    id: "sxx-lighting-models-4",
    chapter: "sxx-lighting-models",
    level: 4,
    question: `在 PBR 中 metallic 和 roughness 参数的物理含义和使用约束是什么？`,
    answer: `metallic（金属度）：0=非金属（有漫反射+无色镜面反射），1=金属（无漫反射+彩色镜面反射，颜色来自反射率）。物理上应为0或1，中间值无物理意义，只在艺术过渡时使用。roughness（粗糙度）：控制微平面粗糙程度，0=完全光滑（无穷大高光，需限制最小值如0.05防止除零），1=完全粗糙（高光极分散）。错误组合会导致不自然效果：金属出现彩色漫反射、粗糙度为0产生除零。F0（正视角反射率）= lerp(0.04, albedo, metallic)，非金属 F0 约0.04，金属 F0 = albedo。`,
    tags: ["PBR", "metallic", "roughness"],
  },
];
