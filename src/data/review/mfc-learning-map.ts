import type { ReviewQuestion } from "./types";

export const mfcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "mfc-learning-map-1",
    chapter: "mfc-learning-map",
    level: 2,
    question: "《深入浅出MFC》全书四阶段递进结构是什么？为什么是这个顺序？",
    answer:
      "基础基石（Win32基础 + C++机制）→ MFC框架（文档/视图 + 消息路由）→ 六大技术核心（RTTI/动态创建 + 持久化/序列化）→ 高级应用与总复习（模板方法 + COM + 总复习）。顺序由依赖关系决定：MFC 是对 Win32 的 C++ 封装，必须先懂 Win32 窗口程序模型（HWND/WndProc）和 C++ 虚函数多态，才有理解 MFC 封装的基础；框架层（文档/视图、消息路由）是 MFC 程序的骨架，必须先建立架构视角；核心机制（RTTI、序列化）是 MFC 六大技术中的硬核，依赖框架层提供的 CObject/CCmdTarget 基类；高级应用（模板方法模式、COM）是设计哲学升华，需要先懂机制再看模式如何应用；最后总复习以 CObject 为根串联六大技术。先「懂底层」，再「懂架构」，然后「懂机制」，接着「懂设计」，最后「能贯通」。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "mfc-learning-map-2",
    chapter: "mfc-learning-map",
    level: 2,
    question: "MFC 六大技术分别是什么？它们之间有什么内在联系？",
    answer:
      "MFC 六大技术是：①程序初始化（CWinApp::InitInstance 控制启动流程）；②消息映射（CCmdTarget::OnCmdMsg + 消息映射表，取代 Win32 的 switch-case）；③RTTI 运行时类型识别（CRuntimeClass 类型链，IsKindOf/GetRuntimeClass）；④动态创建（CRuntimeClass::CreateObject 按类名 new 对象）；⑤序列化/Persistence（CObject::Serialize + CArchive，对象状态存取）；⑥文档/视图（CDocTemplate 绑定 Document/View/Frame 三件套）。内在联系：六者全部建立在 CObject 根类之上。CObject 提供虚的 Serialize/IsKindOf/GetRuntimeClass，派生类按需重写；CRuntimeClass 同时支撑 RTTI、动态创建和序列化（序列化要按类名重建对象，必须先有 RTTI+动态创建）；文档模板要用 CRuntimeClass 动态创建 Doc/View/Frame 三者；消息映射的基类 CCmdTarget 也派生自 CObject。一句话：CObject 是根，CRuntimeClass 是脊柱，六大技术是挂在脊柱上的器官。",
    tags: ["架构", "六大技术"],
  },
  {
    id: "mfc-learning-map-3",
    chapter: "mfc-learning-map",
    level: 3,
    question: "用「一个 MFC 程序从启动到退出」描述全书主线，列出各技术的入场时机。",
    answer:
      "一个 MFC 程序从 theApp 全局对象构造到退出：①程序初始化（第2/8章）——CWinApp 派生的 theApp 全局对象先构造，WinMain 调 theApp.InitInstance()，这是模板方法，用户在派生类重写填入「加文档模板、显示主窗口」；②文档/视图（第4章）——InitInstance 里 AddDocTemplate 注册 CDocTemplate，它用 CRuntimeClass 动态创建 CDocument/CView/CFrameWnd；③消息映射与路由（第5章）——主窗口 ShowWindow 后进入 CWinApp::Run 消息循环，命令消息按 View→Document→Frame→App 路由，ON_COMMAND 宏查消息映射表找处理函数；④RTTI/动态创建（第6章）——框架全程用 CRuntimeClass 识别类型、动态创建对象；⑤序列化（第7章）——用户「文件/打开」时 CArchive 读字节流，按类名动态创建对象图恢复状态；⑥COM（第9章）——若集成 OLE/ActiveX 控件，CCmdTarget 用接口映射表承载 IUnknown；⑦退出——ExitInstance 钩子 + 析构。一次运行，六大技术全部参与。",
    tags: ["架构", "运行时旅程"],
  },
  {
    id: "mfc-learning-map-4",
    chapter: "mfc-learning-map",
    level: 4,
    question: "「会调 MFC API」和「懂 MFC 设计」有什么本质区别？举例说明。",
    answer:
      "会调 MFC API 是「能照着向导生成程序」——用 AppWizard 点几下就能出一个带文档/视图的程序，知道在 OnDraw 里画图、在 OnFileOpen 里读文件。懂 MFC 设计是「能解释 MFC 为什么这样设计」：为什么 CObject 是几乎所有类的根（统一提供 RTTI/序列化/诊断）、为什么用消息映射表而非虚函数处理消息（消息太多用虚函数会让 vtable 膨胀，且不能跨层级路由）、为什么命令消息要逐级路由（让最合适的对象处理，解耦）、为什么 CRuntimeClass 要自建而不用 C++ 标准 RTTI（MFC 早于标准 RTTI，且要支持动态创建，标准 RTTI 不能 new 对象）、为什么 CArchive 要先写类名（读时按名动态创建，实现自描述持久化）、为什么文档/视图要分离（数据与显示解耦，一个文档可多个视图）、为什么 InitInstance 是虚函数（模板方法模式，框架控流程用户填步骤）。把 MFC 当黑盒的人遇到框架不调你的函数只能瞎试；懂设计的人能读消息映射、追 OnCmdMsg 路由、理解 CRuntimeClass 链表。区分标志：能否解释「MFC 为什么这样设计」而非只是「能用它」。",
    tags: ["架构", "工程思维"],
  },
];
