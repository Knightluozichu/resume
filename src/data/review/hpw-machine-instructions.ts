import type { ReviewQuestion } from "./types";

export const hpwMachineInstructionsQuestions: ReviewQuestion[] = [
  {
    id: "hpw-machine-instructions-1",
    chapter: "hpw-machine-instructions",
    level: 2,
    question: `机器指令由哪两部分组成？为什么 \`c = a + b\` 要编译成多条指令？`,
    answer:
      `机器指令由操作码（做什么）和操作数（对谁做）组成。\`c = a + b\` 要编译成多条指令，因为 CPU 不能直接对内存里的两个数做运算——必须先把 a 从内存读到寄存器（MOV EAX,[a]）、把 b 加到寄存器（ADD EAX,[b]）、再把结果写回内存的 c（MOV [c],EAX）。内存访问比寄存器慢 100 倍以上，ALU 输入端直接连寄存器，所以数据要先入寄存器才能运算。一条 C 语句通常对应多条机器指令，这就是为什么不同写法性能差很多——少一次内存访问就少 100 个周期。`,
    tags: ["机器指令", "编译"],
  },
  {
    id: "hpw-machine-instructions-2",
    chapter: "hpw-machine-instructions",
    level: 3,
    question: `常见的寻址方式有哪些？指针的底层实现对应哪一种？`,
    answer:
      `常见寻址方式：①立即寻址——操作数直接在指令里（MOV EAX,5）；②寄存器寻址——操作数在寄存器（MOV EAX,EBX）；③直接寻址——操作数在内存，地址写在指令里（MOV EAX,[0x1000]）；④寄存器间接寻址——地址存在寄存器里（MOV EAX,[EBX]）；⑤基址+偏移寻址——如 MOV EAX,[EBP+8] 访问栈帧变量。指针的底层实现对应寄存器间接寻址——指针变量存的是地址，把这个地址放进寄存器，再用 [寄存器] 间接访问它指向的内存。数组下标和结构体成员访问则对应基址+偏移寻址。`,
    tags: ["寻址方式", "指针"],
  },
  {
    id: "hpw-machine-instructions-3",
    chapter: "hpw-machine-instructions",
    level: 3,
    question: `CPU 默认按地址顺序执行指令，循环、分支、函数调用底层是怎么实现的？`,
    answer:
      `CPU 默认按地址顺序逐条执行指令（PC 自动递增）。改变执行顺序靠跳转指令：①无条件跳转（JMP）直接把 PC 设为目标地址，对应 goto；②条件跳转（JE/JNE/JG）根据标志寄存器（上条指令运算设的零标志/符号标志）决定是否跳转，对应 if/while/for——如 if(a>b) 编译成比较设标志位、条件跳转。函数调用（CALL）本质也是跳转——把返回地址压栈再跳到函数入口，函数末尾的 RET 从栈弹出返回地址跳回去。循环、分支、函数调用，底层全是跳转指令的组合。`,
    tags: ["控制流", "跳转指令"],
  },
  {
    id: "hpw-machine-instructions-4",
    chapter: "hpw-machine-instructions",
    level: 4,
    question: `为什么说「高级语言语句和机器指令不是一一对应的」？这对性能优化有什么启示？`,
    answer:
      `一条 C 语句通常对应多条机器指令：c=a+b 要三四条（读 a、读 b、加、写 c）；arr[i]=x 更多（算地址、读 x、写内存、可能还有边界检查）；一个函数调用涉及压参数、压返回地址、跳转、建栈帧、恢复栈帧、返回一堆指令。启示：①同样逻辑不同写法性能差很多——少一次内存访问就少 100 个周期；②要写出对 CPU 友好的代码（减少内存访问、利用寄存器、提高缓存命中）；③看懂性能剖析工具的输出需要理解「高级语句→多条指令」的展开；④编译器优化（如循环展开、指令重排）就是在这个展开基础上做文章。`,
    tags: ["性能", "编译优化"],
  },
];
