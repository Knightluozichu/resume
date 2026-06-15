/** 复习题库 · UI fragment与fragment管理器（bnrg-fragments）。Big Nerd Ranch Guide 第 8 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgFragmentsQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-fr-1",
    chapter: "bnrg-fragments",
    level: 1,
    question: "Fragment 存在的核心意义是什么？和 Activity 的职责边界？",
    answer:
      "Fragment 是 Activity 内的可复用 UI 模块——一个 Activity 可托管多个 Fragment，平板/手机可组合不同 Fragment 布局。Activity 管窗口级生命周期和系统交互；Fragment 管局部 UI 和局部逻辑。",
    tags: ["Fragment", "职责"],
  },
  {
    id: "bnrg-fr-2",
    chapter: "bnrg-fragments",
    level: 1,
    question: "`FragmentTransaction` 的 add、replace、remove 各做什么？",
    answer:
      "add：往容器里加一个 Fragment（可多个共存）。replace：移除容器中现有 Fragment 并放入新的（同一容器通常只显示一个）。remove：从 Activity 中移除指定 Fragment。",
    tags: ["FragmentTransaction"],
  },
  {
    id: "bnrg-fr-3",
    chapter: "bnrg-fragments",
    level: 2,
    question: "为什么 Fragment 参数推荐用 Arguments Bundle + newInstance 工厂方法，而不是构造函数传参？",
    answer:
      "系统在配置变更重建 Fragment 时只保留无参构造函数实例，然后通过 Arguments Bundle 恢复参数。构造函数传参在重建后丢失。`newInstance(args)` 把参数放进 `setArguments()`，框架自动恢复。",
    tags: ["Arguments", "重建"],
  },
  {
    id: "bnrg-fr-4",
    chapter: "bnrg-fragments",
    level: 2,
    question: "Fragment 与 Activity 通信，接口回调和共享 ViewModel 各适合什么场景？",
    answer:
      "接口回调：Fragment 通知宿主 Activity 发生了某事件（如列表项被点击），适合一对一宿主关系。共享 ViewModel：同一 Activity 内多个 Fragment 共享数据（如主从列表），数据存活于 Activity 范围，旋转不丢。",
    tags: ["通信", "ViewModel"],
  },
  {
    id: "bnrg-fr-5",
    chapter: "bnrg-fragments",
    level: 3,
    question: "commit() 之后立即 findFragmentById 返回 null，为什么？应该用什么？",
    answer:
      "commit() 是异步的——事务在消息队列里排队执行，调用后 Fragment 还没真正 attach。应使用 `commitNow()`（同步，主线程）或等事务执行完后再查找。更推荐用 ViewModel/Navigation 传递结果而非立即查找 Fragment。",
    tags: ["commit", "异步"],
  },
];

export default bnrgFragmentsQuestions;
