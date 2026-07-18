import { GoActionOfficialLab, type GoActionCase } from "./official-lab";
const cases: GoActionCase[] = [
  { label: "架构", input: "RSS源、搜索词与输出", mechanism: "main协调search package和matcher", evidence: "可替换的搜索管线", invariant: "入口、领域逻辑和外部适配器分离。" },
  { label: "Feed", input: "JSON feed配置", mechanism: "decode为Feed并并发抓取", evidence: "类型化源列表", invariant: "解码和网络错误进入显式通道。" },
  { label: "Matcher", input: "Feed类型与内容", mechanism: "接口注册、默认与RSS实现", evidence: "按类型选择行为", invariant: "没有具体matcher时有明确fallback。" },
  { label: "Display", input: "并发搜索结果", mechanism: "channel汇聚与格式化", evidence: "终端输出", invariant: "生产者完成后关闭，consumer不永久等待。" },
];
export function GiaArchitectureLab(){return <GoActionOfficialLab title="完整搜索程序架构" caption="Main、search package、feed、matcher与display形成端到端链。" cases={cases}/>;}
export function GiaSearchFlowLab(){return <GoActionOfficialLab title="Search包执行流" caption="从配置解码到matcher选择，跟踪类型、错误和goroutine。" cases={cases} tone="amber" initial={1}/>;}
export function GiaMatcherLab(){return <GoActionOfficialLab title="RSS Matcher" caption="接口、注册和默认实现把外部格式变化隔离在matcher。" cases={cases} tone="emerald" initial={2}/>;}
