import type { ReviewQuestion } from "./types";

export const rtcdBvTypesQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-bv-types-1",
    chapter: "rtcd-bv-types",
    level: 1,
    question: `AABB 相交检测需要几次比较？`,
    answer: `3 次——X、Y、Z 三条轴各判断一次区间是否重叠。每条轴比较 $\\max(A_{min}, B_{min}) \\leq \\min(A_{max}, B_{max})$，任一轴不重叠即不相交。三轴全重叠才相交。`,
    tags: ["AABB", "相交检测"],
  },
  {
    id: "rtcd-bv-types-2",
    chapter: "rtcd-bv-types",
    level: 2,
    question: `为什么包围球在物体旋转时不需要更新？`,
    answer: `球具有旋转不变性：无论物体怎么旋转，包围球的球心（物体质心）和半径（最远顶点到质心距离）都不变。球是对称的，旋转后形状完全一样。而 AABB 旋转后必须重算 8 个顶点的 min/max，OBB 需乘旋转矩阵。这是包围球在动态场景中的巨大优势——零更新成本。`,
    tags: ["包围球", "旋转不变"],
  },
  {
    id: "rtcd-bv-types-3",
    chapter: "rtcd-bv-types",
    level: 3,
    question: `OBB 相交检测为什么要检测 15 条轴？`,
    answer: `SAT 定理要求检测所有候选分离轴。两个 3D OBB 各有 3 个面法向（共 6 条），加上 A 的 3 条边与 B 的 3 条边的叉积（9 条），合计 15 条。面法向覆盖面-面和面-边分离情况，边叉积覆盖边-边分离情况。这 15 条轴是完备的——定理保证如果两 OBB 不相交，分离轴必在其中。`,
    tags: ["OBB", "SAT", "15轴"],
  },
  {
    id: "rtcd-bv-types-4",
    chapter: "rtcd-bv-types",
    level: 4,
    question: `Broad Phase 为什么几乎都用 AABB 而不用 OBB，尽管 OBB 更紧密？`,
    answer: `Broad Phase 要对全部物体两两检测，数量巨大。AABB 相交只需 3 次比较且可 SIMD 批量处理 4 组；OBB 需 15 轴 SAT，慢 5 倍以上。Broad Phase 的目标是「快速排除不可能碰的对」，OBB 的紧密性优势在这里是浪费——少量误判交给 Narrow Phase 精确处理即可。紧密性在 Narrow Phase 才有价值，Broad Phase 速度比精度重要。`,
    tags: ["综合", "AABB", "OBB", "权衡"],
  },
];
