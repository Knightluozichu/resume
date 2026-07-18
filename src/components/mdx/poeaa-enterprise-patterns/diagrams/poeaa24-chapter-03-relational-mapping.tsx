import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-03-relational-mapping",
  title: "第3章 映射到关系数据库",
  nodes: ["对象图", "身份关系", "读取", "变更跟踪", "写回"],
  focuses: ["身份", "工作单元", "关系映射", "继承映射", "连接边界"],
} as const;

export function Poeaa24Chapter03RelationalMappingBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter03RelationalMappingMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter03RelationalMappingTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
