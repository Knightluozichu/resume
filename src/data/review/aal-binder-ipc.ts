import type { ReviewQuestion } from "./types";

export const aalBinderIpcQuestions: ReviewQuestion[] = [
  {
    id: "aal-bi-1",
    chapter: "aal-binder-ipc",
    level: 1,
    question: `Binder IPC与传统IPC（如管道、共享内存、Socket）相比有什么优势？为什么Android选择Binder？`,
    answer: `Binder相比传统IPC的优势：①性能——传统IPC需要两次数据拷贝（用户空间→内核→用户空间），Binder通过mmap内存映射只需一次拷贝，性能接近共享内存但更安全；②安全性——传统IPC无法在内核层获取调用方身份，Binder驱动为每个Binder实体记录UID/PID，Server端可直接校验调用方身份，无需依赖应用层认证；③易用性——Binder采用面向对象设计，通过AIDL定义接口自动生成Proxy/Stub代码，开发者像调用本地方法一样调用远程服务；④稳定性——Binder驱动内置死亡通知（DeathRecipient）、线程池管理、引用计数，比Socket更可靠。Android选择Binder的核心原因：移动设备对性能和安全性要求极高，Binder在性能（一次拷贝）和安全性（内核级身份校验）之间取得了最佳平衡，且面向对象的编程模型大大降低了IPC开发难度。`,
    tags: ["Binder", "IPC对比", "性能", "安全性"]
  },
  {
    id: "aal-bi-2",
    chapter: "aal-binder-ipc",
    level: 2,
    question: `Binder的一次拷贝（mmap）机制是如何实现的？为什么传统IPC需要两次拷贝？`,
    answer: `传统IPC两次拷贝流程：发送方用户空间buffer → copy_from_user → 内核空间buffer → copy_to_user → 接收方用户空间buffer。两次拷贝是因为内核和用户空间内存隔离，数据必须经过内核中转。Binder一次拷贝原理：①接收方（Server进程）启动时通过mmap将内核空间的一块内存映射到自己的用户空间，这样内核buffer和接收方用户空间buffer指向同一块物理内存；②发送方调用transact()时，Binder驱动通过copy_from_user将数据从发送方用户空间拷贝到内核buffer（唯一一次拷贝）；③由于mmap映射，接收方用户空间可以直接读取内核buffer的数据，无需第二次copy_to_user。关键：mmap只在接收方建立，发送方仍需一次拷贝（因为发送方用户空间和内核空间不共享）。这就是Binder的「一次拷贝」——省去了从内核到接收方用户空间的第二次拷贝。`,
    tags: ["mmap", "一次拷贝", "内存映射", "Binder驱动"]
  },
  {
    id: "aal-bi-3",
    chapter: "aal-binder-ipc",
    level: 2,
    question: `Binder通信中Proxy和Stub的作用是什么？AIDL如何利用它们实现跨进程调用？`,
    answer: `Proxy（代理）和Stub（存根）是Binder通信的两端：①Proxy运行在Client进程，实现IInterface接口，客户端调用Proxy的方法时，Proxy将方法参数封装为Parcel（data），通过BinderProxy.transact()发送给Binder驱动，然后阻塞等待结果；②Stub运行在Server进程，继承Binder，在onTransact()中解析Parcel参数，根据code调用真实的业务方法，将返回值写入reply Parcel返回。AIDL利用Proxy/Stub的流程：①开发者编写.aidl接口文件（如IMath.aidl）；②编译器自动生成IMath.java，包含Stub抽象类和Proxy内部类；③Server端实现Stub的具体业务逻辑，通过ServiceManager注册服务；④Client端通过ServiceManager获取服务的Binder引用，包装为Proxy；⑤Client调用Proxy.add() → 封装Parcel → Binder驱动转发 → Stub.onTransact()解析 → 调用真实add() → 返回结果。对开发者透明：像调用本地方法一样调用远程服务。`,
    tags: ["Proxy", "Stub", "AIDL", "Parcel", "跨进程调用"]
  },
  {
    id: "aal-bi-4",
    chapter: "aal-binder-ipc",
    level: 3,
    question: `ServiceManager在Binder通信中扮演什么角色？为什么它是0号引用？注册和查询服务的流程是什么？`,
    answer: `ServiceManager是Binder通信的「服务注册中心」/「DNS服务器」，负责管理所有Binder服务的注册和查询。它是0号引用的原因：Binder驱动为ServiceManager分配了固定的handle=0，所有进程都通过handle=0与ServiceManager通信，这是Binder协议的约定，使得任何进程都能找到ServiceManager这个入口点。注册服务流程（Server端）：①Server进程创建Binder对象 → ②通过Binder驱动向ServiceManager发送addService(name, binder)请求 → ③ServiceManager将name和Binder引用存入内部注册表（HashMap）。查询服务流程（Client端）：①Client进程通过Binder驱动向ServiceManager发送getService(name)请求 → ②ServiceManager查表找到对应Binder引用 → ③返回一个BinderProxy给Client → ④Client通过BinderProxy调用远程方法。ServiceManager是系统中第一个启动的Binder服务（init进程中启动），AMS、WMS等核心服务都通过它注册和查询。没有ServiceManager，进程间无法互相发现。`,
    tags: ["ServiceManager", "0号引用", "服务注册", "服务查询"]
  }
];
