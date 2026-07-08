import type { ReviewQuestion } from "./types";

export const rtcdSatQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-sat-1",
    chapter: "rtcd-sat",
    level: 1,
    question: "分离轴定理的核心表述是什么？",
    answer: "两个凸体不相交，当且仅当存在一条轴使它们在该轴上的投影区间不重叠。SAT 的策略是把所有候选分离轴都试一遍，只要找到一条区间分离的轴就能判定不相交并提前退出；全部轴都重叠则相交。",
    tags: ["SAT", "分离轴"],
  },
  {
    id: "rtcd-sat-2",
    chapter: "rtcd-sat",
    level: 2,
    question: "SAT 为什么只对凸体有效？凹体会出什么问题？",
    answer: "SAT 依赖「凸体不相交则存在分离轴」定理，凹体不满足。凹体投影区间可能在所有轴上都重叠，但实际上凹的缺口处没有接触——投影重叠但实际分离，SAT 会误判为碰撞。对凹体必须先凸分解成多个凸片段分别用 SAT，或改用其他方法。",
    tags: ["SAT", "凸体", "凹体"],
  },
  {
    id: "rtcd-sat-3",
    chapter: "rtcd-sat",
    level: 3,
    question: "两个 3D OBB 用 SAT 最多检测几条轴？为什么？",
    answer: "15 条：①A 的 3 个面法向；②B 的 3 个面法向；③A 的 3 条边与 B 的 3 条边的叉积共 9 条。面法向覆盖面-面和面-边分离，边叉积覆盖边-边分离。$3+3+9=15$。定理保证如果两 OBB 不相交，分离轴必在这 15 条之中。",
    tags: ["OBB", "15轴", "SAT"],
  },
  {
    id: "rtcd-sat-4",
    chapter: "rtcd-sat",
    level: 4,
    question: "SAT 如何同时获得最小穿透深度和分离法向？这有什么用？",
    answer: "检测每条候选轴时记录投影重叠量，全部轴都重叠（即碰撞）时取所有重叠量的最小值作为最小穿透深度，对应的轴作为分离法向。这两个信息正是碰撞响应所需的——分离法向告诉物理引擎「沿哪个方向把物体推开」，穿透深度告诉它「推多远」。SAT 一次检测同时给出判定和响应数据，这是它相对 GJK（需配合 EPA）的优势。",
    tags: ["穿透深度", "分离法向", "碰撞响应"],
  },
];
