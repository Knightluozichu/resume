import type { ReviewQuestion } from "./types";

export const gep2CollisionSystemQuestions: ReviewQuestion[] = [
  {
    id: "gep2-collision-system-1",
    chapter: "gep2-collision-system",
    level: 1,
    question: "碰撞检测的三阶段是什么？各阶段输出什么？",
    answer:
      "广相（Broadphase）用 AABB 扫掠排序快速排除显然不相交对，输出候选对列表；窄相（Narrowphase）用 GJK/SAT 精确判断候选对是否相交，输出是否碰撞+接触点；流形（Manifold）构造接触法线、深度、位置，输出 Contact Manifold 供物理求解器使用。",
    tags: ["三阶段", "广相窄相流形"],
  },
  {
    id: "gep2-collision-system-2",
    chapter: "gep2-collision-system",
    level: 2,
    question: "为什么不能直接对所有物体两两做窄相检测？",
    answer:
      "窄相（GJK/SAT）虽精确但开销大，n 个物体两两就是 O(n²) 次检测，物体上千时帧率崩盘。广相用廉价的 AABB 包围盒先排除绝大多数显然不相交的对（空间上离得远的），只把「可能相交」的少数候选对交给窄相。这样把 O(n²) 的精确检测压到接近 O(n + k)，k 为真正接近的对数。",
    tags: ["广相", "复杂度", "性能"],
  },
  {
    id: "gep2-collision-system-3",
    chapter: "gep2-collision-system",
    level: 3,
    question: "GJK 和 EPA 各解决什么问题？它们如何配合？",
    answer:
      "GJK 求「两个凸体之间的最短距离」：用 Minkowski 差和支持点迭代逼近原点，距离大于 0 即不相交、等于 0 即刚好接触。当 GJK 发现 Minkowski 差包含原点（相交）时，它无法给出穿透深度，这时交给 EPA：从 GJK 的单纯形向外扩展，找到原点到 Minkowski 差边界的最近点，从而得到穿透深度和方向（法线）。GJK 定性、EPA 定量，配合给出完整的接触信息。",
    tags: ["GJK", "EPA", "凸体"],
  },
  {
    id: "gep2-collision-system-4",
    chapter: "gep2-collision-system",
    level: 4,
    question: "接触流形为什么可能包含多个接触点？单点接触会有什么问题？",
    answer:
      "两个面接触的物体（如箱子放在地上）实际接触是一个面，离散成多个接触点才能稳定。若只用单个接触点，求解器施加冲量时会产生不正确的力矩——箱子会绕接触点翻转打滑，无法静止堆叠。多点流形（如 4 个角点）让冲量分布，形成稳定的支撑，堆叠才不会塌。引擎通常对每个 manifold 限制接触点数（如最多 4 个）以平衡精度与性能，并用「流形裁剪」从 SAT/GJK 结果中提取最稳定的几个点。",
    tags: ["流形", "接触点", "稳定性", "综合"],
  },
];
