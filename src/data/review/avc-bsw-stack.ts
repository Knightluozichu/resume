import type { ReviewQuestion } from "./types";

export const avcBswStackQuestions: ReviewQuestion[] = [
  {
    id: "avc-bsw-stack-01",
    chapter: "avc-bsw-stack",
    level: 1,
    question: "AUTOSAR BSW 服务层包含哪些核心模块？各自的功能是什么？",
    answer: "服务层核心模块：① OS（操作系统）——任务调度、中断管理、资源管理；② 内存服务——NvM（非易失存储管理）、MemIf（存储抽象接口）、Ea（EEPROM抽象）；③ 通信服务——Com（信号与I-PDU打包）、PduR（PDU路由）、CanTp（传输层分片重组）；④ 诊断服务——Dcm（诊断通信管理）、Dem（诊断事件管理）；⑤ ECU状态管理——EcuM（启动/关闭/睡眠管理）、BswM（模式仲裁与规则执行）、WdgM（程序流监控与存活检查）。",
    tags: ["服务层", "OS", "NvM", "Com", "Dcm", "EcuM"],
  },
  {
    id: "avc-bsw-stack-02",
    chapter: "avc-bsw-stack",
    level: 1,
    question: "ECU 抽象层的作用是什么？它如何屏蔽硬件差异？",
    answer: "ECU抽象层的作用是屏蔽ECU硬件外设差异，为服务层提供统一接口。包含：① I/O抽象（IoHwAb/AdcIf）——统一数字/模拟I/O访问；② 存储抽象（Fee/Fls/Eep）——统一Flash和EEPROM的访问接口；③ 通信抽象（CanIf/FrIf/EthIf）——统一CAN/FlexRay/Ethernet接口；④ 存储器抽象（RamTst/Crc）——内存测试与校验。上层服务层调用统一API，不关心底层是哪个厂商的ECU硬件。",
    tags: ["ECU抽象层", "IoHwAb", "CanIf", "Fee", "硬件屏蔽"],
  },
  {
    id: "avc-bsw-stack-03",
    chapter: "avc-bsw-stack",
    level: 2,
    question: "AUTOSAR OS（操作系统）提供哪些核心机制？它与通用操作系统有什么区别？",
    answer: "AUTOSAR OS基于OSEK OS扩展，提供核心机制：① 任务管理——基本任务（运行到等待）和扩展任务（可等待多个事件）；② 中断管理——一类中断（不触发调度，快速响应）和二类中断（触发调度，使用API）；③ 资源管理——通过GetResource/ReleaseResource实现优先级天花板协议防止死锁；④ 事件机制——SetEvent/WaitEvent实现任务间同步；⑤ 警报与计数器——定时触发任务。与通用OS区别：静态配置（任务/资源在编译时确定）、无虚拟内存、实时性强（微秒级响应）、资源占用极小、不支持动态创建任务。",
    tags: ["OS", "任务管理", "中断", "资源管理", "OSEK", "实时性"],
  },
  {
    id: "avc-bsw-stack-04",
    chapter: "avc-bsw-stack",
    level: 3,
    question: "EcuM、BswM 和 WdgM 三个模块如何协同管理 ECU 的运行状态和安全？",
    answer: "三者协同机制：① EcuM（ECU状态管理）——负责ECU生命周期管理（初始化、运行、睡眠、唤醒、关闭），协调各BSW模块的启动和关闭顺序；② BswM（模式管理）——根据应用层模式请求和当前系统状态进行模式仲裁，执行模式切换规则（如从Run模式切换到Sleep模式时关闭非必要通信）；③ WdgM（看门狗管理）——监控程序执行流，通过检查点（Checkpoint）验证关键任务是否按时执行，若检测到程序流异常则触发看门狗复位。协同流程：EcuM控制ECU状态转换 → BswM在状态转换时执行模式规则（如切换通信模式、启停功能） → WdgM持续监控程序流确保安全运行。三者共同保障ECU在正常和异常情况下的安全运行。",
    tags: ["EcuM", "BswM", "WdgM", "状态管理", "模式仲裁", "程序流监控"],
  },
];
