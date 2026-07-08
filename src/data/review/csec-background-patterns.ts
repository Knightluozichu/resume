import type { ReviewQuestion } from "./types";

export const csecBackgroundPatternsQuestions: ReviewQuestion[] = [
  {
    id: "csec-background-patterns-1",
    chapter: "csec-background-patterns",
    level: 2,
    question: "为什么 repeating-linear-gradient 中两个色标放在同一位置会产生硬边条纹？",
    answer:
      "渐变在两个色标之间做线性插值。当两个相邻色标位置相同（如 `#58a 30px, #fb3 30px`），插值区间为零——颜色在 30px 处瞬间从 `#58a` 跳变为 `#fb3`，没有过渡区域，因此形成清晰的硬边。如果色标之间有间距，颜色会平滑过渡，产生渐变而非条纹。repeating-linear-gradient 会把这段色标周期在整个渐变轴上重复平铺，于是硬边条纹就周期性出现了。",
    tags: ["渐变", "条纹"],
  },
  {
    id: "csec-background-patterns-2",
    chapter: "csec-background-patterns",
    level: 3,
    question: "如何用纯 CSS 画一个波点（圆点）背景图案？",
    answer:
      "用 radial-gradient 画一个圆点，再用 background-size 控制圆点间距，背景自动平铺。代码：`background: radial-gradient(circle, #58a 25%, transparent 26%); background-size: 40px 40px;`。radial-gradient 从圆心向外辐射，25% 处是实心圆，26% 处变为透明——1% 的间隙产生抗锯齿的硬边圆。background-size 设为 40px 让这个圆点图案每 40px 重复一次，形成规整的波点阵列。要交错排列可以叠加两层不同 background-position 的波点。",
    tags: ["radial-gradient", "波点"],
  },
  {
    id: "csec-background-patterns-3",
    chapter: "csec-background-patterns",
    level: 3,
    question: "用多重背景叠加构建网格背景的原理是什么？",
    answer:
      "网格是两组条纹的叠加——水平线加垂直线。用多重 background 声明（逗号分隔）可以叠加多个渐变层，第一个声明的在最上层。水平线用 `linear-gradient(to right, rgba(0,0,0,.1) 1px, transparent 1px)` 画竖线，垂直线用 `linear-gradient(to bottom, ...)` 画横线。配合 `background-size: 40px 40px` 控制网格密度。两条渐变各自独立平铺，叠加后形成十字交叉的网格纹理。",
    tags: ["多重背景", "网格"],
  },
  {
    id: "csec-background-patterns-4",
    chapter: "csec-background-patterns",
    level: 4,
    question: "CSS 渐变条纹相比 PNG 条纹图有什么优势？什么场景 PNG 更优？",
    answer:
      "CSS 渐变条纹优势：①矢量描述，任意缩放不失真；②零网络请求，不增加加载时间；③改色改密度只改 CSS 不重新出图；④retina 屏无需 2x/3x 资源。PNG 条纹图唯一更优的场景是需要噪点、照片级纹理、复杂渐变色等 repeating-gradient 无法表达的图案——CSS 渐变只能描述规则的颜色过渡，无法生成随机噪点或照片级细节。因此简单周期性纹理用 CSS 渐变，复杂不规则纹理用图片。",
    tags: ["渐变", "性能", "选型"],
  },
];
