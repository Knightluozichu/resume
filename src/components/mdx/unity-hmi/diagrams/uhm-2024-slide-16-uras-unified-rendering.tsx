import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第16页 URAS统一后台渲染服务";
const focus =
  "URAS把多份引擎整合为一份后台渲染服务，为车模车控、ADAS、APA、音乐、地图和其他应用提供统一渲染。";
const stages = [
  "盘点多份引擎",
  "合并后台服务",
  "注册应用视图",
  "调度统一帧",
  "比较资源占用",
];

export function Uhm24Slide16UrasUnifiedRenderingMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide16UrasUnifiedRenderingExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide16UrasUnifiedRenderingEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
