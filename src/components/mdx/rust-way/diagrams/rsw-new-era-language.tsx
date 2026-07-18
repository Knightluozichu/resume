import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const tradeoffs: RustWayCase[] = [
  { label: "C/C++", input: "手工资源管理", mechanism: "指针、RAII与程序员纪律", result: "高控制、高误用成本", invariant: "性能不自动等于内存安全。" },
  { label: "GC语言", input: "托管对象图", mechanism: "运行时追踪可达性", result: "降低释放负担", invariant: "GC解决回收，不自动解决数据竞争和资源时序。" },
  { label: "Rust", input: "带所有权的值", mechanism: "编译期借用检查与单态化", result: "内存安全与零成本抽象", invariant: "无法证明的访问在编译期被拒绝。" },
];
const pipeline: RustWayCase[] = [
  { label: "源码", input: "crate、feature与target", mechanism: "parse、expand、type check", result: "带类型的中间表示", invariant: "宏展开后的程序仍需通过类型与借用检查。" },
  { label: "中间表示", input: "MIR与泛型实例", mechanism: "borrow check、monomorphize、optimize", result: "目标相关IR", invariant: "泛型实例化保留源级语义。" },
  { label: "产物", input: "对象文件与依赖", mechanism: "codegen与link", result: "binary或library", invariant: "target、profile与依赖锁定可复现。" },
];
const adoption: RustWayCase[] = [
  { label: "CLI", input: "明确输入输出", mechanism: "Result与零成本抽象", result: "单文件可执行工具", invariant: "错误进入stderr并产生正确exit status。" },
  { label: "服务", input: "高并发请求", mechanism: "所有权、async与类型化边界", result: "受控共享状态", invariant: "取消、超时和背压都可观察。" },
  { label: "系统组件", input: "外部ABI与内存", mechanism: "unsafe内核加safe封装", result: "可供其他语言调用", invariant: "ABI、布局、所有权和释放协议写进契约。" },
];
export function RswEraTradeoffLab() { return <RustWayOfficialLab title="语言设计取舍" caption="Rust不是在安全与性能间取中点，而是把证明成本前移到编译期。" cases={tradeoffs} tone="cyan" />; }
export function RswCompilationLab() { return <RustWayOfficialLab title="从源码到产物" caption="执行Rust程序前，先定位宏、类型、借用、优化与链接所在阶段。" cases={pipeline} tone="violet" />; }
export function RswAdoptionLab() { return <RustWayOfficialLab title="实用主义落点" caption="根据边界和失败模型选择Rust，而不是只依据语言口号。" cases={adoption} tone="emerald" />; }
