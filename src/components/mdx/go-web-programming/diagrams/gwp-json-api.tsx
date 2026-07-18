import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "SOAP", input: "XML envelope与操作", boundary: "SOAP契约", output: "XML响应", invariant: "协议错误与业务错误分层表达。" },
  { label: "REST", input: "资源URI与HTTP方法", boundary: "资源handler", output: "状态、header与表示", invariant: "方法语义和状态码保持一致。" },
  { label: "XML", input: "元素、属性与命名空间", boundary: "encoding/xml", output: "类型化结构", invariant: "未知字段与深度限制有明确策略。" },
  { label: "JSON", input: "JSON对象或stream", boundary: "encoding/json", output: "API DTO", invariant: "解码错误、未知字段和尾随数据可诊断。" },
];
export function GwpServiceStyleLab(){return <GoWebOfficialLab title="Web服务风格" caption="SOAP与REST在契约、传输和错误模型上取舍不同。" cases={cases}/>;}
export function GwpCodecLab(){return <GoWebOfficialLab title="XML与JSON编解码" caption="标签、零值和流式解码决定互操作结果。" cases={cases} tone="amber" initial={2}/>;}
export function GwpRestLab(){return <GoWebOfficialLab title="Go REST服务" caption="资源、方法、状态码和表示形成可测试协议。" cases={cases} tone="emerald" initial={1}/>;}
