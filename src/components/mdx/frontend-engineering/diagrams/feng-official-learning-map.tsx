import { FrontendEngineeringOfficialLab } from "./official-frontend-engineering-lab";
const chain = [
  "核验2018版身份",
  "建立方案架构",
  "发起标准项目",
  "构建定位资源",
  "本地开发与部署",
  "工作流持续演进",
] as const;
const concepts = [
  "第1章 前端工程简史",
  "第2章 脚手架",
  "第3章 构建",
  "第4章 本地开发服务器",
  "第5章 部署",
  "第6章 工作流",
  "第7章 前端工程化的未来",
] as const;
export function FengOfficialLearningMapMapLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="《前端工程化：体系设计与实践》权威学习地图 · 交付地图"
      label="Frontend Engineering / Map"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function FengOfficialLearningMapExperimentLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="《前端工程化：体系设计与实践》权威学习地图 · 故障实验"
      label="Frontend Engineering / Experiment"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function FengOfficialLearningMapEvidenceLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="《前端工程化：体系设计与实践》权威学习地图 · 回滚证据"
      label="Frontend Engineering / Evidence"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
