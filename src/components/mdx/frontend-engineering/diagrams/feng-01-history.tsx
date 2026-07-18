import { FrontendEngineeringOfficialLab } from "./official-frontend-engineering-lab";
const chain = [
  "识别业务阶段",
  "划分前后端职责",
  "确定工程衡量准则",
  "选择演进阶段",
  "设计整体架构",
  "规划功能与原则",
] as const;
const concepts = [
  "第1章 前端工程简史",
  "1.1 前端工程师的基本素养",
  "1.1.1 前端工程师的发展历史",
  "1.1.2 前端工程师的技能栈",
  "1.2 Node.js带给前端的改革",
  "1.2.1 前端的两次新生",
  "1.2.2 Node.js带来的改革",
  "1.3 前后端分离",
  "1.3.1 原始的前后端开发模式",
  "1.3.2 前后端分离的基本模式",
  "1.3.3 前后端分离与前端工程化",
  "1.4 前端工程化",
  "1.4.1 前端工程化的衡量准则",
  "1.4.2 前端工程化的进化历程",
  "1.4.3 前端工程化的3个阶段",
  "1.5 工程化方案架构",
  "1.5.1 webpack",
  "1.5.2 工程化方案的整体架构",
  "1.5.3 功能规划",
  "1.5.4 设计原则",
  "1.6 总结",
] as const;
export function Feng01HistoryMapLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 1 章 前端工程简史 · 交付地图"
      label="Frontend Engineering / Map"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Feng01HistoryExperimentLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 1 章 前端工程简史 · 故障实验"
      label="Frontend Engineering / Experiment"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Feng01HistoryEvidenceLab() {
  return (
    <FrontendEngineeringOfficialLab
      title="第 1 章 前端工程简史 · 回滚证据"
      label="Frontend Engineering / Evidence"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
