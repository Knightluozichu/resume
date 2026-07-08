import type { ReviewQuestion } from "./types";

/** 可见性与深度缓冲 复习题 */
export const cg4VisibilityQuestions: ReviewQuestion[] = [
  {
    id: "cg4-visibility-1",
    chapter: "cg4-visibility",
    level: 1,
    question: "什么是深度缓冲（Z-Buffer）？它解决什么问题？",
    answer: "深度缓冲是一个与帧缓冲大小相同的缓冲区，存储每个像素的深度值。它解决可见性问题——当多个片段映射到同一像素时，比较深度值，保留深度更小（更近）的片段。初始化为最大深度值，每个片段与当前深度比较，更近则写入颜色和深度。",
    tags: ["Z-Buffer", "可见性"],
  },
  {
    id: "cg4-visibility-2",
    chapter: "cg4-visibility",
    level: 2,
    question: "Z-Buffer 的精度问题是什么？为什么会出现 Z-fighting？",
    answer: "深度缓冲用定点或浮点数存储深度，精度有限。透视投影后深度值在近处密集、远处稀疏（非线性分布），导致远处物体的深度区分度低。Z-fighting 是两个面非常接近时，深度值精度不足以区分它们，导致交替显示的现象。解决方法：增大近裁剪面、减小远裁剪面、对共面物体加微小偏移（polygon offset）。",
    tags: ["精度", "Z-fighting", "深度分布"],
  },
  {
    id: "cg4-visibility-3",
    chapter: "cg4-visibility",
    level: 3,
    question: "画家算法和 Z-Buffer 算法各有什么优缺点？为什么 Z-Buffer 成为主流？",
    answer: "画家算法：按深度从远到近排序图元再绘制。优点是不需要额外缓冲区，缺点是排序 O(n log n)、无法处理循环遮挡（A挡B的一部分，B挡A的一部分）。Z-Buffer：逐像素深度比较。优点是无需排序 O(n)、正确处理任意遮挡关系、适合硬件并行。缺点是额外内存（深度缓冲）、无法做透明排序。Z-Buffer 成为主流因为 GPU 的并行特性使其天然适合逐像素比较，且无需 CPU 端排序。",
    tags: ["画家算法", "Z-Buffer", "对比"],
  },
  {
    id: "cg4-visibility-4",
    chapter: "cg4-visibility",
    level: 4,
    question: "在设计渲染引擎时，如何结合深度预处理（Z-Prepass）来优化渲染性能？有什么权衡？",
    answer: "Z-Prepass：先用简单着色器（仅写深度不写颜色）渲染整个场景生成深度缓冲，再用正常着色器渲染——此时深度测试可提前剔除大量被遮挡片段，减少昂贵的片段着色器执行。权衡：1) 多一次几何遍历增加 Draw Call 开销；2) 当场景片段着色器很重（PBR、复杂光照）时收益大，简单着色器时反而亏；3) 双 Pass 增加带宽；4) 透明物体仍需单独处理（不写深度）。适合片段着色器是瓶颈的复杂场景。",
    tags: ["Z-Prepass", "性能优化", "渲染引擎"],
  },
];
