import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "附录A 在其他操作系统中安装Kafka",
  focus:
    "分别复现Windows与macOS上的Kafka安装路径，区分WSL、原生Java、Homebrew和手工安装的文件、进程与网络边界",
  invariant:
    "Java版本、目录、监听地址、数据路径和启动停止步骤可由新环境重放，平台差异不改变Kafka协议与数据验收",
  artifact:
    "Windows与macOS安装矩阵、环境探针、启动日志、端到端收发测试和清理脚本",
  nodes: [
    "在Windows系统中安装Kafka",
    "使用Windows的Linux子系统",
    "使用原生Java包",
    "在macOS系统中安装Kafka",
    "使用Homebrew",
    "手动安装",
  ],
} as const;

export function KfkAppendixAInstallationTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function KfkAppendixAInstallationReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function KfkAppendixAInstallationEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
