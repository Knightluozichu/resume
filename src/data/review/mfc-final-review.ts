import type { ReviewQuestion } from "./types";

export const mfcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "mfc-final-review-1",
    chapter: "mfc-final-review",
    level: 3,
    question: `用「CObject 为根」串联 MFC 六大技术，说明它们如何环环相扣。`,
    answer:
      `①CObject 是根——提供虚的 Serialize/IsKindOf/GetRuntimeClass/Dump，所有 MFC 类派生自它，统一获得接口。②RTTI（CRuntimeClass 类型链）——CObject 注册 classCObject，所有派生类用 IMPLEMENT_DYNAMIC 接入类型链，GetRuntimeClass/IsKindOf 沿 m_pBaseClass 上溯识别类型。③动态创建——CRuntimeClass 的 m_pfnCreateObject 工厂函数让 CreateObject 能按类型 new 对象，这是 RTTI 的延伸（标准 RTTI 做不到）。④文档/视图——CDocTemplate 必须用 CRuntimeClass 动态创建 Doc/View/Frame 三者（用户「文件/新建」时框架按类型实例化），依赖③。⑤序列化——CObject::Serialize 是钩子，CArchive 读时按流中类名查 CRuntimeClass（依赖②）再 CreateObject（依赖③）重建对象，再靠虚函数多态调派生 Serialize，依赖②③+虚函数。⑥消息映射——CCmdTarget 派生自 CObject，用消息映射表+OnCmdMsg 路由命令消息，基类统一接口让 View/Document/Frame/App 都能参与路由。⑦程序初始化——CWinApp::InitInstance 是模板方法钩子，流程里 AddDocTemplate 又依赖④。⑧COM——CCmdTarget 用接口映射表承载 IUnknown，引用计数复用 CObject 体系。环环相扣：删掉 CObject 或 CRuntimeClass，RTTI/动态创建/序列化/文档视图全塌。`,
    tags: ["总复习", "六大技术", "CObject"],
  },
  {
    id: "mfc-final-review-2",
    chapter: "mfc-final-review",
    level: 3,
    question: `MFC 的「框架调用用户代码」（控制反转）体现在哪几个机制上？它们各自如何实现？`,
    answer:
      `体现在四处：①模板方法——CWinApp::InitInstance/Run/ExitInstance、CDocument::OnNewDocument、CView::OnDraw 等是虚函数钩子，框架在固定流程节点调用，用户重写填内容；机制是 C++ 虚函数动态绑定。②消息映射——命令/窗口消息到达时，框架 OnCmdMsg/OnWndMsg 查消息映射表，调用用户登记的成员函数；机制是宏生成的静态表 + 成员函数指针回调。③命令路由——WM_COMMAND 按 View→Document→Frame→App 逐级调 OnCmdMsg，让多个候选对象有机会处理；机制是 CCmdTarget 统一接口 + 链式分发。④序列化——CArchive 调 CObject::Serialize 虚函数，动态绑定到用户派生类的实现；机制是虚函数多态 + RTTI/动态创建重建对象。共同点：流程/分发逻辑在框架，用户只提供「具体处理」，框架用虚函数、映射表、路由链等手段在合适时机回调用户代码。这正是「框架 vs 库」的本质：库是你调它，框架是它调你。理解这些回调点，才能知道「我的代码何时被调用、为何不被调用」。`,
    tags: ["总复习", "控制反转", "框架设计"],
  },
  {
    id: "mfc-final-review-3",
    chapter: "mfc-final-review",
    level: 4,
    question: `MFC 用「映射表」（消息映射/接口映射/分派映射）替代部分虚函数，这种设计有哪些利弊？在什么场景该用表、什么场景该用虚函数？`,
    answer:
      `利：①空间按需——只登记关心的项，未登记不占槽位；而虚函数会让所有派生类背整个 vtable（即便不重写）。②开放集合友好——消息码/接口 IID 是开放集合（用户/系统可不断新增），用表登记新项即可；虚函数集在编译期封闭，加一条要改基类。③跨层级——表查不到可查基类表，支持路由/继承；虚函数只能沿单继承链。④元数据丰富——表项可带控制码、签名等额外信息（如 ON_UPDATE_COMMAND_UI 带更新逻辑）。弊：①宏展开晦涩，调试与错误信息差；②运行期查表有线性查找开销（虚函数是 O(1) 取槽）；③类型安全弱——成员函数指针登记靠宏，签名匹配靠人，错了运行期才崩；④侵入式——每类要加宏，耦合框架。场景判断：用虚函数——集合封闭、每项必有默认行为、性能敏感、单继承层级（如 CObject 的 GetRuntimeClass/Serialize）。用映射表——集合开放（消息/接口可扩）、按需登记、需跨层级路由、需带额外元数据。MFC 的智慧在于分而治之：核心多态用虚函数，开放分发用映射表，各取所长。`,
    tags: ["总复习", "映射表", "设计权衡"],
  },
  {
    id: "mfc-final-review-4",
    chapter: "mfc-final-review",
    level: 4,
    question: `如果今天重写 MFC，哪些设计会变、哪些不会变？这反映「框架早于语言成熟」的哪些教训？`,
    answer:
      `会变：①RTTI/动态创建——会用标准 C++ RTTI（typeid）做类型识别，用模板或注册表做动态创建，去掉 DECLARE_DYNAMIC 等宏；②消息映射——会用 std::function/信号槽/委托替代宏表，类型安全且动态可连接（类似 Qt/WPF）；③字符串/集合——会用 std::string/std::vector/std::span 替代 CString/CObArray 的专有集合；④错误处理——会用异常替代 HRESULT/BOOL 返回码；⑤模板方法——部分用回调/lambda 替代继承，减少强制派生；⑥COM 支持——会基于 C++11 起的现代特性重做，或直接用 WRL/C++/WinRT。不会变：①CObject 作根提供统一 RTTI/序列化/诊断的思路（只是实现现代化）；②文档/视图分离（数据与显示解耦是 GUI 通用原则）；③命令路由（让最合适对象处理命令的解耦思想）；④框架控流程的模板方法精神（框架 vs 库的本质不变）；⑤「用映射表处理开放集合」的数据驱动思想。教训：①语言能力不足时用宏模拟是无奈之举，会留技术债——标准成熟后应迁移；②框架设计要预留演进空间，但也要承认「早于标准」的代价；③核心设计原则（解耦、控制反转、数据驱动）超越语言，值得保留；④API 一旦发布就难撤，宏方案为兼容只能背到底。这正是不求「重写」而求「理解为什么」读 MFC 的价值所在。`,
    tags: ["总复习", "演进", "工程教训"],
  },
];
