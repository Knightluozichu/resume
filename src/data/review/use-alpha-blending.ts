import type { ReviewQuestion } from "./types";

/** 透明效果与混合 复习题 */
export const useAlphaBlendingQuestions: ReviewQuestion[] = [
  {
    id: "use-alpha-blending-1",
    chapter: "use-alpha-blending",
    level: 1,
    question: `Alpha Test和Alpha Blending的区别是什么？`,
    answer: `Alpha Test用clip()丢弃低alpha片元，全有全无，不需排序，可写深度。Alpha Blending用Blend混合颜色，支持半透明，需关ZWrite+从后往前排序。`,
    tags: ["Alpha Test", "Alpha Blending"],
  },
  {
    id: "use-alpha-blending-2",
    chapter: "use-alpha-blending",
    level: 2,
    question: `为什么透明物体需要从后往前渲染？`,
    answer: `混合公式result=src*alpha+dst*(1-alpha)，dst是帧缓冲当前值。先画后面的(dst=背景正确)，再画前面的(src混合到正确dst)。不排序则混合结果错误。`,
    tags: ["排序", "混合"],
  },
  {
    id: "use-alpha-blending-3",
    chapter: "use-alpha-blending",
    level: 3,
    question: `Blend SrcAlpha OneMinusSrcAlpha的混合公式是什么？`,
    answer: `result = src.rgb * src.a + dst.rgb * (1 - src.a)。当前片元颜色乘以alpha(透明度)，帧缓冲颜色乘以(1-alpha)，相加。alpha=1完全不透明(只显示src)，alpha=0完全透明(只显示dst)，中间值为半透明混合。`,
    tags: ["Blend", "混合公式"],
  },
  {
    id: "use-alpha-blending-4",
    chapter: "use-alpha-blending",
    level: 4,
    question: `设计一个同时处理树叶(Alpha Test)和玻璃(Alpha Blending)的渲染方案。`,
    answer: `1)树叶用Alpha Test: Queue=Geometry, clip(alpha-cutoff), ZWrite On。树叶边缘硬边但可正确遮挡和被遮挡，不需排序，性能高。2)玻璃用Alpha Blending: Queue=Transparent, Blend SrcAlpha OneMinusSrcAlpha, ZWrite Off。玻璃半透明需在不透明物体后渲染且从后往前排序。3)渲染顺序: 先渲染不透明物体(Geometry队列含树叶)->按深度排序透明物体(Transparent队列含玻璃)->从后往前渲染玻璃。4)如果玻璃后面有树叶，树叶在Geometry队列先渲染写入颜色和深度，玻璃在Transparent队列后渲染混合到树叶颜色上，结果正确。5)多个玻璃需Unity自动按深度排序或手动排序。关键：Alpha Test物体放Geometry(参与深度测试正确遮挡)，Alpha Blending物体放Transparent(关闭深度写入+排序混合)。`,
    tags: ["透明方案", "综合"],
  },
];