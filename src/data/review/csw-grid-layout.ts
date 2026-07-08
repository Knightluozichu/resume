import type { ReviewQuestion } from "./types";

export const cswGridLayoutQuestions: ReviewQuestion[] = [
  {
    id: "csw-grid-layout-1",
    chapter: "csw-grid-layout",
    level: 2,
    question: "fr 单位如何分配空间？容器 400px、gap 20px、grid-template-columns:1fr 2fr 1fr 时各列宽度是多少？",
    answer:
      "fr 按比例分配「剩余空间」——先扣除固定尺寸和 gap，再按 fr 比例分。容器 400px，3 列有 2 个 gap 共 40px，剩余 400-40=360px。1fr 2fr 1fr 共 4 份，每份 360/4=90px。所以三列分别为 90px/180px/90px。关键：fr 在固定尺寸和 gap 之后分配，如果还有固定列（如 200px 1fr），先扣 200px 和 gap，剩余才给 fr。fr 不是绝对宽度，是比例份额。",
    tags: ["grid", "fr", "空间分配"],
  },
  {
    id: "csw-grid-layout-2",
    chapter: "csw-grid-layout",
    level: 3,
    question: "用 Grid 实现一个「header 跨全宽、中间三列、footer 跨全宽」的页面骨架。",
    answer:
      "用 grid-template-areas 命名区域：.page { display:grid; grid-template-columns:200px 1fr 150px; grid-template-rows:auto 1fr auto; grid-template-areas:'header header header' 'nav main aside' 'footer footer footer'; gap:16px; } 各元素用 grid-area:header/nav/main/aside/footer 对应。header 和 footer 重复三列名表示跨全宽。也可用线定位 grid-column:1/-1（-1 表示最后一条线）跨全部列。areas 方式可读性更好，适合复杂骨架。",
    tags: ["grid", "grid-template-areas", "页面骨架"],
  },
  {
    id: "csw-grid-layout-3",
    chapter: "csw-grid-layout",
    level: 3,
    question: "Grid 和 Flex 是什么关系？实际项目中如何配合使用？",
    answer:
      "它们是互补关系，不是二选一。Grid 擅长二维整体骨架（页面有几行几列、谁跨谁），同时控制行列两条轴；Flex 擅长一维局部排列（一行按钮怎么排、卡片内部怎么对齐），一次管一条轴。实际项目通常 Grid 做外层骨架、Flex 做内层排列：Grid 把页面分成 header/main/aside/footer 区域，main 内部用 Flex 排列卡片列表，卡片内部再用 Flex 排列标题和内容。选择标准：需要同时控制行列用 Grid，只需控制一个方向用 Flex。",
    tags: ["grid", "flex", "布局选型"],
  },
  {
    id: "csw-grid-layout-4",
    chapter: "csw-grid-layout",
    level: 4,
    question: "grid-column:1/3 和 grid-column:span 2 有什么区别？grid-area 的四值顺序是什么？",
    answer:
      "grid-column:1/3 是「绝对线定位」——从第 1 条线到第 3 条线，跨 2 个轨道，位置固定。grid-column:span 2 是「相对跨度」——跨 2 个轨道但起始线由自动放置算法决定，位置灵活。区别：前者明确指定位置，后者只指定跨度让浏览器自动找位置。grid-area 的四值顺序是 row-start / column-start / row-end / column-end（上/左/下/右），如 grid-area:1/2/3/4 表示从第1行第2列到第3行第4列。也可用 grid-template-areas 的命名区域替代数字线，语义更清晰。",
    tags: ["grid", "网格线", "grid-area", "span"],
  },
];
