import type { ReviewQuestion } from "./types";

/** UI 性能优化 复习题 */
export const uidOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "uid-optimization-1",
    chapter: "uid-optimization",
    level: 1,
    question: `UI 性能优化的三大方向是什么？`,
    answer: `合批优化（减少 Draw Call）、图集管理（合并碎图为 Sprite Atlas）、Overdraw 削减（减少重叠绘制）。三步法：先查 Draw Call 数量，再查图集是否合并，最后查 Overdraw 重叠区域。`,
    tags: ["性能优化", "三大方向"],
  },
  {
    id: "uid-optimization-2",
    chapter: "uid-optimization",
    level: 2,
    question: `什么情况下会打断 UGUI 的合批？`,
    answer: `合批打断的常见原因：1)不同图集的精灵穿插排列（A图集元素在B图集元素上方）；2)不同材质的元素穿插；3)Canvas 之间天然不合批；4)元素被禁用/启用改变了渲染顺序；5)Text 和 Image 穿插排列（Text 用字体材质，Image 用精灵材质）。解决方法：按图集分组排列，避免穿插。`,
    tags: ["合批", "DrawCall"],
  },
  {
    id: "uid-optimization-3",
    chapter: "uid-optimization",
    level: 3,
    question: `为什么要把静态 UI 和动态 UI 分到不同 Canvas？`,
    answer: `Canvas 的网格重建（Rebuild）是以 Canvas 为单位的。任何一个子元素的属性变化（位置/颜色/文字内容）都会触发整个 Canvas 的所有子元素重新生成网格。如果静态背景和动态血条在同一个 Canvas，血条每帧更新会导致背景也每帧重建，浪费大量 CPU。分开后，只有动态 Canvas 重建，静态 Canvas 保持不变。`,
    tags: ["Canvas", "重建", "分组"],
  },
  {
    id: "uid-optimization-4",
    chapter: "uid-optimization",
    level: 4,
    question: `一个背包界面有 100 个物品格子，每帧更新数量文字，帧率只有 30fps，如何优化到 60fps？`,
    answer: `1)分 Canvas：背包背景和物品格子分到不同 Canvas，格子变化不重建背景；2)分批合批：所有格子图标用同一图集，按图集顺序排列避免穿插；3)按需更新：只更新变化的格子，不每帧全量刷新——维护脏标记，只在数据变化时更新对应格子；4)RaycastTarget：100 个格子的背景图全部关闭 RaycastTarget，只保留可点击区域开启；5)Text 优化：用 TextMeshPro 替代 Text（SDF 渲染更高效），或用一张合并纹理的数字字体；6)如果还不够：用对象池 + 虚拟化滚动（只渲染可见的 10~15 个格子），100 个格子只创建 15 个 GameObject。`,
    tags: ["背包优化", "综合", "性能"],
  },
];
