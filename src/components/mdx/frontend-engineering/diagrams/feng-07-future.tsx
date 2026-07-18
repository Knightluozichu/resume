import { FrontendEngineeringOfficialLab } from "./official-frontend-engineering-lab";
const chain = [
  "识别运行平台",
  "扩展工程师职责",
  "抽象稳定能力",
  "隔离易变工具",
  "度量反馈交付",
  "持续修订蓝图",
] as const;
const concepts = [
  "第7章 前端工程化的未来",
  "7.1 前端工程师未来的定位",
  "7.1.1 不只是浏览器",
  "7.1.2 也不只是Web",
  "7.2 前端工程化是一张蓝图",
  "7.3 总结",
] as const;
export function Feng07FutureMapLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 7 章 前端工程化的未来 · 交付地图"
      label="Frontend Engineering / Map"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Feng07FutureExperimentLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 7 章 前端工程化的未来 · 故障实验"
      label="Frontend Engineering / Experiment"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Feng07FutureEvidenceLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 7 章 前端工程化的未来 · 回滚证据"
      label="Frontend Engineering / Evidence"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
