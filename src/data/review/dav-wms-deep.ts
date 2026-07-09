import type { ReviewQuestion } from "./types";

export const davWmsDeepQuestions: ReviewQuestion[] = [
  {
    id: "dav-wms-1",
    chapter: "dav-wms-deep",
    level: 1,
    question: "WMS的核心数据结构是什么？窗口的Z-order如何排序？",
    answer: "窗口层级树：RootWindowContainer→DisplayContent→WindowToken→WindowState。WindowState含mLayer（Z-order层级）、mSurface（SurfaceControl）、mFrame（位置）。Z-order从底到顶：壁纸窗口（WALLPAPER）→应用窗口（APPLICATION）→系统窗口（SYSTEM_ALERT/TOAST）→输入法窗口（INPUT_METHOD）→状态栏/导航栏。assignLayersLocked()为每个WindowState分配mLayer值，SurfaceFlinger据此合成。",
    tags: ["WMS", "WindowState", "WindowToken", "Z-order", "层级树"],
  },
  {
    id: "dav-wms-2",
    chapter: "dav-wms-deep",
    level: 2,
    question: "View绘制三步是什么？measure/layout/draw各做什么？",
    answer: "ViewRootImpl.performTraversals()驱动三步：①measure——View.measure()调用onMeasure()，ViewGroup遍历子View调用measure()，递归测量尺寸（MeasureSpec的EXACTLY/AT_MOST/UNSPECIFIED）。②layout——View.layout()调用onLayout()，ViewGroup遍历子View调用layout()确定位置。③draw——View.draw()绘制背景+内容+装饰，硬件加速构建DisplayList由RenderThread异步提交GPU，软件渲染直接操作Canvas。三者从DecorView递归向下。",
    tags: ["View绘制", "measure", "layout", "draw", "performTraversals"],
  },
  {
    id: "dav-wms-3",
    chapter: "dav-wms-deep",
    level: 3,
    question: "Choreographer和VSync如何协调UI绘制？掉帧的原因是什么？",
    answer: "scheduleTraversals()插入SyncBarrier（暂停普通消息）+注册VSync回调。VSync信号到来（60Hz每16.67ms）→doFrame()按顺序处理INPUT→ANIMATION→TRAVERSAL→COMMIT→performTraversals()→移除SyncBarrier。掉帧原因：16.67ms内未完成完整流程（VSync→measure+layout+draw→RenderThread）。常见：主线程耗时操作阻塞Traversal、布局层级深measure/layout慢、过度绘制、GC停顿、GPU负载高。",
    tags: ["Choreographer", "VSync", "SyncBarrier", "掉帧", "doFrame"],
  },
  {
    id: "dav-wms-4",
    chapter: "dav-wms-deep",
    level: 2,
    question: "输入系统的工作流程是什么？Input ANR如何触发？",
    answer: "InputReader线程读取/dev/input设备节点转为KeyEvent/MotionEvent→InputDispatcher线程查找焦点窗口（WMS提供）→Binder发送InputEvent给App→App的WindowInputEventReceiver收到→View树分发→处理完调用finished()。InputDispatcher发送后5秒未收到finished()→触发Input ANR。本质是App主线程被阻塞无法处理输入事件。WMS为InputDispatcher提供焦点窗口信息。",
    tags: ["输入系统", "InputDispatcher", "InputReader", "Input ANR", "焦点窗口"],
  },
];
