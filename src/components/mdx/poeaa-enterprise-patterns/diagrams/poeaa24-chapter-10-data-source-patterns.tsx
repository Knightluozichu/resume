import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-10-data-source-patterns",
  title: "第10章 数据源架构模式",
  nodes: ["领域调用", "数据边界", "查询命令", "映射", "持久化"],
  focuses: ["SQL隔离", "对象身份", "行为位置", "映射成本", "测试替身"],
} as const;

export function Poeaa24Chapter10DataSourcePatternsBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter10DataSourcePatternsMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter10DataSourcePatternsTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
