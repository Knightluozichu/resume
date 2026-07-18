import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-28-template-view",
  title: "14.4 模板视图",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
} as const;

export function Poeaa24Pattern28TemplateViewBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern28TemplateViewMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern28TemplateViewTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
