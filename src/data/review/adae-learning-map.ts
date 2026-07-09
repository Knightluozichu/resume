import type { ReviewQuestion } from "./types";

export const adaeLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "adae-lm-1",
    chapter: "adae-learning-map",
    level: 1,
    question: "《Android开发艺术探索》全书的知识体系结构和递进逻辑是什么？",
    answer:
      "全书围绕「理解机制 → 用对工具 → 优化性能」主线，分为十个章节覆盖四大维度：①四大组件——Activity（生命周期与启动模式、任务栈、Intent Flags）、IPC（Binder一次拷贝、AIDL、Messenger、ContentProvider、Socket、Binder连接池）、RemoteViews（通知、桌面Widget、跨进程UI更新）；②View体系——View/ViewGroup三大流程（measure/layout/draw、MeasureSpec三模式）、事件分发、自定义View、Drawable六大种类、动画体系；③消息与线程——Handler四要素、ThreadLocal线程隔离、AsyncTask五回调与线程池；④性能优化——布局、内存、卡顿ANR、耗电稳定性。递进逻辑：四大组件→View→消息线程→性能优化，组件是骨架、View是脸面、消息线程是神经、性能是体检，最终汇聚为完整Android高级开发能力。",
    tags: ["知识体系", "四大维度", "递进逻辑", "全书概览"],
  },
  {
    id: "adae-lm-2",
    chapter: "adae-learning-map",
    level: 2,
    question: "《Android开发艺术探索》与一般Android入门书在内容定位上有什么区别？",
    answer:
      "本书定位「进阶」而非入门：①深度——入门书讲「怎么用」（怎么写Activity、发通知），本书讲「为什么」和底层机制（Activity生命周期背后AMS如何调度、Binder如何一次拷贝跨进程、Handler如何驱动整个App心跳、View三大流程如何由performTraversals触发）。②视角——以原理与源码流程为主，强调理解Android系统的设计意图。③覆盖面——串起四大组件、View、消息机制、线程、Drawable动画、性能优化六大主题，形成从「能写」到「写好」再到「调优」的完整链条。④目标读者——面向有基础的开发者，解决「会用但不懂原理」的瓶颈。核心理念：只有理解机制才能用对工具，最终优化性能。",
    tags: ["进阶定位", "原理视角", "内容深度"],
  },
  {
    id: "adae-lm-3",
    chapter: "adae-learning-map",
    level: 3,
    question: "用一次完整的Android功能开发流程，串联全书的知识体系。",
    answer:
      "从零开发一个功能完整的应用：①Activity——设计启动模式（详情页singleTop防重复、主页singleTask保证栈内单例），处理onSaveInstanceState恢复状态。②IPC——AIDL定义跨进程接口，Binder连接池复用Service，大文件用Socket或ContentProvider。③View——自定义流式标签ViewGroup（重写onMeasure/onLayout），处理触摸事件分发与滑动冲突，属性动画做交互反馈。④Drawable与动画——ShapeDrawable圆角背景、StateListDrawable按压效果、ObjectAnimator入场动画。⑤Handler——子线程加载数据用Handler.sendMessage切回主线程刷新UI，HandlerThread做串行后台任务。⑥线程——AsyncTask或线程池做网络请求，IntentService做后台同步。⑦性能——Hierarchy View查布局层级、LeakCanary监控泄漏、Systrace定位掉帧、Bitmap采样避免OOM。依赖关系：组件是骨架、View是脸面、消息线程是神经、性能是体检，缺一不可。",
    tags: ["功能串联", "综合应用", "完整项目"],
  },
  {
    id: "adae-lm-4",
    chapter: "adae-learning-map",
    level: 2,
    question: "Android的四大维度（组件/View/消息/性能）之间有什么内在联系？",
    answer:
      "四大维度的内在联系：①组件是骨架——四大组件构成App运行结构，但组件本身不直接渲染UI也不处理耗时任务。②View是脸面——Activity通过setContentView挂载View树，View的measure/layout/draw由Choreographer在主线程驱动，事件分发让用户与View交互，组件提供View的容器。③消息线程是神经——UI线程由Looper.loop()死循环驱动（ActivityThread.main启动），Handler让子线程能与主线程通信刷新UI，AsyncTask/线程池处理耗时任务再经Handler回主线程，View的invalidate最终也通过Handler调度重绘。④性能是体检——布局层级深导致measure/layout耗时掉帧，内存泄漏导致OOM，主线程阻塞导致ANR，都是前三维度用错的征兆。交叉点：组件×View=Activity承载View树；View×消息=invalidate经Handler触发重绘；全书×性能=每处机制不当都转化为性能问题。",
    tags: ["维度联系", "交叉关系", "组件", "View", "消息", "性能"],
  },
];
