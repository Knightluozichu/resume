import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第11页 团结引擎车机版";
const focus =
  "车机版面向车企HMI产品、设计和研发团队，以Unity 2022 LTS为基础，覆盖Android、QNX、Embedded Linux与OpenHarmony。";
const stages = [
  "固定2022 LTS基线",
  "选择目标OS",
  "建立一次开发合同",
  "生成平台构建",
  "执行同场景回归",
];

export function Uhm24Slide11TuanjieHeadUnitMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide11TuanjieHeadUnitExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide11TuanjieHeadUnitEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
