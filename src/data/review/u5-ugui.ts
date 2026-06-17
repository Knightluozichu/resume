/** 复习题库 · uGUI 界面系统（u5-ugui）。《Unity 5 权威讲解》第10章改编。 */

import type { ReviewQuestion } from "./types";

export const u5UguiQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-ug-1",
    chapter: "u5-ugui",
    level: 1,
    question: "`Canvas` 是什么？它有哪几种渲染模式，最常用的是哪个？",
    answer:
      "`Canvas` 是**所有 UI 元素的根容器**——就是「贴在镜头前的那块玻璃板」，UI 元素必须是它的**子节点**才会被画出来。三种渲染模式：**Screen Space - Overlay**（铺在屏幕最上层、永远盖在 3D 画面之上，**最常用**，做血条 / 分数 / 按钮）、**Screen Space - Camera**（交给某摄像机渲染，可被 3D 物体遮挡）、**World Space**（把整块 UI 放进 3D 世界当成一个物体，做操作面板 / VR 菜单）。",
    tags: ["Canvas", "渲染模式", "Overlay", "定义"],
  },
  {
    id: "u5-ug-2",
    chapter: "u5-ugui",
    level: 1,
    question: "`EventSystem` 是干什么的？少了它会怎样？",
    answer:
      "`EventSystem` 是场景里一个**独立的对象**，专门**处理 UI 输入**——把鼠标点击 / 触摸 / 键盘等派发给被点到的 UI 元素，从而触发按钮的 `onClick`、Slider 的拖动。它和 Canvas 各司其职：**Canvas 管「画什么、画在哪」，EventSystem 管「点了谁、拖了谁」**。**关键：场景里没有它，按钮、拖拽等一切 UI 交互都不响应（且不报错）**——按钮点了没反应，第一件事就是查它在不在。建第一个 UI 元素时 Unity 通常会自动创建它。",
    tags: ["EventSystem", "UI输入", "必备对象", "定义"],
  },
  {
    id: "u5-ug-3",
    chapter: "u5-ugui",
    level: 1,
    question: "`RectTransform` 和普通 `Transform` 有什么不同？它的核心是什么？",
    answer:
      "`RectTransform` 是 UI 元素专用的**定位组件**，是普通 `Transform` 的「矩形版」（UI 元素自动带它）。普通 Transform 只有 position / rotation / scale；RectTransform 多了一套适配 2D 矩形布局的属性，核心是 **anchors（锚点）+ pivot（轴心）**：锚点决定「相对父级的哪个参照点定位、如何随父级缩放」，轴心决定「绕哪个点旋转 / 缩放、`anchoredPosition` 量的是哪个点」。常用属性：**`anchoredPosition`**（UI 定位用它，不是 `position`）、**`sizeDelta`**（尺寸）。",
    tags: ["RectTransform", "anchors", "pivot", "定义"],
  },
  {
    id: "u5-ug-4",
    chapter: "u5-ugui",
    level: 1,
    question:
      "RectTransform 的**锚点（anchors）**是什么？单点锚和拉伸锚各适合什么？",
    answer:
      "**锚点**是 RectTransform 上的一组**参照点**（在父级矩形上、用 0~1 表示相对位置），决定元素「相对父级的哪个参照点定位、父级缩放时怎么变」。两种典型：**单点锚**（四个锚收成一个点，钉在父级某个角 / 中心 → 元素**大小不变、只跟着那个点移动**，适合**按钮 / 图标**）；**拉伸锚**（把左右或上下锚分开 → 元素**跟着父级一起伸缩**，适合**标题栏 / 进度条 / 满屏背景**）。设对锚点，换分辨率 / 父级缩放才不跑位、不拉伸错乱。",
    tags: ["锚点", "单点锚", "拉伸锚", "定义"],
  },
  {
    id: "u5-ug-5",
    chapter: "u5-ugui",
    level: 1,
    question: "`Button` 的 `onClick` 是什么？怎么把自己的方法接到它上面？",
    answer:
      "`onClick` 是 `Button` 组件自带的**点击事件**。点击按钮时它被触发，会自动调用所有**注册**到它上面的方法。两种注册方式：①**代码** `button.onClick.AddListener(方法)`——把一个方法「接」到事件上（传**方法名、不加括号**）；②**Inspector** 的 On Click() 列表里把目标对象 + 方法拖上去。**接好线一次，之后每次点击都自动跑你的方法**，常在方法里用代码更新 UI（如计数 +1 写进 Text）。",
    tags: ["onClick", "AddListener", "Button", "定义"],
  },
  {
    id: "u5-ug-6",
    chapter: "u5-ugui",
    level: 1,
    question:
      "uGUI 常用的 UI 元素有哪些？要在脚本里操作它们，需要写哪一行 `using`？",
    answer:
      "常用元素：**Text**（文字）、**Image**（图片）、**Button**（按钮）、**Slider**（滑条）、**Toggle**（开关）、**InputField**（输入框）。要在脚本里用 `Text` / `Button` / `Slider` / `Image` 等类型，脚本顶部**必须写 `using UnityEngine.UI;`**——否则编译器报「找不到类型 `Text`」（编译错，不是静默失败）。注意 `RectTransform` / `Canvas` 在 `UnityEngine` 里、不需要这行。",
    tags: ["UI元素", "Text", "using UnityEngine.UI", "定义"],
  },
  {
    id: "u5-ug-7",
    chapter: "u5-ugui",
    level: 1,
    question: "`CanvasGroup` 能用来做什么？它有哪三个常用字段？",
    answer:
      "`CanvasGroup` 挂在一组 UI 的父对象上，能**一次性统一控制这一整组** UI。三个常用字段：**`alpha`**（整组透明度 0~1，做面板淡入 / 淡出）、**`interactable`**（整组能否交互——点击 / 拖动）、**`blocksRaycasts`**（整组是否拦截点击，`false` 时点击会穿透到下层）。做暂停面板、弹窗的淡入淡出和禁用，用它比逐个改元素省事得多。",
    tags: ["CanvasGroup", "alpha", "interactable", "定义"],
  },

  // ── L2 理解：辨析 / 关系 ──
  {
    id: "u5-ug-8",
    chapter: "u5-ugui",
    level: 2,
    question:
      "Canvas 和 EventSystem 分工有什么不同？为什么「只有 Canvas、没有 EventSystem」按钮就不响应？",
    answer:
      "**Canvas 管「画什么、画在哪」**——它是 UI 的根容器，决定元素画在屏幕最上层还是放进 3D 世界、怎么布局。**EventSystem 管「点了谁、拖了谁」**——它负责把鼠标 / 触摸输入**派发**给被点到的 UI 元素，从而触发 `onClick` 等事件。两者缺一不可：只有 Canvas，UI 能**画出来**，但没人把点击「送」给按钮，于是点了也**不会触发任何事件**（且不报错）。所以按钮没反应，先看场景里有没有 EventSystem。",
    tags: ["Canvas", "EventSystem", "分工", "辨析"],
  },
  {
    id: "u5-ug-9",
    chapter: "u5-ugui",
    level: 2,
    question:
      "父框（Canvas）变宽时，「单点锚（钉右上角）的按钮」和「拉伸锚（左右锚分开）的横条」分别会怎样变？",
    answer:
      "**单点锚的按钮**：只是**贴着右上角平移**——它和右上角的相对距离保持不变，于是父框变宽时它跟着往右挪，但**自身大小一点不变**（适合按钮、图标这种大小固定的元素）。**拉伸锚的横条**：**跟着父框一起变宽**——左右两个锚分别贴着父框左右边，父框变宽多少它就变宽多少，**左右边距保持**（适合标题栏、进度条、满屏背景）。同一次缩放、两种锚点、两种结果——这就是 anchors 的意义。",
    tags: ["锚点", "单点锚", "拉伸锚", "辨析"],
  },
  {
    id: "u5-ug-10",
    chapter: "u5-ugui",
    level: 2,
    question:
      "用代码挪一个 UI 元素，该用 `transform.position` 还是 `RectTransform.anchoredPosition`？为什么？",
    answer:
      "该用 **`RectTransform.anchoredPosition`**。`transform.position` 是**世界坐标**，对 Screen Space 的 UI 并不直观——它受 Canvas 缩放、锚点影响，拿它摆 UI 元素几乎必然「位置乱跳」、换分辨率全乱。`anchoredPosition` 量的是「**相对锚点的偏移**」，会配合锚点在各分辨率下**自动适配**。一句话：**UI 挪位用 `anchoredPosition`，别用 `transform.position`**。",
    tags: ["anchoredPosition", "transform.position", "定位", "辨析"],
  },
  {
    id: "u5-ug-11",
    chapter: "u5-ugui",
    level: 2,
    question:
      "`button.onClick.AddListener(OnClick)` 和 `button.onClick.AddListener(OnClick())` 有什么区别？哪个对？",
    answer:
      "**`AddListener(OnClick)`（不加括号）是对的**——它把 `OnClick` 这个**方法本身**「注册」到事件上，之后每次点击才调用它。**`AddListener(OnClick())`（加括号）是错的**——`OnClick()` 表示**立刻调用一次** `OnClick` 并把它的**返回值**当参数传进去，根本不是注册。一句话：注册事件传**方法名、不加括号**（这是把方法「接上去」，不是「调用它」）。",
    tags: ["AddListener", "方法引用", "调用", "辨析"],
  },
  {
    id: "u5-ug-12",
    chapter: "u5-ugui",
    level: 2,
    question:
      "做血条该用 `image.fillAmount` 还是「改 RectTransform 的宽度」？`fillAmount` 取值范围和前提是什么？",
    answer:
      "**优先用 `image.fillAmount`**——它取 `0~1`（0 空、1 满），把它设成 `hp / maxHp`，血条就随血量涨落，比「改宽度」省事得多（改宽度还要处理锚点和轴心）。**前提**：那个 Image 的 **Image Type 必须设成 Filled**（默认 Simple 下给 `fillAmount` 赋值不会有任何视觉变化），再选 Fill Method（水平 / 垂直 / 径向）和 Fill Origin。",
    tags: ["fillAmount", "血条", "Image Type", "辨析"],
  },

  // ── L3 应用：用法 / 排错 ──
  {
    id: "u5-ug-13",
    chapter: "u5-ugui",
    level: 3,
    question:
      "按钮做好了、`onClick` 也接了线，运行时点按钮**一点反应都没有**、也不报错。最该先查什么？",
    answer:
      "**最该先查场景里有没有 `EventSystem` 对象**——这是按钮没反应最常见的原因。没有它，所有 UI 点击 / 拖拽都不会触发（且不报错），常见于手动删掉了它或从极简场景搭 UI 没创建。修法：Hierarchy 里 **右键 → UI → Event System** 补一个。其次排查：②`button` 引用在 Inspector 里是不是 `None`（没拖对象）；③`AddListener` 传的是方法名不加括号、`Start` 真的执行了；④按钮 Interactable 勾着、上面没有透明 Image 挡住点击。口诀：**先看 EventSystem，再看引用，再看接线**。",
    tags: ["EventSystem", "按钮无响应", "排错", "应用"],
  },
  {
    id: "u5-ug-14",
    chapter: "u5-ugui",
    level: 3,
    question:
      "编辑器里 UI 摆得好好的，一**换分辨率 / 换机型** UI 就跑到屏幕外、背景没铺满、文字框拉变形。问题出在哪？怎么修？",
    answer:
      "问题出在**锚点（anchors）没设对**——比如该用「拉伸锚」铺满的背景却用了单点锚（只钉一个角、不跟屏幕变宽），或该靠右上角的按钮锚在了中心。修法：**按元素用途设锚点**——靠角的按钮 / 图标用**单点锚**钉在对应角；该铺满一行 / 一列的标题栏、进度条、背景用**拉伸锚**（把左右或上下锚拉开）。设对锚点后，换分辨率元素会自己适配。（必要时配合 Canvas Scaler 的 UI Scale Mode 做整体缩放。）",
    tags: ["锚点", "换分辨率", "跑位", "排错"],
  },
  {
    id: "u5-ug-15",
    chapter: "u5-ugui",
    level: 3,
    question:
      "脚本里写了 `Text scoreText;` 编译报「找不到类型或命名空间名称 Text」。为什么？怎么修？",
    answer:
      "因为 `Text`（以及 `Button` / `Slider` / `Image` 等 uGUI 组件）都在 **`UnityEngine.UI`** 命名空间里，而脚本顶部**漏写了 `using UnityEngine.UI;`**。这不是静默失败、是**编译错**，整个脚本都跑不起来。修法：在脚本顶部加上 `using UnityEngine.UI;`。（顺带记：`RectTransform` / `Canvas` 在 `UnityEngine` 里，不需要这行；但 `Text` / `Button` 需要。）",
    tags: ["using UnityEngine.UI", "编译错", "Text", "排错"],
  },
  {
    id: "u5-ug-16",
    chapter: "u5-ugui",
    level: 3,
    question:
      '下面这段想做「点按钮分数 +1 显示到 Text」，却**点一下加好几分**。哪里错了？怎么改？\n```csharp\nvoid Update() {\n    addButton.onClick.AddListener(() => { score++; scoreText.text = "" + score; });\n}\n```',
    answer:
      '错在**把 `AddListener` 放进了 `Update`**——`Update` 每帧执行，于是每帧都给按钮**重复注册一个新监听器**，注册了几百上千个；点一次按钮，这些监听器**全被调用**，`score` 一下加很多。修法：**注册放 `Start`、只接一次线**，把逻辑提成独立方法：\n```csharp\nvoid Start() { addButton.onClick.AddListener(OnAdd); }\nvoid OnAdd() { score++; scoreText.text = $"分数：{score}"; }\n```\n要点：`AddListener` 是「接线」，只该接一次，绝不能放进每帧跑的 `Update`。',
    tags: ["AddListener", "Update", "重复注册", "排错"],
  },
  {
    id: "u5-ug-17",
    chapter: "u5-ugui",
    level: 3,
    question:
      "怎么写一个脚本：用 `Image.fillAmount` 做血条，提供 `TakeDamage(float)` 扣血让血条缩短？那个 Image 在 Inspector 怎么设？",
    answer:
      "`Start` 初始化满血、`TakeDamage` 扣血并刷新血条：\n```csharp\nusing UnityEngine;\nusing UnityEngine.UI;\npublic class Health : MonoBehaviour {\n    [SerializeField] Image hpBar;\n    [SerializeField] float maxHp = 100f;\n    float hp;\n    void Start() { hp = maxHp; UpdateBar(); }\n    public void TakeDamage(float dmg) { hp = Mathf.Max(0f, hp - dmg); UpdateBar(); }\n    void UpdateBar() { hpBar.fillAmount = hp / maxHp; }\n}\n```\n要点：用 `fillAmount = hp / maxHp` 把血量映射到 0~1、`Mathf.Max(0f, ...)` 防扣成负、别忘 `using UnityEngine.UI;`。**Inspector**：选中血条 Image，把 **Image Type 改成 Filled**（默认 Simple 下 `fillAmount` 不起作用），再选 Fill Method（一般 Horizontal）和 Fill Origin（如 Left）。",
    tags: ["fillAmount", "血条", "Image Type", "应用"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-ug-18",
    chapter: "u5-ugui",
    level: 4,
    question:
      "做一个完整的游戏 HUD：屏幕右上角分数 Text、顶部一条随屏幕拉伸的血条、一个暂停按钮、一个可淡入淡出并禁用交互的暂停面板。各用什么组件 / 锚点 / API？要避开哪些坑？",
    answer:
      '**结构**：搭 `Canvas`（render mode = Screen Space - Overlay）做根，下挂这些元素，场景里**确保有 `EventSystem`**（否则按钮 / 面板都点不动）。\n**① 右上角分数**：一个 `Text`，**单点锚钉右上角**（换分辨率始终贴右上，大小不变）；代码 `scoreText.text = $"分数：{score}"` 更新。\n**② 顶部血条**：一个 `Image`（Image Type = **Filled**），**水平方向用拉伸锚**让它随屏幕宽度伸缩；代码 `hpBar.fillAmount = hp / maxHp` 随血量涨落。\n**③ 暂停按钮**：`Button`，`Start` 里 `pauseButton.onClick.AddListener(OnPause)`（**接线放 Start、不放 Update**，传方法名不加括号）。\n**④ 暂停面板**：给面板父对象挂 `CanvasGroup`，`OnPause` 里设 `cg.alpha = 1; cg.interactable = true; cg.blocksRaycasts = true`（关闭时全设 false / 0）做淡入淡出 + 禁用。\n**贯穿原则**：拿引用记得 `using UnityEngine.UI;`、UI 挪位用 `anchoredPosition` 不用 `transform.position`。要避开的坑：场景缺 EventSystem → 全不响应；锚点没设对 → 换分辨率跑位 / 血条没铺满；`fillAmount` 没把 Image Type 设 Filled → 血条不动；`AddListener` 放进 Update → 重复注册点一下加很多。',
    tags: [
      "综合",
      "Canvas",
      "EventSystem",
      "锚点",
      "fillAmount",
      "CanvasGroup",
      "迁移",
    ],
  },
];
