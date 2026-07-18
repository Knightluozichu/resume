import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第1章 Win32程序基本概念",
  label: "第一篇 · Win32底座",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "进入WinMain",
    "注册窗口类",
    "创建显示窗口",
    "提取分派消息",
    "处理窗口回调",
    "退出并回收资源",
  ],
  concepts: [
    "第1章 Win32程序基本概念",
    "Win32程序开发流程",
    "需要什么函数库（.LIB）",
    "需要什么头文件（.H）",
    "以消息为基础，以事件驱动之（message based，event driven）",
    "一个具体而微的Win32程序",
    "程序进入点WinMain",
    "窗口类之注册与窗口之诞生",
    "消息循环",
    "窗口的生命中枢：窗口函数",
    "消息映射（Message Map）的雏形",
    "对话框的运行",
    "模块定义文件（.DEF）",
    "资源描述档（.RC）",
    "Widnows程序的生与死",
    "空闲时间的处理：OnIdle",
    "Console程序",
    "Console程序与DOS程序的差别",
    "Console程序的编译链接",
    "JBACKUP：Win32 Console程序设计",
    "MFCCON：MFC Console程序设计",
    "行程与线程（Process and Thread）",
    "核心对象",
    "一个行程的诞生与死亡",
    "产生子行程",
    "一个线程的诞生与死亡",
    "以_beginthreadex取代CreateThread",
    "线程优先级（Priority）",
    "多线程程序设计实例",
  ],
} as const;

export function Mfc01Win32ProgramConceptsMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc01Win32ProgramConceptsExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc01Win32ProgramConceptsEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
