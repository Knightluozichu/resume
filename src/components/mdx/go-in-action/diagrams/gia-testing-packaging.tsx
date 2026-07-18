import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "Unit", input: "输入表与函数", mechanism: "Test函数、subtest与comparison", evidence: "正常和边界断言", invariant: "每个case独立，失败显示输入与差异。" },
  { label: "HTTP", input: "handler或client请求", mechanism: "httptest Recorder或Server", evidence: "状态、header和body", invariant: "测试真实协议边界而非伪造内部调用。" },
  { label: "Example", input: "公开API示例与Output注释", mechanism: "go test执行并比对输出", evidence: "可运行文档", invariant: "输出稳定且示例展示推荐用法。" },
  { label: "Benchmark", input: "固定工作负载", mechanism: "B.N、ResetTimer与benchmem", evidence: "ns/op、allocs/op", invariant: "结果被消费，setup不混入计时并做统计比较。" },
];
export function GiaUnitTestLab(){return <GoActionOfficialLab title="单元测试" caption="表驱动case、subtest和边界输入构成可诊断单元证据。" cases={cases}/>;}
export function GiaHttpExampleLab(){return <GoActionOfficialLab title="httptest与Example" caption="HTTP替身测试协议，Example同时验证文档输出。" cases={cases} tone="violet" initial={1}/>;}
export function GiaBenchmarkLab(){return <GoActionOfficialLab title="基准测试" caption="固定环境、隔离setup并记录时间与分配，才可比较性能。" cases={cases} tone="emerald" initial={3}/>;}
