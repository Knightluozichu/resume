import type { ReviewQuestion } from "./types";

export const jpcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "jpc-fr-1",
    chapter: "jpc-final-review",
    level: 2,
    question: `用全书知识设计一个带动画的购物车列表页面的架构，涉及哪些章节的知识？`,
    answer: `涉及章节：①状态管理(第3章)——CartViewModel+StateFlow持有items/totalPrice/isCheckingOut，ViewModel负责addToCart/removeItem等业务逻辑。②布局(第2章)——Scaffold(topBar+bottomBar)+LazyColumn组织结构，items用key=item.id保障稳定。③动画(第4章)——AnimatedVisibility包裹每行实现删除滑动动画，animateIntAsState做总价数字滚动。④主题(第5章)——MaterialTheme.colorScheme.primary做按钮色，typography做文字样式。⑤导航(第6章)——CheckoutBar的onClick调用navController.navigate(\"checkout\")，通过savedStateHandle传递选中商品。⑥基础(第1章)——@Composable+remember+Slot API。⑦互操作(第7章)——如需Glide加载图片可用AndroidView或Coil-Compose。⑧高级(第8章)——如需手势删除可用draggable或pointerInput。⑨性能——derivedStateOf计算是否有选中商品避免不必要重组。数据流：用户操作→ViewModel更新StateFlow→UI自动重组→动画播放，全程单向数据流。`,
    tags: ["架构设计", "综合应用", "单向数据流"]
  },
  {
    id: "jpc-fr-2",
    chapter: "jpc-final-review",
    level: 2,
    question: `总结全书各章的核心知识点，以及它们之间的一条主线关联。`,
    answer: `各章核心：①基础——@Composable/remember/Slot API/无副作用。②布局——Column/Row/Box/Modifier链/LazyColumn/Constraints/measure→place。③状态——mutableStateOf/重组机制/rememberSaveable/ViewModel+StateFlow/derivedStateOf/状态提升/单向数据流。④动画——三层API(AnimatedVisibility/animate*AsState/Animatable)/AnimationSpec/选型决策。⑤主题——MaterialTheme三支柱(ColorScheme/Typography/Shapes)/CompositionLocal/深浅色+Dynamic Color。⑥导航——NavHost/NavController/类型安全路由/嵌套图/底部导航联动/深层链接。⑦互操作——AndroidView(factory+update)/ComposeView/生命周期绑定/渐进迁移。⑧高级——Layout+MeasurePolicy/SubcomposeLayout/pointerInput/draggable/nestedScroll。一条主线：UI=f(state)——@Composable是基础(①)，State驱动更新(③)，布局组织结构(②)、动画增强体验(④)、主题统一视觉(⑤)、导航管理页面(⑥)都建立在State驱动之上，Modifier贯穿布局/主题/高级(②⑤⑧)，单向数据流是架构主线(③⑥)。`,
    tags: ["知识总结", "主线关联", "UI=f(state)"]
  },
  {
    id: "jpc-fr-3",
    chapter: "jpc-final-review",
    level: 2,
    question: `在不同场景下如何选择正确的Compose API？给出关键决策流程。`,
    answer: `决策流程：①布局——垂直→Column，水平→Row，层叠→Box，长列表→LazyColumn+key，流式→自定义Layout，需根据测量结果决定内容→SubcomposeLayout。②状态——UI临时态→remember+mutableStateOf，需旋转恢复→rememberSaveable，业务数据→ViewModel+StateFlow，派生计算→derivedStateOf。③动画——显隐→AnimatedVisibility，内容切换→AnimatedContent/Crossfade，单属性→animate*AsState，多属性联动→updateTransition，循环→rememberInfiniteTransition，手势驱动→Animatable+coroutine。④导航——简单页面→composable(\"route\")，带参数→类型安全composable<Route>，分组→navigation()，底部导航→Scaffold+NavigationBar。⑤互操作——Compose嵌入View→AndroidView，XML嵌入Compose→ComposeView。⑥手势——单击→clickable，单击+双击+长按→combinedClickable，拖拽→draggable/pointerInput，缩放旋转→detectTransformGestures，嵌套滚动→nestedScroll。原则：从高层API开始选，高层满足不了才降层，优先Compose原生方案。`,
    tags: ["选型决策", "API选择", "决策流程"]
  },
  {
    id: "jpc-fr-4",
    chapter: "jpc-final-review",
    level: 3,
    question: `对比Compose和传统View在各维度的差异，分析Compose的优势和局限。`,
    answer: `差异：①UI描述——View用XML+代码分离，Compose用@Composable函数Kotlin代码统一描述。②状态管理——View命令式手动同步，Compose声明式State自动重组。③布局——View用LinearLayout/ConstraintLayout等XML声明，Compose用Column/Row/Box+Modifier链。④列表——View用RecyclerView+Adapter+ViewHolder模板代码多，Compose用LazyColumn+items()简洁。⑤主题——View用styles.xml+theme.xml，Compose用MaterialTheme+CompositionLocal。⑥动画——View用ObjectAnimator/XML动画API分散，Compose用animate*AsState等统一API声明式。⑦自定义——View继承View/ViewGroup重写onMeasure/onDraw，Compose用Layout()/Modifier.layout()函数式组合优于继承。Compose优势：声明式减少bug、类型安全、代码复用（组合）、开发效率（Preview/无XML/热重载）、性能（智能跳过）。局限：学习曲线（声明式思维转变）、互操作开销（AndroidView）、生态成熟度（部分三方库无Compose支持）、调试难度（重组不直观）、APK体积（+2-3MB）。总体Compose是Android UI未来方向，新项目推荐用Compose，老项目渐进迁移。`,
    tags: ["对比分析", "优势", "局限", "Compose vs View"]
  }
];
