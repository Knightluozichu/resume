/** 复习题库 · 使用RecyclerView显示列表（bnrg-recyclerview）。Big Nerd Ranch Guide 第 9 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgRecyclerviewQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-rv-1",
    chapter: "bnrg-recyclerview",
    level: 1,
    question: "RecyclerView 三件套是什么？各自职责？",
    answer:
      "Adapter：绑定数据到 ViewHolder，告诉 RecyclerView 有多少项。ViewHolder：缓存 item 布局中的 View 引用，避免重复 findViewById。LayoutManager：决定列表排列方式（LinearLayoutManager 线性、GridLayoutManager 网格）。",
    tags: ["RecyclerView", "Adapter"],
  },
  {
    id: "bnrg-rv-2",
    chapter: "bnrg-recyclerview",
    level: 1,
    question: "RecyclerView 相比 ListView 的核心优势是什么？",
    answer:
      "强制 ViewHolder 模式（ListView 需手动实现）、LayoutManager 解耦布局方向、ItemDecoration 统一分割线/间距、默认动画支持、更精细的回收复用策略——滚动更流畅。",
    tags: ["ListView", "对比"],
  },
  {
    id: "bnrg-rv-3",
    chapter: "bnrg-recyclerview",
    level: 2,
    question: "`notifyDataSetChanged()` 和 `DiffUtil` 更新列表有什么区别？",
    answer:
      "`notifyDataSetChanged()` 刷新整个列表，无动画、性能差、丢失滚动位置和局部状态。DiffUtil 计算新旧列表差异，只更新变化的 item，带默认动画，性能更好。ListAdapter 内置 DiffUtil 支持。",
    tags: ["DiffUtil", "更新"],
  },
  {
    id: "bnrg-rv-4",
    chapter: "bnrg-recyclerview",
    level: 2,
    question: "ViewHolder 的 `bind()` 方法里为什么要避免创建新对象或启动新请求？",
    answer:
      "RecyclerView 滚动时会频繁复用 ViewHolder——同一个 ViewHolder 可能绑定不同 position 的数据。每次 bind 创建对象浪费内存；异步图片加载不取消会导致图片错位（旧请求覆盖新数据）。",
    tags: ["ViewHolder", "复用"],
  },
  {
    id: "bnrg-rv-5",
    chapter: "bnrg-recyclerview",
    level: 3,
    question: "列表数据更新后界面没变化，但 Log 显示数据已改。最可能漏了什么？",
    answer:
      "改了 Adapter 内部数据但没调用 `notifyItemChanged()` / `notifyDataSetChanged()` 或 DiffUtil 的 submitList。RecyclerView 不会自动观察数据变化——必须显式通知 Adapter 刷新。",
    tags: ["排错", "notify"],
  },
];

export default bnrgRecyclerviewQuestions;
