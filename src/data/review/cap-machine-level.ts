import type { ReviewQuestion } from "./types";

export const capMachineLevelQuestions: ReviewQuestion[] = [
  {
    id: "cap-machine-level-1",
    chapter: "cap-machine-level",
    level: 2,
    question: "x86-64 的调用约定是什么？被调用者保存和调用者保存寄存器有何区别？",
    answer:
      "前 6 个整数参数依次放 %rdi %rsi %rdx %rcx %r8 %r9，多余参数压栈，返回值放 %rax。被调用者保存寄存器（%rbx %rbp %r12-%r15）：函数若要使用它们，必须在序言压栈保存、结语恢复，调用者可假设调用前后它们不变。调用者保存寄存器（%rax %rcx %rdx %rsi %rdi %r8-%r11）：函数可自由使用，调用者若需要其值须自行保存。区别在于「谁负责保存」：被调用者保存适合跨调用仍需保留的值（如循环变量），调用者保存适合临时值。这样能减少不必要的保存恢复。浮点参数走 %xmm0-%xmm7。",
    tags: ["调用约定", "寄存器"],
  },
  {
    id: "cap-machine-level-2",
    chapter: "cap-machine-level",
    level: 3,
    question: "`lea` 指令的作用是什么？为什么编译器常用它做算术而非用 `imul`？",
    answer:
      "lea（Load Effective Address）按 D(Rb,Ri,S) 公式计算地址 Reg[Rb]+Reg[Ri]*S+D，但不访问内存，只把结果放入目的寄存器。编译器常用它做算术：①乘法变加法——`lea (%rax,%rax,2),%rax` 实现 `rax *= 3`，比 imul 快；②加法——`lea (%rdi,%rsi),%rax` 实现 `rax = rdi + rsi`。lea 的优势：单指令、单周期、不影响条件码（所以可夹在 cmp 和 jcc 之间不破坏标志）、能在一个周期完成「乘比例因子 + 加基址 + 加偏移」三步运算，是编译器优化算术的首选。但它只能做 S∈{1,2,4,8} 的乘法。",
    tags: ["lea", "指令优化"],
  },
  {
    id: "cap-machine-level-3",
    chapter: "cap-machine-level",
    level: 3,
    question: "栈帧是如何建立和销毁的？为什么递归能工作？",
    answer:
      "call 指令把返回地址压栈并跳转到目标，函数序言 `push %rbp; mov %rsp,%rbp` 建立栈帧（保存旧 rbp，把当前 rsp 作为帧基址），局部变量在 rbp 下方分配（sub $N,%rsp）。结语 `leave; ret` 或 `mov %rbp,%rsp; pop %rbp; ret` 销毁栈帧（恢复 rsp、弹出旧 rbp、弹出返回地址跳回）。栈向低地址增长。递归能工作正是因为每次调用有独立栈帧——同一函数的多次调用各有自己的返回地址、保存的寄存器、局部变量，互不干扰。递归太深或局部数组太大会让栈帧越过分配边界，导致栈溢出（stack overflow）。",
    tags: ["栈帧", "过程调用", "递归"],
  },
  {
    id: "cap-machine-level-4",
    chapter: "cap-machine-level",
    level: 4,
    question: "C 的 if/while/for 在汇编层如何实现？为什么条件传送 cmov 能避免分支预测失败的代价？",
    answer:
      "C 的所有控制流底层都是「cmp/test 设条件码 + jcc 条件跳转」。if 编译成 `cmp a,b; jcc Lelse; <then 块>; jmp Lend; Lelse: <else 块>; Lend:`。while 是「条件跳转到循环头 + 循环尾跳回」。for 是 while 的语法糖。条件码 CF/ZF/SF/OF 由 cmp（做减法）或 test（做与运算）设置，jcc 据此跳转。cmov（条件传送）的优势：它是无条件取指、有条件地搬数据，没有跳转、不破坏流水线、不受分支预测影响。当两个分支都简单且无副作用时，编译器用 cmov 代替 jcc 把「控制依赖」转成「数据依赖」，避免分支预测失败冲刷流水线的代价。代价是两条路径都执行（含可能的内存读），所以 cmov 适合轻量分支。",
    tags: ["条件码", "控制流", "cmov"],
  },
];
