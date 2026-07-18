import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "Docs/source", input: "包名、symbol与版本", mechanism: "go doc、pkg.go.dev和源码", evidence: "真实接口与实现约束", invariant: "以当前toolchain源码和文档为准。" },
  { label: "Logging", input: "事件、级别与上下文", mechanism: "log或结构化logger写Writer", evidence: "可检索诊断", invariant: "不泄露敏感数据，退出策略不藏在深层库。" },
  { label: "JSON", input: "Reader与目标struct", mechanism: "Decoder、tag与错误", evidence: "类型化值", invariant: "未知字段、数字精度和尾随数据策略明确。" },
  { label: "I/O", input: "Reader、Writer与流", mechanism: "Copy、buffer与短读写循环", evidence: "包间互操作", invariant: "处理EOF、partial write、close和错误优先级。" },
];
export function GiaDocsLab(){return <GoActionOfficialLab title="文档与源代码" caption="标准库承诺由文档、接口、源码和版本共同确定。" cases={cases}/>;}
export function GiaJsonLab(){return <GoActionOfficialLab title="日志与JSON" caption="输出与编码都要明确Writer、错误和数据策略。" cases={cases} tone="amber" initial={2}/>;}
export function GiaIoLab(){return <GoActionOfficialLab title="Reader/Writer互操作" caption="小接口把文件、网络、压缩和编码连接成流式管线。" cases={cases} tone="emerald" initial={3}/>;}
