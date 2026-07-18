import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "附录A 在Windows系统下编译OpenJDK 6"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="附录A 在Windows系统下编译OpenJDK 6" focus="保留旧版Windows构建OpenJDK 6的历史方法，借此识别工具链、平台和版本依赖" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="附录A 在Windows系统下编译OpenJDK 6" focus="在隔离环境只复核构建步骤和依赖关系，不把旧二进制接入生产或联网服务" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="附录A 在Windows系统下编译OpenJDK 6" focus="历史工具链清单、隔离环境、构建日志、与第1章OpenJDK 12流程的差异" nodes={nodes} />;
}
