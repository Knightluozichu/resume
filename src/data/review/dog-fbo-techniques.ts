import type { ReviewQuestion } from "./types";

/** FBO 与后处理技术 复习题 */
export const dogFboTechniquesQuestions: ReviewQuestion[] = [
  {
    id: "dog-fbo-techniques-1",
    chapter: "dog-fbo-techniques",
    level: 1,
    question: `FBO 本身存图像数据吗？它需要挂哪些附件？`,
    answer: `FBO 本身不存图像数据，只是容器，需挂载附件：颜色附件（2D 纹理接收颜色）、深度附件（renderbuffer 或深度纹理记深度）、可选模板附件。挂载后用 checkFramebufferStatus 检查完整性。`,
    tags: ["FBO", "附件"],
  },
  {
    id: "dog-fbo-techniques-2",
    chapter: "dog-fbo-techniques",
    level: 2,
    question: `为什么后处理要用 FBO 而不是直接画到屏幕？`,
    answer: `后处理需要先把场景渲染成一张可采样的纹理，再以后处理着色器加工（模糊、调色、bloom）。直接画到屏幕无法把结果当输入再加工；FBO 的离屏纹理提供了「中间画布」，场景先画进它，再把纹理当输入用全屏四边形加工后画到屏幕。`,
    tags: ["后处理", "渲染到纹理"],
  },
  {
    id: "dog-fbo-techniques-3",
    chapter: "dog-fbo-techniques",
    level: 3,
    question: `FBO 没挂深度附件，开深度测试渲染 3D 场景会怎样？checkFramebufferStatus 报不完整常因什么？`,
    answer: `没挂深度附件却开深度测试会无法写深度，深度测试失效或报 FRAMEBUFFER_INCOMPLETE_ATTACHMENT。报不完整常见原因：附件尺寸不一致、格式不支持、漏挂所需附件（开了深度测试却没深度附件）、颜色附件没设可采样格式。用 checkFramebufferStatus 排查并核对完整性规则。`,
    tags: ["完整性", "深度附件"],
  },
  {
    id: "dog-fbo-techniques-4",
    chapter: "dog-fbo-techniques",
    level: 4,
    question: `渲染到 FBO 后切回屏幕画面尺寸错乱，原因是什么？ping-pong 如何实现多遍高斯模糊？`,
    answer: `原因：绑/解绑 FBO 时忘了同步 viewport，FBO 纹理尺寸与 canvas 尺寸不同；修法是每次切换渲染目标都重设 viewport（画 FBO 用纹理尺寸、画屏幕用 canvas 尺寸）。ping-pong：用两个 FBO/纹理 A、B 交替，水平模糊从 A 读写到 B、垂直模糊从 B 读写到 A，交替 N 遍；利用高斯核可分离性把二维卷积拆成两遍一维采样，大幅省纹理采样次数。`,
    tags: ["综合", "viewport", "ping-pong"],
  },
];
