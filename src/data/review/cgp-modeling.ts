import type { ReviewQuestion } from "./types";

export const CgpModelingQuestions: ReviewQuestion[] = [
  {
    id: "cgp-modeling-1",
    chapter: "cgp-modeling",
    level: 1,
    question: `3D 建模的主要表示方法有哪些？`,
    answer: `多边形网格（三角形/四边形面片）、参数曲面（Bezier/NURBS）、隐式曲面（水平集/元球）、体素（3D 网格点）、点云。`,
    tags: ["建模", "表示方法"],
  },
  {
    id: "cgp-modeling-2",
    chapter: "cgp-modeling",
    level: 2,
    question: `多边形网格和 NURBS 曲面各自的优缺点是什么？`,
    answer: `多边形网格：简单通用、GPU 直接渲染、适合任意拓扑；缺点是平滑曲面需要大量三角形。NURBS：用控制点+权重精确表示曲面，平滑无离散、修改控制点即可变形；缺点是修剪拼接复杂、需转成多边形才能渲染。工业 CAD 用 NURBS，游戏电影用多边形。`,
    tags: ["多边形网格", "NURBS", "优缺点"],
  },
  {
    id: "cgp-modeling-3",
    chapter: "cgp-modeling",
    level: 3,
    question: `Catmull-Clark 细分曲面的原理是什么？它解决了什么问题？`,
    answer: `Catmull-Clark 把任意四边形网格递归细分，每次把一个面分成四个，新顶点位置按规则（面点/边点/顶点更新）平滑插值，极限收敛到平滑曲面。解决了用控制网格表示平滑曲面的问题——艺术家只需画低精度控制网格，细分自动生成平滑结果，且任意拓扑（非四边形面）也能处理。`,
    tags: ["细分曲面", "Catmull-Clark"],
  },
  {
    id: "cgp-modeling-4",
    chapter: "cgp-modeling",
    level: 4,
    question: `CSG（构造实体几何）和隐式曲面在建模中各有什么优势？什么场景适合用？`,
    answer: `CSG 用布尔运算（交/并/差）组合基本体（球/立方体），优势是精确的布尔运算（无网格裂缝），适合 CAD 机械零件。隐式曲面用 f(x,y,z)=0 定义，优势是平滑融合（元球自然合并）和精确内外判断，适合有机体（液体、肌肉、云）。两者都是非多边形表示，渲染时需转网格或直接光追。`,
    tags: ["CSG", "隐式曲面", "布尔运算"],
  },
];
