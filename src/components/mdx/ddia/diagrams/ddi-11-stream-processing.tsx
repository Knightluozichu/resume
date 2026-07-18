import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第11章 流处理",
  focus: "把持续事件作为有序可重放日志，连接CDC、事件时间、流连接和容错状态",
  invariant: "重复、乱序、迟到、重启和回放下，状态与外部副作用满足声明语义",
  artifact: "事件Schema、分区顺序、窗口测试、检查点恢复与端到端对账",
  nodes: [
    "传递事件流",
    "消息系统",
    "分区日志",
    "数据库与流",
    "保持系统同步",
    "变更数据捕获",
    "事件溯源",
    "状态、流与不可变性",
    "流处理",
    "流处理的用途",
    "时间推理",
    "流连接",
    "容错",
    "小结",
  ],
};

export function Ddi11StreamProcessingArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi11StreamProcessingFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi11StreamProcessingEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
