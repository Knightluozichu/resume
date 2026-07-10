import type { ReviewQuestion } from "./types";

export const mfcComInterfaceQuestions: ReviewQuestion[] = [
  {
    id: "mfc-com-interface-1",
    chapter: "mfc-com-interface",
    level: 2,
    question: `IUnknown 的三个方法分别是什么？它们各自解决什么问题？`,
    answer:
      `IUnknown 是所有 COM 接口的根，提供三个纯虚方法：①QueryInterface(REFIID riid, void** ppv)——按接口 ID 查询对象是否支持某接口，支持则返回该接口的指针。解决「一个对象可多接口，调用方只认接口不认实现」的能力发现：拿到 IUnknown 后能 QI 到任意其他接口。②AddRef()——引用计数加 1。③Release()——引用计数减 1，归零时销毁对象。AddRef/Release 解决「对象生命周期由谁管」——COM 对象没有所有者，靠引用计数自动回收：谁拿到接口指针谁负责 Release，最后一个 Release 触发析构。三者合起来构成 COM 的「接口契约 + 生命周期管理」基础：QueryInterface 保证接口可发现，AddRef/Release 保证对象在该在的时候活着、不该在时回收。任何 COM 对象都必须实现 IUnknown，它是二进制层面的最低契约。`,
    tags: ["COM", "IUnknown", "引用计数"],
  },
  {
    id: "mfc-com-interface-2",
    chapter: "mfc-com-interface",
    level: 3,
    question: `为什么说 COM 是「二进制标准」？它和 C++ 的纯虚基类（接口）有什么关系和区别？`,
    answer:
      `COM 是「二进制标准」指它规定的是对象在内存里的二进制布局——接口是一张函数指针表（vtable），接口指针指向这张表，方法按声明顺序排列，调用约定固定（stdcall）。这种布局和语言无关：C++、VB、Delphi、脚本只要按这个布局构造 vtable 就能互通。和 C++ 纯虚基类的关系：COM 接口在 C++ 里通常就写成纯虚基类（如 struct IMyServer : public IUnknown { virtual HRESULT Foo() = 0; }），编译器生成的 vtable 恰好符合 COM 的二进制要求——所以 C++ 是实现 COM 最自然的语言。区别：①C++ 纯虚基类的 vtable 布局是「实现细节」，编译器各异（不同编译器 vtable 结构/调用约定不同），跨编译器不一定兼容；COM 显式固定了布局与调用约定，保证跨编译器/跨语言兼容。②C++ 对象生命周期由 new/delete 管，COM 由引用计数管（IUnknown）。③C++ 没有接口发现的统一机制，COM 用 QueryInterface 统一。④COM 是跨进程/跨机器的（可经 marshaler 代理），C++ 虚函数只在同进程同内存有效。所以 COM 借用了 C++ vtable 的思想，但把它提升为跨语言跨进程的二进制契约。`,
    tags: ["COM", "二进制标准", "vtable"],
  },
  {
    id: "mfc-com-interface-3",
    chapter: "mfc-com-interface",
    level: 3,
    question: `MFC 用 CCmdTarget 承载 COM 接口的机制是什么？接口映射表起什么作用？`,
    answer:
      `机制：MFC 用「嵌套类 + 接口映射表」让 CCmdTarget 派生类实现 COM 接口。①声明——用 BEGIN_INTERFACE_PART(MyImpl, IMyServer)...END_INTERFACE_PART(MyImpl) 宏，在类内嵌套一个 XMyImpl 类实现 IMyServer，嵌套类持有指向外部对象的指针（_METHOD_PROLOGUE 宏）；②实现——在嵌套类的方法里委托给外部 CCmdTarget 对象的成员；③映射——用 DECLARE_INTERFACE_MAP/ BEGIN_INTERFACE_MAP(CMyObj, CCmdTarget)/ INTERFACE_PART(CMyObj, IID_IMyServer, MyImpl) 声明「本类支持 IID_IMyServer，实现体是 XMyImpl 嵌套类」的映射表。④QueryInterface 实现——ExternalQueryInterface 在接口映射表里按 IID 查找，返回对应嵌套类的 vptr。接口映射表的作用：类似消息映射表，是「IID → 实现体」的静态登记表，让一个对象能声明支持多个接口，QueryInterface 查表分发。引用计数由 CCmdTarget 的 ExternalAddRef/ExternalRelease 统一管理（一个对象一份计数，而非每接口一份，称为「合并引用计数」）。这套机制让 MFC 程序能实现 COM 对象、做 OLE/ActiveX 容器与服务器。它和消息映射表是同构设计——都用静态表登记「键→处理体」。`,
    tags: ["COM", "CCmdTarget", "接口映射表"],
  },
  {
    id: "mfc-com-interface-4",
    chapter: "mfc-com-interface",
    level: 4,
    question: `MFC 的消息映射表和 COM 的接口映射表在思想上是「同构」的，具体表现在哪里？这种设计反映了什么工程哲学？`,
    answer:
      `同构表现：①都是「静态登记表 + 运行期查表分发」——消息映射表登记「消息码→成员函数指针」，接口映射表登记「IID→嵌套类实现体」，运行期分别由 OnCmdMsg 和 QueryInterface 查表；②都用宏在编译期生成（BEGIN_MESSAGE_MAP/END_MESSAGE_MAP 与 BEGIN_INTERFACE_MAP/END_INTERFACE_MAP），避免运行期开销；③都支持「按需登记」——只登记你关心的消息/接口，未登记的走默认，空间按需；④都可跨层级——消息映射查不到查基类表，接口映射也能继承基类支持的接口；⑤都解决了「框架在编译期不知道用户类，运行期要按标识分发」的问题，本质是「数据驱动替代硬编码分支」。反映的工程哲学：①用数据表替代庞大的虚函数 vtable 或 switch-case，换取空间按需与扩展灵活；②用宏在编译期生成样板，减少手写错误；③「按标识查表分发」是 MFC 处理「开放集合」（消息码无限、接口可扩）的通用手段——固定集合用虚函数，开放集合用映射表。理解这种同构，就能举一反三：见到 MFC 的新映射表（如分派映射 DISPATCH_MAP、事件反射映射）也能立刻看懂。这是 MFC 一以贯之的设计语言。`,
    tags: ["COM", "消息映射", "设计哲学", "同构"],
  },
];
