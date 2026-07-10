import type { ReviewQuestion } from "./types";

export const avcMcalDriversQuestions: ReviewQuestion[] = [
  {
    id: "avc-mcal-drivers-01",
    chapter: "avc-mcal-drivers",
    level: 1,
    question: "MCAL（微控制器抽象层）在 AUTOSAR 架构中的位置和作用是什么？",
    answer: "MCAL位于BSW的最底层，直接访问微控制器寄存器。作用是封装片上外设的硬件操作，为上层的ECU抽象层提供标准化的驱动API。MCAL模块包括DIO（数字I/O）、ADC（模数转换）、PWM（脉宽调制）、GPT（通用定时器）、CAN（CAN控制器）、SPI（SPI总线）、UART（串口）、Fls（Flash）、Eep（EEPROM）、ICU（输入捕获）、OCU（输出比较）、Wdg（看门狗）等。MCAL使上层软件无需关心具体微控制器型号。",
    tags: ["MCAL", "微控制器抽象", "片上外设", "驱动"],
  },
  {
    id: "avc-mcal-drivers-02",
    chapter: "avc-mcal-drivers",
    level: 1,
    question: "MCAL 驱动模块支持哪两种工作模式？各自的特点和适用场景是什么？",
    answer: "两种工作模式：① 轮询模式（Polling）——主循环中主动读取外设状态或数据，CPU持续查询，实现简单但效率低，适用于低频访问或无中断支持的外设；② 中断模式（Interrupt）——外设事件触发中断，在中断服务程序或回调函数中处理，CPU无需轮询，响应快且效率高，适用于高频事件或需要实时响应的场景。实际开发中通常优先使用中断模式，轮询模式作为补充。",
    tags: ["轮询模式", "中断模式", "Polling", "Interrupt"],
  },
  {
    id: "avc-mcal-drivers-03",
    chapter: "avc-mcal-drivers",
    level: 2,
    question: "DIO、ADC 和 PWM 三个 MCAL 模块分别提供什么功能？在车用控制器中典型应用场景是什么？",
    answer: "① DIO（数字I/O）——读写数字引脚电平（高/低），典型应用：读取开关状态（车门开关、按键）、控制LED指示灯、驱动继电器。② ADC（模数转换）——将模拟电压转换为数字值，典型应用：读取传感器信号（油门踏板位置传感器、温度传感器、电池电压监测）。③ PWM（脉宽调制）——输出可调占空比的方波信号，典型应用：电机转速控制（PWM占空比控制电机驱动器）、LED亮度调节、电磁阀驱动控制。三者共同覆盖了车用控制器最常用的I/O交互需求。",
    tags: ["DIO", "ADC", "PWM", "传感器", "执行器", "应用场景"],
  },
  {
    id: "avc-mcal-drivers-04",
    chapter: "avc-mcal-drivers",
    level: 3,
    question: "当微控制器更换型号时，AUTOSAR 架构如何保证上层软件不受影响？请从 MCAL 角度分析迁移过程。",
    answer: "迁移过程分析：① MCAL替换——新微控制器需提供对应MCAL驱动实现（由芯片厂商或第三方提供），API接口保持AUTOSAR标准不变（如Dio_ReadChannel、Adc_ReadGroup），上层ECU抽象层代码无需修改；② 配置更新——在ECU配置工具中更新MCAL配置参数（如引脚映射、ADC通道、时钟分频），生成新的配置代码；③ ECU抽象层验证——若新MCU的外设能力不同（如ADC精度变化），可能需调整ECU抽象层的配置参数，但API不变；④ 重新编译——RTE和服务层代码无需修改，只需用新MCAL库重新交叉编译链接。核心原理：MCAL标准化API形成硬件抽象边界，上层软件依赖接口而非实现，更换MCU只需替换MCAL层并更新配置。",
    tags: ["MCAL迁移", "硬件更换", "标准化API", "配置更新", "跨平台"],
  },
];
