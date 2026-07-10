import type { ReviewQuestion } from "./types";

export const bl3SculptingQuestions: ReviewQuestion[] = [
  {
    id: "bl3-sculpting-1",
    chapter: "bl3-sculpting",
    level: 1,
    question: `雕刻模式和编辑模式的核心区别是什么？`,
    answer: `雕刻模式操作顶点位移（用笔刷推拉），不关心拓扑结构；编辑模式操作点线面的精确选择和变换（挤出、环切），关心拓扑。`,
    tags: ["雕刻模式", "编辑模式"],
  },
  {
    id: "bl3-sculpting-2",
    chapter: "bl3-sculpting",
    level: 2,
    question: `Dyntopo 和 Multires 两种细分策略各有什么优劣？`,
    answer: `Dyntopo 随刻随加面，自由度高但拓扑杂乱，适合概念阶段。Multires 在原网格上叠加细分层，保持底层拓扑整洁可回退，但细节受初始面数限制。`,
    tags: ["Dyntopo", "Multires"],
  },
  {
    id: "bl3-sculpting-3",
    chapter: "bl3-sculpting",
    level: 3,
    question: `雕刻完的高模怎么用到游戏里？完整流程是什么？`,
    answer: `不能直接用高模。流程：1）做低面数版本（Retopo）；2）展 UV；3）烘焙高模法线和 AO 到低模贴图；4）低模+贴图导入引擎。低模提供轮廓和性能，法线贴图提供视觉细节。`,
    tags: ["烘焙", "Retopo", "游戏资产"],
  },
  {
    id: "bl3-sculpting-4",
    chapter: "bl3-sculpting",
    level: 4,
    question: `为什么雕刻适合有机体不适合硬表面？根源是什么？`,
    answer: `根源在于笔刷的模糊性——笔刷用半径范围内的衰减影响顶点，天然产生光滑过渡。有机体正是自由曲面，光滑过渡是优势。硬表面需要精确直角和硬边，笔刷的衰减让边缘变圆。`,
    tags: ["雕刻适用性", "有机体", "综合"],
  },
];
