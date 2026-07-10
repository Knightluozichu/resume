import type { ReviewQuestion } from "./types";

export const uctNavigationQuestions: ReviewQuestion[] = [
  {
    id: "uct-navigation-1",
    chapter: "uct-navigation",
    level: 1,
    question: `NavMesh 和 NavMeshAgent 的关系是什么？`,
    answer: `NavMesh 是标记可行走区域的导航网格（地图），通过烘焙生成。NavMeshAgent 是挂在角色上的组件，在 NavMesh 上用 A* 算法寻路并自动移动。先烘焙 NavMesh 再用 Agent 寻路。`,
    tags: ["NavMesh", "NavMeshAgent"],
  },
  {
    id: "uct-navigation-2",
    chapter: "uct-navigation",
    level: 2,
    question: `为什么 A* 算法需要 NavMesh 而不能直接在 3D 网格上寻路？`,
    answer: `3D 空间每体素做 A* 计算量爆炸——100x100x10 有 10 万节点。NavMesh 把可行走区域压缩为 2D 多边形网格，节点从万级降到百级，A* 效率提升数百倍。NavMesh 本质是 3D 到 2D 的降维压缩。`,
    tags: ["A*", "NavMesh", "降维"],
  },
  {
    id: "uct-navigation-3",
    chapter: "uct-navigation",
    level: 3,
    question: `NavMeshObstacle 的 Carve 选项有什么作用？什么时候需要开启？`,
    answer: `Carve 让障碍物实时切割 NavMesh，Agent 寻路时绕开。不勾选只做碰撞避让不更新 NavMesh，Agent 可能卡住。移动的门/箱子等动态障碍需勾选 Carve。但 Carve 有性能开销，静态障碍用 Navigation Static 烘焙更好。`,
    tags: ["NavMeshObstacle", "Carve"],
  },
  {
    id: "uct-navigation-4",
    chapter: "uct-navigation",
    level: 4,
    question: `NPC 寻路时卡在角落或走不出通道，完整的排查和解决方案是什么？`,
    answer: `排查步骤：1）检查 NavMesh 烘焙是否覆盖通道（蓝色区域）；2）检查 Agent Radius 是否小于通道宽度的一半；3）检查 Slope 和 Step Height 是否允许通过台阶。解决方案：减小 Agent Radius 或加宽通道，重新烘焙，用 NavMesh visualization 确认可行走区域。NPC 抖动设 Stopping Distance 0.5-1.0。核心原则：先确认 NavMesh 覆盖正确再调 Agent 参数。`,
    tags: ["寻路问题", "排查", "综合"],
  },
];
