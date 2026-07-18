import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "附录B 其他Kafka工具",
  focus:
    "按综合平台、集群部署管理、监控查看、客户端开发库和流处理五类能力评估Kafka生态工具",
  invariant:
    "工具选择由版本兼容、协议能力、权限边界、可观测性、恢复与退出成本决定，不由演示截图或功能数量决定",
  artifact:
    "工具能力矩阵、兼容性验证、最小权限记录、故障退出演练和替换成本评估",
  nodes: [
    "综合性平台",
    "集群部署和管理",
    "监控和查看数据",
    "客户端开发库",
    "流式处理",
  ],
} as const;

export function KfkAppendixBToolsTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function KfkAppendixBToolsReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function KfkAppendixBToolsEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
