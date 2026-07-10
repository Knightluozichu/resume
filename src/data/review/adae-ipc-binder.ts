import type { ReviewQuestion } from "./types";

export const adaeIpcBinderQuestions: ReviewQuestion[] = [
  {
    id: "adae-ipc-1",
    chapter: "adae-ipc-binder",
    level: 2,
    question: `Binder为什么只需一次数据拷贝？传统IPC和Binder的拷贝次数有何区别？`,
    answer:
      `传统IPC（管道/Socket/共享内存除外）需要两次拷贝：发送进程用户态 → 内核态缓冲区（第一次copy_from_user）→ 接收进程用户态（第二次copy_to_user）。Binder只需一次拷贝，原理：①Binder驱动在内核开辟一块缓冲区，并把它映射（mmap）到接收进程的用户态地址空间，这样内核缓冲区与接收进程用户空间指向同一块物理内存。②发送进程用copy_from_user把数据从发送进程用户态拷贝到内核缓冲区（这一次拷贝），由于内核缓冲区已映射到接收进程，接收进程用户态直接就能读到，无需第二次拷贝。③结果：一次copy_from_user即完成跨进程传递，性能优于两次拷贝的传统IPC。补充：Binder还用线程池/ServiceManager做名称服务、用引用计数管理对象生命周期，整体是面向对象的C/S架构，是Android跨进程通信的首选。`,
    tags: ["Binder", "一次拷贝", "mmap", "IPC原理"],
  },
  {
    id: "adae-ipc-2",
    chapter: "adae-ipc-binder",
    level: 2,
    question: `AIDL的工作原理是什么？客户端调用一个方法时经历了哪些步骤？`,
    answer:
      `AIDL（Android Interface Definition Language）是Binder的上层封装，自动生成Stub和Proxy：①定义——.aidl接口文件声明跨进程方法，编译器生成IXxx接口、Stub（服务端抽象类，继承Binder实现IXxx）、Proxy（客户端代理，作为Stub的内部类）。②客户端调用流程：拿到IBinder（bindService的onServiceConnected）→ Stub.asInterface包装成Proxy → 调用proxy.add(1,2)。③Proxy内部：创建data Parcel打包参数（writeInt），创建空reply Parcel → 调用transact(Stub.DESCRIPTOR_add, data, reply, 0)，这会经Binder驱动跨进程到服务端 → 阻塞等待返回。④服务端：Stub.onTransact被回调，从data解包参数，匹配code，执行真正的add方法，把结果writeInt到reply。⑤驱动唤醒客户端，Proxy从reply读出结果返回。整个过程客户端只面对Proxy，服务端只面对Stub，Binder驱动的跨进程细节被完全隐藏。tag整型code区分不同方法。`,
    tags: ["AIDL", "Stub", "Proxy", "transact", "Parcel"],
  },
  {
    id: "adae-ipc-3",
    chapter: "adae-ipc-binder",
    level: 2,
    question: `Binder、Messenger、ContentProvider、Socket四种IPC方式如何选型？`,
    answer:
      `四种IPC选型：①Binder/AIDL——面向对象C/S，一次拷贝性能最优，支持并发调用和回调，是最常用的IPC方式。适合：频繁的方法调用、需要双向交互、需要传输Parcelable对象。②Messenger——基于Binder+Handler实现，串行处理消息（内部一个Handler一个MessageQueue），线程安全无并发问题，但只能单向传消息不能并发调用方法。适合：低频的跨进程通知、不需要返回结果的指令传递、对线程安全要求高但并发量低的场景。③ContentProvider——专门用于数据源跨进程共享，提供CRUD接口，系统级标准化（如通讯录、媒体库）。适合：共享结构化数据给其他App、需要数据变化的ContentObserver通知。④Socket——全双工、支持网络跨设备，但开销大需两次拷贝。适合：大量数据流传输、跨设备/网络通信、本地进程间的大块数据。原则：方法调用用AIDL，单向通知用Messenger，数据共享用ContentProvider，网络/大流用Socket。`,
    tags: ["IPC选型", "Messenger", "ContentProvider", "Socket"],
  },
  {
    id: "adae-ipc-4",
    chapter: "adae-ipc-binder",
    level: 3,
    question: `什么是Binder连接池？它解决了什么问题？`,
    answer:
      `Binder连接池（BinderPool）解决「多个AIDL接口需要多个Service」的浪费问题：①问题——每个AIDL接口通常需要一个Service承载（bindService返回IBinder），若App有N个跨进程模块就要N个Service，每个Service都是一个进程开销和组件负担，且管理混乱。②BinderPool思路——只用一个Service，它返回一个统一的IBinderPool接口；各个业务AIDL的queryBinder(code)向连接池查询自己的IBinder，连接池内部用SparseArray维护code→IBinder映射，把不同业务的Binder都注册在这一个Service里。③流程：客户端bindService拿BinderPool → queryBinder(业务code)得到具体业务的IBinder → 转成业务接口使用。④好处：无论多少个业务模块，始终只有一个Service，复用进程和连接，降低开销，统一管理。这是《艺术探索》提出的典型工程化模式，把Binder的使用从「一接口一Service」优化为「多接口一Service」。`,
    tags: ["Binder连接池", "Service复用", "工程化", "AIDL"],
  },
];
