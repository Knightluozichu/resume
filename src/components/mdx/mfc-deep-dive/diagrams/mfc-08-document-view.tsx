import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第8章 Document-View深入探讨",
  label: "第四篇 · Document/View",
  color: "#7e22ce",
  soft: "#faf5ff",
  chain: [
    "创建文档模板",
    "建立数据模型",
    "接收View编辑",
    "触发OnDraw重绘",
    "Serialize写档",
    "动态创建并读档",
  ],
  concepts: [
    "第8章 Document-View深入探讨",
    "为什么需要Document-View（形而上）",
    "Document",
    "View",
    "Document Frame（View Frame）",
    "Document Template",
    "CDocTemplate管理CDocument/CView/CFrameWnd",
    "Scribble Step1的Document——数据结构设计",
    "MFC Collection Classes的选用",
    "CScribbleDoc的修改",
    "文件：一连串的线条",
    "线条与坐标点",
    "Scribble Step 1的View：数据重绘与编辑",
    "CScribbleView的修改",
    "View的重绘操作：GetDocument和OnDraw",
    "ClassWizard的辅佐",
    "WizardBar的辅佐",
    "Serialize：对象的档案读写",
    "Serialization以外的档案读写操作",
    "台面上的Serialize操作",
    "台面下的Serialize写档奥秘",
    "台面下的Serialize读档奥秘",
    "DYNAMIC/DYNCREATE/SERIAL三宏",
    "Serializable的必要条件",
    "CObject类",
    "IsKindOf",
    "IsSerializable",
    "CObject：：Serialize",
    "CArchive类",
    "operator《和operator》",
    "效率考虑",
    "自定SERIAL宏给抽象类使用",
    "在CObList中加入CStroke以外的类",
    "Document与View交流——为Step4做准备",
  ],
} as const;

export function Mfc08DocumentViewMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc08DocumentViewExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc08DocumentViewEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
