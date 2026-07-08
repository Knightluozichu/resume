import type { ReviewQuestion } from "./types";

export const uslGrabpassQuestions: ReviewQuestion[] = [
  {
    id: "usl-grabpass-1",
    chapter: "usl-grabpass",
    level: 1,
    question: "GrabPass 的作用是什么？",
    answer: "GrabPass 捕获当前屏幕上已渲染的内容为纹理，供后续 Pass 使用。常实现玻璃折射、热扭曲、水面扭曲等需要读取屏幕背景的效果。放在普通渲染 Pass 之前。",
    tags: ["GrabPass", "屏幕抓取"],
  },
  {
    id: "usl-grabpass-2",
    chapter: "usl-grabpass",
    level: 2,
    question: "GrabPass 有两种写法，区别是什么？",
    answer: "GrabPass {} 每帧为每个使用它的对象抓取一次屏幕，开销大。GrabPass { \"TextureName\" } 只抓取一次屏幕并存为命名纹理，所有对象共享，性能更好。推荐使用带名称的写法。",
    tags: ["GrabPass", "性能优化"],
  },
  {
    id: "usl-grabpass-3",
    chapter: "usl-grabpass",
    level: 3,
    question: "如何用 GrabPass 实现玻璃折射效果？",
    answer: "1)GrabPass 抓取屏幕纹理 2)在渲染 Pass 中采样法线贴图获取扰动方向 3)用扰动方向偏移屏幕 UV 坐标 4)用偏移后的 UV 采样 GrabPass 纹理 5)叠加玻璃颜色和透明度 6)设置渲染队列为 Transparent 确保在透明物体之后抓取。",
    tags: ["玻璃折射", "实践"],
  },
  {
    id: "usl-grabpass-4",
    chapter: "usl-grabpass",
    level: 4,
    question: "GrabPass 有什么性能问题？如何替代？",
    answer: "GrabPass 需要将屏幕内容从帧缓冲拷贝到纹理，开销较大，尤其在移动端。替代方案：1)用 CommandBuffer 手动控制抓取时机和分辨率 2)URP/HDRP 中用 Opaque Texture 或 Color Texture 替代 3)降分辨率抓取再放大 4)仅在必要时使用，非透明物体不需要。",
    tags: ["性能", "替代方案", "CommandBuffer"],
  },
];
