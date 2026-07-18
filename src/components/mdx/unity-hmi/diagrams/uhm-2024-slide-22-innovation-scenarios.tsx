import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第22页 六大HMI创新场景";
const focus =
  "场景矩阵覆盖3D车模、3D座舱、地图导航、智能驾驶、OS创新与跨域创新，每一项都要回到数据源、显示设备和安全等级。";
const stages = [
  "选择场景域",
  "登记信号与资产",
  "定义交互反馈",
  "分离安全内容",
  "目标车回归",
];

export function Uhm24Slide22InnovationScenariosMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide22InnovationScenariosExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide22InnovationScenariosEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
