import type { ReviewQuestion } from "./types";

export const avcToolchainPracticeQuestions: ReviewQuestion[] = [
  {
    id: "avc-toolchain-practice-01",
    chapter: "avc-toolchain-practice",
    level: 1,
    question: "AUTOSAR 工具链开发流程分为哪四个阶段？每阶段使用什么工具？",
    answer: "四阶段：① 系统设计——使用System Desk等系统设计工具，输出系统配置描述（ARXML），定义SWC、端口、接口、ECU映射；② ECU配置——使用DaVinci Configurator等配置工具，读取ARXML，配置BSW模块参数和RTE参数；③ 代码生成——使用RTE Generator等代码生成器，根据配置自动生成RTE C代码和BSW配置代码；④ 编译集成——使用交叉编译器（如Green Hills/Tasking）编译手写SWC代码和生成代码，链接生成可执行文件，通过调试器刷写到目标ECU。ARXML文件贯穿全流程。",
    tags: ["工具链", "四阶段", "System Desk", "DaVinci", "RTE Generator", "交叉编译"],
  },
  {
    id: "avc-toolchain-practice-02",
    chapter: "avc-toolchain-practice",
    level: 1,
    question: "MIL、SIL 和 HIL 三种测试方法分别是什么？各自的特点和适用阶段是什么？",
    answer: "三种测试方法：① MIL（Model-In-the-Loop，模型在环）——在Simulink等模型环境中测试控制算法模型，无需代码生成，适用于早期算法验证阶段；② SIL（Software-In-the-Loop，软件在环）——将模型生成C代码后在PC上编译运行测试，验证代码与模型一致性，适用于软件单元测试阶段；③ HIL（Hardware-In-the-Loop，硬件在环）——将被测ECU硬件接入实时仿真台架，仿真台架模拟车辆环境（传感器信号、执行器负载），测试真实ECU在实时环境中的行为，适用于系统集成测试和验收测试阶段。三者从模型到代码到硬件，测试保真度递增。",
    tags: ["MIL", "SIL", "HIL", "测试方法", "在环测试"],
  },
  {
    id: "avc-toolchain-practice-03",
    chapter: "avc-toolchain-practice",
    level: 2,
    question: "XCP 标定协议的作用是什么？在 AUTOSAR 开发中如何实现在线标定？",
    answer: "XCP（Universal Measurement and Calibration Protocol）是用于ECU在线测量和标定的标准协议。作用：① 在线测量——实时读取ECU内部变量值（如控制算法中间结果），无需暂停ECU运行；② 在线标定——实时修改标定参数（如PID增益、标定表），无需重新刷写ECU软件；③ 数据采集——高速采集多个变量用于性能分析。AUTOSAR实现在线标定流程：① ECU软件中定义标定参数（存放在Flash的标定区）和测量变量；② XCP on CAN/Ethernet驱动在BSW中运行；③ 使用CANape或INCA等标定工具通过XCP协议连接ECU；④ 标定工具读写ECU内存中的标定参数和测量变量，实现实时调整和监控。标定完成后将参数固化到Flash。",
    tags: ["XCP", "标定协议", "在线标定", "CANape", "测量", "标定参数"],
  },
  {
    id: "avc-toolchain-practice-04",
    chapter: "avc-toolchain-practice",
    level: 3,
    question: "在 AUTOSAR 项目中如何实现多供应商组件集成？面临哪些挑战？",
    answer: "多供应商集成实现：① ARXML作为契约——系统供应商输出系统级ARXML定义SWC接口和ECU配置，各组件供应商按ARXML契约开发；② 标准化接口——所有SWC通过RTE标准API通信，不同供应商的SWC可在同一ECU上共存；③ BSW供应商——BSW和MCAL可由芯片厂商（如Infineon/NXP）提供，与应用SWC供应商解耦；④ 集成工具——使用DaVinci等工具将多方ARXML合并，配置ECU参数，生成RTE代码。挑战：① 版本兼容——不同供应商的AUTOSAR版本（如4.0/4.2/4.3）可能不兼容，需统一版本；② ARXML差异——各方对标准理解不同导致ARXML格式差异，需大量协调；③ 工具差异——不同供应商使用不同工具链，生成代码风格和配置方式不同；④ 集成测试——多方代码合并后可能存在资源冲突（如中断优先级、内存分配），需充分集成测试。解决方案：建立统一的AUTOSAR版本和工具链规范，定义清晰的接口契约，使用CI/CD持续集成。",
    tags: ["多供应商", "组件集成", "ARXML", "版本兼容", "CI/CD", "集成测试"],
  },
];
