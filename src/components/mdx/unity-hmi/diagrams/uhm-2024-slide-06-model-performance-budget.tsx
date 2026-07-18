import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第6页 模型预算与性能优化";
const focus =
  "本页把8155、30帧和不同屏幕场景连接到模型三角面预算，并给出从分析工具到渲染管线、资源、逻辑与算法的优化顺序。";
const stages = [
  "固定8155与30帧基线",
  "按显示场景分预算",
  "用CPU/GPU工具定位",
  "按顺序优化",
  "目标机回归",
];

export function Uhm24Slide06ModelPerformanceBudgetMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide06ModelPerformanceBudgetExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide06ModelPerformanceBudgetEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
