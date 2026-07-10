import type { ReviewQuestion } from "./types";

export const CgpIntroductionQuestions: ReviewQuestion[] = [
  {
    id: "cgp-introduction-1",
    chapter: "cgp-introduction",
    level: 1,
    question: `计算机图形学的定义是什么？它与图像处理、计算机视觉的区别是什么？`,
    answer: `计算机图形学是从数据生成图像。图像处理是修改已有图像（如调色滤波）；计算机视觉是从图像提取信息（如识别）。三者方向相反：图形学数据→图像，视觉图像→数据，图像处理图像→图像。`,
    tags: ["图形学", "定义", "区别"],
  },
  {
    id: "cgp-introduction-2",
    chapter: "cgp-introduction",
    level: 2,
    question: `计算机图形学的发展历史中有哪些关键里程碑？`,
    answer: `1960s Sutherland 的 Sketchpad（交互式图形）；1970s Gouraud/Phong 着色；1980s 光线追踪和辐射度；1990s GPU 和可编程着色器；2000s PBR 和物理渲染；2010s 实时光追和 GPU 通用计算。`,
    tags: ["历史", "里程碑"],
  },
  {
    id: "cgp-introduction-3",
    chapter: "cgp-introduction",
    level: 3,
    question: `为什么说 Sutherland 的 Sketchpad 是计算机图形学的奠基之作？`,
    answer: `Sketchpad（1963）首次实现了交互式图形界面——用光笔在屏幕上画图、约束求解、层级结构。它确立了图形学的基本范式：交互（人机对话）、对象（图元抽象）、变换（约束系统），影响了后续所有图形系统包括 CAD 和 GUI。`,
    tags: ["Sketchpad", "Sutherland", "奠基"],
  },
  {
    id: "cgp-introduction-4",
    chapter: "cgp-introduction",
    level: 4,
    question: `计算机图形学从「线框」到「光追」的演进背后，驱动力和技术突破分别是什么？`,
    answer: `驱动力是对真实感的追求。线框（1960s）只能画边——简单但不真实。平面着色（1970s）加面但无光照变化。Gouraud/Phong 着色（1970s）引入光照但仍是局部光照。光线追踪（1980s）实现全局光照和精确反射折射——真实但慢。技术突破是算法（递归光追）和硬件（GPU 并行）的进步让每级的计算变得可行。`,
    tags: ["线框", "光追", "演进"],
  },
];
