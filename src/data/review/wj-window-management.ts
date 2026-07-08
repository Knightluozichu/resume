import type { ReviewQuestion } from "./types";

export const wjWindowManagementQuestions: ReviewQuestion[] = [
  {
    id: "wj-window-management-1",
    chapter: "wj-window-management",
    level: 2,
    question: "窗口类（Window Class）和窗口实例（Window Instance）的关系是什么？",
    answer:
      "窗口类是模板，窗口实例是按模板创建的具体对象。`RegisterClassEx` 注册一个窗口类（`WNDCLASSEX` 结构），定义了该类所有窗口共享的属性：窗口过程函数指针（`lpfnWndProc`）、光标、图标、背景画刷、类样式等。`CreateWindowEx` 基于已注册的类名创建窗口实例，可以创建多个同类窗口——它们共享同一个窗口过程和类属性，但拥有各自独立的 `HWND`、位置、大小和窗口数据。类比面向对象编程：窗口类 = 类定义（含方法 `WindowProc`），窗口实例 = 对象实例，`HWND` = 对象引用。窗口类只需注册一次，之后可反复创建实例。`UnregisterClass` 在不需要该类时注销。",
    tags: ["窗口类", "核心概念"],
  },
  {
    id: "wj-window-management-2",
    chapter: "wj-window-management",
    level: 2,
    question: "WNDCLASSEX 结构体中最关键的几个字段是什么？各自的作用？",
    answer:
      "`WNDCLASSEX` 最关键的字段：①`lpfnWndProc`——窗口过程回调函数指针，所有发往该类窗口的消息都会调用此函数处理，是最核心的字段（类似 C++ 的虚函数表入口）；②`lpszClassName`——窗口类名（字符串），是 `CreateWindowEx` 时查找类的唯一标识；③`hInstance`——注册该类的模块实例句柄，内核用 `(hInstance, lpszClassName)` 联合标识一个窗口类；④`hbrBackground`——背景画刷，窗口重绘时先填充背景色；⑤`hCursor`——鼠标移入窗口时的光标；⑥`style`——类样式标志（如 `CS_HREDRAW|CS_VREDRAW` 表示窗口尺寸变化时重绘）；⑦`cbSize`——结构体大小，供版本兼容。`cbClsExtra` 和 `cbWndExtra` 可为类/窗口分配额外内存存储自定义数据。",
    tags: ["WNDCLASSEX", "结构体"],
  },
  {
    id: "wj-window-management-3",
    chapter: "wj-window-management",
    level: 3,
    question: "什么是窗口子类化（Subclassing）？它和超类化（Superclassing）有什么区别？",
    answer:
      "子类化是替换已有窗口的窗口过程函数指针，使其消息先经过自定义函数处理——常用于修改标准控件行为而不重新实现。实例子类化用 `SetWindowLongPtr(hwnd, GWLP_WNDPROC, NewProc)` 替换特定窗口实例的过程；全局子类化用 `SetClassLongPtr` 替换整个类的过程影响所有实例。自定义过程处理感兴趣的消息后，通过 `CallWindowProc(OldProc, ...)` 将其余消息转发给原过程。超类化是基于已有窗口类创建一个新类——先 `GetClassInfoEx` 取出原类属性，修改 `lpfnWndProc` 和 `lpszClassName` 后 `RegisterClassEx` 注册新类，新类可以创建自己的窗口实例。区别：子类化改的是已有窗口实例（运行时），超类化创建的是新类（编译时/初始化时），不影响原类窗口。",
    tags: ["子类化", "超类化", "高级技术"],
  },
  {
    id: "wj-window-management-4",
    chapter: "wj-window-management",
    level: 3,
    question: "窗口样式（WS_*）和扩展样式（WS_EX_*）有什么区别？常见的有哪些？",
    answer:
      "窗口样式（`WS_*`）是 `CreateWindowEx` 的 `dwStyle` 参数，定义窗口的基本外观和行为：`WS_OVERLAPPEDWINDOW`（组合样式，含标题栏、最大化/最小化按钮、边框、系统菜单，最常用）、`WS_POPUP`（无边框弹出窗口）、`WS_CHILD`（子窗口，有父窗口）等。扩展样式（`WS_EX_*`）是 `dwExStyle` 参数，定义额外的高级行为：`WS_EX_TOPMOST`（置顶）、`WS_EX_LAYERED`（分层窗口，支持透明度）、`WS_EX_TOOLWINDOW`（工具窗口，不在任务栏显示）、`WS_EX_TRANSPARENT`（鼠标穿透）、`WS_EX_CLIENTEDGE`（凹陷边框）。区别：`WS_*` 是 Windows 3.x 时代的基本样式；`WS_EX_*` 是后来扩展的，功能更丰富。两者可以组合使用，用 `GetWindowLong`/`SetWindowLong` 可动态修改。",
    tags: ["窗口样式", "属性"],
  },
];
