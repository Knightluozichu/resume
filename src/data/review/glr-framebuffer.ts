import type { ReviewQuestion } from "./types";

export const glrFramebufferQuestions: ReviewQuestion[] = [
  {
    id: "glr-framebuffer-1",
    chapter: "glr-framebuffer",
    level: 1,
    question: "FBO和默认帧缓冲的区别？",
    answer: "默认帧缓冲是屏幕，FBO是自定义渲染目标。FBO可附加纹理(可采样)或Renderbuffer(高效不可采样)。",
    tags: ["FBO"],
  },
  {
    id: "glr-framebuffer-2",
    chapter: "glr-framebuffer",
    level: 2,
    question: "Alpha混合如何配置？",
    answer: "glEnable(GL_BLEND); glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)。result=src*alpha+dst*(1-alpha)。",
    tags: ["混合"],
  },
  {
    id: "glr-framebuffer-3",
    chapter: "glr-framebuffer",
    level: 3,
    question: "透明物体为什么要从后向前排序？",
    answer: "Alpha混合不透明排序依赖。不写深度的话后面的透明物体会被前面遮挡。必须先渲染不透明再从后向前渲染透明。",
    tags: ["透明排序"],
  },
  {
    id: "glr-framebuffer-4",
    chapter: "glr-framebuffer",
    level: 4,
    question: "FBO有哪些实际应用？",
    answer: "阴影映射(渲染深度)、后处理(场景到纹理再处理)、反射(反射视角渲染)、拾取(渲染ID到纹理)、MSAA(多重采样 resolves)。",
    tags: ["FBO应用"],
  },
];
