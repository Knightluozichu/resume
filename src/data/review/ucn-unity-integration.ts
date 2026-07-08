import type { ReviewQuestion } from "./types";

export const ucnUnityIntegrationQuestions: ReviewQuestion[] = [
  {
    id: "ucn-unity-integration-1",
    chapter: "ucn-unity-integration",
    level: "B",
    question: "为什么 Unity 网络层要用 C++ Native Plugin 而不直接用 C# 写？",
    answer:
      "① 性能：C++ 网络层直接调用 epoll/IOCP，无 GC 停顿，收发延迟可控在微秒级；C# 的 Socket 类在收发高频消息时 GC 压力大，每次 BeginReceive/EndReceive 都会产生 GC 分配；② 跨平台一致性：同一份 C++ 网络代码编译为各平台 Native Plugin（Windows .dll / Linux .so / Android .so / iOS .a），行为一致；C# 的 Socket 在不同平台的 IL2CPP 后端行为有微妙差异；③ 代码复用：C++ 网络层与服务器共享同一套 Protobuf 定义和封包逻辑，减少重复；④ 职责分离：C++ 跑独立网络线程，不占 Unity 主线程，不触发 GC，不影响渲染帧率。",
    tags: ["Native Plugin", "P/Invoke", "性能", "Unity"],
  },
  {
    id: "ucn-unity-integration-2",
    chapter: "ucn-unity-integration",
    level: "B",
    question: "P/Invoke 的 Marshal.Copy 和 unsafe 指针两种数据传递方式有什么区别？何时用哪种？",
    answer:
      "Marshal.Copy：C++ 侧填充 char* 缓冲区，C# 侧用 Marshal.Copy(ptr, byteArray, 0, size) 拷贝到托管数组。安全简单，但有一次内存拷贝（native → managed）。适用于消息量中等（每帧几十条）的场景。unsafe 指针：C# 用 unsafe { byte* p = (byte*)ptr; } 直接读 native 内存，零拷贝。性能最高，但需要 unsafe 编译选项，且指针操作不当会崩溃。适用于高频大消息（如场景快照、AOI 广播）的场景。实际项目中通常先用 Marshal.Copy 保证正确性，Profile 发现瓶颈后再针对性切换 unsafe。",
    tags: ["P/Invoke", "Marshal", "unsafe", "性能"],
  },
  {
    id: "ucn-unity-integration-3",
    chapter: "ucn-unity-integration",
    level: "C",
    question: "描述 Unity 主线程从 C++ Native Plugin 取消息并分发的完整流程。",
    answer:
      "① Unity 主线程的 NetworkManager.Update() 每帧调用 net_poll(byte[] buf, int maxSize)；② C++ 侧 net_poll 从消息队列取一条消息，拷贝到 buf，返回字节数（0=无消息）；③ C# 侧读取前 2 字节获取 MsgId，再读 Protobuf 体；④ 按 MsgId 查 C# 侧的路由表（Dictionary&lt;ushort, Action&lt;byte[]&gt;&gt;），找到对应的回调；⑤ 回调内用 Protobuf 反序列化消息，触发事件（如 OnDamageNotify 事件）；⑥ 事件订阅者（角色控制器/UI 控制器）更新表现层——播放动画/刷新血条；⑦ 如果队列有多条消息，net_poll 在一帧内循环调用直到返回 0，但设置单帧最大处理条数（如 50）防止卡帧。",
    tags: ["Unity", "P/Invoke", "消息分发", "主线程"],
  },
  {
    id: "ucn-unity-integration-4",
    chapter: "ucn-unity-integration",
    level: "A",
    question: "C++ 网络线程和 Unity 主线程之间如何保证线程安全？C++ 线程为什么不能直接调用 Unity API？",
    answer:
      "C++ 网络线程不能直接调用 Unity API，因为：① Unity API（Transform/UI/Physics）只能在主线程调用，跨线程调用会抛异常；② C++ 线程没有 Unity 的托管上下文，无法访问 managed 对象。线程安全方案：① C++ 侧用线程安全队列（互斥锁或无锁环形队列）——网络线程写入收到的消息，主线程读取，这是唯一的跨线程交互点；② C++ 导出 net_poll 函数供主线程调用，主线程在自己的上下文中取数据，天然安全；③ C# 侧用主线程的 Update 轮询 net_poll，收到的数据全部在主线程处理，不需要锁；④ 如果 C++ 需要通知 C# 有紧急事件（如断线），用标记位（atomic flag），主线程 net_poll 时检查。",
    tags: ["线程安全", "Unity", "主线程", "并发"],
  },
];
