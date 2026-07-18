"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第5版权威学习地图",
  focus: "按22课从SELECT、过滤与汇总推进到写入、对象、事务和高级特性",
  invariant: "每课保留正式目录节点、SQL实验、挑战题、失败反例和可移植性验证",
  artifact: "22课依赖图、4附录速查入口、样例表模型和跨DBMS方言账本",
  nodes: [
    "引言：读者对象、本书涵盖的DBMS与约定",
    "第1课 了解SQL",
    "第2课 检索数据",
    "第3课 排序检索数据",
    "第4课 过滤数据",
    "第5课 高级数据过滤",
    "第6课 用通配符进行过滤",
    "第7课 创建计算字段",
    "第8课 使用函数处理数据",
    "第9课 汇总数据",
    "第10课 分组数据",
    "第11课 使用子查询",
    "第12课 联结表",
    "第13课 创建高级联结",
    "第14课 组合查询",
    "第15课 插入数据",
    "第16课 更新和删除数据",
    "第17课 创建和操纵表",
    "第18课 使用视图",
    "第19课 使用存储过程",
    "第20课 管理事务处理",
    "第21课 使用游标",
    "第22课 高级SQL特性",
    "附录A 样例表脚本",
    "附录B SQL语句的语法",
    "附录C SQL数据类型",
    "附录D SQL保留字",
    "常用SQL语句速查",
  ],
};

export function SqtOfficialLearningMapQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtOfficialLearningMapDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtOfficialLearningMapEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
