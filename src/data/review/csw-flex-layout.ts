import type { ReviewQuestion } from "./types";

export const cswFlexLayoutQuestions: ReviewQuestion[] = [
  {
    id: "csw-flex-layout-1",
    chapter: "csw-flex-layout",
    level: 2,
    question: "flex 简写的三个组成部分各是什么含义？flex:1 的完整展开是什么？",
    answer:
      "flex = flex-grow flex-shrink flex-basis。flex-grow：剩余空间按此比例放大分配（默认 0 不放大）；flex-shrink：空间不足时按此比例收缩（默认 1 可收缩）；flex-basis：分配前的初始尺寸（默认 auto，取 width 或内容尺寸）。flex:1 完整展开是 1 1 0%：可放大（grow:1）、可收缩（shrink:1）、初始尺寸 0（basis:0%），所以所有空间都是剩余空间按 grow 比例分。注意 flex:1 ≠ flex-grow:1，后者 basis 默认 auto。",
    tags: ["flex", "flex-grow", "flex-basis"],
  },
  {
    id: "csw-flex-layout-2",
    chapter: "csw-flex-layout",
    level: 3,
    question: "用 Flex 实现一个「左侧固定 200px，右侧自适应填满」的布局。",
    answer:
      ".container { display: flex; } .sidebar { flex: 0 0 200px; } .main { flex: 1; }。原理：sidebar 的 flex-basis 为 200px 且 grow:0 不抢剩余空间；main 的 basis 为 0%、grow:1，独占容器减去 200px 后的全部剩余空间。容器宽度变化时，sidebar 始终 200px，main 自适应伸缩。注意 sidebar 用 flex:0 0 200px 而非 width:200px，这样 flex-shrink:0 确保空间不足时也不被压缩。",
    tags: ["flex", "布局", "自适应"],
  },
  {
    id: "csw-flex-layout-3",
    chapter: "csw-flex-layout",
    level: 3,
    question: "justify-content 和 align-items 分别作用在哪个轴？flex-direction 如何影响它们？",
    answer:
      "justify-content 作用在主轴（main axis），align-items 作用在交叉轴（cross axis）。flex-direction:row 时主轴水平：justify-content 管水平对齐（flex-start/center/space-between 等），align-items 管垂直对齐（stretch/flex-start/center 等）。flex-direction:column 时主轴垂直：两者互换——justify-content 管垂直，align-items 管水平。所以「水平垂直双居中」用 justify-content:center + align-items:center，无论 row 还是 column 都成立。align-self 可覆盖单个项目的交叉轴对齐。",
    tags: ["justify-content", "align-items", "主轴交叉轴"],
  },
  {
    id: "csw-flex-layout-4",
    chapter: "csw-flex-layout",
    level: 4,
    question: "flex:1 和 flex-grow:1 有什么区别？为什么说 flex:1 不等于 flex:1 1 1px？",
    answer:
      "flex:1 完整展开是 1 1 0%（grow:1 shrink:1 basis:0%）；flex-grow:1 只设 grow，shrink 默认 1、basis 默认 auto。区别在 basis：flex:1 的 basis 是 0%，项目初始尺寸为 0，所有空间都是剩余空间按 grow 分；flex-grow:1 的 basis 是 auto，项目先占内容尺寸或 width，剩余空间才按 grow 分。所以多个 flex:1 的项目等分全部空间，多个 flex-grow:1 的项目先各占内容尺寸再分剩余，结果不同。flex:1 也不等于 flex:1 1 1px——后者 basis 是 1px 而非 0%，项目先占 1px 再分剩余，配合 min-content 时结果可能不同。",
    tags: ["flex", "flex-basis", "flex-grow"],
  },
];
