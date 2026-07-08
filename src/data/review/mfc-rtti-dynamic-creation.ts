import type { ReviewQuestion } from "./types";

export const mfcRttiDynamicCreationQuestions: ReviewQuestion[] = [
  {
    id: "mfc-rtti-dynamic-creation-1",
    chapter: "mfc-rtti-dynamic-creation",
    level: 2,
    question: "CRuntimeClass 结构里有哪些关键字段？它如何支撑 RTTI 与动态创建？",
    answer:
      "关键字段：①m_lpszClassName——类名字符串；②m_nObjectSize——对象大小；③m_wSchema——版本号（序列化用）；④m_pfnCreateObject——指向工厂函数的指针，能 new 出该类对象；⑤m_pBaseClass——指向基类的 CRuntimeClass（类型链）；⑥m_pNext——类型链表中下一个类的 CRuntimeClass。支撑 RTTI：每个类用 IMPLEMENT_DYNAMIC 注册一个静态 CRuntimeClass，所有类的 CRuntimeClass 串成全局类型链；GetRuntimeClass 返回对象所属类的 CRuntimeClass；IsKindOf(pRuntimeClass) 从对象的类开始沿 m_pBaseClass 向上比对，判断是否属于某类或其派生体系——这就是运行时类型识别。支撑动态创建：m_pfnCreateObject 是工厂函数指针，CreateObject() 调用它 new 出对象，无需在编译期写死类型名。所以 CRuntimeClass 一身二任：既是类型标识（RTTI），又是对象工厂（动态创建）。序列化「按类名重建对象」正是依赖后者。",
    tags: ["RTTI", "CRuntimeClass", "动态创建"],
  },
  {
    id: "mfc-rtti-dynamic-creation-2",
    chapter: "mfc-rtti-dynamic-creation",
    level: 2,
    question: "DECLARE_DYNAMIC / DECLARE_DYNCREATE / DECLARE_SERIAL 三个宏有什么区别？分别用在什么场景？",
    answer:
      "三者能力递增：①DECLARE_DYNAMIC/IMPLEMENT_DYNAMIC——只提供 RTTI（GetRuntimeClass/IsKindOf），不能动态创建。用于「需要类型识别但不需要按类型 new」的类。②DECLARE_DYNCREATE/IMPLEMENT_DYNCREATE——在 RTTI 基础上增加动态创建（m_pfnCreateObject 工厂函数 + CreateObject）。用于「需要框架按类型实例化」的类，最典型是 CDocument/CView/CFrameWnd 的派生类——CDocTemplate 要用 CRuntimeClass::CreateObject 动态创建它们。③DECLARE_SERIAL/IMPLEMENT_SERIAL——在 DYNCREATE 基础上再增加序列化支持（带 schema 版本号的 << / >> 操作符，CObject::Serialize 配合 CArchive）。用于「需要持久化」的类——要存盘读盘的文档/数据类。能力关系：SERIAL ⊃ DYNCREATE ⊃ DYNAMIC。选哪个看需求：只识别类型用 DYNAMIC；要被框架动态 new 用 DYNCREATE；要序列化必须 SERIAL（因为序列化读时要动态创建，所以 SERIAL 内含 DYNCREATE）。这是 MFC 用宏「按需付费」的设计：少要能力少交宏税。",
    tags: ["RTTI", "宏机制", "动态创建", "序列化"],
  },
  {
    id: "mfc-rtti-dynamic-creation-3",
    chapter: "mfc-rtti-dynamic-creation",
    level: 3,
    question: "IsKindOf 的实现原理是什么？为什么能判断「某对象是否属于某类或其派生类」？",
    answer:
      "IsKindOf(pClass) 的实现：①取对象自己的运行时类型 this->GetRuntimeClass()，得到 pThisClass；②循环：若 pThisClass == pClass（指针相等，是同一个静态 CRuntimeClass），返回 TRUE；否则 pThisClass = pThisClass->m_pBaseClass，沿基类链向上走；③一直走到 CObject 的 CRuntimeClass（m_pBaseClass 为 NULL）仍未匹配，返回 FALSE。原理：CRuntimeClass 通过 m_pBaseClass 形成「类继承链」的运行时镜像——每个类的 CRuntimeClass 指向其直接基类的 CRuntimeClass。IsKindOf 沿这条链向上遍历，等价于「我是这个类吗？不是的话我爹是吗？我爹的爹是吗？……」。所以判断「CMyDoc 对象是不是 CDocument」时，链是 CMyDoc→CDocument→CCmdTarget→CObject，走到 CDocument 命中返回 TRUE。这和 C++ 标准 dynamic_cast 的「向上找基类」逻辑同构，但 MFC 早于标准 RTTI 自建了这套链表。局限：只能向上查继承关系，不能像 dynamic_cast 那样做跨层级 downcast。",
    tags: ["RTTI", "IsKindOf", "类型链"],
  },
  {
    id: "mfc-rtti-dynamic-creation-4",
    chapter: "mfc-rtti-dynamic-creation",
    level: 4,
    question: "MFC 自建 CRuntimeClass 而不用 C++ 标准 RTTI（typeid/dynamic_cast），有哪些深层原因？",
    answer:
      "深层原因：①历史——MFC 诞生于 1992 年，远早于 C++ 标准 RTTI（1998 入标准，编译器支持更晚），当年没有标准 RTTI 可用，只能自建；②能力更强——标准 RTTI 只能「识别类型」（typeid/dynamic_cast），不能「按类型创建对象」（new 需要编译期类型名），而 MFC 的序列化、文档模板都需要动态创建，CRuntimeClass 的 m_pfnCreateObject 工厂指针提供了标准 RTTI 没有的能力；③携带元数据——CRuntimeClass 自带类名、对象大小、schema 版本号、基类指针，这些是序列化和诊断需要的，标准 type_info 只有名字；④可控可移植——自建机制不依赖编译器 RTTI 实现，跨编译器行为一致，DEBUG 下还能做对象计数与泄漏检测；⑤与序列化深度耦合——序列化读时要「按流中的类名查 CRuntimeClass→CreateObject」，标准 RTTI 无法从字符串反查类型。代价是侵入式（每类加宏）、宏展开晦涩。所以即便标准 RTTI 后来可用，MFC 也无法回头替换——动态创建和序列化这两大技术彻底依赖 CRuntimeClass 的工厂能力，这是「框架早于语言成熟」的典型代价。",
    tags: ["RTTI", "动态创建", "工程权衡"],
  },
];
