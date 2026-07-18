import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "Request", input: "method、URI、header、body", boundary: "HTTP请求解析", output: "结构化Request", invariant: "安全与幂等是方法语义，不是名字装饰。" },
  { label: "Response", input: "状态、header与实体", boundary: "响应写入", output: "客户端可解释消息", invariant: "状态和header必须在body前确定。" },
  { label: "Handler", input: "已路由请求", boundary: "业务处理器", output: "响应或错误", invariant: "处理器不隐式拥有外部资源。" },
  { label: "Template", input: "数据与展示模板", boundary: "模板引擎", output: "HTML", invariant: "数据与展示分离并保持上下文转义。" },
];
export function GwpHttpCycleLab(){return <GoWebOfficialLab title="HTTP请求响应周期" caption="客户端与服务器通过两类消息交换状态。" cases={cases}/>;}
export function GwpMessageLab(){return <GoWebOfficialLab title="HTTP消息剖面" caption="方法、URI、状态、header和body共同组成协议。" cases={cases} tone="amber" initial={1}/>;}
export function GwpAppPartsLab(){return <GoWebOfficialLab title="Web应用组成" caption="handler与template engine连接协议和展示。" cases={cases} tone="emerald" initial={2}/>;}
