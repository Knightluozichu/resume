import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第8页 多种架构组合";
const focus =
  "演讲展示单SoC、双SoC与多OS组合，课程把每一种组合转成进程边界、合成路径、输入路由和故障隔离合同。";
const stages = [
  "选择SoC组合",
  "划分OS域",
  "声明显示所有权",
  "路由输入与信号",
  "注入单域故障",
];

export function Uhm24Slide08ArchitectureCombinationsMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide08ArchitectureCombinationsExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide08ArchitectureCombinationsEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
