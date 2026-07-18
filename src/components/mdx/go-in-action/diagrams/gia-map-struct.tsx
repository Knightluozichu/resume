import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "User type", input: "底层表示与新名称", mechanism: "定义独立类型", evidence: "新的方法集与赋值边界", invariant: "相同底层类型不等于可直接互赋。" },
  { label: "Method", input: "值或指针receiver", mechanism: "方法集绑定行为", evidence: "复制式或原地语义", invariant: "receiver选择与类型本质和修改意图一致。" },
  { label: "Interface", input: "具体值的方法集", mechanism: "隐式满足最小行为", evidence: "多态调用", invariant: "nil接口与含nil指针的接口必须区分。" },
  { label: "Embedding", input: "外层类型嵌入内层值", mechanism: "字段和方法提升", evidence: "组合式复用", invariant: "提升不等于继承，冲突和导出边界仍显式。" },
];
export function GiaTypeNatureLab(){return <GoActionOfficialLab title="类型本质与方法" caption="类型同时决定内存表示、方法集和赋值语义。" cases={cases}/>;}
export function GiaInterfaceLab(){return <GoActionOfficialLab title="接口与多态" caption="接口由调用者需要的最小行为定义，具体类型隐式满足。" cases={cases} tone="violet" initial={2}/>;}
export function GiaEmbeddingLab(){return <GoActionOfficialLab title="嵌入、组合与导出" caption="组合提升行为，但不建立is-a继承关系。" cases={cases} tone="emerald" initial={3}/>;}
