import type { ReviewQuestion } from "./types";

/** 类型与变量 复习题 */
export const gplTypesVariablesQuestions: ReviewQuestion[] = [
  {
    id: "gpl-types-variables-1",
    chapter: "gpl-types-variables",
    level: 1,
    question: `Go 的基本类型有哪些？变量声明的几种方式？`,
    answer: `基本类型：bool,string,int/int8-64,uint/uint8-64,byte(uint8),rune(int32),float32/64,complex64/128。声明：1.var x int=10。2.var x=10（类型推断）。3.var x int（零值 x=0）。4.x:=10（短变量声明函数内最常用）。5.var x,y int=1,2（多变量）。`,
    tags: ["基本类型","变量声明","类型推断","零值"],
  },
  {
    id: "gpl-types-variables-2",
    chapter: "gpl-types-variables",
    level: 2,
    question: `Go 的零值机制是什么？有什么好处？`,
    answer: `所有变量声明后自动初始化为零值：数值 0，bool false，string \"\"，指针/切片/map/channel/接口/function 为 nil。好处：1.不存在未初始化变量（C/C++ 的未定义行为）。2.不需构造函数初始化基本字段。3.结构体 var p Person 自动零值可安全使用。注意：nil map 不能写入需 make，nil slice 可以 append 自动分配，nil 指针解引用 panic。`,
    tags: ["零值","nil","初始化","安全"],
  },
  {
    id: "gpl-types-variables-3",
    chapter: "gpl-types-variables",
    level: 3,
    question: `Go 值类型和引用类型区别？函数传参时行为？`,
    answer: `值类型：int/float/bool/string/struct/array/pointer。赋值传参复制整个值修改副本不影响原值。引用类型（指针语义）：slice/map/channel。赋值传参复制底层结构但底层数据共享修改影响原数据。注意：slice 传参 header 被复制但底层数组共享——append 可能修改底层数组但扩容则创建新数组原 slice 不感知。string 是值类型但底层只读不可变。`,
    tags: ["值类型","引用类型","slice","map","传参"],
  },
  {
    id: "gpl-types-variables-4",
    chapter: "gpl-types-variables",
    level: 4,
    question: `分析：s:=[]int{1,2,3};modify(s);fmt.Println(s)，func modify(s []int){s[0]=99;s=append(s,4)} 输出什么？`,
    answer: `输出 [99 2 3]。1.s 创建底层数组[1,2,3] len=3 cap=3。2.modify(s) 传 slice header 副本（指向同一底层数组 len=3 cap=3）。3.s[0]=99 修改底层数组共享所以原 s 也变[99,2,3]。4.s=append(s,4) cap=3 不够扩容创建新数组[99,2,3,4]函数内 s 指向新数组但原 s header 不变仍指向旧数组[99,2,3]。5.打印[99 2 3]。核心：slice 传参 header 值拷贝底层数组共享但 append 扩容后分道扬镳。`,
    tags: ["slice","append","扩容","底层数组","传参"],
  }
];
