import type { ReviewQuestion } from "./types";

export const GpgAdvancedTechniquesQuestions: ReviewQuestion[] = [
  {
    id: "gpg-advanced-techniques-1",
    chapter: "gpg-advanced-techniques",
    level: 1,
    question: `前向渲染和延迟渲染的复杂度分别是什么？`,
    answer: `前向渲染 O(物体 × 光源)，每个物体逐光源计算光照。延迟渲染 O(物体 + 像素 × 光源)，先存 G-Buffer 再逐光源只算可见像素。`,
    tags: ["前向渲染", "延迟渲染"],
  },
  {
    id: "gpg-advanced-techniques-2",
    chapter: "gpg-advanced-techniques",
    level: 2,
    question: `为什么延迟渲染不支持 MSAA 和透明物体？`,
    answer: `G-Buffer 每个像素只存一个表面数据。MSAA 需要每子样本独立算光照但 G-Buffer 无法区分子样本几何差异；透明物体需多层叠加但 G-Buffer 一像素一表面无法表达。两者都是此限制的结果。`,
    tags: ["延迟渲染", "MSAA", "透明"],
  },
  {
    id: "gpg-advanced-techniques-3",
    chapter: "gpg-advanced-techniques",
    level: 3,
    question: `什么时候应该选择前向渲染而非延迟渲染？`,
    answer: `三种场景：1) 光源数少（≤4），G-Buffer 开销不划算；2) 需大量透明物体，延迟无法处理；3) 需多种不同 BRDF 模型，G-Buffer 格式固定无法容纳。移动端带宽受限时也倾向前向+TBDR。`,
    tags: ["前向渲染", "选型", "场景"],
  },
  {
    id: "gpg-advanced-techniques-4",
    chapter: "gpg-advanced-techniques",
    level: 4,
    question: `Tiled/Clustered 光源剔除如何让延迟渲染支持更多光源？原理是什么？`,
    answer: `将屏幕空间分块（Tiled 2D）或分簇（Clustered 3D），对每个 tile/cluster 预计算影响它的光源列表，光照 pass 中每个像素只遍历所属 tile/cluster 的光源而非全部。Tiled 在深度差异大时浪费光源；Clustered 按 z 也分块更精确。这让数百光源成为可能。`,
    tags: ["Tiled", "Clustered", "光源剔除"],
  },
];
