/** 复习题库 · Fragment Navigation（bnrg-fragment-nav）。Big Nerd Ranch Guide 第 12 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgFragmentNavQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-fn-1",
    chapter: "bnrg-fragment-nav",
    level: 1,
    question: "Navigation Component 的核心三部分是什么？",
    answer:
      "NavHostFragment：Fragment 容器，托管导航图。NavController：执行 navigate、popBackStack。Navigation Graph（nav_graph.xml）：定义目的地（destination）和动作（action）及参数。",
    tags: ["Navigation", "NavController"],
  },
  {
    id: "bnrg-fn-2",
    chapter: "bnrg-fragment-nav",
    level: 1,
    question: "Safe Args 解决了什么问题？",
    answer:
      "编译期生成类型安全的 Directions 类和 Args 类——导航参数不再用字符串 key 和 Bundle 手动传递，避免 key 拼错、类型转换错误和 null 问题。",
    tags: ["Safe Args", "类型安全"],
  },
  {
    id: "bnrg-fn-3",
    chapter: "bnrg-fragment-nav",
    level: 2,
    question: "`navigateUp()` 和 `popBackStack()` 有什么区别？",
    answer:
      "popBackStack 只出栈当前 NavController 管理的 back stack。navigateUp 还会处理 Up 语义——如果当前不是 NavGraph 的根，可能 finish Activity 或跳转到父级 destination（取决于 manifest 的 parentActivityName 和 graph 层级）。",
    tags: ["Up", "Back Stack"],
  },
  {
    id: "bnrg-fn-4",
    chapter: "bnrg-fragment-nav",
    level: 2,
    question: "单 Activity + 多 Fragment 架构相比多 Activity 的优势？",
    answer:
      "统一导航和转场动画、共享 ViewModel 更简单、减少 Activity 启动开销、Deep Link 和 Navigation Graph 集中管理、平板/master-detail 组合更灵活。",
    tags: ["单 Activity", "架构"],
  },
  {
    id: "bnrg-fn-5",
    chapter: "bnrg-fragment-nav",
    level: 3,
    question: "Deep Link 跳转到 NavGraph 中间页面，Back 键行为如何配置？",
    answer:
      "在 destination 上设置 `<deepLink>` 并在 action 或 popUpTo 配置中指定 popUpTo 到某个 destination 并 inclusive，确保 Back 不会回到空栈或错误页面。也可用 `navOptions` 的 popUpTo + launchSingleTop 控制栈行为。",
    tags: ["Deep Link", "Back"],
  },
];

export default bnrgFragmentNavQuestions;
