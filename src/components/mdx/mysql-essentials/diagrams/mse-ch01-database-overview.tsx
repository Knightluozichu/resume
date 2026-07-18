"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第1章 数据库概述",
  part: "第1篇 MySQL数据库基础篇",
  focus: "从业务事实、关系模型和DBMS职责建立可验证的数据边界",
  invariant: "每个业务事实只在一个权威位置表达，标识、联系和约束均可追溯",
  artifact: "概念模型、关系模式、主外键表和数据字典",
  nodes: [
    "1.1 数据、数据库与数据库管理系统",
    "1.2 数据管理技术的发展",
    "1.3 数据模型与关系模型",
    "1.4 实体、属性、联系与E-R图",
    "1.5 关系、元组、属性与键",
    "1.6 完整性约束",
    "1.7 SQL语言及其分类",
    "1.8 MySQL在应用架构中的位置",
    "1.9 数据库设计的基本步骤",
    "1.10 本章验证清单",
  ],
};

export function MseCh01DatabaseOverviewModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh01DatabaseOverviewExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh01DatabaseOverviewEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
