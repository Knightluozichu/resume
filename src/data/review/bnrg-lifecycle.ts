/** 复习题库 · activity的生命周期（bnrg-lifecycle）。Big Nerd Ranch Guide 第 3 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgLifecycleQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "bnrg-lc-1",
    chapter: "bnrg-lifecycle",
    level: 1,
    question: "Activity 的七个生命周期回调方法按顺序说出。",
    answer:
      "`onCreate` → `onStart` → `onResume` → `onPause` → `onStop` → `onDestroy`。外加一个 `onRestart`（从 Stopped 回到前台时在 onStart 之前调用）。",
    tags: ["生命周期", "回调"],
  },
  {
    id: "bnrg-lc-2",
    chapter: "bnrg-lifecycle",
    level: 1,
    question: "Activity 的三个前台/后台状态分别叫什么？每个状态下用户能看到界面吗？能交互吗？",
    answer:
      "① Resumed（前台，可见 + 可交互）。② Paused（部分可见，不可交互——被半透明 Dialog 或另一个 Activity 部分遮挡）。③ Stopped（完全不可见，不可交互——按 Home 键或被新全屏 Activity 完全覆盖）。",
    tags: ["状态", "Resumed", "Paused", "Stopped"],
  },
  {
    id: "bnrg-lc-3",
    chapter: "bnrg-lifecycle",
    level: 1,
    question: "`onCreate` 和 `onStart` 和 `onResume` 各适合做什么事？给一个典型例子。",
    answer:
      "`onCreate`：加载布局（`setContentView`）、初始化变量、`findViewById` 绑定控件。`onStart`：很少单独用。`onResume`：开启动画、注册传感器监听、开始视频播放——这些需要在前台且可交互时才做的事。",
    tags: ["onCreate", "onStart", "onResume"],
  },
  {
    id: "bnrg-lc-4",
    chapter: "bnrg-lifecycle",
    level: 1,
    question: "`onPause` 和 `onStop` 的区别是什么？各自适合释放什么资源？",
    answer:
      "`onPause`：Activity 即将失去焦点但仍然可见（如来电、弹出对话框）。适合暂停视频、停止动画。`onStop`：Activity 完全不可见。适合释放重资源——注销 GPS 监听、关闭文件流、停止后台网络请求。释放重资源放在 onStop 而非 onPause 是为了避免在「半透明覆盖」场景下频繁释放重资源。",
    tags: ["onPause", "onStop"],
  },
  {
    id: "bnrg-lc-5",
    chapter: "bnrg-lifecycle",
    level: 1,
    question: "旋转屏幕时，Activity 经历了哪几个回调？按顺序说出。",
    answer:
      "`onPause` → `onStop` → `onDestroy` → `onCreate` → `onStart` → `onResume`。完整走了一次销毁→重建全流程。",
    tags: ["转屏", "配置变更"],
  },

  // ── L2 理解 ──
  {
    id: "bnrg-lc-6",
    chapter: "bnrg-lifecycle",
    level: 2,
    question: "为什么在每个生命周期回调里**第一行必须写 `super.xxx()`**？不写会发生什么？",
    answer:
      "Android 的 AppCompatActivity（以及 FragmentActivity 等）在父类的生命周期回调里做了大量底层工作——恢复 Fragment 状态、初始化主题引擎、管理 ActionBar、处理权限回调等。不调 `super.xxx()` 等于跳过了这一整段关键初始化，运行时要么直接崩（`SuperNotCalledException`），要么界面出现奇怪 Bug（Fragment 无法恢复、主题不生效）。",
    tags: ["super", "回调"],
  },
  {
    id: "bnrg-lc-7",
    chapter: "bnrg-lifecycle",
    level: 2,
    question: '从「启动应用」到「按 Back 退出」，中间按 Home 键再切回来，完整回调顺序是什么？（分两段写）',
    answer:
      "第一段（启动→按Home）：`onCreate → onStart → onResume → onPause → onStop`。第二段（切回来→按Back退出）：`onRestart → onStart → onResume → onPause → onStop → onDestroy`。注意切回来走的是 `onRestart` 而非 `onCreate`，说明实例没被销毁。",
    tags: ["回调链", "Home键"],
  },
  {
    id: "bnrg-lc-8",
    chapter: "bnrg-lifecycle",
    level: 2,
    question: "为什么不应该在 `onCreate` 里下载一个 500MB 的文件？如果你必须做这个操作，应该放在哪个回调？为什么？",
    answer:
      "① `onCreate` 在主线程（UI 线程）执行——下载 500MB 会把主线程**卡死**十几分钟，期间界面完全无响应（ANR）。② 转屏会触发 `onCreate` 再次调用——每次旋转都会重新下载一遍。如果必须下载，应该开一个后台线程或协程，在 `onResume` 或 `onStart` 中触发下载任务（并在 `onStop`/`onDestroy` 中取消或管理生命周期）。更好的做法是用 ViewModel + Repository 管理下载任务——数据存活周期独立于 Activity 的重建。",
    tags: ["onCreate", "主线程", "最佳实践"],
  },

  // ── L3 应用 ──
  {
    id: "bnrg-lc-9",
    chapter: "bnrg-lifecycle",
    level: 3,
    question:
      "你的 App 跑在模拟器上，Logcat 输出：`onPause → onStop → onDestroy → onCreate → onStart → onResume`。用户并没有按 Back 键也没有旋转屏幕。最可能的触发原因是什么？（列出至少两种）",
    answer:
      "① 系统语言切换——`Configuration` 改变触发重建。② 开发者选项中开启了「不保留活动」（Don't keep activities）——每次离开 Activity 就立即销毁。③ 系统内存不足，杀掉了后台的 Activity 进程。④ 折叠屏手机展开/合上导致屏幕尺寸配置变化。⑤ 通过 adb 命令 `am restart` 或 `adb shell dumpsys activity` 触发了重建。",
    tags: ["重建", "配置变更", "排错"],
  },
  {
    id: "bnrg-lc-10",
    chapter: "bnrg-lifecycle",
    level: 3,
    question:
      "在 `onDestroy` 里注销广播接收器（`unregisterReceiver`），应用有时正常有时崩溃，报 `IllegalArgumentException: Receiver not registered`。问题出在哪？如何解决？",
    answer:
      "问题出在 `onDestroy` **不一定被调用**——如果系统因内存不足直接杀进程，`onDestroy` 不会执行。而且如果之前 `onCreate` 里注册了广播但中途因为某种原因没走到 `onStart` 就销毁了，`onDestroy` 可能尝试注销一个根本没注册的接收器。解决：用一个 `boolean isRegistered` 标记，在注册时置 true、注销成功后置 false。在 `onStop` 里注销（保证 Activity 不可见时不再收到广播），并检查 `if (isRegistered)` 再调用 `unregisterReceiver`。",
    tags: ["onDestroy", "广播", "资源管理"],
  },
];

export default bnrgLifecycleQuestions;
