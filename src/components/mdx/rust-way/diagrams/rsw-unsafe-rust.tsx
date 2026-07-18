import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const operations: RustWayCase[] = [
  { label: "裸指针", input: "*const T或*mut T", mechanism: "unsafe解引用与地址运算", result: "直接内存访问", invariant: "非空、对齐、已初始化、有效且别名规则成立。" },
  { label: "static/union", input: "全局可变状态或重叠字段", mechanism: "unsafe读写", result: "底层表示控制", invariant: "同步、活动字段和布局协议必须可证明。" },
  { label: "unsafe trait", input: "编译器依赖的类型承诺", mechanism: "unsafe impl", result: "解锁安全API", invariant: "每个实现者都满足文档化安全前置条件。" },
];
const abstraction: RustWayCase[] = [
  { label: "入口验证", input: "安全调用者参数", mechanism: "检查长度、范围、对齐与关系", result: "unsafe内核前置条件", invariant: "所有安全输入都被验证或由类型保证。" },
  { label: "最小内核", input: "已证明条件", mechanism: "局部unsafe操作", result: "底层效果", invariant: "unsafe块尽量小且旁注具体SAFETY理由。" },
  { label: "安全出口", input: "底层结果", mechanism: "恢复owner、初始化与错误边界", result: "安全类型", invariant: "调用者无法通过safe API制造UB。" },
];
const interop: RustWayCase[] = [
  { label: "C/C++ FFI", input: "extern ABI、指针与layout", mechanism: "repr(C)、wrapper与释放函数", result: "跨语言调用", invariant: "分配者、释放者、线程和异常协议一致。" },
  { label: "动态语言", input: "runtime handle与异常模型", mechanism: "binding层转换类型和错误", result: "语言对象", invariant: "GC handle与Rust借用不能互相越界。" },
  { label: "WebAssembly", input: "线性内存与host import", mechanism: "序列化或共享buffer协议", result: "浏览器/宿主交互", invariant: "offset、length、增长和编码均受检。" },
];
export function RswUnsafeOperationLab() { return <RustWayOfficialLab title="五类unsafe能力" caption="unsafe只放宽少数操作，不关闭借用检查和类型检查。" cases={operations} tone="rose" />; }
export function RswSafeAbstractionLab() { return <RustWayOfficialLab title="安全抽象三层" caption="验证入口、缩小unsafe内核、恢复安全出口，调用者才无需重复证明。" cases={abstraction} tone="emerald" />; }
export function RswInteropLab() { return <RustWayOfficialLab title="FFI、动态语言与WebAssembly" caption="跨边界时同时固定ABI、布局、owner、错误和线程协议。" cases={interop} tone="violet" />; }
