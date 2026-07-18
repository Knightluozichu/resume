import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第5章 复制",
  focus: "比较单主、多主与无主复制的传播、冲突、读取保证和故障恢复",
  invariant:
    "滞后、宕机、分区和重试下，确认语义、冲突规则与读取保证可解释且可验证",
  artifact: "复制时序图、滞后分布、切换演练、冲突样本和读一致性测试",
  nodes: [
    "领导者与追随者",
    "同步复制与异步复制",
    "设置新的追随者",
    "处理节点宕机",
    "复制日志的实现",
    "复制滞后的问题",
    "读己之写",
    "单调读",
    "一致前缀读",
    "复制滞后的解决方案",
    "多领导者复制",
    "多领导者复制的用例",
    "处理写冲突",
    "多领导者复制拓扑",
    "无领导者复制",
    "节点宕机时写入数据库",
    "法定人数一致性的局限",
    "宽松法定人数与提示移交",
    "检测并发写入",
    "小结",
  ],
};

export function Ddi05ReplicationArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi05ReplicationFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi05ReplicationEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
