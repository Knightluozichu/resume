import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第12页 QNX平台支持与优化";
const focus =
  "QNX页明确诊断、线程调度、图层、触控与Profiler能力，课程把功能清单转为可复现的启动参数和故障注入实验。";
const stages = [
  "配置QNX构建",
  "设置线程与亲和性",
  "声明输出图层",
  "接入触控与日志",
  "用Profiler验收",
];

export function Uhm24Slide12QnxSupportMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide12QnxSupportExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide12QnxSupportEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
