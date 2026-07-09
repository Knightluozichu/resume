import type { ReviewQuestion } from "./types";

export const jpcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "jpc-lm-1",
    chapter: "jpc-learning-map",
    level: 1,
    question: "Jetpack Compose全书的学习路径分为哪几个阶段？各阶段的核心主题是什么？",
    answer: "全书分九个阶段递进展开：①全书学习地图（知识体系总览）②Compose基础（@Composable、remember、Slot API）③布局与修饰符（Column/Row/Box、Modifier链、LazyColumn）④状态管理（State、重组、状态提升、ViewModel）⑤动画（animate*AsState、Animatable、AnimatedVisibility）⑥主题与样式（MaterialTheme、ColorScheme、Typography、Shapes）⑦导航与路由（NavHost、NavController、类型安全路由）⑧与View互操作（AndroidView、ComposeView、迁移策略）⑨高级Compose（自定义Layout、手势处理、SubcomposeLayout）。递进逻辑：先理解声明式心智模型，再学布局组织结构，然后状态驱动更新，接着动画和主题增强体验，导航管理页面流，互操作解决渐进迁移，最后高级技术实现复杂交互。",
    tags: ["学习路径", "知识体系", "全书概览"]
  },
  {
    id: "jpc-lm-2",
    chapter: "jpc-learning-map",
    level: 1,
    question: "声明式UI的核心公式是什么？它与命令式UI的本质区别是什么？",
    answer: "核心公式：UI = f(state)。声明式UI中，UI是状态的函数映射——开发者描述UI在不同状态下的样子，框架在状态变化时自动重新执行@Composable函数（重组）更新UI。命令式UI中，开发者需要手动操作View对象（findViewById+setText/setVisibility），状态与UI手动同步。本质区别在于「谁来管理UI更新」：命令式由开发者手动同步，声明式由框架自动同步。声明式优势：状态与UI自动同步、单一数据源、无XML纯Kotlin描述、编译期智能跳过优化性能。",
    tags: ["声明式UI", "UI=f(state)", "心智模型"]
  },
  {
    id: "jpc-lm-3",
    chapter: "jpc-learning-map",
    level: 2,
    question: "组合优于继承在Compose中如何体现？与传统View体系的扩展方式有何不同？",
    answer: "传统View体系通过继承扩展组件（class RoundButton extends Button），导致类爆炸和继承耦合。Compose通过组合和修饰符实现扩展：①组合——复杂组件由多个简单@Composable嵌套构成，如RoundButton = Button(shape=CircleShape) { Text() }；②修饰符——Modifier链式调用改变外观和行为，如Modifier.clip(CircleShape).background(Color.Red).padding(16.dp)，无需继承即可定制；③Slot API——组件提供content lambda让调用方决定内容，如Scaffold(topBar={...}) { content }。优势：无类爆炸、无继承耦合、可任意组合复用、编译期类型安全。",
    tags: ["组合优于继承", "Slot API", "Modifier"]
  },
  {
    id: "jpc-lm-4",
    chapter: "jpc-learning-map",
    level: 2,
    question: "全书各章节之间存在哪些交叉关联？举例说明。",
    answer: "交叉关联：①状态×动画——State变化驱动动画，如animateColorAsState根据selected状态自动过渡颜色；②布局×主题——Modifier消费主题Token，如Modifier.background(MaterialTheme.colorScheme.surface)；③状态×导航——路由参数作为State，如composable<Detail>中entry.toRoute<Detail>().id传入ViewModel；④互操作×高级——AndroidView中可嵌入手势，如WebView用Modifier.pointerInput添加缩放手势；⑤布局×高级——自定义Layout扩展标准布局容器，用Layout()+MeasurePolicy实现FlowLayout等非标准布局；⑥状态×性能——derivedStateOf减少不必要重组，LazyColumn的key保障列表项状态稳定。一条主线贯穿：@Composable是基础，State驱动更新，Modifier修饰外观和行为。",
    tags: ["交叉关联", "知识图谱", "架构"]
  }
];
