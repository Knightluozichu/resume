import type { ReviewQuestion } from "./types";

export const CgpRenderingAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "cgp-rendering-algorithms-1",
    chapter: "cgp-rendering-algorithms",
    level: 1,
    question: "Z-buffer 算法和画家算法的区别是什么？",
    answer: "Z-buffer 逐像素比较深度，任意顺序渲染都正确，需要深度缓冲显存。画家算法按深度从远到近排序物体再渲染，无需缓冲但无法处理互相穿插的物体（循环遮挡）。",
    tags: ["Z-buffer", "画家算法"],
  },
  {
    id: "cgp-rendering-algorithms-2",
    chapter: "cgp-rendering-algorithms",
    level: 2,
    question: "光线投射（Ray Casting）的基本原理是什么？",
    answer: "从屏幕每个像素发射一条光线进入场景，找到光线击中的最近物体，根据交点处的法线和材质计算颜色。本质是从相机反向追踪光路。",
    tags: ["光线投射", "Ray Casting"],
  },
  {
    id: "cgp-rendering-algorithms-3",
    chapter: "cgp-rendering-algorithms",
    level: 3,
    question: "光线追踪（Ray Tracing）相比光线投射多了什么？为什么更真实？",
    answer: "光线投射只追踪主光线（相机到场景）。光线追踪在交点处继续发射反射、折射、阴影光线，递归追踪光的弹射路径。更真实是因为它模拟了全局光照——反射能看到其他物体、折射能透过玻璃、阴影光线判断遮挡。",
    tags: ["光线追踪", "反射", "折射"],
  },
  {
    id: "cgp-rendering-algorithms-4",
    chapter: "cgp-rendering-algorithms",
    level: 4,
    question: "BSP 树和 KD 树在渲染加速中各有什么作用？适合什么场景？",
    answer: "BSP 树用平面递归分割空间，适合静态场景的精确排序（画家算法的前置排序）和碰撞检测，构造慢但查询快。KD 树用轴对齐平面递归分割，适合光线追踪的场景加速结构（快速定位光线击中的物体），平衡性好。现代光追多用 BVH（层次包围盒）因为它对动态场景更新更快。",
    tags: ["BSP", "KD树", "加速结构"],
  },
];
