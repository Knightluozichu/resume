import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第13章 多重文件与多重显示",
  label: "第四篇 · 多文档多视图",
  color: "#6d28d9",
  soft: "#f5f3ff",
  chain: [
    "选择SDI或MDI",
    "注册多个Template",
    "创建Document",
    "装配Frame与View",
    "切分或新建窗口",
    "保存关闭对象图",
  ],
  concepts: [
    "第13章 多重文件与多重显示",
    "MDI和SDI",
    "多重显示（Multiple Views）",
    "窗口的动态切分",
    "窗口的静态切分",
    "CreateStatic和CreateView",
    "窗口的静态三叉切分",
    "Graph范例程序",
    "静态切分窗口之观念整理",
    "同源子窗口",
    "CMDIFrameWnd：：OnWindowNew",
    "Text范例程序",
    "非标准做法的缺点",
    "多重文件",
    "新的Cocument类",
    "新的Document Template",
    "新的UI系统",
    "新文件的档案读写操作",
  ],
} as const;

export function Mfc13MultipleDocumentsViewsMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc13MultipleDocumentsViewsExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc13MultipleDocumentsViewsEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
