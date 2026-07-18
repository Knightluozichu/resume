"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第3版权威学习地图",
  part: "全书导读",
  focus: "按四篇20章贯通数据库基础、对象与查询、管理运维和两个实战系统",
  invariant: "每章都有目录节点、可执行实验、失败反例、证据产物和前后导航",
  artifact: "20章依赖图、五附录入口、证据清单和阶段验收表",
  nodes: [
    "第1篇 MySQL数据库基础篇 · 第1章 数据库概述",
    "第1篇 MySQL数据库基础篇 · 第2章 MySQL的安装与配置",
    "第2篇 MySQL数据库操作和应用篇 · 第3章 数据库基本操作",
    "第2篇 MySQL数据库操作和应用篇 · 第4章 存储引擎和数据类型",
    "第2篇 MySQL数据库操作和应用篇 · 第5章 操作数据表",
    "第2篇 MySQL数据库操作和应用篇 · 第6章 操作索引",
    "第2篇 MySQL数据库操作和应用篇 · 第7章 操作视图",
    "第2篇 MySQL数据库操作和应用篇 · 第8章 操作触发器",
    "第2篇 MySQL数据库操作和应用篇 · 第9章 数据的操作",
    "第2篇 MySQL数据库操作和应用篇 · 第10章 单表查询",
    "第2篇 MySQL数据库操作和应用篇 · 第11章 多表查询",
    "第2篇 MySQL数据库操作和应用篇 · 第12章 运算符",
    "第2篇 MySQL数据库操作和应用篇 · 第13章 常用函数",
    "第2篇 MySQL数据库操作和应用篇 · 第14章 存储过程和函数的操作",
    "第2篇 MySQL数据库操作和应用篇 · 第15章 事务",
    "第3篇 MySQL数据库管理篇 · 第16章 MySQL安全机制",
    "第3篇 MySQL数据库管理篇 · 第17章 MySQL日志管理",
    "第3篇 MySQL数据库管理篇 · 第18章 数据库维护和性能提高",
    "第4篇 MySQL数据库实战案例篇 · 第19章 Java+MySQL案例：在线书城",
    "第4篇 MySQL数据库实战案例篇 · 第20章 PHP+MySQL案例：智能考试系统",
    "附录A MySQL数据库操作技巧",
    "附录B MySQL数据库管理技巧",
    "附录C 常用函数与命令速查",
    "附录D 故障与性能检查清单",
    "附录E PowerDesigner数据库设计",
  ],
};

export function MseOfficialLearningMapModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseOfficialLearningMapExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseOfficialLearningMapEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
