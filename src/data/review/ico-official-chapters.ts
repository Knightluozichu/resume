import type { ReviewChapterSlug, ReviewLevel, ReviewQuestion } from "./types";

function question(
  chapter: ReviewChapterSlug,
  suffix: number,
  level: ReviewLevel,
  prompt: string,
  answer: string,
  tags: string[],
): ReviewQuestion {
  return {
    id: `${chapter}-${suffix}`,
    chapter,
    level,
    question: prompt,
    answer,
    tags,
  };
}

export const icoObjectLessonsQuestions: ReviewQuestion[] = [
  question(
    "ico-object-lessons",
    1,
    2,
    "simple object model、table-driven model 与主流 C++ object model 如何分配 data/function 成本？",
    "simple model 在每个 object 放逐成员 slot，统一但对象膨胀且处处间接；table-driven model 让 object 持有 data/function table pointers，缩小对象却让普通 data 也查表；主流 C++ model 把 nonstatic data/base subobjects 直接内联，以 fixed offset 服务 common case，只为 virtual capability 保存 vptr/vtable 等 runtime metadata。",
    ["第1章", "对象模型", "布局成本"],
  ),
  question(
    "ico-object-lessons",
    2,
    3,
    "Base* 指向 Derived 时，data access、nonvirtual call 与 virtual call 分别怎样使用 static/dynamic type？",
    "static type Base 决定 member lookup、Base data offset 和 nonvirtual target；dynamic object 仍是 Derived，但 data 不虚化。virtual call 的 interface/slot 由 Base 决定，final overrider 由 dynamic representation 选择，必要时调整 this。按 Base value copy 会 slicing，不能用它保留 dynamic identity。",
    ["第1章", "static type", "polymorphism"],
  ),
];

export const icoConstructorSemanticsQuestions: ReviewQuestion[] = [
  question(
    "ico-semantics-of-constructors",
    1,
    2,
    "隐式 default constructor 会为 member class object、base、virtual function、virtual base 分别生成什么工作？",
    "它按 base/member 语言顺序调用所需 default constructors；常见 ABI 为 polymorphic subobject 建立当前 phase 的 vptr；most-derived constructor 构造 shared virtual base。它不会因 synthesis 就把未初始化 scalar 全部清零。要区分 implicit declaration、definition 被需要和 nontrivial generated work。",
    ["第2章", "default constructor", "synthesis"],
  ),
  question(
    "ico-semantics-of-constructors",
    2,
    3,
    "哪些条件让 default memberwise copy 不能简单 lower 为 bitwise copy？",
    "base/member 有 nontrivial copy 时必须调用其 copy；polymorphic target 要建立自己的 vptr，不能盲抄 source dynamic representation；virtual base 要由 most-derived target 复制一次。explicit/argument/return initialization 还可能经 NRVO 或现代 guaranteed elision 直接构造 final storage。",
    ["第2章", "copy constructor", "copy elision"],
  ),
];

export const icoDataSemanticsQuestions: ReviewQuestion[] = [
  question(
    "ico-semantics-of-data",
    1,
    2,
    "为什么 data member binding、layout 与 machine access 必须分三步推导？",
    "binding 按 static type/class scope 选中特定 declaration；layout 根据 bases、declaration order、alignment 和 ABI 给它位置；machine access 才以 object/base address 加 fixed 或 runtime-adjusted offset。Derived 同名 member 只隐藏 Base name，不删除 Base storage。",
    ["第3章", "data member", "layout"],
  ),
  question(
    "ico-semantics-of-data",
    2,
    3,
    "普通继承、多重继承、虚继承和 pointer-to-data-member 的地址计算有何差异？",
    "普通 nonvirtual base/member 多为 fixed offset；multiple inheritance 先把 most-derived address 调成所选 base view，再用 base-relative offset；virtual base 位置随 most-derived layout 变化，常从 ABI metadata 取 adjustment。pointer-to-data-member 是 class-relative locator，应用到 object 后才得到 lvalue，不是 raw address 或稳定序列化值。",
    ["第3章", "inheritance", "member pointer"],
  ),
];

