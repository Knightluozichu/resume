import type { ReviewQuestion } from "./types";

export const uhmPerformanceQuestions: ReviewQuestion[] = [
  {
    id: "uhm-performance-1",
    chapter: "uhm-performance",
    level: 1,
    question: `HMI 性能优化的三大维度是什么？哪个通常是第一瓶颈？`,
    answer: `CPU（少算）：减少布局计算、数据绑定遍历、字符串拼接。GPU（少画）：合并 DrawCall、减少 Overdraw、控制透明混合。内存（少存）：减少 GC 分配、复用对象、控制资源大小。CPU 通常是第一瓶颈，因为 HMI 有大量数据绑定和布局计算。`,
    tags: ["性能优化", "三大维度"],
  },
  {
    id: "uhm-performance-2",
    chapter: "uhm-performance",
    level: 2,
    question: `为什么 HMI 要求稳定帧率而不是最高帧率？用什么指标衡量？`,
    answer: `HMI 面向安全关键场景，掉帧瞬间仪表盘可能卡在旧数值上，司机误判车速导致事故。稳定 60fps 比偶尔 120fps 但经常掉到 30fps 好得多。衡量指标是 1% Low FPS（最差 1% 帧的帧率），比平均帧率更能反映用户感知到的卡顿。用 vSyncCount 锁定帧率避免波动。`,
    tags: ["稳定帧率", "1% Low FPS"],
  },
  {
    id: "uhm-performance-3",
    chapter: "uhm-performance",
    level: 3,
    question: `如何合并 DrawCall？Sprite Atlas 在其中起什么作用？`,
    answer: `合并 DrawCall 的方法：将同一界面的 UI 元素使用同一张图集（Sprite Atlas），这样 GPU 可以在一次调用中绘制多个元素。不同图集的元素无法批处理，每次图集切换产生新 DrawCall。Sprite Atlas 将多个小图合并为一张大图，减少图集切换。还需注意：同一 Canvas 下的元素才能批处理；元素的材质和层叠顺序也影响批处理效果。`,
    tags: ["DrawCall", "Sprite Atlas", "批处理"],
  },
  {
    id: "uhm-performance-4",
    chapter: "uhm-performance",
    level: 4,
    question: `HMI 中字符串拼接为什么是性能问题？如何彻底解决？`,
    answer: `HMI 每帧需要更新大量数值显示（速度/转速/温度等），用 \`speed + " km/h"\` 拼接字符串每次都产生新 string 对象，触发 GC 分配。GC 在 HMI 中是帧率杀手——GC 回收时的停顿可能导致掉帧。彻底解决：用 StringBuilder 复用缓冲区，Clear 后重新 Append，不产生新对象；或用 string.Format 预分配格式；或对固定格式用自定义数值转字符串方法直接写入 char 数组。此外，用脏标记避免不变时不更新 Text，减少拼接频率。`,
    tags: ["字符串拼接", "GC", "StringBuilder", "综合"],
  },
];
