import type { ReviewQuestion } from "./types";

export const davInitZygoteQuestions: ReviewQuestion[] = [
  {
    id: "dav-iz-1",
    chapter: "dav-init-zygote",
    level: 1,
    question: "init进程的启动流程是什么？init.rc如何定义和启动服务？",
    answer: "init是用户空间第一个进程（PID=1）。第一阶段挂载文件系统/创建设备节点/加载SELinux；第二阶段property_init初始化属性系统，signal_handler_init注册SIGCHLD，start_property_service启动属性服务，ParseConfig解析init.rc，进入epoll_wait主循环执行命令和重启服务。init.rc用Android Init Language：service声明守护进程（名称/可执行文件/参数/选项），class分组批量启动，critical标记关键服务，on触发器在事件时执行命令。",
    tags: ["init", "init.rc", "PID=1", "属性系统", "Service"],
  },
  {
    id: "dav-iz-2",
    chapter: "dav-init-zygote",
    level: 2,
    question: "属性系统的工作原理是什么？get和set的流程有何不同？",
    answer: "属性存储在共享内存（__system_property_area__），进程通过mmap共享访问。get无需IPC：直接从mmap共享内存查找读取，效率极高。set需IPC到init：通过Socket发送给init的property service，init检查权限（SELinux+UID白名单），通过后更新共享内存，persist.前缀额外写入/data/property/持久化。ro.前缀只读不可修改。权限控制原因：属性全局共享，恶意修改影响系统行为。",
    tags: ["属性系统", "mmap", "共享内存", "权限控制", "persist"],
  },
  {
    id: "dav-iz-3",
    chapter: "dav-init-zygote",
    level: 2,
    question: "Zygote如何fork应用进程？COW机制为什么能提升启动速度？",
    answer: "AMS通过Socket发送fork请求（UID/GID/包名/SELinux域）→Zygote runSelectLoop收到→forkAndSpecialize()→native fork()→子进程SpecializeCommon设置UID/GID/SELinux→执行ActivityThread.main()。COW提升速度：fork只复制页表不复制物理内存，物理页标记只读共享。Zygote预加载的类/资源被子进程共享，只有写入时才复制对应页。子进程免费获得预加载资源，无需重复加载，启动极快。",
    tags: ["Zygote", "fork", "COW", "forkAndSpecialize", "runSelectLoop"],
  },
  {
    id: "dav-iz-4",
    chapter: "dav-init-zygote",
    level: 3,
    question: "system_server是如何启动的？它与Zygote的关系是什么？",
    answer: "ZygoteInit.forkSystemServer()构造参数（UID=system/进程名system_server/启动类SystemServer）→forkSystemServer() fork→子进程handleSystemServerProcess()→反射调用SystemServer.main()→run()启动服务：startBootstrapServices(AMS/PMS)、startCoreServices、startOtherServices(WMS/InputManager)→Looper.loop()。关系：system_server由Zygote fork创建（共享预加载资源），承载AMS/WMS/PMS核心服务。AMS需要启动App时又通过Socket请求Zygote fork，形成循环。",
    tags: ["system_server", "forkSystemServer", "SystemServer", "AMS", "WMS"],
  },
];
