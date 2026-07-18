import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "带余除法", premise: "余数把无限整数压缩成有限个等价类。时钟、环形缓冲区、奇偶性、校验位和分片路由都利用周期性；真正的边界是不同语言对负数取模的定义，以及模运算能保留什么、丢失什么。", transform: "给定正模数m，整数a可唯一写成qm+r且余数位于0到m减1。", evidence: "用定义、边界样例和反例验证带余除法", invariant: "带余除法：给定正模数m，整数a可唯一写成qm+r且余数位于0到m减1。" },
  { label: "同余", premise: "带余除法", transform: "两个整数除以m余数相同，记作模m同余；它把整数划分为m组。", evidence: "用定义、边界样例和反例验证同余", invariant: "同余：两个整数除以m余数相同，记作模m同余；它把整数划分为m组。" },
  { label: "周期性", premise: "同余", transform: "状态每经过固定步数回到同一余数类，因此可以只保存当前位置而非累计次数。", evidence: "用定义、边界样例和反例验证周期性", invariant: "周期性：状态每经过固定步数回到同一余数类，因此可以只保存当前位置而非累计次数。" },
  { label: "模运算规则", premise: "周期性", transform: "加法和乘法可先取模再计算；除法只有在逆元存在时才能安全迁移。", evidence: "用定义、边界样例和反例验证模运算规则", invariant: "模运算规则：加法和乘法可先取模再计算；除法只有在逆元存在时才能安全迁移。" },
  { label: "环形索引", premise: "模运算规则", transform: "逻辑位置对容量取模得到物理槽位，但覆盖策略和空满判定仍需额外状态。", evidence: "容量为8的环形队列把逻辑序号13映射到槽5，但槽5可能属于旧数据也可能属于新数据。生产系统会同时维护读写序号，用差值判断元素数，用取模定位数组槽；只保存两个余数会丢失绕圈次数并产生空满二义性。", invariant: "环形索引：逻辑位置对容量取模得到物理槽位，但覆盖策略和空满判定仍需额外状态。" },
];
export function Pm1RemainderModelLab(){return <ProgrammerMathSeriesLab title="第3章 余数：周期性和分组：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm1RemainderBoundaryLab(){return <ProgrammerMathSeriesLab title="第3章 余数：周期性和分组：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm1RemainderEvidenceLab(){return <ProgrammerMathSeriesLab title="第3章 余数：周期性和分组：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
