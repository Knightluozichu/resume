import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";
const cases: FluentPythonCase[] = [
  { label: "全书协议复盘", input: "全书协议复盘从调用语法追到特殊方法、类型协议和资源生命周期，不以记住API数量为目标。", mechanism: "阶段1：建立依赖与边界", evidence: "完成实现、反例与复述 1", invariant: "对象模型证据要求解释身份、相等、可变性、哈希、切片和运算符怎样维护一致不变量。" },
  { label: "对象模型证据", input: "对象模型证据要求解释身份、相等、可变性、哈希、切片和运算符怎样维护一致不变量。", mechanism: "阶段2：建立依赖与边界", evidence: "完成实现、反例与复述 2", invariant: "函数与类型证据要求用一等函数、闭包、装饰器和渐进类型建立可替换且可检查的行为边界。" },
  { label: "函数与类型证据", input: "函数与类型证据要求用一等函数、闭包、装饰器和渐进类型建立可替换且可检查的行为边界。", mechanism: "阶段3：建立依赖与边界", evidence: "完成实现、反例与复述 3", invariant: "并发控制证据要求区分线程、进程、Future和协程的调度、取消、超时、背压与故障传播。" },
  { label: "并发控制证据", input: "并发控制证据要求区分线程、进程、Future和协程的调度、取消、超时、背压与故障传播。", mechanism: "阶段4：建立依赖与边界", evidence: "完成实现、反例与复述 4", invariant: "元编程边界要求先尝试property、descriptor、init_subclass和类装饰器，再证明是否真的需要元类。" },
];
export function FlpFinalReviewModelLab(){return <FluentPythonOfficialLab title="《流畅的 Python》第2版总复习：结构" caption="按依赖定位学习任务。" cases={cases} tone="cyan" />;}
export function FlpFinalReviewBoundaryLab(){return <FluentPythonOfficialLab title="《流畅的 Python》第2版总复习：边界" caption="把语法放回协议与失败路径。" cases={cases} tone="amber" initial={1} />;}
export function FlpFinalReviewEvidenceLab(){return <FluentPythonOfficialLab title="《流畅的 Python》第2版总复习：证据" caption="以实现、反例和复述验收。" cases={cases} tone="emerald" initial={2} />;}
