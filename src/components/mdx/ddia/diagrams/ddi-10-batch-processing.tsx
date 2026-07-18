import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第10章 批处理",
  focus:
    "把不可变输入转为可重跑的派生输出，从Unix管道走向MapReduce、连接和数据流",
  invariant:
    "相同版本输入与代码可重建结果，失败任务不污染最终输出，来源和完成边界可审计",
  artifact: "输入快照、批处理DAG、连接计划、重跑对账和输出发布记录",
  nodes: [
    "使用Unix工具进行批处理",
    "简单日志分析",
    "Unix哲学",
    "MapReduce与分布式文件系统",
    "MapReduce作业执行",
    "Reduce端连接与分组",
    "Map端连接",
    "批处理工作流的输出",
    "比较Hadoop与分布式数据库",
    "超越MapReduce",
    "中间状态的物化",
    "图与迭代处理",
    "高级API与语言",
    "小结",
  ],
};

export function Ddi10BatchProcessingArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi10BatchProcessingFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi10BatchProcessingEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
