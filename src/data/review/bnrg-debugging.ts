/** 复习题库 · Android应用的调试（bnrg-debugging）。Big Nerd Ranch Guide 第 5 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgDebuggingQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-db-1",
    chapter: "bnrg-debugging",
    level: 1,
    question: "App 崩溃时，Logcat 里哪三行信息最关键？",
    answer:
      "异常类型（如 `NullPointerException`）、出错文件和行号（如 `MainActivity.kt:42`）、以及 `FATAL EXCEPTION` 标记的主线程崩溃堆栈。这三项直接指向改哪里。",
    tags: ["Logcat", "崩溃"],
  },
  {
    id: "bnrg-db-2",
    chapter: "bnrg-debugging",
    level: 1,
    question: "Logcat 的 Level 过滤中，Verbose / Debug / Info / Warn / Error 从多到少怎么排？",
    answer:
      "Verbose（最多）→ Debug → Info → Warn → Error（最少）。调试崩溃通常只看 Warn 和 Error；开发阶段可用 Debug。",
    tags: ["Logcat", "过滤"],
  },
  {
    id: "bnrg-db-3",
    chapter: "bnrg-debugging",
    level: 2,
    question: "条件断点和异常断点分别解决什么问题？",
    answer:
      "条件断点：循环或高频回调中只在特定条件（如 `index == 99`）暂停，避免手动点几百次。异常断点：任何未捕获异常抛出时自动暂停在出错行，代替看闪退后的 Logcat 猜位置。",
    tags: ["断点", "调试"],
  },
  {
    id: "bnrg-db-4",
    chapter: "bnrg-debugging",
    level: 2,
    question: "分析堆栈追踪时，为什么从下往上读、第一个自己包名的行通常是根因？",
    answer:
      "堆栈底部是系统框架调用链，往上才是你的代码。第一个出现 `com.yourapp` 的行是你的代码直接触发异常的位置——上面的行是系统回调你的代码，下面的行是你调用的系统 API。",
    tags: ["堆栈", "分析"],
  },
  {
    id: "bnrg-db-5",
    chapter: "bnrg-debugging",
    level: 3,
    question: "ANR 对话框弹出时，第一步应该查什么？常见主线程阻塞原因有哪些？",
    answer:
      "第一步看 `/data/anr/traces.txt` 或 Logcat 中 `ANR in` 行和主线程堆栈。常见原因：主线程做网络请求、大量磁盘 IO、死锁、复杂布局 inflate、主线程 sleep。修复：把耗时操作移到后台线程/协程。",
    tags: ["ANR", "主线程"],
  },
];

export default bnrgDebuggingQuestions;
