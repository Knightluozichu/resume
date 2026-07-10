import type { ReviewQuestion } from "./types";

export const mfcMessageRoutingQuestions: ReviewQuestion[] = [
  {
    id: "mfc-message-routing-1",
    chapter: "mfc-message-routing",
    level: 2,
    question: `MFC 消息映射表是怎么工作的？它取代了 Win32 的什么？`,
    answer:
      `消息映射表是编译期生成的静态数组。在类的 .cpp 里写 BEGIN_MESSAGE_MAP(CMyView, CView) ... ON_COMMAND(ID_FILE_OPEN, OnFileOpen) ... ON_WM_PAINT() ... END_MESSAGE_MAP()，宏展开后生成一个 AFX_MSGMAP_ENTRY 数组，每项记录「消息类型/消息码/控制码 → 成员函数指针」。运行期，消息到达时框架调用 CCmdTarget::OnCmdMsg（命令消息）或 CWnd::WindowProc→OnWndMsg（窗口消息），在当前类及其基类的映射表里线性查找匹配项，命中则通过成员函数指针调用对应的成员函数（如 OnFileOpen），未命中走默认处理（DefWindowProc 或基类）。它取代了 Win32 窗口过程里庞大的 switch-case：①每条消息独立登记，不再挤在一个巨型函数；②消息处理函数是成员函数，能直接访问对象数据；③映射表可继承（查不到自动查基类表），避免重复。本质是「用数据表 + 成员函数指针回调」替代「硬编码 switch」。`,
    tags: ["消息映射", "WindowProc", "消息循环"],
  },
  {
    id: "mfc-message-routing-2",
    chapter: "mfc-message-routing",
    level: 3,
    question: `命令消息（WM_COMMAND）在 MFC 中的路由顺序是什么？为什么是这个顺序？`,
    answer:
      `路由顺序：①CView::OnCmdMsg（当前活动视图）→ ②CDocument::OnCmdMsg（视图关联的文档）→ ③CFrameWnd::OnCmdMsg（框架窗口）→ ④CWinApp::OnCmdMsg（应用对象）。每一级先在自己的消息映射表里找处理者，找到就调用并返回；没找到才上交给下一级。为什么是这个顺序：视图是用户当前交互的焦点，最应该优先处理命令（如编辑命令）；视图处理不了时，逻辑上属于「文档数据」的命令（如保存）交给文档；文档再处理不了，属于「窗口/程序级」的命令（如视图切换、退出）交给框架；最后兜底到应用。这种「从最具体的交互层逐级上交到最抽象的应用层」的设计，让一个菜单命令能被「最合适的对象」处理，且各对象无需互相知道——解耦。非命令消息（WM_PAINT/WM_MOUSEMOVE 等）不走路由，直接发给目标窗口。`,
    tags: ["消息路由", "CCmdTarget", "命令消息"],
  },
  {
    id: "mfc-message-routing-3",
    chapter: "mfc-message-routing",
    level: 3,
    question: `CCmdTarget 在消息机制中扮演什么角色？为什么 CView/CDocument/CFrameWnd/CWinApp 都派生自它？`,
    answer:
      `CCmdTarget 是「可接收命令消息的对象」的基类，提供消息映射的基础设施：①持有消息映射表指针（通过 DECLARE_MESSAGE_MAP/IMPLEMENT_MESSAGE_MAP 宏）；②实现 OnCmdMsg 虚函数，定义「查自己映射表→未命中交给下一个目标」的路由算法；③提供 OnUpdateCommandUI 机制（菜单/工具栏的启用/禁用/打钩）。CView/CDocument/CFrameWnd/CWinApp 都派生自 CCmdTarget，意味着它们都是「能处理命令消息的候选者」，都能挂自己的消息映射表，都能参与命令路由链。这是命令路由能逐级流转的前提——路由函数 OnCmdMsg 的签名统一（都是 CCmdTarget 的虚函数），框架可以用 CCmdTarget* 依次调用各候选者的 OnCmdMsg，无需关心具体类型。换言之，CCmdTarget 把「命令处理能力」抽象成统一接口，让消息在异质对象（视图/文档/框架/应用）之间流转成为可能。它也是 MFC 对 COM 的铺垫——CCmdTarget 还承载了 IUnknown 的引用计数。`,
    tags: ["消息路由", "CCmdTarget", "基类设计"],
  },
  {
    id: "mfc-message-routing-4",
    chapter: "mfc-message-routing",
    level: 4,
    question: `为什么窗口消息（WM_PAINT 等）不走命令路由，而命令消息（WM_COMMAND）要走？两者本质区别是什么？`,
    answer:
      `本质区别在于「消息的归属是否单一确定」。窗口消息（WM_PAINT/WM_SIZE/WM_MOUSEMOVE）有明确的物理目标——就是那个窗口本身，发谁谁处理，没有「谁更合适」的问题，所以直接由目标窗口的 WindowProc→OnWndMsg 在自己的映射表里查，不走路由。命令消息（WM_COMMAND，来自菜单/工具栏/加速键）语义上是「用户请求一个操作」，但操作的对象可能涉及多个层：比如「编辑/复制」该由当前视图处理，「文件/保存」该由文档处理，「窗口/拆分」该由框架处理——同一条 WM_COMMAND 发到框架后，框架自己未必知道该谁处理，于是 MFC 设计了逐级路由，让每层都有机会认领。换句话说：窗口消息是「告诉某窗口发生了什么」，目标是确定的；命令消息是「用户想干一件事」，目标是「最合适的人」需要协商确定。路由就是这种协商机制。这也解释了为什么只有 WM_COMMAND（及 WM_NOTIFY）走 OnCmdMsg 路由，而 WM_PAINT 不走。`,
    tags: ["消息路由", "窗口消息", "命令消息", "设计哲学"],
  },
];
