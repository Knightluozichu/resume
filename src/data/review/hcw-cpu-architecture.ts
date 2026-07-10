import type { ReviewQuestion } from "./types";

export const hcwCpuArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "hcw-cpu-architecture-1",
    chapter: "hcw-cpu-architecture",
    level: 2,
    question: `CPU 的核心组成部分有哪些？各自的功能是什么？`,
    answer:
      `CPU 由四大部分组成：①运算器（ALU）——执行算术和逻辑运算，是「做计算」的部件；②控制器（CU）——从内存取指令、解码、产生控制信号协调各部件，是「指挥官」；③寄存器——CPU 内部超高速存储，如程序计数器（PC）存下一条指令地址、指令寄存器（IR）存当前指令、通用寄存器存操作数；④时钟——产生节拍信号驱动 CPU 一步步执行。运算器管算、控制器管指挥、寄存器管暂存、时钟管节奏，四者协作完成指令执行。`,
    tags: ["CPU", "硬件"],
  },
  {
    id: "hcw-cpu-architecture-2",
    chapter: "hcw-cpu-architecture",
    level: 2,
    question: `指令周期的四个阶段是什么？每个阶段做什么？`,
    answer:
      `指令周期（fetch-decode-execute）分四步：①取指（Fetch）——控制器把 PC 中的地址送到地址总线，从内存读出指令存入指令寄存器 IR，PC 自动加 1 指向下一条；②译码（Decode）——控制器解析 IR 中的指令，确定操作码和操作数，产生对应的控制信号；③执行（Execute）——根据译码结果，ALU 做运算或访存读写数据；④写回（Write-back）——把执行结果写回目标寄存器或内存。一条指令执行完回到取指阶段开始下一条，循环往复直到程序结束。这就是 CPU 「跑」程序的本质。`,
    tags: ["指令周期", "CPU"],
  },
  {
    id: "hcw-cpu-architecture-3",
    chapter: "hcw-cpu-architecture",
    level: 3,
    question: `什么是流水线（Pipeline）？它如何提升 CPU 性能？有什么代价？`,
    answer:
      `流水线把指令执行拆成多个阶段（如取指→译码→执行→访存→写回），让多条指令的不同阶段同时进行。如同工厂流水线：第 1 条指令在执行时，第 2 条在译码，第 3 条在取指。理想情况下 5 级流水线可达到 5 倍吞吐量（IPC 接近 1）。代价是流水线冒险：①数据冒险——后一条指令依赖前一条的结果；②控制冒险——分支跳转改变指令流；③结构冒险——多条指令争用同一硬件。需要用转发（forwarding）、分支预测、双端口内存等机制解决。流水线级数越多单条指令延迟越大，但吞吐量越高。`,
    tags: ["流水线", "性能"],
  },
  {
    id: "hcw-cpu-architecture-4",
    chapter: "hcw-cpu-architecture",
    level: 3,
    question: `寄存器和内存有什么本质区别？为什么 CPU 不能直接用内存当寄存器？`,
    answer:
      `寄存器是 CPU 内部的存储元件，与 ALU/控制器在同一芯片上，访问速度约 0-1 个时钟周期；内存（DRAM）在 CPU 外部，通过总线访问，速度约 100-300 个周期，慢 100 倍以上。寄存器数量极少（通常几十个，如 x86 有 16 个通用寄存器），但每个都有名字可直接被指令引用，是「CPU 的工作台」；内存容量大但只能按地址访问。CPU 不能直接用内存当寄存器是因为：①速度差距太大——每条指令都要等几百周期，流水线无法工作；②指令编码——寄存器编号只需几位（16 个用 4 位），内存地址需要 32/64 位，指令编码会膨胀。所以 CPU 先把数据从内存加载到寄存器，在寄存器上运算，再写回内存。`,
    tags: ["寄存器", "内存", "体系结构"],
  },
];
