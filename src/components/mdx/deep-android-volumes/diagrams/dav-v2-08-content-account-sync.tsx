"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷II 第8章 深入理解ContentService和AccountManagerService",focus:"连接内容观察者、账户认证与SyncManager调度的数据闭环",nodes:["第8章 深入理解ContentService和AccountManagerService","8.1 概述","8.2 数据更新通知机制分析","8.2.1 初识ContentService","8.2.2 ContentResolver的registerContentObserver分析","8.2.3 ContentResolver的notifyChange分析","8.2.4 数据更新通知机制总结和深入探讨","8.3 AccountManagerService分析","8.3.1 初识AccountManagerService","8.3.2 AccountManager addAccount分析","8.3.3 AccountManagerService分析总结","8.4 数据同步管理SyncManager分析","8.4.1 初识SyncManager","8.4.2 ContentResolver的requestSync分析","8.4.3 数据同步管理SyncManager分析总结","8.5 本章学习指导","8.6 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
