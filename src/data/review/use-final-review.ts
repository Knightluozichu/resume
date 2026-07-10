import type { ReviewQuestion } from "./types";

/** Unity Shader 总复习 复习题 */
export const useFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "use-final-review-1",
    chapter: "use-final-review",
    level: 1,
    question: `全书四大板块分别解决什么核心问题？`,
    answer: `管线基础解决「Shader在哪运行」，ShaderLab语法解决「如何编写Shader」，光照效果解决「如何让物体真实」，高级技术解决「如何实现特殊效果」。呈理解->编写->核心->进阶的递进。`,
    tags: ["全书回顾"],
  },
  {
    id: "use-final-review-2",
    chapter: "use-final-review",
    level: 2,
    question: `用「一个Shader的编写流程」串联全书四大板块。`,
    answer: `1)管线:理解vert做MVP变换/rasterize插值/frag算颜色。2)ShaderLab:Shader/Properties/SubShader/Pass搭建结构。3)光照:CGPROGRAM中写vert+frag(ambient+Lambert+Blinn-Phong)。4)高级:Blend透明/深度纹理描边/OnRenderImage后处理。一个Shader从管线理解开始，ShaderLab搭建，Pass写光照，最后加高级效果。`,
    tags: ["串联", "编写流程"],
  },
  {
    id: "use-final-review-3",
    chapter: "use-final-review",
    level: 3,
    question: `Unity Shader如何实现从「能渲染」到「好效果」的跨越？`,
    answer: `管线+语法=能渲染(顶点变换+纹理采样输出颜色)。光照=看起来对(环境+漫反射+镜面模拟真实光照)。透明+后处理=看起来好(半透明/描边/泛光提升画面质量)。程序化+Instancing=高效好(代码生成纹理/批量渲染降开销)。每一层在前一层基础上提升质量或效率。`,
    tags: ["进阶路径"],
  },
  {
    id: "use-final-review-4",
    chapter: "use-final-review",
    level: 4,
    question: `设计一个完整的角色渲染方案，覆盖光照/透明/后处理，分析各Shader技术的角色。`,
    answer: `1)角色主体: Blinn-Phong Shader，Queue=Geometry，逐片元计算环境光+漫反射(N dot L)+镜面(pow(N,H))，支持法线贴图增加细节。2)头发: 各向异性高光Shader(用切线方向控制高光形状)，Alpha Test处理发丝边缘(clip硬边不排序)。3)衣服透明部分: Alpha Blending Shader，Queue=Transparent，Blend SrcAlpha OneMinusSrcAlpha，ZWrite Off，从后往前排序。4)边缘描边: 后处理采样深度+法线纹理做边缘检测，角色轮廓描边。5)Bloom: 后处理提取角色金属/发光部分高亮区域，高斯模糊叠加。6)色彩校正: 后处理调整亮度/对比度/饱和度统一画面风格。7)性能: 主体1个Draw Call，头发用Instancing(发丝面片)，透明部分需排序，后处理3-4个Pass。整体: 光照Shader让角色真实，透明Shader处理半透明部件，后处理提升画面质量，Queue确保渲染顺序正确。`,
    tags: ["完整方案", "综合"],
  },
];