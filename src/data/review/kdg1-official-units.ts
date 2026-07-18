import type { ReviewQuestion } from "./types";

export const kdg1OfficialUnitQuestions: ReviewQuestion[] = [
  {
    "id": "kdg1-official-learning-map-q1",
    "chapter": "kdg1-official-learning-map",
    "level": 1,
    "question": "“《Kotlin编程权威指南》权威学习地图”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖27个节点，从“Introducing Kotlin”到“Index”；核心是沿Kotlin 1.2原书顺序串联语言基础、值与集合、对象模型、函数式编程、Java互操作、Android和协程入门，证据为27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-official-learning-map-q2",
    "chapter": "kdg1-official-learning-map",
    "level": 2,
    "question": "怎样为“《Kotlin编程权威指南》权威学习地图”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-official-learning-map-q3",
    "chapter": "kdg1-official-learning-map",
    "level": 3,
    "question": "“《Kotlin编程权威指南》权威学习地图”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把23章压成几个主题页，或混入第二版与现代Android内容”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-official-learning-map-q4",
    "chapter": "kdg1-official-learning-map",
    "level": 3,
    "question": "为什么“《Kotlin编程权威指南》权威学习地图”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-official-learning-map-q5",
    "chapter": "kdg1-official-learning-map",
    "level": 4,
    "question": "“《Kotlin编程权威指南》权威学习地图”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-official-learning-map-q6",
    "chapter": "kdg1-official-learning-map",
    "level": 4,
    "question": "“《Kotlin编程权威指南》权威学习地图”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭27单元覆盖矩阵、版本边界、依赖路径、实验账本和整书验收表重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-introducing-kotlin-q1",
    "chapter": "kdg1-introducing-kotlin",
    "level": 1,
    "question": "“Introducing Kotlin”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖9个节点，从“Introducing Kotlin”到“Looking Forward”；核心是明确Kotlin 1.2、JVM与IntelliJ基线，并建立从语言特性到可运行程序的学习合同，证据为版本指纹、目标平台说明、最小程序、学习顺序与迁移边界。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-introducing-kotlin-q2",
    "chapter": "kdg1-introducing-kotlin",
    "level": 2,
    "question": "怎样为“Introducing Kotlin”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存版本指纹、目标平台说明、最小程序、学习顺序与迁移边界。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-introducing-kotlin-q3",
    "chapter": "kdg1-introducing-kotlin",
    "level": 3,
    "question": "“Introducing Kotlin”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把当前Kotlin或Android惯例倒灌进2018年原书”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-introducing-kotlin-q4",
    "chapter": "kdg1-introducing-kotlin",
    "level": 3,
    "question": "为什么“Introducing Kotlin”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-introducing-kotlin-q5",
    "chapter": "kdg1-introducing-kotlin",
    "level": 4,
    "question": "“Introducing Kotlin”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-introducing-kotlin-q6",
    "chapter": "kdg1-introducing-kotlin",
    "level": 4,
    "question": "“Introducing Kotlin”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭版本指纹、目标平台说明、最小程序、学习顺序与迁移边界重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-01-first-application-q1",
    "chapter": "kdg1-01-first-application",
    "level": 1,
    "question": "“1. Your First Kotlin Application”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖10个节点，从“1. Your First Kotlin Application”到“Challenge: REPL Arithmetic”；核心是从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行，证据为IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-01-first-application-q2",
    "chapter": "kdg1-01-first-application",
    "level": 2,
    "question": "怎样为“1. Your First Kotlin Application”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-01-first-application-q3",
    "chapter": "kdg1-01-first-application",
    "level": 3,
    "question": "“1. Your First Kotlin Application”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只依赖IDE绿色运行按钮而不知道编译产物与目标JVM”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-01-first-application-q4",
    "chapter": "kdg1-01-first-application",
    "level": 3,
    "question": "为什么“1. Your First Kotlin Application”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-01-first-application-q5",
    "chapter": "kdg1-01-first-application",
    "level": 4,
    "question": "“1. Your First Kotlin Application”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-01-first-application-q6",
    "chapter": "kdg1-01-first-application",
    "level": 4,
    "question": "“1. Your First Kotlin Application”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-02-variables-types-q1",
    "chapter": "kdg1-02-variables-types",
    "level": 1,
    "question": "“2. Variables, Constants, and Types”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖12个节点，从“2. Variables, Constants, and Types”到“Challenge: Magic Mirror”；核心是用val、var、显式类型、类型推断与const建立编译期可检查的状态边界，证据为类型表、可变性表、编译失败样例、常量字节码与推断记录。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-02-variables-types-q2",
    "chapter": "kdg1-02-variables-types",
    "level": 2,
    "question": "怎样为“2. Variables, Constants, and Types”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存类型表、可变性表、编译失败样例、常量字节码与推断记录。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-02-variables-types-q3",
    "chapter": "kdg1-02-variables-types",
    "level": 3,
    "question": "“2. Variables, Constants, and Types”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把val误解为对象深度不可变，或把类型推断误解为动态类型”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-02-variables-types-q4",
    "chapter": "kdg1-02-variables-types",
    "level": 3,
    "question": "为什么“2. Variables, Constants, and Types”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-02-variables-types-q5",
    "chapter": "kdg1-02-variables-types",
    "level": 4,
    "question": "“2. Variables, Constants, and Types”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-02-variables-types-q6",
    "chapter": "kdg1-02-variables-types",
    "level": 4,
    "question": "“2. Variables, Constants, and Types”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭类型表、可变性表、编译失败样例、常量字节码与推断记录重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-03-conditionals-q1",
    "chapter": "kdg1-03-conditionals",
    "level": 1,
    "question": "“3. Conditionals”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖14个节点，从“3. Conditionals”到“Challenge: Configurable Status Format”；核心是把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表，证据为输入分区、分支表、边界测试、穷尽性检查和格式化输出。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-03-conditionals-q2",
    "chapter": "kdg1-03-conditionals",
    "level": 2,
    "question": "怎样为“3. Conditionals”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存输入分区、分支表、边界测试、穷尽性检查和格式化输出。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-03-conditionals-q3",
    "chapter": "kdg1-03-conditionals",
    "level": 3,
    "question": "“3. Conditionals”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“分支重叠、边界遗漏或依赖不可见副作用”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-03-conditionals-q4",
    "chapter": "kdg1-03-conditionals",
    "level": 3,
    "question": "为什么“3. Conditionals”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-03-conditionals-q5",
    "chapter": "kdg1-03-conditionals",
    "level": 4,
    "question": "“3. Conditionals”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-03-conditionals-q6",
    "chapter": "kdg1-03-conditionals",
    "level": 4,
    "question": "“3. Conditionals”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭输入分区、分支表、边界测试、穷尽性检查和格式化输出重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-04-functions-q1",
    "chapter": "kdg1-04-functions",
    "level": 1,
    "question": "“4. Functions”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖24个节点，从“4. Functions”到“Challenge: Inebriation Status”；核心是以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图，证据为函数合同、调用样例、边界测试、作用域图和重构前后对照。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-04-functions-q2",
    "chapter": "kdg1-04-functions",
    "level": 2,
    "question": "怎样为“4. Functions”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存函数合同、调用样例、边界测试、作用域图和重构前后对照。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-04-functions-q3",
    "chapter": "kdg1-04-functions",
    "level": 3,
    "question": "“4. Functions”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“用默认参数隐藏必填业务事实，或让Unit函数承担不可见副作用”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-04-functions-q4",
    "chapter": "kdg1-04-functions",
    "level": 3,
    "question": "为什么“4. Functions”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-04-functions-q5",
    "chapter": "kdg1-04-functions",
    "level": 4,
    "question": "“4. Functions”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-04-functions-q6",
    "chapter": "kdg1-04-functions",
    "level": 4,
    "question": "“4. Functions”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭函数合同、调用样例、边界测试、作用域图和重构前后对照重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-05-anonymous-functions-q1",
    "chapter": "kdg1-05-anonymous-functions",
    "level": 1,
    "question": "“5. Anonymous Functions and the Function Type”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖15个节点，从“5. Anonymous Functions and the Function Type”到“For the More Curious: Lambdas vs Anonymous Inner Classes”；核心是把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同，证据为函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-05-anonymous-functions-q2",
    "chapter": "kdg1-05-anonymous-functions",
    "level": 2,
    "question": "怎样为“5. Anonymous Functions and the Function Type”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-05-anonymous-functions-q3",
    "chapter": "kdg1-05-anonymous-functions",
    "level": 3,
    "question": "“5. Anonymous Functions and the Function Type”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“闭包意外捕获可变状态，导致调用顺序影响结果”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-05-anonymous-functions-q4",
    "chapter": "kdg1-05-anonymous-functions",
    "level": 3,
    "question": "为什么“5. Anonymous Functions and the Function Type”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-05-anonymous-functions-q5",
    "chapter": "kdg1-05-anonymous-functions",
    "level": 4,
    "question": "“5. Anonymous Functions and the Function Type”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-05-anonymous-functions-q6",
    "chapter": "kdg1-05-anonymous-functions",
    "level": 4,
    "question": "“5. Anonymous Functions and the Function Type”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-06-null-safety-exceptions-q1",
    "chapter": "kdg1-06-null-safety-exceptions",
    "level": 1,
    "question": "“6. Null Safety and Exceptions”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖18个节点，从“6. Null Safety and Exceptions”到“For the More Curious: How Is Nullability Enforced?”；核心是用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化，证据为可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-06-null-safety-exceptions-q2",
    "chapter": "kdg1-06-null-safety-exceptions",
    "level": 2,
    "question": "怎样为“6. Null Safety and Exceptions”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-06-null-safety-exceptions-q3",
    "chapter": "kdg1-06-null-safety-exceptions",
    "level": 3,
    "question": "“6. Null Safety and Exceptions”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“用双感叹号绕过类型系统，或吞掉异常后伪装成功”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-06-null-safety-exceptions-q4",
    "chapter": "kdg1-06-null-safety-exceptions",
    "level": 3,
    "question": "为什么“6. Null Safety and Exceptions”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-06-null-safety-exceptions-q5",
    "chapter": "kdg1-06-null-safety-exceptions",
    "level": 4,
    "question": "“6. Null Safety and Exceptions”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-06-null-safety-exceptions-q6",
    "chapter": "kdg1-06-null-safety-exceptions",
    "level": 4,
    "question": "“6. Null Safety and Exceptions”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-07-strings-q1",
    "chapter": "kdg1-07-strings",
    "level": 1,
    "question": "“7. Strings”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖10个节点，从“7. Strings”到“Challenge: Improving DragonSpeak”；核心是掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界，证据为输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-07-strings-q2",
    "chapter": "kdg1-07-strings",
    "level": 2,
    "question": "怎样为“7. Strings”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-07-strings-q3",
    "chapter": "kdg1-07-strings",
    "level": 3,
    "question": "“7. Strings”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“按UTF-16索引误判用户可见字符，或忽略区域与大小写规则”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-07-strings-q4",
    "chapter": "kdg1-07-strings",
    "level": 3,
    "question": "为什么“7. Strings”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-07-strings-q5",
    "chapter": "kdg1-07-strings",
    "level": 4,
    "question": "“7. Strings”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-07-strings-q6",
    "chapter": "kdg1-07-strings",
    "level": 4,
    "question": "“7. Strings”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-08-numbers-q1",
    "chapter": "kdg1-08-numbers",
    "level": 1,
    "question": "“8. Numbers”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖12个节点，从“8. Numbers”到“Challenge: Dragoncoin”；核心是区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算，证据为数值范围表、解析结果、精度实验、格式化基线和余额边界测试。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-08-numbers-q2",
    "chapter": "kdg1-08-numbers",
    "level": 2,
    "question": "怎样为“8. Numbers”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存数值范围表、解析结果、精度实验、格式化基线和余额边界测试。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-08-numbers-q3",
    "chapter": "kdg1-08-numbers",
    "level": 3,
    "question": "“8. Numbers”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“假设数值会隐式扩宽，或把Double格式化结果当精确金额”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-08-numbers-q4",
    "chapter": "kdg1-08-numbers",
    "level": 3,
    "question": "为什么“8. Numbers”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-08-numbers-q5",
    "chapter": "kdg1-08-numbers",
    "level": 4,
    "question": "“8. Numbers”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-08-numbers-q6",
    "chapter": "kdg1-08-numbers",
    "level": 4,
    "question": "“8. Numbers”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭数值范围表、解析结果、精度实验、格式化基线和余额边界测试重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-09-standard-functions-q1",
    "chapter": "kdg1-09-standard-functions",
    "level": 1,
    "question": "“9. Standard Functions”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖9个节点，从“9. Standard Functions”到“Using Standard Library Functions”；核心是按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf，证据为标准函数决策表、等价展开、链路断点、空值实验和副作用审计。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-09-standard-functions-q2",
    "chapter": "kdg1-09-standard-functions",
    "level": 2,
    "question": "怎样为“9. Standard Functions”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存标准函数决策表、等价展开、链路断点、空值实验和副作用审计。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-09-standard-functions-q3",
    "chapter": "kdg1-09-standard-functions",
    "level": 3,
    "question": "“9. Standard Functions”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“为追求链式写法嵌套作用域函数，令接收者与返回值失去可读性”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-09-standard-functions-q4",
    "chapter": "kdg1-09-standard-functions",
    "level": 3,
    "question": "为什么“9. Standard Functions”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-09-standard-functions-q5",
    "chapter": "kdg1-09-standard-functions",
    "level": 4,
    "question": "“9. Standard Functions”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-09-standard-functions-q6",
    "chapter": "kdg1-09-standard-functions",
    "level": 4,
    "question": "“9. Standard Functions”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭标准函数决策表、等价展开、链路断点、空值实验和副作用审计重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-10-lists-sets-q1",
    "chapter": "kdg1-10-lists-sets",
    "level": 1,
    "question": "“10. Lists and Sets”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖19个节点，从“10. Lists and Sets”到“Challenge: Advanced Formatted Tavern Menu”；核心是区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break，证据为集合所有权图、越界实验、去重结果、文件样本和菜单格式断言。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-10-lists-sets-q2",
    "chapter": "kdg1-10-lists-sets",
    "level": 2,
    "question": "怎样为“10. Lists and Sets”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存集合所有权图、越界实验、去重结果、文件样本和菜单格式断言。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-10-lists-sets-q3",
    "chapter": "kdg1-10-lists-sets",
    "level": 3,
    "question": "“10. Lists and Sets”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把只读引用当作深度不可变，或在遍历期间修改共享集合”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-10-lists-sets-q4",
    "chapter": "kdg1-10-lists-sets",
    "level": 3,
    "question": "为什么“10. Lists and Sets”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-10-lists-sets-q5",
    "chapter": "kdg1-10-lists-sets",
    "level": 4,
    "question": "“10. Lists and Sets”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-10-lists-sets-q6",
    "chapter": "kdg1-10-lists-sets",
    "level": 4,
    "question": "“10. Lists and Sets”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭集合所有权图、越界实验、去重结果、文件样本和菜单格式断言重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-11-maps-q1",
    "chapter": "kdg1-11-maps",
    "level": 1,
    "question": "“11. Maps”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖6个节点，从“11. Maps”到“Challenge: Tavern Bouncer”；核心是用键值合同创建、读取、添加和修改Map，并区分缺键与可空值，证据为键空间说明、缺键样例、更新前后快照、守卫规则与断言。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-11-maps-q2",
    "chapter": "kdg1-11-maps",
    "level": 2,
    "question": "怎样为“11. Maps”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存键空间说明、缺键样例、更新前后快照、守卫规则与断言。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-11-maps-q3",
    "chapter": "kdg1-11-maps",
    "level": 3,
    "question": "“11. Maps”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“用get返回null同时表示缺键和实际空值，掩盖数据状态”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-11-maps-q4",
    "chapter": "kdg1-11-maps",
    "level": 3,
    "question": "为什么“11. Maps”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-11-maps-q5",
    "chapter": "kdg1-11-maps",
    "level": 4,
    "question": "“11. Maps”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-11-maps-q6",
    "chapter": "kdg1-11-maps",
    "level": 4,
    "question": "“11. Maps”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭键空间说明、缺键样例、更新前后快照、守卫规则与断言重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-12-defining-classes-q1",
    "chapter": "kdg1-12-defining-classes",
    "level": 1,
    "question": "“12. Defining Classes”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖14个节点，从“12. Defining Classes”到“For the More Curious: Package Private”；核心是通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界，证据为对象职责表、属性不变量、可见性测试、包结构和竞态条件说明。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-12-defining-classes-q2",
    "chapter": "kdg1-12-defining-classes",
    "level": 2,
    "question": "怎样为“12. Defining Classes”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存对象职责表、属性不变量、可见性测试、包结构和竞态条件说明。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-12-defining-classes-q3",
    "chapter": "kdg1-12-defining-classes",
    "level": 3,
    "question": "“12. Defining Classes”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把数据暴露为可变公共属性，再期待调用者自行维护不变量”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-12-defining-classes-q4",
    "chapter": "kdg1-12-defining-classes",
    "level": 3,
    "question": "为什么“12. Defining Classes”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-12-defining-classes-q5",
    "chapter": "kdg1-12-defining-classes",
    "level": 4,
    "question": "“12. Defining Classes”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-12-defining-classes-q6",
    "chapter": "kdg1-12-defining-classes",
    "level": 4,
    "question": "“12. Defining Classes”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭对象职责表、属性不变量、可见性测试、包结构和竞态条件说明重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-13-initialization-q1",
    "chapter": "kdg1-13-initialization",
    "level": 1,
    "question": "“13. Initialization”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖15个节点，从“13. Initialization”到“Challenge: The Riddle of Excalibur”；核心是比较主构造、次构造、初始化块、属性顺序、lateinit与lazy，保证对象一经发布即有效，证据为初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-13-initialization-q2",
    "chapter": "kdg1-13-initialization",
    "level": 2,
    "question": "怎样为“13. Initialization”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-13-initialization-q3",
    "chapter": "kdg1-13-initialization",
    "level": 3,
    "question": "“13. Initialization”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“在初始化顺序中读取尚未建立的属性，或滥用lateinit推迟必填依赖”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-13-initialization-q4",
    "chapter": "kdg1-13-initialization",
    "level": 3,
    "question": "为什么“13. Initialization”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-13-initialization-q5",
    "chapter": "kdg1-13-initialization",
    "level": 4,
    "question": "“13. Initialization”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-13-initialization-q6",
    "chapter": "kdg1-13-initialization",
    "level": 4,
    "question": "“13. Initialization”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭初始化时间线、构造路径表、失败样例、lazy调用计数和圣剑挑战重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-14-inheritance-q1",
    "chapter": "kdg1-14-inheritance",
    "level": 1,
    "question": "“14. Inheritance”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖8个节点，从“14. Inheritance”到“For the More Curious: Any”；核心是理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换，证据为类型层次图、替换测试、转换失败样例、Any边界和Room子类实验。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-14-inheritance-q2",
    "chapter": "kdg1-14-inheritance",
    "level": 2,
    "question": "怎样为“14. Inheritance”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存类型层次图、替换测试、转换失败样例、Any边界和Room子类实验。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-14-inheritance-q3",
    "chapter": "kdg1-14-inheritance",
    "level": 3,
    "question": "“14. Inheritance”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“仅为复用代码建立继承，导致子类破坏父类合同”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-14-inheritance-q4",
    "chapter": "kdg1-14-inheritance",
    "level": 3,
    "question": "为什么“14. Inheritance”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-14-inheritance-q5",
    "chapter": "kdg1-14-inheritance",
    "level": 4,
    "question": "“14. Inheritance”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-14-inheritance-q6",
    "chapter": "kdg1-14-inheritance",
    "level": 4,
    "question": "“14. Inheritance”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭类型层次图、替换测试、转换失败样例、Any边界和Room子类实验重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-15-objects-q1",
    "chapter": "kdg1-15-objects",
    "level": 1,
    "question": "“15. Objects”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖19个节点，从“15. Objects”到“Challenge: Ring the Bell”；核心是比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载，证据为实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-15-objects-q2",
    "chapter": "kdg1-15-objects",
    "level": 2,
    "question": "怎样为“15. Objects”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-15-objects-q3",
    "chapter": "kdg1-15-objects",
    "level": 3,
    "question": "“15. Objects”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把全局对象变成隐式可变状态，或重载运算符却违背读者直觉”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-15-objects-q4",
    "chapter": "kdg1-15-objects",
    "level": 3,
    "question": "为什么“15. Objects”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-15-objects-q5",
    "chapter": "kdg1-15-objects",
    "level": 4,
    "question": "“15. Objects”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-15-objects-q6",
    "chapter": "kdg1-15-objects",
    "level": 4,
    "question": "“15. Objects”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-16-interfaces-abstract-classes-q1",
    "chapter": "kdg1-16-interfaces-abstract-classes",
    "level": 1,
    "question": "“16. Interfaces and Abstract Classes”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖6个节点，从“16. Interfaces and Abstract Classes”到“Combat in NyetHack”；核心是用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为，证据为能力关系图、默认实现、抽象状态说明、替身实现与战斗测试。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-16-interfaces-abstract-classes-q2",
    "chapter": "kdg1-16-interfaces-abstract-classes",
    "level": 2,
    "question": "怎样为“16. Interfaces and Abstract Classes”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存能力关系图、默认实现、抽象状态说明、替身实现与战斗测试。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-16-interfaces-abstract-classes-q3",
    "chapter": "kdg1-16-interfaces-abstract-classes",
    "level": 3,
    "question": "“16. Interfaces and Abstract Classes”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把接口当数据容器或用抽象基类强迫无关类型共享状态”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-16-interfaces-abstract-classes-q4",
    "chapter": "kdg1-16-interfaces-abstract-classes",
    "level": 3,
    "question": "为什么“16. Interfaces and Abstract Classes”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-16-interfaces-abstract-classes-q5",
    "chapter": "kdg1-16-interfaces-abstract-classes",
    "level": 4,
    "question": "“16. Interfaces and Abstract Classes”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-16-interfaces-abstract-classes-q6",
    "chapter": "kdg1-16-interfaces-abstract-classes",
    "level": 4,
    "question": "“16. Interfaces and Abstract Classes”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭能力关系图、默认实现、抽象状态说明、替身实现与战斗测试重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-17-generics-q1",
    "chapter": "kdg1-17-generics",
    "level": 1,
    "question": "“17. Generics”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖8个节点，从“17. Generics”到“For the More Curious: The reified Keyword”；核心是通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用，证据为类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-17-generics-q2",
    "chapter": "kdg1-17-generics",
    "level": 2,
    "question": "怎样为“17. Generics”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-17-generics-q3",
    "chapter": "kdg1-17-generics",
    "level": 3,
    "question": "“17. Generics”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“忽略方差方向，令可写容器暴露不安全的类型替换”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-17-generics-q4",
    "chapter": "kdg1-17-generics",
    "level": 3,
    "question": "为什么“17. Generics”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-17-generics-q5",
    "chapter": "kdg1-17-generics",
    "level": 4,
    "question": "“17. Generics”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-17-generics-q6",
    "chapter": "kdg1-17-generics",
    "level": 4,
    "question": "“17. Generics”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-18-extensions-q1",
    "chapter": "kdg1-18-extensions",
    "level": 1,
    "question": "“18. Extensions”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖14个节点，从“18. Extensions”到“Challenge: Frame Extension”；核心是掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量，证据为静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-18-extensions-q2",
    "chapter": "kdg1-18-extensions",
    "level": 2,
    "question": "怎样为“18. Extensions”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-18-extensions-q3",
    "chapter": "kdg1-18-extensions",
    "level": 3,
    "question": "“18. Extensions”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“认为扩展真正修改了类或可以覆盖成员的动态分派”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-18-extensions-q4",
    "chapter": "kdg1-18-extensions",
    "level": 3,
    "question": "为什么“18. Extensions”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-18-extensions-q5",
    "chapter": "kdg1-18-extensions",
    "level": 4,
    "question": "“18. Extensions”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-18-extensions-q6",
    "chapter": "kdg1-18-extensions",
    "level": 4,
    "question": "“18. Extensions”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-19-functional-programming-q1",
    "chapter": "kdg1-19-functional-programming",
    "level": 1,
    "question": "“19. Functional Programming Basics”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖12个节点，从“19. Functional Programming Basics”到“Challenge: Sliding Window”；核心是用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价，证据为输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-19-functional-programming-q2",
    "chapter": "kdg1-19-functional-programming",
    "level": 2,
    "question": "怎样为“19. Functional Programming Basics”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-19-functional-programming-q3",
    "chapter": "kdg1-19-functional-programming",
    "level": 3,
    "question": "“19. Functional Programming Basics”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把链式调用等同函数式设计，却在lambda中修改外部状态”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-19-functional-programming-q4",
    "chapter": "kdg1-19-functional-programming",
    "level": 3,
    "question": "为什么“19. Functional Programming Basics”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-19-functional-programming-q5",
    "chapter": "kdg1-19-functional-programming",
    "level": 4,
    "question": "“19. Functional Programming Basics”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-19-functional-programming-q6",
    "chapter": "kdg1-19-functional-programming",
    "level": 4,
    "question": "“19. Functional Programming Basics”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-20-java-interoperability-q1",
    "chapter": "kdg1-20-java-interoperability",
    "level": 1,
    "question": "“20. Java Interoperability”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖8个节点，从“20. Java Interoperability”到“Function Types in Java”；核心是控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界，证据为Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-20-java-interoperability-q2",
    "chapter": "kdg1-20-java-interoperability",
    "level": 2,
    "question": "怎样为“20. Java Interoperability”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-20-java-interoperability-q3",
    "chapter": "kdg1-20-java-interoperability",
    "level": 3,
    "question": "“20. Java Interoperability”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“让平台类型扩散到业务层，令空值风险失去编译期保护”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-20-java-interoperability-q4",
    "chapter": "kdg1-20-java-interoperability",
    "level": 3,
    "question": "为什么“20. Java Interoperability”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-20-java-interoperability-q5",
    "chapter": "kdg1-20-java-interoperability",
    "level": 4,
    "question": "“20. Java Interoperability”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-20-java-interoperability-q6",
    "chapter": "kdg1-20-java-interoperability",
    "level": 4,
    "question": "“20. Java Interoperability”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-21-first-android-application-q1",
    "chapter": "kdg1-21-first-android-application",
    "level": 1,
    "question": "“21. Building Your First Android Application with Kotlin”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖15个节点，从“21. Building Your First Android Application with Kotlin”到“For the More Curious: Android KTX and Anko Libraries”；核心是按原书时代的Gradle、XML UI、Activity、视图绑定、点击监听与实例状态完成首个Android应用，证据为Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-21-first-android-application-q2",
    "chapter": "kdg1-21-first-android-application",
    "level": 2,
    "question": "怎样为“21. Building Your First Android Application with Kotlin”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-21-first-android-application-q3",
    "chapter": "kdg1-21-first-android-application",
    "level": 3,
    "question": "“21. Building Your First Android Application with Kotlin”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把已废弃的Kotlin Android Extensions写成今天仍推荐的方案”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-21-first-android-application-q4",
    "chapter": "kdg1-21-first-android-application",
    "level": 3,
    "question": "为什么“21. Building Your First Android Application with Kotlin”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-21-first-android-application-q5",
    "chapter": "kdg1-21-first-android-application",
    "level": 4,
    "question": "“21. Building Your First Android Application with Kotlin”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-21-first-android-application-q6",
    "chapter": "kdg1-21-first-android-application",
    "level": 4,
    "question": "“21. Building Your First Android Application with Kotlin”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭Gradle基线、UI树、Activity生命周期、状态恢复测试、模拟器记录和历史API迁移表重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-22-coroutines-introduction-q1",
    "chapter": "kdg1-22-coroutines-introduction",
    "level": 1,
    "question": "“22. Introduction to Coroutines”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖10个节点，从“22. Introduction to Coroutines”到“Challenge: Minimum Strength”；核心是在Kotlin 1.2早期协程语境下理解主线程、async、launch、await与挂起函数，并隔离网络失败，证据为调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-22-coroutines-introduction-q2",
    "chapter": "kdg1-22-coroutines-introduction",
    "level": 2,
    "question": "怎样为“22. Introduction to Coroutines”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-22-coroutines-introduction-q3",
    "chapter": "kdg1-22-coroutines-introduction",
    "level": 3,
    "question": "“22. Introduction to Coroutines”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把协程等同后台线程，或启动无所有者的任务后更新已销毁界面”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-22-coroutines-introduction-q4",
    "chapter": "kdg1-22-coroutines-introduction",
    "level": 3,
    "question": "为什么“22. Introduction to Coroutines”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-22-coroutines-introduction-q5",
    "chapter": "kdg1-22-coroutines-introduction",
    "level": 4,
    "question": "“22. Introduction to Coroutines”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-22-coroutines-introduction-q6",
    "chapter": "kdg1-22-coroutines-introduction",
    "level": 4,
    "question": "“22. Introduction to Coroutines”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭调度时间线、主线程断言、取消记录、异常路径、动态数据测试和版本迁移说明重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-23-afterword-q1",
    "chapter": "kdg1-23-afterword",
    "level": 1,
    "question": "“23. Afterword”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖4个节点，从“23. Afterword”到“Thank You”；核心是把语言、对象模型、互操作、Android与协程能力转成后续项目和持续学习计划，证据为能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-23-afterword-q2",
    "chapter": "kdg1-23-afterword",
    "level": 2,
    "question": "怎样为“23. Afterword”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-23-afterword-q3",
    "chapter": "kdg1-23-afterword",
    "level": 3,
    "question": "“23. Afterword”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“收藏更多资料代替完成可验证项目”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-23-afterword-q4",
    "chapter": "kdg1-23-afterword",
    "level": 3,
    "question": "为什么“23. Afterword”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-23-afterword-q5",
    "chapter": "kdg1-23-afterword",
    "level": 4,
    "question": "“23. Afterword”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-23-afterword-q6",
    "chapter": "kdg1-23-afterword",
    "level": 4,
    "question": "“23. Afterword”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-appendix-a-more-challenges-q1",
    "chapter": "kdg1-appendix-a-more-challenges",
    "level": 1,
    "question": "“A. More Challenges”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖2个节点，从“A. More Challenges”到“Leveling Up with Exercism”；核心是把附加挑战拆成可判定输入、约束、实现、反例与回归测试，并连接Exercism练习，证据为挑战清单、约束表、失败测试、复杂度说明和复盘记录。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-appendix-a-more-challenges-q2",
    "chapter": "kdg1-appendix-a-more-challenges",
    "level": 2,
    "question": "怎样为“A. More Challenges”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存挑战清单、约束表、失败测试、复杂度说明和复盘记录。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-appendix-a-more-challenges-q3",
    "chapter": "kdg1-appendix-a-more-challenges",
    "level": 3,
    "question": "“A. More Challenges”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只提交能通过一个样例的代码，没有边界和反例”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-appendix-a-more-challenges-q4",
    "chapter": "kdg1-appendix-a-more-challenges",
    "level": 3,
    "question": "为什么“A. More Challenges”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-appendix-a-more-challenges-q5",
    "chapter": "kdg1-appendix-a-more-challenges",
    "level": 4,
    "question": "“A. More Challenges”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-appendix-a-more-challenges-q6",
    "chapter": "kdg1-appendix-a-more-challenges",
    "level": 4,
    "question": "“A. More Challenges”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭挑战清单、约束表、失败测试、复杂度说明和复盘记录重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-glossary-q1",
    "chapter": "kdg1-glossary",
    "level": 1,
    "question": "“Glossary”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖1个节点，从“Glossary”到“Glossary”；核心是建立Kotlin 1.2术语到定义、反例、代码位置和相关章节的双向索引，证据为术语卡、定义来源、反例、章节链接和歧义清单。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-glossary-q2",
    "chapter": "kdg1-glossary",
    "level": 2,
    "question": "怎样为“Glossary”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存术语卡、定义来源、反例、章节链接和歧义清单。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-glossary-q3",
    "chapter": "kdg1-glossary",
    "level": 3,
    "question": "“Glossary”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“背诵名词却不能用代码区分相邻概念”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-glossary-q4",
    "chapter": "kdg1-glossary",
    "level": 3,
    "question": "为什么“Glossary”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-glossary-q5",
    "chapter": "kdg1-glossary",
    "level": 4,
    "question": "“Glossary”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-glossary-q6",
    "chapter": "kdg1-glossary",
    "level": 4,
    "question": "“Glossary”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭术语卡、定义来源、反例、章节链接和歧义清单重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-index-q1",
    "chapter": "kdg1-index",
    "level": 1,
    "question": "“Index”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖1个节点，从“Index”到“Index”；核心是用问题、符号、概念关系和章节定位来检索全书，而不是线性翻找关键词，证据为问题索引、符号索引、关系图、章节反向链接和检索测试。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-index-q2",
    "chapter": "kdg1-index",
    "level": 2,
    "question": "怎样为“Index”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存问题索引、符号索引、关系图、章节反向链接和检索测试。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-index-q3",
    "chapter": "kdg1-index",
    "level": 3,
    "question": "“Index”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“把同名API命中当成语义答案，忽略版本和上下文”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-index-q4",
    "chapter": "kdg1-index",
    "level": 3,
    "question": "为什么“Index”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-index-q5",
    "chapter": "kdg1-index",
    "level": 4,
    "question": "“Index”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-index-q6",
    "chapter": "kdg1-index",
    "level": 4,
    "question": "“Index”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭问题索引、符号索引、关系图、章节反向链接和检索测试重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "kdg1-official-final-review-q1",
    "chapter": "kdg1-official-final-review",
    "level": 1,
    "question": "“《Kotlin编程权威指南》全书总复习”覆盖哪些权威目录节点与核心机制？",
    "answer": "覆盖27个节点，从“Introducing Kotlin”到“Index”；核心是跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收，证据为全书概念图、综合项目、失败注入、迁移账本和独立交接包。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "kdg1-official-final-review-q2",
    "chapter": "kdg1-official-final-review",
    "level": 2,
    "question": "怎样为“《Kotlin编程权威指南》全书总复习”建立最小可执行切片？",
    "answer": "固定Kotlin 1.2与JDK，声明输入类型、所有者、转换、输出和失败，运行最短源码并保存全书概念图、综合项目、失败注入、迁移账本和独立交接包。",
    "tags": [
      "实验",
      "类型"
    ]
  },
  {
    "id": "kdg1-official-final-review-q3",
    "chapter": "kdg1-official-final-review",
    "level": 3,
    "question": "“《Kotlin编程权威指南》全书总复习”最需要推翻的错误假设是什么？",
    "answer": "错误假设是“只按章节回忆术语，无法解释跨章节的数据与控制流”；用编译失败、空值、边界、顺序或版本反例只改变一个变量即可推翻。",
    "tags": [
      "陷阱",
      "反证"
    ]
  },
  {
    "id": "kdg1-official-final-review-q4",
    "chapter": "kdg1-official-final-review",
    "level": 3,
    "question": "为什么“《Kotlin编程权威指南》全书总复习”的一次成功运行不等于掌握？",
    "answer": "一次运行未覆盖静态类型、非法输入、边界、失败、求值时机和版本；必须同时保存正常样例、反例、诊断与断言。",
    "tags": [
      "诊断",
      "边界"
    ]
  },
  {
    "id": "kdg1-official-final-review-q5",
    "chapter": "kdg1-official-final-review",
    "level": 4,
    "question": "“《Kotlin编程权威指南》全书总复习”迁移到现代Kotlin时如何控制变量？",
    "answer": "先复现Kotlin 1.2基线，再一次只升级语言、JDK、构建插件、Android API或依赖之一；比较编译、行为和测试并保留回滚。",
    "tags": [
      "迁移",
      "版本"
    ]
  },
  {
    "id": "kdg1-official-final-review-q6",
    "chapter": "kdg1-official-final-review",
    "level": 4,
    "question": "“《Kotlin编程权威指南》全书总复习”达到独立交接需要哪些证据？",
    "answer": "需要环境指纹、源码、命令、输出、类型说明、失败样例、断言、版本边界和回滚条件，并凭全书概念图、综合项目、失败注入、迁移账本和独立交接包重放。",
    "tags": [
      "验收",
      "交接"
    ]
  }
];
