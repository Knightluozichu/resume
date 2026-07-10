import type { ReviewQuestion } from "./types";

/** 顶点/片元着色器 复习题 */
export const useVertexFragmentQuestions: ReviewQuestion[] = [
  {
    id: "use-vertex-fragment-1",
    chapter: "use-vertex-fragment",
    level: 1,
    question: `appdata和v2f结构体分别是什么？`,
    answer: `appdata定义顶点着色器输入(从顶点缓冲读取POSITION/UV/NORMAL)。v2f定义顶点着色器输出到片元着色器的数据(经光栅化插值)。数据流：顶点缓冲->appdata->vert->v2f->插值->frag。`,
    tags: ["appdata", "v2f"],
  },
  {
    id: "use-vertex-fragment-2",
    chapter: "use-vertex-fragment",
    level: 2,
    question: `为什么需要语义绑定(Semantic)？`,
    answer: `语义标记(POSITION/TEXCOORD0/SV_POSITION)告诉GPU变量用途。GPU需知道哪个是裁剪空间位置(SV_POSITION用于光栅化)，哪个从顶点缓冲映射(POSITION对应mesh顶点)，哪些可插值(TEXCOORD0等)。没有语义GPU无法路由数据。`,
    tags: ["语义绑定"],
  },
  {
    id: "use-vertex-fragment-3",
    chapter: "use-vertex-fragment",
    level: 3,
    question: `为什么片元着色器中需要重新归一化法线？`,
    answer: `法线从顶点经光栅化插值后向量长度改变(不再是单位向量)。做光照计算dot(N,L)前必须normalize(N)，否则光照不均匀。这是初学者最常犯的错误之一。`,
    tags: ["法线", "normalize"],
  },
  {
    id: "use-vertex-fragment-4",
    chapter: "use-vertex-fragment",
    level: 4,
    question: `设计一个支持主光+环境光+纹理的完整顶点片元Shader，分析每个数据传递环节。`,
    answer: `appdata: float4 vertex:POSITION, float2 uv:TEXCOORD0, float3 normal:NORMAL。vert: 1)UnityObjectToClipPos(vertex)计算裁剪空间位置存入v2f.pos:SV_POSITION; 2)uv直接传递存入v2f.uv:TEXCOORD0; 3)UnityObjectToWorldNormal(normal)计算世界法线存入v2f.worldNormal:TEXCOORD1; 4)v2f.worldPos=mul(unity_ObjectToWorld,vertex):TEXCOORD2。光栅化对uv/worldNormal/worldPos做透视校正插值。frag: 1)tex2D(_MainTex,i.uv)采样纹理; 2)normalize(i.worldNormal)归一化法线; 3)normalize(_WorldSpaceLightPos0)获取光源方向; 4)max(0,dot(N,L))计算Lambert漫反射; 5)col.rgb=albedo*diff*LightColor+albedo*ambient。每个环节：顶点缓冲->appdata(语义映射)，vert->v2f(计算+传递)，插值(光栅化)，frag(最终计算)。`,
    tags: ["顶点片元Shader", "综合"],
  },
];