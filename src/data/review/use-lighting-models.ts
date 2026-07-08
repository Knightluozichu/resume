import type { ReviewQuestion } from "./types";

/** 光照模型实现 复习题 */
export const useLightingModelsQuestions: ReviewQuestion[] = [
  {
    id: "use-lighting-models-1",
    chapter: "use-lighting-models",
    level: 1,
    question: "Lambert漫反射的公式是什么？",
    answer: "diffuse = max(0, dot(N,L)) * albedo * lightColor。N是法线，L是光源方向。dot(N,L)是余弦因子，max(0,...)防止背光面出现负值。",
    tags: ["Lambert", "漫反射"],
  },
  {
    id: "use-lighting-models-2",
    chapter: "use-lighting-models",
    level: 2,
    question: "逐顶点光照和逐片元光照的区别是什么？",
    answer: "逐顶点在顶点着色器算光照，结果插值到片元，快但低面模型有马赫带。逐片元在片元着色器用插值法线算光照，慢但平滑。现代标准用逐片元。",
    tags: ["逐顶点", "逐片元"],
  },
  {
    id: "use-lighting-models-3",
    chapter: "use-lighting-models",
    level: 3,
    question: "Blinn-Phong相比Phong有什么改进？",
    answer: "Blinn-Phong用半角向量H=normalize(L+V)替代反射向量R=reflect(-L,N)。H计算更简单(加法+归一化 vs 反射公式)，且H与N的夹角是R与V夹角的一半，高光过渡更平滑自然。性能和质量都优于Phong。",
    tags: ["Blinn-Phong", "对比"],
  },
  {
    id: "use-lighting-models-4",
    chapter: "use-lighting-models",
    level: 4,
    question: "实现一个支持多光源(1个主光+2个附加光)的Shader，分析ForwardBase和ForwardAdd的区别。",
    answer: "ForwardBase Pass处理主光(最亮的方向光)+环境光+全局光照。ForwardAdd Pass处理每个附加光，按附加光数量执行多次(每个附加光一个Pass)。ForwardBase输出 = ambient + mainLight.diffuse + mainLight.specular + GI。ForwardAdd输出 = addLight.diffuse + addLight.specular，通过Blend One One叠加到ForwardBase结果上。关键区别：ForwardBase只执行一次且包含环境光/GI，ForwardAdd每个附加光执行一次且只算该光的贡献，用加法混合叠加。附加光越多Draw Call越多，Forward渲染在多光源时性能下降明显。代码需用#ifdef POINT/SPOT等宏区分光源类型，用_WorldSpaceLightPos0(w分量=0为方向光,1为点光)和unity_4LightPosX/Y/Z等内置数组获取光源信息。",
    tags: ["多光源", "ForwardBase", "ForwardAdd", "综合"],
  },
];