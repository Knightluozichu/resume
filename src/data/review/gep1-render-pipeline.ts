import type { ReviewQuestion } from "./types";

export const gep1RenderPipelineQuestions: ReviewQuestion[] = [
  {
    id: "gep1-render-pipeline-1",
    chapter: "gep1-render-pipeline",
    level: 1,
    question: "渲染管线的 CPU 侧和 GPU 侧分别负责什么？",
    answer: "CPU 侧负责「准备该画什么」：从场景图收集可见物体、视锥/遮挡剔除、按材质和距离排序、合批、填充命令缓冲提交给 GPU。GPU 侧负责「真正画出来」：执行图形管线，顶点着色器做 MVP 变换、光栅化生成像素、片段着色器算颜色、深度/模板测试与混合。CPU 侧目标是 Draw Call 越少越好，GPU 侧目标是每像素算得越快越好。",
    tags: ["CPU侧", "GPU侧", "Draw Call"],
  },
  {
    id: "gep1-render-pipeline-2",
    chapter: "gep1-render-pipeline",
    level: 2,
    question: "为什么不透明物体要从前到后画，透明物体要从后到前画？",
    answer: "不透明从前到后配合 Early-Z：近处物体先写深度缓冲，远处物体的片段在片段着色器执行前就被深度测试拒绝，省掉昂贵着色开销。透明物体不能写深度（否则无法被后续透明物混合），只能从后到前画，保证后面的透明物先画、前面的后画在上面混合，混合结果才正确。天空盒最后画或最先画写最远深度。",
    tags: ["绘制排序", "Early-Z", "透明"],
  },
  {
    id: "gep1-render-pipeline-3",
    chapter: "gep1-render-pipeline",
    level: 3,
    question: "合批（batching）为什么能提升性能？前提条件是什么？",
    answer: "每次 Draw Call 都有 CPU 提交开销（填充命令、切换渲染状态）。合批把多个物体合并成一次 Draw Call，减少提交次数。前提是这些物体用相同材质（相同 shader + 相同纹理 + 相同渲染状态），否则无法合并。实践常用纹理图集把多张小贴图合并成一张大贴图，让更多物体满足「同材质」条件。代价是顶点数据变大，需权衡。",
    tags: ["合批", "材质", "纹理图集"],
  },
  {
    id: "gep1-render-pipeline-4",
    chapter: "gep1-render-pipeline",
    level: 4,
    question: "顶点着色器和片段着色器各自的可编程职责是什么？为什么这样分工？",
    answer: "顶点着色器负责把每个顶点从局部空间变换到裁剪空间（MVP 矩阵乘法），并可传递顶点属性（UV、法线）给后续阶段。片段着色器决定每个像素的最终颜色——采样贴图、计算光照、雾效。这样分工是因为顶点数量少（几千到几万）而像素数量多（数百万），把昂贵的颜色计算放在片段阶段会非常慢；变换放在顶点阶段只算一次，光栅化硬件自动插值到像素。可编程分工让开发者只改关心的环节，固定阶段（图元装配、光栅化、逐像素测试）由硬件高效完成。",
    tags: ["综合", "顶点着色器", "片段着色器"],
  },
];
