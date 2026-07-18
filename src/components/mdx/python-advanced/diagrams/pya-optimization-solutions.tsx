import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "复杂度与简化", input: "需求与输入", action: "圈复杂度提示分支测试成本，Big-O描述规模增长", evidence: "复杂度与简化的测试与迁移记录", invariant: "圈复杂度提示分支测试成本，Big-O描述规模增长；先删掉重复工作和不必要状态，再决定是否换算法，常数优化不能挽救错误增长阶。" },
  { label: "集合与数据结构", input: "复杂度与简化", action: "成员查询从列表换到集合可改变复杂度，collections提供更贴合语义的容器", evidence: "集合与数据结构的测试与迁移记录", invariant: "成员查询从列表换到集合可改变复杂度，collections提供更贴合语义的容器；建立结构本身也有时间和内存成本，应按查询次数衡量。" },
  { label: "减少外部调用", input: "集合与数据结构", action: "批处理、连接复用和请求合并可降低往返，但会增加延迟、内存与部分失败复杂度", evidence: "减少外部调用的测试与迁移记录", invariant: "批处理、连接复用和请求合并可降低往返，但会增加延迟、内存与部分失败复杂度；批大小和重试必须有上限。" },
  { label: "线程与多进程", input: "减少外部调用", action: "线程适合等待型任务，多进程隔离解释器并行CPU工作", evidence: "线程与多进程的测试与迁移记录", invariant: "线程适合等待型任务，多进程隔离解释器并行CPU工作；传输、序列化、启动、取消和汇总成本决定实际收益。" },
  { label: "缓存策略", input: "线程与多进程", action: "确定性、非确定性和主动缓存需要不同失效规则", evidence: "缓存策略的测试与迁移记录", invariant: "确定性、非确定性和主动缓存需要不同失效规则；键必须包含影响结果的输入，缓存命中率、陈旧窗口和击穿保护都要测量。" },
];
export function PyaOptimizationSolutionsModelLab(){return <PythonAdvancedOfficialLab title="优化解法：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaOptimizationSolutionsBoundaryLab(){return <PythonAdvancedOfficialLab title="优化解法：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaOptimizationSolutionsEvidenceLab(){return <PythonAdvancedOfficialLab title="优化解法：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
