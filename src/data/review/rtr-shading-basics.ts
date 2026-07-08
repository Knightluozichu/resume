import type { ReviewQuestion } from "./types";

export const RtrShadingBasicsQuestions: ReviewQuestion[] = [
  {
    id: "rtr-shading-basics-1",
    chapter: "rtr-shading-basics",
    level: 1,
    question: "Phong 光照模型的三个分量是什么？",
    answer: "环境光（常数模拟间接光）、漫反射（法线与光照方向点积）、镜面反射（反射方向与视线方向点积的高次幂）。",
    tags: ["Phong", "光照模型"],
  },
  {
    id: "rtr-shading-basics-2",
    chapter: "rtr-shading-basics",
    level: 2,
    question: "Blinn-Phong 相比 Phong 改进了什么？为什么更快？",
    answer: "Blinn-Phong 用半向量 H（视线与光照的中间方向）与法线的点积替代反射向量与视线的点积。避免了计算反射向量（省一次运算），且半向量在物体移动时变化更平滑，高光更稳定。",
    tags: ["Blinn-Phong", "Phong"],
  },
  {
    id: "rtr-shading-basics-3",
    chapter: "rtr-shading-basics",
    level: 3,
    question: "光照模型中的环境光分量为什么是「假」的？它有什么问题？",
    answer: "环境光是常数，模拟所有间接光的粗略近似。问题是它不随方向变化——所有角落亮度相同，没有接触阴影感，物体像漂浮不接地。现代渲染用环境光遮蔽（AO）或全局光照替代它来增加方向性。",
    tags: ["环境光", "AO", "间接光"],
  },
  {
    id: "rtr-shading-basics-4",
    chapter: "rtr-shading-basics",
    level: 4,
    question: "从 Phong 到 PBR 的演进过程中，每一步解决了什么物理问题？",
    answer: "Phong：经验模型，能量不守恒，高光不随粗糙度物理变化。Blinn-Phong：优化了高光计算但仍是经验模型。Cook-Torrance：引入微表面理论（D/G/F），能量守恒，高光随粗糙度物理变化。PBR 工作流：用金属度/粗糙度参数标准化材质表示，保证跨场景一致性。每一步都在消除经验假设、引入物理约束。",
    tags: ["Phong", "PBR", "演进"],
  },
];
