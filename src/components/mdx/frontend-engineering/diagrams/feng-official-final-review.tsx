import { FrontendEngineeringOfficialLab } from "./official-frontend-engineering-lab";
const chain = [
  "登记源码变更",
  "验证配置模板",
  "生成唯一制品",
  "本地契约测试",
  "按序部署缓存",
  "持续交付并复盘",
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
export function FengOfficialFinalReviewMapLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="《前端工程化：体系设计与实践》全书总复习 · 交付地图"
      label="Frontend Engineering / Map"
      color="#475569"
      soft="#f1f5f9"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function FengOfficialFinalReviewExperimentLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="《前端工程化：体系设计与实践》全书总复习 · 故障实验"
      label="Frontend Engineering / Experiment"
      color="#475569"
      soft="#f1f5f9"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function FengOfficialFinalReviewEvidenceLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="《前端工程化：体系设计与实践》全书总复习 · 回滚证据"
      label="Frontend Engineering / Evidence"
      color="#475569"
      soft="#f1f5f9"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
