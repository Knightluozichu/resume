import type { ReviewQuestion } from "./types";

/** 光栅化与片段处理 复习题 */
export const cg4RasterizationQuestions: ReviewQuestion[] = [
  {
    id: "cg4-rasterization-1",
    chapter: "cg4-rasterization",
    level: 1,
    question: `什么是光栅化？它的输入和输出分别是什么？`,
    answer: `光栅化是将连续的几何图元（如三角形）转换为离散像素片段的过程。输入是图元装配后的顶点（位置、深度、纹理坐标等属性），输出是覆盖该图元的片段集合，每个片段包含插值后的属性值。`,
    tags: ["光栅化", "基础概念"],
  },
  {
    id: "cg4-rasterization-2",
    chapter: "cg4-rasterization",
    level: 2,
    question: `光栅化中顶点属性是如何从顶点插值到片段的？使用什么方法？`,
    answer: `使用重心坐标插值。对于三角形内任一片段，计算其相对于三个顶点的重心坐标 (a, b, c)，其中 a+b+c=1。然后属性值 = a*v0 + b*v1 + c*v2。在透视投影下需要做透视正确插值（先除以 w 插值再乘回 w），否则插值结果会有透视失真。`,
    tags: ["重心坐标", "属性插值"],
  },
  {
    id: "cg4-rasterization-3",
    chapter: "cg4-rasterization",
    level: 3,
    question: `什么是透视正确插值？为什么普通的线性插值在透视投影下会出错？`,
    answer: `透视投影后，屏幕空间的线性插值不等价于世界空间的线性插值，因为透视除法（除以 w）是非线性的。透视正确插值的做法是：对属性除以顶点的 w 值后做线性插值，再在片段中乘回插值后的 w。公式：attr/w 用重心坐标插值，w 也用重心坐标插值，最终 attr = (插值后的 attr/w) / (插值后的 1/w)。这样保证了世界空间的正确属性渐变。`,
    tags: ["透视插值", "投影"],
  },
  {
    id: "cg4-rasterization-4",
    chapter: "cg4-rasterization",
    level: 4,
    question: `解释扫描线算法与边界函数算法在三角形光栅化中的区别，并说明 GPU 为什么倾向使用边界函数算法。`,
    answer: `扫描线算法逐行处理三角形，对每条扫描线计算与三角形边的交点，填充交点间的像素。边界函数（edge function）算法对每个像素计算三条边的有向距离符号，全同号则在三角形内。GPU 倾向边界函数因为：1) 每像素独立判定，天然适合 GPU 的并行tile渲染；2) 无需排序顶点；3) 可增量计算（相邻像素差分）；4) 支持任意凸多边形扩展。扫描线有数据依赖（需知道行起止），不利于大规模并行。`,
    tags: ["扫描线", "边界函数", "GPU并行"],
  },
];
