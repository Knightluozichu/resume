import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "附录C 数据库明细",
  focus: "建立Kong 2.0.5数据库实体、关系、迁移状态和备份恢复的可查询明细",
  invariant:
    "数据库结构由对应迁移版本产生，直接查询只用于诊断，写入必须经受支持接口且恢复后实体关系完整",
  artifact: "模式快照、实体关系、迁移记录、只读诊断查询、备份恢复和一致性校验",
  nodes: ["附录C 数据库明细"],
} as const;

export function KgaAppendixCDatabaseRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function KgaAppendixCDatabaseRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function KgaAppendixCDatabaseEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
