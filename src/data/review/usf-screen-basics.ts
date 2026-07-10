import type { ReviewQuestion } from "./types";

export const usfScreenBasicsQuestions: ReviewQuestion[] = [
  {
    id: "usf-screen-basics-1",
    chapter: "usf-screen-basics",
    level: 1,
    question: `Unity 屏幕特效的基本原理是什么？`,
    answer: `在 OnRenderImage 回调中，将源 RenderTexture（场景渲染结果）经过材质的 Shader 处理后，输出到目标 RenderTexture。Shader 对全屏每个像素做处理，实现后处理效果。`,
    tags: ["屏幕特效", "OnRenderImage"],
  },
  {
    id: "usf-screen-basics-2",
    chapter: "usf-screen-basics",
    level: 2,
    question: `OnRenderImage 回调的 src 和 dest 参数分别是什么？`,
    answer: `src 是源 RenderTexture，包含当前帧已渲染的场景图像。dest 是目标 RenderTexture，处理后的图像输出到这里。如果 dest 为 null 则直接输出到屏幕。通过 Graphics.Blit(src, dest, material) 执行处理。`,
    tags: ["OnRenderImage", "Blit"],
  },
  {
    id: "usf-screen-basics-3",
    chapter: "usf-screen-basics",
    level: 3,
    question: `Graphics.Blit 的工作原理是什么？`,
    answer: `Blit 内部渲染一个全屏四边形，将 src 纹理绑定到材质的主纹理槽，用材质的 Shader 对每个像素做处理，输出到 dest。等价于用全屏四边形做一次绘制调用，顶点着色器只负责传递 UV，像素着色器做实际处理。`,
    tags: ["Graphics.Blit", "全屏四边形"],
  },
  {
    id: "usf-screen-basics-4",
    chapter: "usf-screen-basics",
    level: 4,
    question: `如何构建一个可扩展的多特效屏幕特效系统？`,
    answer: `1)创建 ScreenEffectBase 基类管理 OnRenderImage 2)每个效果继承基类，实现自己的 Shader 3)用链式 Blit 串联多个效果（src→tmp→tmp→dest）4)管理临时 RenderTexture 池避免 GC 5)支持效果开关和参数调节 6)移动端降分辨率处理 7)URP 中迁移到 RenderFeature。`,
    tags: ["系统设计", "RenderTexture", "实践"],
  },
];
