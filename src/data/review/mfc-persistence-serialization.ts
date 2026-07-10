import type { ReviewQuestion } from "./types";

export const mfcPersistenceSerializationQuestions: ReviewQuestion[] = [
  {
    id: "mfc-persistence-serialization-1",
    chapter: "mfc-persistence-serialization",
    level: 2,
    question: `MFC 序列化的完整流程是什么？CArchive 和 CObject::Serialize 各起什么作用？`,
    answer:
      `写流程（存盘）：①用户「文件/保存」，框架创建 CArchive（写模式）并调用 CDocument::Serialize(ar)；②CDocument::Serialize 先调基类 CDocument::Serialize，再对自己的数据成员（如 m_lines）调 Serialize 或用 ar<<pObj；③CArchive<<pObj 时先写对象所属类的 CRuntimeClass 类名和 schema 版本，再调该对象的 Serialize(ar)（虚函数，动态绑定到派生类）；④派生类 Serialize 把自己的字段写进 CArchive 底层的 CFile。读流程（读盘）：①框架创建 CArchive（读模式）调 CDocument::Serialize；②CArchive>>pObj 时先读类名，在 CRuntimeClass 类型链里查同名类，调其 CreateObject 动态创建空对象，再调该对象 Serialize(ar) 读字段填回；③递归处理嵌套对象。CArchive 的作用：是「对象图 ↔ 字节流」的中介，提供读写模式、流式 << / >> 操作符、对象引用去重、schema 版本校验；它持有 CFile 做实际字节 I/O。CObject::Serialize 的作用：是每个类自定义存取逻辑的虚函数钩子，框架用基类指针统一调用，靠多态分发到派生类。两者分工：CArchive 管流与元数据，Serialize 管字段读写。`,
    tags: ["序列化", "CArchive", "CObject"],
  },
  {
    id: "mfc-persistence-serialization-2",
    chapter: "mfc-persistence-serialization",
    level: 3,
    question: `序列化「读」时框架如何根据字节流重建出正确类型的对象？这依赖哪些机制？`,
    answer:
      `重建流程：①CArchive 在写入对象时，先写该对象所属类的 CRuntimeClass（类名字符串 + schema 版本号），再写字段数据；②读时，CArchive 先读出类名；③CArchive 在已注册的 CRuntimeClass 类型链里线性查找 m_lpszClassName 匹配的类，找到对应的 CRuntimeClass*；④调用该 CRuntimeClass::CreateObject()——它通过 m_pfnCreateObject 工厂函数指针 new 出一个空对象（动态创建）；⑤把刚 new 出的对象登记到「已读对象表」并用 schema 校验版本；⑥调用新对象的 Serialize(ar)（虚函数），让它自己读字段填回；⑦若字段又含 CObject* 指针，递归同样的过程，已读过的对象用引用去重。依赖的机制：①RTTI（按类名查 CRuntimeClass）——所以类必须 IMPLEMENT_DYNAMIC；②动态创建（CreateObject new 对象）——所以序列化的类必须 IMPLEMENT_SERIAL（内含 DYNCREATE）；③虚函数多态（基类指针调派生 Serialize）；④对象引用表（处理共享/循环引用）。一句话：序列化读 = RTTI 查类 + 动态创建 new + 多态调 Serialize。这是 MFC 六大技术环环相扣的最强证据。`,
    tags: ["序列化", "动态创建", "RTTI", "重建流程"],
  },
  {
    id: "mfc-persistence-serialization-3",
    chapter: "mfc-persistence-serialization",
    level: 3,
    question: `CArchive 的 schema 版本号解决什么问题？怎么用它做版本兼容？`,
    answer:
      `schema 版本号解决「数据格式演进」问题：当类的字段增删改后，旧文件按旧格式存，新程序按新格式读，若无版本标识就会读错。IMPLEMENT_SERIAL(CMyDoc, CDocument, VERSIONABLE_SCHEMA|1) 的第三参就是 schema 号；写入时随类名一起存入文件；读出后可校验。版本兼容做法：①声明 IMPLEMENT_SERIAL 用 VERSIONABLE_SCHEMA 标志（高位），告诉框架「我要自己处理版本」；②在 Serialize 里用 ar.GetObjectSchema() 取出文件的 schema 号，按版本分支读字段：if (schema >= 2) ar >> m_newField; 旧版没有该字段就不读，给默认值；③升级 schema 号时只增不减，老字段尽量保留。这样旧文件能被新程序读，新程序存的新文件老程序读到不认识的字段也能优雅跳过。没有 schema 机制的话，格式一改旧文件全部失效。schema 是 MFC 自描述序列化格式「类名+版本+字段」中的版本维度，让持久化具备向前/向后兼容能力。`,
    tags: ["序列化", "schema", "版本兼容"],
  },
  {
    id: "mfc-persistence-serialization-4",
    chapter: "mfc-persistence-serialization",
    level: 4,
    question: `MFC 序列化如何处理「对象图中的共享引用与循环引用」？为什么 CArchive 要维护已读对象表？`,
    answer:
      `问题：对象图里同一个对象可能被多个指针引用（共享），甚至互相引用（循环，如 A 含 B、B 含 A）。朴素地「遇到指针就递归序列化」会导致：①同一对象被写多次，浪费空间且读回后变成多个副本，破坏共享语义；②循环引用会无限递归栈溢出。CArchive 的解法：维护两张表（写表、读表），键是「对象指针/对象编号」。写时：遇到 CObject* 先查写表，若已写过则写一个「引用编号」标记（不重写内容），否则分配新编号、写类名+内容、登记进表。读时：对应地维护已读对象表，读到「引用编号」就直接从表里取出已创建的对象指针，读到「新对象」则动态创建、登记、读内容。这样：共享引用只存一份内容、读回仍是同一对象；循环引用因第二次遇到时只写引用号、不再递归，自然终止。这本质是「对象图序列化的引用去重」，和 Java 序列化、ORB 等通用方案同理。理解这点才能解释「为什么 MFC 序列化能正确保存含共享/循环指针的对象图」。`,
    tags: ["序列化", "对象图", "引用去重"],
  },
];
