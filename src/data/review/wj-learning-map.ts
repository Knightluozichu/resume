import type { ReviewQuestion } from "./types";

export const wjLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "wj-learning-map-1",
    chapter: "wj-learning-map",
    level: 2,
    question: `全书五阶段递进结构是什么？为什么是这个顺序？`,
    answer:
      `API基础与消息循环（Win32 API + 消息循环）→ 窗口管理与GDI绘图（窗口管理 + GDI渲染）→ 系统机制（注册表与服务 + 进程与线程）→ 高级I/O（文件I/O + 网络编程）→ 总复习。顺序由依赖关系决定：先掌握 API 调用范式和消息驱动模型才有「能调用、能响应」的基础；窗口是 Windows 程序的载体，有了窗口才能在其上绘制图形文本；窗口程序需要读取配置（注册表）和后台处理（服务/线程），于是进入系统机制；程序要持久化数据和跨机器通信，于是需要文件 I/O 和网络编程；最后总复习用一个窗口程序的一生串联全链路。先「能调用」，再「能创建」，然后「能配置并发」，接着「能存储通信」，最后「能贯通」。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "wj-learning-map-2",
    chapter: "wj-learning-map",
    level: 2,
    question: `Win32 API 的三大子系统分别是什么？各负责什么功能？`,
    answer:
      `Win32 API 的三大子系统 DLL 分别是：①\`user32.dll\`——窗口管理子系统，负责窗口创建、消息处理、控件、菜单、对话框等用户界面功能；②\`kernel32.dll\`——系统服务子系统，负责进程线程管理、文件 I/O、内存管理、同步等基础系统功能；③\`gdi32.dll\`——图形设备接口子系统，负责图形绘制、文本输出、位图操作等。三大子系统的分工对应了 Windows 程序开发的三大维度：交互（user32）、计算（kernel32）、显示（gdi32），共同构成了 Win32 编程的完整 API 集。`,
    tags: ["架构", "API"],
  },
  {
    id: "wj-learning-map-3",
    chapter: "wj-learning-map",
    level: 3,
    question: `用「一个窗口程序的一生」描述全书主线，列出八大机制的入场时机。`,
    answer:
      `一个窗口程序从 \`WinMain\` 启动到退出：①API基础（第2章）——\`WinMain\` 入口，调用 \`GetModuleHandle\` 获取实例句柄；②注册窗口类（第4章）——填充 \`WNDCLASSEX\`，\`RegisterClassEx\` 注册；③创建窗口（第4章）——\`CreateWindowEx\` 创建窗口实例，\`ShowWindow\` 显示；④消息循环（第3章）——\`GetMessage\`/\`TranslateMessage\`/\`DispatchMessage\` 循环分发；⑤GDI绘制（第5章）——\`WM_PAINT\` 中 \`BeginPaint\` 获取 DC，\`TextOut\`/\`Rectangle\` 绘制；⑥系统配置（第6章）——\`RegOpenKey\`/\`RegQueryValue\` 读取注册表配置；⑦并发处理（第7章）——\`CreateThread\` 后台线程，\`WaitForSingleObject\` 同步；⑧文件与网络（第8-9章）——\`CreateFile\` 读写文件，\`socket\`/\`connect\`/\`send\`/\`recv\` 网络通信；⑨退出——\`WM_DESTROY\` → \`PostQuitMessage\` → 资源回收。一次运行，九个机制全部参与。`,
    tags: ["架构", "运行时旅程"],
  },
  {
    id: "wj-learning-map-4",
    chapter: "wj-learning-map",
    level: 4,
    question: `会写Windows程序和懂Windows系统机制有什么本质区别？举例说明。`,
    answer:
      `会写 Windows 程序是「能调 API」——照着 MSDN 抄 \`CreateWindow\`、\`MessageBox\` 就能做出窗口程序。懂 Windows 系统机制是「能解释系统为什么这样设计」：为什么句柄是 \`void*\` 不透明类型而非指针（封装内核对象、防止用户态直接操作）、为什么消息循环是 \`GetMessage\` 阻塞而非忙等待（节省 CPU）、为什么 GDI 要设备上下文 DC 而非直接画（设备无关性）、为什么进程间不能用全局变量共享数据而要用内存映射文件或邮槽（地址空间隔离）、为什么 IOCP 用少量线程处理海量连接（减少线程切换开销）、为什么临界区比互斥量快（用户态自旋不进内核）。把 Windows 当黑盒的人遇到窗口卡死只能重启；懂机制的人能读懂消息队列、用 Spy++ 追踪消息、理解同步对象状态。区分标志：能否解释「Windows 为什么这样设计」而非只是「能调用它」。`,
    tags: ["架构", "工程思维"],
  },
];
