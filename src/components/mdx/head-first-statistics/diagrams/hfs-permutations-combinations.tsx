import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"阶乘",data:"排列组合为等可能模型提供计数基础。先判断顺序是否重要、是否允许重复、对象是否可区分，再选择阶乘、排列数、组合数或重复对象排列公式。计数错误会直接污染概率分母。",model:"n个不同对象全排列的数量，递归满足n乘(n减1)阶乘。",evidence:"用计数、图形和反例验证阶乘",warning:"看到“选r个”就套组合公式，忽略角色或到达次序是否区分。"},
  {label:"排列",data:"阶乘",model:"从n个不同对象取r个且顺序重要。",evidence:"用计数、图形和反例验证排列",warning:"重复对象仍按全部对象可区分计数，导致同一安排被重复计算。"},
  {label:"组合",data:"排列",model:"从n个不同对象取r个但内部顺序不重要。",evidence:"用计数、图形和反例验证组合",warning:"看到“选r个”就套组合公式，忽略角色或到达次序是否区分。"},
  {label:"重复对象排列",data:"组合",model:"相同类型交换不产生新结果，需要除以各类型数量的阶乘。",evidence:"用计数、图形和反例验证重复对象排列",warning:"重复对象仍按全部对象可区分计数，导致同一安排被重复计算。"},
  {label:"计数假设",data:"重复对象排列",model:"等可能性、可区分性和是否放回必须先声明。",evidence:"实验分组从20名用户选3名观察员，若角色相同用组合；若分别担任主持、记录和复核则用排列。数据表应保留角色语义，否则后续计算无法知道是否重复计数。",warning:"看到“选r个”就套组合公式，忽略角色或到达次序是否区分。"},
];
export function HfsPermutationsCombinationsDataLab(){return <HeadFirstStatsLab title="第6章 排列与组合：安排次序：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsPermutationsCombinationsModelLab(){return <HeadFirstStatsLab title="第6章 排列与组合：安排次序：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsPermutationsCombinationsEvidenceLab(){return <HeadFirstStatsLab title="第6章 排列与组合：安排次序：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
