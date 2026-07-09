import { ReviewQuestion } from "../types";

export const dbcRuntimeEnvironmentQuestions: ReviewQuestion[] = [
  {
    id: "dbc-runtime-environment-1",
    chapter: "dbc-runtime-environment",
    level: 1,
    question: "运行时内存分为哪些区域？各自存储什么内容？",
    answer:
      "运行时内存分四区：①代码区（Code）——存放编译后的目标代码，只读 ②静态区（Static/Data）——存放全局变量和静态变量，地址在编译期确定，生命周期为整个程序 ③堆区（Heap）——存放动态分配的对象（malloc/new），向上增长，由程序员或 GC 管理释放 ④栈区（Stack）——存放函数调用的活动记录（Activation Record），向下增长，调用时 push、返回时 pop，自动管理。堆和栈相向增长，中间是自由空间。",
    tags: ["内存布局", "代码区", "静态区", "堆区", "栈区"],
  },
  {
    id: "dbc-runtime-environment-2",
    chapter: "dbc-runtime-environment",
    level: 2,
    question: "活动记录（Activation Record）包含哪些字段？每次函数调用时发生了什么？",
    answer:
      "活动记录字段：①返回值 ②实参（actual parameters）③控制链（指向调用者的活动记录）④访问链（access link，指向外层过程活动记录，用于非局部变量访问）⑤机器状态（保存的寄存器、返回地址 PC）⑥局部变量 ⑦临时变量。函数调用时：①在栈顶分配新活动记录 ②保存调用者机器状态和返回地址 ③传入实参 ④设置控制链和访问链 ⑤初始化局部变量 ⑥跳转到函数体执行。函数返回时：①将返回值写入调用者活动记录 ②恢复调用者机器状态 ③弹出当前活动记录（移动栈指针）④跳转回返回地址。",
    tags: ["活动记录", "栈帧", "函数调用", "控制链", "访问链"],
  },
  {
    id: "dbc-runtime-environment-3",
    chapter: "dbc-runtime-environment",
    level: 3,
    question: "访问链和 Display 表如何实现非局部变量的访问？各有何优缺点？",
    answer:
      "访问链（Access Link）：每个活动记录含一个访问链，指向词法外层过程的活动记录。访问非局部变量时，沿访问链逐层向上查找，最坏 O(n)（n 为嵌套深度）。优点：空间开销小（每帧一个指针）。适合嵌套深度不大的语言（如 Pascal）。Display 表：维护一个全局数组，第 i 个元素指向第 i 层嵌套过程的活动记录。访问第 d 层的非局部变量时直接 display[d] 取到，O(1) 访问。但每次过程调用/返回需更新 Display 表。优点：访问快 O(1)；缺点：空间开销大，调用时维护成本高。两者都用于静态作用域语言（如 Pascal），C 语言无嵌套函数，非局部变量即全局变量，直接放静态区即可。",
    tags: ["访问链", "Display表", "非局部变量", "静态作用域", "嵌套过程"],
  },
  {
    id: "dbc-runtime-environment-4",
    chapter: "dbc-runtime-environment",
    level: 2,
    question: "栈式分配和堆式分配有什么区别？各自适用于什么场景？",
    answer:
      "栈式分配：活动记录在栈上分配，函数返回自动释放，分配/释放 O(1)，无需 GC。适合生命周期与函数调用一致的数据（局部变量、参数）。缺点：数据生命周期不能超过函数调用，不能返回指向栈上数据的指针。堆式分配：由程序员（malloc/free）或 GC 管理生命周期，数据可在任意时刻分配和释放。适合生命周期不确定的数据（动态对象、可变长结构）。缺点：分配/释放开销大，可能有内存泄漏和碎片，需 GC 或手动管理。实际程序混合使用：栈放局部变量，堆放动态对象，静态区放全局变量。",
    tags: ["栈式分配", "堆式分配", "生命周期", "GC", "内存管理"],
  },
];
