import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "Array", input: "固定长度同型元素", mechanism: "值语义连续存储", evidence: "复制得到独立数组", invariant: "长度属于类型，传参默认复制全部元素。" },
  { label: "Slice", input: "pointer、len、cap描述符", mechanism: "共享底层数组", evidence: "轻量动态视图", invariant: "重切片不越capacity，共享修改可见。" },
  { label: "Append", input: "slice与新元素", mechanism: "容量足够复用，否则分配新数组", evidence: "返回新slice描述符", invariant: "必须接收返回值，别假设仍共享旧数组。" },
  { label: "Map", input: "可比较key与value", mechanism: "运行时哈希结构", evidence: "无序键值查询", invariant: "nil map可读不可写，迭代顺序不稳定。" },
];
export function GiaCollectionLayoutLab(){return <GoActionOfficialLab title="数组、切片和映射表示" caption="值数组、slice描述符和map运行时结构有不同复制语义。" cases={cases}/>;}
export function GiaAppendLab(){return <GoActionOfficialLab title="Slice共享与Append" caption="容量决定append是否继续共享底层数组。" cases={cases} tone="amber" initial={2}/>;}
export function GiaMapLab(){return <GoActionOfficialLab title="Map生命周期" caption="初始化、读写、迭代、删除和传参都依赖map引用语义。" cases={cases} tone="emerald" initial={3}/>;}
