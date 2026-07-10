import type { ReviewQuestion } from "./types";

/** 高级渲染技术 复习题 */
export const cg4AdvancedRenderingQuestions: ReviewQuestion[] = [
  {
    id: "cg4-advanced-rendering-1",
    chapter: "cg4-advanced-rendering",
    level: 1,
    question: `阴影映射的基本原理是什么？`,
    answer: `阴影映射分两步：1) 从光源视角渲染场景，只写深度，生成阴影贴图（Shadow Map）；2) 从摄像机视角渲染场景，对每个片段将其世界位置变换到光源空间，比较其深度与阴影贴图中的深度——如果片段深度大于阴影贴图深度，说明该片段被遮挡，处于阴影中。本质是两次深度比较。`,
    tags: ["阴影映射", "Shadow Map"],
  },
  {
    id: "cg4-advanced-rendering-2",
    chapter: "cg4-advanced-rendering",
    level: 2,
    question: `阴影映射的 Shadow Acne 和 Peter Panning 问题是什么？如何解决？`,
    answer: `Shadow Acne：因阴影贴图分辨率有限导致自遮挡条纹，片段与自身深度比较时精度误差产生错误阴影。解决：加深度偏移（bias）或使用正面剔除生成阴影贴图。Peter Panning：偏移过大导致物体与阴影分离（物体似乎悬浮），且接触阴影丢失。解决：减小偏移、使用 front-face culling 避免自遮挡而不用大偏移、或使用 Percentage-Closer Filtering (PCF) 软化边缘同时减轻 acne。`,
    tags: ["Shadow Acne", "Peter Panning", "阴影偏移"],
  },
  {
    id: "cg4-advanced-rendering-3",
    chapter: "cg4-advanced-rendering",
    level: 3,
    question: `延迟着色和前向着色的区别是什么？各自的优缺点？`,
    answer: `前向着色：逐图元渲染，每个片段计算所有光源光照。简单但复杂度 O(几何体 * 光源数)，多光源时片段着色器重复执行。延迟着色：第一个 Pass 将几何属性（位置、法线、颜色等）写入 G-Buffer；第二个 Pass 逐屏幕像素从 G-Buffer 读取属性计算光照。复杂度 O(几何体 + 像素 * 光源数)，多光源高效。缺点：1) G-Buffer 带宽大；2) 不支持透明物体（需混合渲染）；3) 材质多样性受限（G-Buffer 格式固定）；4) MSAA 困难。`,
    tags: ["延迟着色", "前向着色", "G-Buffer"],
  },
  {
    id: "cg4-advanced-rendering-4",
    chapter: "cg4-advanced-rendering",
    level: 4,
    question: `全局光照（GI）在实时渲染中有哪些主要近似方法？对比它们的优缺点。`,
    answer: `1) 环境光遮蔽（AO/SSAO）：屏幕空间近似遮挡关系，简单但仅模拟近距离间接光遮蔽。2) 光照贴图（Lightmap）：预计算静态间接光到纹理，质量高但仅限静态场景。3) 探针光照（Light Probe/SH）：在空间点采样并存储球谐光照，运行时插值，适合动态物体间接光但空间分辨率低。4) 体素圆锥追踪（VXGI）：将场景体素化后追踪圆锥近似反射光，质量中等但体素化开销大。5) 屏幕空间反射（SSR）：屏幕空间光线追踪近似反射，仅限可见区域。6) 实时光线追踪（RTX）：硬件加速光线追踪，质量最高但需要专用硬件且光线数有限。`,
    tags: ["全局光照", "GI", "实时渲染", "对比"],
  },
];
