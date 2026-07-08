import type { ReviewQuestion } from "./types";

export const bl3TexturingQuestions: ReviewQuestion[] = [
  {
    id: "bl3-texturing-1",
    chapter: "bl3-texturing",
    level: 1,
    question: "UV 展开的作用是什么？",
    answer: "UV 展开把 3D 模型表面映射到 2D 纹理平面，建立每个顶点到纹理像素的对应关系，是给模型画贴图的前提。",
    tags: ["UV 展开", "贴图"],
  },
  {
    id: "bl3-texturing-2",
    chapter: "bl3-texturing",
    level: 2,
    question: "PBR 材质的核心参数有哪些？各自控制什么？",
    answer: "Base Color 控制固有色，Metallic 控制金属度（0 非金属/1 金属），Roughness 控制表面粗糙度（0 镜面/1 磨砂），Normal 控制微观凹凸。",
    tags: ["PBR", "材质参数"],
  },
  {
    id: "bl3-texturing-3",
    chapter: "bl3-texturing",
    level: 3,
    question: "Blender 和 Unity 的法线贴图有什么区别？导出时怎么处理？",
    answer: "Blender 用 OpenGL 格式法线（绿通道朝上），Unity 默认用 DirectX 格式（绿通道朝下）。导出时需要在 Blender 的导出设置里选择目标引擎格式，或在 Unity 里把纹理类型改为 Normal Map 并勾选翻转绿通道。",
    tags: ["法线贴图", "OpenGL", "DirectX"],
  },
  {
    id: "bl3-texturing-4",
    chapter: "bl3-texturing",
    level: 4,
    question: "为什么高模到低模的烘焙需要 UV？烘焙的本质是什么？",
    answer: "烘焙是把高模的表面信息（法线、AO）投射到低模的 UV 纹理上。必须有 UV 才有目标纹理坐标来接收投射结果。烘焙本质是在低模每个 UV 像素处发射射线到高模表面，采样高模的法线和遮挡信息写入贴图。",
    tags: ["烘焙", "UV", "综合"],
  },
];
