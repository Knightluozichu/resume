import type { ReviewQuestion } from "./types";

export const gep1TransformSystemQuestions: ReviewQuestion[] = [
  {
    id: "gep1-transform-system-1",
    chapter: "gep1-transform-system",
    level: 1,
    question: "场景层级树中，子节点的世界矩阵如何计算？",
    answer: "子节点世界矩阵 = 父节点世界矩阵 × 子节点局部矩阵，即 $M_{world}^{child} = M_{world}^{parent} \\times M_{local}^{child}$。每个节点只存相对父节点的局部变换，世界变换由父链自顶向下递归累积。枪是手的子节点，手是角色的子节点，角色移动时枪自动跟着走。",
    tags: ["场景树", "世界矩阵"],
  },
  {
    id: "gep1-transform-system-2",
    chapter: "gep1-transform-system",
    level: 2,
    question: "TRS 分解是什么？矩阵组合顺序为什么重要？",
    answer: "TRS 把变换分解为平移 T、旋转 R（四元数）、缩放 S，组合成 $M = T \\times R \\times S$（先缩放、再旋转、再平移）。顺序重要是因为矩阵乘法不满足交换律：如果写成 $S \\times R \\times T$ 会先平移再缩放，物体位置会被缩放拉偏。TRS 顺序是引擎约定俗成的，编辑器和动画系统都按此分解分别控制三个分量。",
    tags: ["TRS", "矩阵顺序"],
  },
  {
    id: "gep1-transform-system-3",
    chapter: "gep1-transform-system",
    level: 3,
    question: "脏标记优化如何避免每帧重算所有变换？",
    answer: "只有局部变换改变的节点标记 `localDirty`，父节点 dirty 才递归标记子节点 `worldDirty`。遍历时只重算标记 dirty 的节点，未标记的直接用缓存的世界矩阵。大部分静态物体（建筑、地形）永不变 dirty，零开销。这样把每帧 O(n) 的全量重算降到 O(改变的节点数)，对上千节点场景收益巨大。",
    tags: ["脏标记", "优化"],
  },
  {
    id: "gep1-transform-system-4",
    chapter: "gep1-transform-system",
    level: 4,
    question: "为什么 View 矩阵是摄像机世界矩阵的逆？请从坐标空间变换的角度分析。",
    answer: "View 矩阵的作用是把世界空间变换到观察空间（摄像机视角）。摄像机的世界矩阵 $M_{cam}$ 把摄像机从原点变换到它在场景中的位置和朝向。要让世界「从摄像机视角看」，就是做这个变换的逆——把摄像机移回原点，整个世界跟着反向移动。所以 $M_{view} = M_{cam}^{-1}$。从坐标空间角度：世界空间是物体相对世界原点的坐标，观察空间是物体相对摄像机的坐标，两者之间就是摄像机自身的变换，取逆即得 View。",
    tags: ["综合", "View矩阵", "坐标空间"],
  },
];
