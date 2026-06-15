/** 复习题库 · Android与MVC设计模式（bnrg-mvc）。Big Nerd Ranch Guide 第 2 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgMvcQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "bnrg-mvc-1",
    chapter: "bnrg-mvc",
    level: 1,
    question: "MVC 三个字母分别代表什么？在 Android 中每一层对应什么具体实现？",
    answer:
      "M = Model（数据+业务逻辑），对应 Kotlin `data class`。V = View（界面显示），对应 `res/layout/*.xml` 布局文件。C = Controller（协调者），对应 `Activity` 或 `Fragment`。",
    tags: ["MVC", "架构"],
  },
  {
    id: "bnrg-mvc-2",
    chapter: "bnrg-mvc",
    level: 1,
    question: "Kotlin 的 `data class` 有什么特点？编译器自动生成了哪些方法？",
    answer:
      "`data class` 编译器自动生成 `equals()`、`hashCode()`、`toString()`、`copy()` 以及 `componentN()` 解构方法。它专门用来承载数据——三行代码就得到一个完整的数据容器。",
    tags: ["data class", "Kotlin"],
  },
  {
    id: "bnrg-mvc-3",
    chapter: "bnrg-mvc",
    level: 1,
    question: '在 MVC 中，哪一层负责「知道数据怎么来的」？哪一层负责「知道按钮放哪」？哪一层负责把二者连起来？',
    answer:
      'Model 负责「知道数据怎么来的」——数据的结构、来源和变化规则。View 负责「知道按钮放哪」——布局和控件位置。Controller 负责「把二者连起来」——收到点击后找 Model 拿数据喂给 View。',
    tags: ["MVC", "职责"],
  },
  {
    id: "bnrg-mvc-4",
    chapter: "bnrg-mvc",
    level: 1,
    question: "`data class` 的 `copy()` 方法做什么？为什么在 MVC 的 Model 层常用？",
    answer:
      "`copy()` 创建一个**新对象**，只修改你指定的属性，其余属性保持不变。因为 data class 的属性通常是 `val`（不可变），你无法直接改某个字段——`copy()` 提供了一种安全的「修改」方式。创建新对象而非改旧对象，避免了并发场景下的数据不一致。",
    tags: ["copy", "data class"],
  },

  // ── L2 理解 ──
  {
    id: "bnrg-mvc-5",
    chapter: "bnrg-mvc",
    level: 2,
    question: "为什么 Model 层不应该 import 任何 `android.*` 包下的类？这有什么实际好处？",
    answer:
      "因为 Model 应该是纯 Kotlin/Java 逻辑——它与界面无关。好处：① 可单元测试——不需要启动模拟器就能测 Model；② 可复用——同一个 Model 可以在 Activity、Service、Widget 中复用；③ 被迫分离——当你发现自己想 import `android.view.View` 时，就意识到这块逻辑应该放回 Activity。",
    tags: ["Model", "分层", "单元测试"],
  },
  {
    id: "bnrg-mvc-6",
    chapter: "bnrg-mvc",
    level: 2,
    question: "一个典型的 Activity 作为 Controller，它的 `onCreate` 方法里应该做哪几件事的排序？多了什么说明越界了？",
    answer:
      "应该做：① 加载布局（`setContentView`）→ ② 绑定控件（`findViewById`）→ ③ 初始化 Model → ④ 更新 View 显示初始数据 → ⑤ 设置控件监听器。如果里面出现了**复杂的数据处理逻辑**（比如嵌套 3 层的 if-else 判断、排序算法、网络请求的响应解析），就说明越界了——这些应该抽到 Model 或单独的 Repository 类里。",
    tags: ["Controller", "Activity"],
  },
  {
    id: "bnrg-mvc-7",
    chapter: "bnrg-mvc",
    level: 2,
    question: "如果把所有代码都塞进 Activity 的 `onCreate` 里，当界面需求翻倍时，会出现哪三类问题？",
    answer:
      "① 可读性崩溃——代码文件上千行，改一个按钮颜色要在一堆逻辑里找对应的行。② 无法复用——第二个界面需要同样的数据处理逻辑，只能复制粘贴。③ 无法测试——Activity 依赖 Android 框架（需要模拟器启动），无法用 JUnit 直接跑自动化测试验证 Model 逻辑。",
    tags: ["反模式", "代码质量"],
  },

  // ── L3 应用 ──
  {
    id: "bnrg-mvc-8",
    chapter: "bnrg-mvc",
    level: 3,
    question:
      "下面这段代码违反了 MVC 的什么原则？\n`data class Question(...) {`\n`    fun showIn(view: TextView) {`\n`        view.text = this.text`\n`    }`\n`}`\n如何修改？",
    answer:
      "违反了 **Model 不应依赖 View** 的原则——`Question` Model 里出现了 `TextView`（Android 控件）。修改：把 `showIn` 的逻辑搬回 Activity 或 Controller 层——Activity 里写 `questionTextView.text = question.text`。Model 只负责提供数据，不负责「往哪个控件里写」。",
    tags: ["MVC", "越界", "重构"],
  },
  {
    id: "bnrg-mvc-9",
    chapter: "bnrg-mvc",
    level: 3,
    question:
      "你的 App 需要在三个不同的界面显示同一份问答数据。用 MVC 的思想，哪些层需要新建？哪些层可以复用？为什么？",
    answer:
      "**Model 完全复用**——三个界面用同一套 `Question` 和 `QuizState`，不做任何修改。**View 需要新建**——每个界面有不同的布局 XML（比如一个用 ConstraintLayout，一个用 LinearLayout，一个横屏）。**Controller 可能复用部分**——如果三个界面的答题逻辑完全一样，可以在一个 `QuizController` 类中封装，三个 Activity 调用同个 Controller。但如果交互不同（比如一个界面双击才提交），则各自实现各自的 Controller 逻辑。",
    tags: ["MVC", "复用", "分层"],
  },
];

export default bnrgMvcQuestions;
