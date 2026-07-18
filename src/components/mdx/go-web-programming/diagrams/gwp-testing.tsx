import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "Unit", input: "函数输入与替身依赖", boundary: "testing.T", output: "行为断言", invariant: "case名称、期望和失败差异完整。" },
  { label: "Handler", input: "httptest.Request", boundary: "ResponseRecorder与handler", output: "状态、header、body", invariant: "不依赖真实端口和外部网络。" },
  { label: "Client", input: "HTTP client调用", boundary: "httptest.Server", output: "真实本地往返", invariant: "Server与响应体都被关闭。" },
  { label: "Double", input: "接口化存储或发送器", boundary: "dependency injection", output: "成功与故障脚本", invariant: "替身实现同一契约而非复制内部细节。" },
];
export function GwpTestBoundaryLab(){return <GoWebOfficialLab title="测试边界矩阵" caption="测试层级由要证明的边界决定。" cases={cases}/>;}
export function GwpHttpTestLab(){return <GoWebOfficialLab title="HTTP测试工具" caption="Recorder测handler，Server测client和协议往返。" cases={cases} tone="amber" initial={1}/>;}
export function GwpDependencyLab(){return <GoWebOfficialLab title="测试替身与依赖注入" caption="接口把数据库、时钟和发送器变成可控输入。" cases={cases} tone="emerald" initial={3}/>;}
