import type { ReviewQuestion } from "./types";

export const jpcStateManagementQuestions: ReviewQuestion[] = [
  {
    id: "jpc-st-1",
    chapter: "jpc-state-management",
    level: 1,
    question: `Compose的重组机制是如何工作的？为什么不是全量重执行整个UI树？`,
    answer: `重组机制：①State订阅——@Composable执行时读取mutableStateOf的value，Compose在Snapshot中记录依赖关系；②变化追踪——State.value被修改时，Snapshot标记所有订阅该State的Composable为需要重组；③批量调度——一帧内收集所有State变化，帧边界统一调度重组；④最小范围重组——只重组直接读取变化State的最小@Composable，子函数参数未变化则跳过。不全量重执行的原因：①性能——全量重执行开销巨大，最小范围重组只更新变化部分；②正确性——全量重执行会使remember状态重新初始化导致状态丢失；③并行——最小范围重组允许独立Composable并行执行。编译器为每个参数生成相等性比较，只有参数变化才重组。`,
    tags: ["重组", "Snapshot", "智能跳过"]
  },
  {
    id: "jpc-st-2",
    chapter: "jpc-state-management",
    level: 1,
    question: `四种状态持有方式（remember、rememberSaveable、ViewModel、derivedStateOf）分别适用什么场景？`,
    answer: `①remember+mutableStateOf——UI临时状态，不需要跨配置变更存活，如展开/折叠、文本草稿。②rememberSaveable——需要跨配置变更存活但不需要跨进程恢复的简单状态，如用户名输入、选中索引。通过Bundle自动序列化，复杂对象需自定义Saver。③ViewModel+StateFlow——业务逻辑状态、需要跨配置变更和进程恢复的复杂状态，如登录状态、列表数据。生命周期绑定到ViewModelStore，可承载异步操作。④derivedStateOf——从其他State派生的计算状态，且源State变化频繁但派生结果变化少，如「列表是否有选中项」「表单是否完整」。选择原则：UI临时态用remember，需旋转恢复用rememberSaveable，业务数据用ViewModel，派生计算用derivedStateOf。`,
    tags: ["remember", "rememberSaveable", "ViewModel", "derivedStateOf"]
  },
  {
    id: "jpc-st-3",
    chapter: "jpc-state-management",
    level: 2,
    question: `什么是状态提升？如何将有状态的TextField提升为无状态组件？`,
    answer: `状态提升是将组件内部管理的State移到父组件，组件变成无状态——State由参数传入、Event由回调传出。有状态TextField：var text by remember { mutableStateOf("") }; TextField(value=text, onValueChange={text=it})——text封装在内部，外部无法控制。提升为无状态：TextField(value=value, onValueChange=onValueChange)——状态由value参数传入，变化通过onValueChange回调通知父组件。父组件使用：var name by rememberSaveable { mutableStateOf("") }; MyTextField(value=name, onValueChange={name=it})。优势：可复用（同一TextField可用于用户名/密码/搜索）、可测试、状态集中管理、单向数据流清晰（State向下、Event向上）。原则：提升到需要读取该状态的最低公共祖先。`,
    tags: ["状态提升", "Stateless", "单向数据流"]
  },
  {
    id: "jpc-st-4",
    chapter: "jpc-state-management",
    level: 2,
    question: `derivedStateOf如何优化重组性能？使用时有哪些注意事项？`,
    answer: `derivedStateOf创建记忆化的计算结果，只有当计算结果真正变化时才通知订阅者重组，而非依赖项每次变化都重组。优化原理：源State变化N次但派生结果只变化1次时，省N-1次重组。如scrollState.value滚动时每帧变化但showButton只在0↔非0时变一次。注意事项：①源变化少但结果变化多时不需要用——反而增加开销；②必须用remember包裹——remember { derivedStateOf { ... } }，否则每次重组创建新实例失去记忆效果；③不要在内部读取不相关State——可能导致不相关变化触发计算；④适合场景：源频繁变化+结果少变化，如列表筛选结果、表单完整性、滚动按钮显隐。判断标准：变化次数差异大才值得用。`,
    tags: ["derivedStateOf", "性能优化", "重组"]
  }
];
