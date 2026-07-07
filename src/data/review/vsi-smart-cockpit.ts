import type { ReviewQuestion } from "./types";

/** 智能座舱架构复习题 */
export const vsiSmartCockpitQuestions: ReviewQuestion[] = [
  {
    id: "vsi-smart-cockpit-1",
    chapter: "vsi-smart-cockpit",
    level: 1,
    question:
      "智能座舱由哪些核心硬件和软件组成？多屏互动（仪表、中控、副驾、HUD、后娱）在架构上是如何实现的？",
    answer:
      "智能座舱的核心硬件：\n\n1. SoC（系统级芯片）：座舱的大脑，异构多核。典型如高通 SA8155P（8155）、SA8295P（8295），集成 Kryo CPU（多核 ARM Cortex）、Adreno GPU、Hexagon DSP/NPU（用于语音、视觉 AI）、ISP（多路摄像头输入）、视频编解码硬核。也可见三星 Exynos Auto、瑞萨 R-Car、AMD V2000 等。\n\n2. 多屏显示系统：仪表屏（必须 ASIL）、中控屏（IVI）、副驾娱乐屏、HUD/AR-HUD、后排娱乐屏。通过 SoC 的多路显示控制器（DSI/DP/HDMI）并行驱动，每路独立 framebuffer。\n\n3. 音频系统：多路麦克风阵列（语音交互/降噪）、功放 + 多扬声器（分区音频）、DSP 音效。\n\n4. 摄像头：车内 DMS（驾驶员监测）/OMS（乘员监测）、环视摄像头接入座舱。\n\n5. 外设与总线接入：车载以太网、CAN/CAN-FD、LIN、USB/蓝牙/WiFi、GPS。\n\n核心软件：\n\n1. Hypervisor（如 QNX Hypervisor、OpenSynergy COQOS、AAOS 的 pKVM）：在一颗 SoC 上运行多个虚拟机，实现安全隔离。\n2. 多操作系统共存：QNX（仪表，ASIL D）、Android Automotive（IVI/娱乐，QM）、Linux（部分域控）。\n3. 中间件/框架：AUTOSAR Adaptive、SOME/IP、车载 Android 的 CarService/CarPropertyManager。\n4. HMI 框架：Qt（QNX 仪表常用）、Android UI/Compose、Kanzi、Web 技术。\n5. 语音交互栈：唤醒、ASR、NLU、TTS。\n6. 应用层：导航、媒体、车控、生态应用。\n\n多屏互动的实现：\n\n- 共享渲染源：多屏可由同一 SoC 渲染，通过多路显示输出分别送出，软件层用 SurfaceFlinger/Wayland compositor 把不同应用窗口合成到不同屏。跨屏拖拽/共享内容通过共享内存或 IPC 在 compositor 层完成。\n- 多屏异显异触：每屏独立 framebuffer + 独立触摸输入事件路由，Android 用 Multi-Display / Secondary Display API。\n- 跨虚拟机共享：仪表（QNX VM）和 IVI（Android VM）若要共享画面（如把导航地图小窗投到仪表），通过 Hypervisor 提供的共享内存（shared memory region）或虚拟显示设备传递帧数据，避免拷贝。\n- 分离渲染与显示：也可用屏端 SoC（如副驾屏独立 MCU）通过以太网接收压缩视频流（如 V4L2 + 视频编码），实现「一主多从」分布式显示。\n\n一句话：座舱架构的本质是「一颗异构 SoC + Hypervisor 隔离多 OS + 多路显示并行渲染」，多屏互动在 compositor/共享内存层实现，安全隔离在 Hypervisor 层实现。",
    tags: ["智能座舱", "SoC", "异构计算", "多屏互动", "Hypervisor", "HMI"],
  },
  {
    id: "vsi-smart-cockpit-2",
    chapter: "vsi-smart-cockpit",
    level: 2,
    question:
      "座舱 SoC 为什么需要异构计算（CPU + GPU + DSP/NPU + ISP）？Hypervisor 如何实现仪表（ASIL）和 IVI（QM）在同一颗 SoC 上共存且互不干扰？",
    answer:
      "座舱 SoC 需要异构计算的原因——不同任务对算力类型和实时性的要求差异巨大：\n\n1. CPU（通用控制）：跑 OS、中间件、应用逻辑、状态机。需要多核 + 高单核性能 + 实时性（仪表刷新、车控响应）。但 CPU 跑 AI 推理和图形渲染效率低。\n\n2. GPU（并行渲染/AI）：HMI 渲染（3D 车模、AR-HUD 实时渲染）、界面动画、游戏。GPU 也可跑 AI 推理（OpenCL/CUDA），但座舱 AI 通常交给 NPU。\n\n3. DSP/NPU（AI 加速）：语音唤醒、ASR/NLU 推理、DMS 视觉（疲劳/分神检测）、手势识别。这些是算力密集型神经网络，用 CPU 跑功耗高、延迟大，NPU 专用加速（TOPS 级）能效比高 10~100 倍。语音唤醒必须常驻低功耗，DSP 是必需。\n\n4. ISP（图像信号处理）：多路摄像头（环视、DMS）输入的 RAW 图像需要去马赛克、白平衡、HDR 合成、畸变校正——这些是固定流水线运算，ISP 硬核实时处理，CPU/GPU 做既慢又费电。\n\n5. 视频编解码硬核：多屏视频播放、环视拼接、行车记录需要 H.264/H.265 硬件编解码。\n\n异构的本质：把不同性质的工作交给最合适的硬件，兼顾性能、功耗和实时性。一颗 SoC 集成所有这些，省成本、省空间、降功耗。\n\nHypervisor 实现仪表与 IVI 共存的原理：\n\nHypervisor 是一种裸金属虚拟机监控器（Type-1），直接运行在 SoC 硬件之上，把硬件资源（CPU 核、内存、设备）分区分配给多个 Guest OS（虚拟机）。\n\n1. 硬件分区：\n- CPU 核绑定：把某些核固定分配给仪表 VM（如 2 个核），另一些给 IVI VM（如 4 个核），物理隔离，避免抢占。配合 CPU 锁核/隔离。\n- 内存分区：物理内存划分区域，每个 VM 只能访问自己的区域，硬件级隔离（MMU/Stage-2 页表）。仪表 VM 崩溃不影响 IVI，反之亦然。\n- 设备直通（Passthrough）：关键设备（显示控制器、CAN 控制器）直通给对应 VM 独占，避免共享冲突。\n\n2. 调度与实时性：\n- 仪表 VM 用固定优先级或时间片调度，保证仪表刷新的确定性（如 60Hz 稳定）。\n- IVI VM 用普通 Linux/Android 调度，允许偶发卡顿。\n- Hypervisor 通过 CPU 绑核 + 中断隔离，保证 IVI 高负载时不抢占仪表核。\n\n3. 通信：\n- VM 间通过 Hypervisor 提供的虚拟通道通信：共享内存、virtio 设备、vSOCK（虚拟 socket）。\n- 例如 IVI 把导航地图帧写入共享内存，仪表 VM 读取叠加到仪表显示——既共享又隔离。\n\n4. 安全隔离的意义：\n- 仪表是 ASIL B/D（法规要求必须显示车速、报警等关键信息），失效会导致安全风险。\n- IVI 是 QM，应用多、易崩溃、可联网（攻击面大）。\n- 若不分隔离，IVI 崩溃或被攻破可能拖垮仪表。Hypervisor 让 IVI 的故障被「关」在自己的分区里，仪表独立运行，满足功能安全对「免于干扰（Freedom from Interference）」的要求。\n\n一句话：异构 SoC 用「专用硬件做专用事」兼顾性能与功耗；Hypervisor 用「硬件分区 + 资源绑定」让 ASIL 仪表和 QM IVI 同芯共存又互不干扰。",
    tags: ["SoC", "异构计算", "Hypervisor", "虚拟化", "ASIL", "隔离", "Freedom from Interference"],
  },
  {
    id: "vsi-smart-cockpit-3",
    chapter: "vsi-smart-cockpit",
    level: 3,
    question:
      "请描述座舱语音交互的完整技术链路（从用户说话到车控执行），并说明唤醒词、ASR、NLU、TTS 各环节的作用。离线语音和云端语音各有什么优劣？为什么「端云结合」成为主流？",
    answer:
      "语音交互完整链路：\n\n1. 语音唤醒（Wake-up / Hotword Detection）：\n- 麦克风阵列持续采集环境音，DSP/NPU 上常驻一个低功耗唤醒模型（小型 DNN/HMM），检测唤醒词（如「你好，XX」）。\n- 检测到唤醒词后，系统从低功耗状态进入完整交互模式，开始录音。\n- 作用：避免一直全功率运行 ASR，省电；明确交互起点。多麦克风阵列还能做声源定位（判断是主驾还是副驾说话）。\n\n2. 语音活动检测 + 降噪（VAD + AEC/ANS）：\n- VAD 判断「有人在说话」的起止，自动截断录音（端点检测），避免录入长沉默。\n- AEC（回声消除）消除车内音响播放的声音回灌麦克风；ANS 抑制发动机/风噪/胎噪。\n- 波束成形（Beamforming）增强主驾方向语音，抑制其他方向。\n\n3. 语音识别（ASR，Automatic Speech Recognition）：\n- 把音频波形转成文本。基于声学模型 + 语言模型，现代用端到端 Transformer/Conformer/RNN-T。\n- 作用：把「开空调」的语音转成文本「打开空调」。识别准确率受口音、噪声、专有词（地名/歌名）影响。\n\n4. 自然语言理解（NLU，Natural Language Understanding）：\n- 把文本转成结构化意图（Intent + Slot）。如「把空调调到 24 度」→ intent: set_temperature, slot: target=AC, value=24。\n- 作用：理解用户「想做什么」，而不是字面。支持多轮对话、上下文指代（「那个」指代上一轮实体）、纠错。\n\n5. 对话管理（DM，Dialog Manager）：\n- 维护对话状态，决定下一步动作：直接执行、追问澄清（「您说温度是 24 还是 26？」）、还是结束。\n- 协调 NLU 输出与车控接口的映射。\n\n6. 任务执行（Skill / Action）：\n- 把意图转成对车辆能力的调用：通过 CarService/CarPropertyManager 或 SOME/IP 服务下发音控指令（如 set HVAC temperature）。\n- 也可调用第三方生态（导航到某地、播放某歌）。\n\n7. 语音合成（TTS，Text-to-Speech）：\n- 把回复文本合成语音播报给用户（如「好的，已将空调设为 24 度」）。现代用神经网络 TTS（Tacotron/FastSpeech/VITS）生成自然语音，支持音色定制。\n- 作用：闭环反馈，确认执行结果。\n\n离线语音 vs 云端语音：\n\n离线（端侧）：\n- 优势：无网络延迟、可用（隧道/信号差）、隐私性好、不耗流量；唤醒和简单车控必须离线。\n- 劣势：算力和模型规模受限，识别率/理解能力低于云端大模型；泛化（多轮复杂对话、开放域问答）弱； OTA 更新模型慢。\n\n云端：\n- 优势：大模型（LLM 级）、高识别率、强泛化、知识库丰富、易迭代。\n- 劣势：依赖网络、有延迟（几百 ms 到秒级）、隧道断网不可用、隐私敏感数据上云有合规风险、有流量成本。\n\n端云结合成为主流的原因：\n\n1. 分层分工：唤醒 + 简单车控 + 常用导航命令跑在端侧（低延迟、高可用、必需离线）；复杂多轮对话、知识问答、内容搜索上云（高能力）。\n\n2. 体验与可用性平衡：联网时用云端获得更强能力；断网时降级到端侧保证基本车控可用——这是「优雅降级」，避免断网就完全失灵。\n\n3. 隐私与合规：敏感指令（车控、个人信息）端侧处理不出车；只有需要云端知识的部分上云，且可脱敏。\n\n4. 持续进化：云端模型持续训练迭代，通过 OTA 把改进后的端侧小模型下发，端云协同进化。\n\n一句话：语音链路是「唤醒 → ASR → NLU → DM → 执行 → TTS」的闭环；端云结合用「端侧保可用与低延迟、云端补能力与进化」实现体验与可靠性的平衡。",
    tags: ["语音交互", "唤醒词", "ASR", "NLU", "TTS", "端云结合", "降级"],
  },
  {
    id: "vsi-smart-cockpit-4",
    chapter: "vsi-smart-cockpit",
    level: 4,
    question:
      "智能座舱为什么要把仪表（ASIL B/D）和 IVI（QM）安全隔离？如果 IVI 应用崩溃或被远程攻破，可能对行车安全造成什么后果？ASIL 等级如何从需求和架构两个层面影响座舱的软硬件设计？",
    answer:
      "为什么必须隔离仪表与 IVI：\n\n仪表承担法规强制的安全显示功能——车速、报警（制动故障、气囊、胎压、转向）、档位、指示灯。这些信息缺失或错误会直接导致驾驶员误判而引发事故。因此仪表通常定为 ASIL B（部分关键报警可达 ASIL D）。而 IVI 运行大量第三方应用、联网、媒体解码，代码量大、攻击面大、崩溃概率高，定为 QM（无安全等级要求）。若两者不隔离，IVI 的故障会传导到仪表：\n\n1. 资源抢占导致仪表卡顿/黑屏：IVI 高负载（如大型 3D 游戏、视频解码）抢占 CPU/GPU/内存/显示带宽，仪表刷新掉帧甚至黑屏。驾驶员看不到车速和报警，极其危险。\n\n2. 内存越界破坏仪表进程：IVI 应用 bug 导致内存越界，若与仪表同地址空间或共享内存无保护，可能篡改仪表显示数据（如显示错误车速）。\n\n3. IVI 被攻破后横向影响仪表：IVI 联网，是座舱主要攻击面。攻击者拿下 IVI 后，若无隔离可进一步篡改仪表显示（如伪造报警误导驾驶员）或通过共享通道影响车控。\n\n4. 故障传播：IVI 进程崩溃可能触发整个 OS 重启，导致仪表短暂不可用——在高速行驶中这几秒黑屏是不可接受的风险。\n\n隔离如何防止这些后果：\n通过 Hypervisor 把仪表和 IVI 放在不同虚拟机，CPU 核绑定、内存分区、设备直通。IVI 崩溃只影响自己分区，仪表独立运行；IVI 被攻破也无法跨分区访问仪表内存或设备。即使 IVI 整体重启，仪表仍正常显示。这就是功能安全要求的「免于干扰（Freedom from Interference, FFI）」。\n\nASIL 等级如何影响软硬件设计：\n\n需求层面（ISO 26262 的 ASIL 推导）：\n- 通过 HARA（危害分析与风险评估）确定功能的安全目标（SG）及其 ASIL。仪表显示车速错误→驾驶员误判→可能追尾，严重度 S3、暴露率 E4、可控性 C3，推导出 ASIL D 的安全目标。\n- ASIL 决定需要哪些安全机制、开发流程的严格度（ASIL D 要求最严格的需求追溯、形式化或半形式化方法、独立评审、更高的覆盖率指标）。\n- ASIL 决定硬件指标：SPFM（单点故障度量）、LFM（潜伏故障度量）、PMHF（随机硬件失效概率度量）。ASIL D 要求 SPFM≥99%、LFM≥90%、PMHF<10 FIT。\n\n架构层面：\n\n1. 硬件安全机制（ASIL 越高要求越多）：\n- 锁步 CPU（Lockstep）：两个核执行相同指令，比较输出，不一致即报警。ASIL D 仪表常用锁步核。\n- 内存保护：ECC（纠错）/奇偶校验保护 RAM/Flash，检测位翻转。\n- 冗余传感器输入：车速等关键信号从多个 ECU/源获取并交叉校验。\n- 看门狗：硬件看门狗监控仪表任务存活，超时未喂狗触发复位。\n- 电源监控、时钟监控。\n\n2. 软件安全机制：\n- 内存分区（MPU/MMU）：任务间隔离，防止越界。\n- 程序流监控：检查关键函数执行顺序，防止控制流被破坏。\n- 数据冗余/校验：关键显示数据存多份带 CRC，读取校验。\n- 端到端保护（E2E）：信号从源到仪表加 CRC + 活性计数器，防止传输错误/陈旧数据。\n- 降级策略：仪表主显示失效时降级显示最关键信息（如只显车速和报警灯），或用独立的小 MCU 做冗余仪表。\n\n3. 隔离架构（FFI）：\n- 高 ASIL（仪表）与低 ASIL/QM（IVI）通过 Hypervisor/空间分区/时间分区隔离。\n- 共享资源（显示、内存）的访问必须经过安全监控，防止低 ASIL 干扰高 ASIL。\n- ASIL 分解：把 ASIL D 的安全目标分解为 ASIL B(D) + ASIL B(D) 冗余实现，或 ASIL D + QM（QM 部分负责非安全功能），降低单一组件开发成本。\n\n4. 开发流程：\n- ASIL D 要求 V 模型全流程严格：需求→架构→设计→编码→单元测试→集成测试→系统测试，每层有可追溯性和独立性评审。QM 的 IVI 可以用敏捷/迭代流程，约束宽松。\n\n一句话：隔离是把「可能坏的（IVI）」和「不能坏的（仪表）」物理分开；ASIL 等级从需求的安全目标一路驱动到硬件锁步/ECC/看门狗和软件分区/E2E/降级，是「安全等级决定架构」的典型体现。",
    tags: ["综合", "安全隔离", "ASIL", "仪表", "IVI", "Freedom from Interference", "HARA", "安全机制", "降级"],
  },
];
