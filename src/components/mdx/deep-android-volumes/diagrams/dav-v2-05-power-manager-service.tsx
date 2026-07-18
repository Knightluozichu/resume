"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷II 第5章 深入理解PowerManagerService",focus:"连接PMS初始化、WakeLock、用户活动、电源键与电池统计",nodes:["第5章 深入理解PowerManagerService","5.1 概述","5.2 初识PowerManagerService","5.2.1 PMS构造函数分析","5.2.2 init分析","5.2.3 systemReady分析","5.2.4 BootComplete处理","5.2.5 初识PowerManagerService总结","5.3 PMS WakeLock分析","5.3.1 WakeLock客户端分析","5.3.2 PMS acquireWakeLock分析","5.3.3 Power类及LightService类介绍","5.3.4 WakeLock总结","5.4 userActivity及Power按键处理分析","5.4.1 userActivity分析","5.4.2 Power按键处理分析","5.5 BatteryService及BatteryStatsService分析","5.5.1 BatteryService分析","5.5.2 BatteryStatsService分析","5.5.3 BatteryService及BatteryStatsService总结","5.6 本章学习指导","5.7 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
