import type { ReviewQuestion } from "./types";

/** 几何图元：点、向量、射线与平面 复习题 */
export const gdsGeomPrimitivesQuestions: ReviewQuestion[] = [
  {
    id: "gds-geom-primitives-1",
    chapter: "gds-geom-primitives",
    level: 1,
    question: `点和向量的区别是什么？`,
    answer: `点表示位置 P=(x,y,z)，向量表示方向 v=(dx,dy,dz)。点+向量=点（平移），点-点=向量（方向）。语义不同需区分。`,
    tags: ["基本概念"],
  },
  {
    id: "gds-geom-primitives-2",
    chapter: "gds-geom-primitives",
    level: 2,
    question: `射线-平面相交公式是什么？`,
    answer: `射线 R(t)=O+tD，平面 N·X+d=0。t=-(N·O+d)/(N·D)。t<0 无效（反方向），N·D=0 平行（需额外检查共面），t≥0 交点=O+tD。`,
    tags: ["求交"],
  },
  {
    id: "gds-geom-primitives-3",
    chapter: "gds-geom-primitives",
    level: 3,
    question: `Moller-Trumbore 算法的原理和复杂度？`,
    answer: `利用重心坐标 P=(1-u-v)V0+uV1+vV2=O+tD，解 3x3 线性方程组得 t,u,v。有效条件：t≥0, u≥0, v≥0, u+v≤1。复杂度 O(1)，2次叉积+3次点积。`,
    tags: ["Moller-Trumbore"],
  },
  {
    id: "gds-geom-primitives-4",
    chapter: "gds-geom-primitives",
    level: 4,
    question: `射线-AABB 相交的 slab method 原理是什么？`,
    answer: `每轴独立计算射线进出 slab 的参数 t_near 和 t_far（区间 [t1,t2]）。三轴区间的交集非空且 t_max≥0 则相交。O(1) 复杂度，是 BVH 遍历的基本操作。`,
    tags: ["AABB", "slab method"],
  },
];
