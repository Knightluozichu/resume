import type { ReviewQuestion } from "./types";

export const CgpAdvancedTopicsQuestions: ReviewQuestion[] = [
  {
    id: "cgp-advanced-topics-1",
    chapter: "cgp-advanced-topics",
    level: 1,
    question: "计算机图形学中「高级主题」通常包括哪些？",
    answer: "动画（关键帧/物理/角色）、特效（粒子/流体）、物理仿真（碰撞/布料）、虚拟现实（立体渲染/延迟要求）、科学可视化、GPU 通用计算。",
    tags: ["高级主题", "动画"],
  },
  {
    id: "cgp-advanced-topics-2",
    chapter: "cgp-advanced-topics",
    level: 2,
    question: "关键帧动画和程序化动画的区别是什么？",
    answer: "关键帧动画由动画师手动设定关键姿态，系统在关键帧间插值。程序化动画由算法实时计算（如物理仿真、过程化运动），无需手动设定。关键帧可控但工作量大，程序化自动但难精确控制。现代游戏常混合：关键帧做基础动作，程序化做物理叠加（如布娃娃）。",
    tags: ["关键帧", "程序化", "动画"],
  },
  {
    id: "cgp-advanced-topics-3",
    chapter: "cgp-advanced-topics",
    level: 3,
    question: "角色动画中骨骼蒙皮（Skinning）的原理是什么？",
    answer: "骨骼蒙皮把网格顶点绑定到骨骼，每个顶点有权重决定受哪些骨骼影响。动画时骨骼变换，顶点按权重加权跟随骨骼移动。顶点着色器中用骨骼矩阵调色板（每顶点最多4个骨骼）做线性混合蒙皮（LBS）。问题是大角度弯曲有「糖果纸」扭曲，可用双四元数蒙皮（DQS）缓解。",
    tags: ["骨骼蒙皮", "Skinnning", "LBS"],
  },
  {
    id: "cgp-advanced-topics-4",
    chapter: "cgp-advanced-topics",
    level: 4,
    question: "虚拟现实（VR）渲染相比传统渲染有什么特殊要求和技术挑战？",
    answer: "要求：立体渲染（左右眼各一帧）、高帧率（90-120fps 防眩晕）、低延迟（运动到光子 <20ms）。挑战：渲染量翻倍（双眼）但帧预算更紧，需用单 Pass 立体渲染（一次提交两个视图）；镜头畸变校正需后处理桶形畸变；注视点渲染（中心高清边缘低清）利用人眼只中心清晰的特点省算力。这些约束让 VR 渲染成为实时渲染的极端场景。",
    tags: ["VR", "立体渲染", "注视点"],
  },
];
