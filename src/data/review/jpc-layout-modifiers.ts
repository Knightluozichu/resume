import type { ReviewQuestion } from "./types";

export const jpcLayoutModifiersQuestions: ReviewQuestion[] = [
  {
    id: "jpc-lay-1",
    chapter: "jpc-layout-modifiers",
    level: 1,
    question: "Modifier链的顺序为什么敏感？举例说明padding和background的顺序差异。",
    answer: "Modifier链是「从外到内」的洋葱模型——链头最外层，链尾最内层，每个Modifier包裹后面的所有内容。顺序敏感因为每个操作的位置决定它作用于哪一层。padding与background的顺序差异：.padding(16.dp).background(Color.Blue)——padding在外层先撑大16dp外边距，background填充内容包括padding区域，蓝色背景=内容+padding=132dp。反过来.background(Color.Blue).padding(16.dp)——background先定义蓝色区域=100dp，padding在内层撑出内边距把内容挤压到68dp，蓝色背景仍=100dp。规则：影响外观的Modifier（background/clip/border）放在padding之前则作用于整个区域含padding，放在之后则作用于内容区域不含padding。",
    tags: ["Modifier", "顺序敏感", "padding"]
  },
  {
    id: "jpc-lay-2",
    chapter: "jpc-layout-modifiers",
    level: 1,
    question: "LazyColumn的key参数有什么作用？不提供key会有什么问题？",
    answer: "key为列表项提供唯一标识符，让Compose在列表更新时精确追踪每个项的位置变化。有key时：列表重排序/插入/删除时，Compose通过key匹配新旧项，知道「项A从位置3移到位置5」而非「位置3被删除、位置5是新的」。不提供key的问题：①状态丢失——项内部remember保存的状态（如展开/折叠）在位置变化时丢失，所有项重置；②动画异常——AnimatedItemScope位移动画无法正确触发，项闪烁而非平滑移动；③性能下降——无法精确diff，可能重组更多项。正确做法：items(users, key = { it.id })用业务唯一ID。不能用index作为key——index随列表变化而变，失去追踪意义。",
    tags: ["LazyColumn", "key", "列表性能"]
  },
  {
    id: "jpc-lay-3",
    chapter: "jpc-layout-modifiers",
    level: 2,
    question: "Compose布局的测量流程分为哪两个阶段？简述各自的作用。",
    answer: "两阶段：①measure（测量）——父→子传播约束。父元素通过Constraints(minWidth,maxWidth,minHeight,maxHeight)告诉子元素可用空间范围，子元素调用measurable.measure(constraints)测量自己，返回Placeable（含width/height）。②place（摆放）——子→父返回位置。在layout(width,height)的lambda中，用placeable.placeRelative(x,y)将子元素摆放到父坐标系中的指定位置。自定义Layout就是在这两个阶段中自定义逻辑：measure阶段决定子元素如何测量（可用空间如何分配），place阶段决定子元素如何摆放（x/y坐标如何计算）。IntrinsicSize用于在测量前获取子元素固有尺寸，BoxWithConstraints用于获取可用约束。",
    tags: ["测量流程", "measure", "place", "Constraints"]
  },
  {
    id: "jpc-lay-4",
    chapter: "jpc-layout-modifiers",
    level: 2,
    question: "Column中Arrangement和Alignment分别控制什么？如何实现子元素两端对齐且水平居中？",
    answer: "Column中：verticalArrangement控制主轴（垂直方向）的子元素分布——决定子元素之间及与容器边缘的垂直间距，选项有Start/Center/End/SpaceBetween/SpaceEvenly/SpaceAround/spacedBy。horizontalAlignment控制交叉轴（水平方向）的子元素对齐——决定子元素在水平方向的相对位置，选项有Start/CenterHorizontally/End。两端对齐且水平居中：Column(verticalArrangement = Arrangement.SpaceBetween, horizontalAlignment = Alignment.CenterHorizontally)。注意Row中正好相反——horizontalArrangement控制主轴（水平）分布，verticalAlignment控制交叉轴（垂直）对齐。记忆方法：Arrangement控制主轴分布，Alignment控制交叉轴对齐。",
    tags: ["Column", "Arrangement", "Alignment", "布局对齐"]
  }
];
