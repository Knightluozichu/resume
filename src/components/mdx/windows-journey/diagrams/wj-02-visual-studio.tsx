import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第2章 开锋你的绝世名刃—— Visual Studio开发环境的安装、配置",
  label: "第一篇 · Windows程序根基",
  color: "#047857",
  soft: "#ecfdf5",
  chain: [
    "安装工具链",
    "固定编译配置",
    "创建解决方案",
    "查询文档",
    "构建运行",
    "保存诊断证据",
  ],
  concepts: [
    "第2章 开锋你的绝世名刃—— Visual Studio开发环境的安装、配置",
    "2.1 Visual Studio、VC++和C++的那些事儿",
    "2.2 Visual Studio 2010的下载、安装与配置",
    "2.2.1 下载VisualStudio 2010",
    "2.2.2 安装VisualStudio 2010",
    "2.2.3 初次配置VisualStudio 2010",
    "2.2.4 Visual Studio 2010常用设置介绍",
    "2.3 Visual Studio 2010使用指南",
    "2.3.1 集成开发环境简介",
    "2.3.2 Visual Studio界面概述",
    "2.3.3 工具栏选项",
    "2.4 百科全书——帮助文档与MSDN",
    "2.4.1 MSDN的安装",
    "2.4.2 离线查看MSDN的方法",
    "2.4.3 使用MSDN帮助文档",
    "2.5 Coding路上不孤单——强大的编程助手Visual AssistX",
    "2.6 长征第一步——第一个程序的创建与编写",
    "2.6.1 关于项目与解决方案",
    "2.6.2 第一个程序的创建与编写",
    "2.6.3 Visual Studio文件类型分析",
    "2.7 章节小憩",
  ],
} as const;

export function Wj02VisualStudioMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj02VisualStudioExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj02VisualStudioEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
