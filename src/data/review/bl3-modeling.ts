import type { ReviewQuestion } from "./types";

export const bl3ModelingQuestions: ReviewQuestion[] = [
  {
    id: "bl3-modeling-1",
    chapter: "bl3-modeling",
    level: 1,
    question: "Blender 建模中挤出（Extrude）操作的作用是什么？",
    answer: "挤出把选中的面或边沿法线方向拉出新的几何体，是从简单形状构建复杂模型最核心的操作。快捷键 E。",
    tags: ["挤出", "建模"],
  },
  {
    id: "bl3-modeling-2",
    chapter: "bl3-modeling",
    level: 2,
    question: "镜像修改器的 Clipping 选项解决什么问题？",
    answer: "Clipping 把镜像轴附近的顶点焊接到一起，防止对称中线出现缝隙。当模型需要在中心线处完全闭合（如人物头部）时必须开启。",
    tags: ["镜像修改器", "Clipping"],
  },
  {
    id: "bl3-modeling-3",
    chapter: "bl3-modeling",
    level: 3,
    question: "为什么游戏建模要尽量使用四边形面而不是三角形或 N-gon？",
    answer: "四边形面便于环切和选中循环边，修改器（如细分曲面）对四边形变形均匀。三角形会打断循环边选择，N-gon 在细分时变形不可预测。导出到引擎时虽然都会转成三角形，但建模阶段保持四边形能提高可控性。",
    tags: ["拓扑", "四边形", "游戏建模"],
  },
  {
    id: "bl3-modeling-4",
    chapter: "bl3-modeling",
    level: 4,
    question: "高模到低模的工作流是什么？为什么不能直接用高模进游戏？",
    answer: "高模→烘焙法线贴图→低模+贴图进游戏。高模面数动辄数百万，游戏引擎无法实时渲染。通过烘焙把高模表面凹凸信息存到法线贴图中，低模用这张贴图欺骗渲染器，视觉上接近高模但性能开销可控。",
    tags: ["高模低模", "烘焙", "综合"],
  },
];
