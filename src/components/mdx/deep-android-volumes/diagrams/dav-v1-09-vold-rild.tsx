"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷I 第9章 深入理解Vold和Rild",focus:"比较存储热插拔的Netlink事件链与基带请求的异步RIL事件链",nodes:["第9章 深入理解Vold和Rild","9.1 概述","9.2 Vold的原理与机制分析","9.2.1 Netlink和Uevent介绍","9.2.2 初识Vold","9.2.3 NetlinkManager模块分析","9.2.4 VolumeManager模块分析","9.2.5 CommandListener模块分析","9.2.6 Vold实例分析","9.2.7 关于Vold的总结","9.3 Rild的原理与机制分析","9.3.1 初识Rild","9.3.2 RIL_startEventLoop分析","9.3.3 RIL_Init分析","9.3.4 RIL_register分析","9.3.5 关于Rild main函数的总结","9.3.6 Rild实例分析","9.3.7 关于Rild的总结","9.4 拓展思考","9.4.1 嵌入式系统的存储知识介绍","9.4.2 Rild和Phone的改进探讨","9.5 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
