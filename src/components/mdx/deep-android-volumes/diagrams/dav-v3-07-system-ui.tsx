"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷III 第7章 深入理解SystemUI",focus:"剖析SystemUI启动、状态栏通知、导航栏、禁用标记与可见性传播",nodes:["第7章 深入理解SystemUI","7.1 初识SystemUI","7.1.1 SystemUIService的启动","7.1.2 状态栏与导航栏的创建","7.1.3 理解IStatusBarService","7.1.4 SystemUI的体系结构","7.2 深入理解状态栏","7.2.1 状态栏窗口的创建与控件树结构","7.2.2 通知信息的管理与显示","7.2.3 系统状态图标区的管理与显示","7.2.4 状态栏总结","7.3 深入理解导航栏","7.3.1 导航栏的创建","7.3.2 虚拟按键的工作原理","7.3.3 SearchPanel","7.3.4 关于导航栏的其他话题","7.3.5 导航栏总结","7.4 禁用状态栏与导航栏的功能","7.4.1 如何禁用状态栏与导航栏的功能","7.4.2 StatusBarManagerService对禁用标记的维护","7.4.3 状态栏与导航栏对禁用标记的响应","7.5 理解SystemUIVisibility","7.5.1 SystemUIVisibility在系统中的漫游过程","7.5.2 SystemUIVisibility发挥作用","7.5.3 SystemUIVisibility总结","7.6 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
