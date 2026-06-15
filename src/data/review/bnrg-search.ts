/** 复习题库 · 搜索（bnrg-search）。Big Nerd Ranch Guide 第 26 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgSearchQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-sr-1",
    chapter: "bnrg-search",
    level: 1,
    question: "SearchView 和 EditText 作为搜索框的核心区别？",
    answer:
      "SearchView 内建搜索图标、提交行为、与 SearchManager 集成、建议下拉列表、语音搜索入口。EditText 只是文本输入，上述能力需全部手写。",
    tags: ["SearchView"],
  },
  {
    id: "bnrg-sr-2",
    chapter: "bnrg-search",
    level: 1,
    question: "searchable.xml 的作用？",
    answer:
      "声明 App 的搜索配置——搜索提示 hint、搜索建议的 ContentProvider authority、搜索模式等。Manifest 里 Activity 的 meta-data 引用 @xml/searchable 关联到 SearchView。",
    tags: ["searchable", "配置"],
  },
  {
    id: "bnrg-sr-3",
    chapter: "bnrg-search",
    level: 2,
    question: "onQueryTextSubmit 和 onQueryTextChange 分别在何时触发？",
    answer:
      "onQueryTextChange：每输入/删除一个字符。适合做即时过滤。onQueryTextSubmit：用户按键盘搜索键或点放大镜——适合发起完整搜索请求并收起键盘。",
    tags: ["回调", "SearchView"],
  },
  {
    id: "bnrg-sr-4",
    chapter: "bnrg-search",
    level: 2,
    question: "用 SharedPreferences 存搜索历史时要注意什么？",
    answer:
      "限制条数（如最近 10 条）、去重（同一查询不重复插入）、异步读写（apply 非阻塞）、不在主线程做大量字符串拼接。展示历史时用 RecyclerView 或 SearchView 的建议 API。",
    tags: ["SharedPreferences", "历史"],
  },
  {
    id: "bnrg-sr-5",
    chapter: "bnrg-search",
    level: 3,
    question: "SearchView 放在 Toolbar 里不显示，常见配置遗漏？",
    answer:
      "① menu 里 SearchView 的 app:actionViewClass 未设 androidx.appcompat.widget.SearchView。② 未在 onCreateOptionsMenu inflate menu。③ SearchManager 未 getSearchableInfo。④ showAsAction 不是 ifRoom/collapseActionView。",
    tags: ["Toolbar", "排错"],
  },
];

export default bnrgSearchQuestions;
