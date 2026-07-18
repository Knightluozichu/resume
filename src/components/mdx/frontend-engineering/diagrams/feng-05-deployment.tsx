import { FrontendEngineeringOfficialLab } from "./official-frontend-engineering-lab";
const chain = [
  "冻结发布制品",
  "执行代码审查",
  "进入部署队列",
  "上传不可变资源",
  "切换入口版本",
  "验证并回滚演练",
] as const;
const concepts = [
  "第5章 部署",
  "5.1 部署流程的设计原则",
  "5.1.1 速度——化繁为简",
  "5.1.2 协作——代码审查和部署队列",
  "5.1.3 安全——严格审查和权限控制",
  "5.2 流程之外：前端静态资源的部署策略",
  "5.2.1 协商缓存与强制缓存",
  "5.2.2 Apache设置缓存策略",
  "5.3 总结",
] as const;
export function Feng05DeploymentMapLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 5 章 部署 · 交付地图"
      label="Frontend Engineering / Map"
      color="#047857"
      soft="#d1fae5"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Feng05DeploymentExperimentLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 5 章 部署 · 故障实验"
      label="Frontend Engineering / Experiment"
      color="#047857"
      soft="#d1fae5"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Feng05DeploymentEvidenceLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 5 章 部署 · 回滚证据"
      label="Frontend Engineering / Evidence"
      color="#047857"
      soft="#d1fae5"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
