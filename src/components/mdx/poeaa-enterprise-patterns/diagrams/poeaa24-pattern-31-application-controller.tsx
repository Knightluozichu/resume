import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-31-application-controller",
  title: "14.7 应用控制器",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
} as const;

export function Poeaa24Pattern31ApplicationControllerBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern31ApplicationControllerMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern31ApplicationControllerTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
