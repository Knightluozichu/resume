import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第7章 简单而完整：MFC骨干程序",
  label: "第三篇 · 骨干程序",
  color: "#4d7c0f",
  soft: "#f7fee7",
  chain: [
    "生成骨干项目",
    "注册Document Template",
    "创建Frame与View",
    "装载菜单工具栏",
    "连接消息映射",
    "验证文档交互",
  ],
  concepts: [
    "第7章 简单而完整：MFC骨干程序",
    "不二法门：熟记MFC类层次结构",
    "MFC程序的UI新风貌",
    "Document/View支撑你的应用程序",
    "利用Visual C++工具完成Scribble step0",
    "骨干程序使用哪些MFC类？",
    "Document Template的意义",
    "Scribble的Document/View设计",
    "主窗口的诞生",
    "工具栏和状态栏的诞生（Toolbar&Status bar）",
    "鼠标拖放（Drag and Drop）",
    "消息映射（Message Map）",
    "标准菜单File/Edit/View/Window/Help",
    "对话框",
    "改用CEditView",
  ],
} as const;

export function Mfc07FrameworkSkeletonMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc07FrameworkSkeletonExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc07FrameworkSkeletonEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
