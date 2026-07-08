import type { ReviewQuestion } from "./types";

/** 深入理解 OpenGL WebGL OpenGL ES 总复习 复习题 */
export const dogFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dog-final-review-1",
    chapter: "dog-final-review",
    level: 1,
    question: "把全书数据流串成一条链。",
    answer: "取上下文 → 建 VAO/VBO/EBO → 编译链接着色器 → 设状态（useProgram/enable）→ drawElements →（可选）FBO 后处理 → 输出屏幕 → 上下文丢失时恢复。",
    tags: ["数据流"],
  },
  {
    id: "dog-final-review-2",
    chapter: "dog-final-review",
    level: 2,
    question: "渲染优化有哪三大方向？各有哪些手段？",
    answer: "三方向：减 draw call（批处理合并 VBO、实例化复制副本）；排状态（按 shader→纹理→其他分组绘制减少 useProgram/bindTexture 切换）；降带宽（纹理图集、压缩纹理 ETC/ASTC、视锥/遮挡剔除、LOD）。目标让 GPU 忙于画图而非等 CPU 下命令。",
    tags: ["优化"],
  },
  {
    id: "dog-final-review-3",
    chapter: "dog-final-review",
    level: 3,
    question: "画面黑屏给出诊断三步与可能根因。",
    answer: "三步：查 getError 错误码 → 查 getShaderInfoLog/getProgramInfoLog 着色器日志 → 用 Spector.js/RenderDoc 帧抓取逐 draw 核对管线状态。可能根因：着色器编译链接失败、VAO/VBO 绑定顺序错（属性指针没在 VAO 绑定时设）、uniform 没设、viewport/清屏错、深度测试状态不当、上下文丢失未恢复。",
    tags: ["黑屏诊断"],
  },
  {
    id: "dog-final-review-4",
    chapter: "dog-final-review",
    level: 4,
    question: "移动端发热严重、桌面正常，只优化着色器无效，原因与对策？",
    answer: "原因：移动 GPU 用 TBDR，头号杀手是过度绘制而非着色器计算，只优化着色器不对症。对策：减透明、不透明前向排序、early-z/预深度 pass 降每块片元数；位置用 highp 防条纹、颜色用 mediump 省电；按能力分级降级（WebGL2/HDR→LDR→WebGL1+扩展）；用 GPU timer query 确认瓶颈确在片元/带宽而非 CPU。",
    tags: ["综合", "TBDR", "移动端"],
  },
];
