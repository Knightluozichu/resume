import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-01-layering",
  title: "第1章 分层",
  nodes: ["请求", "表示层", "领域层", "数据源层", "运行环境"],
  focuses: ["职责边界", "依赖方向", "层间契约", "部署位置", "变更触达"],
} as const;

export function Poeaa24Chapter01LayeringBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter01LayeringMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter01LayeringTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
