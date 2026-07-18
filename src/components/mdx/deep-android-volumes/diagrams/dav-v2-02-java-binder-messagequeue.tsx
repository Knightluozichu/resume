"use client";
import { OfficialDavSeriesLab } from "./official-dav-series-lab";
const props={unitTitle:"卷II 第2章 深入理解Java Binder和MessageQueue",focus:"连接Java Binder初始化、addService与MessageQueue的Native轮询",nodes:["第2章 深入理解Java Binder和MessageQueue","2.1 概述","2.2 Java层中的Binder架构分析","2.2.1 Binder架构总览","2.2.2 初始化Java层Binder框架","2.2.3 addService实例分析","2.2.4 Java层Binder架构总结","2.3 心系两界的MessageQueue","2.3.1 MessageQueue的创建","2.3.2 提取消息","2.3.3 nativePollOnce函数分析","2.3.4 MessageQueue总结","2.4 本章小结"],versions:["卷I / Android 2.2","卷II / Android 4.0.1","卷III / Android 4.2.2"]};
export function DavSeriesPipelineLab(){return <OfficialDavSeriesLab mode="pipeline" {...props}/>;}
export function DavSeriesExperimentLab(){return <OfficialDavSeriesLab mode="experiment" {...props}/>;}
export function DavSeriesEvidenceLab(){return <OfficialDavSeriesLab mode="evidence" {...props}/>;}
