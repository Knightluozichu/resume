import type { ReviewQuestion } from "./types";

/** 车载信息娱乐系统平台复习题 */
export const vsiIviPlatformQuestions: ReviewQuestion[] = [
  {
    id: "vsi-ivi-platform-1",
    chapter: "vsi-ivi-platform",
    level: 1,
    question:
      `Android Automotive 和 QNX 各有什么特点？为什么 IVI/座舱娱乐常用 Android，而仪表/安全关键显示常用 QNX？`,
    answer:
      `QNX（黑莓 QNX Neutrino RTOS）：\n- 微内核实时操作系统，内核极小（几十 KB），驱动/协议栈/应用都跑在用户空间，进程间隔离。某组件崩溃不影响内核和其他进程，天然适合功能安全。\n- 确定性实时性：微秒级中断响应和调度延迟，适合仪表刷新（60Hz 稳定）、安全显示等需要确定性时序的场景。\n- 通过 ISO 26262 ASIL D 认证，可的安全认证成本高但成熟，是仪表/车控/智驾域控的常见选择。\n- 生态相对封闭，商用授权收费，HMI 框架（Qt/Kanzi）和应用生态不如 Android 丰富。\n\nAndroid Automotive（AAOS，车载 Android）：\n- 基于 Linux 宏内核，非实时（调度延迟不确定），不适合直接做 ASIL 仪表。\n- 应用生态极其丰富：复用手机 Android 的应用框架、开发工具、第三方应用（地图、音乐、视频、语音），迭代快、开发者多。\n- Google 提供 AAOS 专门的车载分支（Android Automotive OS）和 CarService 车控框架，把车辆能力抽象成标准 API。\n- 开源（AOSP），可定制，硬件支持广（高通/MTK/瑞萨都有 Android BSP）。\n\n为什么 IVI 用 Android、仪表用 QNX：\n\n1. IVI 是 QM（无安全等级），核心诉求是「应用丰富、体验好、迭代快」——Android 的生态和框架优势无可替代。IVI 偶发卡顿可接受，不需要硬实时。\n\n2. 仪表是 ASIL B/D（法规强制安全显示），核心诉求是「确定性、可靠、可认证」——QNX 的微内核隔离 + 实时性 + ASIL D 认证是刚需。Android 无法满足功能安全认证和确定性时序。\n\n3. 两者常共存于一颗座舱 SoC：通过 Hypervisor 隔离，QNX 跑仪表（ASIL），Android 跑 IVI（QM），既拿到 Android 生态又拿到 QNX 安全。这是当下主流座舱架构（如 8155/8295 平台）。\n\n4. 趋势：Google 在推 Android 的「安全隔离分区」试图让 Android 也承担部分仪表功能（用单独 VM），但 QNX 在安全认证上的成熟度短期内仍难替代。\n\n一句话：QNX 赢在「实时与安全认证」，Android 赢在「生态与体验」；IVI 要体验选 Android，仪表要安全选 QNX，Hypervisor 让它们同芯共存。`,
    tags: ["Android Automotive", "AAOS", "QNX", "实时操作系统", "微内核", "功能安全", "生态"],
  },
  {
    id: "vsi-ivi-platform-2",
    chapter: "vsi-ivi-platform",
    level: 2,
    question:
      `Android Automotive OS（AAOS）和手机 Android 有什么本质区别？CarService、CarPropertyManager、VHAL 在车控接入中各起什么作用？`,
    answer:
      `AAOS 与手机 Android 的本质区别：\n\n1. 系统分支与角色：手机 Android 是通用移动 OS，AAOS 是 Google 针对车载场景的专用分支（AOSP 上的 automotive 配置），设计为车机主机系统而非外接投影（区别于 Android Auto 手机投屏）。\n\n2. 车控抽象层：手机没有车辆硬件，AAOS 新增了一整套车辆硬件抽象——VHAL（Vehicle HAL）+ CarService + Car API，把整车 CAN/Ethernet 信号抽象成标准 Android 属性，让应用通过统一 API 控车，而非直接碰总线。\n\n3. 系统服务差异：AAOS 调整了电源管理（车机有「车库模式」Garage Mode 做 OTA 后台任务、熄屏不杀关键服务）、音频（多区音频 AudioControl、TTS/通话/媒体优先级）、显示（多屏 Multi-Display）、输入（旋钮/方向盘按键）。\n\n4. 生命周期：车机伴随整车上下电，启动要快（冷启动几秒到桌面）、熄火要安全关机，与手机「人手开关」不同。AAOS 有专门的 CarPowerManager 管理整车上电/熄火/休眠状态机。\n\n5. 安全与合规：AAOS 对驾驶员分心有限制（行驶中禁用视频/键盘）、对系统应用签名更严、对 OTA 有专门机制。\n\nCarService / CarPropertyManager / VHAL 的作用与协作：\n\nVHAL（Vehicle Hardware Abstraction Layer）：\n- 最底层，运行在 Android 系统进程中，连接到底层车载总线（CAN/CAN-FD/Ethernet）驱动或外部车控 ECU。\n- 把车辆信号抽象成「车辆属性（Vehicle Property）」，每个属性有 ID、类型、读写权限、变更回调。例如 PERF_VEHICLE_SPEED（车速）、HVAC_TEMPERATURE_SET（空调温度）、GEAR_SELECTION（档位）。\n- VHAL 实现因车而异（OEM 各自实现），但对上层暴露统一接口，做到「应用与车型硬件解耦」。\n\nCarService：\n- 系统级常驻服务，运行在 system_server，是车控能力的总入口。它管理一系列子服务：CarPropertyService（属性读写）、CarPowerManagerService（电源）、CarAudioService（音频）、CarDiagnosticService（诊断）、CarLocationService 等。\n- CarService 启动后连接 VHAL，把 VHAL 的属性向上暴露为 Java API。\n- 负责权限校验（应用要有对应的车控权限才能读写属性）、应用签名验证、驾驶员分心管控。\n\nCarPropertyManager（应用侧 API）：\n- 应用通过 Car.createCar() 拿到 Car 实例，再 getCarManager(Car.PROPERTY_SERVICE) 得到 CarPropertyManager。\n- 应用用 CarPropertyManager.getProperty(PERF_VEHICLE_SPEED) 读车速，或 setProperty(HVAC_TEMPERATURE_SET, area, value) 设空调温度。\n- 支持注册回调监听属性变化（如车速更新、档位变化）。\n- CarPropertyManager 把请求经 IPC 转给 CarPropertyService → VHAL → 车载总线 → 实际 ECU 执行。\n\n完整调用链：\n应用 → CarPropertyManager（Java API）→ CarPropertyService（system_server）→ VHAL（HAL 层）→ 车载总线驱动/外部 ECU → CAN/Ethernet → 执行器。\n\n这种分层的好处：应用开发者只用标准 Car API，不关心具体车型硬件；OEM 只实现 VHAL 适配自己的总线，上层应用可复用。这是「硬件抽象 + 服务化」在车载 Android 的落地，与 AUTOSAR 的思路一致。`,
    tags: ["AAOS", "CarService", "CarPropertyManager", "VHAL", "车辆属性", "硬件抽象", "服务化"],
  },
  {
    id: "vsi-ivi-platform-3",
    chapter: "vsi-ivi-platform",
    level: 3,
    question:
      `在座舱 SoC 上要让 QNX 仪表和 Android IVI 共存，Hypervisor 方案和容器方案各有什么优劣？两者之间（QNX ↔ Android）需要通信时，常用哪些机制（如 vSOCK、共享内存、virtio）？`,
    answer:
      `Hypervisor 方案 vs 容器方案：\n\nHypervisor（虚拟机方案，Type-1）：\n- 原理：裸金属 Hypervisor 直接跑在硬件上，每个 Guest OS 跑在独立虚拟机，有独立的 Guest 内核。CPU/内存/设备分区隔离。\n- 优势：\n  1. 强隔离：每个 VM 有独立内核和地址空间，Guest 之间硬件级隔离（Stage-2 MMU、CPU 绑核）。一个 VM 崩溃/被攻破不影响其他 VM。这是 ASIL 仪表与 QM IVI 共存的安全前提，满足功能安全 FFI。\n  2. 支持异构 OS：QNX（仪表）、Android（IVI）、Linux（域控）可同时跑在不同 VM，各用最合适的内核。\n  3. 可认证：QNX Hypervisor 等产品支持 ASIL 认证，仪表 VM 可达 ASIL D。\n- 劣势：\n  1. 资源开销：每个 VM 有独立内核，内存和启动开销比容器大。\n  2. 通信复杂：跨 VM 通信要靠 Hypervisor 提供的虚拟设备/共享内存，不如容器间 IPC 直接。\n  3. 实现成本：Hypervisor 授权和适配成本高。\n\n容器方案（OS 级虚拟化，如 Linux 容器/LXC）：\n- 原理：所有容器共享同一宿主内核，通过 namespace/cgroup 隔离进程视图和资源。\n- 优势：\n  1. 轻量：无独立内核，内存和启动开销小。\n  2. 通信快：容器间可用共享内核的 IPC（socket/共享内存/管道），延迟低。\n- 劣势（车载致命）：\n  1. 隔离弱：共享内核，内核漏洞或配置错误可导致容器逃逸，无法满足 ASIL 隔离要求。\n  2. 只能同构 OS：容器必须基于宿主内核（如都是 Linux），无法让 QNX 和 Android 真正共存（QNX 不是 Linux）。\n  3. 实时性差：Linux 宿主内核非实时，仪表的确定性无法保证。\n\n结论：座舱要 ASIL 仪表 + Android IVI 共存，必须用 Hypervisor（强隔离 + 异构 OS + 可认证）。容器只适合 QM 域内多应用隔离（如 IVI 内的应用沙箱），不能跨 ASIL 边界。\n\nQNX ↔ Android 跨 VM 通信机制：\n\n1. vSOCK（Virtual Socket）：\n- Hypervisor 提供的虚拟 socket，VM 间像用普通 socket 通信（AF_VSOCK），有连接、流控。\n- 适合控制流、命令/响应类通信（如 IVI 向仪表请求显示某个小窗、车控指令转发）。延迟低、API 友好。\n\n2. 共享内存（Shared Memory）：\n- Hypervisor 划一段物理内存区，映射到两个 VM 的地址空间，双方可直接读写。\n- 适合大数据、低延迟场景（如 IVI 把导航地图渲染帧、视频帧传给仪表叠加显示），避免拷贝（zero-copy）。通常配合环形缓冲 + 信号量/中断同步。\n\n3. virtio 设备（virtio-net / virtio-gpu / virtio-console）：\n- Hypervisor 把后端设备模拟成 virtio 标准设备，Guest 用标准 virtio 驱动访问。virtio-net 可做 VM 间虚拟网络，virtio-gpu 可做跨 VM 显示共享。\n- 通用性好，但比裸共享内存多一层抽象，延迟略高。\n\n4. 虚拟中断/事件通道：\n- 用于通知（如「数据已就绪」），配合共享内存使用。Hypervisor 提供虚拟中断注入机制。\n\n选择原则：控制信令用 vSOCK，大数据流用共享内存 + 中断同步，标准化外设用 virtio。设计时要确保跨 VM 通道有认证和鉴权，防止 IVI 被攻破后通过通道污染仪表数据（这是信息安全要考虑的点）。`,
    tags: ["Hypervisor", "容器", "vSOCK", "共享内存", "virtio", "跨VM通信", "隔离对比"],
  },
  {
    id: "vsi-ivi-platform-4",
    chapter: "vsi-ivi-platform",
    level: 4,
    question:
      `请描述一个基于 Android Automotive 的 IVI 系统从整车上电到桌面可用的完整启动流程，并指出其中影响「冷启动时间」的关键瓶颈。如果要优化首屏可见时间，你会从哪些层面入手？`,
    answer:
      `IVI 系统上电到桌面可用的完整启动流程：\n\n1. 硬件上电与电源管理：\n- 整车唤醒（钥匙/开门/网络唤醒）→ 电源管理芯片上电序列 → SoC 上电，PMIC 按 rails 顺序供电复位。\n- SoC BootROM 执行（固化在芯片内），加载并校验 First Stage Bootloader（FSBL/SPL）。\n\n2. Bootloader 阶段（U-Boot / 专有 BL）：\n- FSBL 初始化 DDR、时钟、基础外设。\n- Second Stage Bootloader 加载并校验 Android Boot 镜像（boot.img），初始化 Fastboot/恢复模式支持，传递启动参数（cmdline）。\n- 安全启动：每级校验下一级签名，建立信任链。\n\n3. Linux 内核启动：\n- 解压内核，初始化 CPU/内存/中断/设备树。\n- 挂载初始 ramdisk（initramfs）。\n- 加载关键驱动：显示（DSI/DP，尽早点亮屏）、触摸、存储、总线（CAN/Ethernet）、音频、VHAL 所需驱动。\n- 内核启动 init 进程（PID 1）。\n\n4. Android init 与早期启动：\n- init 解析 init.rc，挂载分区（system/vendor/product），启动关键原生服务（ueventd、logd、servicemanager、surfaceflinger、vold）。\n- 启动 VHAL 进程：VHAL 连接车控总线，开始上报车辆属性。CarService 此时还没起，VHAL 先就绪。\n- 启动 Zygote（Java 进程孵化器）。\n\n5. System Server 与 CarService：\n- Zygote fork 出 system_server，启动 Android 核心服务（ActivityManager、PackageManager、WindowManager、DisplayManager 等）。\n- system_server 启动 CarService（车载核心服务），CarService 连接 VHAL，初始化各子服务（CarPropertyService、CarPowerService、CarAudioService 等）。\n- 此时车控 API 可用。\n\n6. Launcher 与首屏：\n- ActivityManager 启动 Launcher（车机桌面），WindowManager 合成桌面窗口。\n- SurfaceFlinger 把桌面合成输出到显示控制器，屏幕显示桌面。\n- 桌面可交互，应用可启动——「首屏可见」达成。\n\n影响冷启动时间的关键瓶颈：\n\n1. Bootloader 与内核加载：从 Flash/eMMC 读取并解压镜像，依赖存储 IO 带宽。大内核镜像慢。\n2. 内核驱动初始化：尤其显示链路（DSI 初始化 + 面板点亮）、总线驱动。显示晚点亮 = 首屏晚。\n3. 文件系统挂载：system/vendor 分区大，ext4/f2fs 挂载与 fsck 耗时。加密分区（FBE/FDE）解密更慢。\n4. Android init 启动服务序列：服务多、有依赖关系，串行启动慢。\n5. Zygote/system_server 启动：system_server 要初始化几十个服务，是 Android 启动最重的一段。\n6. CarService 与 VHAL 就绪：车控相关功能依赖 VHAL 与 CarService 初始化完成。\n7. Launcher 渲染：首帧渲染需要资源加载、布局测量、合成。\n\n优化首屏可见时间的层面：\n\n1. 硬件层：\n- 用更快的存储（eMMC → UFS → NVMe），IO 带宽成倍提升。\n- SoC 支持快速启动（专用 boot 加速硬件、更少 rails）。\n- 显示链路尽早初始化（Bootloader 阶段就点亮 splash 屏，给用户即时反馈）。\n\n2. Bootloader/内核层：\n- 内核裁剪：去掉无关驱动，减小镜像、加快加载。\n- 并行初始化：异步 probe 非关键驱动，显示驱动提前。\n- 内核压缩算法权衡（lz4 解压快于 gzip）。\n- initramfs 精简。\n\n3. 文件系统层：\n- 用 f2fs（针对 Flash 优化，挂载快）。\n- 只读分区避免 fsck，或用 dm-verity 增量校验。\n- 文件加密用 FBE（文件级，只解密用到的文件）而非 FDE（全盘，启动时全解密）。\n\n4. Android 启动框架层：\n- 服务并行化：用 init 的 \`exec_start\`/\`on\` 依赖图，把无依赖服务并行起。\n- 延迟非关键服务：把非首屏必需服务（如某些后台同步、统计）延后到桌面可见后起。\n- system_server 优化：拆分关键路径，先起显示/窗口/活动管理，再起次要服务。\n- Zygote 预加载（preload classes/resources）权衡：预加载加快应用启动但拖慢 Zygote 本身，可裁剪预加载列表。\n\n5. 应用/桌面层：\n- Launcher 轻量化首屏：先渲染骨架（极简布局 + 缓存），异步加载图标/数据，避免首帧等待网络/数据库。\n- Splash 屏：桌面加载前先显示静态 splash，缩短「可见」感知时间。\n- 缓存上次状态：直接恢复上次的桌面/导航，省去重新初始化。\n\n6. 系统工程层：\n- 测量与剖析：用 boottrace/systrace 抓每阶段耗时，定位最长路径。\n- 持续监控：建立冷启动时间基线，每次构建回归检测。\n- 「车库模式」做后台重活：把 OTA、索引、日志上传等放到熄火后的 Garage Mode，不占启动时间。\n\n一句话：IVI 启动是「BootROM → Bootloader → 内核 → init → system_server+CarService → Launcher」的链式过程；首屏优化是「显示链路尽早 + 存储变快 + 服务并行/延迟 + 桌面轻量首帧」的系统工程，需逐段剖析、并行化与延迟非关键路径。`,
    tags: ["综合", "启动流程", "Android", "冷启动", "首屏优化", "VHAL", "CarService", "性能优化", "并行化"],
  },
];
