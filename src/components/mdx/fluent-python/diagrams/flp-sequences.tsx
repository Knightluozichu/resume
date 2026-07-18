import { FluentPythonOfficialLab, type FluentPythonCase } from "./official-lab";

const cases: FluentPythonCase[] = [
  { label: "序列构成的数组", input: "输入1：序列构成的数组", mechanism: "序列构成的数组先区分容器序列与扁平序列，再区分可变与不可变", evidence: "检查返回、状态与失败路径 1", invariant: "列表推导式用于立即构造列表，生成器表达式把值按需送入构造器或消费端。" },
  { label: "列表推导式与生成器表", input: "输入2：列表推导式与生成器表达式", mechanism: "列表推导式用于立即构造列表，生成器表达式把值按需送入构造器或消费端", evidence: "检查返回、状态与失败路径 2", invariant: "元组既可作为不可变序列，也可作为无字段名记录。" },
  { label: "元组、解包与序列模式", input: "输入3：元组、解包与序列模式匹配", mechanism: "元组既可作为不可变序列，也可作为无字段名记录", evidence: "检查返回、状态与失败路径 3", invariant: "切片是半开区间并生成新对象；给切片赋值可以改变长度。" },
  { label: "切片与增量赋值", input: "输入4：切片与增量赋值", mechanism: "切片是半开区间并生成新对象；给切片赋值可以改变长度", evidence: "检查返回、状态与失败路径 4", invariant: "数组、内存视图与双端队列分别解决紧凑数值存储、零复制重解释和两端高效操作。" },
];

export function FlpSequencesModelLab() {
  return <FluentPythonOfficialLab title="序列构成的数组：模型" caption="第2章的对象、协议与结果。" cases={cases} tone="cyan" />;
}

export function FlpSequencesBoundaryLab() {
  return <FluentPythonOfficialLab title="序列构成的数组：边界" caption="切换场景，比较责任和失败位置。" cases={cases} tone="amber" initial={1} />;
}

export function FlpSequencesEvidenceLab() {
  return <FluentPythonOfficialLab title="序列构成的数组：证据" caption="用可观察结果验收不变量。" cases={cases} tone="emerald" initial={2} />;
}
