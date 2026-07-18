import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第14页 团结引擎";
const focus =
  "分隔页从平台运行时切换到专有渲染架构，强调后续URAS是多应用共享渲染服务而非普通单Activity方案。";
const stages = [
  "识别架构分部",
  "区分前后台渲染",
  "列出应用客户端",
  "声明服务边界",
  "准备资源对照",
];

export function Uhm24Slide14TuanjieEngineMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide14TuanjieEngineExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide14TuanjieEngineEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
