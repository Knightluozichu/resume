import { FrontendEngineeringOfficialLab } from "./official-frontend-engineering-lab";
const chain = [
  "提交版本化源码",
  "运行本地快速检查",
  "进入测试沙箱",
  "触发云端构建",
  "签发唯一制品",
  "逐环境持续交付",
] as const;
const concepts = [
  "第6章 工作流",
  "6.1 本地工作流",
  "6.1.1 二次构建的隐患",
  "6.1.2 代码分离与测试沙箱",
  "6.2 云平台工作流",
  "6.2.1 GitFlow与版本管理",
  "6.2.2 WebHook与自动构建",
  "6.3 持续集成与持续交付",
  "6.4 总结",
] as const;
export function Feng06WorkflowMapLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 6 章 工作流 · 交付地图"
      label="Frontend Engineering / Map"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Feng06WorkflowExperimentLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 6 章 工作流 · 故障实验"
      label="Frontend Engineering / Experiment"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Feng06WorkflowEvidenceLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 6 章 工作流 · 回滚证据"
      label="Frontend Engineering / Evidence"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
