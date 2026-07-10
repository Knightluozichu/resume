import type { ReviewQuestion } from "./types";

export const GpgLightingShadowsQuestions: ReviewQuestion[] = [
  {
    id: "gpg-lighting-shadows-1",
    chapter: "gpg-lighting-shadows",
    level: 1,
    question: `Shadow Map 的基本原理是什么？`,
    answer: `从光源位置渲染整个场景只存深度值到纹理，渲染主场景时把每个像素变换到光源空间与阴影图深度比较，深度更大则被遮挡处于阴影中。`,
    tags: ["Shadow Map", "原理"],
  },
  {
    id: "gpg-lighting-shadows-2",
    chapter: "gpg-lighting-shadows",
    level: 2,
    question: `PCF 和直接模糊阴影图有什么本质区别？`,
    answer: `PCF 在深度比较阶段对多个采样点分别判断遮挡再取平均，每个点遮挡关系物理正确。直接模糊是对比较结果做后处理，会把本该锐利的接触阴影也糊掉。PCSS 进一步根据遮挡距离自适应采样半径。`,
    tags: ["PCF", "模糊", "软阴影"],
  },
  {
    id: "gpg-lighting-shadows-3",
    chapter: "gpg-lighting-shadows",
    level: 3,
    question: `阴影的「软」来自什么物理因素？PCSS 如何利用这个原理？`,
    answer: `来自光源面积。点光源产生硬阴影；面光源不同部分投射的阴影相互错开形成半影。PCSS 根据遮挡物到投影面的距离计算半影宽度（距离越远半影越宽），自适应调整采样半径，物理上更准确。`,
    tags: ["软阴影", "PCSS", "面光源"],
  },
  {
    id: "gpg-lighting-shadows-4",
    chapter: "gpg-lighting-shadows",
    level: 4,
    question: `级联阴影图（CSM）解决了什么问题？它的代价是什么？`,
    answer: `解决单一阴影图分辨率不足导致近处锯齿的问题。CSM 把视锥体分段，近段用高分辨率、远段用低分辨率。代价是多次渲染阴影图（每级一次）和段间拼接时的缝隙或重叠，需要用模糊过渡掩盖拼接痕迹。`,
    tags: ["CSM", "级联", "优化"],
  },
];
