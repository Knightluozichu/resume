import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "WebAssembly 模型", input: "目标与输入", rule: "WebAssembly是可移植的低层字节码与验证执行模型，不是浏览器里的完整操作系统", evidence: "WebAssembly 模型的边界测试与结果记录", invariant: "WebAssembly是可移植的低层字节码与验证执行模型，不是浏览器里的完整操作系统；宿主通过导入导出提供DOM、网络和时钟等能力。" },
  { label: "设计目标", input: "WebAssembly 模型", rule: "紧凑、快速解码、接近原生性能和语言无关是核心目标", evidence: "设计目标的边界测试与结果记录", invariant: "紧凑、快速解码、接近原生性能和语言无关是核心目标；沙箱减少权限面，但应用仍要验证输入、限制资源并更新依赖。" },
  { label: "模块与线性内存", input: "设计目标", rule: "模块导出函数并使用线性内存交换数据，跨边界字符串通常需要指针、长度与编码协议", evidence: "模块与线性内存的边界测试与结果记录", invariant: "模块导出函数并使用线性内存交换数据，跨边界字符串通常需要指针、长度与编码协议；复制和分配成本要真实测量。" },
  { label: "Rust 到 WebAssembly", input: "模块与线性内存", rule: "Rust目标、绑定生成和JavaScript胶水共同组成构建链", evidence: "Rust 到 WebAssembly的边界测试与结果记录", invariant: "Rust目标、绑定生成和JavaScript胶水共同组成构建链；Rust类型不能自动无损映射到宿主对象，边界应保持小而稳定。" },
  { label: "浏览器集成", input: "Rust 到 WebAssembly", rule: "事件回调、生命周期和错误需要在宿主与模块间明确归属", evidence: "浏览器集成的边界测试与结果记录", invariant: "事件回调、生命周期和错误需要在宿主与模块间明确归属；释放闭包、处理panic并保留source map，才能让线上问题可诊断。" },
];

export function MrsWebassemblyModelLab() {
  return <MasteringRustOfficialLab title="Web 上的 Rust 与 WebAssembly：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsWebassemblyBoundaryLab() {
  return <MasteringRustOfficialLab title="Web 上的 Rust 与 WebAssembly：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsWebassemblyEvidenceLab() {
  return <MasteringRustOfficialLab title="Web 上的 Rust 与 WebAssembly：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
