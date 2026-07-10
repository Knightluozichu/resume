import type { ReviewQuestion } from "./types";

export const kdgTestingQuestions: ReviewQuestion[] = [
  {
    id: "kdg-ts-1",
    chapter: "kdg-testing",
    level: 2,
    question: `Kotlin中使用MockK进行模拟测试的基本步骤是什么？与Mockito有什么区别？`,
    answer:
      `MockK模拟测试的基本步骤：①创建mock——\`val repo = mockk<UserRepository>()\`创建模拟对象。②设置行为——\`every { repo.findById(1) } returns User(\"Alice\")\`设置mock方法返回值。对于suspend函数用\`coEvery { api.fetch() } returns Data()\`。③执行测试——调用被测代码，mock方法返回预设值。④验证——\`verify(exactly = 1) { repo.findById(1) }\`验证方法被调用。suspend函数用\`coVerify { api.fetch() }\`。其他功能：\`returnsMany(listOf(a, b))\`多次调用返回不同值；\`throws Exception()\`抛异常；\`answers { firstArg() }\`动态返回；\`verifyAll\`验证所有调用。与Mockito的区别：①MockK专为Kotlin设计——支持final类/method的mock（Mockito需要mockito-inline），支持扩展函数mock，支持suspend函数mock（coEvery/coVerify）。②DSL式API——MockK用\`every { } returns\`/\`verify { }\`的DSL语法，Mockito用\`when().thenReturn()\`（when在Kotlin是关键字需反引号）。③对象mock——MockK支持mockk<Object>单例，Mockito需要PowerMock。④Kotlin原生——MockK的API与Kotlin语言特性无缝集成。选择：Kotlin项目优先MockK，Java项目用Mockito。`,
    tags: ["MockK", "Mockito", "模拟测试", "every", "coEvery", "verify"],
  },
  {
    id: "kdg-ts-2",
    chapter: "kdg-testing",
    level: 3,
    question: `\`runTest\`如何工作？它解决了协程测试的什么问题？`,
    answer:
      `\`runTest\`是kotlinx-coroutines-test提供的协程测试工具，用虚拟时间替代真实时间。工作原理：①虚拟时间——runTest创建一个TestScope，其中的delay不真实等待，而是在虚拟时间线上跳过。\`delay(1000)\`在测试中几乎瞬间完成。②TestScheduler——runTest提供TestScheduler，可以手动控制时间推进：\`advanceTimeBy(100)\`推进100ms虚拟时间，\`advanceUntilIdle()\`推进到所有协程完成。③TestDispatcher——runTest默认用StandardTestDispatcher，可用\`UnconfinedTestDispatcher(testScheduler)\`让协程立即执行。④协程隔离——runTest内的协程在其作用域内执行，测试结束时自动等待所有协程完成。解决的问题：①测试速度——普通\`runBlocking\`中\`delay(1000)\`真的等1秒，测试慢。runTest跳过delay，测试瞬间完成。②时间控制——测试超时逻辑时，runTest可以手动推进时间，不需要真实等待。③确定性——真实时间不可控（线程调度、GC等），虚拟时间确定，测试结果稳定。④Flow测试——runTest可以收集Flow的发射，用虚拟时间验证间隔发射的正确性。注意：runTest内不能启动GlobalScope协程（不在虚拟时间控制内），应在testScope内启动。`,
    tags: ["runTest", "协程测试", "虚拟时间", "TestScheduler", "delay"],
  },
  {
    id: "kdg-ts-3",
    chapter: "kdg-testing",
    level: 1,
    question: `Kotlin代码规范有哪些核心最佳实践？为什么要「用惯用Kotlin而非翻译Java」？`,
    answer:
      `Kotlin代码规范核心最佳实践：①优先val——用val替代var，减少可变状态，代码更安全、更易推理。②用data class替代POJO——一行声明替代Java的样板代码，自动生成equals/hashCode/copy。③用when+sealed穷尽分支——sealed class限定子类，when表达式编译器强制覆盖所有分支，新增子类时编译器报错提醒。④用扩展函数替代工具类——\`String.isEmail()\`替代\`EmailValidator.isEmail(str)\`，更自然、更可读。⑤用协程替代回调——suspend函数顺序写法替代嵌套回调。⑥用作用域函数——apply配置对象、let处理null、run执行块、also副作用。⑦用空安全而非null检查——String?+?.+?:替代手动null判断。⑧用不可变集合——listOf替代mutableListOf。⑨用字符串模板替代拼接——\`\"$name is $age\"\`。⑩用区间和步长——\`1..10\`/\`1 until 10\`/\`1..10 step 2\`。为什么要「用惯用Kotlin而非翻译Java」：Java代码直译到Kotlin会丢失Kotlin的安全性和简洁性优势——不用val就失去了不可变保护，不用data class就还有样板代码，不用空安全就还有NPE风险，不用协程就还有回调地狱。惯用Kotlin利用了语言的全部能力，代码更安全、更简洁、更可维护。判断标准：如果代码看起来像Java，说明没用好Kotlin。`,
    tags: ["代码规范", "最佳实践", "惯用Kotlin", "val", "data class", "sealed"],
  },
  {
    id: "kdg-ts-4",
    chapter: "kdg-testing",
    level: 3,
    question: `在Kotlin Android项目中，测试金字塔各层应该怎么设计？`,
    answer:
      `Kotlin Android项目的测试金字塔设计：①单元测试（70%）——范围：ViewModel、Repository、UseCase、工具类等纯Kotlin逻辑。工具：JUnit 5 + MockK。特点：不依赖Android框架，跑在JVM上，速度快（毫秒级），数量多。示例：测试ViewModel的\`fun loadData()\`——mock Repository，验证StateFlow的状态变化。用\`runTest\`测试协程逻辑，用MockK的\`coEvery\`模拟suspend函数。每个类/函数的每个分支都应有测试。②集成测试（20%）——范围：Repository+Room DAO、ViewModel+真实Repository、多个组件协作。工具：Robolectric（本地JVM跑Android代码）或AndroidX Test。特点：验证组件间协作正确性，需要少量Android上下文。示例：测试Room数据库的真实CRUD——用内存数据库，验证SQL查询正确。测试ViewModel+真实Repository+mock API，验证数据流端到端。③UI测试（10%）——范围：Activity/Fragment/Compose UI交互。工具：Espresso（传统View）或Compose Test（Compose UI）。特点：在模拟器/真机上跑，速度慢，数量少。示例：测试登录流程——输入邮箱密码、点击按钮、验证跳转到主页。设计原则：①金字塔比例——单元多、集成中、UI少。②隔离性——单元测试不依赖Android框架，用MockK隔离依赖。③可重复——测试结果确定性。④命名——用反引号描述测试意图。⑤AAA模式——Arrange/Act/Assert结构清晰。`,
    tags: ["测试金字塔", "单元测试", "集成测试", "UI测试", "JUnit", "MockK", "runTest"],
  },
];
