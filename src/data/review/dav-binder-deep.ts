import type { ReviewQuestion } from "./types";

export const davBinderDeepQuestions: ReviewQuestion[] = [
  {
    id: "dav-bd-1",
    chapter: "dav-binder-deep",
    level: 2,
    question: "详细解释Binder驱动的mmap一次拷贝原理，对比传统IPC的两次拷贝。",
    answer: "传统IPC两次拷贝：Client用户空间→copy_from_user→内核缓冲区→copy_to_user→Server用户空间。Binder一次拷贝：Server打开/dev/binder时binder_mmap()在内核空间分配物理页，同时映射到Server用户空间虚拟地址（两个虚拟地址同一物理页）。Client发送数据时copy_from_user拷贝到内核缓冲区（即Server的mmap映射区），Server可直接读取无需copy_to_user。只有一次CPU内存复制，这是Binder相比传统IPC的核心性能优势。",
    tags: ["binder_mmap", "一次拷贝", "copy_from_user", "IPC性能"],
  },
  {
    id: "dav-bd-2",
    chapter: "dav-binder-deep",
    level: 2,
    question: "描述Native层Binder的通信流程（BpBinder→IPCThreadState→驱动→BBinder）。",
    answer: "Client调用BpBinder.transact()→IPCThreadState.transact()写入BC_TRANSACTION到mOut→waitForResponse()通过ioctl(BINDER_WRITE_READ)发送给驱动→Client阻塞。驱动根据handle找到目标binder_node和空闲Binder线程→投递BR_TRANSACTION。Server的joinThreadPool循环收到BR_TRANSACTION→executeCommand()调用BBinder.transact()→子类onTransact()处理→BC_REPLY发送回复→驱动投递BR_REPLY给Client→transact()返回。",
    tags: ["BpBinder", "BBinder", "IPCThreadState", "transact", "ioctl"],
  },
  {
    id: "dav-bd-3",
    chapter: "dav-binder-deep",
    level: 3,
    question: "BC_和BR_协议分别是什么？列举一次完整通信的协议序列。",
    answer: "BC_（Binder Command）应用层→驱动：BC_TRANSACTION发送请求、BC_REPLY发送回复、BC_ACQUIRE/RELEASE引用计数、BC_ENTER_LOOPER加入循环。BR_（Binder Return）驱动→应用：BR_TRANSACTION收到请求、BR_REPLY收到回复、BR_SPAWN_LOOPER要求启动新线程。完整序列：Client BC_TRANSACTION→驱动→Server BR_TRANSACTION→Server BC_REPLY→驱动→Client BR_REPLY。IPCThreadState通过ioctl读写这些命令。",
    tags: ["BC_", "BR_", "通信协议", "BINDER_WRITE_READ"],
  },
  {
    id: "dav-bd-4",
    chapter: "dav-binder-deep",
    level: 3,
    question: "ServiceManager的C++实现中，服务注册和查询的流程是什么？为什么handle=0？",
    answer: "main()中binder_open打开/dev/binder，binder_become_context_manager注册为context manager（驱动分配handle=0），binder_loop进入循环。addService：Server通过BpBinder(handle=0)发送SVC_MGR_ADD_SERVICE，ServiceManager解析服务名和handle，创建svcinfo存入svclist链表。getService：Client发送SVC_MGR_GET_SERVICE查询服务名，ServiceManager返回handle，驱动在Client进程创建binder_ref指向Server的binder_node。handle=0是因为ServiceManager是查询起点，需硬编码避免循环依赖——用handle=0时驱动知道目标是ServiceManager。",
    tags: ["ServiceManager", "handle=0", "addService", "getService", "svclist"],
  },
];
