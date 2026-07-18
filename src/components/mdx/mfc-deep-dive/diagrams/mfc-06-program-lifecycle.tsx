import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第6章 MFC程序的生死因果",
  label: "第三篇 · 生死因果",
  color: "#0369a1",
  soft: "#f0f9ff",
  chain: [
    "构造Application对象",
    "进入隐藏WinMain",
    "执行AFX初始化",
    "运行InitInstance",
    "创建显示主窗口",
    "进入Run消息泵",
  ],
  concepts: [
    "第6章 MFC程序的生死因果",
    "不二法门：熟记MFC类的层次结构",
    "需要什么函数库？",
    "需要什么头文件？",
    "简化的MFC程序结构——以Hello MFC为例",
    "Hello程序程序代码",
    "MFC程序的来龙去脉（causal relations）",
    "我只借用两个类：CWinApp和CFrameWnd",
    "CWinApp——取代WinMain的地位",
    "CFrameWnd——取代WndProc的地位",
    "引爆器——Application object",
    "隐晦不明的WinMain",
    "AfxWinInit——AFX内部初始化操作",
    "CWinApp：：InitApplication",
    "CMyWinApp：：InitInstance",
    "CFrameWnd：：Create产生主窗口（并先注册窗口类）",
    "奇怪的窗口类名称Afx：b：14ae：6：3e8f",
    "窗口显示与更新",
    "CWinApp：：Run——程序生命的活水源头",
    "把消息与处理函数连接在一起：Message Map机制",
    "来龙去脉总整理",
    "Callback函数",
    "空闲时间（idle time）的处理：OnIdle",
    "Dialog与Control",
    "通用对话框（Common Dialogs）",
    "本章回顾",
  ],
} as const;

export function Mfc06ProgramLifecycleMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc06ProgramLifecycleExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc06ProgramLifecycleEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
