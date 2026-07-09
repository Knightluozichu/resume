import type { ReviewQuestion } from "./types";

export const jpcAnimationsQuestions: ReviewQuestion[] = [
  {
    id: "jpc-an-1",
    chapter: "jpc-animations",
    level: 1,
    question: "Compose动画API的三层架构是什么？如何根据场景选型？",
    answer: "三层架构：①高层声明式——AnimatedVisibility（显隐）、AnimatedContent（内容切换）、Crossfade（淡入淡出），声明式只需描述目标状态。②中层状态驱动——animate*AsState（单属性）、updateTransition（多属性联动）、rememberInfiniteTransition（无限循环），用State驱动动画。③底层精确控制——Animatable（协程驱动）、AnimationSpec（曲线配置），协程可暂停/取消。选型决策：显隐切换→AnimatedVisibility；内容切换→AnimatedContent/Crossfade；单属性变化→animate*AsState；多属性联动→updateTransition；无限循环→rememberInfiniteTransition；手势驱动/精确控制→Animatable+coroutine。原则：从高层开始选，高层满足不了才降层。",
    tags: ["动画API", "三层架构", "选型"]
  },
  {
    id: "jpc-an-2",
    chapter: "jpc-animations",
    level: 1,
    question: "updateTransition和多个animate*AsState有什么区别？何时用哪个？",
    answer: "区别：①同步性——updateTransition保证多个属性同步开始和结束动画（同一状态驱动同一帧内所有属性开始过渡），多个animate*AsState各自独立不保证完全同步。②代码组织——updateTransition将多属性动画组织在一个transition对象下更清晰。③性能——updateTransition共享一个动画时钟，多个animate*AsState各有独立时钟。何时用updateTransition：多个属性需要严格同步变化（如按钮选中时颜色+大小+圆角同时变化），且由同一状态触发。何时用多个animate*AsState：多个属性独立变化、触发条件不同（如颜色由selected驱动、大小由expanded驱动），或只需单属性动画。原则：同源多属性用updateTransition，异源单属性用animate*AsState。",
    tags: ["updateTransition", "animate*AsState", "多属性动画"]
  },
  {
    id: "jpc-an-3",
    chapter: "jpc-animations",
    level: 2,
    question: "Animatable相比animate*AsState有什么优势？适合什么场景？",
    answer: "Animatable优势：①协程控制——animateTo在协程中执行，可cancel()取消、join()等待完成、串联多个动画；②中途控制——snapTo()瞬间跳转不动画，适合手势中实时更新位置；③可组合——一个协程中串联或并行动画；④手势集成——可配合draggable做惯性滑动。适合场景：①手势驱动动画——拖拽时snapTo实时跟手，松手时animateTo+spring弹簧回弹；②需要中途暂停的动画；③物理动画（spring）；④需要串联的复杂动画序列。animate*AsState无法实现这些因为它是声明式的，不支持手动控制动画进度，也不支持在手势中实时更新值。Animatable是唯一能在协程中精确控制动画的API。",
    tags: ["Animatable", "协程驱动", "手势动画"]
  },
  {
    id: "jpc-an-4",
    chapter: "jpc-animations",
    level: 2,
    question: "AnimationSpec有哪些常用类型？各自适用什么场景？",
    answer: "四种常用类型：①tween（补间动画）——tween(durationMillis=300, easing=FastOutSlowInEasing)，固定持续时间+缓动曲线，适用大多数UI状态切换（按钮选中、展开折叠），可预测结束时间。②spring（弹簧动画）——spring(dampingRatio, stiffness)，基于弹簧物理模型，适用手势释放后回弹、拖拽列表项，物理真实手感好但持续时间不可预测。dampingRatio：1.0无弹跳、0.5中等弹跳。③keyframes（关键帧）——自定义多关键点值和时间，每段可指定不同Easing，适用复杂多阶段动画（先加速后减速、弹跳多次），精确控制但配置复杂。④repeatable/infiniteRepeatable（重复）——重复播放另一个Spec，RepeatMode.Restart从头开始、RepeatMode.Reverse反向，适用呼吸灯/脉冲/进度条循环。选择原则：默认tween+FastOutSlowInEasing，需弹跳用spring，多阶段用keyframes，循环用repeatable。",
    tags: ["AnimationSpec", "tween", "spring", "keyframes"]
  }
];
