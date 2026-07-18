"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷I 第5章 深入理解常见类",focus:"用RefBase、sp/wp、Thread、同步类、Looper和Handler建立对象与任务寿命模型",nodes:["第5章 深入理解常见类","5.1 概述","5.2 以“三板斧”揭秘RefBase、sp和wp","5.2.1 第一板斧——初识影子对象","5.2.2 第二板斧——由弱生强","5.2.3 第三板斧——破解生死魔咒","5.2.4 轻量级的引用计数控制类LightRefBase","5.2.5 题外话——三板斧的来历","5.3 Thread类及常用同步类分析","5.3.1 一个变量引发的思考","5.3.2 常用同步类","5.4 Looper和Handler类分析","5.4.1 Looper类分析","5.4.2 Handler分析","5.4.3 Looper和Handler的同步关系","5.4.4 HandlerThread介绍","5.5 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
