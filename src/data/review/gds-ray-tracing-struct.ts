import type { ReviewQuestion } from "./types";

/** 光线追踪空间结构 复习题 */
export const gdsRayTracingStructQuestions: ReviewQuestion[] = [
  {
    id: "gds-ray-tracing-struct-1",
    chapter: "gds-ray-tracing-struct",
    level: 1,
    question: "BVH 射线遍历的基本流程是什么？",
    answer: "从根开始用 slab method 测射线-AABB 相交。不相交剪枝。叶节点用 Moller-Trumbore 测三角形。前向排序+剪枝使复杂度 O(log n)。",
    tags: ["遍历"],
  },
  {
    id: "gds-ray-tracing-struct-2",
    chapter: "gds-ray-tracing-struct",
    level: 2,
    question: "Moller-Trumbore 算法的原理？",
    answer: "重心坐标 P=(1-u-v)V0+uV1+vV2=O+tD，解 3x3 方程组得 t,u,v。有效条件 t≥0,u≥0,v≥0,u+v≤1。O(1) 复杂度，同时给出交点和重心坐标。",
    tags: ["Moller-Trumbore"],
  },
  {
    id: "gds-ray-tracing-struct-3",
    chapter: "gds-ray-tracing-struct",
    level: 3,
    question: "前向排序+剪枝如何把 BVH 遍历从 O(n) 降为 O(log n)？",
    answer: "前向排序：近子树先访问得 t_best。远子树 AABB 最近距离≥t_best 时跳过。每层只递归近子树，远子树被剪枝。树高 O(log n)，每层 O(1) 工作（AABB 测试），总 O(log n)。",
    tags: ["剪枝"],
  },
  {
    id: "gds-ray-tracing-struct-4",
    chapter: "gds-ray-tracing-struct",
    level: 4,
    question: "GPU 光线追踪如何优化 BVH 遍历？",
    answer: "紧凑 BVH（32B 节点对齐）提高缓存利用率。MBVH（4/8 叉）减少树高和 warp 分歧。队列式遍历替代递归栈。NVIDIA RTX 硬件核心加速 BVH 遍历。这些优化使 GPU 光线追踪实时化。",
    tags: ["GPU", "优化"],
  },
];
