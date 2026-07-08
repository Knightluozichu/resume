import type { ReviewQuestion } from "./types";

/** 深度与法线纹理 复习题 */
export const useDepthNormalQuestions: ReviewQuestion[] = [
  {
    id: "use-depth-normal-1",
    chapter: "use-depth-normal",
    level: 1,
    question: "深度纹理存储的是什么数据？",
    answer: "存储每个像素的裁剪空间Z值(非线性深度)。近处精度高远处精度低。使用前需用Linear01Depth()线性化，使深度值与实际距离成正比。",
    tags: ["深度纹理"],
  },
  {
    id: "use-depth-normal-2",
    chapter: "use-depth-normal",
    level: 2,
    question: "如何用深度纹理重建世界空间位置？",
    answer: "1)采样深度得depth；2)构建NDC坐标float4(uv*2-1,depth,1)；3)Y轴翻转处理(_ProjectionParams.x)；4)用逆VP矩阵变换mul(unity_MatrixInvVP,clipPos)；5)除以w得worldPos。",
    tags: ["位置重建", "逆VP矩阵"],
  },
  {
    id: "use-depth-normal-3",
    chapter: "use-depth-normal",
    level: 3,
    question: "深度纹理在哪些后处理效果中使用？",
    answer: "雾效(按深度衰减)、景深(按深度模糊)、轮廓描边(深度差检测边缘)、屏幕空间反射SSR(深度重建位置做射线追踪)、SSAO(深度+法线计算遮挡)、运动模糊(深度重建速度)等。",
    tags: ["后处理", "应用"],
  },
  {
    id: "use-depth-normal-4",
    chapter: "use-depth-normal",
    level: 4,
    question: "设计一个基于深度纹理的屏幕空间描边效果，分析其优缺点。",
    answer: "方案：1)渲染场景后获取深度纹理和法线纹理。2)后处理Shader对每个像素采样自身和右/下邻居的深度和法线。3)计算深度差deltaDepth=abs(depth-self, depth-neighbor)和法线差deltaNormal=1-dot(normal, normalNeighbor)。4)如果deltaDepth>阈值或deltaNormal>阈值则为边缘，输出描边色。优点：1)不需额外Pass，一个后处理完成；2)对任何几何体通用。缺点：1)只检测屏幕空间边缘，物体内部被遮挡的边缘检测不到；2)深度精度影响边缘检测质量(远处深度精度低边缘粗)；3)法线纹理精度有限；4)阈值需手动调整，不同场景不同。改进：用Sobel算子多方向采样、深度和法线分别设不同阈值、结合颜色差检测。",
    tags: ["描边效果", "综合"],
  },
];