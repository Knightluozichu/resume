import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第18天 GluonJ的使用方法",
  label: "解说篇 · 理论与实现机制",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "声明宿主边界",
    "解析Java成员",
    "转换参数类型",
    "调用宿主代码",
    "映射异常",
    "验证类路径",
  ],
  concepts: [
    "第18天 GluonJ的使用方法",
    "18.1 设定类路径",
    "18.2 启动设定",
    "18.3 GluonJ语言",
    "18.4 功能总结",
    "专栏第7话 续·武勇传",
  ],
} as const;

export function Tws18GluonjMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws18GluonjExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws18GluonjEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