export const icoFunctionSemanticsQuestions: ReviewQuestion[] = [
  question(
    "ico-semantics-of-function",
    1,
    2,
    "nonstatic、static、virtual member invocation 与 name mangling 的职责怎样分开？",
    "nonstatic call 传 hidden this 并通常静态选 target；static member 没有 this；virtual call 的 slot contract 来自 static type、final overrider 来自 dynamic type。overload resolution 先选 signature，name mangling 再为 linker 编码 class/namespace/types；它不是 runtime dispatch。",
    ["第4章", "member invocation", "name mangling"],
  ),
  question(
    "ico-semantics-of-function",
    2,
    3,
    "multiple/virtual inheritance 下 virtual call 和 member-function pointer 为什么可能需要 thunk？",
    "incoming pointer 可能只指向 secondary/virtual base subobject。slot 可指向 thunk，先用 fixed 或 runtime metadata 调整 this，再进入 Derived body；covariant return 还可能调整 result。member-function pointer 也可编码 target/slot 与 adjustment，因此不是普通 code pointer，效率要看应用时 loads、adds、indirect branch 和 inline loss。",
    ["第4章", "virtual function", "thunk"],
  ),
];

export const icoConstructionDestructionCopyQuestions: ReviewQuestion[] = [
  question(
    "ico-construction-destruction-copy",
    1,
    2,
    "为什么 pure virtual destructor 仍需定义，const 又为什么必须出现在匹配的 override 上？",
    "pure virtual 让 base abstract，但 derived teardown 仍调用 base destructor，所以必须有 definition；经 base pointer 删除还要求 virtual destructor。const 是 member-function type/contract 的一部分，Derived 的 non-const 同名函数不会 override Base const virtual，应用 override 让 mismatch 编译失败。",
    ["第5章", "pure virtual destructor", "override"],
  ),
  question(
    "ico-construction-destruction-copy",
    2,
    3,
    "diamond hierarchy 的 construction、copy 与 destruction 如何维护 shared virtual base 和 vptr phase？",
    "most-derived constructor 先构造唯一 virtual base，再 direct bases、当前 class virtual state、members、body；copy construction 对 target 执行同样 ownership，vptr 由 target 建立而非 raw-copy。destruction 从 body 开始，members/direct bases 逆序，virtual base 最后；virtual dispatch 随 active subobject phase 前进和后退。",
    ["第5章", "virtual inheritance", "lifetime"],
  ),
];

export const icoRuntimeSemanticsQuestions: ReviewQuestion[] = [
  question(
    "ico-runtime-semantics",
    1,
    2,
    "single new、array new 与 placement new 的 allocation/construction/release 协议如何不同？",
    "single new 调 operator new 后构造一个 T，delete 先析构再释放；array new 可含 count metadata，elements 正序构造/逆序析构，失败只回滚已完成 elements，必须 delete[]；placement new 不分配 supplied storage，成功后显式 destroy，再由原 owner 回收，不能普通 delete。",
    ["第6章", "new delete", "placement new"],
  ),
  question(
    "ico-runtime-semantics",
    2,
    3,
    "怎样判断 temporary object 是否物化、何时销毁以及是否真正有性能成本？",
    "先按 language mode 判断 value category、materialization 和 full-expression；local const-reference binding 的适用临时量可延长 lifetime，return reference 不会安全延长；现代 prvalue return 可直接构造 final result，NRVO 另属允许优化。再用 constructor counters、optimized IR/assembly 和 profile 验证，不能凭源码外观断言必有或必无 temporary。",
    ["第6章", "temporary", "lifetime"],
  ),
];

export const icoCuspQuestions: ReviewQuestion[] = [
  question(
    "ico-cusp-of-object-model",
    1,
    2,
    "template 中 non-dependent/dependent name、member instantiation 和 error reporting 各在何时发生？",
    "definition 先 parse 并绑定 non-dependent names；dependent names 在 point of instantiation 结合 actual types 解析。class-template member 通常被需要时才实例化，未使用非法 member 不必立即生成。diagnostic 应区分 definition error、substitution rejection、selected body error 与 ODR/linkage。",
    ["第7章", "template instantiation", "name lookup"],
  ),
  question(
    "ico-cusp-of-object-model",
    2,
    3,
    "exception/RTTI 为什么能在进程内工作，却不能把 C++ object bytes 直接当 DSO 或 shared-memory 协议？",
    "exception runtime 和 RTTI 依赖兼容 unwinder、type identity、vtable/layout 与 allocator ABI；DSO 可用 versioned C facade、opaque handle、module-local create/destroy，并把 exception 转 status。shared memory 中 vptr/type_info/raw pointers 是 process-local addresses，应改用 offsets、stable IDs、versioned records，在各进程重建本地 behavior。",
    ["第7章", "RTTI", "ABI boundary"],
  ),
];
