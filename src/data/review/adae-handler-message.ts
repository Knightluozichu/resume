import type { ReviewQuestion } from "./types";

export const adaeHandlerMessageQuestions: ReviewQuestion[] = [
  {
    id: "adae-hm-1",
    chapter: "adae-handler-message",
    level: 2,
    question: `Handler消息机制的四个核心要素是什么？它们如何协作完成一次消息传递？`,
    answer:
      `四要素：Handler、Message、MessageQueue、Looper。协作流程（子线程发消息→主线程处理）：①子线程持有主线程的Handler，调用handler.sendMessage(msg)或post(Runnable)。②Handler把消息封装成Message（设置what/obj/target=this Handler），调enqueueMessage把Message按when（延迟时间）插入MessageQueue（按时间排序的单链表）。③主线程的Looper.loop()是个死循环，不断调MessageQueue.next()取下一条到时的Message，无消息时native层阻塞（epoll）不耗CPU。④取到Message后，调msg.target.dispatchMessage(msg)分发回Handler——target就是发送它的Handler。⑤Handler.dispatchMessage按顺序处理：若msg.callback(Runnable)非空则执行callback.run；否则若mCallback非空调Callback.handleMessage；否则调重写的handleMessage(msg)。⑥处理完Message回收到消息池复用。整个机制让子线程能安全地把任务「投递」到主线程执行，是Android线程间通信的基础。ThreadLocal保证每个线程有独立的Looper/MessageQueue，互不干扰。`,
    tags: ["Handler", "Message", "MessageQueue", "Looper", "四要素"],
  },
  {
    id: "adae-hm-2",
    chapter: "adae-handler-message",
    level: 3,
    question: `Looper.loop()是个死循环，为什么不会卡死（ANR）主线程？MessageQueue无消息时如何处理？`,
    answer:
      `Looper.loop()虽是死循环但不卡死主线程，关键在MessageQueue.next()的阻塞机制：①next()取消息时，若队列空或下一条还没到时间，会调用nativePollOnce进入native层阻塞（基于Linux的epoll机制，pipe管道+epoll_wait）。②这种阻塞是「让出CPU」的休眠，不占用CPU时间片，不像死循环空转耗电，也不会ANR。③当有新消息入队（enqueueMessage）或到时，通过nativeWake往管道写数据唤醒epoll，next()返回继续处理。④ANR的本质是「主线程在处理某条消息时耗时过长」（如onCreate里做耗时操作、某个handleMessage里睡眠5秒），导致后续输入事件超时（5s输入/10s广播）。而loop()本身等待消息时是休眠的，不算「卡」。⑤所以主线程「大部分时间在休眠等消息」，有消息（VSYNC重绘、输入事件、Handler任务）才被唤醒处理，处理完又休眠。这正是Android UI线程的事件驱动模型：消息驱动的单线程模型，loop是引擎，消息是燃料。理解这点就能明白为什么耗时任务必须切子线程——否则会阻塞这条消息链导致ANR。`,
    tags: ["Looper", "死循环", "nativePollOnce", "epoll", "ANR"],
  },
  {
    id: "adae-hm-3",
    chapter: "adae-handler-message",
    level: 2,
    question: `为什么子线程不能直接更新UI？Handler是如何实现线程切换的？`,
    answer:
      `子线程不能直接更新UI的原因：①Android的UI控件（View树）不是线程安全的，多线程并发修改会导致状态不一致、绘制错乱。②ViewRootImpl在更新UI时会checkThread()校验当前线程是否是创建View的线程（即主线程mThread），不是则抛「Only the original thread that created a view hierarchy can touch its views」。③所以UI操作必须串行在单一线程（主线程）执行，保证安全。Handler实现线程切换：①子线程持有「主线程的Handler」（Handler与Looper绑定，主线程Handler绑的是主线程Looper）。②子线程调handler.sendMessage/post，Message被插入主线程的MessageQueue（因为Handler绑的是主线程Looper，其MessageQueue是主线程的）。③主线程Looper.loop()取出该Message，在主线程执行dispatchMessage→handleMessage。④于是「子线程发的任务」被「主线程执行」，完成线程切换。本质：Handler把「任务的提交」和「任务的执行」解耦——提交在任意线程，执行在Handler所属Looper的线程。这也是runOnUiThread、View.post的底层原理。`,
    tags: ["子线程更新UI", "线程切换", "checkThread", "线程安全"],
  },
  {
    id: "adae-hm-4",
    chapter: "adae-handler-message",
    level: 3,
    question: `ThreadLocal在Handler机制中起什么作用？子线程如何使用Handler？`,
    answer:
      `ThreadLocal在Handler中的作用是实现「每个线程有独立的Looper」，从而隔离各线程的消息队列：①Looper.prepare()里new Looper()并存入ThreadLocal<Looper>，prepareMainLooper主线程用。②Looper.myLooper()从ThreadLocal取当前线程的Looper。③这样每个线程有自己的Looper和MessageQueue，互不干扰——主线程的消息不会跑到子线程处理，反之亦然。④Handler构造时通过Looper.myLooper()拿到「当前线程」的Looper绑定，所以「在哪个线程new Handler，Handler就处理在哪个线程」。子线程使用Handler：①子线程默认没有Looper，直接new Handler会报「Can't toast on a thread that has not called Looper.prepare()」。②需先Looper.prepare()创建该线程的Looper（存入ThreadLocal），再new Handler(this线程的Looper)，最后Looper.loop()启动循环。③典型封装是HandlerThread——继承Thread，run()里prepare+loop，自带Looper，用完getLooper拿Handler，quit()时退出loop释放。④子线程Handler适合做串行后台任务（如HandlerThread），用完务必quit避免线程泄漏。ThreadLocal是Handler「线程绑定」特性的基石。`,
    tags: ["ThreadLocal", "Looper.prepare", "HandlerThread", "线程隔离"],
  },
];
