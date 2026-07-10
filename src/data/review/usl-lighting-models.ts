import type { ReviewQuestion } from "./types";

export const uslLightingModelsQuestions: ReviewQuestion[] = [
  {
    id: "usl-lighting-models-1",
    chapter: "usl-lighting-models",
    level: 1,
    question: `Unity 内置的光照模型有哪些？`,
    answer: `Lambert（纯漫反射，无高光）、BlinnPhong（漫反射+高光）、Standard（PBR 金属度流程）、StandardSpecular（PBR 高光流程）。还可以自定义光照模型函数实现特殊效果。`,
    tags: ["光照模型", "内置"],
  },
  {
    id: "usl-lighting-models-2",
    chapter: "usl-lighting-models",
    level: 2,
    question: `如何自定义表面着色器的光照模型？`,
    answer: `1)编写 Lighting 函数，命名格式为 LightingName 2)在 #pragma surface 中用 Custom 名称引用 3)函数签名接收 SurfaceOutput、光照方向、衰减等参数 4)返回最终颜色 5)ForwardBase/ForwardAdd 分别处理主光源和附加光源。`,
    tags: ["自定义光照", "Surface Shader"],
  },
  {
    id: "usl-lighting-models-3",
    chapter: "usl-lighting-models",
    level: 3,
    question: `Standard PBR 光照模型中 Metallic 和 Smoothness 分别控制什么？`,
    answer: `Metallic 控制材质的金属度（0=非金属/电介质，1=金属），影响反射率和反射颜色。Smoothness 控制表面光滑度（0=粗糙，1=镜面），影响高光大小和锐利程度。两者共同决定 PBR 渲染的视觉表现。`,
    tags: ["PBR", "Metallic", "Smoothness"],
  },
  {
    id: "usl-lighting-models-4",
    chapter: "usl-lighting-models",
    level: 4,
    question: `如何实现 Toon（卡通）光照模型？`,
    answer: `1)自定义 Lighting 函数 2)计算 N·L 点积后量化为 2-3 个离散阶（step 或 if）3)每阶对应一个固定颜色 4)添加边缘高光（Fresnel 或法线与视线点积）5)添加描边 Pass 6)关闭环境光和全局光照避免平滑过渡 7)用 Ramp 纹理控制色阶映射。`,
    tags: ["卡通渲染", "自定义光照", "实践"],
  },
];
