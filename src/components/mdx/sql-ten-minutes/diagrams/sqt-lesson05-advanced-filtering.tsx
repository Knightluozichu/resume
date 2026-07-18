"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第5课 高级数据过滤",
  focus: "用AND、OR、IN、NOT和括号组合复杂筛选条件",
  invariant: "组合条件的分组由括号显式表达，IN与OR等价性和NULL行为经过验证",
  artifact: "组合谓词树、优先级反例和等价改写对照",
  nodes: [
    "5.1 组合WHERE子句",
    "5.1.1 AND操作符",
    "5.1.2 OR操作符",
    "5.1.3 求值顺序",
    "5.2 IN操作符",
    "5.3 NOT操作符",
    "5.4 小结",
    "5.5 挑战题",
  ],
};

export function SqtLesson05AdvancedFilteringQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson05AdvancedFilteringDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson05AdvancedFilteringEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
