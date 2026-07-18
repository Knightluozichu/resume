"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第21课 使用游标",
  focus: "理解游标的创建、逐行使用和关闭生命周期",
  invariant: "游标声明、打开、提取、结束和关闭状态明确，异常路径也释放资源",
  artifact: "游标状态机、逐行处理样例、集合改写和资源释放证据",
  nodes: [
    "21.1 游标",
    "21.2 使用游标",
    "21.2.1 创建游标",
    "21.2.2 使用游标",
    "21.2.3 关闭游标",
    "21.3 小结",
  ],
};

export function SqtLesson21CursorsQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson21CursorsDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson21CursorsEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
