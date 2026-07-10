import type { ReviewQuestion } from "./types";

export const bl3FinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "bl3-final-review-1",
    chapter: "bl3-final-review",
    level: 1,
    question: `Blender 游戏美术管线的完整步骤是什么？`,
    answer: `界面设置→建模→展UV→材质→灯光→动画（如需）→雕刻烘焙（如需）→渲染→导出FBX→引擎验证。每一步都依赖前一步的产出。`,
    tags: ["美术管线", "全书复习"],
  },
  {
    id: "bl3-final-review-2",
    chapter: "bl3-final-review",
    level: 2,
    question: `在完整管线中，哪个环节最容易出错且返工成本最高？为什么？`,
    answer: `建模。建模是所有后续环节的输入——拓扑错了导致 UV 展不好、材质贴不对、骨骼绑不上、导出面数超标。后期发现建模问题需要回退到最初重新搭型，后面所有环节都要重来。`,
    tags: ["建模", "返工成本"],
  },
  {
    id: "bl3-final-review-3",
    chapter: "bl3-final-review",
    level: 3,
    question: `如何确保 Blender 到 Unity 的导出「所见即所得」？`,
    answer: `1）建模后应用缩放（Ctrl+A）；2）重算法线向外（Ctrl+N）；3）展 UV 并用 Principled BSDF 标准材质；4）导出 FBX 勾选 Tangent Space 和 Apply Modifiers；5）选对坐标系（Unity Y-up）；6）引擎导入后逐项验证大小、朝向、材质、法线。`,
    tags: ["导出", "Unity", "所见即所得"],
  },
  {
    id: "bl3-final-review-4",
    chapter: "bl3-final-review",
    level: 4,
    question: `如果让你从零做一个游戏角色并导出到 Unity，你会怎么规划工作流以最小化返工？`,
    answer: `先定面数预算和参考图；建模时先规划拓扑流向（关节环线、四边形为主），用镜像修改器做对称；展 UV 时检查重叠和拉伸；材质用 Principled BSDF 标准节点；雕刻高模后烘焙法线到低模；绑骨刷权重测试变形；最后应用缩放、重算法线、导出 FBX 并在 Unity 逐项验证。关键原则：每完成一步就检查输出，不把问题留到后面。`,
    tags: ["工作流规划", "综合", "实践"],
  },
];
