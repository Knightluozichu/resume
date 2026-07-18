import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "Build", input: "module、packages与源码", mechanism: "fmt、vet、test、build", evidence: "可重复二进制", invariant: "依赖、工具版本和命令被锁定。" },
  { label: "Model", input: "数据、类型与接口", mechanism: "array/slice/map、method与composition", evidence: "清楚的值与共享语义", invariant: "复制、共享、nil和导出边界可解释。" },
  { label: "Run", input: "goroutine、资源和I/O", mechanism: "channel、lock、runner、pool与Reader/Writer", evidence: "可关闭服务", invariant: "无竞态、无泄漏、错误和超时可见。" },
  { label: "Verify", input: "行为和性能假设", mechanism: "test、httptest、example、benchmark", evidence: "可回归证据", invariant: "失败可诊断，基准可重复且语义等价。" },
];
export function GiaWholeBookLab(){return <GoActionOfficialLab title="9章统一模型" caption="构建、建模、运行和验证连接原书所有章节。" cases={cases}/>;}
export function GiaDiagnosisLab(){return <GoActionOfficialLab title="故障逆向链" caption="从失败证据逆向回到工具、类型、并发或I/O的首个不变量。" cases={cases} tone="rose" initial={2}/>;}
export function GiaCapstoneLab(){return <GoActionOfficialLab title="搜索服务总验收" caption="完整项目必须能clean build、受控退出、测试与基准。" cases={cases} tone="emerald" initial={3}/>;}
