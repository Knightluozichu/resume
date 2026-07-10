import type { ReviewQuestion } from "./types";

export const dakBinderSystemQuestions: ReviewQuestion[] = [
  {
    id: "dak-binder-1",
    chapter: "dak-binder-system",
    level: 1,
    question: `Binder为什么只需一次拷贝？详细解释mmap内存映射的原理。`,
    answer: `传统IPC需两次拷贝：Client用户空间→copy_from_user→内核缓冲区→copy_to_user→Server用户空间。Binder通过mmap省去第二次拷贝。原理：Binder驱动在Server进程打开/dev/binder时调用binder_mmap()，在内核空间分配物理内存页，同时将这块物理页映射到Server进程的用户空间虚拟地址。这样Server的用户空间和内核空间指向同一块物理内存。Client发送数据时只需copy_from_user将数据从Client用户空间拷贝到内核缓冲区（即Server的mmap映射区），由于Server用户空间与这块内核缓冲区映射到同一物理页，数据拷贝后Server即可直接读取，无需copy_to_user。整个流程只有一次CPU内存复制。`,
    tags: ["Binder", "mmap", "一次拷贝", "内存映射"],
  },
  {
    id: "dak-binder-2",
    chapter: "dak-binder-system",
    level: 2,
    question: `详细描述Proxy-Stub通信模型的工作流程。`,
    answer: `Proxy-Stub工作流程：①定义AIDL接口，AIDL编译器自动生成Proxy和Stub代码；②Client端调用——Client持有Proxy（实现服务接口），调用proxy.method(args)时Proxy将方法名和参数打包为Parcel数据，通过transact()发起ioctl系统调用发送给Binder驱动，Client线程阻塞等待；③Binder驱动转发——驱动根据目标handle找到Server进程，将请求数据投递到Server的Binder线程池，唤醒Server的Binder线程；④Server端处理——Stub.onTransact(code, data, reply, flags)被回调，从data解包Parcel读取参数，执行真实方法，将返回值写入reply Parcel，通过ioctl发送回复；⑤Binder驱动回传——驱动将回复投递给Client，唤醒阻塞的Client线程；⑥Client获取结果——Proxy从reply读取返回值返回。整个过程对开发者透明。`,
    tags: ["Proxy-Stub", "AIDL", "Parcel", "Binder通信"],
  },
  {
    id: "dak-binder-3",
    chapter: "dak-binder-system",
    level: 2,
    question: `ServiceManager在Binder体系中的角色是什么？服务注册和查询的流程分别是什么？`,
    answer: `ServiceManager是Binder通信的服务管理器（相当于DNS），是特殊的Binder服务（handle=0，唯一硬编码句柄），由init进程第一个启动。服务注册流程：①Server进程（如system_server）创建Binder服务对象；②调用ServiceManager.addService("activity", mAMS)注册；③通过ioctl发送到Binder驱动（目标handle=0）；④驱动投递给ServiceManager进程；⑤ServiceManager将名字→Binder引用存入内部表（svclist）。服务查询流程：①Client调用ServiceManager.getService("activity")；②通过ioctl发送查询（目标handle=0）；③ServiceManager查表返回Binder引用；④Client获得Proxy代理对象；⑤此后Client直接通过Proxy与Server通信，不再经过ServiceManager。`,
    tags: ["ServiceManager", "服务注册", "服务查询", "handle=0"],
  },
  {
    id: "dak-binder-4",
    chapter: "dak-binder-system",
    level: 3,
    question: `Binder的安全机制是什么？为什么说它比传统IPC更安全？`,
    answer: `Binder安全机制：Binder驱动在内核层binder_transaction()函数中自动记录调用方真实身份——t->sender_euid记录有效用户ID（UID），t->sender_pid记录进程组ID（PID）。这些信息由内核写入，应用层无法篡改。Server端通过Binder.getCallingUid()/getCallingPid()获取调用方真实身份校验权限。例如PMS检查权限时获取callingUid，调用checkUidPermission()校验，未授权抛SecurityException。比传统IPC更安全的原因：传统IPC（如Socket）需在应用层由发送方自行附带UID/PID，接收方无法验证真实性——恶意进程可伪造任意UID/PID。而Binder的身份信息由内核直接从task_struct读取（task_euid/task_tgid_nr），应用层无法伪造。这种内核级身份认证是Android权限系统的基础。`,
    tags: ["Binder安全", "UID", "PID", "内核层身份认证", "权限校验"],
  },
];
