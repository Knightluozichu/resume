/** 复习题库 · 数据绑定与MVVM（bnrg-data-binding）。Big Nerd Ranch Guide 第 19 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgDataBindingQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-dbnd-1",
    chapter: "bnrg-data-binding",
    level: 1,
    question: "Data Binding 的 `<layout>` 根标签和 `@{}` 表达式各做什么？",
    answer:
      "`<layout>` 包裹原有布局，内嵌 `<data>` 声明变量类型。`@{}` 是绑定表达式——在 XML 里直接引用变量属性（如 android:text=\"@{viewModel.title}\"），数据变化时自动更新 UI。",
    tags: ["Data Binding", "表达式"],
  },
  {
    id: "bnrg-dbnd-2",
    chapter: "bnrg-data-binding",
    level: 1,
    question: "MVVM 三层在 Android 中典型映射？",
    answer:
      "Model：Repository + 数据源（Room/网络）。View：Activity/Fragment + 布局 XML。ViewModel：持有 UI 状态，暴露 LiveData/StateFlow，不引用 View， survive 配置变更。",
    tags: ["MVVM", "ViewModel"],
  },
  {
    id: "bnrg-dbnd-3",
    chapter: "bnrg-data-binding",
    level: 2,
    question: "ViewModel 为什么不应该持有 Activity/Fragment 的引用？",
    answer:
      "ViewModel 存活长于 Activity 实例——旋转后旧 Activity 销毁但 ViewModel 保留。若持有 Activity 引用会导致内存泄漏（ViewModel→Activity→整个 View 树）。ViewModel 只应持有数据和业务逻辑。",
    tags: ["泄漏", "ViewModel"],
  },
  {
    id: "bnrg-dbnd-4",
    chapter: "bnrg-data-binding",
    level: 2,
    question: "LiveData 和 StateFlow 作为 ViewModel 输出各有什么特点？",
    answer:
      "LiveData：生命周期感知，只在 STARTED 以上推送，主线程安全，Java 友好。StateFlow：Kotlin 协程原生，始终有当前值（热流），需 combine collect 与 lifecycle，更适合 Compose 和复杂异步。",
    tags: ["LiveData", "StateFlow"],
  },
  {
    id: "bnrg-dbnd-5",
    chapter: "bnrg-data-binding",
    level: 3,
    question: "Binding 表达式里调用 ViewModel 方法导致每次布局刷新都执行，如何优化？",
    answer:
      "Binding 表达式不应有副作用——每次 rebind 都会重新求值。改用 ObservableField/LiveData/StateFlow 驱动 UI，点击事件用 lambda 或 BindingAdapter + 一次性 listener。复杂逻辑放 ViewModel，XML 只绑定观察数据。",
    tags: ["性能", "BindingAdapter"],
  },
];

export default bnrgDataBindingQuestions;
