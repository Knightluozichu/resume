import type { ReviewQuestion } from "./types";

export const dakHandlerThreadQuestions: ReviewQuestion[] = [
  {
    id: "dak-handler-1",
    chapter: "dak-handler-thread",
    level: 1,
    question: `详细描述Handler消息循环的完整流程（Handler/Looper/MessageQueue三者如何协作）。`,
    answer: `完整流程：①发送消息——子线程通过Handler.sendMessage(msg)或post(Runnable)发送消息，Handler构造时绑定当前线程的Looper（Looper.myLooper()），持有其MessageQueue引用。sendMessage内部调用enqueueMessage()，设置msg.target=this，调用MessageQueue.enqueueMessage()按when升序插入链表。②消息排队——MessageQueue是按时间排序的单链表，enqueueMessage()用synchronized保证线程安全，插入后通过Pipe唤醒阻塞的Looper。③循环取消息——Looper.loop()是死循环，不断调用MessageQueue.next()获取消息。next()取出链表头部到期消息返回；无到期消息则通过epoll阻塞等待（非忙等待）；队列为空则无限等待。④分发处理——Looper取出Message后调用msg.target.dispatchMessage(msg)，按优先级处理：msg.callback不为null则执行Runnable；否则mCallback不为null则调用Callback.handleMessage；否则调用Handler.handleMessage。⑤回收——处理完调用msg.recycleUnchecked()回收到复用池。`,
    tags: ["Handler", "Looper", "MessageQueue", "消息循环", "线程通信"],
  },
  {
    id: "dak-handler-2",
    chapter: "dak-handler-thread",
    level: 2,
    question: `MessageQueue在无消息时如何避免CPU空转？什么是同步屏障（SyncBarrier）？`,
    answer: `避免CPU空转：next()方法在没有到期消息时不忙等待（while循环空转），而是利用Linux epoll机制实现高效阻塞等待。MessageQueue内部维护Pipe管道文件描述符，next()发现无到期消息时计算最近消息的等待时间，通过epoll_wait设置超时阻塞。当新消息入队（enqueueMessage）或消息到期时，向Pipe写端写入数据唤醒epoll，next()被唤醒重新检查链表。队列为空则无限期阻塞直到有消息入队。这种设计使主线程空闲时几乎不消耗CPU。同步屏障（SyncBarrier）是MessageQueue中的特殊消息（target=null），通过postSyncBarrier()插入。屏障插入后next()跳过所有同步消息（target不为null），只取出异步消息（flags设置FLAG_ASYNCHRONOUS）处理。系统在VSync到来时通过Choreographer插入屏障，让UI绘制相关Traversal消息优先执行，绘制完成后removeSyncBarrier()移除屏障。`,
    tags: ["MessageQueue", "epoll", "SyncBarrier", "同步屏障", "VSync"],
  },
  {
    id: "dak-handler-3",
    chapter: "dak-handler-thread",
    level: 2,
    question: `ANR的触发条件是什么？如何避免ANR？`,
    answer: `ANR触发条件（本质是主线程消息处理超时）：①Activity——主线程5秒内未响应Input事件（按键/触摸），由system_server的InputDispatcher监控；②BroadcastReceiver——onReceive()执行超过10秒（前台广播）/60秒（后台广播），由AMS监控；③Service——onCreate()/onStartCommand()执行超过20秒（前台）/200秒（后台），由AMS监控；④ContentProvider——publish超时10秒。避免ANR：①将耗时操作（I/O/数据库/网络/计算）移到子线程；②使用AsyncTask/HandlerThread/线程池/协程处理后台任务；③SharedPreferences用apply()（异步）代替commit()（同步）；④避免主线程sleep/wait/Thread.join；⑤使用StrictMode在开发期检测主线程违规；⑥优化布局层级减少measure/layout/draw耗时。ANR本质是主线程MessageQueue中某条消息处理过长，阻塞了后续消息（含Input事件）。`,
    tags: ["ANR", "主线程", "消息超时", "性能优化"],
  },
  {
    id: "dak-handler-4",
    chapter: "dak-handler-thread",
    level: 3,
    question: `Handler为什么会导致内存泄漏？如何解决？`,
    answer: `内存泄漏原因：①非静态内部类/匿名内部类隐式持有外部类引用——Activity中创建的匿名Handler内部类持有Activity的this引用；②Message持有Handler引用——sendMessage()时设置msg.target=this，MessageQueue中的Message持有Handler，Handler持有Activity；③主线程Looper生命周期最长——主线程Looper通过prepareMainLooper()创建，生命周期等于整个应用进程永不销毁；④Activity销毁时MessageQueue中还有未处理Message，Message→Handler→Activity引用链存在且Looper不销毁，导致Activity无法被GC回收。解决方案：①静态内部类+WeakReference——将Handler定义为静态内部类（不持有外部引用），通过WeakReference弱引用持有Activity，handleMessage时检查Activity存活（ref.get()!=null且!isFinishing()）；②onDestroy中移除消息——调用handler.removeCallbacksAndMessages(null)清除所有待处理消息，断开引用链。两种方案结合最佳。`,
    tags: ["内存泄漏", "Handler", "WeakReference", "GC", "静态内部类"],
  },
];
