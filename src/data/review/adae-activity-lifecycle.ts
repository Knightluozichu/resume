import type { ReviewQuestion } from "./types";

export const adaeActivityLifecycleQuestions: ReviewQuestion[] = [
  {
    id: "adae-al-1",
    chapter: "adae-activity-lifecycle",
    level: 1,
    question: `Activity的生命周期有哪七个回调？分别在什么时机被调用？`,
    answer:
      `Activity七个生命周期回调：①onCreate——Activity正在被创建，做初始化（setContentView、初始化数据），此时不可见。②onStart——Activity正在被启动，即将变为可见，但还不能交互。③onResume——Activity变为可见且可与用户交互，位于前台。④onPause——Activity正在停止，部分被遮挡，部分可见但失去焦点不能交互，可做轻量存储但忌讳耗时。⑤onStop——Activity完全不可见（被新Activity完全覆盖或切到后台），可做较重的资源释放。⑥onDestroy——Activity正在被销毁，做最终回收、注销广播等。⑦onRestart——Activity从停止态重新启动前调用，随后接onStart。完整流程：首次启动 onCreate→onStart→onResume；切到半透明Activity onPause→（回来）onResume；切到完全覆盖Activity onPause→onStop→（回来）onRestart→onStart→onResume；销毁 onPause→onStop→onDestroy。`,
    tags: ["生命周期", "回调", "onCreate", "onResume"],
  },
  {
    id: "adae-al-2",
    chapter: "adae-activity-lifecycle",
    level: 2,
    question: `Activity的四种启动模式各有什么特点？分别适合什么场景？`,
    answer:
      `四种launchMode：①standard标准模式——每次startActivity都新建实例并入栈，谁启动就入谁的栈，默认模式，栈内可重复，适合普通页面。②singleTop栈顶复用——若目标Activity已在任务栈顶则复用并回调onNewIntent，否则新建实例；不在栈顶仍会新建。适合推送通知点击页、消息详情页（避免连续点击产生多个实例）。③singleTask栈内单例——整个系统只有一个实例，启动时若已存在则清掉它上方的所有Activity并回调onNewIntent，常配合taskAffinity用。适合主界面、浏览器主界面（保证回到唯一的首页）。④singleInstance单实例——Activity独占一个任务栈，整个系统唯一且独立Back栈，其他Activity不能进入它的栈。适合系统级通话页、闹钟响铃页。补充：Intent Flags（如FLAG_ACTIVITY_NEW_TASK、FLAG_ACTIVITY_CLEAR_TOP）可在代码里动态覆盖launchMode，比清单声明更灵活。`,
    tags: ["启动模式", "launchMode", "任务栈", "singleTask"],
  },
  {
    id: "adae-al-3",
    chapter: "adae-activity-lifecycle",
    level: 3,
    question: `Activity被系统回收后如何恢复状态？onSaveInstanceState与onRestoreInstanceState如何配合？`,
    answer:
      `当系统内存不足时，处于onStop态的Activity可能被回收，恢复时需保存与恢复状态：①保存——onSaveInstanceState在onStop之前（API 28+在onStop后）调用，系统默认保存View的层级状态（如EditText文本、ScrollView位置，前提是View有id）。开发者可重写它存入key-value Bundle。②恢复——有两种途径：onCreate的Bundle参数（非null表示是恢复重建），或onRestoreInstanceState（仅在重建时调用，Bundle一定非null，比onCreate里判空更清晰）。③流程：正常旋转或回收重建 → onSaveInstanceState存Bundle → 进程被杀 → 重建时onCreate(Bundle)/onRestoreInstanceState(Bundle)读回。④配置变更（如屏幕旋转）默认会重建Activity，可在manifest用android:configChanges声明自行处理避免重建，但复杂场景仍建议让系统重建。⑤防丢失：重要数据应持久化（数据库/文件），Bundle只适合轻量临时状态，因为进程被杀Bundle也可能丢。`,
    tags: ["状态恢复", "onSaveInstanceState", "配置变更", "Bundle"],
  },
  {
    id: "adae-al-4",
    chapter: "adae-activity-lifecycle",
    level: 2,
    question: `onPause和onStop有什么区别？为什么onPause里不能做耗时操作？`,
    answer:
      `onPause与onStop的区别：①可见性——onPause时Activity部分可见（被透明/半透明Activity遮挡）但失去焦点不能交互；onStop时Activity完全不可见（被完全不透明Activity覆盖或切到后台）。②调用条件——弹半透明对话框只触发onPause不触发onStop；完全跳转新Activity才触发onStop。③资源释放程度——onPause适合做轻量操作（停动画、释放独占资源如相机），onStop可做较重释放（停网络请求、写数据库、注销广播）。④为什么不耗时——新Activity的onResume要等旧Activity的onPause执行完才调用（onPause→新onCreate→…→新onResume→旧onStop），若onPause耗时会拖延新Activity显示造成卡顿，严重时ANR。正确做法：耗时操作放到onStop或onSaveInstanceState之后，onPause只做最必要的快速释放。`,
    tags: ["onPause", "onStop", "可见性", "耗时操作"],
  },
];
