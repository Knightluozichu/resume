import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-04-swc-development",
  title: "第4章：AUTOSAR软件组件级设计与开发",
  nodes: ["行为建模", "接口契约", "属性配置", "模型映射", "代码与ARXML"],
  focuses: [
    "工具边界",
    "Runnable行为",
    "客户端服务器",
    "生成配置",
    "双向工作流",
  ],
} as const;

export function Avc204SwcDevelopmentArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc204SwcDevelopmentConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc204SwcDevelopmentEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
