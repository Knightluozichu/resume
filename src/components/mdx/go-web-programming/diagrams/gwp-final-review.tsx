import { GoWebOfficialLab, type GoWebCase } from "./official-lab";
const cases: GoWebCase[] = [
  { label: "Protocol", input: "错误method、URI或body", boundary: "Ch1、3、4", output: "协议诊断", invariant: "先定位消息层再看业务。" },
  { label: "Data", input: "模板、存储或codec失败", boundary: "Ch5、6、7", output: "边界错误", invariant: "不把外部失败伪装成零值成功。" },
  { label: "Runtime", input: "测试缺口或并发泄漏", boundary: "Ch8、9", output: "可重复失败", invariant: "故障注入和等待协议都可观察。" },
  { label: "Release", input: "已验证构建", boundary: "Ch10部署目标", output: "版本化服务", invariant: "上线物与测试物哈希一致。" },
];
export function GwpWholeBookLab(){return <GoWebOfficialLab title="十章知识链" caption="从HTTP输入到部署输出，逐层追踪责任。" cases={cases}/>;}
export function GwpDiagnosisLab(){return <GoWebOfficialLab title="故障回章矩阵" caption="每类症状都回到负责该契约的原书章节。" cases={cases} tone="rose" initial={1}/>;}
export function GwpCapstoneLab(){return <GoWebOfficialLab title="综合项目门禁" caption="协议、数据、运行和发布证据必须闭环。" cases={cases} tone="emerald" initial={3}/>;}
