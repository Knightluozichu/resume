import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第9页 地图方案与合作伙伴生态";
const focus =
  "地图和音画伙伴说明HMI不是孤立应用，接口契约、资源许可、离线策略与第三方版本都属于量产边界。";
const stages = [
  "选择地图方案",
  "定义数据接口",
  "接入音画伙伴",
  "验证离线降级",
  "冻结第三方版本",
];

export function Uhm24Slide09EcosystemMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide09EcosystemExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide09EcosystemEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
