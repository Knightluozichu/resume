"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷III 第3章 深入理解AudioService",focus:"追踪音量键、流音量、静音、外设与AudioFocus的Java服务状态机",nodes:["第3章 深入理解AudioService","3.1 概述","3.2 音量管理","3.2.1 音量键的处理流程","3.2.2 通用的音量设置函数setStreamVolume()","3.2.3 静音控制","3.2.4 音量控制小结","3.3 音频外设的管理","3.3.1 WiredAccessoryObserver设备状态的监控","3.3.2 AudioService的外设状态管理","3.3.3 音频外设管理小结","3.4 AudioFocus机制的实现","3.4.1 AudioFocus最简单的例子","3.4.2 AudioFocus实现原理简介","3.4.3 申请AudioFocus","3.4.4 释放AudioFocus","3.4.5 AudioFocus小结","3.5 AudioService的其他功能","3.6 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
