/** 复习题库 · 用户界面（unity-advanced-ui）。《Unity3D高级编程：主程手记》第4章。 */

import type { ReviewQuestion } from "./types";

export const unityAdvancedUiQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ua-ui-1",
    chapter: "unity-advanced-ui",
    level: 1,
    question: "UGUI 中 Canvas 的三种 Render Mode 分别是什么？各自适用于什么场景？",
    answer:
      "① **Screen Space - Overlay**：UI 始终渲染在 3D 场景最上层，不依赖摄像机，屏幕大小变化时自动适配。适用于绝大多数 2D UI（HUD、菜单、弹窗）。② **Screen Space - Camera**：UI 由指定摄像机渲染，在摄像机前方一定距离平面上，3D 物体可以在 UI 前/后穿插。适用于需要 3D 模型嵌入 UI 或粒子特效在 UI 上显示的场景。③ **World Space**：UI 作为 3D 空间中的平面存在，像 3D 物体一样有位置、旋转、缩放。适用于世界空间 UI（如血条挂在角色头顶、场景中的交互面板、VR 中面板）。",
    tags: ["Canvas", "RenderMode", "Overlay", "Camera", "WorldSpace", "UGUI"],
  },
  {
    id: "ua-ui-2",
    chapter: "unity-advanced-ui",
    level: 1,
    question: "什么是 Draw Call？UGUI 中合批（Batching）的目的是什么？",
    answer:
      "Draw Call 是 CPU 调用图形 API（如 OpenGL/DirectX/Vulkan）命令 GPU 绘制一个图元批次的调用。每次 Draw Call 都有 CPU 开销（设置渲染状态、提交顶点数据等），大量 Draw Call 会导致 CPU 瓶颈。**合批（Batching）**的目的是将多个使用相同材质（Material）、相同纹理（通常通过图集 Sprite Atlas）的 UI 元素合并成一次 Draw Call 提交，减少 Draw Call 数量。UGUI 的合批条件：元素在同一个 Canvas 下、使用相同的材质和纹理、中间没有被其他不同材质的元素「打断」层级、没有被 Mask 切割（不同 Mask 区域之间也会断批）。",
    tags: ["DrawCall", "合批", "Batching", "UGUI", "性能", "图集"],
  },
  {
    id: "ua-ui-3",
    chapter: "unity-advanced-ui",
    level: 1,
    question: "UI 栈（UI Stack）管理通常支持哪些基本操作？",
    answer:
      "UI 栈是管理 UI 页面打开/关闭/层级关系的核心数据结构，通常模拟「页面堆叠」行为：① **Push（打开页面）**——将新页面压入栈顶，显示在最上层，新页面下方的页面可能被冻结/暂停/遮罩；② **Pop（关闭页面）**——弹出栈顶页面，露出下方页面并恢复其交互；③ **Peek（获取栈顶）**——查看当前显示的是哪个页面；④ **Insert/Remove（插入/移除）**——在栈中任意位置插入或移除页面（用于在页面堆栈中插入前置页面）；⑤ **Clear/PopToRoot（清空/回首页）**——关闭所有页面回到主界面；⑥ **Replace（替换）**——关闭当前页面并打开新页面（栈深度不变）。此外通常还支持：弹窗（不压栈，叠在上层但不影响下层）、预加载（页面提前加载不显示）、回退记忆（按返回键回退上一页）。",
    tags: ["UI栈", "UIManager", "Push", "Pop", "页面管理"],
  },

  // ── L2 理解：为什么 / 原理 ──
  {
    id: "ua-ui-4",
    chapter: "unity-advanced-ui",
    level: 2,
    question: "Canvas 的重建（Rebuild）流程是怎样的？为什么说「一个 Canvas 变了会影响整个 Canvas」？",
    answer:
      "当 Canvas 下任意一个 UI 元素发生变化（位置移动、颜色改变、文字内容变化、显隐切换、Layout 重组）时，UGUI 会触发该 Canvas 的重建：① **Layout Rebuild**——重新计算所有 Layout 元素（LayoutGroup、ContentSizeFitter 等）的位置和大小；② **Graphic Rebuild**——重新生成所有脏标记（Dirty）Graphic 元素的顶点数据和材质数据（包括 Text、Image、RawImage 等）；③ **合批重新计算**——重新排序和计算合批，生成新的渲染指令。关键问题：**重建的粒度是整个 Canvas**，不是单个元素——只要一个元素变了，整个 Canvas 下所有元素都要重新参与 Layout 计算、顶点重建和合批计算。这就是为什么 UI 性能优化的第一条铁律是**拆分 Canvas**：频繁变化的元素（如血条、倒计时、动画 UI）放在单独的子 Canvas 或独立 Canvas 上，与静态不变化的大背景/主界面 Canvas 分离，避免一个数字跳动导致整个主界面 Canvas 重建。",
    tags: ["Canvas", "Rebuild", "重建", "Layout", "Graphic", "Dirty", "性能优化"],
  },
  {
    id: "ua-ui-5",
    chapter: "unity-advanced-ui",
    level: 2,
    question: "为什么要关闭不必要的 Raycast Target？Raycast Target 对性能有什么影响？",
    answer:
      "Raycast Target（Graphic 组件上的勾选框）决定这个 UI 元素是否参与 GraphicRaycaster 的射线检测。当玩家点击屏幕时，GraphicRaycaster 会遍历所有 Raycast Target=true 的 Graphic 组件，做矩形命中测试，找到最上层被点中的元素。如果不关闭不必要的 Raycast Target：① **每张背景图、装饰图、分隔线都参与射线检测**——遍历和命中测试的开销随 UI 元素数量线性增长，在复杂 UI（几百个元素）中会有明显的点击延迟；② **遮挡问题**——透明或全屏背景图如果开了 Raycast Target，会挡住下层所有按钮的点击事件。**最佳实践**：默认所有 Graphic 的 Raycast Target 关闭（Unity 默认是开的，需要手动改），只有真正需要响应点击的元素（Button、Toggle、输入框、可交互区域）才开启；纯装饰性的 Image、Text、背景图一律关闭。可以写一个 Editor 脚本在预设保存时自动检查。",
    tags: ["RaycastTarget", "射线检测", "GraphicRaycaster", "点击", "UGUI优化"],
  },
  {
    id: "ua-ui-6",
    chapter: "unity-advanced-ui",
    level: 2,
    question: "MVC、MVP、MVVM 三种 UI 架构模式的核心区别是什么？在 Unity 中各自怎么落地？",
    answer:
      "三种模式都是为了把 UI 显示和业务逻辑解耦，区别在于 View 和 Model 的通信方式：\n\n**MVC（Model-View-Controller）**：View 显示 UI、Controller 处理输入和业务逻辑、Model 持有数据。View 和 Model 可以互相通信，Controller 是中介。问题：View 容易直接读写 Model，随着项目变大仍会耦合。Unity 落地：View = MonoBehaviour+Prefab，Controller = C# 类（不继承 MonoBehaviour）管理业务流程，Model = 数据类。但实际在 Unity 中 MVC 容易写成 View 直接调 Model 的「胖 View」。\n\n**MVP（Model-View-Presenter）**：View 和 Model 完全不通信，所有交互都通过 Presenter 中转。View 只暴露接口（如 SetHpText、OnButtonClick 事件），Presenter 持有 View 接口引用和 Model 引用，View 的事件通知 Presenter，Presenter 处理业务后调用 View 接口更新显示。Unity 落地：View 是 MonoBehaviour 实现 IView 接口，Presenter 是纯 C# 类（可单元测试），通过接口操作 View，MVP 在 Unity UI 框架中非常流行。\n\n**MVVM（Model-View-ViewModel）**：View 和 ViewModel 通过**数据绑定（Data Binding）**连接——View 绑定到 ViewModel 的属性和命令，ViewModel 属性变化自动刷新 View，View 的输入自动更新 ViewModel 属性，开发者不需要手动写「textHp.text = hp.ToString()」这种更新代码。Unity 落地：需要数据绑定框架支持（如 UniRx+ReactiveProperty、uFrame、或者自己实现 INotifyPropertyChanged），ViewModel 是纯 C# 类不持有 View 引用。MVVM 适合 UI 交互复杂、数据驱动的项目，但数据绑定调试和学习成本较高。\n\n主程选择建议：中小项目 MVP 足够清晰易维护；大项目/重数据驱动 UI 可以考虑 MVVM；MVC 在 Unity 中容易失控不太推荐。",
    tags: ["MVC", "MVP", "MVVM", "UI架构", "解耦", "Presenter", "ViewModel", "数据绑定"],
  },

  // ── L3 应用：实践 / 代码分析 ──
  {
    id: "ua-ui-7",
    chapter: "unity-advanced-ui",
    level: 3,
    question: "UGUI 合批被打断的常见原因有哪些？如何避免合批断裂？",
    answer:
      "合批被打断的常见原因：① **使用不同的 Material 或 Texture**——相邻元素必须用同一材质同一图集才能合批，不同图集的元素之间必然断批；解决：把同一面板的 UI 图片打到同一个 Sprite Atlas 里；② **层级中插入不同材质的元素**——即使两个元素用同一图集，但它们中间夹了一个不同材质的元素（如一个带特效的 RawImage、一个使用不同字体的 Text），合批就会被打断；解决：调整 Hierarchy 顺序，把同材质元素放在连续的层级；③ **Mask/RectMask2D 的使用**——Mask 会导致被裁剪的元素与外部断批，不同 Mask 之间也断批；解决：减少不必要的 Mask 嵌套，能用 RectMask2D 就不用 Mask（RectMask2D 只做矩形裁剪不产生 Stencil，性能更好），Mask 下的元素保持图集一致；④ **Canvas 之间不合并**——不同 Canvas 下的元素永远不会合批；解决：不要为了隔离重建就拆出太多小 Canvas，平衡重建代价和合批收益；⑤ **Text 和 Image 交替**——Unity 内置的 Text 默认用 Default Font 材质，和 Image 的 Default UI Material 不同，Text 和 Image 交错排列会反复断批；解决：尽量把 Text 集中在 Image 之前或之后，减少穿插；或者使用 TextMeshPro（同一字体材质下的文字可以互相合批）；⑥ **特殊效果组件**——Shadow、Outline 等组件会复制顶点数据增加几何复杂度，虽然不完全断批但增加开销。",
    tags: ["合批", "Batching", "打断", "图集", "Mask", "UGUI优化", "DrawCall"],
  },
  {
    id: "ua-ui-8",
    chapter: "unity-advanced-ui",
    level: 3,
    question: "UI 对象池（Object Pool）在 UI 系统中怎么实现和使用？哪些 UI 元素需要池化？",
    answer:
      "UI 对象池的核心思路是**创建后复用，不频繁 Instantiate/Destroy**，因为 UI 元素（尤其是带 Layout、TMP、特效的复杂列表项）Instantiate 的开销很大，频繁创建销毁还会产生 GC。\n\n**需要池化的场景**：① **列表/网格项**——如背包格子、排行榜条目、聊天记录、邮件列表，滚动列表中频繁出现/消失的 item；② **频繁弹出的弹窗/Toast**——如飘字提示、获得道具弹窗、通用确认框；③ **特效/动画元素**——如伤害数字、点赞飘心。\n\n**实现要点**：① **池容器**——用 `Dictionary<string, Queue<GameObject>>` 按 UI 预制路径/类型分组存储；② **获取（Spawn）**：从池中 Dequeue，SetActive(true)，重置状态（清空文字、重置位置、重置 TMP 文本、重置动画状态）；③ **回收（Recycle/Despawn）**：SetActive(false)，Enqueue 回池中；注意回收时要取消所有订阅的事件、停止协程、清除引用，防止内存泄漏；④ **预热（Prewarm）**——在加载 UI 时预先 Instantiate 一定数量的对象入池，避免首次使用时的卡顿；⑤ **池大小管理**——设置池的上限，避免池无限膨胀，超出上限的对象直接 Destroy；⑥ **与 ScrollRect 结合**——对于超长列表（如几百上千条聊天记录），对象池还不够，需要配合「无限列表/虚拟列表」（Virtualizing ScrollRect），只保持可见区域+少量缓冲的 item，不可见的全部回收；⑦ **生命周期回调**：在 Spawn/Recycle 时调用 UI 元素的 OnSpawn/OnRecycle 方法（类似 OnEnable/OnDisable 但更明确），让元素自己负责重置状态。\n\n注意：不是所有 UI 都需要池化——不频繁开关的页面（如主界面、背包主面板）不需要池化，正常 Instantiate/Destroy 即可。池化是优化手段，过度池化会增加代码复杂度和内存占用。",
    tags: ["对象池", "ObjectPool", "UI优化", "列表", "ScrollRect", "GC", "实例化"],
  },
  {
    id: "ua-ui-9",
    chapter: "unity-advanced-ui",
    level: 3,
    question: "UI 和业务逻辑解耦的具体手段有哪些？请举例说明什么是好的解耦，什么是坏的耦合。",
    answer:
      "**坏的耦合（反面例子）**：① Button 的 OnClick 事件里直接调 `BattleManager.Instance.StartBattle()` 并直接操作 `Player.Instance.gold -= 100`——UI 直接依赖业务单例、直接改数据；② UI 持有业务对象的引用（如 `HpBar` 持有 `Player` 组件引用，每帧 `Update` 里读 `player.hp`）；③ 业务层直接操作 UI 组件（如 `BattleSystem` 里 `GameObject.Find(\"HpBar\").GetComponent<Text>().text = ...`）。\n\n**解耦手段**：① **事件/消息总线（EventBus/MessageCenter）**——业务层派发事件（如 `OnHpChanged(hp)`），UI 层监听事件更新显示，双方互不持有引用；② **接口隔离（MVP 模式）**——UI 实现接口（如 `IHpView.SetHp(int hp)`），Presenter 持有接口引用而非具体 MonoBehaviour，Presenter 可单元测试；③ **数据绑定（MVVM）**——ViewModel 暴露响应式属性（如 `ReactiveProperty<int> Hp`），View 绑定到属性自动刷新，无手动更新代码；④ **命令模式**——UI 点击发送 Command 对象（如 `BuyItemCommand(itemId)`），由 Command 执行层处理，UI 不知道业务怎么执行的；⑤ **中介者模式（UIManager）**——所有 UI 打开关闭通过 UIManager 协调，页面之间不直接互相调用；⑥ **ScriptableObject 事件通道**——用 ScriptableObject 作为 EventChannel，UI 和业务分别引用同一个 EventChannel 资产，通过它发/收事件，完全解耦。\n\n**好的解耦标准**：UI 可以在不启动游戏逻辑的情况下单独预览（如用 mock 数据在 Editor 下跑）；业务层可以不挂任何 UI 跑单元测试；换一套 UI 不需要改业务代码。",
    tags: ["解耦", "UI架构", "EventBus", "MVP", "MVVM", "事件", "接口"],
  },

  // ── L4 主程视角 ──
  {
    id: "ua-ui-10",
    chapter: "unity-advanced-ui",
    level: 4,
    question: "你作为主程要为项目搭建一套 UI 框架（UIManager），请描述核心架构设计，包括页面生命周期、栈管理、资源加载、性能优化策略。",
    answer:
      "UI 框架是项目基础建设，主程需要在项目启动前搭好骨架：\n\n**核心架构分层**：① **UIManager（单例入口）**——统一管理所有 UI 的打开、关闭、层级、栈；② **UIPage（页面基类）**——所有 UI 页面（面板、弹窗、HUD）继承的基类，定义生命周期方法（OnCtor/OnOpen/OnShow/OnHide/OnClose/OnResume/Pause）；③ **UIStack（栈数据结构）**——管理 Normal 类型页面的前进后退；④ **UILayer（层级管理）**——按 Canvas 分层：Background层（底层背景）、Normal层（主界面/功能面板）、Popup层（弹窗/对话框）、Top层（Toast/Loading/引导遮罩）、System层（系统级错误提示），每层有独立 Canvas 和合批隔离；⑤ **UIResLoader（资源加载器）**——负责从 Addressables/Resources 加载/卸载 UI 预制体，配合对象池；⑥ **UIEventSystem（事件/数据绑定层）**——提供页面间通信和 UI 与业务的解耦机制。\n\n**页面生命周期**：OnCtor（构造/加载，只执行一次）→ OnOpen（传入参数）→ OnShow（显示动画/激活）→ OnResume（被上方页面关闭后恢复）→ OnPause（被新页面盖住时暂停）→ OnHide（隐藏）→ OnClose（关闭/回收入池）。\n\n**栈管理**：页面分三种类型——Normal（压栈页面，如主界面/背包）、Popup（弹窗不压栈，叠加显示，关闭后下层自动恢复）、HUD（常驻不进栈，如顶部金币栏）。支持 Push/Pop/PopToRoot/Replace/Back（返回键）。\n\n**资源管理**：① 页面预制体通过 Addressables 异步加载，加载时显示 Loading；② 对象池复用已关闭页面（而非 Destroy）；③ 页面关闭后可以选择「保留在池中」或「完全卸载」（大页面/不常用页面卸载释放内存）；④ 图集按面板分包，加载面板时只加载所需图集。\n\n**性能优化策略**：① **Canvas 拆分**——每个 UILayer 独立 Canvas，页面内频繁变化的元素（如倒计时、动画）挂子 Canvas；② **Raycast Target 默认关闭**——基类或编辑器工具自动处理；③ **列表虚拟化为无限列表**——长列表只渲染可见区域；④ **关闭隐藏页面的 GraphicRaycaster 和 Canvas 组件**——隐藏页面不需要参与射线检测和渲染；⑤ **TMP 替代 Text**——TMP 的 SDF 渲染性能和效果更好；⑥ **避免 Overdraw**——全屏背景、不可见区域不绘制，使用 RectMask2D 裁剪；⑦ **UI 粒子特效合批**——使用 UIParticle 组件让粒子和 UI 在同一排序层正确渲染。\n\n**工程实践**：所有 UI 页面必须继承 UIPage 基类，禁止 MonoBehaviour 直接做页面逻辑；通过 [UIConfig] 特性标注页面 ID、预制路径、层级、是否池化；打开页面用 `UIManager.Instance.Open<BagPage>(param)` 泛型方法，类型安全。",
    tags: ["主程决策", "UIManager", "UI框架", "生命周期", "性能优化", "对象池", "Canvas"],
  },
];
