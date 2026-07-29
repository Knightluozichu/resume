import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-11-interfaces",
  title: "第11章 接口：Unix环境下的用户接口设计模式",
  question: "为批量转换、偶发管理和持续监控三个任务组合接口",
  nodes: ["任务画像", "模式筛选", "引擎分离", "反馈设计", "组合验证"],
  concepts: [
    "11. Interfaces",
    "Applying the Rule of Least Surprise",
    "History of Interface Design on Unix",
    "Evaluating Interface Designs",
    "Tradeoffs between CLI and Visual Interfaces",
    "Case Study: Two Ways to Write a Calculator Program",
    "Transparency, Expressiveness, and Configurability",
    "Unix Interface Design Patterns",
    "The Filter Pattern",
    "The Cantrip Pattern",
    "The Source Pattern",
    "The Sink Pattern",
    "The Compiler Pattern",
    "The ed pattern",
    "The Roguelike Pattern",
    "The ‘Separated Engine and Interface’ Pattern",
    "The CLI Server Pattern",
    "Language-Based Interface Patterns",
    "Applying Unix Interface-Design Patterns",
    "The Polyvalent-Program Pattern",
    "The Web Browser as a Universal Front End",
    "Silence Is Golden",
  ],
  actions: [
    {
      label: "收窄最小惊讶",
      detail: "只改变最小惊讶，保留过滤模式与编译模式的原始基线。",
    },
    {
      label: "显式化编译模式",
      detail: "把编译模式的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过CLI 服务",
      detail: "跳过CLI 服务直接追求多前端一致，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "高频探索任务需要即时反馈时，纯命令行并非自动优于可视界面。",
  faultNote:
    "拒绝原因：为每个前端复制业务规则，造成命令行与图形界面结果不一致。",
} as const;

export function TaoupChapter11InterfacesTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter11InterfacesRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter11InterfacesEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
