import type { ReviewQuestion } from "./types";

export const adaeFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "adae-fr-1",
    chapter: "adae-final-review",
    level: 1,
    question: `用知识图谱的方式，串联《Android开发艺术探索》全书四大维度（组件/View/消息/性能）的关系。`,
    answer:
      `四大维度以「Android核心能力」为中心交汇：①四大组件（骨架）——Activity生命周期与启动模式、IPC（Binder一次拷贝、AIDL的Stub/Proxy、Messenger、ContentProvider、Binder连接池）、RemoteViews（通知、桌面Widget、跨进程UI更新）。②View体系（脸面）——三大流程（performTraversals→measure/layout/draw、MeasureSpec三模式）、事件分发、自定义View、Drawable六大种类、动画体系。③消息与线程（神经）——Handler四要素、ThreadLocal线程隔离、Looper.loop()的epoll阻塞不ANR、AsyncTask五回调与线程池。④性能优化（体检）——布局（层级/过度绘制/ViewStub）、内存（泄漏/LeakCanary/Bitmap采样）、卡顿ANR、耗电。交叉：组件承载View（setContentView）、View经Handler触发重绘（invalidate→Handler→performTraversals）、每处机制不当都转化为性能问题。主线：理解机制→用对工具→优化性能。`,
    tags: ["知识图谱", "四象限", "交叉关系", "全书复习"],
  },
  {
    id: "adae-fr-2",
    chapter: "adae-final-review",
    level: 2,
    question: `对比Activity的四种启动模式与Intent Flags，说明在什么场景下用哪种方式控制任务栈。`,
    answer:
      `启动模式（manifest静态）与Intent Flags（代码动态）都能控制任务栈：①standard——每次新建入当前栈，默认。②singleTop——栈顶复用，已在栈顶则onNewIntent不新建；FLAG_ACTIVITY_SINGLE_TOP等价，适合通知点击页、详情页防重复。③singleTask——栈内单例，启动时清其上方Activity并onNewIntent，常配合taskAffinity；FLAG_ACTIVITY_CLEAR_TOP|FLAG_ACTIVITY_NEW_TASK可近似，适合主页。④singleInstance——独占任务栈系统唯一，适合系统级页面。Intent Flags动态控制：FLAG_ACTIVITY_NEW_TASK在指定taskAffinity新栈启动；FLAG_ACTIVITY_CLEAR_TOP目标已存在则清掉它及上方再启动；FLAG_ACTIVITY_REORDER_TO_FRONT已存在则移到栈顶不新建；FLAG_ACTIVITY_NO_HISTORY启动后不留栈（如登录页）。原则：静态行为用launchMode，运行时动态决策用Flags，组合CLEAR_TOP+NEW_TASK+singleTop实现「回到唯一首页并清栈」。`,
    tags: ["启动模式", "Intent Flags", "任务栈", "选型对比"],
  },
  {
    id: "adae-fr-3",
    chapter: "adae-final-review",
    level: 3,
    question: `从Binder到Handler到View重绘，描述一次「子线程加载数据→主线程刷新UI」的完整链路如何依赖全书知识。`,
    answer:
      `完整链路：①起点——子线程（AsyncTask.doInBackground或线程池）发起网络/数据库请求，涉及线程与AsyncTask（耗时任务必须切子线程避免ANR）。②可能跨进程——若数据来自其他进程（ContentProvider查通讯录、AIDL调远程服务），走Binder：客户端Proxy.transact→Binder驱动一次拷贝→服务端Stub.onTransact。③切回主线程——子线程不能直接更新UI（ViewRootImpl.checkThread），用主线程Handler.sendMessage/post：Message入MessageQueue→Looper.loop()取出→Handler.dispatchMessage在主线程执行，理解ThreadLocal线程隔离与loop()的epoll阻塞不ANR。④刷新View——handleMessage里调view.setText触发invalidate，经Handler投递到下一个VSYNC，Choreographer驱动performTraversals：measure→layout→draw。⑤属性动画反馈——ObjectAnimator真实改属性触发重绘。⑥性能收尾——任一环节慢都会卡顿/ANR/OOM，需Systrace/LeakCanary/采样优化。一条链路贯穿IPC→Handler→View→性能全部知识。`,
    tags: ["完整链路", "Binder", "Handler", "View重绘", "跨知识综合"],
  },
  {
    id: "adae-fr-4",
    chapter: "adae-final-review",
    level: 3,
    question: `设计一个高性能的Android图片列表页（如朋友圈），从View、消息、内存、布局四个角度说明优化方案。`,
    answer:
      `①View层——RecyclerView替代ListView（ViewHolder复用、DiffUtil局部刷新、prefetch预取），图片用Glide（内部Bitmap采样+LruCache+磁盘缓存+生命周期绑定），滑动时暂停加载（onScrollStateChanged停止Glide请求）。②消息层——图片异步解码在子线程，加载完用Handler切回主线程setImageBitmap；onBindViewHolder不做耗时操作；HandlerThread做串行本地缓存读写。③内存层——Bitmap采样inSampleSize按ImageView实际尺寸压缩、RGB_565省内存；LruCache设可用内存1/8；onViewRecycled清图片引用；LeakCanary监控泄漏；分页加载+按需解码防OOM。④布局层——ConstraintLayout扁平化减少层级（目标≤4层）、移除冗余background避免过度绘制、ViewStub延迟加载少见元素。⑤综合——预加载离屏1-2屏、Paging3分页、骨架屏降感知卡顿、IO不进主线程。串联了View（RecyclerView/measure/layout）、消息（Handler线程切换）、内存（Bitmap/泄漏）、性能（布局/卡顿/OOM）全部知识。`,
    tags: ["综合应用", "图片列表", "RecyclerView", "性能优化", "内存"],
  },
];
