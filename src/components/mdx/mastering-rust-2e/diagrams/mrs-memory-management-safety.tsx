import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "程序与内存", input: "目标与输入", rule: "程序通过栈帧、静态区和堆组织不同生命周期的数据", evidence: "程序与内存的边界测试与结果记录", invariant: "程序通过栈帧、静态区和堆组织不同生命周期的数据；讨论性能前要先回答值在哪里、由谁拥有以及何时释放。" },
  { label: "分配策略", input: "程序与内存", rule: "栈分配快速且遵循作用域，堆分配支持动态大小和跨作用域所有权", evidence: "分配策略的边界测试与结果记录", invariant: "栈分配快速且遵循作用域，堆分配支持动态大小和跨作用域所有权；Box、Rc与Arc表达不同所有权关系，不只是分配便利函数。" },
  { label: "内存管理陷阱", input: "分配策略", rule: "悬垂指针、重复释放、释放后使用、泄漏与数据竞争来自生命周期或别名规则失守", evidence: "内存管理陷阱的边界测试与结果记录", invariant: "悬垂指针、重复释放、释放后使用、泄漏与数据竞争来自生命周期或别名规则失守；Rust安全子集通过所有权和借用静态排除其中大部分。" },
  { label: "内存安全三要素", input: "内存管理陷阱", rule: "访问有效内存、遵守初始化与布局、满足别名和同步规则共同构成安全边界", evidence: "内存安全三要素的边界测试与结果记录", invariant: "访问有效内存、遵守初始化与布局、满足别名和同步规则共同构成安全边界；只证明指针非空远远不够。" },
  { label: "Rust 指针类型", input: "内存安全三要素", rule: "引用、Box、Rc、Arc、Cell、RefCell和裸指针各自编码所有权、共享与可变性", evidence: "Rust 指针类型的边界测试与结果记录", invariant: "引用、Box、Rc、Arc、Cell、RefCell和裸指针各自编码所有权、共享与可变性；选择依据是语义证据，不是为了让借用检查器安静。" },
];

export function MrsMemoryManagementSafetyModelLab() {
  return <MasteringRustOfficialLab title="内存管理与安全：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsMemoryManagementSafetyBoundaryLab() {
  return <MasteringRustOfficialLab title="内存管理与安全：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsMemoryManagementSafetyEvidenceLab() {
  return <MasteringRustOfficialLab title="内存管理与安全：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
