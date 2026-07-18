"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷III 第4章 深入理解WindowManagerService",focus:"以窗口管理结构、Z序、布局与动画交替循环解释WMS",nodes:["第4章 深入理解WindowManagerService","4.1 初识WindowManagerService","4.1.1 一个从命令行启动的动画窗口","4.1.2 WMS的构成","4.1.3 初识WMS的小结","4.2 WMS的窗口管理结构","4.2.1 理解WindowToken","4.2.2 理解WindowState","4.2.3 理解DisplayContent","4.3 理解窗口的显示次序","4.3.1 主序、子序和窗口类型","4.3.2 通过主序与子序确定窗口的次序","4.3.3 更新显示次序到Surface","4.3.4 关于显示次序的小结","4.4 窗口的布局","4.4.1 从relayoutWindow()开始","4.4.2 布局操作的外围代码分析","4.4.3 初探performLayoutAndPlaceSurfacesLockedInner()","4.4.4 布局的前期处理","4.4.5 布局DisplayContent","4.4.6 布局的最终阶段","4.5 WMS的动画系统","4.5.1 Android动画原理简介","4.5.2 WMS的动画系统框架","4.5.3 WindowAnimator分析","4.5.4 深入理解窗口动画","4.5.5 交替运行的布局系统与动画系统","4.5.6 动画系统总结","4.6 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
