import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const route: RustWayCase[] = [
  { label: "1-3 语言与类型", input: "语法、表达式、值的类型", mechanism: "推导、泛型、Trait与转换", result: "可检查的抽象契约", invariant: "任何抽象都能追到具体类型、布局和行为约束。" },
  { label: "4-5 内存与所有权", input: "栈、堆、值与引用", mechanism: "RAII、移动、借用与生命周期", result: "无GC的内存安全", invariant: "释放者唯一，引用不越过被引用值的有效期。" },
  { label: "6-10 抽象与工程", input: "函数、数据、错误与包", mechanism: "闭包、迭代器、结构、Result与Cargo", result: "可复用的程序边界", invariant: "错误、可见性、依赖与资源owner都必须显式。" },
  { label: "11-13 边界", input: "线程、宏、外部内存", mechanism: "Send/Sync、代码生成与unsafe契约", result: "可审计的系统能力", invariant: "安全接口不能让调用者制造未定义行为。" },
];

const gates: RustWayCase[] = [
  { label: "预测", input: "代码与初始状态", mechanism: "先写编译或运行结果", result: "可证伪预期", invariant: "预期必须包含所有权、类型或并发理由。" },
  { label: "执行", input: "固定toolchain与命令", mechanism: "编译、测试、记录诊断", result: "可重复证据", invariant: "版本、命令、stdout、stderr与status完整。" },
  { label: "扰动", input: "边界值与失败注入", mechanism: "改变所有者、类型、线程或输入", result: "失效边界", invariant: "失败必须发生在预期的编译期或错误通道。" },
  { label: "解释", input: "结果与诊断", mechanism: "重画值、引用、类型和线程关系", result: "可迁移模型", invariant: "脱离示例仍能解释最早被破坏的不变量。" },
];

export function RswLearningRouteLab() { return <RustWayOfficialLab title="13章主线" caption="切换四段主线，观察安全、抽象与工程能力如何逐层累积。" cases={route} tone="cyan" />; }
export function RswOfficialOutlineLab() { return <RustWayOfficialLab title="官方目录坐标" caption="每段都对应《Rust编程之道》中的连续官方章节，不再压缩成十个主题页。" cases={route} tone="violet" />; }
export function RswEvidenceGateLab() { return <RustWayOfficialLab title="章节掌握门禁" caption="预测、执行、扰动、解释共同构成掌握证据。" cases={gates} tone="emerald" />; }
