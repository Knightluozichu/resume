import type { ReviewQuestion } from "./types";

/** Shader 基础与渲染管线 复习题 */
export const useShaderBasicsQuestions: ReviewQuestion[] = [
  {
    id: "use-shader-basics-1",
    chapter: "use-shader-basics",
    level: 1,
    question: `Unity渲染管线的主要阶段是什么？`,
    answer: `顶点着色器(MVP变换)->光栅化(三角形转片元)->片元着色器(计算颜色)->输出合并(深度测试+混合+帧缓冲)。其中顶点和片元着色器是可编程的。`,
    tags: ["渲染管线", "基础"],
  },
  {
    id: "use-shader-basics-2",
    chapter: "use-shader-basics",
    level: 2,
    question: `MVP矩阵的三个变换分别做什么？`,
    answer: `Model将顶点从模型空间变换到世界空间(平移/旋转/缩放)。View将世界空间变换到视图空间(相机视角)。Projection将视图空间变换到裁剪空间(透视/正交投影)。三者乘积MVP一步从模型空间到裁剪空间。`,
    tags: ["MVP矩阵", "空间变换"],
  },
  {
    id: "use-shader-basics-3",
    chapter: "use-shader-basics",
    level: 3,
    question: `光栅化做了什么？顶点属性如何传递到片元？`,
    answer: `光栅化将三角形图元转换为片元——确定屏幕上哪些像素被覆盖。顶点属性(UV/法线/颜色)在三角形内部按重心坐标线性插值传递到每个片元。透视投影下需透视校正插值。`,
    tags: ["光栅化", "插值"],
  },
  {
    id: "use-shader-basics-4",
    chapter: "use-shader-basics",
    level: 4,
    question: `分析为什么片元不等于像素，以及深度测试在其中的角色。`,
    answer: `片元是像素的候选者。当多个三角形重叠时，同一像素位置有多个片元。深度测试比较片元的深度值(z坐标)，只有最靠近相机的片元通过测试写入帧缓冲。这解决了遮挡问题——前面的物体遮挡后面的物体。对于透明物体，深度测试不足以处理(透明物体需要从后往前混合)，需要特殊的渲染顺序和混合模式。片元->深度测试->混合->像素，是片元变为像素的完整路径。`,
    tags: ["片元", "深度测试", "综合"],
  },
];