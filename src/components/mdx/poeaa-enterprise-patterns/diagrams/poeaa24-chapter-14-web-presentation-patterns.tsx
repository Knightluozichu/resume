import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-14-web-presentation-patterns",
  title: "第14章 Web表现模式",
  nodes: ["HTTP请求", "控制器", "应用模型", "视图", "HTTP响应"],
  focuses: ["路由", "输入校验", "导航", "模板转义", "视图复用"],
} as const;

export function Poeaa24Chapter14WebPresentationPatternsBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter14WebPresentationPatternsMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter14WebPresentationPatternsTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
