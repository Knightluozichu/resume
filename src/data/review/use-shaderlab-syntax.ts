import type { ReviewQuestion } from "./types";

/** ShaderLab 语法 复习题 */
export const useShaderlabSyntaxQuestions: ReviewQuestion[] = [
  {
    id: "use-shaderlab-syntax-1",
    chapter: "use-shaderlab-syntax",
    level: 1,
    question: `ShaderLab的基本结构是什么？`,
    answer: `Shader(命名) -> Properties(声明可调参数) -> SubShader(实现版本+Tags+LOD) -> Pass(渲染通道) -> CGPROGRAM(GPU代码)。FallBack提供备选。`,
    tags: ["ShaderLab", "结构"],
  },
  {
    id: "use-shaderlab-syntax-2",
    chapter: "use-shaderlab-syntax",
    level: 2,
    question: `Properties如何暴露参数到材质面板？`,
    answer: `在Properties块中声明参数：名称(面板标签, 类型) = 默认值。类型包括Color/Float/Range/Vector/2D/3D/Cube。Unity自动在材质检视面板生成对应控件(颜色选择器/滑块/纹理拾取器)。`,
    tags: ["Properties", "材质面板"],
  },
  {
    id: "use-shaderlab-syntax-3",
    chapter: "use-shaderlab-syntax",
    level: 3,
    question: `Tags的作用是什么？常见Tag有哪些？`,
    answer: `Tags键值对控制渲染行为。Queue控制渲染顺序(Geometry=2000/Transparent=3000)；RenderType区分渲染类型(Opaque/Transparent)用于相机替换；LightMode指定Pass执行阶段(ForwardBase/ShadowCaster)；IgnoreProjector忽略投影。`,
    tags: ["Tags", "渲染控制"],
  },
  {
    id: "use-shaderlab-syntax-4",
    chapter: "use-shaderlab-syntax",
    level: 4,
    question: `分析多SubShader回退机制的设计意图，设计一个支持高/中/低三档的Shader方案。`,
    answer: `回退机制：GPU从上到下匹配SubShader，第一个支持的SubShader被使用。设计三档方案：1)SubShader1(LOD 600)：高级特性如曲面细分/视差映射，需SM5.0+。2)SubShader2(LOD 300)：标准PBR光照+法线贴图，需SM3.0。3)SubShader3(LOD 100)：简单Lambert漫反射，SM2.0。4)FallBack "Diffuse"：极端情况用内置Shader。通过Quality Settings的LOD值切换档位——高端机用LOD 600看到曲面细分，低端机用LOD 100只看漫反射。这样一个Shader文件覆盖所有设备档次，无需维护多个Shader。`,
    tags: ["回退机制", "LOD", "综合"],
  },
];