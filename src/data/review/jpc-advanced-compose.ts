import type { ReviewQuestion } from "./types";

export const jpcAdvancedComposeQuestions: ReviewQuestion[] = [
  {
    id: "jpc-ac-1",
    chapter: "jpc-advanced-compose",
    level: 1,
    question: "Layout组件的MeasurePolicy接收哪些参数？自定义布局的核心步骤是什么？",
    answer: "MeasurePolicy lambda接收：①measurables——待测量的子元素列表（List<Measurable>），每个可调用measure(constraints)测量。②constraints——父元素给的约束（Constraints含minWidth/maxWidth/minHeight/maxHeight）。核心步骤：①测量——遍历measurables，每个调用measure(constraints)得到Placeable（含width/height）。②计算总尺寸——根据所有Placeable的尺寸计算布局的总width和height。③摆放——调用layout(width, height)返回结果，在lambda中用placeable.placeRelative(x, y)将每个Placeable摆放到指定坐标。④可选——constraints可以修改后传给子元素（如constraints.copy(maxWidth=...)），实现自定义约束传播。Modifier.layout()类似但只拦截单个组件的测量摆放。",
    tags: ["Layout", "MeasurePolicy", "自定义布局"]
  },
  {
    id: "jpc-ac-2",
    chapter: "jpc-advanced-compose",
    level: 2,
    question: "SubcomposeLayout与Layout有什么区别？各自适用什么场景？",
    answer: "区别：①组合方式——Layout一次性组合所有子元素再测量，SubcomposeLayout分阶段组合（先组合部分子元素测量，再根据结果决定组合其余）。②API——Layout接收measurables（已组合），SubcomposeLayout用subcompose(slotId, content)按需组合。③开销——Layout只组合一次，SubcomposeLayout可能组合多次有额外开销。Layout适用：标准布局容器（Column/Row/Box都是Layout实现的）、所有子元素已知不需要根据测量结果决定组合什么、固定结构布局、性能优先。SubcomposeLayout适用：①内容依赖测量结果——如TabRow需先测量所有Tab宽度才知道indicator位置。②懒加载——LazyColumn只组合可见项。③条件组合——某些子元素只在特定条件下出现。④BoxWithConstraints根据可用空间决定布局。原则：默认用Layout，需要「先测后组」或懒加载时才用SubcomposeLayout。",
    tags: ["SubcomposeLayout", "Layout", "分阶段组合"]
  },
  {
    id: "jpc-ac-3",
    chapter: "jpc-advanced-compose",
    level: 2,
    question: "pointerInput中的手势检测如何工作？如何同时处理点击和拖拽？",
    answer: "pointerInput在协程中运行手势检测，用awaitPointerEventScope监听底层PointerEvent（触摸事件），detect*Gestures封装了事件序列识别（tap=down+up无移动，drag=down+move）。同时处理点击和拖拽的挑战：detectTapGestures和detectDragGestures不能在同一个pointerInput中同时调用（各自占用事件流）。解决方案：①分两个pointerInput——但drag可能吞掉tap事件。②自定义手势检测——在awaitEachGesture中：awaitFirstDown获取按下事件，然后循环awaitPointerEvent，计算移动距离，超过touchSlop阈值则标记为drag开始拖拽，如果抬起且未超过阈值则为tap。③关键概念：touchSlop（触摸slop阈值）——移动距离超过此值才算拖拽，避免微小移动误判。pointerInput的key变化时取消当前协程重启检测。",
    tags: ["pointerInput", "手势检测", "touchSlop"]
  },
  {
    id: "jpc-ac-4",
    chapter: "jpc-advanced-compose",
    level: 2,
    question: "嵌套滚动的机制是什么？onPreScroll和onPostScroll的区别是什么？",
    answer: "嵌套滚动机制：子组件滚动时先问父组件是否要先消费（onPreScroll），父消费一部分后剩余给子组件滚动，子滚动完后剩余再问父是否消费（onPostScroll）。fling同理（onPreFling/onPostFling）。onPreScroll vs onPostScroll：①onPreScroll——子组件滚动前，父组件先消费。返回值是消费的Offset。如向下滚动时父组件先收起Header（消费掉这部分滚动量），剩余给子组件滚动列表。②onPostScroll——子组件滚动后，如果有剩余滚动量（如子组件已到顶），再传给父组件消费。如向上滚动且列表已到顶时，父组件用剩余量展开Header。返回值表示消费量，剩余的继续传递。消费机制：返回的Offset表示父消费了多少，子组件感知后不会重复滚动这部分。返回Offset.Zero表示不消费，全部传给子。典型应用： collapsing toolbar（滚动收起/展开Header）、嵌套滚动列表。",
    tags: ["嵌套滚动", "onPreScroll", "onPostScroll", "NestedScrollConnection"]
  }
];
