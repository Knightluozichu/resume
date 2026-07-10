import type { ReviewQuestion } from "./types";

export const dakInitBootQuestions: ReviewQuestion[] = [
  {
    id: "dak-init-1",
    chapter: "dak-init-boot",
    level: 1,
    question: `Android系统从上电到桌面显示的完整启动流程是什么？`,
    answer: `完整启动流程七步：①BootROM——上电自检，加载Bootloader到RAM；②Bootloader——初始化硬件（CPU/内存/时钟），加载Linux内核和ramdisk到RAM，跳转内核入口；③Linux Kernel——初始化驱动，挂载文件系统，启动init进程（PID=1）；④init——解析init.rc，启动守护进程（servicemanager/vold/netd），启动Zygote；⑤Zygote——创建ART虚拟机，预加载类库和资源（preloadClasses/preloadResources），注册Socket，fork system_server；⑥system_server——三段式启动核心服务（AMS/PMS/WMS等），注册到ServiceManager，调用AMS.systemReady()；⑦Launcher——AMS启动Launcher桌面，系统启动完成。`,
    tags: ["启动流程", "BootROM", "init", "Zygote", "system_server", "Launcher"],
  },
  {
    id: "dak-init-2",
    chapter: "dak-init-boot",
    level: 2,
    question: `Zygote为什么使用fork+COW？为什么用Socket而不是Binder与AMS通信？`,
    answer: `Zygote使用fork+COW的原因：①fork创建子进程时子进程与父进程共享物理内存页，只有写入时才复制（COW写时复制）；②Zygote预加载了大量系统资源（类库/图片/字符串），fork出的应用进程直接共享这些只读资源，无需重复加载；③避免每个应用重新启动JVM和加载类（几十ms→几ms），提升启动速度；④减少内存占用。用Socket而非Binder的原因：①Zygote启动时Binder尚未就绪（ServiceManager已启动但Zygote未注册为Binder服务）；②fork时不能持有Binder锁——Binder是多线程的，fork只复制调用线程，如果其他线程持有锁会导致子进程状态不一致，Socket是单线程的fork前后状态可控；③Socket简单可靠，只传fork请求参数。`,
    tags: ["Zygote", "fork", "COW", "Socket", "Binder"],
  },
  {
    id: "dak-init-3",
    chapter: "dak-init-boot",
    level: 2,
    question: `system_server的启动过程是怎样的？它如何启动核心服务？`,
    answer: `system_server由Zygote fork创建，三段式启动核心服务：①BootstrapServices（引导服务）——启动Installer、AMS、PMS、PowerManagerService等最基础服务，是后续服务启动前提；②CoreServices（核心服务）——启动BatteryService、UsageStatsService、WebViewUpdateService等；③OtherServices（其他服务）——启动WMS、InputManagerService、DisplayManagerService、NotificationManagerService等。启动完成后将所有服务注册到ServiceManager（ServiceManager.addService），使App可通过Binder查询调用。最后调用AMS.systemReady()启动Launcher桌面。`,
    tags: ["system_server", "三段式启动", "核心服务", "ServiceManager"],
  },
  {
    id: "dak-init-4",
    chapter: "dak-init-boot",
    level: 3,
    question: `init.rc配置文件的作用和语法是什么？init进程如何管理服务生命周期？`,
    answer: `init.rc是Android Init Language编写的配置文件，定义init需启动的服务、动作和触发条件。语法：①Actions——on触发器+命令（如on boot后跟mkdir/chmod）；②Services——service名称+可执行路径+选项（如service zygote /system/bin/app_process64，可指定class/user/group/critical/onrestart）；③Triggers——如on property:vold.decrypt=trigger_restart_framework；④服务分类——class core（核心服务）、class main（主服务）、class late_start（延迟启动）。init进程管理服务生命周期：解析rc文件后按依赖顺序启动所有服务并监听其状态，服务崩溃时按策略重启（critical服务崩溃重启系统），同时init运行property service管理系统属性，子进程退出时通过SIGCHLD信号接收并处理重启。`,
    tags: ["init.rc", "Android Init Language", "服务管理", "触发器"],
  },
];
