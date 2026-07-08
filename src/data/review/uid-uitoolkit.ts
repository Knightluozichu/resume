import type { ReviewQuestion } from "./types";

/** UI Toolkit 复习题 */
export const uidUitoolkitQuestions: ReviewQuestion[] = [
  {
    id: "uid-uitoolkit-1",
    chapter: "uid-uitoolkit",
    level: 1,
    question: "UI Toolkit 的三层架构是什么？",
    answer: "UXML（结构层，类似 HTML 定义元素层级）、USS（样式层，类似 CSS 控制外观和布局）、C#（逻辑层，通过 UIDocument 组件查询元素和注册事件）。三层分离，各司其职。",
    tags: ["UI Toolkit", "架构"],
  },
  {
    id: "uid-uitoolkit-2",
    chapter: "uid-uitoolkit",
    level: 2,
    question: "UI Toolkit 和 UGUI 的核心区别是什么？",
    answer: "1)UI Toolkit 不创建 GameObject，VisualElement 是轻量数据对象，不进入场景树；2)UI Toolkit 用保留模式渲染（只重绘变化部分），UGUI 用即时模式（每帧重建网格）；3)UI Toolkit 支持 Flexbox 布局，UGUI 用 LayoutGroup；4)UI Toolkit 用 UXML/USS 分离结构和样式，UGUI 全在 Inspector 配置。UI Toolkit 适合编辑器和复杂数据面板，UGUI 适合运行时游戏 UI。",
    tags: ["UI Toolkit", "UGUI", "对比"],
  },
  {
    id: "uid-uitoolkit-3",
    chapter: "uid-uitoolkit",
    level: 3,
    question: "如何在 C# 中查询 UXML 中的元素并注册事件？",
    answer: "通过 UIDocument 组件获取 rootVisualElement，然后用 LINQ 风格的 Q 方法查询：var btn = root.Q&lt;Button&gt;(\"myBtn\")；注册事件：btn.RegisterCallback&lt;ClickEvent&gt;(e => { ... })。也支持 className 查询：root.Q&lt;Label&gt;(className: \"title\")。查询性能：Q 方法遍历 VisualElement 树，大量查询建议缓存引用。",
    tags: ["查询", "事件", "C#"],
  },
  {
    id: "uid-uitoolkit-4",
    chapter: "uid-uitoolkit",
    level: 4,
    question: "用 UI Toolkit 实现一个自定义编辑器窗口，包含列表和详情面板，如何设计？",
    answer: "1)创建 EditorWindow，rootVisualElement 加载 UXML；2)UXML 用两栏 Flexbox 布局——左侧 ListView（flex:1），右侧详情面板（flex:2）；3)USS 定义选中高亮、间距、字体样式；4)C# 绑定：listView.makeItem 创建列表项模板，bindItem 填充数据，onSelectionChange 切换详情面板内容；5)详情面板用 SerializedObject 绑定数据字段，修改自动反映到 UXML；6)用 UI Debugger（Window/UI Toolkit/Debugger）实时调试布局。优势：相比 IMGUI 不用每帧 OnGUI 重绘，性能更好。",
    tags: ["编辑器窗口", "ListView", "综合"],
  },
];
