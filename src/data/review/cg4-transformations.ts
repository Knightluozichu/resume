import type { ReviewQuestion } from "./types";

/** 几何变换与坐标系 复习题 */
export const cg4TransformationsQuestions: ReviewQuestion[] = [
  {
    id: "cg4-transformations-1",
    chapter: "cg4-transformations",
    level: 1,
    question: `图形学中常见的四个坐标空间是什么？它们的变换顺序是怎样的？`,
    answer: `模型空间（局部）→ 世界空间 → 视图空间（摄像机）→ 裁剪空间。变换顺序：模型矩阵(Model)将局部坐标转世界坐标，视图矩阵(View)将世界坐标转摄像机视角，投影矩阵(Projection)将3D坐标投影到裁剪空间。组合为 v_clip = P * V * M * v_local。`,
    tags: ["坐标空间", "变换链"],
  },
  {
    id: "cg4-transformations-2",
    chapter: "cg4-transformations",
    level: 2,
    question: `齐次坐标是什么？为什么图形学要用 4x4 矩阵而不是 3x3？`,
    answer: `齐次坐标用 (x, y, z, w) 表示 3D 点，当 w=1 时是点，w=0 时是方向向量。用 4x4 矩阵是因为平移无法用 3x3 线性变换表示——3x3 只能表示旋转和缩放。通过齐次坐标的第 4 列可以表示平移，使得所有仿射变换（旋转+缩放+平移）统一为一个矩阵乘法，且变换可以矩阵连乘合并。`,
    tags: ["齐次坐标", "4x4矩阵", "平移"],
  },
  {
    id: "cg4-transformations-3",
    chapter: "cg4-transformations",
    level: 3,
    question: `透视投影矩阵和正交投影矩阵的区别是什么？各自适用于什么场景？`,
    answer: `透视投影：近大远小，有透视感，投影矩阵中 w 分量与 z 相关（透视除法后产生非均匀压缩）。适用于 3D 游戏、虚拟现实等需要真实空间感的场景。正交投影：无近大远小，平行线保持平行，w 分量恒为 1。适用于 2D 游戏、CAD 建模、UI 渲染等需要精确尺寸测量的场景。`,
    tags: ["透视投影", "正交投影", "投影矩阵"],
  },
  {
    id: "cg4-transformations-4",
    chapter: "cg4-transformations",
    level: 4,
    question: `给定摄像机位置 eye、目标位置 target 和上方向 up，推导 View 矩阵的构造过程。`,
    answer: `1) 计算前向 f = normalize(target - eye)；2) 计算右向 r = normalize(cross(f, up))；3) 计算真实上向 u = cross(r, f)；4) View 矩阵 = [r.x u.x -f.x 0; r.y u.y -f.y 0; r.z u.z -f.z 0; -dot(r,eye) -dot(u,eye) dot(f,eye) 1]（行主序）。本质是先平移 -eye 到原点，再做基变换将世界坐标轴对齐到摄像机坐标轴。注意 f 取负是因为摄像机看向 -Z 方向。`,
    tags: ["View矩阵", "摄像机", "基变换"],
  },
];
