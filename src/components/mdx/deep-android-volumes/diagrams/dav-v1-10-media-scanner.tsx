"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷I 第10章 深入理解MediaScanner",focus:"贯通广播接收、扫描服务、Java/JNI/PV解析器与媒体数据库写入",nodes:["第10章 深入理解MediaScanner","10.1 概述","10.2 android.process.media分析","10.2.1 MediaScannerReceiver模块分析","10.2.2 MediaScannerService模块分析","10.2.3 android.process.media媒体扫描流程总结","10.3 MediaScanner分析","10.3.1 Java层分析","10.3.2 JNI层分析","10.3.3 PVMediaScanner分析","10.3.4 关于MediaScanner的总结","10.4 拓展思考","10.4.1 MediaScannerConnection介绍","10.4.2 我问你答","10.5 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
