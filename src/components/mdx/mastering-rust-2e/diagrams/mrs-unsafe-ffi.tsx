import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "安全与 Unsafe 契约", input: "目标与输入", rule: "unsafe只开放解引用裸指针、调用unsafe函数、访问可变静态等额外能力，不关闭借用检查", evidence: "安全与 Unsafe 契约的边界测试与结果记录", invariant: "unsafe只开放解引用裸指针、调用unsafe函数、访问可变静态等额外能力，不关闭借用检查；每个unsafe块都必须附带调用者可验证的不变量。" },
  { label: "从 Rust 调用 C", input: "安全与 Unsafe 契约", rule: "extern声明ABI，调用前要核对整数宽度、布局、空指针、字符串终止和错误码", evidence: "从 Rust 调用 C的边界测试与结果记录", invariant: "extern声明ABI，调用前要核对整数宽度、布局、空指针、字符串终止和错误码；链接成功不代表跨语言语义正确。" },
  { label: "从 C 调用 Rust", input: "从 Rust 调用 C", rule: "导出函数需要稳定ABI和符号，不能让panic穿越FFI边界", evidence: "从 C 调用 Rust的边界测试与结果记录", invariant: "导出函数需要稳定ABI和符号，不能让panic穿越FFI边界；所有权转交、释放函数与线程规则必须写入头文件契约。" },
  { label: "外部 C/C++ 库", input: "从 C 调用 Rust", rule: "绑定层只负责原始表示，安全包装层验证长度、生命周期和状态机", evidence: "外部 C/C++ 库的边界测试与结果记录", invariant: "绑定层只负责原始表示，安全包装层验证长度、生命周期和状态机；C++异常、模板与名称改编通常需要C适配层。" },
  { label: "Python 与 Node 原生扩展", input: "外部 C/C++ 库", rule: "PyO3和Node扩展框架降低绑定样板，但解释器锁、运行时线程、对象生命周期和错误转换仍是跨边界责任。", evidence: "Python 与 Node 原生扩展的边界测试与结果记录", invariant: "PyO3和Node扩展框架降低绑定样板，但解释器锁、运行时线程、对象生命周期和错误转换仍是跨边界责任。" },
];

export function MrsUnsafeFfiModelLab() {
  return <MasteringRustOfficialLab title="Unsafe Rust 与外部函数接口：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsUnsafeFfiBoundaryLab() {
  return <MasteringRustOfficialLab title="Unsafe Rust 与外部函数接口：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsUnsafeFfiEvidenceLab() {
  return <MasteringRustOfficialLab title="Unsafe Rust 与外部函数接口：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
