"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第3版全书复习与项目验收",
  part: "全书收束",
  focus: "以书城和考试系统复核20章知识、五附录工具以及安全恢复能力",
  invariant: "任一核心写路径可证明约束、事务、权限、日志、恢复和性能边界",
  artifact: "全书能力矩阵、双项目验收包、恢复演练和迁移清单",
  nodes: [
    "复习1 数据库概念与实例配置",
    "复习2 数据库、表、引擎和类型",
    "复习3 索引、视图与触发器",
    "复习4 DML、单表和多表查询",
    "复习5 运算符、函数与存储例程",
    "复习6 事务、并发与锁",
    "复习7 用户权限和参数化查询",
    "复习8 日志、备份恢复与性能",
    "复习9 Java在线书城验收",
    "复习10 PHP智能考试系统验收",
    "附录A-E 操作、管理、速查、排障与PowerDesigner",
    "终局演练 数据损坏后的恢复与业务对账",
  ],
};

export function MseOfficialFinalReviewModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseOfficialFinalReviewExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseOfficialFinalReviewEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
