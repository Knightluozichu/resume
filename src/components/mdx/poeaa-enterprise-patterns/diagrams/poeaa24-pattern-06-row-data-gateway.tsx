import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-06-row-data-gateway",
  title: "10.2 行数据入口",
  nodes: ["领域调用", "数据边界", "查询命令", "映射", "持久化"],
  focuses: ["SQL隔离", "对象身份", "行为位置", "映射成本", "测试替身"],
} as const;

export function Poeaa24Pattern06RowDataGatewayBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern06RowDataGatewayMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern06RowDataGatewayTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
