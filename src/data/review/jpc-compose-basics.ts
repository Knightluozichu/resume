import type { ReviewQuestion } from "./types";

export const jpcComposeBasicsQuestions: ReviewQuestion[] = [
  {
    id: "jpc-cb-1",
    chapter: "jpc-compose-basics",
    level: 1,
    question: `@Composable函数有哪些必须遵守的规则？为什么这些规则存在？`,
    answer: `规则：①必须用@Composable注解标记——告诉编译器需要特殊编译处理（追踪状态读取、生成跳过逻辑）；②只能从其他@Composable函数中调用——依赖Composition上下文（remember、CompositionLocal等）；③返回值只能是Unit——描述UI而非返回数据，UI通过构建UI树节点体现；④不能有vararg参数——编译器需要为每个参数生成相等性比较以决定是否跳过重组，vararg无法做确定性比较；⑤函数名用PascalCase大驼峰——与普通函数区分。这些规则存在是因为Compose的重组机制要求函数是纯函数+无副作用，编译器才能安全地跳过未变化的函数、并行执行、中断和恢复重组。`,
    tags: ["@Composable", "函数规则", "重组"]
  },
  {
    id: "jpc-cb-2",
    chapter: "jpc-compose-basics",
    level: 1,
    question: `remember的作用是什么？不用remember会有什么问题？`,
    answer: `remember在Composition中记住一个值，使其在重组时不被重新初始化，本质是把值存储在Composition节点中与Composable位置绑定。不用remember的问题：每次重组时普通局部变量都会重新初始化为默认值。如var count = 0在重组时count变回0，Button点击后count++变为1，但下次重组count又变回0，计数器永远显示0。用var count by remember { mutableStateOf(0) }后：remember保证count重组后保持上次值，mutableStateOf保证count变化时自动触发重组。注意remember只在同一Composable的同一位置记住值，条件分支中进出组合时值会丢失，跨配置变更需用rememberSaveable。`,
    tags: ["remember", "状态保持", "mutableStateOf"]
  },
  {
    id: "jpc-cb-3",
    chapter: "jpc-compose-basics",
    level: 2,
    question: `Slot API解决什么问题？以Scaffold为例说明其优势。`,
    answer: `Slot API通过@Composable lambda参数让调用方决定组件内部内容，解决组件骨架与内容解耦的问题。以Scaffold为例：它提供topBar/bottomBar/content/floatingActionButton等slot，调用方按需填充——一个Scaffold可用于首页、设置页、详情页等任意页面，每个页面填充不同的TopBar和内容。优势：①灵活性——同一组件用于完全不同的内容场景；②可组合性——slot内容本身也可以是带slot的组件，形成嵌套；③避免继承——传统View中定制Toolbar需继承BaseActivity，Compose中直接传不同@Composable到topBar slot即可；④类型安全——slot参数是@Composable () -> Unit类型，编译器检查类型。`,
    tags: ["Slot API", "Scaffold", "组合"]
  },
  {
    id: "jpc-cb-4",
    chapter: "jpc-compose-basics",
    level: 2,
    question: `Compose重组有哪些特性？为什么@Composable函数应该无副作用？`,
    answer: `重组特性：①智能跳过——编译器为参数生成相等性比较，只有参数变化才重组；②并行执行——独立的@Composable可并行重组；③可中断——重组可被高优先级工作中断后恢复；④幂等——同一输入产生同一输出。应该无副作用的原因：①跳过不执行——如果有网络请求，跳过意味着请求不发出；②重复执行——如果有全局变量修改，重复执行导致多次修改；③并行执行——非线程安全操作导致竞态条件；④中断恢复——中断时副作用可能不完整。正确做法：副作用放在LaunchedEffect（协程）、DisposableEffect（带清理）、SideEffect（每次重组后）等Effect API中，由框架管理执行时机。`,
    tags: ["重组", "副作用", "LaunchedEffect"]
  }
];
