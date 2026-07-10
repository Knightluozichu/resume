import type { ReviewQuestion } from "./types";

export const mfcCppMechanicsQuestions: ReviewQuestion[] = [
  {
    id: "mfc-cpp-mechanics-1",
    chapter: "mfc-cpp-mechanics",
    level: 2,
    question: `虚函数与多态的工作机制是什么？MFC 为什么离不开它？`,
    answer:
      `机制：带有虚函数的类对象内部藏一个 vptr（虚表指针），指向该类对应的 vtable（虚函数表）；vtable 是一个函数指针数组，每个槽位对应一个虚函数。调用虚函数时，编译器不直接绑定地址，而是生成「通过 vptr 查 vtable 对应槽位再跳转」的代码，于是在运行期根据对象的实际类型（而非指针/引用的静态类型）决定调用哪个实现——这就是动态绑定/多态。例如 CObject* p = &myDoc; p->Serialize(ar); 实际调用 CMyDoc::Serialize。MFC 离不开它：CObject 声明虚的 Serialize/IsKindOf/GetRuntimeClass/Dump，派生类（CDocument/CView/CMyDoc）重写；框架全程持有基类指针，靠多态调到用户实现。没有虚函数，CWinApp::Run 就没法调到用户的 OnDraw、CDocTemplate 没法统一管理各种派生 Document、序列化没法按基类指针写出派生类状态。可以说 MFC 整套「框架调用用户代码」的反向控制全靠虚函数实现。`,
    tags: ["C++", "虚函数", "多态"],
  },
  {
    id: "mfc-cpp-mechanics-2",
    chapter: "mfc-cpp-mechanics",
    level: 2,
    question: `MFC 的核心继承体系是怎样的？CObject 为什么是根？`,
    answer:
      `核心继承体系：CObject（根）→ CCmdTarget（支持消息映射）→ CWnd（窗口）→ CFrameWnd/CView/CDialog 等；CCmdTarget 另一支 → CDocument → CMyDoc；CWinApp 也派生自 CCmdTarget。几乎所有 MFC 类都直接或间接派生自 CObject。CObject 是根的原因：它集中提供 MFC 六大技术所需的基础能力——①运行时类型信息 GetRuntimeClass/IsKindOf；②动态创建（配合 CRuntimeClass）；③序列化 Serialize(CArchive&)；④诊断输出 Dump/AssertValid；⑤对象计数与内存泄漏检测（DEBUG 下）。把这些放在根类，所有派生类「免费」获得统一接口，框架才能用基类指针统一管理异质对象。代价是每个对象多一个 vptr、有 CRuntimeClass 静态成员，但换来了 RTTI/序列化/诊断的统一基础设施，这是 MFC「用 C++ 封装 Win32 成可复用框架」的前提。`,
    tags: ["C++", "继承体系", "CObject"],
  },
  {
    id: "mfc-cpp-mechanics-3",
    chapter: "mfc-cpp-mechanics",
    level: 3,
    question: `MFC 的虚函数机制为什么没有用在「消息处理」上，而是另造消息映射表？`,
    answer:
      `表面看「每个消息一个虚函数」很自然：在 CWnd 里 virtual void OnPaint(); virtual void OnMouseMove(...); 派生类重写即可。但有问题：①Windows 消息有数百条（WM_*），若每条都是虚函数，CWnd 的 vtable 会膨胀到几百项，每个 CWnd 派生对象都背这个开销，即使只重写一两个；②虚函数一旦声明就不能撤销，所有派生类都被迫继承全部槽位；③基类要给每条消息一个默认实现（DefWindowProc），虚函数默认实现链复杂；④无法表达「消息映射的归属层级」（某消息该在 View 处理还是 Frame）。MFC 的消息映射表（BEGIN_MESSAGE_MAP/ON_COMMAND/ON_WM_PAINT）是编译期生成的静态数组，记录「消息码 → 成员函数指针」；运行期 OnCmdMsg/WndProc 查表分发，只处理你显式登记的消息，未登记的走默认。这样 vtable 只保留少数真正需要多态的虚函数，消息处理按需登记、可跨层级路由。这是「用数据表替代巨型 vtable」的经典权衡——空间按需、扩展灵活。`,
    tags: ["C++", "消息映射", "设计权衡"],
  },
  {
    id: "mfc-cpp-mechanics-4",
    chapter: "mfc-cpp-mechanics",
    level: 4,
    question: `MFC 早期 C++ 标准尚未成熟，它用宏模拟了哪些现代 C++ 特性？这带来什么利弊？`,
    answer:
      `MFC 用宏模拟的特性：①RTTI——DECLARE_DYNAMIC/IMPLEMENT_DYNAMIC 宏在每个类里塞一个静态 CRuntimeClass 成员并接入类型链，模拟 typeid/dynamic_cast（标准 RTTI 到 C++98 才正式入标准）；②动态创建——DECLARE_DYNCREATE/IMPLEMENT_DYNCREATE 加一个工厂函数指针，模拟「按类型 new 对象」，这是标准 RTTI 做不到的；③对象成员指针回调——消息映射宏把成员函数指针登记进表，模拟「安全的成员函数回调」；④属性/反射——DECLARE_DISPATCH_MAP 支持自动化。利：在编译器支持有限的时代就拿到了 RTTI+动态创建+序列化，且自建的 CRuntimeClass 比标准 RTTI 更强（能 CreateObject、能存 schema 版本），是序列化的基石；可控、可移植。弊：宏展开的代码晦涩、调试难、错误信息差；侵入式（每个类要加宏）；与标准 RTTI/templates/boost 等现代设施不互通；后来标准 C++ 成熟后，这些宏成了「历史包袱」，但为兼容只能保留。这体现了「框架早于语言成熟」的典型工程现实。`,
    tags: ["C++", "宏机制", "工程权衡"],
  },
];
