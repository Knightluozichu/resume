import type { ReviewQuestion } from "./types";

export const uslSurfaceShadersQuestions: ReviewQuestion[] = [
  {
    id: "usl-surface-shaders-1",
    chapter: "usl-surface-shaders",
    level: 1,
    question: "表面着色器（Surface Shader）的优势是什么？",
    answer: "自动处理光照、阴影、光照探针和全局光照，开发者只需关注表面属性（Albedo、Normal、Emission 等）。代码简洁，适合快速实现光照效果。Unity 编译后自动生成对应的顶点/片段着色器代码。",
    tags: ["表面着色器", "优势"],
  },
  {
    id: "usl-surface-shaders-2",
    chapter: "usl-surface-shaders",
    level: 2,
    question: "#pragma surface surf Lambert 中的各参数含义是什么？",
    answer: "surface 声明表面着色器，surf 是表面函数名，Lambert 是光照模型（可用 Standard/Custom）。还可加 vertex:vert 指定顶点函数、alpha 启用透明、finalcolor:fn 指定最终颜色修改函数等可选参数。",
    tags: ["pragma surface", "光照模型"],
  },
  {
    id: "usl-surface-shaders-3",
    chapter: "usl-surface-shaders",
    level: 3,
    question: "SurfaceOutput 结构体包含哪些主要字段？",
    answer: "Albedo（漫反射颜色）、Normal（切线空间法线）、Emission（自发光颜色）、Specular（高光颜色）、Gloss（高光强度）、Alpha（透明度）。Standard 模式用 SurfaceOutputStandard，额外包含 Metallic、Smoothness、Occlusion 字段。",
    tags: ["SurfaceOutput", "结构体"],
  },
  {
    id: "usl-surface-shaders-4",
    chapter: "usl-surface-shaders",
    level: 4,
    question: "何时应该用表面着色器，何时应该用顶点/片段着色器？",
    answer: "表面着色器适合：需要标准光照、需要与全局光照/阴影系统集成、快速原型开发。顶点/片段着色器适合：需要精确控制 Pass 和渲染状态、后处理/屏幕特效、非标准光照、自定义渲染管线、性能要求极高（避免编译器生成的冗余代码）。",
    tags: ["选择", "对比", "实践"],
  },
];
