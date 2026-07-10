import type { ReviewQuestion } from "./types";

export const lkeKernelDebuggingQuestions: ReviewQuestion[] = [
  {
    id: "lke-kd-1",
    chapter: "lke-kernel-debugging",
    level: 2,
    question: `ftrace和eBPF有什么区别？各自适合什么场景？`,
    answer:
      `ftrace是内核内置的追踪框架，基于编译器-pg插桩在函数入口插入调用钩子。优势：零配置（内核自带）、函数追踪和调用图功能强大、开销可预测。劣势：功能相对固定（预定义tracer）、不能动态采集函数参数和返回值、不能写复杂逻辑。eBPF是可编程的内核沙箱，用户编写的程序经验证器检查安全后JIT编译执行。优势：可编程（用C子集写任意采集逻辑）、可采集函数参数/返回值/局部变量、attach点丰富（kprobe/tracepoint/perf_event/XDP）、生产环境低开销可长期运行。劣势：需要BTF/符号信息支持、编程门槛较高、验证器限制。场景选择：快速看函数调用关系用ftrace；采集函数参数/返回值/性能统计/生产环境长期监控用eBPF。`,
    tags: ["调试", "ftrace"],
  },
  {
    id: "lke-kd-2",
    chapter: "lke-kernel-debugging",
    level: 2,
    question: `内核发生panic后如何定位原因？描述完整流程。`,
    answer:
      `①前提：系统已配置kdump（预留crashkernel内存、启用kdump服务）；②内核panic时，kdump的panic handler被调用，通过kexec快速启动备用内核（不经历BIOS重启，保留物理内存内容）；③备用内核启动后通过/proc/vmcore读取主内核物理内存，转储为vmcore文件保存到磁盘；④系统正常重启；⑤用crash工具分析vmcore：crash vmlinux vmcore；⑥bt查看崩溃时CPU的调用栈——定位到崩溃的函数和代码行；⑦ps查看所有进程状态，找异常进程；⑧struct查看关键数据结构内容；⑨dis反汇编崩溃函数确认具体指令；⑩结合源码分析根因。辅助：KASAN（编译时启用，运行时自动检测内存越界/UAF）、lockdep（检测锁死锁）、dmesg查看崩溃前日志。`,
    tags: ["调试", "崩溃分析"],
  },
  {
    id: "lke-kd-3",
    chapter: "lke-kernel-debugging",
    level: 3,
    question: `perf的采样原理是什么？perf record和perf stat分别做什么？`,
    answer:
      `perf基于PMU（Performance Monitoring Unit）硬件计数器。CPU内部有硬件计数器可统计：cycles（CPU周期）、cache-misses（缓存未命中）、branch-misses（分支预测失败）等事件。perf record -F 99 -g -- sleep 10：以99Hz频率采样，每次采样记录当前CPU正在执行的函数和完整调用栈（-g），采样10秒。采样频率99Hz而非更高是为了控制开销（1-3%）。高负载函数被采样到的概率高，perf report按采样次数排序即为热点函数排序。perf stat -e cache-misses,branch-misses ./myapp：不采样，而是精确统计程序运行期间的硬件事件总数，用于评估程序的微架构效率。perf top类似top命令实时显示热点函数。perf适合：CPU热点定位、cache行为分析、分支预测效率评估。`,
    tags: ["调试", "perf"],
  },
  {
    id: "lke-kd-4",
    chapter: "lke-kernel-debugging",
    level: 4,
    question: `eBPF的验证器如何保证安全？为什么eBPF可以在生产环境长期运行？`,
    answer:
      `eBPF验证器在程序加载时做两轮检查：①第一轮——控制流分析，构建控制流图（CFG），确保程序是无环的DAG（不允许循环，后来放宽为有限循环），检查所有路径都到达出口；②第二轮——状态空间分析，模拟执行每条指令，跟踪寄存器类型和值范围，检查：不越界访问（指针+偏移不超过边界）、不读未初始化寄存器、栈深度不超过512字节、不执行特权指令。验证通过后JIT编译为原生机器码执行。生产环境可长期运行的原因：①验证器保证不崩溃——不循环死锁、不越界访问、不非法操作；②JIT编译保证低开销——原生代码执行，纳秒级探针开销；③可动态部署和移除——不需要重启服务或重新编译内核；④沙箱隔离——eBPF程序运行在受限环境中，不能直接调用内核函数，只能通过预定义的helper函数。Netflix/Facebook等公司在生产环境大规模运行eBPF追踪网络/I/O/安全/调度。`,
    tags: ["调试", "eBPF"],
  },
];
