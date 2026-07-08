import type { ReviewQuestion } from "./types";

export const gep1ResourceManagementQuestions: ReviewQuestion[] = [
  {
    id: "gep1-resource-management-1",
    chapter: "gep1-resource-management",
    level: 1,
    question: "引用计数如何决定资源的加载与卸载时机？",
    answer: "每个资源维护 refCount。请求加载时 refCount=1，多处引用时 refCount++，引用释放时 refCount--。归零时才真正卸载。配合 GUID 去重——同一资源全局只加载一次，第二次请求直接从缓存返回。这保证不会卸载正在使用的资源（归零才卸），也不会重复加载同一资源（GUID 去重）。",
    tags: ["引用计数", "GUID"],
  },
  {
    id: "gep1-resource-management-2",
    chapter: "gep1-resource-management",
    level: 2,
    question: "为什么 GPU 资源必须在渲染线程创建，而不能在 IO 线程创建？",
    answer: "图形 API（OpenGL/Vulkan）的上下文绑定在渲染线程，IO 线程调用 `glCreateTexture` 等会崩溃或产生无效对象。所以异步加载分四步走四个线程：主线程发请求 → IO 线程读文件+反序列化（只把数据读到内存）→ 渲染线程上传 GPU → 主线程回调通知就绪。IO 线程不碰图形 API，GPU 上传任务移交渲染线程队列执行。",
    tags: ["异步加载", "渲染线程", "GPU资源"],
  },
  {
    id: "gep1-resource-management-3",
    chapter: "gep1-resource-management",
    level: 3,
    question: "引用计数归零时为什么要延迟一帧再卸载？",
    answer: "因为释放可能发生在渲染遍历中途——当前帧的渲染命令可能还在引用这个资源。如果立即卸载，GPU 还没执行完这帧的命令就访问到已释放资源，导致崩溃或花屏。延迟一帧卸载（放入待卸载队列，下一帧开头确认 GPU 已完成上帧再释放）保证安全。这叫「帧延迟释放」，是引擎资源管理的标准做法。",
    tags: ["帧延迟释放", "卸载时机"],
  },
  {
    id: "gep1-resource-management-4",
    chapter: "gep1-resource-management",
    level: 4,
    question: "资源依赖链（贴图→材质→网格）为什么要按拓扑排序加载？请设计一个加载流程。",
    answer: "依赖关系要求被依赖项先就绪。网格引用材质、材质引用贴图。如果先加载网格，材质还没就绪，渲染时材质指针为空会崩溃。拓扑排序保证：先加载贴图（无依赖）→ 再加载材质（依赖贴图已就绪）→ 最后加载网格（依赖材质已就绪）。加载流程：① 解析网格的依赖声明，构建依赖图；② 拓扑排序得到加载顺序；③ 按顺序异步加载，每一层用上一层的就绪回调触发下一层；④ 全部就绪后回调通知网格可用。配合引用计数：网格持有材质引用（材质 refCount++），材质持有贴图引用，卸载时反向释放。",
    tags: ["综合", "依赖链", "拓扑排序"],
  },
];
