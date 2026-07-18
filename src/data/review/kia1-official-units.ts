import type { ReviewQuestion } from "./types";

export const kia1OfficialUnitQuestions: ReviewQuestion[] = [
  {
    "id": "kia1-official-learning-map-q1",
    "chapter": "kia1-official-learning-map",
    "level": 1,
    "question": "“《Kotlin实战》第1版权威学习地图”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖17个节点，从“第1部分 Kotlin简介”到“索引与图表代码清单”；主线是沿2个分部、11章、3附录与索引参考建立Kotlin 1.0到Java互操作的完整依赖图，证据为17单元263节点矩阵、版本卡、章节依赖图、实验路线和第2版差异账本。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-official-learning-map-q2",
    "chapter": "kia1-official-learning-map",
    "level": 2,
    "question": "怎样为“《Kotlin实战》第1版权威学习地图”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存17单元263节点矩阵、版本卡、章节依赖图、实验路线和第2版差异账本。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-official-learning-map-q3",
    "chapter": "kia1-official-learning-map",
    "level": 3,
    "question": "“《Kotlin实战》第1版权威学习地图”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把2017年第1版与加入协程和Flow的第2版混成同一目录，或只保留八个主题概览”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-official-learning-map-q4",
    "chapter": "kia1-official-learning-map",
    "level": 3,
    "question": "为什么“《Kotlin实战》第1版权威学习地图”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-official-learning-map-q5",
    "chapter": "kia1-official-learning-map",
    "level": 4,
    "question": "“《Kotlin实战》第1版权威学习地图”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-official-learning-map-q6",
    "chapter": "kia1-official-learning-map",
    "level": 4,
    "question": "“《Kotlin实战》第1版权威学习地图”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及17单元263节点矩阵、版本卡、章节依赖图、实验路线和第2版差异账本。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-part1-kotlin-introduction-q1",
    "chapter": "kia1-part1-kotlin-introduction",
    "level": 1,
    "question": "“第1部分 Kotlin简介”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖1个节点，从“第1部分 Kotlin简介”到“第1部分 Kotlin简介”；主线是先建立Kotlin 1.0的语言目标、基本语法、类、lambda与类型系统，再判断它如何复用既有Java平台，证据为版本卡、六章依赖图、Java互操作边界、最小工程和概念回收表。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-part1-kotlin-introduction-q2",
    "chapter": "kia1-part1-kotlin-introduction",
    "level": 2,
    "question": "怎样为“第1部分 Kotlin简介”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存版本卡、六章依赖图、Java互操作边界、最小工程和概念回收表。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-part1-kotlin-introduction-q3",
    "chapter": "kia1-part1-kotlin-introduction",
    "level": 3,
    "question": "“第1部分 Kotlin简介”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把第1部分读成语法速查表，跳过空安全、静态类型和Java互操作背后的设计约束”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-part1-kotlin-introduction-q4",
    "chapter": "kia1-part1-kotlin-introduction",
    "level": 3,
    "question": "为什么“第1部分 Kotlin简介”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-part1-kotlin-introduction-q5",
    "chapter": "kia1-part1-kotlin-introduction",
    "level": 4,
    "question": "“第1部分 Kotlin简介”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-part1-kotlin-introduction-q6",
    "chapter": "kia1-part1-kotlin-introduction",
    "level": 4,
    "question": "“第1部分 Kotlin简介”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及版本卡、六章依赖图、Java互操作边界、最小工程和概念回收表。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-01-kotlin-what-and-why-q1",
    "chapter": "kia1-01-kotlin-what-and-why",
    "level": 1,
    "question": "“第1章 Kotlin：定义和目的”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖23个节点，从“第1章 Kotlin：定义和目的”到“1.6 小结”；主线是从目标平台、静态类型、函数式与面向对象、设计哲学和工具链解释Kotlin为何能渐进进入Java工程，证据为Hello World产物、字节码目标、平台矩阵、设计取舍表和Java调用记录。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-01-kotlin-what-and-why-q2",
    "chapter": "kia1-01-kotlin-what-and-why",
    "level": 2,
    "question": "怎样为“第1章 Kotlin：定义和目的”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存Hello World产物、字节码目标、平台矩阵、设计取舍表和Java调用记录。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-01-kotlin-what-and-why-q3",
    "chapter": "kia1-01-kotlin-what-and-why",
    "level": 3,
    "question": "“第1章 Kotlin：定义和目的”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把Kotlin理解成只面向Android的脚本语言，或把简洁误解为放弃静态类型约束”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-01-kotlin-what-and-why-q4",
    "chapter": "kia1-01-kotlin-what-and-why",
    "level": 3,
    "question": "为什么“第1章 Kotlin：定义和目的”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-01-kotlin-what-and-why-q5",
    "chapter": "kia1-01-kotlin-what-and-why",
    "level": 4,
    "question": "“第1章 Kotlin：定义和目的”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-01-kotlin-what-and-why-q6",
    "chapter": "kia1-01-kotlin-what-and-why",
    "level": 4,
    "question": "“第1章 Kotlin：定义和目的”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及Hello World产物、字节码目标、平台矩阵、设计取舍表和Java调用记录。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-02-kotlin-basics-q1",
    "chapter": "kia1-02-kotlin-basics",
    "level": 1,
    "question": "“第2章 Kotlin基础”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖27个节点，从“第2章 Kotlin基础”到“2.6 小结”；主线是用表达式、变量、属性、when、区间、循环和异常建立Kotlin控制流与数据模型，证据为表达式求值轨迹、属性访问器、when穷尽表、区间边界测试和异常路径。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-02-kotlin-basics-q2",
    "chapter": "kia1-02-kotlin-basics",
    "level": 2,
    "question": "怎样为“第2章 Kotlin基础”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存表达式求值轨迹、属性访问器、when穷尽表、区间边界测试和异常路径。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-02-kotlin-basics-q3",
    "chapter": "kia1-02-kotlin-basics",
    "level": 3,
    "question": "“第2章 Kotlin基础”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“机械照搬Java语句思维，忽略Kotlin中if、when和try可产生值以及属性不等于字段”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-02-kotlin-basics-q4",
    "chapter": "kia1-02-kotlin-basics",
    "level": 3,
    "question": "为什么“第2章 Kotlin基础”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-02-kotlin-basics-q5",
    "chapter": "kia1-02-kotlin-basics",
    "level": 4,
    "question": "“第2章 Kotlin基础”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-02-kotlin-basics-q6",
    "chapter": "kia1-02-kotlin-basics",
    "level": 4,
    "question": "“第2章 Kotlin基础”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及表达式求值轨迹、属性访问器、when穷尽表、区间边界测试和异常路径。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-03-defining-calling-functions-q1",
    "chapter": "kia1-03-defining-calling-functions",
    "level": 1,
    "question": "“第3章 函数的定义与调用”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖22个节点，从“第3章 函数的定义与调用”到“3.7 小结”；主线是用命名参数、默认值、顶层声明、扩展、可变参数、中缀调用和局部函数设计可读API，证据为调用点对照、Java静态入口、扩展解析实验、字符串解析测试和局部校验函数。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-03-defining-calling-functions-q2",
    "chapter": "kia1-03-defining-calling-functions",
    "level": 2,
    "question": "怎样为“第3章 函数的定义与调用”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存调用点对照、Java静态入口、扩展解析实验、字符串解析测试和局部校验函数。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-03-defining-calling-functions-q3",
    "chapter": "kia1-03-defining-calling-functions",
    "level": 3,
    "question": "“第3章 函数的定义与调用”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“认为扩展函数能真正修改或覆盖接收者类的方法，忽略它按声明类型静态解析”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-03-defining-calling-functions-q4",
    "chapter": "kia1-03-defining-calling-functions",
    "level": 3,
    "question": "为什么“第3章 函数的定义与调用”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-03-defining-calling-functions-q5",
    "chapter": "kia1-03-defining-calling-functions",
    "level": 4,
    "question": "“第3章 函数的定义与调用”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-03-defining-calling-functions-q6",
    "chapter": "kia1-03-defining-calling-functions",
    "level": 4,
    "question": "“第3章 函数的定义与调用”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及调用点对照、Java静态入口、扩展解析实验、字符串解析测试和局部校验函数。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-04-classes-objects-interfaces-q1",
    "chapter": "kia1-04-classes-objects-interfaces",
    "level": 1,
    "question": "“第4章 类、对象和接口”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖23个节点，从“第4章 类、对象和接口”到“4.5 小结”；主线是从默认final、可见性、嵌套类、密封类、构造、数据类、委托和对象声明建立类型设计模型，证据为继承许可表、构造顺序、数据类方法快照、委托转发记录和对象身份测试。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-04-classes-objects-interfaces-q2",
    "chapter": "kia1-04-classes-objects-interfaces",
    "level": 2,
    "question": "怎样为“第4章 类、对象和接口”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存继承许可表、构造顺序、数据类方法快照、委托转发记录和对象身份测试。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-04-classes-objects-interfaces-q3",
    "chapter": "kia1-04-classes-objects-interfaces",
    "level": 3,
    "question": "“第4章 类、对象和接口”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“沿用Java默认可继承和内部类语义，或把data class、object和companion object视为纯语法糖”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-04-classes-objects-interfaces-q4",
    "chapter": "kia1-04-classes-objects-interfaces",
    "level": 3,
    "question": "为什么“第4章 类、对象和接口”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-04-classes-objects-interfaces-q5",
    "chapter": "kia1-04-classes-objects-interfaces",
    "level": 4,
    "question": "“第4章 类、对象和接口”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-04-classes-objects-interfaces-q6",
    "chapter": "kia1-04-classes-objects-interfaces",
    "level": 4,
    "question": "“第4章 类、对象和接口”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及继承许可表、构造顺序、数据类方法快照、委托转发记录和对象身份测试。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-05-programming-with-lambdas-q1",
    "chapter": "kia1-05-programming-with-lambdas",
    "level": 1,
    "question": "“第5章 Lambda编程”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖22个节点，从“第5章 Lambda编程”到“5.6 小结”；主线是用lambda、成员引用、集合函数式API、序列、SAM转换和带接收者lambda控制数据流与求值时机，证据为集合变换轨迹、捕获变量记录、序列求值计数、SAM边界和with/apply接收者表。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-05-programming-with-lambdas-q2",
    "chapter": "kia1-05-programming-with-lambdas",
    "level": 2,
    "question": "怎样为“第5章 Lambda编程”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存集合变换轨迹、捕获变量记录、序列求值计数、SAM边界和with/apply接收者表。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-05-programming-with-lambdas-q3",
    "chapter": "kia1-05-programming-with-lambdas",
    "level": 3,
    "question": "“第5章 Lambda编程”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把序列视为总会更快，或忽略lambda捕获、非局部返回和Java SAM对象创建的边界”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-05-programming-with-lambdas-q4",
    "chapter": "kia1-05-programming-with-lambdas",
    "level": 3,
    "question": "为什么“第5章 Lambda编程”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-05-programming-with-lambdas-q5",
    "chapter": "kia1-05-programming-with-lambdas",
    "level": 4,
    "question": "“第5章 Lambda编程”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-05-programming-with-lambdas-q6",
    "chapter": "kia1-05-programming-with-lambdas",
    "level": 4,
    "question": "“第5章 Lambda编程”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及集合变换轨迹、捕获变量记录、序列求值计数、SAM边界和with/apply接收者表。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-06-kotlin-type-system-q1",
    "chapter": "kia1-06-kotlin-type-system",
    "level": 1,
    "question": "“第6章 Kotlin的类型系统”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖27个节点，从“第6章 Kotlin的类型系统”到“6.4 小结”；主线是把可空性、基本类型、Any、Unit、Nothing、集合可变性、平台类型和数组连接成跨Java边界的类型证明，证据为空值流图、平台类型审计、集合可变性合同、数字转换测试和数组装箱对照。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-06-kotlin-type-system-q2",
    "chapter": "kia1-06-kotlin-type-system",
    "level": 2,
    "question": "怎样为“第6章 Kotlin的类型系统”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存空值流图、平台类型审计、集合可变性合同、数字转换测试和数组装箱对照。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-06-kotlin-type-system-q3",
    "chapter": "kia1-06-kotlin-type-system",
    "level": 3,
    "question": "“第6章 Kotlin的类型系统”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“用非空断言掩盖未知空值，或把只读集合误当作不可变集合并信任未经标注的Java平台类型”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-06-kotlin-type-system-q4",
    "chapter": "kia1-06-kotlin-type-system",
    "level": 3,
    "question": "为什么“第6章 Kotlin的类型系统”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-06-kotlin-type-system-q5",
    "chapter": "kia1-06-kotlin-type-system",
    "level": 4,
    "question": "“第6章 Kotlin的类型系统”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-06-kotlin-type-system-q6",
    "chapter": "kia1-06-kotlin-type-system",
    "level": 4,
    "question": "“第6章 Kotlin的类型系统”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及空值流图、平台类型审计、集合可变性合同、数字转换测试和数组装箱对照。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-part2-embracing-kotlin-q1",
    "chapter": "kia1-part2-embracing-kotlin",
    "level": 1,
    "question": "“第2部分 拥抱Kotlin”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖1个节点，从“第2部分 拥抱Kotlin”到“第2部分 拥抱Kotlin”；主线是从使用现有API转向设计自己的API，以约定、高阶函数、泛型、反射和DSL组织可复用抽象，证据为五章依赖图、抽象成本表、调用点样例、运行时边界和API验收清单。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-part2-embracing-kotlin-q2",
    "chapter": "kia1-part2-embracing-kotlin",
    "level": 2,
    "question": "怎样为“第2部分 拥抱Kotlin”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存五章依赖图、抽象成本表、调用点样例、运行时边界和API验收清单。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-part2-embracing-kotlin-q3",
    "chapter": "kia1-part2-embracing-kotlin",
    "level": 3,
    "question": "“第2部分 拥抱Kotlin”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“为了追求Kotlin风格堆叠运算符、内联、反射和DSL，使调用点含义与运行代价不可见”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-part2-embracing-kotlin-q4",
    "chapter": "kia1-part2-embracing-kotlin",
    "level": 3,
    "question": "为什么“第2部分 拥抱Kotlin”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-part2-embracing-kotlin-q5",
    "chapter": "kia1-part2-embracing-kotlin",
    "level": 4,
    "question": "“第2部分 拥抱Kotlin”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-part2-embracing-kotlin-q6",
    "chapter": "kia1-part2-embracing-kotlin",
    "level": 4,
    "question": "“第2部分 拥抱Kotlin”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及五章依赖图、抽象成本表、调用点样例、运行时边界和API验收清单。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-07-operator-overloading-conventions-q1",
    "chapter": "kia1-07-operator-overloading-conventions",
    "level": 1,
    "question": "“第7章 运算符重载及其他约定”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖23个节点，从“第7章 运算符重载及其他约定”到“7.6 小结”；主线是把运算符、比较、集合访问、区间、迭代、解构和委托属性还原为具名约定与可验证调用，证据为语法到函数映射、相等性合同、区间边界、解构顺序和委托get/set轨迹。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-07-operator-overloading-conventions-q2",
    "chapter": "kia1-07-operator-overloading-conventions",
    "level": 2,
    "question": "怎样为“第7章 运算符重载及其他约定”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存语法到函数映射、相等性合同、区间边界、解构顺序和委托get/set轨迹。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-07-operator-overloading-conventions-q3",
    "chapter": "kia1-07-operator-overloading-conventions",
    "level": 3,
    "question": "“第7章 运算符重载及其他约定”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“重载出违背直觉的运算符，或忽略equals/hashCode一致性、委托所有者和属性元数据”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-07-operator-overloading-conventions-q4",
    "chapter": "kia1-07-operator-overloading-conventions",
    "level": 3,
    "question": "为什么“第7章 运算符重载及其他约定”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-07-operator-overloading-conventions-q5",
    "chapter": "kia1-07-operator-overloading-conventions",
    "level": 4,
    "question": "“第7章 运算符重载及其他约定”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-07-operator-overloading-conventions-q6",
    "chapter": "kia1-07-operator-overloading-conventions",
    "level": 4,
    "question": "“第7章 运算符重载及其他约定”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及语法到函数映射、相等性合同、区间边界、解构顺序和委托get/set轨迹。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-08-higher-order-functions-q1",
    "chapter": "kia1-08-higher-order-functions",
    "level": 1,
    "question": "“第8章 高阶函数：Lambda作为形参和返回值”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖19个节点，从“第8章 高阶函数：Lambda作为形参和返回值”到“8.4 小结”；主线是从函数类型、Java调用、返回函数、内联代价和lambda控制流建立高阶函数的源码与运行时模型，证据为函数类型签名、对象分配对照、内联字节码、资源关闭测试和返回路径图。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-08-higher-order-functions-q2",
    "chapter": "kia1-08-higher-order-functions",
    "level": 2,
    "question": "怎样为“第8章 高阶函数：Lambda作为形参和返回值”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存函数类型签名、对象分配对照、内联字节码、资源关闭测试和返回路径图。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-08-higher-order-functions-q3",
    "chapter": "kia1-08-higher-order-functions",
    "level": 3,
    "question": "“第8章 高阶函数：Lambda作为形参和返回值”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把inline当作无条件优化，忽略代码膨胀、可内联限制、非局部返回和资源释放合同”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-08-higher-order-functions-q4",
    "chapter": "kia1-08-higher-order-functions",
    "level": 3,
    "question": "为什么“第8章 高阶函数：Lambda作为形参和返回值”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-08-higher-order-functions-q5",
    "chapter": "kia1-08-higher-order-functions",
    "level": 4,
    "question": "“第8章 高阶函数：Lambda作为形参和返回值”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-08-higher-order-functions-q6",
    "chapter": "kia1-08-higher-order-functions",
    "level": 4,
    "question": "“第8章 高阶函数：Lambda作为形参和返回值”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及函数类型签名、对象分配对照、内联字节码、资源关闭测试和返回路径图。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-09-generics-q1",
    "chapter": "kia1-09-generics",
    "level": 1,
    "question": "“第9章 泛型”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖19个节点，从“第9章 泛型”到“9.4 小结”；主线是从约束、擦除、实化、协变、逆变、使用点变型和星号投影证明泛型API的读写安全，证据为类型约束样例、擦除反例、实化字节码边界、生产者消费者表和星号投影测试。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-09-generics-q2",
    "chapter": "kia1-09-generics",
    "level": 2,
    "question": "怎样为“第9章 泛型”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存类型约束样例、擦除反例、实化字节码边界、生产者消费者表和星号投影测试。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-09-generics-q3",
    "chapter": "kia1-09-generics",
    "level": 3,
    "question": "“第9章 泛型”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把声明点与使用点变型混用，或认为reified能突破所有JVM擦除并在任意位置取得类型实参”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-09-generics-q4",
    "chapter": "kia1-09-generics",
    "level": 3,
    "question": "为什么“第9章 泛型”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-09-generics-q5",
    "chapter": "kia1-09-generics",
    "level": 4,
    "question": "“第9章 泛型”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-09-generics-q6",
    "chapter": "kia1-09-generics",
    "level": 4,
    "question": "“第9章 泛型”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及类型约束样例、擦除反例、实化字节码边界、生产者消费者表和星号投影测试。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-10-annotations-reflection-q1",
    "chapter": "kia1-10-annotations-reflection",
    "level": 1,
    "question": "“第10章 注解与反射”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖16个节点，从“第10章 注解与反射”到“10.3 小结”；主线是以JKid序列化链连接注解目标、元注解、类参数、KClass、KCallable、对象序列化和反序列化，证据为注解落点表、反射成员清单、JSON往返测试、构造参数映射和失败输入记录。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-10-annotations-reflection-q2",
    "chapter": "kia1-10-annotations-reflection",
    "level": 2,
    "question": "怎样为“第10章 注解与反射”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存注解落点表、反射成员清单、JSON往返测试、构造参数映射和失败输入记录。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-10-annotations-reflection-q3",
    "chapter": "kia1-10-annotations-reflection",
    "level": 3,
    "question": "“第10章 注解与反射”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只验证序列化的正常输出，忽略注解use-site目标、缺失参数、类型不匹配和反射可见性”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-10-annotations-reflection-q4",
    "chapter": "kia1-10-annotations-reflection",
    "level": 3,
    "question": "为什么“第10章 注解与反射”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-10-annotations-reflection-q5",
    "chapter": "kia1-10-annotations-reflection",
    "level": 4,
    "question": "“第10章 注解与反射”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-10-annotations-reflection-q6",
    "chapter": "kia1-10-annotations-reflection",
    "level": 4,
    "question": "“第10章 注解与反射”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及注解落点表、反射成员清单、JSON往返测试、构造参数映射和失败输入记录。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-11-dsl-construction-q1",
    "chapter": "kia1-11-dsl-construction",
    "level": 1,
    "question": "“第11章 DSL构建”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖20个节点，从“第11章 DSL构建”到“11.5 小结”；主线是从内部DSL、带接收者lambda、HTML构建器、invoke约定、测试、日期、SQL与Anko案例设计受约束语言，证据为调用点语法树、接收者作用域、HTML结构测试、invoke解析和DSL误用反例。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-11-dsl-construction-q2",
    "chapter": "kia1-11-dsl-construction",
    "level": 2,
    "question": "怎样为“第11章 DSL构建”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存调用点语法树、接收者作用域、HTML结构测试、invoke解析和DSL误用反例。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-11-dsl-construction-q3",
    "chapter": "kia1-11-dsl-construction",
    "level": 3,
    "question": "“第11章 DSL构建”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“追求自然语言外观却隐藏接收者、求值顺序和副作用，使DSL比普通API更难调试”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-11-dsl-construction-q4",
    "chapter": "kia1-11-dsl-construction",
    "level": 3,
    "question": "为什么“第11章 DSL构建”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-11-dsl-construction-q5",
    "chapter": "kia1-11-dsl-construction",
    "level": 4,
    "question": "“第11章 DSL构建”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-11-dsl-construction-q6",
    "chapter": "kia1-11-dsl-construction",
    "level": 4,
    "question": "“第11章 DSL构建”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及调用点语法树、接收者作用域、HTML结构测试、invoke解析和DSL误用反例。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-appendix-a-building-projects-q1",
    "chapter": "kia1-appendix-a-building-projects",
    "level": 1,
    "question": "“附录A 构建Kotlin项目”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖4个节点，从“附录A 构建Kotlin项目”到“A.3 使用Ant构建Kotlin代码”；主线是按2017年工具链比较Gradle、Maven和Ant如何编译Kotlin源码、测试与Android目标，证据为源码目录、依赖配置、三套构建命令、产物清单和版本锁定记录。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-appendix-a-building-projects-q2",
    "chapter": "kia1-appendix-a-building-projects",
    "level": 2,
    "question": "怎样为“附录A 构建Kotlin项目”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存源码目录、依赖配置、三套构建命令、产物清单和版本锁定记录。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-appendix-a-building-projects-q3",
    "chapter": "kia1-appendix-a-building-projects",
    "level": 3,
    "question": "“附录A 构建Kotlin项目”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把现代Gradle Kotlin DSL配置倒填为原书内容，或不锁插件版本就比较构建结果”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-appendix-a-building-projects-q4",
    "chapter": "kia1-appendix-a-building-projects",
    "level": 3,
    "question": "为什么“附录A 构建Kotlin项目”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-appendix-a-building-projects-q5",
    "chapter": "kia1-appendix-a-building-projects",
    "level": 4,
    "question": "“附录A 构建Kotlin项目”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-appendix-a-building-projects-q6",
    "chapter": "kia1-appendix-a-building-projects",
    "level": 4,
    "question": "“附录A 构建Kotlin项目”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及源码目录、依赖配置、三套构建命令、产物清单和版本锁定记录。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-appendix-b-documenting-code-q1",
    "chapter": "kia1-appendix-b-documenting-code",
    "level": 1,
    "question": "“附录B Kotlin代码的文档化”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖3个节点，从“附录B Kotlin代码的文档化”到“B.2 生成API文档”；主线是用KDoc的Markdown、链接与标签描述公开合同，并生成可核查的模块API文档，证据为KDoc样例、参数与返回标签、链接解析、文档生成命令和缺失合同清单。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-appendix-b-documenting-code-q2",
    "chapter": "kia1-appendix-b-documenting-code",
    "level": 2,
    "question": "怎样为“附录B Kotlin代码的文档化”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存KDoc样例、参数与返回标签、链接解析、文档生成命令和缺失合同清单。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-appendix-b-documenting-code-q3",
    "chapter": "kia1-appendix-b-documenting-code",
    "level": 3,
    "question": "“附录B Kotlin代码的文档化”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把注释当作实现复述，或生成文档后不检查链接、公开边界和版本对应关系”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-appendix-b-documenting-code-q4",
    "chapter": "kia1-appendix-b-documenting-code",
    "level": 3,
    "question": "为什么“附录B Kotlin代码的文档化”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-appendix-b-documenting-code-q5",
    "chapter": "kia1-appendix-b-documenting-code",
    "level": 4,
    "question": "“附录B Kotlin代码的文档化”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-appendix-b-documenting-code-q6",
    "chapter": "kia1-appendix-b-documenting-code",
    "level": 4,
    "question": "“附录B Kotlin代码的文档化”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及KDoc样例、参数与返回标签、链接解析、文档生成命令和缺失合同清单。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-appendix-c-kotlin-ecosystem-q1",
    "chapter": "kia1-appendix-c-kotlin-ecosystem",
    "level": 1,
    "question": "“附录C Kotlin生态系统”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖9个节点，从“附录C Kotlin生态系统”到“C.8 桌面编程”；主线是按2017年快照考察测试、依赖注入、JSON、HTTP、Web、数据库、工具与桌面库，并与Java生态互操作，证据为类别矩阵、维护状态、Java兼容性试验、替代方案和时间边界说明。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-appendix-c-kotlin-ecosystem-q2",
    "chapter": "kia1-appendix-c-kotlin-ecosystem",
    "level": 2,
    "question": "怎样为“附录C Kotlin生态系统”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存类别矩阵、维护状态、Java兼容性试验、替代方案和时间边界说明。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-appendix-c-kotlin-ecosystem-q3",
    "chapter": "kia1-appendix-c-kotlin-ecosystem",
    "level": 3,
    "question": "“附录C Kotlin生态系统”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把2017年库清单当作当前推荐，或因使用Kotlin就排除成熟Java库与互操作扩展”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-appendix-c-kotlin-ecosystem-q4",
    "chapter": "kia1-appendix-c-kotlin-ecosystem",
    "level": 3,
    "question": "为什么“附录C Kotlin生态系统”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-appendix-c-kotlin-ecosystem-q5",
    "chapter": "kia1-appendix-c-kotlin-ecosystem",
    "level": 4,
    "question": "“附录C Kotlin生态系统”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-appendix-c-kotlin-ecosystem-q6",
    "chapter": "kia1-appendix-c-kotlin-ecosystem",
    "level": 4,
    "question": "“附录C Kotlin生态系统”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及类别矩阵、维护状态、Java兼容性试验、替代方案和时间边界说明。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-index-figures-tables-listings-q1",
    "chapter": "kia1-index-figures-tables-listings",
    "level": 1,
    "question": "“索引与图表代码清单”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖4个节点，从“索引”到“代码清单”；主线是把索引、插图、表格和代码清单作为反向检索入口，验证概念是否能定位到定义、调用点和证据，证据为术语索引、插图定位、表格定位、代码清单定位和跨章检索任务。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-index-figures-tables-listings-q2",
    "chapter": "kia1-index-figures-tables-listings",
    "level": 2,
    "question": "怎样为“索引与图表代码清单”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存术语索引、插图定位、表格定位、代码清单定位和跨章检索任务。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-index-figures-tables-listings-q3",
    "chapter": "kia1-index-figures-tables-listings",
    "level": 3,
    "question": "“索引与图表代码清单”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把参考清单视为可忽略附属物，导致只能顺序阅读而无法从问题反查机制与示例”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-index-figures-tables-listings-q4",
    "chapter": "kia1-index-figures-tables-listings",
    "level": 3,
    "question": "为什么“索引与图表代码清单”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-index-figures-tables-listings-q5",
    "chapter": "kia1-index-figures-tables-listings",
    "level": 4,
    "question": "“索引与图表代码清单”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-index-figures-tables-listings-q6",
    "chapter": "kia1-index-figures-tables-listings",
    "level": 4,
    "question": "“索引与图表代码清单”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及术语索引、插图定位、表格定位、代码清单定位和跨章检索任务。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kia1-official-final-review-q1",
    "chapter": "kia1-official-final-review",
    "level": 1,
    "question": "“《Kotlin实战》第1版全书总复习”覆盖哪些权威目录节点与语言机制主线？",
    "answer": "覆盖17个节点，从“第1部分 Kotlin简介”到“索引与图表代码清单”；主线是从语法、类型、抽象、运行时与Java互操作五条链路回放全部正式节点并完成迁移判断，证据为节点闭环表、跨章实现、反例集、Java双向调用、口述答辩和版本迁移报告。",
    "tags": [
      "官方目录",
      "语言机制"
    ]
  },
  {
    "id": "kia1-official-final-review-q2",
    "chapter": "kia1-official-final-review",
    "level": 2,
    "question": "怎样为“《Kotlin实战》第1版全书总复习”建立最小的Kotlin与Java双向实验？",
    "answer": "锁定Kotlin、JVM和构建版本，写明输入、静态类型、Kotlin调用点、Java调用点与期望结果，再保存节点闭环表、跨章实现、反例集、Java双向调用、口述答辩和版本迁移报告。",
    "tags": [
      "实验",
      "互操作"
    ]
  },
  {
    "id": "kia1-official-final-review-q3",
    "chapter": "kia1-official-final-review",
    "level": 3,
    "question": "“《Kotlin实战》第1版全书总复习”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只会复述语法而不能解释解析方式、运行时代价、Java边界、失败条件与API设计取舍”；只改变null、静态接收者、泛型实参、Java调用或反射输入，结果偏离即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kia1-official-final-review-q4",
    "chapter": "kia1-official-final-review",
    "level": 3,
    "question": "为什么“《Kotlin实战》第1版全书总复习”的一次正常输出不足以证明语言机制？",
    "answer": "一次输出没有证明编译选择、求值次数、JVM擦除、Java调用、异常和版本边界；必须保留源码、字节码或调用轨迹及失败断言。",
    "tags": [
      "运行时",
      "诊断"
    ]
  },
  {
    "id": "kia1-official-final-review-q5",
    "chapter": "kia1-official-final-review",
    "level": 4,
    "question": "“《Kotlin实战》第1版全书总复习”迁移到现代Kotlin时如何避免改写第1版？",
    "answer": "先保存Kotlin 1.0行为基线，再一次只改变编译器、标准库、JVM目标、构建插件或新版特性之一；协程与Flow只进入第2版差异账本。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kia1-official-final-review-q6",
    "chapter": "kia1-official-final-review",
    "level": 4,
    "question": "“《Kotlin实战》第1版全书总复习”达到独立交接需要哪些证据？",
    "answer": "需要版本卡、源码、构建命令、Kotlin与Java调用点、正常和失败输出、目录映射及节点闭环表、跨章实现、反例集、Java双向调用、口述答辩和版本迁移报告。",
    "tags": [
      "验收",
      "交接"
    ]
  }
];
