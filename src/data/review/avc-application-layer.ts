import type { ReviewQuestion } from "./types";

export const avcApplicationLayerQuestions: ReviewQuestion[] = [
  {
    id: "avc-application-layer-01",
    chapter: "avc-application-layer",
    level: 1,
    question: "AUTOSAR 中的 SWC（软件组件）由哪几个核心要素构成？",
    answer: "SWC由三个核心要素构成：① 端口（Port）——SWC与外部的通信接口，分为PPort（提供数据/服务，Provider）和RPort（需求数据/服务，Requirer）；② 内部行为（Internal Behavior）——包含一个或多个Runnable（可运行实体），每个Runnable是一段可被调度的函数，由RTE触发执行；③ 接口（Interface）——定义端口的数据类型和通信方式，如S/R接口、C/S接口、Mode Switch接口等。SWC通过ARXML描述这些要素，RTE据此生成调度代码。",
    tags: ["SWC", "端口", "Runnable", "接口", "PPort", "RPort"],
  },
  {
    id: "avc-application-layer-02",
    chapter: "avc-application-layer",
    level: 1,
    question: "AUTOSAR 定义了哪几种 SWC 类型？各自的特点是什么？",
    answer: "SWC类型：① Application SWC（应用组件）——纯应用逻辑，不直接访问硬件，通过RTE通信；② Sensor/Actuator SWC（传感器/执行器组件）——连接应用层与ECU抽象层，通过RTE访问I/O硬件抽象；③ Service SWC（服务组件）——提供BSW服务（如诊断、模式管理）的SWC接口，位于服务层；④ Parameter SWC（参数组件）——提供标定参数访问；⑤ ECU Abstraction SWC——封装ECU硬件抽象层接口。最常用的是Application SWC和Sensor/Actuator SWC。",
    tags: ["SWC类型", "Application", "Sensor/Actuator", "Service", "Parameter"],
  },
  {
    id: "avc-application-layer-03",
    chapter: "avc-application-layer",
    level: 2,
    question: "Runnable 的触发方式有哪些？RTE 如何调度 Runnable？",
    answer: "Runnable触发方式：① 周期触发（Timing Event）——RTE按固定周期（如10ms/100ms）调用Runnable，是最常用的触发方式；② 数据接收触发（DataReceived Event）——当RPort接收到新数据时触发Runnable执行；③ 操作调用触发（OperationInvoked Event）——C/S通信中客户端调用服务端操作时触发；④ 模式切换触发（ModeSwitch Event）——模式切换时触发；⑤ 初始化触发（Init Event）——ECU启动时触发一次。RTE调度原理：根据ARXML中配置的触发条件和时序，RTE生成调度表，在OS任务中按优先级和周期调用对应Runnable，确保实时性和可预测性。",
    tags: ["Runnable", "触发方式", "周期触发", "调度", "RTE"],
  },
  {
    id: "avc-application-layer-04",
    chapter: "avc-application-layer",
    level: 3,
    question: "设计一个车速控制 SWC，需要接收车速传感器信号并输出控制指令。请描述其端口、接口和 Runnable 设计。",
    answer: "设计：① 端口——RPort（接收车速传感器信号，S/R接口，数据类型为uint16 km/h）+ RPort（接收目标车速设定，S/R接口，uint16）+ PPort（输出控制指令，S/R接口，数据类型为sint8节气门开度百分比）+ PPort（输出DTC状态，C/S接口，供Dcm诊断调用）；② Runnable——Runnable_ReadSensor（周期10ms，读取车速传感器信号并滤波）+ Runnable_ControlLogic（周期10ms，比较实际车速与目标车速，PID计算输出节气门开度）+ Runnable_Init（初始化触发，初始化PID参数和状态变量）；③ 接口——车速信号S/R接口（uint16 SpeedSignal）、控制指令S/R接口（sint8 ThrottleCommand）、诊断C/S接口（供Dcm读取故障状态）。SWC通过RTE调用Rte_Read/Rte_Write/Rte_Call等API实现数据收发和服务调用，业务逻辑完全与硬件解耦。",
    tags: ["SWC设计", "端口设计", "Runnable", "PID控制", "车速控制", "实践"],
  },
];
