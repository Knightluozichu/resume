import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第1版全书总复习",
  focus:
    "从用户不变量反向串联12章，完成数据模型、存储、复制、事务和派生视图设计",
  invariant:
    "架构结论可追溯到第1版目录节点、明确保证、故障历史、性能数据和独立对账",
  artifact: "全书架构评审、故障剧本、跨章追踪矩阵、恢复演练和口试",
  nodes: [
    "第1章 可靠、可扩展与可维护的应用系统",
    "第2章 数据模型与查询语言",
    "第3章 数据存储与检索",
    "第4章 数据编码与演化",
    "第5章 复制",
    "第6章 分区",
    "第7章 事务",
    "第8章 分布式系统的麻烦",
    "第9章 一致性与共识",
    "第10章 批处理",
    "第11章 流处理",
    "第12章 数据系统的未来",
    "术语表",
  ],
};

export function DdiOfficialFinalReviewArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function DdiOfficialFinalReviewFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function DdiOfficialFinalReviewEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
