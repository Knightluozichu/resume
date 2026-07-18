import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-23-query-object",
  title: "13.2 查询对象",
  nodes: ["领域意图", "查询对象", "映射元数据", "执行", "对象结果"],
  focuses: ["元数据校验", "查询组合", "资源库边界", "参数化", "类型恢复"],
} as const;

export function Poeaa24Pattern23QueryObjectBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern23QueryObjectMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern23QueryObjectTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
