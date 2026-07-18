import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-04-web-presentation",
  title: "第4章 Web表示层",
  nodes: ["请求", "输入控制", "模型调用", "视图生成", "响应"],
  focuses: ["请求映射", "控制器", "模型", "视图", "导航"],
} as const;

export function Poeaa24Chapter04WebPresentationBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter04WebPresentationMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter04WebPresentationTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
