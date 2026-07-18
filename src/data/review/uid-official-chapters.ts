import type { ReviewQuestion } from "./types";

export const uidOfficialQuestions: ReviewQuestion[] = [
  {
    id: "uid-official-learning-map-1",
    chapter: "uid-official-learning-map",
    level: 1,
    question: "《Unity UI设计》对应的英文原版、作者和章节数是什么？",
    answer:
      "对应 Simon Jackson 的 Unity 3D UI Essentials；原版有六个正文章和一个 3D Scene Sample 附录。",
    tags: ["导读", "原书复刻"],
  },
  {
    id: "uid-official-learning-map-2",
    chapter: "uid-official-learning-map",
    level: 2,
    question: "为什么学习顺序必须从历史与布局开始？",
    answer:
      "控件、锚点和空间 UI 都依赖 Canvas 与 Rect Transform 心智模型；先理解旧系统限制，才能知道新架构解决了什么。",
    tags: ["导读", "原书复刻"],
  },
  {
    id: "uid-official-learning-map-3",
    chapter: "uid-official-learning-map",
    level: 3,
    question: "全书统一的 UI 事件链是什么？",
    answer:
      "Input Module 产生事件数据，EventSystem 协调，Raycaster 找目标，组件或接口消费事件，布局与 Canvas 产生最终视觉。",
    tags: ["导读", "原书复刻"],
  },
  {
    id: "uid-official-learning-map-4",
    chapter: "uid-official-learning-map",
    level: 2,
    question: "为什么出版社目录中的 Preface 和 Index 不应计入正文章数？",
    answer:
      "它们是前置说明和检索辅助，不承担独立章节知识单元。覆盖率以六个 Chapter 和一个 Appendix 为分母，导读与总复习同样不占名额。",
    tags: ["导读", "证据实验"],
  },
  {
    id: "uid-official-learning-map-5",
    chapter: "uid-official-learning-map",
    level: 3,
    question: "画出一次按钮点击从设备到回调的最短路径。",
    answer:
      "设备输入先由 Input Module 转成 PointerEventData，EventSystem 组织射线检测，GraphicRaycaster 返回目标，ExecuteEvents 或 Selectable 状态机派发，最终触发 Button.onClick 监听器。",
    tags: ["导读", "证据实验"],
  },
  {
    id: "uid-official-learning-map-6",
    chapter: "uid-official-learning-map",
    level: 4,
    question: "怎样忠实加入 UI Toolkit 对照而不篡改原书？",
    answer:
      "先完整讲清原书 uGUI 问题和实现，再在独立迁移段说明 UI Toolkit 的等价目标、不同对象模型和不等价能力；目录和覆盖率仍按原书七个单元计算。",
    tags: ["导读", "证据实验"],
  },
  {
    id: "uid-01-looking-back-looking-forward-1",
    chapter: "uid-01-looking-back-looking-forward",
    level: 1,
    question: "第一章为什么先列出旧 GUI 的大量控件？",
    answer:
      "为了证明旧系统能力并不贫乏，真正的差异在状态、布局、事件和扩展模型，而不是有没有按钮或滚动区。",
    tags: ["Chapter 1", "原书复刻"],
  },
  {
    id: "uid-01-looking-back-looking-forward-2",
    chapter: "uid-01-looking-back-looking-forward",
    level: 2,
    question: "Rect Transform 相比 Transform 增加了什么？",
    answer: "增加矩形尺寸、锚点、轴心和边距偏移，使元素能相对父矩形表达布局。",
    tags: ["Chapter 1", "原书复刻"],
  },
  {
    id: "uid-01-looking-back-looking-forward-3",
    chapter: "uid-01-looking-back-looking-forward",
    level: 3,
    question: "新 UnityEvent system 解决了什么协作问题？",
    answer:
      "它把可序列化事件连接暴露给 Inspector，使设计者能连接回调，同时保留代码监听方式。",
    tags: ["Chapter 1", "原书复刻"],
  },
  {
    id: "uid-01-looking-back-looking-forward-4",
    chapter: "uid-01-looking-back-looking-forward",
    level: 2,
    question: "即时模式和保留模式最本质的状态差异是什么？",
    answer:
      "即时模式在每帧调用中声明并读取状态，保留模式把元素及其属性保存在对象树中；后者能被序列化、检查、动画化和独立扩展。",
    tags: ["Chapter 1", "证据实验"],
  },
  {
    id: "uid-01-looking-back-looking-forward-5",
    chapter: "uid-01-looking-back-looking-forward",
    level: 3,
    question: "为什么透明 Image 也可能让按钮失效？",
    answer:
      "若 Image 的 Raycast Target 开启且位于按钮上方，GraphicRaycaster 会先命中它；视觉透明不等于射线透明。",
    tags: ["Chapter 1", "证据实验"],
  },
  {
    id: "uid-01-looking-back-looking-forward-6",
    chapter: "uid-01-looking-back-looking-forward",
    level: 4,
    question: "如何验证 UnityEvent 监听器没有重复注册？",
    answer:
      "进入和退出对象生命周期多次，记录监听器数量与点击回调次数；在 Awake/OnEnable 注册时要在匹配的 OnDestroy/OnDisable 移除。",
    tags: ["Chapter 1", "证据实验"],
  },
  {
    id: "uid-02-building-layouts-1",
    chapter: "uid-02-building-layouts",
    level: 1,
    question: "Rect Transform 的锚点使用什么坐标？",
    answer: "使用父矩形中的归一化坐标，(0,0) 是左下，(1,1) 是右上。",
    tags: ["Chapter 2", "原书复刻"],
  },
  {
    id: "uid-02-building-layouts-2",
    chapter: "uid-02-building-layouts",
    level: 2,
    question: "三种 Canvas Scaler 模式分别解决什么？",
    answer:
      "Constant Pixel Size 保持像素比例，Scale with Screen Size 以参考分辨率缩放，Constant Physical Size 尝试按 DPI 保持物理单位。",
    tags: ["Chapter 2", "原书复刻"],
  },
  {
    id: "uid-02-building-layouts-3",
    chapter: "uid-02-building-layouts",
    level: 3,
    question: "GraphicRaycaster 为什么必须在布局之后理解？",
    answer:
      "它以最终图形矩形和排序结果做命中；几何错误会直接表现为点击范围错误。",
    tags: ["Chapter 2", "原书复刻"],
  },
  {
    id: "uid-02-building-layouts-4",
    chapter: "uid-02-building-layouts",
    level: 2,
    question: "右上角固定按钮应怎样设置锚点和轴心？",
    answer:
      "anchorMin 与 anchorMax 都设为 (1,1)，pivot 设为 (1,1)，再用负的 anchoredPosition 表示向左下的边距。",
    tags: ["Chapter 2", "证据实验"],
  },
  {
    id: "uid-02-building-layouts-5",
    chapter: "uid-02-building-layouts",
    level: 3,
    question: "为什么嵌套 Content Size Fitter 会抖动？",
    answer:
      "父级尺寸依赖子级首选尺寸，子级可用宽度又依赖父级结果时会形成反馈环；应拆开控制轴或指定稳定的 Layout Element。",
    tags: ["Chapter 2", "证据实验"],
  },
  {
    id: "uid-02-building-layouts-6",
    chapter: "uid-02-building-layouts",
    level: 4,
    question: "如何区分布局错误和射线错误？",
    answer:
      "先在运行时读取最终 RectTransform 矩形；几何正确再检查 GraphicRaycaster 结果、Raycast Target、CanvasGroup 和 InputModule，按两条链分别定位。",
    tags: ["Chapter 2", "证据实验"],
  },
  {
    id: "uid-03-control-control-1",
    chapter: "uid-03-control-control",
    level: 1,
    question: "Sliced 与 Filled Image 的目标分别是什么？",
    answer:
      "Sliced 保持边角边框并拉伸中部；Filled 按比例裁出部分图像表示进度。",
    tags: ["Chapter 3", "原书复刻"],
  },
  {
    id: "uid-03-control-control-2",
    chapter: "uid-03-control-control",
    level: 2,
    question: "Selectable 的 Transition 有哪三类常用实现？",
    answer: "Color Tint、Sprite Swap 和 Animation。",
    tags: ["Chapter 3", "原书复刻"],
  },
  {
    id: "uid-03-control-control-3",
    chapter: "uid-03-control-control",
    level: 3,
    question: "ScrollRect 最少依赖哪些结构？",
    answer:
      "ScrollRect 本体、Viewport、Mask 或 RectMask2D、Content RectTransform，以及正确的锚点和轴心。",
    tags: ["Chapter 3", "原书复刻"],
  },
  {
    id: "uid-03-control-control-4",
    chapter: "uid-03-control-control",
    level: 2,
    question: "血条边框不能拉伸变形时应选择哪种图像方式？",
    answer:
      "边框用 Sliced Image 保持四角和边缘，内部进度可单独使用 Filled Image 改变 fillAmount。",
    tags: ["Chapter 3", "证据实验"],
  },
  {
    id: "uid-03-control-control-5",
    chapter: "uid-03-control-control",
    level: 3,
    question: "为什么按钮禁用后手柄焦点可能丢失？",
    answer:
      "当前选中对象变成不可交互后，EventSystem 不会自动知道业务期望的替代节点；应在状态变化时选择最近可用目标并恢复焦点。",
    tags: ["Chapter 3", "证据实验"],
  },
  {
    id: "uid-03-control-control-6",
    chapter: "uid-03-control-control",
    level: 4,
    question: "如何证明 Slider 监听器没有产生反馈循环？",
    answer:
      "区分用户事件与程序赋值，必要时用 SetValueWithoutNotify；记录一次输入只触发一次业务更新，并测试业务回写不会再次派发。",
    tags: ["Chapter 3", "证据实验"],
  },
  {
    id: "uid-04-anchors-away-1",
    chapter: "uid-04-anchors-away",
    level: 1,
    question: "固定锚点和拉伸锚点如何区分？",
    answer:
      "anchorMin 与 anchorMax 相等是固定锚点，不等时在对应轴形成拉伸区间。",
    tags: ["Chapter 4", "原书复刻"],
  },
  {
    id: "uid-04-anchors-away-2",
    chapter: "uid-04-anchors-away",
    level: 2,
    question: "CanvasScaler 为什么不能修复局部布局？",
    answer:
      "它只提供全局 Canvas 单位到像素的比例，元素之间的边距、对齐和内容约束仍由 RectTransform 与布局组件决定。",
    tags: ["Chapter 4", "原书复刻"],
  },
  {
    id: "uid-04-anchors-away-3",
    chapter: "uid-04-anchors-away",
    level: 3,
    question: "选择 Constant Physical Size 前必须验证什么？",
    answer:
      "目标设备报告的 DPI 是否可信，以及真实物理尺寸、可读性和触控面积是否满足要求。",
    tags: ["Chapter 4", "原书复刻"],
  },
  {
    id: "uid-04-anchors-away-4",
    chapter: "uid-04-anchors-away",
    level: 2,
    question: "顶部栏为什么应使用水平拉伸锚点？",
    answer:
      "它需要左右边距随父宽保持而宽度自动变化；anchorMin.x=0、anchorMax.x=1，再用 offset 表达边距。",
    tags: ["Chapter 4", "证据实验"],
  },
  {
    id: "uid-04-anchors-away-5",
    chapter: "uid-04-anchors-away",
    level: 3,
    question: "Match 为 0 与 1 的含义是什么？",
    answer:
      "0 完全按参考宽度比例缩放，1 完全按参考高度比例缩放，中间值在两者对数尺度上混合。",
    tags: ["Chapter 4", "证据实验"],
  },
  {
    id: "uid-04-anchors-away-6",
    chapter: "uid-04-anchors-away",
    level: 4,
    question: "Safe Area 应放在原章覆盖率里吗？",
    answer:
      "不应作为原始小节计数；它是现代设备迁移补充，应建立在原章锚点与分辨率策略之上并单独标注。",
    tags: ["Chapter 4", "证据实验"],
  },
  {
    id: "uid-05-screen-world-camera-1",
    chapter: "uid-05-screen-world-camera",
    level: 1,
    question: "哪种 Canvas 模式不需要渲染相机？",
    answer: "Screen Space Overlay。",
    tags: ["Chapter 5", "原书复刻"],
  },
  {
    id: "uid-05-screen-world-camera-2",
    chapter: "uid-05-screen-world-camera",
    level: 2,
    question: "Render Camera 与 Event Camera 的职责有何不同？",
    answer:
      "前者投影和合成 UI，后者把屏幕输入转换到 Canvas 平面供 GraphicRaycaster 命中。",
    tags: ["Chapter 5", "原书复刻"],
  },
  {
    id: "uid-05-screen-world-camera-3",
    chapter: "uid-05-screen-world-camera",
    level: 3,
    question: "屏幕空间血条的关键转换链是什么？",
    answer: "世界点经目标相机转成屏幕点，再按 Canvas 模式转成 Canvas 局部点。",
    tags: ["Chapter 5", "原书复刻"],
  },
  {
    id: "uid-05-screen-world-camera-4",
    chapter: "uid-05-screen-world-camera",
    level: 2,
    question: "Overlay Canvas 的坐标转换为何通常传 null 相机？",
    answer:
      "Overlay 不经场景相机投影，RectTransformUtility 对屏幕点转换时使用 null；Camera 与 World 模式应传 Canvas 的 worldCamera。",
    tags: ["Chapter 5", "证据实验"],
  },
  {
    id: "uid-05-screen-world-camera-5",
    chapter: "uid-05-screen-world-camera",
    level: 3,
    question: "世界目标在相机后方时如何处理屏幕标记？",
    answer:
      "先检查 WorldToScreenPoint.z，负值时隐藏或按业务规则投影到边缘，不能直接使用翻转后的 x、y。",
    tags: ["Chapter 5", "证据实验"],
  },
  {
    id: "uid-05-screen-world-camera-6",
    chapter: "uid-05-screen-world-camera",
    level: 4,
    question: "为什么 World Space Canvas 需要定义尺度规范？",
    answer:
      "RectTransform 尺寸是 Canvas 单位，Transform scale 决定其世界尺寸；无规范会造成极大对象、不可读文字和不一致交互范围。",
    tags: ["Chapter 5", "证据实验"],
  },
  {
    id: "uid-06-working-with-ui-source-1",
    chapter: "uid-06-working-with-ui-source",
    level: 1,
    question: "EventSystem 如何得到最终目标？",
    answer:
      "活动 InputModule 产生事件数据，所有 Raycaster 返回结果，EventSystem 按规则排序并选择目标。",
    tags: ["Chapter 6", "原书复刻"],
  },
  {
    id: "uid-06-working-with-ui-source-2",
    chapter: "uid-06-working-with-ui-source",
    level: 2,
    question: "自定义事件三件套是什么？",
    answer:
      "BaseEventData 派生数据、IEventSystemHandler 派生接口和 ExecuteEvents.EventFunction 静态派发器。",
    tags: ["Chapter 6", "原书复刻"],
  },
  {
    id: "uid-06-working-with-ui-source-3",
    chapter: "uid-06-working-with-ui-source",
    level: 3,
    question: "源码开放为何不等于应该直接修改？",
    answer: "修改会承担版本耦合、补丁合并和回归成本，公开扩展点通常更稳定。",
    tags: ["Chapter 6", "原书复刻"],
  },
  {
    id: "uid-06-working-with-ui-source-4",
    chapter: "uid-06-working-with-ui-source",
    level: 2,
    question: "自定义事件为什么要实现 IEventSystemHandler？",
    answer:
      "ExecuteEvents 用该标记接口约束可派发处理器；业务接口继承它后，框架才能按类型查找目标组件。",
    tags: ["Chapter 6", "证据实验"],
  },
  {
    id: "uid-06-working-with-ui-source-5",
    chapter: "uid-06-working-with-ui-source",
    level: 3,
    question: "RaycastAll 有结果但点击回调没执行，应继续查什么？",
    answer:
      "检查排序后的首目标、父级查找方式、组件是否实现正确接口、对象是否 active/interactable，以及输入模块是否执行了 click 条件。",
    tags: ["Chapter 6", "证据实验"],
  },
  {
    id: "uid-06-working-with-ui-source-6",
    chapter: "uid-06-working-with-ui-source",
    level: 4,
    question: "什么时候才值得 fork uGUI 源码？",
    answer:
      "当公开 API、继承、组合和自定义组件都无法满足需求，且收益足以承担版本锁定、补丁维护和全量回归时。",
    tags: ["Chapter 6", "证据实验"],
  },
  {
    id: "uid-appendix-3d-scene-sample-1",
    chapter: "uid-appendix-3d-scene-sample",
    level: 1,
    question: "附录包含哪两个原始小节？",
    answer: "Setting up for the big game 和 The initial 3D scene。",
    tags: ["Appendix", "原书复刻"],
  },
  {
    id: "uid-appendix-3d-scene-sample-2",
    chapter: "uid-appendix-3d-scene-sample",
    level: 2,
    question: "场景夹具与展示样片的主要差异是什么？",
    answer: "夹具优先稳定输入、可控变量和可重放结果，展示样片优先视觉完成度。",
    tags: ["Appendix", "原书复刻"],
  },
  {
    id: "uid-appendix-3d-scene-sample-3",
    chapter: "uid-appendix-3d-scene-sample",
    level: 3,
    question: "空间 UI 夹具至少暴露哪些变量？",
    answer:
      "相机、目标与 UIAnchor、Canvas 模式和缩放、遮挡、事件相机及测试路径。",
    tags: ["Appendix", "原书复刻"],
  },
  {
    id: "uid-appendix-3d-scene-sample-4",
    chapter: "uid-appendix-3d-scene-sample",
    level: 2,
    question: "为什么要为目标单独创建 UIAnchor？",
    answer:
      "它把模型骨骼和 UI 跟随位置解耦，提供稳定、可调整且可视化的世界坐标契约。",
    tags: ["Appendix", "证据实验"],
  },
  {
    id: "uid-appendix-3d-scene-sample-5",
    chapter: "uid-appendix-3d-scene-sample",
    level: 3,
    question: "相机轨迹为什么必须确定性？",
    answer:
      "随机或手动观察无法确保修改前后输入一致；固定轨迹才能比较投影、朝向、遮挡与事件命中。",
    tags: ["Appendix", "证据实验"],
  },
  {
    id: "uid-appendix-3d-scene-sample-6",
    chapter: "uid-appendix-3d-scene-sample",
    level: 4,
    question: "原资源不可用时怎样保持附录忠实？",
    answer:
      "用 Primitive 重建地面、目标和障碍，保留相机、尺度、锚点、Canvas 与测试关系，并明确资产载体已替换。",
    tags: ["Appendix", "证据实验"],
  },
  {
    id: "uid-official-final-review-1",
    chapter: "uid-official-final-review",
    level: 1,
    question: "全书原始覆盖分母是多少？",
    answer: "六个正文章加一个附录，共七个原始单元；导读和总复习不计入。",
    tags: ["总复习", "原书复刻"],
  },
  {
    id: "uid-official-final-review-2",
    chapter: "uid-official-final-review",
    level: 2,
    question: "跨章验收为什么要参数化？",
    answer:
      "参数化能固定输入、一次改变一个变量，并让修改前后结果可比较和重放。",
    tags: ["总复习", "原书复刻"],
  },
  {
    id: "uid-official-final-review-3",
    chapter: "uid-official-final-review",
    level: 3,
    question: "本书完成的硬门槛是什么？",
    answer:
      "七单元完整、每页至少 90 分、题库和导航一致、MDX 与代码门禁通过，并有综合可重放证据。",
    tags: ["总复习", "原书复刻"],
  },
  {
    id: "uid-official-final-review-4",
    chapter: "uid-official-final-review",
    level: 2,
    question: "设计最小跨章验收场景需要哪些对象？",
    answer:
      "至少需要 Overlay/Camera/World Canvas、EventSystem、可导航菜单、滚动列表、3D Target 与 UIAnchor、可控 Camera、遮挡物和日志控制器。",
    tags: ["总复习", "证据实验"],
  },
  {
    id: "uid-official-final-review-5",
    chapter: "uid-official-final-review",
    level: 3,
    question: "怎样验证焦点恢复？",
    answer:
      "记录打开弹窗前的选中对象，弹窗内只允许遍历有效控件，关闭后恢复发起者；再测试发起者被禁用时的备用目标。",
    tags: ["总复习", "证据实验"],
  },
  {
    id: "uid-official-final-review-6",
    chapter: "uid-official-final-review",
    level: 4,
    question: "现代迁移何时判定不等价？",
    answer:
      "当对象模型、事件传播、布局语义或可见行为无法一一对应时，应明确不等价并保留原实现，不能以新版运行成功宣称完全复刻。",
    tags: ["总复习", "证据实验"],
  },
];
