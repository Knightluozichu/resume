import type { ReviewQuestion } from "./types";

export const dakWmsViewQuestions: ReviewQuestion[] = [
  {
    id: "dak-wms-1",
    chapter: "dak-wms-view",
    level: 1,
    question: "WMS如何管理窗口？Surface是如何分配的？",
    answer: "WMS运行在system_server中，管理所有窗口的创建、层级排序和Surface分配。窗口管理：每个Activity对应一个Window（PhoneWindow是唯一实现），根View是DecorView（含StatusBar+ActionBar+ContentParent）。窗口分多种类型按Z-order排序：TYPE_APPLICATION（普通App窗口）、TYPE_SYSTEM（系统窗口如状态栏）、TYPE_TOAST、TYPE_INPUT_METHOD等。WMS通过WindowState管理每个窗口，按mBaseLayer/mSubLayer排序决定显示顺序和遮挡关系。Surface分配流程：①App进程ViewRootImpl.setView()通过Binder调用WMS.addWindow()；②WMS创建WindowState向SurfaceFlinger申请创建Layer；③SurfaceFlinger创建图形缓冲区（基于ashmem/ION共享内存）；④Surface控制句柄通过Binder返回给App进程；⑤App的ViewRootImpl获得Surface可绘制内容；⑥App绘制到Surface，SurfaceFlinger按Z-order合成提交到Display。",
    tags: ["WMS", "窗口管理", "Surface", "WindowState", "Z-order"],
  },
  {
    id: "dak-wms-2",
    chapter: "dak-wms-view",
    level: 2,
    question: "View绘制三步流程分别是什么？详细描述每一步。",
    answer: "View绘制三步从DecorView开始自顶向下递归，由ViewRootImpl.performTraversals()驱动。①measure（测量）——确定View宽高。MeasureSpec=Mode+Size，Mode三种：EXACTLY（精确值match_parent或具体dp）、AT_MOST（最大值wrap_content）、UNSPECIFIED（无限制如ScrollView子View）。onMeasure根据父View的MeasureSpec测量自身宽高，ViewGroup递归调用measureChildWithMargins测量所有子View，最后setMeasuredDimension保存结果。②layout（布局）——确定View在父容器中的位置（四边坐标）。layout(l,t,r,b)先setFrame设置mLeft/mTop/mRight/mBottom，再调用onLayout让子类摆放子View。ViewGroup的onLayout遍历子View调用child.layout()摆放。③draw（绘制）——将内容绘制到Surface。顺序：drawBackground→onDraw（自身内容）→dispatchDraw（递归绘制子View）→onDrawForeground（前景/滚动条）。硬件加速下构建DisplayList，RenderThread异步提交GPU渲染。",
    tags: ["measure", "layout", "draw", "MeasureSpec", "绘制流程"],
  },
  {
    id: "dak-wms-3",
    chapter: "dak-wms-view",
    level: 2,
    question: "VSync和Choreographer的作用是什么？一帧的完整渲染流程是怎样的？",
    answer: "VSync（垂直同步信号）——屏幕60fps刷新率时每16.67ms产生一次，保证UI更新与屏幕刷新同步避免画面撕裂。Choreographer（编舞者）——接收VSync信号，协调Input/Animation/Traversal三个阶段按帧对齐执行，避免不协调渲染。一帧完整渲染流程：①触发——invalidate()或requestLayout()被调用，ViewRootImpl向Choreographer注册Traversal回调；②VSync等待——Choreographer等待下一个VSync信号；③doFrame执行——VSync到来后Choreographer.doFrame()依次执行：INPUT（输入事件）→ANIMATION（动画计算）→TRAVERSAL（measure+layout+draw）；④绘制——performTraversals()执行performMeasure+performLayout+performDraw，draw阶段构建DisplayList；⑤RenderThread——DisplayList提交给RenderThread异步提交GPU渲染到Surface图形缓冲区；⑥SurfaceFlinger——VSync到来后收集所有Layer按Z-order合成提交HWComposer显示到屏幕。一帧预算16.67ms，超时导致掉帧（Jank）。",
    tags: ["VSync", "Choreographer", "帧同步", "渲染管线", "掉帧"],
  },
  {
    id: "dak-wms-4",
    chapter: "dak-wms-view",
    level: 3,
    question: "invalidate()和requestLayout()的区别是什么？硬件加速如何工作？",
    answer: "区别：①invalidate()——标记View需要重绘（只触发draw，不重新measure/layout）。调用后ViewRootImpl向Choreographer注册Traversal回调，下一帧VSync到来时执行performDraw重新绘制View内容。适用于View外观变化但大小位置不变的场景如改变颜色/文字内容。②requestLayout()——标记View需要重新布局（触发measure+layout，可能也触发draw）。下一帧执行performMeasure+performLayout，如果尺寸位置变了还触发performDraw。适用于View大小或位置变化如改变宽高/margin。③区别——invalidate只重绘更轻量，requestLayout重新测量布局开销更大（递归measure整个View树）。两者都通过Choreographer等待VSync执行不立即生效。硬件加速工作原理：Android默认开启，draw阶段构建DisplayList（绘制指令序列化记录如drawRect/drawText及参数）而非直接操作Canvas。DisplayList构建后由RenderThread异步提交GPU执行渲染，主线程只需构建指令不需等待GPU。优势：减轻主线程压力、DisplayList可缓存、GPU批量渲染提高效率。硬件加速是复杂动画/绘制不阻塞主线程的关键。",
    tags: ["invalidate", "requestLayout", "硬件加速", "DisplayList", "RenderThread"],
  },
];
