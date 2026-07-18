import { FrontendEngineeringOfficialLab } from "./official-frontend-engineering-lab";
const chain = [
  "读取项目意图",
  "校验环境参数",
  "选择模板版本",
  "渲染文件事务",
  "安装并验证依赖",
  "移交项目所有权",
] as const;
const concepts = [
  "第2章 脚手架",
  "2.1 脚手架的功能和本质",
  "2.2 脚手架在前端工程中的角色和特征",
  "2.2.1 用完即弃的发起者角色",
  "2.2.2 局限于本地的执行环境",
  "2.2.3 多样性的实现模式",
  "2.3 开源脚手架案例剖析",
  "2.4 集成Yeoman封装脚手架方案",
  "2.4.1 封装脚手架方案",
  "2.4.2 集成到工程化体系中",
  "2.5 总结",
] as const;
export function Feng02ScaffoldingMapLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 2 章 脚手架 · 交付地图"
      label="Frontend Engineering / Map"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Feng02ScaffoldingExperimentLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 2 章 脚手架 · 故障实验"
      label="Frontend Engineering / Experiment"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Feng02ScaffoldingEvidenceLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 2 章 脚手架 · 回滚证据"
      label="Frontend Engineering / Evidence"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
