import { ReviewQuestion } from "../types";

export const tbcActivationRecordsQuestions: ReviewQuestion[] = [
  {
    id: "tbc-activation-records-1",
    chapter: "tbc-activation-records",
    level: 1,
    question: "什么是活动记录（栈帧）？Frame 抽象提供了哪些接口？",
    answer:
      "活动记录（activation record）是函数调用时在栈上分配的数据帧，存放本次调用的局部数据。虎书用 Frame 抽象封装它，使前端只关心 escape 判定与 static link，具体栈帧布局交给后端实现。Frame 接口提供：newFrame(name, formals)——创建栈帧（formals 带每个参数是否 escape 的标记）；name——返回函数名；formals——返回参数访问方式（frame pointer 偏移或寄存器）；allocLocal(everyLocal)——分配一个局部变量，返回访问方式。Frame 是平台无关抽象，不同目标机器有不同实现。",
    tags: ["活动记录", "栈帧", "Frame 抽象", "接口", "平台无关"],
  },
  {
    id: "tbc-activation-records-2",
    chapter: "tbc-activation-records",
    level: 2,
    question: "什么是 escape 变量？如何判定？escape 与非 escape 变量在分配上有何区别？",
    answer:
      "escape 变量是指其生命周期超出定义它的函数体的变量——被嵌套函数引用、被取地址（&amp;x）、或在循环/条件外仍需访问的变量。判定方式：在语义分析时递归检查变量使用，若被内层嵌套函数引用则标记 escape。区别：escape 变量必须在栈帧中分配（有稳定内存地址，可被嵌套函数通过 static link 访问），不能放进寄存器；非 escape 变量可留在寄存器中（更快，无需访存）。allocLocal(true) 分配到栈，allocLocal(false) 可进寄存器。",
    tags: ["escape", "栈帧分配", "寄存器", "局部变量"],
  },
  {
    id: "tbc-activation-records-3",
    chapter: "tbc-activation-records",
    level: 3,
    question: "静态链（static link）如何工作？为什么需要它？嵌套层次如何决定访问路径？",
    answer:
      "静态链解决嵌套函数访问外层函数局部变量的问题。每次进入函数时，在栈帧中压入 static link——指向该函数词法外层函数的栈帧。访问外层变量 x 时：①从当前栈帧的 static link 找到外层函数栈帧 ②按 x 在该栈帧的偏移读取。嵌套层次 = 跨越的 static link 数：访问外 1 层变量跟 1 次 static link，外 n 层跟 n 次。需要它的原因：Tiger 支持嵌套函数定义，内层函数能访问外层变量，但运行时调用栈是动态的（调用者不一定是词法外层），所以用 static link 记录词法外层关系，这是访问非局部变量的标准技术。",
    tags: ["静态链", "static link", "嵌套函数", "访问链", "词法作用域"],
  },
  {
    id: "tbc-activation-records-4",
    chapter: "tbc-activation-records",
    level: 2,
    question: "栈帧内部包含哪些区域？各区域的用途是什么？",
    answer:
      "栈帧从高地址到低地址通常包含：①传入参数区——超出寄存器传参数量的参数存这里 ②返回地址 + static link（escape）——记录返回点和词法外层栈帧 ③保存的寄存器——被调用者需保存的寄存器 ④局部变量——escape 变量在此分配（有地址） ⑤临时变量——非 escape 变量和中间结果（可进寄存器，溢出时存此）。访问方式通过 frame pointer（fp）的偏移定位。Frame 抽象把这些细节隐藏，前端只用 allocLocal 拿到访问方式，不关心具体偏移。",
    tags: ["栈帧结构", "返回地址", "局部变量", "临时变量", "调用约定"],
  },
];
