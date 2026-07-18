import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第2章 安装Kafka",
  focus:
    "把操作系统、Java、ZooKeeper、broker参数、硬件、云环境、集群规模与生产约束组合成可重放部署基线",
  invariant:
    "节点身份、日志目录、监听地址和ZooKeeper连接在重启后稳定，容量与吞吐预算有测量依据，任何调优都保留回退值",
  artifact: "环境清单、broker配置基线、硬件容量模型、集群拓扑和生产上线检查表",
  nodes: [
    "环境配置",
    "选择操作系统",
    "安装Java",
    "安装ZooKeeper",
    "安装broker",
    "配置broker",
    "常规配置参数",
    "主题的默认配置",
    "选择硬件",
    "磁盘吞吐量",
    "磁盘容量",
    "内存",
    "网络",
    "CPU",
    "云端的Kafka",
    "微软Azure",
    "AWS",
    "配置Kafka集群",
    "需要多少个broker",
    "broker配置",
    "操作系统调优",
    "生产环境的注意事项",
    "垃圾回收器选项",
    "数据中心布局",
    "共享ZooKeeper",
    "小结",
  ],
} as const;

export function Kfk02InstallingKafkaTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk02InstallingKafkaReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk02InstallingKafkaEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
