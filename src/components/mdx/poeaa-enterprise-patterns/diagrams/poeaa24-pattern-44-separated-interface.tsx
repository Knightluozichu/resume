import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-44-separated-interface",
  title: "18.4 分离接口",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
} as const;

export function Poeaa24Pattern44SeparatedInterfaceBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern44SeparatedInterfaceMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern44SeparatedInterfaceTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
