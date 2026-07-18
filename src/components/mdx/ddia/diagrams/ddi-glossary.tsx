import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "术语表",
  focus:
    "把跨12章术语绑定到可观察语义、失败边界和相邻概念，形成设计评审共同语言",
  invariant:
    "同一术语在架构、代码、监控和演练中含义一致，任何保证都声明范围与反例",
  artifact: "30项术语卡、概念依赖图、保证对照表与评审记录",
  nodes: [
    "可用性",
    "拜占庭故障",
    "因果关系",
    "变更数据捕获",
    "一致性模型",
    "共识",
    "派生数据",
    "编码",
    "事件时间",
    "隔离令牌",
    "幂等",
    "线性一致性",
    "LSM树",
    "物化视图",
    "单调时钟",
    "多版本并发控制",
    "分区",
    "法定人数",
    "读己之写",
    "复制",
    "Schema演化",
    "可串行化",
    "快照隔离",
    "SSTable",
    "流处理",
    "事务",
    "两阶段提交",
    "版本向量",
    "水位线",
    "写偏差",
  ],
};

export function DdiGlossaryArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function DdiGlossaryFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function DdiGlossaryEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
