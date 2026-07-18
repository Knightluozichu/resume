import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-08-integration-debugging",
  title: "第8章：AUTOSAR工程代码集成与调试",
  nodes: ["生成物收集", "依赖集成", "编译链接", "目标下载", "双车型调试"],
  focuses: ["代码架构", "集成顺序", "链接边界", "可执行文件", "A/B车型现象"],
} as const;

export function Avc208IntegrationDebuggingArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc208IntegrationDebuggingConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc208IntegrationDebuggingEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
