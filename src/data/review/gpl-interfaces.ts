import type { ReviewQuestion } from "./types";

/** 接口 复习题 */
export const gplInterfacesQuestions: ReviewQuestion[] = [
  {
    id: "gpl-interfaces-1",
    chapter: "gpl-interfaces",
    level: 1,
    question: `Go 接口隐式实现是什么意思？与 Java implements 区别？`,
    answer: `Go 中类型实现接口不需声明 implements——只要拥有接口所有方法就自动满足。type Reader interface{Read(p[]byte)(int,error)}，任何有 Read 方法的类型自动是 Reader。Java 需显式 class MyReader implements Reader。Go 优势：1.可让已有类型满足新接口不需修改。2.接口定义和使用解耦。3.鸭子类型安全版（编译期检查）。劣势：不如显式直观可能意外满足接口。`,
    tags: ["接口","隐式实现","implements","鸭子类型"],
  },
  {
    id: "gpl-interfaces-2",
    chapter: "gpl-interfaces",
    level: 2,
    question: `空接口 interface{} 和 any 关系？如何做类型断言？`,
    answer: `Go 1.18+ any 是 interface{} 别名完全等价。空接口可持有任意类型值。类型断言：v:=i.(int)（不是 int 则 panic）；v,ok:=i.(int)（ok false 不 panic）。类型 switch：switch v:=i.(type){case int:...;case string:...;default:...}。1.18+ 有泛型后应优先用泛型替代空接口。`,
    tags: ["空接口","any","类型断言","类型switch"],
  },
  {
    id: "gpl-interfaces-3",
    chapter: "gpl-interfaces",
    level: 3,
    question: `接口内部结构？nil 接口和值为 nil 的接口区别？`,
    answer: `接口内部是两个指针：(type,value)。nil 接口是(nil,nil)——i==nil 为 true。值为 nil 的接口是(ConcreteType,nil)——类型非 nil 但数据 nil。区别：var i interface{}=nil→i==nil true。var p*int=nil;var i interface{}=p→i==nil false（type 是 *int 非 nil）。常见陷阱：函数返回 error 接口内部 var err*MyError=nil;return err，调用方 err!=nil 为 true 因接口有类型信息。修法：return nil。`,
    tags: ["接口结构","nil接口","type value","陷阱"],
  },
  {
    id: "gpl-interfaces-4",
    chapter: "gpl-interfaces",
    level: 4,
    question: `如何设计 Go 接口？小接口原则是什么？`,
    answer: `标准库接口通常 1-3 个方法：io.Reader(Read),io.Writer(Write),fmt.Stringer(String)。原则：1.接口只定义必要行为。2.组合小接口形成大接口：type ReadWriter interface{Reader;Writer}。3.消费者定义接口（使用包中定义非实现包）。4.接口越小越容易满足。5.避免过早抽象——先写具体类型多实现时再提取接口。反例：20 方法巨型接口几乎无法实现。正例：io 包各 1 方法组合出 ReadWriteCloser。`,
    tags: ["接口设计","小接口","组合","io"],
  }
];
