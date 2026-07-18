import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const map: RustWayCase[] = [
  { label: "值与表示", input: "Ch1-4的语言、类型和内存", mechanism: "类型推导、布局与RAII", result: "可解释的值模型", invariant: "每个值的类型、位置、大小和释放者明确。" },
  { label: "访问与抽象", input: "Ch5-8的owner、调用与数据", mechanism: "借用、闭包、结构与集合", result: "零成本抽象", invariant: "高层接口不隐藏所有权和表示风险。" },
  { label: "工程与边界", input: "Ch9-13的错误、包、并发、宏和unsafe", mechanism: "显式失败、模块契约与安全封装", result: "可维护系统", invariant: "跨模块、线程和语言的前置条件可审计。" },
];
const diagnosis: RustWayCase[] = [
  { label: "编译失败", input: "type、move、borrow或lifetime诊断", mechanism: "定位最早不满足的约束", result: "最小所有权/类型修复", invariant: "不靠无意义clone或unsafe压掉症状。" },
  { label: "运行失败", input: "Err、panic、deadlock或错误结果", mechanism: "沿owner、状态与错误链回溯", result: "首个失效不变量", invariant: "日志和测试保留输入、线程、资源与source chain。" },
  { label: "边界失败", input: "FFI、宏展开、依赖或编码", mechanism: "还原生成物和协议坐标", result: "可复现跨边界证据", invariant: "调用双方对布局、版本、释放和错误语义一致。" },
];
const capstone: RustWayCase[] = [
  { label: "同步核心", input: "领域值与命令", mechanism: "enum状态、Result与模块私有性", result: "可测试library", invariant: "无效状态不可构造，失败不污染已提交状态。" },
  { label: "并发外壳", input: "任务与共享需求", mechanism: "channel、Arc/lock或Future", result: "有背压的服务", invariant: "取消、关闭、锁顺序和Send/Sync可证明。" },
  { label: "外部接口", input: "CLI、CSV或FFI输入", mechanism: "验证、转换与安全封装", result: "稳定公开API", invariant: "外部数据不能直接破坏内部不变量。" },
];
export function RswWholeBookMapLab() { return <RustWayOfficialLab title="13章统一模型" caption="从值与表示，经访问与抽象，到工程与安全边界。" cases={map} tone="cyan" />; }
export function RswDiagnosisLab() { return <RustWayOfficialLab title="故障逆向诊断" caption="先判断失败阶段，再追踪最早被破坏的类型、owner或协议。" cases={diagnosis} tone="rose" />; }
export function RswCapstoneLab() { return <RustWayOfficialLab title="综合项目验收" caption="同步核心、并发外壳和外部接口分别保留自己的不变量。" cases={capstone} tone="emerald" />; }
