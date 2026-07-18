import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "1-3 起步", input: "语言目标、完整搜索程序、源码", mechanism: "类型、package、go tool与依赖", evidence: "可构建的多包程序", invariant: "运行命令、包边界和依赖来源可重复。" },
  { label: "4-5 数据类型", input: "数组、切片、map与自定义类型", mechanism: "值语义、底层存储、方法、接口与嵌入", evidence: "表示和行为一致", invariant: "复制、共享、导出和接口满足关系明确。" },
  { label: "6-7 并发", input: "独立任务、共享状态与资源", mechanism: "goroutine、锁、channel、runner、pool与work", evidence: "有关闭路径的并发系统", invariant: "无竞态，超时、中断、归还和等待可证明。" },
  { label: "8-9 工程", input: "日志、JSON、流、测试与性能问题", mechanism: "标准库接口、httptest、example与benchmark", evidence: "可诊断可测量产物", invariant: "测试语义、I/O边界和基准环境可信。" },
];
export function GiaOfficialRouteLab(){return <GoActionOfficialLab title="官方9章路线" caption="按原书9章从语言、程序与工具走到并发、标准库和测试。" cases={cases} />;}
export function GiaDependencyLab(){return <GoActionOfficialLab title="章节依赖" caption="数据和类型是并发的前提，并发程序最终由标准库和测试验收。" cases={cases} tone="violet" initial={1}/>;}
export function GiaEvidenceGateLab(){return <GoActionOfficialLab title="掌握证据" caption="每段都要能预测、运行、扰动失败并解释不变量。" cases={cases} tone="emerald" initial={3}/>;}
