import type { ReviewQuestion } from "./types";

export const aalWmsWindowQuestions: ReviewQuestion[] = [
  {
    id: "aal-ww-1",
    chapter: "aal-wms-window",
    level: 1,
    question: "Android中Window有哪几种类型？它们的层级范围和特点是什么？",
    answer: "Android Window分为三种类型：①Application Window（应用窗口）——层级1~99，对应Activity窗口（PhoneWindow/DecorView），与Activity一一对应，通过WindowManager添加，是最常见的窗口类型；②System Window（系统窗口）——层级1000~1999，包括StatusBar（状态栏）、NavigationBar（导航栏）、输入法窗口、Toast、系统对话框等，需要SYSTEM_ALERT_WINDOW等系统权限才能创建，z-order在应用窗口之上；③Sub Window（子窗口）——层级1000~1999，如PopupWindow、ContextMenu，必须依附于父窗口存在，坐标随父窗口变化，不能独立存在。窗口层级决定了z-order——层级数值越大显示在越上层。WMS通过WindowState管理每个窗口的层级，SurfaceFlinger按层级顺序合成窗口。",
    tags: ["Window类型", "Application Window", "System Window", "Sub Window"]
  },
  {
    id: "aal-ww-2",
    chapter: "aal-wms-window",
    level: 2,
    question: "Window、View、Surface三者的关系是什么？ViewRootImpl在其中扮演什么角色？",
    answer: "三者关系：①Window——窗口的抽象概念，每个Activity对应一个Window（PhoneWindow），是View树的容器；②View——UI组件，通过View树（DecorView → ContentView → 具体View）描述界面内容，Window持有DecorView作为根View；③Surface——绘图表面，是真正用于绘制的缓冲区，由SurfaceFlinger管理，每个Window拥有一个Surface。ViewRootImpl的角色：①桥梁——ViewRootImpl是View树与WMS之间的桥梁，它持有WindowSession（与WMS通信的Binder接口）和Surface；②驱动绘制——ViewRootImpl.performTraversals()是View绘制的入口，依次调用performMeasure()→performLayout()→performDraw()；③Surface管理——在draw阶段通过Surface.lockCanvas()获取Canvas，View树绘制到Canvas上，然后Surface.unlockCanvasAndPost()提交给SurfaceFlinger合成显示；④事件分发——ViewRootImpl接收InputManagerService的输入事件，分发到View树。ViewRootImpl每个Window只有一个实例。",
    tags: ["Window", "View", "Surface", "ViewRootImpl", "绘制流程"]
  },
  {
    id: "aal-ww-3",
    chapter: "aal-wms-window",
    level: 2,
    question: "WMS（Window Manager Service）的核心职责是什么？它如何管理窗口的层级和焦点？",
    answer: "WMS核心职责：①窗口管理——管理所有Window的添加、更新、移除，每个Window对应一个WindowState对象，记录窗口的位置、大小、动画、可见性等状态；②Surface分配——为每个Window分配Surface，管理Surface的生命周期（创建/销毁/大小变更）；③层级排序——维护窗口的z-order，按Window类型层级（Application < System < Sub）和添加顺序排序，确保正确的叠加显示；④焦点管理——维护当前焦点窗口（FocusedWindow），输入事件由InputManagerService路由到焦点窗口的ViewRootImpl；⑤窗口动画——管理窗口的进入/退出动画、旋转动画；⑥Token校验——通过WindowToken验证窗口创建权限，防止恶意应用伪造系统窗口。WMS运行在system_server，App通过WindowManager（继承ViewManager）接口添加/更新/移除窗口，底层通过Binder与WMS通信。",
    tags: ["WMS", "窗口管理", "Surface", "层级排序", "焦点管理"]
  },
  {
    id: "aal-ww-4",
    chapter: "aal-wms-window",
    level: 3,
    question: "Android View的完整绘制流程（measure/layout/draw）是怎样的？每个阶段的作用是什么？",
    answer: "View绘制流程由ViewRootImpl.performTraversals()触发，分三阶段：①measure（测量）——自顶向下递归测量每个View的宽高。父View根据自身的MeasureSpec（EXACTLY/AT_MOST/UNSPECIFIED）和子View的LayoutParams计算子View的MeasureSpec，子View在onMeasure()中根据MeasureSpec确定最终宽高，调用setMeasuredDimension()保存结果。②layout（布局）——自顶向下递归确定每个View在父容器中的位置。父View在onLayout()中根据measure阶段测量的宽高和布局规则（如LinearLayout的方向、gravity）计算子View的left/top/right/bottom，调用child.layout()设置位置。③draw（绘制）——自顶向下递归绘制每个View的内容。ViewRootImpl通过Surface.lockCanvas()获取Canvas，View在onDraw()中将内容绘制到Canvas上（背景、内容、子View、装饰），最后Surface.unlockCanvasAndPost()提交给SurfaceFlinger合成。draw流程遵循软件绘制或硬件加速（HardwareRenderer），硬件加速通过DisplayList优化绘制效率。三阶段顺序固定：measure→layout→draw。",
    tags: ["绘制流程", "measure", "layout", "draw", "MeasureSpec"]
  }
];
