"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第5版全书复习与跨DBMS验收",
  focus: "以同一业务问题贯通检索、组合、写入、对象、事务和安全，并比较方言",
  invariant:
    "同一业务问题在目标DBMS上结果语义一致，方言差异、错误和回退均有记录",
  artifact: "全书SQL作品集、结果合同、四DBMS重放记录和迁移清单",
  nodes: [
    "复习1 数据对象、SELECT与排序",
    "复习2 WHERE、组合谓词与通配符",
    "复习3 计算字段、函数和聚集",
    "复习4 分组、子查询与联结",
    "复习5 高级联结与UNION",
    "复习6 INSERT、UPDATE与DELETE",
    "复习7 CREATE、ALTER、DROP与视图",
    "复习8 存储过程、事务与游标",
    "复习9 约束、索引、触发器与安全",
    "复习10 附录A-D和常用语句速查",
    "终局挑战：同一查询在四种DBMS重放",
    "终局交接：结果、性能、错误和回退",
  ],
};

export function SqtOfficialFinalReviewQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtOfficialFinalReviewDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtOfficialFinalReviewEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
