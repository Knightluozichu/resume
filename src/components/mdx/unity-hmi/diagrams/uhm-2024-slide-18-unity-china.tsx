import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第18页 Unity中国";
const focus =
  "分隔页进入组织能力、产品底座、服务流程和创新场景，课程把商业能力陈述转换为项目阶段验收责任。";
const stages = [
  "识别组织分部",
  "回看发展节点",
  "拆解能力底座",
  "映射服务阶段",
  "选择创新场景",
];

export function Uhm24Slide18UnityChinaMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide18UnityChinaExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide18UnityChinaEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
