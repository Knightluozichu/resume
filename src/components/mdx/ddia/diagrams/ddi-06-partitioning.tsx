import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第6章 分区",
  focus: "按键范围或哈希分散数据与请求，控制热点、二级索引、再平衡和路由变化",
  invariant: "归属变化期间没有丢失、重复拥有或错误路由，热点与再平衡成本受控",
  artifact: "键分布直方图、分区映射、再平衡演练、路由追踪与跨分区报告",
  nodes: [
    "分区与复制",
    "键值数据的分区",
    "按键范围分区",
    "按键哈希分区",
    "偏斜负载与热点缓解",
    "分区与二级索引",
    "按文档分区的二级索引",
    "按词项分区的二级索引",
    "分区再平衡",
    "再平衡策略",
    "自动或手动再平衡操作",
    "请求路由",
    "并行查询执行",
    "小结",
  ],
};

export function Ddi06PartitioningArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi06PartitioningFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi06PartitioningEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
