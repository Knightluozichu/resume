import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "16. Service Locator";
const focus = "服务接口 / 实例作用域 / 服务发现 / 空对象 / 隐藏依赖";
const stages = [
  "声明服务接口",
  "注册作用域实例",
  "解析服务请求",
  "提供空对象回退",
  "追踪隐藏依赖",
];

export function GppChapter16ServiceLocatorMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter16ServiceLocatorExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter16ServiceLocatorEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
