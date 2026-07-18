"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第6课 用通配符进行过滤",
  focus: "用LIKE和百分号、下划线、方括号通配符表达模式边界",
  invariant: "通配符位置、大小写、尾随空格和转义规则在目标DBMS上有明确结果",
  artifact: "模式样本矩阵、转义测试和方言支持表",
  nodes: [
    "6.1 LIKE操作符",
    "6.1.1 百分号通配符",
    "6.1.2 下划线通配符",
    "6.1.3 方括号通配符",
    "6.2 使用通配符的技巧",
    "6.3 小结",
    "6.4 挑战题",
  ],
};

export function SqtLesson06WildcardsQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson06WildcardsDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson06WildcardsEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
