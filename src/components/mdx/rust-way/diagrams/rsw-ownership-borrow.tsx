import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const ownership: RustWayCase[] = [
  { label: "Move", input: "非Copy值与新绑定", mechanism: "转移释放责任", result: "旧绑定不可再用", invariant: "任何时刻只有一个绑定负责最终释放。" },
  { label: "共享借用", input: "&T", mechanism: "临时只读访问", result: "可并存多个reader", invariant: "借用期间不能通过同一路径修改值。" },
  { label: "独占借用", input: "&mut T", mechanism: "临时独占访问", result: "可安全修改", invariant: "有效期内不存在其他可用引用。" },
];
const lifetimes: RustWayCase[] = [
  { label: "参数", input: "两个输入引用", mechanism: "'a关联有效区间", result: "受约束输出引用", invariant: "输出不比所指输入活得更久。" },
  { label: "省略", input: "常见函数签名", mechanism: "三条elision规则", result: "编译器补全关系", invariant: "省略只隐藏标注，不延长任何值的寿命。" },
  { label: "NLL", input: "引用最后一次使用位置", mechanism: "非词法生命周期分析", result: "更早结束借用", invariant: "可达使用仍必须落在referent有效期内。" },
];
const sharing: RustWayCase[] = [
  { label: "Rc/Weak", input: "单线程对象图", mechanism: "强弱引用计数", result: "共享owner与无owner观察者", invariant: "回边使用Weak避免强引用环。" },
  { label: "Cell/RefCell", input: "共享引用下的修改需求", mechanism: "值替换或运行时借用检查", result: "内部可变性", invariant: "RefCell在运行时仍执行一写多读互斥。" },
  { label: "Cow", input: "借用数据与偶发修改", mechanism: "写时克隆", result: "只读零复制、修改获所有权", invariant: "调用方不能假设结果始终借用或始终拥有。" },
];
export function RswOwnershipStateLab() { return <RustWayOfficialLab title="所有权状态机" caption="Move、共享借用和独占借用改变的是访问许可与释放责任。" cases={ownership} tone="cyan" />; }
export function RswLifetimeConstraintLab() { return <RustWayOfficialLab title="生命周期约束" caption="生命周期描述引用关系，不是运行时计时器。" cases={lifetimes} tone="violet" />; }
export function RswSharedOwnershipLab() { return <RustWayOfficialLab title="共享所有权与内部可变性" caption="Rc、Weak、Cell、RefCell和Cow解决的是不同共享问题。" cases={sharing} tone="emerald" />; }
