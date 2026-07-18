import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第15页 专有架构：URAS渲染方案";
const focus =
  "标题页定义URAS为专有后台渲染方案，后两页分别说明引擎整合、View接入与隔离工程。";
const stages = [
  "定义URAS边界",
  "建立统一服务",
  "设计View接口",
  "隔离应用工程",
  "测量资源节省",
];

export function Uhm24Slide15UrasArchitectureMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide15UrasArchitectureExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide15UrasArchitectureEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
