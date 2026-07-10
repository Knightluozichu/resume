import type { ReviewQuestion } from "./types";

/** 函数 复习题 */
export const gplFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "gpl-functions-1",
    chapter: "gpl-functions",
    level: 1,
    question: `Go 函数的多返回值机制？典型用法？`,
    answer: `Go 函数可返回多个值：func div(a,b int)(int,error){if b==0{return 0,errors.New(\"div by zero\")};return a/b,nil}。典型用法：1.返回结果+error（最常见）。2.返回值+ok 布尔（map[key]返回(value,ok)）。3.返回多个相关值（swap 返回(b,a)）。调用方：result,err:=div(10,2) 或 result,_:=div(10,2) 忽略。`,
    tags: ["多返回值","error","函数"],
  },
  {
    id: "gpl-functions-2",
    chapter: "gpl-functions",
    level: 2,
    question: `Go 的 defer 语句工作原理？执行顺序？`,
    answer: `defer 注册延迟调用在函数返回时执行（无论正常或 panic）。执行顺序 LIFO（后进先出）。defer 参数在 defer 语句时求值（不是执行时）。用法：1.资源释放 defer file.Close()。2.锁释放 defer mu.Unlock()。3.panic 恢复 defer recover()。注意有微小性能开销热路径可直接调。defer 在 return 值已求值但未返回前执行——可用命名返回值修改返回结果。`,
    tags: ["defer","LIFO","资源释放","recover"],
  },
  {
    id: "gpl-functions-3",
    chapter: "gpl-functions",
    level: 3,
    question: `Go 闭包是什么？捕获变量有什么注意事项？`,
    answer: `闭包是捕获外部变量的匿名函数：func counter()func()int{n:=0;return func()int{n++;return n}}。注意：1.闭包捕获变量引用（不是值拷贝）后续修改外部变量闭包内也变。2.循环变量捕获陷阱：for i:=0;i<3;i++{go func(){fmt.Println(i)}()} Go 1.22 前可能打印 333（i 是同一变量循环结束 i=3）。Go 1.22+每次循环 i 是新变量打印 012。1.22 前修法：go func(i int){fmt.Println(i)}(i) 传参。`,
    tags: ["闭包","捕获","循环变量","goroutine"],
  },
  {
    id: "gpl-functions-4",
    chapter: "gpl-functions",
    level: 4,
    question: `设计使用 defer 实现的函数执行计时器，要求准确包含 return 值求值时间。`,
    answer: `func timed(f func()error)(err error){start:=time.Now();defer func(){elapsed:=time.Since(start);log.Printf(\"took %v, err=%v\",elapsed,err)}();return f()}。关键：1.命名返回值 err——defer 中可访问修改返回值。2.start 函数开始时记录。3.defer 在 return f() 之后执行此时 err 已赋值 elapsed 含 f() 完整时间。4.defer 闭包捕获 start 和 err 引用——start 注册时求值 err return 时赋值 defer 执行时读最新值。`,
    tags: ["defer","计时器","命名返回值","闭包"],
  }
];
