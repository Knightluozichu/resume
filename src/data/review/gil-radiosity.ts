import type { ReviewQuestion } from "./types";

/** 辐射度方法 复习题 */
export const gilRadiosityQuestions: ReviewQuestion[] = [
  {
    id: "gil-radiosity-1",
    chapter: "gil-radiosity",
    level: 1,
    question: "辐射度方法的核心假设是什么？",
    answer: "所有表面是理想漫反射(Lambert)。光均匀散射到所有方向，每个面片只需一个标量值(辐射度B)，不需方向信息。",
    tags: ["辐射度", "假设"],
  },
  {
    id: "gil-radiosity-2",
    chapter: "gil-radiosity",
    level: 2,
    question: "形状因子的物理含义是什么？受哪些因素影响？",
    answer: "F_ij 表示面片j发出的光有多少比例到达面片i。是纯几何量，受距离、朝向、遮挡和面积比影响。",
    tags: ["形状因子"],
  },
  {
    id: "gil-radiosity-3",
    chapter: "gil-radiosity",
    level: 3,
    question: "为什么辐射度方法不适合光泽和镜面表面？",
    answer: "光泽和镜面反射的光分布依赖方向——不同方向反射不同强度的光。辐射度方法的漫反射假设使每面片只需标量值B，无法表达方向性。处理方向性反射需要存储方向分布（如球面谐波），大幅增加维度和计算量，失去辐射度方法的简洁性。",
    tags: ["辐射度", "限制"],
  },
  {
    id: "gil-radiosity-4",
    chapter: "gil-radiosity",
    level: 4,
    question: "对比辐射度方法与路径追踪在漫反射室内场景中的优劣。",
    answer: "辐射度优势：1)解是全局的，一次求解所有面片亮度，视角无关——换视角不需重新计算；2)无噪声，是确定性求解。劣势：1)只适合漫反射，不能处理镜面/光泽；2)面片离散化导致几何误差；3)形状因子O(N^2)预计算开销大；4)遮挡变化需重新计算。路径追踪优势：1)支持任意BRDF；2)无离散化误差；3)遮挡自然处理。劣势：1)有噪声需大量采样；2)每换视角需重新渲染。室内漫反射场景用辐射度（如建筑可视化），复杂材质场景用路径追踪。",
    tags: ["对比", "综合"],
  },
];