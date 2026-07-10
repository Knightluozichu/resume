import type { ReviewQuestion } from "./types";

export const jpcNavigationQuestions: ReviewQuestion[] = [
  {
    id: "jpc-nav-1",
    chapter: "jpc-navigation",
    level: 1,
    question: `NavHost和NavController各自的职责是什么？它们如何协作？`,
    answer: `NavHost职责：声明式导航图容器，在content lambda中用composable()定义所有目的地和路由，负责在当前目的地变化时显示对应的Composable内容——它是UI的一部分。NavController职责：导航状态管理器，管理navigate（跳转）、popBackStack（返回）和BackStack（回退栈），不是Composable而是持有导航状态的对象。协作关系：NavHost接收NavController作为参数，订阅其状态变化。当NavController.navigate()被调用时，NavController更新当前路由，NavHost检测到变化渲染新目的地的Composable。NavHost负责「显示什么」，NavController负责「去哪里」。NavController可在NavHost外部使用，如BottomBar的onClick中调用。`,
    tags: ["NavHost", "NavController", "导航架构"]
  },
  {
    id: "jpc-nav-2",
    chapter: "jpc-navigation",
    level: 1,
    question: `类型安全路由相比字符串路由有什么优势？如何使用？`,
    answer: `优势：①编译期类型检查——字符串路由\"detail/$id\"的id类型运行时才验证，类型安全路由用@Serializable data class Detail(val id: Long)编译期检查。②重构友好——改类名/字段名IDE自动重构所有引用。③自动序列化——基本类型自动序列化为URL参数。④IDE补全——navigate(Detail())自动提示参数。使用方法：①定义路由对象——@Serializable object Home（无参）或@Serializable data class Detail(val id: Long)（带参）。②NavHost注册——composable<Detail> { entry -> val args = entry.toRoute<Detail>(); DetailScreen(args.id) }。③导航——navController.navigate(Detail(id=123))。④可选参数——字段有默认值则为可选。限制：复杂对象类型不能自动序列化。`,
    tags: ["类型安全路由", "Serializable", "Navigation 2.8"]
  },
  {
    id: "jpc-nav-3",
    chapter: "jpc-navigation",
    level: 2,
    question: `底部导航栏如何与NavHost联动实现tab切换时保持状态？`,
    answer: `关键在navigate选项配置：navController.navigate(item.route) { popUpTo(navController.graph.findStartDestination().id) { saveState = true }; launchSingleTop = true; restoreState = true }。三个关键选项：①popUpTo(startDestination){saveState=true}——弹出到起始目的地但保存被弹出tab的状态到SavedStateHandle，切换tab时滚动位置、输入内容不丢失。②launchSingleTop=true——目标tab已在栈顶时不重复创建新BackStackEntry。③restoreState=true——从SavedState恢复之前保存的tab状态。配合使用：saveState离开时保存，restoreState进入时恢复。currentRoute获取：val entry by navController.currentBackStackEntryAsState(); val route = entry?.destination?.route，路由变化时自动重组更新选中态。`,
    tags: ["底部导航", "saveState", "restoreState", "tab切换"]
  },
  {
    id: "jpc-nav-4",
    chapter: "jpc-navigation",
    level: 2,
    question: `如何在两个页面之间传递数据并获取返回结果？`,
    answer: `正向传参（A→B）：①类型安全——navController.navigate(Detail(id=123))，B页面entry.toRoute<Detail>().id获取。②字符串路由——navigate(\"detail/123\")，B页面entry.arguments?.getLong(\"id\")获取。返回结果（B→A）：通过SavedStateHandle传递。B页面设置结果：navController.previousBackStackEntry?.savedStateHandle?.set(\"result\", \"value\"); navController.popBackStack()。A页面接收：navController.currentBackStackEntry?.savedStateHandle?.getStateFlow<String>(\"result\", \"\")?.collectAsStateWithLifecycle()——用StateFlow监听，popBackStack回来后自动收到结果并触发重组。比传统Activity的startActivityForResult+onActivityResult更简洁且响应式。复杂场景可用SharedViewModel绑定到NavGraph route。`,
    tags: ["页面传参", "返回结果", "SavedStateHandle"]
  }
];
