import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第10章 MFC与对话盒",
  label: "第四篇 · 对话框",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "设计对话框资源",
    "生成专用类",
    "绑定控件数据",
    "执行校验",
    "处理消息",
    "提交或取消",
  ],
  concepts: [
    "第10章 MFC与对话盒",
    "对话框编辑器",
    "利用ClassWizard连接对话框与其专用类",
    "对话框的消息处理函数",
    "对话框数据交换与校验（DDX&DDV）",
    "如何唤起对话框",
    "本章回顾",
  ],
} as const;

export function Mfc10DialogsMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc10DialogsExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc10DialogsEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
