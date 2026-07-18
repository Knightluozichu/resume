"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第17课 创建和操纵表",
  focus: "用CREATE、ALTER、DROP和重命名语句管理表结构",
  invariant:
    "表定义、列类型、NULL和默认值与数据合同一致，结构变更可验证且可恢复",
  artifact: "可重放DDL、NULL与默认值测试、迁移和回退脚本",
  nodes: [
    "17.1 创建表",
    "17.1.1 表创建基础",
    "17.1.2 使用NULL值",
    "17.1.3 指定默认值",
    "17.2 更新表",
    "17.3 删除表",
    "17.4 重命名表",
    "17.5 小结",
    "17.6 挑战题",
  ],
};

export function SqtLesson17TablesQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson17TablesDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson17TablesEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
