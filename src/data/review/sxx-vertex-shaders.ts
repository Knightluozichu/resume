import type { ReviewQuestion } from "./types";

export const sxxVertexShadersQuestions: ReviewQuestion[] = [
  {
    id: "sxx-vertex-shaders-1",
    chapter: "sxx-vertex-shaders",
    level: 1,
    question: `顶点着色器中的 attribute、uniform、varying 三种变量有什么区别？`,
    answer: `attribute 是逐顶点属性，每个顶点有独立值（如 position、normal），来自顶点缓冲区。uniform 是全局统一变量，所有顶点共享相同值（如矩阵、时间），在绘制调用中不变。varying 是顶点着色器输出给像素着色器的变量，在三角形内部线性插值，使像素着色器获得平滑数据。`,
    tags: ["attribute", "uniform", "varying"],
  },
  {
    id: "sxx-vertex-shaders-2",
    chapter: "sxx-vertex-shaders",
    level: 2,
    question: `为什么顶点变形后必须重新计算法线？如何实现？`,
    answer: `变形改变了几何形状，原法线不再垂直于新表面，用原法线做光照会导致高光和阴影位置错误。重算法线方法：1) 解析法——对变形函数求偏导，偏导叉积归一化得到新法线；2) 数值法——用相邻顶点差分近似切线向量，叉积得到法线。解析法精确但需要变形函数表达式，数值法通用但有额外开销。`,
    tags: ["法线重算", "顶点变形"],
  },
  {
    id: "sxx-vertex-shaders-3",
    chapter: "sxx-vertex-shaders",
    level: 3,
    question: `在顶点着色器中做光照计算（Gouraud 着色）和在像素着色器中做（Phong 着色）有什么区别？`,
    answer: `Gouraud 着色在顶点着色器计算光照，结果经光栅化插值传给像素着色器——低多边形模型上会出现明显多边形边界，因为颜色在顶点间线性插值无法捕捉高光细节。Phong 着色在像素着色器做光照——法线经插值后逐像素计算光照，高光更细腻准确。现代实时渲染默认用 Phong 着色，顶点着色器只传递法线和位置数据。`,
    tags: ["Gouraud", "Phong", "着色模型"],
  },
  {
    id: "sxx-vertex-shaders-4",
    chapter: "sxx-vertex-shaders",
    level: 4,
    question: `如何用顶点着色器实现旗帜飘动效果？需要考虑哪些细节？`,
    answer: `核心思路：用 sin 函数沿X轴传播波浪，y += amplitude * sin(frequency * x + time * speed) * uv.x（uv.x 控制越远离旗杆变形越大）。需要考虑的细节：1) 变形后法线必须重算——对变形函数求Z方向偏导，结合原法线计算新法线，否则光照错误；2) 波浪参数（amplitude/frequency/speed）需调参匹配旗帜材质的重量感；3) 可叠加多频率波浪增加自然感；4) 旗帜边缘的顶点需要更高密度才能表现波浪细节；5) 时间变量 uniform 从 CPU 传入，注意循环周期避免跳变。`,
    tags: ["顶点动画", "旗帜飘动", "法线重算"],
  },
];
